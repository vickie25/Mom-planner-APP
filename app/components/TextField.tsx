import React, { useEffect, useRef, useState } from 'react';
import { Animated, TextInput, TextInputProps, View } from 'react-native';
import { theme } from '../constants/theme';

interface TextFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  success?: boolean;
  className?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  error,
  success,
  className = '',
  style,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const AnimatedTextInput = useRef(Animated.createAnimatedComponent(TextInput)).current;
  const labelAnim = useRef(new Animated.Value(props.value ? 1 : 0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const successAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const hasValue = !!props.value;
    Animated.timing(labelAnim, {
      toValue: isFocused || hasValue ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [isFocused, labelAnim, props.value]);

  useEffect(() => {
    Animated.timing(glowAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 160,
      useNativeDriver: false,
    }).start();
  }, [glowAnim, isFocused]);

  useEffect(() => {
    if (!error) return;
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 6, duration: 40, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -6, duration: 40, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 4, duration: 40, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 40, useNativeDriver: true }),
    ]).start();
  }, [error, shakeAnim]);

  useEffect(() => {
    if (!success) return;
    successAnim.setValue(0);
    Animated.spring(successAnim, { toValue: 1, useNativeDriver: true }).start();
  }, [success, successAnim]);

  const labelTranslateY = labelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [14, -6],
  });
  const labelScale = labelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.85],
  });
  const labelColor = labelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.secondary, theme.colors.primary],
  });
  const glowShadow = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.25],
  });

  return (
    <View className={className}>
      <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
        <View className="relative">
          {label && (
            <Animated.Text
              style={{
                position: 'absolute',
                left: 16,
                top: 10,
                transform: [{ translateY: labelTranslateY }, { scale: labelScale }],
                color: labelColor as any,
                fontFamily: 'Sora-Regular',
                fontSize: 12,
              }}
              pointerEvents="none"
            >
              {label}
            </Animated.Text>
          )}
          <AnimatedTextInput
            className={`bg-surface border ${
              isFocused ? 'border-primary' : error ? 'border-error' : 'border-border'
            } rounded-input px-4 h-14`}
            style={[
              {
                fontFamily: 'Sora-Regular',
                fontSize: 16,
                color: theme.colors.primary,
                shadowColor: theme.colors.accent,
                shadowOpacity: glowShadow as any,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 0 },
              },
              style,
            ]}
            placeholderTextColor={theme.colors.secondary}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          {success && (
            <Animated.Text
              style={{
                position: 'absolute',
                right: 14,
                top: 16,
                transform: [{ scale: successAnim }],
                color: theme.colors.success,
                fontFamily: 'Sora-SemiBold',
              }}
            >
              ✓
            </Animated.Text>
          )}
        </View>
      </Animated.View>
      {error && (
        <Animated.Text
          style={{
            marginTop: 4,
            color: theme.colors.error,
            fontFamily: 'Sora-Regular',
            fontSize: 12,
          }}
        >
          {error}
        </Animated.Text>
      )}
    </View>
  );
};
