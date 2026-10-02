import { useEffect, useRef, useState } from "react";
import { Check, Pencil, Trash2 } from "lucide-react";
import { PRIORITIES } from "../constants";

export default function TodoRow({ todo, onToggle, onDelete, onEdit, onCyclePriority }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const [leaving, setLeaving] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const startEdit = () => {
    setDraft(todo.text);
    setEditing(true);
  };

  const save = () => {
    const t = draft.trim();
    if (t && t !== todo.text) onEdit(todo.id, t);
    setEditing(false);
  };

  const remove = () => {
    setLeaving(true);
    setTimeout(() => onDelete(todo.id), 280);
  };

  return (
    <li className={"row " + (leaving ? "leaving" : "")}>
      <div>
        <div className="flex items-center gap-3 px-4 py-3 border-t line">
          <span className={"self-stretch w-1 rounded-full my-1 bar-" + todo.priority} />

          <button
            type="button"
            onClick={() => onToggle(todo.id)}
            className={"chk " + (todo.done ? "on" : "")}
            role="checkbox"
            aria-checked={todo.done}
            aria-label="ทำเสร็จแล้ว"
          >
            {todo.done && <Check size={14} strokeWidth={3} />}
          </button>

          <div className="flex-1 min-w-0">
            {editing ? (
              <input
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onBlur={save}
                onKeyDown={(e) => {
                  if (e.key === "Enter") save();
                  if (e.key === "Escape") setEditing(false);
                }}
                className="field w-full rounded-lg px-2 py-1 text-base"
                aria-label="แก้ไขงาน"
              />
            ) : (
              <span
                onDoubleClick={startEdit}
                title="ดับเบิลคลิกเพื่อแก้ไข"
                className={"block break-words cursor-text select-none " + (todo.done ? "line-through muted" : "")}
              >
                {todo.text}
              </span>
            )}
            <button
              type="button"
              onClick={() => onCyclePriority(todo.id)}
              title="แตะเพื่อเปลี่ยนระดับความสำคัญ"
              className={"mt-1 inline-block text-xs font-medium rounded-full px-2.5 py-0.5 p-" + todo.priority}
            >
              ความสำคัญ: {PRIORITIES[todo.priority].label}
            </button>
          </div>

          <div className="flex items-center gap-0.5 flex-none">
            <button type="button" className="icon-btn" onClick={startEdit} aria-label="แก้ไข">
              <Pencil size={17} />
            </button>
            <button type="button" className="icon-btn del" onClick={remove} aria-label="ลบ">
              <Trash2 size={17} />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
