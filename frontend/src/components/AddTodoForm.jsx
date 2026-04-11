import { useState } from 'react';

export default function AddTodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [open, setOpen] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd(trimmed, time || null);
    setTitle('');
    setTime('');
    setOpen(false);
  }

  if (!open) {
    return (
      <button className="add-todo-btn" onClick={() => setOpen(true)} aria-label="할일 추가">
        + 추가
      </button>
    );
  }

  return (
    <form className="add-todo-form" onSubmit={handleSubmit}>
      <input
        autoFocus
        type="text"
        placeholder="할일 제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={100}
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        placeholder="시간 (선택)"
      />
      <div className="form-actions">
        <button type="submit">추가</button>
        <button type="button" onClick={() => setOpen(false)}>취소</button>
      </div>
    </form>
  );
}
