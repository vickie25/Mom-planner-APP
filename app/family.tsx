import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { AppText } from './components/AppText';
import { Card } from './components/Card';
import { Screen } from './components/Screen';
import { StaggeredItem } from './components/StaggeredItem';
import { theme } from './constants/theme';
import { mockKids } from './lib/mock';

export default function Family() {
  const router = useRouter();

  return (
    <Screen>
      <View className="flex-1">
        <View className="px-6 pt-6 pb-4">
          <View className="flex-row items-center justify-between mb-4">
            <Pressable onPress={() => router.back()}>
              <AppText variant="h3">← Back</AppText>
            </Pressable>
          </View>

          <AppText variant="h1" className="mb-2">
            Family
          </AppText>

          <AppText variant="body" color={theme.colors.secondary}>
            Manage your family members and their activities
          </AppText>
        </View>

        <ScrollView className="flex-1 px-6">
          {mockKids.map((kid, index) => (
            <StaggeredItem index={index} key={kid.id}>
              <Card className="mb-6">
                <View className="flex-row items-center mb-4">
                  <View
                    className="w-14 h-14 rounded-full items-center justify-center mr-3"
                    style={{ backgroundColor: kid.color }}
                  >
                    <AppText variant="h2" color="#FFFFFF">
                      {kid.name.charAt(0)}
                    </AppText>
                  </View>
                  <View className="flex-1">
                    <AppText variant="h3" className="mb-1">
                      {kid.name}
                    </AppText>
                    <AppText variant="body" color={theme.colors.secondary}>
                      {kid.age} years old • {kid.school}
                    </AppText>
                  </View>
                </View>

                {kid.appointments.length > 0 && (
                  <View className="mb-4">
                    <AppText variant="h3" className="mb-2">
                      Upcoming Appointments
                    </AppText>
                    <View className="gap-2">
                      {kid.appointments.map((appointment, aIndex) => (
                        <View
                          key={aIndex}
                          className="bg-highlight rounded-input p-3 flex-row items-center border border-border"
                        >
                          <AppText className="text-lg mr-2">📅</AppText>
                          <AppText variant="body">{appointment}</AppText>
                        </View>
                      ))}
                    </View>
                  </View>
                )}

                {kid.notes.length > 0 && (
                  <View>
                    <AppText variant="h3" className="mb-2">
                      Notes & Reminders
                    </AppText>
                    <View className="gap-2">
                      {kid.notes.map((note, nIndex) => (
                        <View
                          key={nIndex}
                          className="bg-highlight rounded-input p-3 flex-row items-center border border-border"
                        >
                          <AppText className="text-lg mr-2">•</AppText>
                          <AppText variant="body" className="flex-1">
                            {note}
                          </AppText>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
              </Card>
            </StaggeredItem>
          ))}

          <Card pressable className="items-center py-8 mb-6 border border-accent/30 bg-accent/10">
            <AppText className="text-4xl mb-2">+</AppText>
            <AppText variant="h3" className="mb-1">
              Add Family Member
            </AppText>
            <AppText variant="body" color={theme.colors.secondary}>
              Add another child or family member
            </AppText>
          </Card>
        </ScrollView>
      </View>
    </Screen>
  );
}
