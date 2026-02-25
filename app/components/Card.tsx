import React, { useRef, useState } from 'react';
import { Animated, Pressable, PressableProps, ViewProps } from 'react-native';
import { theme } from '../constants/theme';
import { softHaptic } from '../lib/haptics';

interface CardProps extends ViewProps {
  pressable?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  pressable = false,
  onPress,
  onLongPress,
  className = '',
  style,
  children,
  ...props
}) => {
  const liftAnim = useRef(new Animated.Value(0)).current;
  const [isPressed, setIsPressed] = useState(false);
  const AnimatedPressable = useRef(Animated.createAnimatedComponent(Pressable)).current;
  const cardClasses = `bg-surface border border-border rounded-card p-4 ${
    isPressed ? 'bg-highlight' : ''
  } ${className}`;

  const cardStyle = [
    theme.shadow.md,
    style,
    {
      transform: [
        {
          translateY: liftAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -2],
          }),
        },
      ],
      shadowOpacity: liftAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.08, 0.18],
      }),
      shadowRadius: liftAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [4, 10],
      }),
      elevation: liftAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [2, 6],
      }) as any,
    },
  ];

  if (pressable && onPress) {
    return (
      <AnimatedPressable
        className={cardClasses}
        style={cardStyle}
        onPress={onPress}
        onPressIn={() => {
          setIsPressed(true);
          Animated.spring(liftAnim, { toValue: 1, useNativeDriver: false }).start();
        }}
        onPressOut={() => {
          setIsPressed(false);
          Animated.spring(liftAnim, { toValue: 0, useNativeDriver: false }).start();
        }}
        onLongPress={() => {
          softHaptic();
          setIsPressed(true);
          onLongPress?.();
        }}
        {...(props as PressableProps)}
      >
        {children}
      </AnimatedPressable>
    );
  }

  return (
    <Animated.View className={cardClasses} style={cardStyle as any} {...props}>
      {children}
    </Animated.View>
  );
};
