import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenProps {
  children: React.ReactNode;
  className?: string;
}

export const Screen: React.FC<ScreenProps> = ({ children, className = '' }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 280,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const translateY = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [8, 0],
  });

  return (
    <SafeAreaView className={`flex-1 bg-background ${className}`}>
      <View className="flex-1">
        <View pointerEvents="none" className="absolute inset-0">
          <View className="absolute -top-24 -right-16 w-56 h-56 rounded-full bg-accent/20" />
          <View className="absolute top-48 -left-24 w-72 h-72 rounded-full bg-primary/5" />
          <View className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-accent/10" />
        </View>
        <Animated.View
          style={{
            flex: 1,
            opacity: fadeAnim,
            transform: [{ translateY }],
          }}
        >
          {children}
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};
