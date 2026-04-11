export default function TodoItem({ todo, onToggle, onDelete }) {
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
