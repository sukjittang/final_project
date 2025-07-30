export default function HomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    }}>

        <img 
        src="/SciRMUTP-Thai.png" 
        alt="logo" 
        style={{width:'180px',height:'180px',marginBottom: '1rem' }}
      />


      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>
        ระบบติดตามเอกสาร
      </h1>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <a 
          href="/register" 
          style={{
            padding: '12px 24px',
            backgroundColor: 'white',
            color: '#667eea',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 'bold'
          }}
        >
          สมัครสมาชิก
        </a>
        <a 
          href="/login" 
          style={{
            padding: '12px 24px',
            backgroundColor: 'transparent',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            border: '2px solid white',
            fontWeight: 'bold'
          }}
        >
          เข้าสู่ระบบ
        </a>
      </div>
    </div>
  );
}
