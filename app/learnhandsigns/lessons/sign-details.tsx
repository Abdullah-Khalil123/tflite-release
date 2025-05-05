// app/lessons/sign-details.js (or .tsx if using TypeScript)
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ResizeMode, Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

export default function SignDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [status, setStatus] = useState({});
  const [paragraphs, setParagraphs] = useState([]);

  useEffect(() => {
    if (params.paragraphs) {
      setParagraphs(JSON.parse(params.paragraphs as string));
    }
  }, [params.paragraphs]);

  const videoUrl = 'https://handspeak.com' + params.videoUrl;

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#2196F3" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Title */}
        <Text style={styles.signName}>{params.signName}</Text>

        {/* Video Player */}
        <View style={styles.videoContainer}>
          <Video
            style={styles.video}
            source={{ uri: videoUrl }}
            resizeMode={ResizeMode.CONTAIN}
            isLooping // This will make the video loop continuously
            shouldPlay // This will make the video start playing automatically
            useNativeControls={false}
            onPlaybackStatusUpdate={(status: any) => setStatus(status)}
          />
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          {paragraphs.map((paragraph, index) => (
            <Text key={index} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: '#2196F3',
    marginLeft: 4,
  },
  signName: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
    paddingHorizontal: 16,
  },
  videoContainer: {
    height: 250,
    marginVertical: 16,
    borderRadius: 8,
    overflow: 'hidden',
    marginHorizontal: 16,
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    padding: 16,
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 12,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  practiceButton: {
    backgroundColor: '#FFC803',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  practiceButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
