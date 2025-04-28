import "./App.css";
import { useEffect, useState } from "react";
import { collection, query, orderBy, where, limit, startAfter, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import { useAuth, AuthProvider } from "./contexts/AuthContext";
import ModalConfirm from "./components/ModalConfirm";
import TodoItem from "./components/TodoItem";
import dayjs from "dayjs";

function AppContent() {
  const { currentUser, login, logout } = useAuth();
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  const handleChange = (value) => setValue(value);

  const handleAddTodo = async () => {
    if (!value.trim()) return;
    await addDoc(collection(db, "todos"), {
      job: value,
      createdAt: new Date(),
      completed: false,
      completedAt: null,
      userId: currentUser.uid,
    });
    setValue("");
  };

  const fetchTodos = (loadMore = false) => {
    if (!currentUser) return;
    let q = query(
      collection(db, "todos"),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "desc"),
      limit(10)
    );

    if (loadMore && lastDoc) {
      q = query(
        collection(db, "todos"),
        where("userId", "==", currentUser.uid),
        orderBy("createdAt", "desc"),
        startAfter(lastDoc),
        limit(10)
      );
    }

    onSnapshot(q, (snapshot) => {
      const todosData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (loadMore) {
        setTodos(prev => [...prev, ...todosData]);
      } else {
        setTodos(todosData);
      }
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
    });
  };

  const handleDeleteTodo = (todo) => {
    setTodoToDelete(todo);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    await deleteDoc(doc(db, "todos", todoToDelete.id));
    setShowModal(false);
    setTodoToDelete(null);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setTodoToDelete(null);
  };

  useEffect(() => {
    if (currentUser) {
      fetchTodos();
    }
  }, [currentUser]);

  return (
    <div style={{ margin: "50px" }}>
      <h1>Todo App</h1>

      {currentUser ? (
        <>
          <button onClick={logout} style={{ marginBottom: "20px" }}>Đăng xuất</button>

          <div>
            <input
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Nhập công việc"
              style={{ marginRight: "10px", padding: "5px 10px" }}
            />
            <button onClick={handleAddTodo} style={{ padding: "5px 15px" }}>
              Thêm
            </button>
          </div>

          {todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} onDelete={handleDeleteTodo} />
          ))}

          {lastDoc && (
            <button onClick={() => fetchTodos(true)} style={{ marginTop: "20px" }}>
              Load thêm
            </button>
          )}
        </>
      ) : (
        <button onClick={login}>Đăng nhập với Google</button>
      )}

      <ModalConfirm
        show={showModal}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        message={`Bạn có chắc chắn muốn xóa công việc "${todoToDelete?.job}"?`}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
