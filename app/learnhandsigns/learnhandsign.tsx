// app/lessons/index.js (or .tsx if using TypeScript)
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import LayoutWrapper2 from '@/components/LayoutWrapper2';

const aslData = require('../../assets/sign_data.json');

// Component for ASL Sign Cards
function SignCard({ item, onPress }: any) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.cardTitle}>{item.sign_name}</Text>
      <Text style={styles.cardSubtitle}>
        {item.paragraphs[0].substring(0, 40)}
        {item.paragraphs[0].length > 40 ? '...' : ''}
      </Text>
    </TouchableOpacity>
  );
}

export default function LessonsScreen() {
  const router = useRouter();

  const handleCardPress = (item: any) => {
    router.push({
      pathname: '/learnhandsigns/lessons/sign-details',
      params: {
        signName: item.sign_name,
        videoUrl: item.video_url,
        paragraphs: JSON.stringify(item.paragraphs),
      },
    });
  };

  return (
    <LayoutWrapper2>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ASL Signs</Text>
        <Text style={styles.headerSubtitle}>
          Learn and practice American Sign Language
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {aslData.map((item: any, index: number) => (
          <SignCard
            key={index}
            item={item}
            onPress={() => handleCardPress(item)}
          />
        ))}
      </ScrollView>
    </LayoutWrapper2>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
});
