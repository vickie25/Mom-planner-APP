import React from 'react';
import { Text, TextProps } from 'react-native';
import { theme } from '../constants/theme';

interface AppTextProps extends TextProps {
  variant?: 'hero' | 'h1' | 'h2' | 'h3' | 'body' | 'bodySmall' | 'caption';
  color?: string;
  className?: string;
}

export const AppText: React.FC<AppTextProps> = ({
  variant = 'body',
  color = theme.colors.primary,
  className = '',
  style,
  children,
  ...props
}) => {
  const typography = theme.typography[variant];

  return (
    <Text
      style={[
        {
          fontSize: typography.fontSize,
          lineHeight: typography.lineHeight,
          fontFamily: typography.fontFamily,
          letterSpacing: typography.letterSpacing,
          color,
        },
        style,
      ]}
      className={className}
      {...props}
    >
      {children}
    </Text>
  );
};
