import { useEffect, useState } from 'react';
import Tts from 'react-native-tts';

const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    // Initialize TTS settings
    Tts.setDefaultLanguage('en-US');
    Tts.setDefaultRate(0.5);
    Tts.setDefaultPitch(1);
  }, []);

  // Event handlers for TTS events
  const onSpeechStart = () => {
    setIsSpeaking(true);
  };
  const onSpeechFinish = () => {
    // setIsSpeaking(false);
    setIsSpeaking(false);
  };
  const onSpeechError = (event: any) => {
    console.error('Text-to-speech error: ', event);
    stop();
    setIsSpeaking(false);
  };

  const speak = (text: string) => {
    if (text) {
      setIsSpeaking(true);

      // Add event listeners
      Tts.addEventListener('tts-start', onSpeechStart);
      Tts.addEventListener('tts-finish', onSpeechFinish);
      Tts.addEventListener('tts-error', onSpeechError);

      // Speak the text
      Tts.speak(text);
    }
  };

  const stop = () => {
    Tts.stop();
    setIsSpeaking(false);
  };

  return { isSpeaking, speak, stop };
};

export default useTextToSpeech;
