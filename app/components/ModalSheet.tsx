import React from 'react';
import { Modal, View, Pressable, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { AppText } from './AppText';
import { Button } from './Button';
import { theme } from '../constants/theme';

interface ModalSheetProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  primaryAction?: {
    label: string;
    onPress: () => void;
  };
  secondaryAction?: {
    label: string;
    onPress: () => void;
  };
}

export const ModalSheet: React.FC<ModalSheetProps> = ({
  visible,
  onClose,
  title,
  children,
  primaryAction,
  secondaryAction,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable className="flex-1 bg-primary/30 justify-end" onPress={onClose}>
        <Pressable onPress={(e) => e.stopPropagation()}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View className="bg-surface rounded-t-3xl pt-6 pb-8 px-6 border-t border-border">
              <View className="items-center mb-4">
                <View className="w-12 h-1 bg-border rounded-full" />
              </View>
              
              <AppText variant="h2" className="mb-6">
                {title}
              </AppText>
              
              <ScrollView className="max-h-96 mb-6">
                {children}
              </ScrollView>
              
              <View className="gap-3">
                {primaryAction && (
                  <Button onPress={primaryAction.onPress}>
                    {primaryAction.label}
                  </Button>
                )}
                {secondaryAction && (
                  <Button variant="ghost" onPress={secondaryAction.onPress}>
                    {secondaryAction.label}
                  </Button>
                )}
              </View>
            </View>
          </KeyboardAvoidingView>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
