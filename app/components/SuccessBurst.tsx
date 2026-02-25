import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { AppText } from './AppText';
import { theme } from '../constants/theme';

interface SuccessBurstProps {
  visible: boolean;
}

export const SuccessBurst: React.FC<SuccessBurstProps> = ({ visible }) => {
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) return;
    scale.setValue(0.6);
    opacity.setValue(0);
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 180, useNativeDriver: true }),
    ]).start();
  }, [visible, opacity, scale]);

  if (!visible) return null;

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 12,
        right: 16,
        opacity,
        transform: [{ scale }],
      }}
    >
      <View className="bg-accent/20 border border-accent/40 px-3 py-2 rounded-full">
        <AppText variant="bodySmall" color={theme.colors.primary}>
          ✓ Added
        </AppText>
      </View>
    </Animated.View>
  );
};
