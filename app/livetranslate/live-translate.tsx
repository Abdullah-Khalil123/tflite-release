import * as React from 'react';
import styles from '../../styles/detectionStyles'; // Import styles from the detectionStyles file

import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTensorflowModel } from 'react-native-fast-tflite';
import * as Worklets from 'react-native-worklets-core';

import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor,
} from 'react-native-vision-camera';
import { useResizePlugin } from 'vision-camera-resize-plugin';

import labelMap from '../../assets/model/lableMap';
import useGenerateSentence from '../../hooks/useGenerateSectence';
import useTextToSpeech from '../../hooks/useTextToSpeech';
import { DetectionResult, SavedGesture } from '../../types/types';
import { modelToString } from '../../utils/utils';

export default function App(): React.ReactNode {
  const [cameraPosition, setCameraPosition] = React.useState<'front' | 'back'>(
    'back'
  );

  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice(cameraPosition);
  const [newDetections, setNewDetections] = React.useState<DetectionResult[]>(
    []
  );
  const [startDetection, setStartDetection] = React.useState(false);
  const [topDetection, setTopDetection] = React.useState<{
    name: string;
    score: number;
    color: string;
  } | null>(null);

  // State for saved gestures
  const [savedGestures, setSavedGestures] = React.useState<SavedGesture[]>([]);

  // State to track how long the current gesture has been detected
  const [currentGestureStartTime, setCurrentGestureStartTime] = React.useState<
    number | null
  >(null);
  const [currentGestureName, setCurrentGestureName] = React.useState<
    string | null
  >(null);

  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  // Initialize the text-to-speech hook
  const { isSpeaking, speak } = useTextToSpeech();

  // Get words from saved gestures for sentence generation
  const gestureWords = savedGestures.map((gesture) => gesture.name);

  // Initialize the sentence generation hook
  const {
    sentence,
    loading: generatingText,
    clearSentence,
    convertWordsToSentence,
  } = useGenerateSentence(gestureWords);

  const detectionHistory = React.useRef<
    Array<{ gesture: string | null; timestamp: number }>
  >([]);

  const GESTURE_RECOGNITION_THRESHOLD = 3000; // 3 seconds to confirm a gesture
  const frameTimestampRef = React.useRef<number>(0);
  const shouldProcessRef = React.useRef<boolean>(false);
  // Lower values = more frequent updates = less perceived lag
  const FRAME_INTERVAL_MS = 200; // Process frames every 200ms instead of 400ms
  // Performance settings
  const DETECTION_THRESHOLD = 0.4; // Confidence threshold for detections
  const MAX_DETECTIONS = 10; // Limit number of bounding boxes to improve performance
  const KEEP_DETECTIONS = 5; // Number of detections to keep for processing

  const { resize } = useResizePlugin();
  let lastProcessedTime = Date.now();

  // Get screen dimensions

  const model = useTensorflowModel(
    require('../../assets/model/detect.tflite'),
    'android-gpu'
  );

  const actualModel = model.state === 'loaded' ? model.model : undefined;

  React.useEffect(() => {
    if (actualModel == null) return;
    console.log(`Model loaded! Shape:\n${modelToString(actualModel)}]`);
  }, [actualModel]);

  // Update shouldProcessRef when startDetection changes
  React.useEffect(() => {
    shouldProcessRef.current = startDetection;

    // Clear detections when stopping
    if (!startDetection) {
      setNewDetections([]);
      setTopDetection(null);
      setCurrentGestureStartTime(null);
      setCurrentGestureName(null);
    }
  }, [startDetection]);

  React.useEffect(() => {
    if (!startDetection) {
      setCurrentGestureStartTime(null);
      setCurrentGestureName(null);
      detectionHistory.current = []; // Clear history when stopping detection
      return;
    }

    const currentTime = Date.now();

    // Update detection history
    if (!topDetection) {
      detectionHistory.current.push({ gesture: null, timestamp: currentTime });
    } else {
      detectionHistory.current.push({
        gesture: topDetection.name,
        timestamp: currentTime,
      });
    }

    // Keep history at fixed size (last 10 detections)
    const HISTORY_SIZE = 10;
    if (detectionHistory.current.length > HISTORY_SIZE) {
      detectionHistory.current.shift();
    }

    // Count occurrences of each gesture in recent history
    const gestureCounts: Record<string, number> = {};
    detectionHistory.current.forEach((item) => {
      if (item.gesture) {
        gestureCounts[item.gesture] = (gestureCounts[item.gesture] || 0) + 1;
      }
    });

    // Find the dominant gesture
    let dominantGesture: string | null = null;
    let maxCount = 0;

    Object.entries(gestureCounts).forEach(([gesture, count]) => {
      if (count > maxCount) {
        maxCount = count;
        dominantGesture = gesture;
      }
    });

    // Check if dominant gesture is consistent enough (70% of frames)
    const REQUIRED_CONSISTENCY = 0.7;
    const consistency = maxCount / detectionHistory.current.length;

    if (consistency >= REQUIRED_CONSISTENCY && dominantGesture) {
      // If this is a new dominant gesture, start tracking it
      if (currentGestureName !== dominantGesture) {
        setCurrentGestureStartTime(currentTime);
        setCurrentGestureName(dominantGesture);
      }

      // Check if we've been showing the same gesture for the threshold duration
      if (
        currentGestureStartTime &&
        currentTime - currentGestureStartTime >= GESTURE_RECOGNITION_THRESHOLD
      ) {
        // Add gesture to saved array if it's not the same as the last added one
        const lastGesture = savedGestures[savedGestures.length - 1];
        if (!lastGesture || lastGesture.name !== dominantGesture) {
          // Find the color for this gesture from topDetection
          const gestureColor = topDetection ? topDetection.color : '#cccccc'; // Fallback color

          setSavedGestures((prev) => [
            ...prev,
            {
              name: dominantGesture as string,
              color: gestureColor,
              timestamp: currentTime,
            },
          ]);
        }

        // Reset the timer to avoid continuous additions
        setCurrentGestureStartTime(currentTime);
      }
    } else if (consistency < 0.3) {
      // If consistency is very low, reset tracking
      setCurrentGestureStartTime(null);
      setCurrentGestureName(null);
    }
    // Otherwise keep the current tracking gesture (hysteresis)
  }, [
    topDetection,
    startDetection,
    savedGestures,
    currentGestureStartTime,
    currentGestureName,
  ]);

  // Handle gesture tracking over time
  // React.useEffect(() => {
  //   if (!topDetection || !startDetection) {
  //     setCurrentGestureStartTime(null);
  //     setCurrentGestureName(null);
  //     return;
  //   }

  //   const currentTime = Date.now();

  //   // If this is a new gesture or different from the last one
  //   if (currentGestureName !== topDetection.name) {
  //     setCurrentGestureStartTime(currentTime);
  //     setCurrentGestureName(topDetection.name);
  //     return;
  //   }

  //   // If we've been showing the same gesture for the threshold duration
  //   if (
  //     currentGestureStartTime &&
  //     currentTime - currentGestureStartTime >= GESTURE_RECOGNITION_THRESHOLD
  //   ) {
  //     // Add gesture to saved array if it's not the same as the last added one
  //     const lastGesture = savedGestures[savedGestures.length - 1];
  //     if (!lastGesture || lastGesture.name !== topDetection.name) {
  //       setSavedGestures((prev) => [
  //         ...prev,
  //         {
  //           name: topDetection.name,
  //           color: topDetection.color,
  //           timestamp: currentTime,
  //         },
  //       ]);
  //     }

  //     // Reset the timer to avoid continuous additions
  //     setCurrentGestureStartTime(currentTime);
  //   }
  // }, [
  //   topDetection,
  //   currentGestureStartTime,
  //   currentGestureName,
  //   savedGestures,
  //   startDetection,
  // ]);

  // Function to remove the last saved gesture
  const removeLastGesture = () => {
    setSavedGestures((prev) => prev.slice(0, -1));
  };

  // Function to clear all saved gestures
  const clearAllGestures = () => {
    setSavedGestures([]);
    clearSentence();
  };

  // Handle speak button press
  const handleSpeak = async () => {
    // If we have saved gestures, generate a sentence and speak it
    if (savedGestures.length > 0) {
      await convertWordsToSentence();
    }
  };

  // When sentence is generated, speak it
  React.useEffect(() => {
    if (sentence) {
      speak(sentence);
    }
  }, [sentence]);

  // Optimized function to update UI with detections
  const setDetectionState = Worklets.useRunOnJS((detections, timestamp) => {
    // Only update if this is from the most recent frame or a very recent one
    if (timestamp >= frameTimestampRef.current - 50) {
      frameTimestampRef.current = timestamp;
      setNewDetections(detections);

      // Update top detection
      if (detections.length > 0) {
        const top = detections[0];
        setTopDetection({
          name: labelMap[top.classId].name,
          score: top.score,
          color: labelMap[top.classId].color,
        });
      } else {
        setTopDetection(null);
      }
    }
  }, []);

  const frameProcessor = useFrameProcessor(
    (frame) => {
      'worklet';
      const now = Date.now();

      // Skip processing if not in detection mode, it's too soon, or model isn't loaded
      if (now - lastProcessedTime < FRAME_INTERVAL_MS || actualModel == null) {
        return;
      }

      lastProcessedTime = now;
      const frameTimestamp = frame.timestamp || now;

      try {
        // Resize with 90-degree rotation which fixed the orientation issue
        const resized = resize(frame, {
          scale: {
            width: 320,
            height: 320,
          },
          pixelFormat: 'rgb',
          dataType: 'float32',
          rotation: '90deg',
        });

        // Run inference
        const result: Array<any> = actualModel.runSync([resized]);

        if (!result || result.length < 4) {
          console.log('Invalid model result');
          return;
        }

        // Extract detection data
        const detectionBoxes = result[1]; // Bounding boxes
        const detectionScores = result[0]; // Confidence scores
        const numDetections = Math.min(
          parseInt(result[2][0], 10),
          detectionScores.length,
          MAX_DETECTIONS
        );
        const detectionClasses = result[3]; // Class indices

        let detectionResults: DetectionResult[] = [];

        // Process only valid detections up to the limit
        for (let i = 0; i < numDetections; i++) {
          const score = detectionScores[i];

          // Only process higher confidence detections
          if (score >= DETECTION_THRESHOLD) {
            const ymin = Math.max(0, Math.min(1, detectionBoxes[i * 4]));
            const xmin = Math.max(0, Math.min(1, detectionBoxes[i * 4 + 1]));
            const ymax = Math.max(0, Math.min(1, detectionBoxes[i * 4 + 2]));
            const xmax = Math.max(0, Math.min(1, detectionBoxes[i * 4 + 3]));

            // Class index is already 0-based in the model output
            const classId = Math.round(detectionClasses[i]);

            detectionResults.push({
              classId: classId,
              score,
              box: { ymin, xmin, ymax, xmax },
              timestamp: frameTimestamp, // Store the frame timestamp
            });
          }
        }

        // // Sort by confidence score (highest first)
        // detectionResults.sort((a, b) => b.score - a.score);
        // detectionResults = detectionResults.slice(0, KEEP_DETECTIONS);

        // // Update state with frame timestamp to ensure synchronization
        // setDetectionState(detectionResults, frameTimestamp);

        detectionResults.sort((a, b) => b.score - a.score);

        // Check if we need to prioritize "call" over "like"
        const callIndex = detectionResults.findIndex(
          (detection) => labelMap[detection.classId].name === 'call'
        );
        const likeIndex = detectionResults.findIndex(
          (detection) => labelMap[detection.classId].name === 'like'
        );

        // If both call and like are detected and like has higher score (appears first)
        if (callIndex > -1 && likeIndex > -1 && likeIndex < callIndex) {
          // Swap them to prioritize call
          const callDetection = detectionResults[callIndex];
          detectionResults[callIndex] = detectionResults[likeIndex];
          detectionResults[likeIndex] = callDetection;
        }

        // Limit the number of results after prioritization
        detectionResults = detectionResults.slice(0, KEEP_DETECTIONS);

        // Update state with frame timestamp to ensure synchronization
        setDetectionState(detectionResults, frameTimestamp);

        if (detectionResults.length > 0) {
          console.log(
            'Top detection class:',
            labelMap[detectionResults[0].classId].name
          );
        }
      } catch (error) {
        console.log('Error in frame processor:', error);
      }
    },
    [actualModel]
  );

  React.useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  // Calculate remaining time for current gesture recognition
  const getRemainingRecognitionTime = () => {
    if (!currentGestureStartTime || !currentGestureName) return 0;

    const elapsed = Date.now() - currentGestureStartTime;
    const remaining = Math.max(0, GESTURE_RECOGNITION_THRESHOLD - elapsed);
    return Math.round((remaining / GESTURE_RECOGNITION_THRESHOLD) * 100);
  };

  return (
    <View style={styles.container}>
      {hasPermission && device != null ? (
        <>
          <Camera
            device={device}
            style={StyleSheet.absoluteFill}
            isActive={true}
            frameProcessor={startDetection ? frameProcessor : undefined}
            pixelFormat="rgb"
          />
          {/* Overlay for bounding boxes */}
          {/* <View style={StyleSheet.absoluteFill} pointerEvents="none">
            {startDetection &&
              newDetections.map((detection, index) => {
                // Convert normalized coordinates to screen coordinates
                const { xmin, ymin, xmax, ymax } = detection.box;

                // Get label info
                const classInfo = labelMap[detection.classId] || {
                  name: 'unknown',
                  color: 'white',
                };

                // Convert normalized coordinates (0-1) to actual screen coordinates
                const left = xmin * screenWidth;
                const top = ymin * screenHeight;
                const width = (xmax - xmin) * screenWidth;
                const height = (ymax - ymin) * screenHeight;

                return (
                  <View
                    key={index}
                    style={{
                      position: 'absolute',
                      left: left,
                      top: top,
                      width: width,
                      height: height,
                      borderWidth: 3,
                      borderColor: classInfo.color,
                      backgroundColor: 'transparent',
                      borderRadius: 4,
                    }}
                  >
                    <Text
                      style={{
                        color: 'white',
                        backgroundColor: classInfo.color,
                        fontSize: 14,
                        fontWeight: 'bold',
                        padding: 4,
                        borderRadius: 4,
                        overflow: 'hidden',
                      }}
                    >
                      {classInfo.name} ({Math.round(detection.score * 100)}%)
                    </Text>
                  </View>
                );
              })}
          </View> */}

          {/* Status indicator */}
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>
              Model: {model.state === 'loaded' ? 'Ready ✓' : 'Loading...'}
            </Text>
            <Text style={styles.statusText}>
              Detection: {startDetection ? 'Active ✓' : 'Inactive ✗'}
            </Text>
          </View>

          {/* Saved Gestures Display */}
          <View style={styles.savedGesturesContainer}>
            <Text style={styles.savedGesturesHeader}>Saved Gestures:</Text>
            <ScrollView
              horizontal={true}
              style={styles.savedGesturesScroll}
              contentContainerStyle={styles.savedGesturesContent}
            >
              {savedGestures.length > 0 ? (
                savedGestures.map((gesture, index) => (
                  <View
                    key={index}
                    style={[
                      styles.gestureBadge,
                      { backgroundColor: gesture.color },
                    ]}
                  >
                    <Text style={styles.gestureBadgeText}>{gesture.name}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noGesturesText}>No gestures saved yet</Text>
              )}
            </ScrollView>

            {/* Text-to-speech output display */}
            {sentence && (
              <View style={styles.sentenceContainer}>
                <Text style={styles.sentenceText}>{sentence}</Text>
                {isSpeaking && (
                  <Text style={styles.speakingIndicator}>Speaking...</Text>
                )}
              </View>
            )}

            {/* Gesture Controls */}
            <View style={styles.gestureControlsRow}>
              <TouchableOpacity
                style={styles.backspaceButton}
                onPress={removeLastGesture}
                disabled={savedGestures.length === 0}
              >
                <Text style={styles.buttonText}>⌫</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.clearButton}
                onPress={clearAllGestures}
                disabled={savedGestures.length === 0}
              >
                <Text style={styles.buttonText}>Clear All</Text>
              </TouchableOpacity>

              {/* Speak button */}
              <TouchableOpacity
                style={[
                  styles.speakButton,
                  {
                    opacity: savedGestures.length > 0 ? 1 : 0.5,
                    backgroundColor: isSpeaking ? '#FF8C00' : '#4169E1',
                  },
                ]}
                onPress={handleSpeak}
                disabled={
                  savedGestures.length === 0 || generatingText || isSpeaking
                }
              >
                <Text style={styles.buttonText}>
                  {generatingText
                    ? 'Processing...'
                    : isSpeaking
                    ? 'Speaking...'
                    : 'Speak'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom control panel */}
          <View style={styles.controlPanel}>
            <TouchableOpacity
              style={[
                styles.detectionButton,
                { backgroundColor: startDetection ? '#FF4136' : '#2ECC40' },
              ]}
              onPress={() => {
                setStartDetection((prev) => !prev);
              }}
            >
              <Text style={styles.buttonText}>
                {startDetection ? 'Stop Detection' : 'Start Detection'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.detectionButton}
              onPress={() =>
                setCameraPosition((prev) =>
                  prev === 'back' ? 'front' : 'back'
                )
              }
            >
              <Text style={styles.buttonText}>Flip Camera</Text>
            </TouchableOpacity>

            {/* Top detection display */}
            {startDetection && (
              <View style={styles.detectionDisplay}>
                <Text style={styles.detectionLabel}>Current Detection:</Text>
                {topDetection ? (
                  <View>
                    <View
                      style={[
                        styles.detectionBadge,
                        { backgroundColor: topDetection.color },
                      ]}
                    >
                      <Text style={styles.detectionText}>
                        {topDetection.name.toUpperCase()} (
                        {Math.round(topDetection.score * 100)}%)
                      </Text>
                    </View>

                    {/* Progress indicator for gesture recognition */}
                    {currentGestureName === topDetection.name && (
                      <View style={styles.progressContainer}>
                        <View
                          style={[
                            styles.progressBar,
                            {
                              width: `${100 - getRemainingRecognitionTime()}%`,
                              backgroundColor: topDetection.color,
                            },
                          ]}
                        />
                        <Text style={styles.progressText}>
                          Hold{' '}
                          {Math.max(
                            0,
                            Math.ceil(
                              (GESTURE_RECOGNITION_THRESHOLD -
                                (Date.now() -
                                  (currentGestureStartTime || Date.now()))) /
                                1000
                            )
                          )}
                          s
                        </Text>
                      </View>
                    )}
                  </View>
                ) : (
                  <Text style={styles.noDetectionText}>
                    No hand gesture detected
                  </Text>
                )}
              </View>
            )}
          </View>
        </>
      ) : (
        <View style={styles.noAccessContainer}>
          <Text style={styles.noAccessText}>No Camera access.</Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <Text style={styles.buttonText}>Grant Camera Permission</Text>
          </TouchableOpacity>
        </View>
      )}

      {model.state === 'loading' && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#2ECC40" />
          <Text style={styles.loadingText}>
            Loading Hand Detection Model...
          </Text>
        </View>
      )}

      {model.state === 'error' && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load model!</Text>
          <Text style={styles.errorDetail}>{model.error.message}</Text>
        </View>
      )}
    </View>
  );
}
