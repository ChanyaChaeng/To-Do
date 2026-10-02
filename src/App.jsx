import { useRef, useState } from "react";
import { ListChecks, Plus } from "lucide-react";
import TodoRow from "./components/TodoRow.jsx";
import { FILTERS, PRIORITIES, PRIORITY_ORDER } from "./constants";

export default function App() {
  const nextId = useRef(4);
  const [todos, setTodos] = useState([
    { id: 1, text: "ส่งรายงานประจำสัปดาห์", done: false, priority: "high" },
    { id: 2, text: "ซื้อของเข้าบ้าน", done: false, priority: "medium" },
    { id: 3, text: "อ่านหนังสือ 30 นาที", done: true, priority: "low" },
  ]);
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [filter, setFilter] = useState("all");

  const add = () => {
    const t = text.trim();
    if (!t) return;
    setTodos((l) => [{ id: nextId.current++, text: t, done: false, priority }, ...l]);
    setText("");
  };
  const toggle = (id) => setTodos((l) => l.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));
  const del = (id) => setTodos((l) => l.filter((x) => x.id !== id));
  const edit = (id, t) => setTodos((l) => l.map((x) => (x.id === id ? { ...x, text: t } : x)));
  const cycle = (id) =>
    setTodos((l) =>
      l.map((x) =>
        x.id === id
          ? { ...x, priority: PRIORITY_ORDER[(PRIORITY_ORDER.indexOf(x.priority) + 1) % PRIORITY_ORDER.length] }
          : x
      )
    );
  const clearDone = () => setTodos((l) => l.filter((x) => !x.done));

  const remaining = todos.filter((t) => !t.done).length;
  const doneCount = todos.length - remaining;
  const shown = todos.filter((t) => (filter === "all" ? true : filter === "active" ? !t.done : t.done));
  const emptyText =
    filter === "completed"
      ? "ยังไม่มีงานที่เสร็จแล้ว"
      : filter === "active"
      ? "ไม่มีงานค้างแล้ว เยี่ยมมาก!"
      : "ยังไม่มีงาน เพิ่มงานแรกของคุณด้านบนได้เลย";

  return (
    <main className="min-h-screen px-3 sm:px-6 py-8 sm:py-14">
      <div className="mx-auto w-full max-w-xl">
        <header className="flex items-center gap-3 mb-5 px-1">
          <span className="btn-accent rounded-xl p-2.5">
            <ListChecks size={22} />
          </span>
          <div>
            <h1 className="text-2xl font-semibold leading-tight">สิ่งที่ต้องทำ</h1>
            <p className="muted text-sm">จัดการงานของคุณให้เป็นระเบียบ</p>
          </div>
        </header>

        <section className="card p-4 mb-4">
          <div className="flex gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && add()}
              placeholder="เพิ่มงานใหม่..."
              aria-label="งานใหม่"
              className="field flex-1 min-w-0 rounded-xl px-4 py-2.5 text-base"
            />
            <button
              type="button"
              onClick={add}
              className="btn-accent rounded-xl px-4 flex items-center gap-1.5 font-medium flex-none"
              aria-label="เพิ่มงาน"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">เพิ่ม</span>
            </button>
          </div>
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className="muted text-sm">ความสำคัญ</span>
            {PRIORITY_ORDER.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPriority(p)}
                aria-pressed={priority === p}
                className={"text-sm font-medium rounded-full px-3 py-1 border transition p-" + p}
                style={{ borderColor: priority === p ? "currentColor" : "transparent", opacity: priority === p ? 1 : 0.6 }}
              >
                {PRIORITIES[p].label}
              </button>
            ))}
          </div>
        </section>

        <section className="card overflow-hidden">
          <nav className="flex gap-1 p-2" aria-label="ตัวกรอง">
            {FILTERS.map((f) => (
              <button key={f.id} type="button" onClick={() => setFilter(f.id)} className={"tab " + (filter === f.id ? "on" : "")}>
                {f.label}
              </button>
            ))}
          </nav>

          {shown.length === 0 ? (
            <p className="muted text-center text-sm py-10 px-4 border-t line">{emptyText}</p>
          ) : (
            <ul className="list-none m-0 p-0">
              {shown.map((t) => (
                <TodoRow key={t.id} todo={t} onToggle={toggle} onDelete={del} onEdit={edit} onCyclePriority={cycle} />
              ))}
            </ul>
          )}

          <footer className="flex items-center justify-between gap-3 px-4 py-3 border-t line text-sm">
            <span className="muted">
              เหลืออีก <b style={{ color: "var(--text)" }}>{remaining}</b> งาน
            </span>
            <button
              type="button"
              onClick={clearDone}
              disabled={doneCount === 0}
              className="font-medium rounded-lg px-2 py-1 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ color: "var(--highfg)" }}
            >
              ล้างงานที่เสร็จแล้ว{doneCount > 0 ? ` (${doneCount})` : ""}
            </button>
          </footer>
        </section>

        <p className="muted text-xs text-center mt-4">
          ดับเบิลคลิกที่ข้อความเพื่อแก้ไข · กด Enter เพื่อบันทึก · Esc เพื่อยกเลิก
        </p>
      </div>
    </main>
  );
}
