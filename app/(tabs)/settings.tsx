import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { AppText } from '../components/AppText';
import { Card } from '../components/Card';
import { Screen } from '../components/Screen';
import { SectionHeader } from '../components/SectionHeader';
import { ToggleSwitch } from '../components/ToggleSwitch';
import { theme } from '../constants/theme';

export default function Settings() {
  const [notifications, setNotifications] = useState({
    tasks: true,
    events: true,
    meals: false,
  });

  return (
    <Screen>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pt-6 pb-10"
      >
        <SectionHeader title="Settings" />

        <Card className="mb-6">
          <View className="flex-row items-center">
            <View className="w-16 h-16 rounded-full bg-primary items-center justify-center mr-4">
              <AppText variant="h1" color="#FFFFFF">
                S
              </AppText>
            </View>
            <View className="flex-1">
              <AppText variant="h3" className="mb-1">
                Sarah Johnson
              </AppText>
              <AppText variant="body" color={theme.colors.secondary}>
                sarah.j@email.com
              </AppText>
            </View>
          </View>
        </Card>

        <AppText variant="h3" className="mb-3">
          Notifications
        </AppText>

        <Card className="mb-6">
          <View className="gap-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <AppText variant="body" className="mb-1">
                  Task Reminders
                </AppText>
                <AppText variant="bodySmall" color={theme.colors.secondary}>
                  Gentle nudges for due items
                </AppText>
              </View>
              <ToggleSwitch
                value={notifications.tasks}
                onValueChange={(value) =>
                  setNotifications({ ...notifications, tasks: value })
                }
              />
            </View>

            <View className="h-px bg-border" />

            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <AppText variant="body" className="mb-1">
                  Event Reminders
                </AppText>
                <AppText variant="bodySmall" color={theme.colors.secondary}>
                  Quick heads-up before events
                </AppText>
              </View>
              <ToggleSwitch
                value={notifications.events}
                onValueChange={(value) =>
                  setNotifications({ ...notifications, events: value })
                }
              />
            </View>

            <View className="h-px bg-border" />

            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <AppText variant="body" className="mb-1">
                  Meal Planning
                </AppText>
                <AppText variant="bodySmall" color={theme.colors.secondary}>
                  Daily recipe inspiration
                </AppText>
              </View>
              <ToggleSwitch
                value={notifications.meals}
                onValueChange={(value) =>
                  setNotifications({ ...notifications, meals: value })
                }
              />
            </View>
          </View>
        </Card>

        <AppText variant="h3" className="mb-3">
          App Theme
        </AppText>

        <Card className="mb-6">
          <AppText variant="body" className="mb-4">
            Current Theme: Light & Warm
          </AppText>

          <View className="flex-row gap-2">
            <View
              className="flex-1 h-12 rounded-input border border-border"
              style={{ backgroundColor: theme.colors.background }}
            />
            <View
              className="flex-1 h-12 rounded-input border border-border"
              style={{ backgroundColor: theme.colors.surface }}
            />
            <View
              className="flex-1 h-12 rounded-input border border-border"
              style={{ backgroundColor: theme.colors.primary }}
            />
          </View>

          <AppText variant="bodySmall" color={theme.colors.secondary} className="mt-3">
            Designed for comfort and readability
          </AppText>
        </Card>

        <AppText variant="h3" className="mb-3">
          About
        </AppText>

        <Card className="mb-6">
          <View className="gap-3">
            <View className="flex-row justify-between">
              <AppText variant="body" color={theme.colors.secondary}>
                Version
              </AppText>
              <AppText variant="body">1.0.0</AppText>
            </View>

            <View className="h-px bg-border" />

            <View className="flex-row justify-between">
              <AppText variant="body" color={theme.colors.secondary}>
                Privacy Policy
              </AppText>
              <AppText variant="body">→</AppText>
            </View>

            <View className="h-px bg-border" />

            <View className="flex-row justify-between">
              <AppText variant="body" color={theme.colors.secondary}>
                Terms of Service
              </AppText>
              <AppText variant="body">→</AppText>
            </View>
          </View>
        </Card>
      </ScrollView>
    </Screen>
  );
}
