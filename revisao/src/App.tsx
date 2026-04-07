import './App.css';
import UserManager from './components/UserManager';
import HabitManager from './components/HabitManager';

function App() {
  return (
    <main className="app">
      <header className="app-header">
        <h1>Revisão - React Redux e Context</h1>
        <p>Mini dashboard com gerenciamento global usando Redux Toolkit.</p>
      </header>

      <div className="dashboard">
        <UserManager />
        <HabitManager />
      </div>
    </main>
  );
}

export default App;