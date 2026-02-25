import React from 'react';
import { View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { AppText } from './components/AppText';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { Screen } from './components/Screen';
import { StaggeredItem } from './components/StaggeredItem';
import { theme } from './constants/theme';

export default function Onboarding() {
  const router = useRouter();

  const features = [
    {
      icon: '📅',
      title: 'Smart Scheduling',
      description: 'Keep track of family events, appointments, and activities all in one place',
    },
    {
      icon: '✓',
      title: 'Task Management',
      description: 'Never forget important tasks with smart reminders and priority sorting',
    },
    {
      icon: '🍽️',
      title: 'Meal Planning',
      description: 'Plan weekly meals and generate grocery lists automatically',
    },
  ];

  return (
    <Screen>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pt-10 pb-12"
      >
        <View className="self-start px-3 py-1 rounded-full bg-accent/20 border border-accent/30 mb-8">
          <AppText variant="caption" color={theme.colors.primary}>
            Mom Planner
          </AppText>
        </View>

        <View className="items-center mb-8">
          <View className="w-20 h-20 rounded-full bg-accent/20 items-center justify-center mb-4">
            <AppText variant="h1">✨</AppText>
          </View>
          <AppText variant="hero" className="text-center">
            Your family,{'\n'}calmly coordinated
          </AppText>
        </View>

        <AppText
          variant="body"
          color={theme.colors.secondary}
          className="text-center mb-10"
        >
          A warm, focused planner for the moments that matter most.
        </AppText>

        <View className="gap-4 mb-10">
          {features.map((feature, index) => (
            <StaggeredItem index={index} key={index}>
              <Card className="border border-border">
                <View className="flex-row items-start gap-3">
                  <View className="w-12 h-12 rounded-full bg-highlight items-center justify-center">
                    <AppText variant="h2">{feature.icon}</AppText>
                  </View>
                  <View className="flex-1">
                    <AppText variant="h3" className="mb-1">
                      {feature.title}
                    </AppText>
                    <AppText variant="body" color={theme.colors.secondary}>
                      {feature.description}
                    </AppText>
                  </View>
                </View>
              </Card>
            </StaggeredItem>
          ))}
        </View>

        <Button onPress={() => router.push('/auth/sign-in')}>
          Get Started
        </Button>
      </ScrollView>
    </Screen>
  );
}
