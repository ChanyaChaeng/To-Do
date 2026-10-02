# สิ่งที่ต้องทำ (Thai Todo)

React + Vite + Tailwind CSS v4 + lucide-react. ข้อมูลเก็บใน React state เท่านั้น (ไม่ใช้ localStorage)

## เริ่มใช้งาน

```bash
npm install
npm run dev      # เปิด http://localhost:5173
npm run build    # สร้างไฟล์ production ใน dist/
```

## โครงสร้าง

- `src/App.jsx` – state หลัก, ฟอร์มเพิ่มงาน, แท็บกรอง, ส่วนท้าย
- `src/components/TodoRow.jsx` – แต่ละรายการ (แก้ไข, ลบ, เปลี่ยนความสำคัญ)
- `src/constants.js` – ระดับความสำคัญและตัวกรอง
- `src/index.css` – Tailwind + ธีมสี (รองรับ dark mode อัตโนมัติ)
