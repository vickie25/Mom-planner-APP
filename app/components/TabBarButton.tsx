import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, View } from 'react-native';
import type { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { theme } from '../constants/theme';

export const TabBarButton: React.FC<BottomTabBarButtonProps> = ({
  children,
  onPress,
  accessibilityState,
  ...props
}) => {
  const focused = !!accessibilityState?.selected;
  const scale = useRef(new Animated.Value(1)).current;
  const underline = useRef(new Animated.Value(focused ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(underline, {
      toValue: focused ? 1 : 0,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [focused, underline]);

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <Pressable
      {...props}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <View>{children}</View>
        <Animated.View
          style={{
            height: 2,
            width: 18,
            alignSelf: 'center',
            marginTop: 6,
            borderRadius: 2,
            backgroundColor: theme.colors.accent,
            opacity: underline,
            transform: [
              {
                scaleX: underline.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.6, 1],
                }),
              },
            ],
          }}
        />
      </Animated.View>
    </Pressable>
  );
};
