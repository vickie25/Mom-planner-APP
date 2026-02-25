import React from 'react';
import { View, ScrollView } from 'react-native';
import { AppText } from '../components/AppText';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Screen } from '../components/Screen';
import { SectionHeader } from '../components/SectionHeader';
import { StaggeredItem } from '../components/StaggeredItem';
import { theme } from '../constants/theme';
import { useApp } from '../lib/AppContext';

export default function Meals() {
  const { currentMeals, shuffleMeals } = useApp();

  const mealCards = [
    {
      type: 'Breakfast',
      icon: '🌅',
      meal: currentMeals.breakfast,
      color: theme.colors.accentSoft,
    },
    {
      type: 'Lunch',
      icon: '☀️',
      meal: currentMeals.lunch,
      color: '#E7EFE5',
    },
    {
      type: 'Dinner',
      icon: '🌙',
      meal: currentMeals.dinner,
      color: '#E9ECF4',
    },
  ];

  return (
    <Screen>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pt-6 pb-10"
      >
        <SectionHeader title="Meal Planner" />

        <AppText variant="body" color={theme.colors.secondary} className="mb-8">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </AppText>

        <View className="gap-4 mb-6">
          {mealCards.map((item, index) => (
            <StaggeredItem index={index} key={index}>
              <Card style={{ backgroundColor: item.color }}>
                <View className="flex-row items-center mb-3">
                  <View className="w-10 h-10 rounded-full bg-surface items-center justify-center mr-3 border border-border">
                    <AppText className="text-lg">{item.icon}</AppText>
                  </View>
                  <AppText variant="h3">{item.type}</AppText>
                </View>

                <AppText variant="h3" className="mb-1">
                  {item.meal.name}
                </AppText>
                <AppText variant="body" color={theme.colors.secondary}>
                  {item.meal.description}
                </AppText>
              </Card>
            </StaggeredItem>
          ))}
        </View>

        <Button onPress={shuffleMeals} variant="secondary">
          Shuffle Ideas ↻
        </Button>

        <Card className="mt-6">
          <AppText variant="h3" className="mb-2">
            Quick Tip
          </AppText>
          <AppText variant="body" color={theme.colors.secondary}>
            Plan your meals for the week to save time and reduce food waste. Tap
            &quot;Shuffle Ideas&quot; to get new inspiration!
          </AppText>
        </Card>
      </ScrollView>
    </Screen>
  );
}
