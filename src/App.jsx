import "./App.css";
import TodoList from "./components/Todo/TodoList";
import Filter from "./components/Todo/Filter";
import NewTodo from "./components/Todo/NewTodo";
import TotalTodos from "./components/Todo/TotalTodos";
import "./index.css";
function App() {
  return (
    <div className="container bg-slate-200 px-2 py-2">
      <NewTodo />
      <Filter />
      <TodoList />
      <TotalTodos />
    </div>
  );
}

export default App;
