export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  color: string;
}

export interface GroceryItem {
  id: string;
  name: string;
  category: 'Produce' | 'Pantry' | 'Dairy' | 'Meat' | 'Other';
  checked: boolean;
}

export interface Kid {
  id: string;
  name: string;
  age: number;
  color: string;
  school: string;
  appointments: string[];
  notes: string[];
}

export interface Meal {
  id: string;
  type: 'breakfast' | 'lunch' | 'dinner';
  name: string;
  description: string;
}

export const mockTasks: Task[] = [
  { id: '1', title: 'Pick up kids from school', completed: false, priority: 'high', dueDate: '2026-01-25' },
  { id: '2', title: 'Prepare dinner ingredients', completed: false, priority: 'medium', dueDate: '2026-01-25' },
  { id: '3', title: 'Schedule dentist appointment', completed: false, priority: 'low' },
  { id: '4', title: 'Buy birthday gift for Emma', completed: true, priority: 'medium' },
];

export const mockEvents: Event[] = [
  { id: '1', title: 'Soccer Practice', date: '2026-01-25', time: '4:00 PM', color: '#4ADE80' },
  { id: '2', title: 'Parent-Teacher Meeting', date: '2026-01-26', time: '3:30 PM', color: '#60A5FA' },
  { id: '3', title: 'Play Date with Emma', date: '2026-01-27', time: '2:00 PM', color: '#F472B6' },
  { id: '4', title: 'Piano Lesson', date: '2026-01-28', time: '5:00 PM', color: '#A78BFA' },
];

export const mockGroceryItems: GroceryItem[] = [
  { id: '1', name: 'Tomatoes', category: 'Produce', checked: false },
  { id: '2', name: 'Spinach', category: 'Produce', checked: false },
  { id: '3', name: 'Pasta', category: 'Pantry', checked: true },
  { id: '4', name: 'Olive Oil', category: 'Pantry', checked: false },
  { id: '5', name: 'Milk', category: 'Dairy', checked: false },
  { id: '6', name: 'Cheese', category: 'Dairy', checked: true },
  { id: '7', name: 'Chicken Breast', category: 'Meat', checked: false },
];

export const mockKids: Kid[] = [
  {
    id: '1',
    name: 'Sophie',
    age: 8,
    color: '#F472B6',
    school: 'Maple Elementary',
    appointments: ['Dentist - Jan 30, 2PM', 'Soccer tryouts - Feb 5'],
    notes: ['Permission slip for field trip', 'Book fair money needed'],
  },
  {
    id: '2',
    name: 'Jake',
    age: 5,
    color: '#60A5FA',
    school: 'Sunny Kindergarten',
    appointments: ['Doctor checkup - Feb 2, 10AM'],
    notes: ['Show and tell Friday', 'Bring healthy snack'],
  },
];

export const mealIdeas = {
  breakfast: [
    { name: 'Avocado Toast', description: 'Whole grain toast with mashed avocado and eggs' },
    { name: 'Berry Smoothie Bowl', description: 'Mixed berries, yogurt, and granola' },
    { name: 'Pancakes', description: 'Fluffy pancakes with maple syrup and fresh fruit' },
    { name: 'Oatmeal', description: 'Steel-cut oats with honey and banana' },
  ],
  lunch: [
    { name: 'Chicken Caesar Salad', description: 'Grilled chicken, romaine, parmesan' },
    { name: 'Turkey Wrap', description: 'Whole wheat tortilla with turkey and veggies' },
    { name: 'Tomato Soup & Grilled Cheese', description: 'Classic comfort food combo' },
    { name: 'Quinoa Buddha Bowl', description: 'Quinoa, roasted vegetables, tahini' },
  ],
  dinner: [
    { name: 'Spaghetti Bolognese', description: 'Classic pasta with meat sauce' },
    { name: 'Baked Salmon', description: 'Herb-crusted salmon with roasted vegetables' },
    { name: 'Chicken Stir Fry', description: 'Chicken and vegetables in teriyaki sauce' },
    { name: 'Tacos', description: 'Ground beef tacos with all the fixings' },
  ],
};