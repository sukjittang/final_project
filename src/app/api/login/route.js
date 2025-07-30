import { openDb } from '../../../lib/database';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'กรุณากรอกอีเมลและรหัสผ่าน' },
        { status: 400 }
      );
    }

    const db = openDb();
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

    if (!user) {
      return NextResponse.json(
        { message: 'ไม่พบบัญชีผู้ใช้นี้' },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'รหัสผ่านไม่ถูกต้อง' },
        { status: 401 }
      );
    }

    // เข้าสู่ระบบสำเร็จ
    return NextResponse.json({
      message: 'success',
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { 
        message: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ',
        error: error.message 
      },
      { status: 500 }
    );
  }
}
