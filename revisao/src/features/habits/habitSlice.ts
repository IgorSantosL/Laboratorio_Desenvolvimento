import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Habit {
  id: number;
  name: string;
  category: string;
}

interface HabitsState {
  habits: Habit[];
  selectedCategory: string;
}

const initialState: HabitsState = {
  habits: [],
  selectedCategory: '',
};

const habitSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    addHabit: (state, action: PayloadAction<Habit>) => {
      state.habits.push(action.payload);
    },
    removeHabit: (state, action: PayloadAction<number>) => {
      state.habits = state.habits.filter((habit) => habit.id !== action.payload);
    },
    filterHabits: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { addHabit, removeHabit, filterHabits } = habitSlice.actions;
export default habitSlice.reducer;