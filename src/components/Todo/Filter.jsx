import { useFilter } from "../../store";

// Компонент для фильтрации todo

const Filter = () => {
  const { filter, setFilter } = useFilter(); // берём функию из строра и которая принимает текущее состояние фильтра и меняет на другое
  return (
    <div className="flex gap-2 py-2 justify-center">
      <button
        className="disabled:bg-slate-600 disabled:text-slate-200 px-2 py-1 text-slate-600 bg-slate-200 border-2 border-black rounded-md transition-all"
        disabled={filter === "all"}
        onClick={() => setFilter("all")}
      >
        All
      </button>
      <button
        className="disabled:bg-slate-600 disabled:text-slate-200 px-2 py-1 text-slate-600 bg-slate-200 border-2 border-black rounded-md transition-all"
        disabled={filter === "uncompleted"}
        onClick={() => setFilter("uncompleted")}
      >
        Not Completed
      </button>
      <button
        className="disabled:bg-slate-600 disabled:text-slate-200 px-2 py-1 text-slate-600 bg-slate-200 border-2 border-black rounded-md transition-all"
        disabled={filter === "completed"}
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>
    </div>
  );
};
export default Filter;
