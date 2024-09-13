import { useState, useRef } from "react";
import TodoList from "./TodoList";
import {v4 as uuidv4 } from "uuid";

function App() {
const [todos,settodos] = useState([]);

  const todoNameRef = useRef();

  const handleAddTodo =() => {
    //タスクを追加する。
    const name = todoNameRef.current.value;
    if (name === "")return;
    settodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, completed: false }];
    });
    todoNameRef.current.value = null;
  };

  const toggleTodo = (id) => {
    //与えられた引数のidと一致するtodoをtodolistの中から検索し、そのチェック状態を変更する関数
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    settodos(newTodos);
  };

  const handleClear = () => {
    //チェックが入っているtodoを削除する関数
    const newTodos = todos.filter((todo) => !todo.completed);
    settodos(newTodos);
  };

  return (
    <div>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input type="text" ref={todoNameRef} />
      <button onClick={handleAddTodo}>タスクを追加</button>
      <button onClick={handleClear}>完了したタスクの削除</button>
      <div>残りのタスク：{todos.filter((todo) => !todo.completed).length}</div>
    </div>
  );
}

export default App;
