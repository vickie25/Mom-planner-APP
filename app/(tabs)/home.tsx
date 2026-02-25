import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { AppText } from '../components/AppText';
import { Card } from '../components/Card';
import { Screen } from '../components/Screen';
import { SectionHeader } from '../components/SectionHeader';
import { Skeleton } from '../components/Skeleton';
import { StaggeredItem } from '../components/StaggeredItem';
import { theme } from '../constants/theme';
import { useApp } from '../lib/AppContext';

export default function Home() {
  const router = useRouter();
  const { tasks, events, toggleTask } = useApp();

  const today = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter(t => !t.completed && t.dueDate === today);
  const nextEvent = events.find(e => e.date >= today);

  const quickActions = [
    { icon: '🛒', label: 'Grocery', route: '/grocery' },
    { icon: '👨‍👩‍👧', label: 'Family', route: '/family' },
    { icon: '✓', label: 'Add Task', route: '/(tabs)/tasks' },
    { icon: '📅', label: 'Add Event', route: '/(tabs)/calendar' },
  ];
  const isLoading = false;

  return (
    <Screen>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pt-6 pb-10"
      >
        <AppText variant="h1" className="mb-2">
          Hello, Maia ✨
        </AppText>
        <AppText variant="body" color={theme.colors.secondary} className="mb-6">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </AppText>

        <Card className="mb-6 border border-accent/30 bg-accent/10">
          <AppText variant="h3" className="mb-3">
            Today's focus
          </AppText>
          {isLoading ? (
            <View className="gap-3">
              <Skeleton height={18} width="60%" />
              <Skeleton height={48} />
              <Skeleton height={48} />
            </View>
          ) : (
            <>
              <View className="flex-row gap-4">
                <View className="flex-1 bg-surface rounded-input p-3 border border-border">
                  <AppText variant="caption" color={theme.colors.secondary} className="mb-1">
                    Tasks Due
                  </AppText>
                  <AppText variant="h2">{todayTasks.length}</AppText>
                </View>
                <View className="flex-1 bg-surface rounded-input p-3 border border-border">
                  <AppText variant="caption" color={theme.colors.secondary} className="mb-1">
                    Next Event
                  </AppText>
                  <AppText variant="body" numberOfLines={1}>
                    {nextEvent ? nextEvent.time : 'None'}
                  </AppText>
                </View>
              </View>

              {nextEvent && (
                <View className="mt-4 pt-4 border-t border-border/60">
                  <AppText variant="bodySmall" color={theme.colors.secondary} className="mb-1">
                    Coming up
                  </AppText>
                  <AppText variant="h3">{nextEvent.title}</AppText>
                </View>
              )}
            </>
          )}
        </Card>

        <SectionHeader title="Quick Actions" className="mb-3" />
        <View className="flex-row flex-wrap gap-3 mb-8">
          {quickActions.map((action, index) => (
            <StaggeredItem index={index} key={index} className="flex-1 min-w-[45%]">
              <Pressable onPress={() => router.push(action.route as any)}>
                <Card className="items-center py-6 bg-surface/90">
                  <View className="w-12 h-12 rounded-full bg-highlight items-center justify-center mb-3">
                    <AppText className="text-2xl">{action.icon}</AppText>
                  </View>
                  <AppText variant="body">{action.label}</AppText>
                </Card>
              </Pressable>
            </StaggeredItem>
          ))}
        </View>

        <SectionHeader
          title="Top Priorities"
          action="See all →"
          onActionPress={() => router.push('/(tabs)/tasks')}
        />

        {todayTasks.length === 0 ? (
          <Card>
            <AppText variant="body" color={theme.colors.secondary} className="text-center py-4">
              No tasks due today. Enjoy your day! 🎉
            </AppText>
          </Card>
        ) : (
          <View className="gap-3">
            {todayTasks.slice(0, 3).map((task, index) => (
              <StaggeredItem index={index} key={task.id}>
                <Card pressable onPress={() => toggleTask(task.id)}>
                  <View className="flex-row items-center">
                    <View
                      className={`w-6 h-6 rounded-full border mr-3 items-center justify-center ${
                        task.completed ? 'bg-primary border-primary' : 'border-border-dark'
                      }`}
                    >
                      {task.completed && (
                        <AppText variant="caption" color="#FFFFFF">
                          ✓
                        </AppText>
                      )}
                    </View>
                    <View className="flex-1">
                      <AppText variant="body">{task.title}</AppText>
                      {task.priority === 'high' && (
                        <AppText variant="caption" color={theme.colors.error}>
                          High priority
                        </AppText>
                      )}
                    </View>
                  </View>
                </Card>
              </StaggeredItem>
            ))}
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}
