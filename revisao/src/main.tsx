import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { store } from './app/store';
import { addUser, removeUser } from './features/users/userSlice';
import { addHabit, removeHabit, filterHabits } from './features/habits/habitSlice';

declare global {
  interface Window {
    store: typeof store;
    reduxActions: {
      addUser: typeof addUser;
      removeUser: typeof removeUser;
      addHabit: typeof addHabit;
      removeHabit: typeof removeHabit;
      filterHabits: typeof filterHabits;
    };
  }
}

window.store = store;
window.reduxActions = {
  addUser,
  removeUser,
  addHabit,
  removeHabit,
  filterHabits,
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);