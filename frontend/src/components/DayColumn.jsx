import DayHeader from './DayHeader';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';

export default function DayColumn({ date, todos, onAdd, onToggle, onDelete, onEdit }) {
  const today = new Date();
  const isToday =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();

  return (
    <div className={`day-column${isToday ? ' today' : ''}`}>
      <DayHeader date={date} />
      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </ul>
      <AddTodoForm onAdd={onAdd} />
    </div>
  );
}
