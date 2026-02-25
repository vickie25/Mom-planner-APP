import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/onboarding');
  }, []);

  return <View className="flex-1 bg-background" />;
}