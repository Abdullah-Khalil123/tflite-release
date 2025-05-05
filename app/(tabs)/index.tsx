import HomeCard from '@/components/HomeCard';
import LayoutWrapper2 from '@/components/LayoutWrapper2';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  return (
    <LayoutWrapper2>
      <HomeCard
        title="Live Translator"
        description="Instantly convert sign language into text or speech in real-time"
        onPress={() => {
          router.push('../livetranslate/live-translate');
        }}
        className="bg-[#FFC803]"
      />
      <HomeCard
        title="Take lessons"
        description="Learn, practice, and master sign language with interactive lessons!"
        onPress={() => {
          router.push('../learnhandsigns/learnhandsign');
        }}
        className="bg-[#1AC4FF] mt-6"
      />
    </LayoutWrapper2>
  );
}
