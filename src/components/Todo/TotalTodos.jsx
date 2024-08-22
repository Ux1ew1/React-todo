import { useTodos } from "../../store";

const TotalTodos = () => {
  const count = useTodos((state) => state.todos.length); // Смотрим длину массива todo и выводим значение в total count
  return <div>Total: {count}</div>;
};
export default TotalTodos;
