import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import dayjs from "dayjs";

function TodoItem({ todo, onDelete }) {
  const toggleCompleted = async () => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
      completedAt: !todo.completed ? new Date() : null,
    });
  };

  return (
    <div style={{
      margin: "20px 0", padding: "10px",
      border: "1px solid #ccc", borderRadius: "8px",
      backgroundColor: todo.completed ? "#d4edda" : "#f8d7da"
    }}>
      <h3
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          color: todo.completed ? "gray" : "black",
        }}
      >
        {todo.job}
      </h3>

      <p>Tạo lúc: {todo.createdAt?.seconds
        ? dayjs(todo.createdAt.seconds * 1000).format("HH:mm:ss [ngày] DD/MM/YYYY")
        : "Unknown"}</p>

      <p>Trạng thái: {todo.completed ? "✅ Đã hoàn thành" : "❌ Chưa hoàn thành"}</p>

      {todo.completed && todo.completedAt?.seconds && (
        <p>Hoàn thành lúc: {dayjs(todo.completedAt.seconds * 1000).format("HH:mm:ss [ngày] DD/MM/YYYY")}</p>
      )}

      <button onClick={toggleCompleted} style={{ marginRight: "10px" }}>
        {todo.completed ? "Bỏ hoàn thành" : "Đánh dấu hoàn thành"}
      </button>

      <button onClick={() => onDelete(todo)}>Xóa</button>
    </div>
  );
}

export default TodoItem;
