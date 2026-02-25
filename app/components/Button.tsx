import React, { useEffect, useState } from 'react';
import { Pressable, PressableProps, Animated } from 'react-native';
import { AppText } from './AppText';
import { theme } from '../constants/theme';

interface ButtonProps extends PressableProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'large' | 'medium' | 'small';
  children: string;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'large',
  children,
  className = '',
  disabled,
  ...props
}) => {
  const [scaleAnim] = useState(new Animated.Value(1));
  const [opacityAnim] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 0.97, useNativeDriver: true }),
      Animated.timing(opacityAnim, { toValue: 0.92, duration: 90, useNativeDriver: true }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
      Animated.timing(opacityAnim, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();
  };

  const getButtonClasses = () => {
    let classes = 'items-center justify-center shadow-sm ';
    
    if (size === 'large') classes += 'h-14 px-8 ';
    if (size === 'medium') classes += 'h-12 px-6 ';
    if (size === 'small') classes += 'h-10 px-4 ';
    
    classes += 'rounded-button ';
    
    if (variant === 'primary') {
      classes += disabled ? 'bg-secondary/30' : 'bg-primary';
    } else if (variant === 'secondary') {
      classes += disabled ? 'bg-border' : 'bg-accent/20 border border-accent/40';
    } else {
      classes += 'bg-transparent border border-border';
    }
    
    return classes + className;
  };

  const getTextColor = () => {
    if (disabled) return theme.colors.secondary;
    if (variant === 'primary') return '#FFFFFF';
    return theme.colors.primary;
  };

  useEffect(() => {
    if (variant !== 'primary') return;
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.02, duration: 220, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 220, useNativeDriver: true }),
    ]).start();
  }, [scaleAnim, variant]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }], opacity: opacityAnim }}>
      <Pressable
        className={getButtonClasses()}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        {...props}
      >
        <AppText
          variant={size === 'large' ? 'h3' : 'body'}
          color={getTextColor()}
        >
          {children}
        </AppText>
      </Pressable>
    </Animated.View>
  );
};
