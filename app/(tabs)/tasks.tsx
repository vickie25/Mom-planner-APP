import React, { useEffect, useState } from 'react';
import { LayoutAnimation, Platform, UIManager, View, ScrollView } from 'react-native';
import { AppText } from '../components/AppText';
import { Card } from '../components/Card';
import { Chip } from '../components/Chip';
import { ModalSheet } from '../components/ModalSheet';
import { TextField } from '../components/TextField';
import { Screen } from '../components/Screen';
import { SectionHeader } from '../components/SectionHeader';
import { EmptyState } from '../components/EmptyState';
import { StaggeredItem } from '../components/StaggeredItem';
import { SuccessBurst } from '../components/SuccessBurst';
import { theme } from '../constants/theme';
import { useApp } from '../lib/AppContext';
import { Task } from '../lib/mock';
import { softHaptic, successHaptic } from '../lib/haptics';

type FilterType = 'all' | 'today' | 'completed';

export default function Tasks() {
  const { tasks, addTask, toggleTask, removeTask } = useApp();
  const [filter, setFilter] = useState<FilterType>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTask, setNewTask] = useState<{ title: string; priority: Task['priority'] }>({
    title: '',
    priority: 'medium',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const today = new Date().toISOString().split('T')[0];

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'today') return task.dueDate === today;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const handleAddTask = () => {
    if (newTask.title) {
      addTask({
        title: newTask.title,
        completed: false,
        priority: newTask.priority,
      });
      setNewTask({ title: '', priority: 'medium' });
      setShowAddModal(false);
      setShowSuccess(true);
      successHaptic();
      setTimeout(() => setShowSuccess(false), 1200);
    }
  };

  const handleDeleteTask = (id: string) => {
    softHaptic();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    removeTask(id);
  };

  return (
    <Screen>
      <SuccessBurst visible={showSuccess} />
      <View className="flex-1">
        <View className="px-6 pt-6 pb-4">
          <SectionHeader
            title="Tasks"
            action="+ Add"
            onActionPress={() => setShowAddModal(true)}
          />
          <AppText variant="bodySmall" color={theme.colors.secondary}>
            {filteredTasks.length} tasks shown
          </AppText>
        </View>

        {/* Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-6 px-6"
          contentContainerClassName="gap-2"
        >
          <Chip
            label="All"
            selected={filter === 'all'}
            onPress={() => setFilter('all')}
          />
          <Chip
            label="Today"
            selected={filter === 'today'}
            onPress={() => setFilter('today')}
          />
          <Chip
            label="Completed"
            selected={filter === 'completed'}
            onPress={() => setFilter('completed')}
          />
        </ScrollView>

        {/* Tasks List */}
        <ScrollView className="flex-1 px-6">
          {filteredTasks.length === 0 ? (
            <EmptyState
              title="No tasks found"
              description="Add your first task to get started"
              icon="✓"
            />
          ) : (
            <View className="gap-3 pb-6">
              {filteredTasks.map((task, index) => (
                <StaggeredItem index={index} key={task.id}>
                  <Card
                    pressable
                    onPress={() => toggleTask(task.id)}
                    onLongPress={() => handleDeleteTask(task.id)}
                  >
                    <View className="flex-row items-start">
                      <View
                        className={`w-6 h-6 rounded-full border mr-3 mt-0.5 items-center justify-center ${
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
                        <AppText
                          variant="body"
                          className={task.completed ? 'line-through' : ''}
                          color={task.completed ? theme.colors.secondary : theme.colors.primary}
                        >
                          {task.title}
                        </AppText>
                        <View className="flex-row items-center gap-2 mt-1">
                          {task.priority === 'high' && (
                            <View className="bg-error/10 px-2 py-0.5 rounded border border-error/20">
                              <AppText variant="caption" color={theme.colors.error}>
                                High
                              </AppText>
                            </View>
                          )}
                          {task.dueDate && (
                            <AppText variant="caption" color={theme.colors.secondary}>
                              Due {new Date(task.dueDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                              })}
                            </AppText>
                          )}
                        </View>
                      </View>
                    </View>
                  </Card>
                </StaggeredItem>
              ))}
            </View>
          )}
        </ScrollView>

        {/* Add Task Modal */}
        <ModalSheet
          visible={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Add Task"
          primaryAction={{
            label: 'Add Task',
            onPress: handleAddTask,
          }}
          secondaryAction={{
            label: 'Cancel',
            onPress: () => setShowAddModal(false),
          }}
        >
          <View className="gap-4">
            <TextField
              label="Task Title"
              placeholder="e.g., Buy groceries"
              value={newTask.title}
              onChangeText={(text) => setNewTask({ ...newTask, title: text })}
            />
            
            <View>
              <AppText variant="bodySmall" color={theme.colors.secondary} className="mb-2">
                Priority
              </AppText>
              <View className="flex-row gap-2">
                <Chip
                  label="Low"
                  selected={newTask.priority === 'low'}
                  onPress={() => setNewTask({ ...newTask, priority: 'low' })}
                />
                <Chip
                  label="Medium"
                  selected={newTask.priority === 'medium'}
                  onPress={() => setNewTask({ ...newTask, priority: 'medium' })}
                />
                <Chip
                  label="High"
                  selected={newTask.priority === 'high'}
                  onPress={() => setNewTask({ ...newTask, priority: 'high' })}
                />
              </View>
            </View>
          </View>
        </ModalSheet>
      </View>
    </Screen>
  );
}
