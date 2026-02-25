import React, { useState } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { AppText } from '../components/AppText';
import { Card } from '../components/Card';
import { ModalSheet } from '../components/ModalSheet';
import { TextField } from '../components/TextField';
import { Screen } from '../components/Screen';
import { SectionHeader } from '../components/SectionHeader';
import { EmptyState } from '../components/EmptyState';
import { StaggeredItem } from '../components/StaggeredItem';
import { theme } from '../constants/theme';
import { useApp } from '../lib/AppContext';

export default function Calendar() {
  const { events, addEvent } = useApp();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', time: '' });

  const generateWeekDays = () => {
    const days = [];
    const today = new Date();
    for (let i = -3; i <= 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const weekDays = generateWeekDays();
  const selectedEvents = events.filter(e => e.date === selectedDate);

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.time) {
      addEvent({
        title: newEvent.title,
        date: selectedDate,
        time: newEvent.time,
        color: '#60A5FA',
      });
      setNewEvent({ title: '', time: '' });
      setShowAddModal(false);
    }
  };

  return (
    <Screen>
      <View className="flex-1">
        <View className="px-6 pt-6 pb-4">
          <SectionHeader
            title="Calendar"
            action="+ Add"
            onActionPress={() => setShowAddModal(true)}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-6 px-6"
          contentContainerClassName="gap-2"
        >
          {weekDays.map((day, index) => {
            const dateStr = day.toISOString().split('T')[0];
            const isSelected = dateStr === selectedDate;
            const hasEvents = events.some((e) => e.date === dateStr);

            return (
              <Pressable key={index} onPress={() => setSelectedDate(dateStr)}>
                <Card
                  className="w-16 items-center p-2"
                  style={
                    isSelected
                      ? { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary }
                      : undefined
                  }
                >
                  <AppText
                    variant="caption"
                    color={isSelected ? '#FFFFFF' : theme.colors.secondary}
                    className="mb-1 text-center"
                  >
                    {day.toLocaleDateString('en-US', { weekday: 'short' })}
                  </AppText>
                  <AppText
                    variant="h3"
                    color={isSelected ? '#FFFFFF' : theme.colors.primary}
                    className="text-center"
                  >
                    {day.getDate()}
                  </AppText>
                  {hasEvents && !isSelected && (
                    <View className="w-1.5 h-1.5 rounded-full bg-accent mt-1" />
                  )}
                </Card>
              </Pressable>
            );
          })}
        </ScrollView>

        <ScrollView className="flex-1 px-6">
          <AppText variant="h3" className="mb-4">
            {new Date(selectedDate).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </AppText>

          {selectedEvents.length === 0 ? (
            <EmptyState
              title="No events scheduled"
              description="Add your first event for this day"
              icon="○"
            />
          ) : (
            <View className="gap-3 pb-6">
              {selectedEvents.map((event, index) => (
                <StaggeredItem index={index} key={event.id}>
                  <Card>
                    <View className="flex-row items-center">
                      <View
                        className="w-1.5 h-12 rounded-full mr-3"
                        style={{ backgroundColor: event.color }}
                      />
                      <View className="flex-1">
                        <AppText variant="h3" className="mb-1">
                          {event.title}
                        </AppText>
                        <AppText variant="body" color={theme.colors.secondary}>
                          {event.time}
                        </AppText>
                      </View>
                    </View>
                  </Card>
                </StaggeredItem>
              ))}
            </View>
          )}
        </ScrollView>

        <ModalSheet
          visible={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Add Event"
          primaryAction={{
            label: 'Add Event',
            onPress: handleAddEvent,
          }}
          secondaryAction={{
            label: 'Cancel',
            onPress: () => setShowAddModal(false),
          }}
        >
          <View className="gap-4">
            <TextField
              label="Event Title"
              placeholder="e.g., Soccer Practice"
              value={newEvent.title}
              onChangeText={(text) => setNewEvent({ ...newEvent, title: text })}
            />
            <TextField
              label="Time"
              placeholder="e.g., 4:00 PM"
              value={newEvent.time}
              onChangeText={(text) => setNewEvent({ ...newEvent, time: text })}
            />
          </View>
        </ModalSheet>
      </View>
    </Screen>
  );
}
