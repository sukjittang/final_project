import { openDb } from '../../../lib/database';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, password, role } = await request.json();

    // ตรวจสอบข้อมูล
    if (!email || !password || !role) {
      return NextResponse.json(
        { message: 'กรุณากรอกข้อมูลให้ครบถ้วน' },
        { status: 400 }
      );
    }

    // ตรวจสอบรูปแบบอีเมล
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'รูปแบบอีเมลไม่ถูกต้อง' },
        { status: 400 }
      );
    }

    // ตรวจสอบความยาวรหัสผ่าน
    if (password.length < 6) {
      return NextResponse.json(
        { message: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร' },
        { status: 400 }
      );
    }

    // ตรวจสอบ role ที่อนุญาต
    const allowedRoles = ['Admin', 'Plan', 'Academic', 'Student'];
    if (!allowedRoles.includes(role)) {
      return NextResponse.json(
        { message: 'บทบาทที่เลือกไม่ถูกต้อง' },
        { status: 400 }
      );
    }

    const db = openDb();

    // ตรวจสอบว่าอีเมลซ้ำหรือไม่
    const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

    if (existingUser) {
      return NextResponse.json(
        { message: 'อีเมลนี้ถูกใช้งานแล้ว' },
        { status: 400 }
      );
    }

    // เข้ารหัสรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 12);

    // บันทึกข้อมูลผู้ใช้
    const insertStmt = db.prepare('INSERT INTO users (email, password, role) VALUES (?, ?, ?)');
    const result = insertStmt.run(email, hashedPassword, role);

    return NextResponse.json({ 
      message: 'สมัครสมาชิกสำเร็จ',
      userId: result.lastInsertRowid 
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { 
        message: 'เกิดข้อผิดพลาดในการสมัครสมาชิก',
        error: error.message 
      },
      { status: 500 }
    );
  }
}
