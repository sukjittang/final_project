import Database from 'better-sqlite3';
import path from 'path';

let db = null;

export function openDb() {
  if (!db) {
    const dbPath = path.join(process.cwd(), 'database.sqlite');
    db = new Database(dbPath);

    // สร้างตาราง users ถ้ายังไม่มี
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'Staff',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // สร้างตาราง documents ถ้ายังไม่มี
    db.exec(`
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
    `);
  }
  return db;
}

export function getUserByEmail(email) {
  const db = openDb();
  return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
}

export function getAllUsers() {
  const db = openDb();
  return db.prepare('SELECT id, email, role, created_at FROM users').all();
}

export function deleteUserById(id) {
  const db = openDb();
  return db.prepare('DELETE FROM users WHERE id = ?').run(id);
}

export function updateUserRole(id, role) {
  const db = openDb();
  return db.prepare('UPDATE users SET role = ? WHERE id = ?').run(role, id);
}
