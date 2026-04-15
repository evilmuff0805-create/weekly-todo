const PRIORITY_LABELS = { high: '높음', medium: '중간', low: '낮음' };

export default function TodoItem({ todo, onToggle, onDelete }) {
  const priority = todo.priority || 'medium';
  return (
    <li className={`todo-item${todo.completed ? ' completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id, !todo.completed)}
        aria-label={`${todo.completed ? '완료 취소' : '완료'}: ${todo.title}`}
      />
      <span className="todo-title">{todo.title}</span>
      {todo.time && <span className="todo-time">{todo.time}</span>}
      <span className={`priority-badge ${priority}`}>{PRIORITY_LABELS[priority]}</span>
      <button
        className="delete-btn"
        onClick={() => onDelete(todo.id)}
        aria-label="삭제"
      >
        ×
      </button>
    </li>
  );
}
