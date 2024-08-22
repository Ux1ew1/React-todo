import { create } from "zustand";
import { nanoid } from "nanoid";
import { persist } from "zustand/middleware";

export const useTodos = create(
  // Всё завёрнуто в persist чтобы сохранять todo в localStorage
  persist(
    (set, get) => ({
      // Массив для хранения todo
      todos: [
        { id: 1, title: "Задача 1", completed: true },
        { id: 2, title: "Задача 2", completed: false },
      ],

      // Функция для добавления новых todo в массив. Функция принимает title и возвращает todo в виде нового объекта в массив
      addTodo: (title) =>
        set((state) => {
          const newTodo = {
            id: nanoid(),
            title,
            completed: false,
          };
          return { todos: [...state.todos, newTodo] }; // Возвращаем диструктурированный массив с новым todo
        }),

      // Функция для изменения состояния todo. Принимает id тудушки
      toggleTodo: (todoId) =>
        set({
          todos: get().todos.map(
            (
              todo // мапимся по всем туду
            ) =>
              todoId === todo.id
                ? { ...todo, completed: !todo.completed }
                : todo // если id туду совпадает с id из массива, то меняем состояние этой туду на противоположное, в ином случае просто возвращаем туду ничего не меняя
          ),
        }),

      // Функция для редактирования туду. Принимаем id туду и текущий текст
      editTodos: (todoId, itemText) =>
        set((state) => {
          // Мапимся по массиву, проверяем туду по id и если всё верно, то диструктурируем туду и меняем у неё title, в ином случае возвращаем todo без изменений
          const editTodos = state.todos.map((todo) =>
            todo.id === todoId ? { ...todo, title: itemText } : todo
          );
          return { todos: editTodos }; // Возвращаем изменённый массив туду
        }),

      // Функция для скрытия выполненных туду
      completeTodo: (todo) =>
        set((state) => {
          const itemIndex = state.todos.indexOf(todo); // Получаем инлекс туду в массиве передавая всю туду в indexOf
          state.todos.splice(itemIndex, 1); // Убираем туду из массива по индексу
          return { todos: [...state.todos] }; // Возвращаем изменённый массив туду
        }),
    }),
    {
      name: "todo",
    }
  )
);

// Функция для фильтрации массива туду
export const useFilter = create((set) => ({
  filter: "all", // Начальное состоря филтра
  setFilter: (value) => set({ filter: value }), // Меняем value филтра на полученный из компонента
}));
