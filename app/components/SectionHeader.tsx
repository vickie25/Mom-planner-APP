import React from 'react';
import { View, Pressable } from 'react-native';
import { AppText } from './AppText';
import { theme } from '../constants/theme';

interface SectionHeaderProps {
  title: string;
  action?: string;
  onActionPress?: () => void;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  action,
  onActionPress,
  className = '',
}) => {
  return (
    <View className={`flex-row items-center justify-between mb-3 ${className}`}>
      <AppText variant="h2">{title}</AppText>
      {action && onActionPress && (
        <Pressable onPress={onActionPress}>
          <AppText variant="bodySmall" color={theme.colors.secondary}>
            {action}
          </AppText>
        </Pressable>
      )}
    </View>
  );
};
