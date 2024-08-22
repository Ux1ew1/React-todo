import { useRef, useState } from "react";
import { useFilter, useTodos } from "../../store";
import { FaPencilAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const TodoList = () => {
  // импорты функций из стора 
  const toggleTodo = useTodos((state) => state.toggleTodo); 
  const filter = useFilter((state) => state.filter);
  const editTodos = useTodos((state) => state.editTodos);
  const completeTodos = useTodos((state) => state.completeTodo);
  
  // Проверка на то какой фильтр сейчас выбран для сортировки туду 
  const todoList = useTodos((state) => {
    switch (filter) {
      case "completed":
        return state.todos.filter((todo) => todo.completed);
      case "uncompleted":
        return state.todos.filter((todo) => !todo.completed);
      default:
        return state.todos;
    }
  });

  // стейт для хранения редактируемого текста и функция для его редактирования 
  const [editTodo, setEditTodo] = useState(null);

  // useRef для инпута редактируемого текста 
  const ref = useRef();

  // функция для сохранения изменённого текста в туду 
  const saveEditTodo = () => {
    editTodos(editTodo.id, editTodo.title);
    setEditTodo(null);
  };

  console.log(todoList); // Массив todo 

  return (
    <div className="flex flex-col gap-4 py-2">
      {todoList.map((item) => (
        <div
          className="px-4 py-2 bg-white todo flex gap-4 items-center text-black justify-between"
          key={item?.id}
        >
          <div className="flex gap-6">
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleTodo(item.id)}
            />
            {editTodo && editTodo.id === item.id ? (
              <>
                <input
                  className="px-1 bg-white todo flex gap-4 items-center text-black border-2 border-gray-600 rounded-md"
                  type="text"
                  value={editTodo.value}
                  ref={ref}
                  onChange={(event) =>
                    setEditTodo({ ...editTodo, title: event.target.value })
                  }
                  onKeyDown={(event) =>
                    event.key === "Enter" && !!ref.current.value
                      ? saveEditTodo()
                      : null
                  }
                  onKeyUp={(event) =>
                    event.key === "Escape" && setEditTodo(null)
                  }
                  autoFocus
                />
                <button onClick={() => saveEditTodo()}>Save</button>
              </>
            ) : (
              <span>{item.title}</span>
            )}
          </div>
          <div className="flex gap-2">
            <button className="px-1 py-1" onClick={() => setEditTodo(item)}>
              <FaPencilAlt />
            </button>
            <button onClick={() => completeTodos(item)}>
              <IoMdClose />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default TodoList;
