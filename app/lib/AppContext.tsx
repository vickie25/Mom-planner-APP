import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockTasks, mockEvents, mockGroceryItems, Task, Event, GroceryItem, Meal, mealIdeas } from './mock';

interface AppContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  events: Event[];
  addEvent: (event: Omit<Event, 'id'>) => void;
  groceryItems: GroceryItem[];
  addGroceryItem: (item: Omit<GroceryItem, 'id'>) => void;
  toggleGroceryItem: (id: string) => void;
  currentMeals: { breakfast: Meal; lunch: Meal; dinner: Meal };
  shuffleMeals: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>(mockGroceryItems);
  
  const getRandomMeal = (type: 'breakfast' | 'lunch' | 'dinner') => {
    const ideas = mealIdeas[type];
    const random = ideas[Math.floor(Math.random() * ideas.length)];
    return {
      id: Math.random().toString(),
      type,
      name: random.name,
      description: random.description,
    };
  };

  const [currentMeals, setCurrentMeals] = useState({
    breakfast: getRandomMeal('breakfast'),
    lunch: getRandomMeal('lunch'),
    dinner: getRandomMeal('dinner'),
  });

  const addTask = (task: Omit<Task, 'id'>) => {
    setTasks([...tasks, { ...task, id: Date.now().toString() }]);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addEvent = (event: Omit<Event, 'id'>) => {
    setEvents([...events, { ...event, id: Date.now().toString() }]);
  };

  const addGroceryItem = (item: Omit<GroceryItem, 'id'>) => {
    setGroceryItems([...groceryItems, { ...item, id: Date.now().toString() }]);
  };

  const toggleGroceryItem = (id: string) => {
    setGroceryItems(groceryItems.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const shuffleMeals = () => {
    setCurrentMeals({
      breakfast: getRandomMeal('breakfast'),
      lunch: getRandomMeal('lunch'),
      dinner: getRandomMeal('dinner'),
    });
  };

  return (
    <AppContext.Provider
      value={{
        tasks,
        addTask,
        toggleTask,
        removeTask,
        events,
        addEvent,
        groceryItems,
        addGroceryItem,
        toggleGroceryItem,
        currentMeals,
        shuffleMeals,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
