'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DocumentTracker() {
  const [documents, setDocuments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedRow, setEditedRow] = useState({});
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('userRole');

    if (!isLoggedIn || userRole !== 'Staff') {
      alert('คุณไม่มีสิทธิ์เข้าถึงหน้านี้');
      router.push('/login');
      return;
    }

    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    const res = await fetch('/api/activity');
    const data = await res.json();
    setDocuments(data);
  };

  const handleEdit = (doc) => {
    setEditingId(doc.id);
    setEditedRow({ ...doc });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedRow({});
  };

  const handleChange = (e, field) => {
    setEditedRow({ ...editedRow, [field]: e.target.value });
  };

  const handleSave = async () => {
    await fetch(`/api/activity/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedRow),
    });
    setEditingId(null);
    setEditedRow({});
    fetchDocuments();
  };

  const handleDelete = async (id) => {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?')) {
      await fetch(`/api/activity/${id}`, { method: 'DELETE' });
      fetchDocuments();
    }
  };

  return (
    <div>
      <h2>ติดตามเอกสาร</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>หนังสือเลขที่</th>
            <th>เรื่อง</th>
            <th>ลงวันที่</th>
            <th>จาก</th>
            <th>ถึง</th>
            <th>ให้ดำเนินการ</th>
            <th>การดำเนินการ</th>
            <th>จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc, index) => (
            <tr key={doc.id}>
              <td>{index + 1}</td>

              {editingId === doc.id ? (
                <>
                  <td><input value={editedRow.bookNo} onChange={(e) => handleChange(e, 'bookNo')} /></td>
                  <td><input value={editedRow.title} onChange={(e) => handleChange(e, 'title')} /></td>
                  <td><input value={editedRow.date} onChange={(e) => handleChange(e, 'date')} /></td>
                  <td><input value={editedRow.fromDept} onChange={(e) => handleChange(e, 'fromDept')} /></td>
                  <td><input value={editedRow.toDept} onChange={(e) => handleChange(e, 'toDept')} /></td>
                  <td><input value={editedRow.toDo} onChange={(e) => handleChange(e, 'toDo')} /></td>
                  <td><input value={editedRow.process || ''} onChange={(e) => handleChange(e, 'process')} /></td>
                  <td>
                    <button onClick={handleSave}>บันทึก</button>{' '}
                    <button onClick={handleCancel}>ยกเลิก</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{doc.bookNo}</td>
                  <td>{doc.title}</td>
                  <td>{doc.date}</td>
                  <td>{doc.fromDept}</td>
                  <td>{doc.toDept}</td>
                  <td>{doc.toDo}</td>
                  <td>{doc.process}</td>
                  <td>
                    <button onClick={() => handleEdit(doc)}>แก้ไข</button>{' '}
                    <button onClick={() => handleDelete(doc.id)}>ลบ</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
