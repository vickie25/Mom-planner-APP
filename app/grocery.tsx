import React, { useState } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { AppText } from './components/AppText';
import { Card } from './components/Card';
import { ModalSheet } from './components/ModalSheet';
import { TextField } from './components/TextField';
import { Chip } from './components/Chip';
import { Screen } from './components/Screen';
import { StaggeredItem } from './components/StaggeredItem';
import { theme } from './constants/theme';
import { useApp } from './lib/AppContext';
import { GroceryItem } from './lib/mock';

type Category = GroceryItem['category'];

export default function Grocery() {
  const router = useRouter();
  const { groceryItems, addGroceryItem, toggleGroceryItem } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', category: 'Produce' as Category });

  const categories: Category[] = ['Produce', 'Pantry', 'Dairy', 'Meat', 'Other'];
  
  const groupedItems = categories.reduce((acc, category) => {
    acc[category] = groceryItems.filter(item => item.category === category);
    return acc;
  }, {} as Record<Category, GroceryItem[]>);

  const handleAddItem = () => {
    if (newItem.name) {
      addGroceryItem({
        name: newItem.name,
        category: newItem.category,
        checked: false,
      });
      setNewItem({ name: '', category: 'Produce' });
      setShowAddModal(false);
    }
  };

  const checkedCount = groceryItems.filter(i => i.checked).length;
  const totalCount = groceryItems.length;

  return (
    <Screen>
      <View className="flex-1">
        <View className="px-6 pt-6 pb-4">
          <View className="flex-row items-center justify-between mb-4">
            <Pressable onPress={() => router.back()}>
              <AppText variant="h3">← Back</AppText>
            </Pressable>
            <Pressable onPress={() => setShowAddModal(true)}>
              <AppText variant="body" color={theme.colors.primary}>
                + Add
              </AppText>
            </Pressable>
          </View>

          <AppText variant="h1" className="mb-2">
            Grocery List
          </AppText>

          <AppText variant="body" color={theme.colors.secondary}>
            {checkedCount} of {totalCount} items checked
          </AppText>
        </View>

        <View className="px-6 mb-6">
          <View className="h-2 bg-border rounded-full overflow-hidden">
            <View
              className="h-full bg-primary"
              style={{
                width: `${totalCount > 0 ? (checkedCount / totalCount) * 100 : 0}%`,
              }}
            />
          </View>
        </View>

        <ScrollView className="flex-1 px-6">
          {categories.map((category) => {
            const items = groupedItems[category];
            if (items.length === 0) return null;

            return (
              <View key={category} className="mb-6">
                <AppText variant="h3" className="mb-3">
                  {category}
                </AppText>

                <View className="gap-2">
                  {items.map((item, index) => (
                    <StaggeredItem index={index} key={item.id}>
                      <Card pressable onPress={() => toggleGroceryItem(item.id)}>
                        <View className="flex-row items-center">
                          <View
                            className={`w-6 h-6 rounded-full border mr-3 items-center justify-center ${
                              item.checked ? 'bg-primary border-primary' : 'border-border-dark'
                            }`}
                          >
                            {item.checked && (
                              <AppText variant="caption" color="#FFFFFF">
                                ✓
                              </AppText>
                            )}
                          </View>
                          <AppText
                            variant="body"
                            className={item.checked ? 'line-through' : ''}
                            color={item.checked ? theme.colors.secondary : theme.colors.primary}
                          >
                            {item.name}
                          </AppText>
                        </View>
                      </Card>
                    </StaggeredItem>
                  ))}
                </View>
              </View>
            );
          })}

          <View className="h-20" />
        </ScrollView>

        <ModalSheet
          visible={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Add Grocery Item"
          primaryAction={{
            label: 'Add Item',
            onPress: handleAddItem,
          }}
          secondaryAction={{
            label: 'Cancel',
            onPress: () => setShowAddModal(false),
          }}
        >
          <View className="gap-4">
            <TextField
              label="Item Name"
              placeholder="e.g., Tomatoes"
              value={newItem.name}
              onChangeText={(text) => setNewItem({ ...newItem, name: text })}
            />

            <View>
              <AppText variant="bodySmall" color={theme.colors.secondary} className="mb-2">
                Category
              </AppText>
              <View className="flex-row flex-wrap gap-2">
                {categories.map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    selected={newItem.category === category}
                    onPress={() => setNewItem({ ...newItem, category })}
                  />
                ))}
              </View>
            </View>
          </View>
        </ModalSheet>
      </View>
    </Screen>
  );
}
