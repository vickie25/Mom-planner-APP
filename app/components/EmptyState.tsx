import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { AppText } from './AppText';
import { theme } from '../constants/theme';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: string;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = '○',
  className = '',
}) => {
  const breathe = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(breathe, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(breathe, { toValue: 0, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, [breathe]);

  const scale = breathe.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.03],
  });
  const opacity = breathe.interpolate({
    inputRange: [0, 1],
    outputRange: [0.85, 1],
  });

  return (
    <View className={`items-center justify-center py-12 ${className}`}>
      <Animated.View style={{ transform: [{ scale }], opacity }}>
        <AppText variant="hero" color={theme.colors.accentSoft} className="mb-2">
          {icon}
        </AppText>
      </Animated.View>
      <AppText variant="h3" className="mb-1 text-center">
        {title}
      </AppText>
      {description && (
        <AppText
          variant="body"
          color={theme.colors.secondary}
          className="text-center px-8"
        >
          {description}
        </AppText>
      )}
    </View>
  );
};
