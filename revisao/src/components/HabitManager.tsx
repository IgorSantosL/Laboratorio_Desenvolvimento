import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import {
  addHabit,
  removeHabit,
  filterHabits,
} from '../features/habits/habitSlice';

const categories = ['Saúde', 'Estudo', 'Lazer'];

export default function HabitManager() {
  const dispatch = useDispatch<AppDispatch>();
  const habits = useSelector((state: RootState) => state.habits.habits);
  const selectedCategory = useSelector(
    (state: RootState) => state.habits.selectedCategory
  );

  const [name, setName] = useState('');
  const [category, setCategory] = useState('Saúde');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) return;

    dispatch(
      addHabit({
        id: Date.now(),
        name: name.trim(),
        category,
      })
    );

    setName('');
    setCategory('Saúde');
  };

  const visibleHabits =
    selectedCategory === ''
      ? habits
      : habits.filter((habit) => habit.category === selectedCategory);

  return (
    <section className="card">
      <h2>Gerenciar Hábitos</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Digite o nome do hábito"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <button type="submit">Cadastrar hábito</button>
      </form>

      <div className="filter-box">
        <label htmlFor="habit-filter">Filtrar por categoria:</label>
        <select
          id="habit-filter"
          value={selectedCategory}
          onChange={(e) => dispatch(filterHabits(e.target.value))}
        >
          <option value="">Todas</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <h3>Hábitos cadastrados</h3>

      <ul>
        {visibleHabits.map((habit) => (
          <li key={habit.id} className="list-item">
            <span>
              {habit.name} - <strong>{habit.category}</strong>
            </span>
            <button onClick={() => dispatch(removeHabit(habit.id))}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}