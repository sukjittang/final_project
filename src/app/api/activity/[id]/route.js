import { openDb } from '@/lib/database';
import { NextResponse } from 'next/server';

export async function PUT(req, { params }) {
  const db = openDb();
  const { id } = params;
  const {
    bookNo,
    title,
    date,
    fromDept,
    toDept,
    toDo,
    process,
  } = await req.json();

  try {
    db.prepare(`
      UPDATE documents
      SET bookNo = ?, title = ?, date = ?, fromDept = ?, toDept = ?, toDo = ?, process = ?
      WHERE id = ?
    `).run(bookNo, title, date, fromDept, toDept, toDo, process, id);

    return NextResponse.json({ message: 'อัปเดตสำเร็จ' });
  } catch (error) {
    console.error('PUT ERROR:', error);
    return NextResponse.json({ error: 'เกิดข้อผิดพลาด' }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  const db = openDb();
  const { id } = params;

  try {
    db.prepare(`DELETE FROM documents WHERE id = ?`).run(id);
    return NextResponse.json({ message: 'ลบสำเร็จ' });
  } catch (error) {
    console.error('DELETE ERROR:', error);
    return NextResponse.json({ error: 'ไม่สามารถลบได้' }, { status: 500 });
  }
}
