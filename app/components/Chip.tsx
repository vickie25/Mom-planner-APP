import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import { AppText } from './AppText';
import { theme } from '../constants/theme';

interface ChipProps extends PressableProps {
  label: string;
  selected?: boolean;
  color?: string;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  selected = false,
  color,
  className = '',
  ...props
}) => {
  return (
    <Pressable
      className={`px-4 py-2 rounded-chip border ${
        selected ? 'bg-primary border-primary' : 'bg-surface border-border'
      } ${className}`}
      style={color && selected ? { backgroundColor: color, borderColor: color } : undefined}
      {...props}
    >
      <AppText variant="bodySmall" color={selected ? '#FFFFFF' : theme.colors.primary}>
        {label}
      </AppText>
    </Pressable>
  );
};
