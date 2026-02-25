import React, { useEffect, useRef } from 'react';
import { Animated, Pressable } from 'react-native';
import { theme } from '../constants/theme';
import { softHaptic } from '../lib/haptics';

interface ToggleSwitchProps {
  value: boolean;
  onValueChange: (next: boolean) => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ value, onValueChange }) => {
  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(anim, {
      toValue: value ? 1 : 0,
      useNativeDriver: false,
      friction: 8,
      tension: 80,
    }).start();
  }, [anim, value]);

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });

  const backgroundColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.border, theme.colors.accent],
  });

  return (
    <Pressable
      onPress={() => {
        softHaptic();
        onValueChange(!value);
      }}
      style={{ padding: 2 }}
    >
      <Animated.View
        style={{
          width: 44,
          height: 26,
          borderRadius: 16,
          backgroundColor,
          borderWidth: 1,
          borderColor: theme.colors.border,
          padding: 2,
        }}
      >
        <Animated.View
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: '#FFFFFF',
            transform: [{ translateX }],
            shadowColor: '#000',
            shadowOpacity: 0.18,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 2 },
            elevation: 2,
          }}
        />
      </Animated.View>
    </Pressable>
  );
};
