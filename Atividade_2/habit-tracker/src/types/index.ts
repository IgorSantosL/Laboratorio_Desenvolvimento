export interface Habit {
  id: string;
  name: string;
  category: string;
  completed: boolean;
}

export type Category = 'Todas' | 'Saúde' | 'Estudo' | 'Lazer' | 'Outro';

export interface HabitsState {
  habits: Habit[];
  filter: Category;
}
