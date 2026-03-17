import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Selectors
export const selectAllHabits = (state: RootState) => state.habits.habits;
export const selectFilter = (state: RootState) => state.habits.filter;

export const selectFilteredHabits = (state: RootState) => {
  const { habits, filter } = state.habits;
  if (filter === 'Todas') return habits;
  return habits.filter((h) => h.category === filter);
};
