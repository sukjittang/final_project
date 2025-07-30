import { NextResponse } from 'next/server';
import { openDb } from '@/lib/database'; // ✅ ต้อง import ก่อนใช้

// เชื่อมต่อฐานข้อมูล
const db = openDb();

// สร้าง table หากยังไม่มี
db.prepare(`
  CREATE TABLE IF NOT EXISTS documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bookNo TEXT,
    title TEXT,
    date TEXT,
    fromDept TEXT,
    toDept TEXT,
    toDo TEXT,
    process TEXT
  )
`).run();

export async function POST(req) {
  try {
    const body = await req.json();
    console.log('Received data:', body);

    const { bookNo, title, date, from, to, toDo, process } = body;

    const stmt = db.prepare(`
      INSERT INTO documents (bookNo, title, date, fromDept, toDept, toDo, process)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(bookNo, title, date, from, to, toDo, process);

    return NextResponse.json({ message: 'บันทึกสำเร็จ' });
  } catch (error) {
    console.error('POST ERROR:', error);
    return NextResponse.json({ error: 'เกิดข้อผิดพลาด' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const stmt = db.prepare(`SELECT * FROM documents ORDER BY id DESC`);
    const rows = stmt.all();

    return NextResponse.json(rows);
  } catch (error) {
    console.error('GET ERROR:', error);
    return NextResponse.json({ error: 'ไม่สามารถดึงข้อมูลได้' }, { status: 500 });
  }
}
