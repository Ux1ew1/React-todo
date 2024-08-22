// Компонент для добавления нового туду

import { useRef } from "react";
import { useTodos } from "../../store";
import { FaPlus } from "react-icons/fa";

const NewTodo = () => {
  const ref = useRef(); // useRef чтобы забираться value из input
  const addTodo = useTodos((state) => state.addTodo); // импорт функции addTodo из стора

  // функция для передачи value в стор и очистки инпута
  const handleAddTodo = () => {
    addTodo(ref.current.value);
    ref.current.value = "";
  };

  return (
    <div className="wrapper flex">
      <div className="w-full flex gap-2 justify-center">
        <input
          className="w-1/2 rounded-md border-2 border-gray-600 outline-none px-1"
          type="text"
          placeholder="Type here"
          ref={ref}
          onKeyDown={(event) =>
            event.key === "Enter" && !!ref.current.value
              ? handleAddTodo()
              : null
          }
        />
        <button
          className="hover:bg-gray-200 px-2 py-2 bg-slate-100 border-gray-600 border-2 rounded-md"
          onClick={handleAddTodo}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default NewTodo;
