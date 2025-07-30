import { useState } from 'react';

export default function AddDocumentForm() {
  const [form, setForm] = useState({
    bookNo: '',
    title: '',
    date: '',
    from: '',
    to: '',
    toDo: '',
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

const handleSubmit = async () => {
  const response = await fetch('/api/activity', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });

  const result = await response.json();

  if (response.ok) {
    alert('บันทึกสำเร็จ');
    setForm({ bookNo: '', title: '', date: '', from: '', to: '', toDo: '' });
  } else {
    alert(result.error || 'เกิดข้อผิดพลาด');
  }
};

  return (
    <div>
      {[
        ['bookNo', 'หนังสือเลขที่'],
        ['title', 'เรื่อง'],
        ['date', 'ลงวันที่'],
        ['from', 'จาก'],
        ['to', 'ถึง'],
        ['toDo', 'ให้ดำเนินการ'],
      ].map(([field, label]) => (
        <div key={field} style={{ marginBottom: '10px' }}>
          <label>{label}</label>
          <input
            type={field === 'date' ? 'date' : 'text'}
            value={form[field]}
            onChange={(e) => handleChange(field, e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>
      ))}
      <button
        onClick={handleSubmit}
        style={{
          marginTop: '15px',
          padding: '10px 20px',
          backgroundColor: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        บันทึก
      </button>
    </div>
  );
}
