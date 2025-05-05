import axios from 'axios';
import { useState } from 'react';

const useGenerateSentence = (words: string[]) => {
  const [sentence, setSentence] = useState('');
  const [loading, setLoading] = useState(false);

  const clearSentence = () => {
    setSentence('');
  };
  const convertWordsToSentence = async () => {
    const prompt = `Rearrange the following words into a grammatically correct English sentence. Only return the rearranged sentence without any additional text or explanations:
${words.join(' ')}`;

    setLoading(true);
    try {
      const response = await axios.post(
        'https://api.cohere.ai/v1/generate',
        {
          model: 'command',
          prompt: prompt,
          max_tokens: 20,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: 'Bearer fxry9Im85355wqu2OmC7kFyT7FbhM2UjkKYTCZW1',
            'Content-Type': 'application/json',
          },
        }
      );

      setSentence(response.data.generations[0].text.trim());
    } catch (error) {
      console.error('Error generating sentence:', error);
      setSentence('Error generating sentence');
    } finally {
      setLoading(false);
    }
  };

  return { sentence, loading, convertWordsToSentence, clearSentence };
};

export default useGenerateSentence;
