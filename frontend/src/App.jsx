import { useState, useCallback } from 'react';
import WeekNavigation from './components/WeekNavigation';
import WeekView from './components/WeekView';
import NotificationModal from './components/NotificationModal';
import { useTodos } from './hooks/useTodos';
import { useNotification } from './hooks/useNotification';

// Returns the Monday of the week containing the given date
function getMonday(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0=Sun, 1=Mon, ...
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export default function App() {
  const [weekMonday, setWeekMonday] = useState(() => getMonday(new Date()));
  const [showModal, setShowModal] = useState(false);

  const { todos, todayTodos, loading, error, addTodo, toggleTodo, removeTodo } =
    useTodos(weekMonday);

  const handleNotification = useCallback(() => {
    setShowModal(true);
  }, []);

  useNotification(handleNotification);

  function prevWeek() {
    setWeekMonday((d) => {
      const n = new Date(d);
      n.setDate(n.getDate() - 7);
      return n;
    });
  }

  function nextWeek() {
    setWeekMonday((d) => {
      const n = new Date(d);
      n.setDate(n.getDate() + 7);
      return n;
    });
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Weekly Todo</h1>
      </header>

      <WeekNavigation weekMonday={weekMonday} onPrev={prevWeek} onNext={nextWeek} />

      {error && <div className="error-banner">오류: {error}</div>}
      {loading ? (
        <div className="loading">불러오는 중...</div>
      ) : (
        <WeekView
          weekMonday={weekMonday}
          todos={todos}
          onAdd={addTodo}
          onToggle={toggleTodo}
          onDelete={removeTodo}
        />
      )}

      {showModal && (
        <NotificationModal todos={todayTodos} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
