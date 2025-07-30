'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'Choose'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // ✅ ตรวจสอบว่าเลือก role หรือยัง
    if (formData.role === 'Choose') {
      setError('กรุณาเลือกบทบาท');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('สมัครสมาชิกสำเร็จ!');
        router.push('/login');
      } else {
        setError(data.message || 'เกิดข้อผิดพลาด');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '10px',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
      }}>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <img 
            src="/SciRMUTP-Thai.png" 
            alt="logo" 
            style={{width:'120px',height:'120px',marginBottom: '1rem'}}
          />
          <h1 style={{ 
            marginBottom: '10px',
            fontSize: '2rem',
            color: '#333'
          }}>
            ลงทะเบียน
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{marginBottom: '20px' }}>
            <input
              type="email"
              placeholder="อีเมล"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <input
              type="password"
              placeholder="รหัสผ่าน (อย่างน้อย 6 ตัวอักษร)"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              required
              minLength="6"
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <select
              value={formData.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            >
              <option value="Choose">โปรดเลือก</option>
              <option value="Admin">ฝ่ายบริหาร</option>
              <option value="Plan">ฝ่ายวางแผน</option>
              <option value="Academic">ฝ่ายวิชาการและวิจัย</option>
              <option value="Student">ฝ่ายกิจการนักศึกษา</option>
            </select>
          </div>

          {error && (
            <div style={{
              color: '#d32f2f',
              textAlign: 'center',
              marginBottom: '20px',
              padding: '10px',
              backgroundColor: '#ffebee',
              borderRadius: '5px',
              border: '1px solid #ffcdd2'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: loading ? '#ccc' : '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => {
              if (!loading) e.target.style.backgroundColor = '#5a67d8';
            }}
            onMouseOut={(e) => {
              if (!loading) e.target.style.backgroundColor = '#667eea';
            }}
          >
            {loading ? 'กำลังสมัคร...' : 'สมัครสมาชิก'}
          </button>
        </form>

        <div style={{ 
          textAlign: 'center', 
          marginTop: '20px',
          color: '#666'
        }}>
          มีบัญชีแล้ว? <a href="/login" style={{ color: '#667eea' }}>เข้าสู่ระบบ</a>
        </div>
      </div>
    </div>
  );
}
