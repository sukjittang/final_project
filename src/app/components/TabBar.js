export default function TabBar({ activeTab, onChange }) {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <button
        onClick={() => onChange('add')}
        style={{
          padding: '10px 20px',
          backgroundColor: activeTab === 'add' ? '#667eea' : '#eee',
          color: activeTab === 'add' ? '#fff' : '#000',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        เพิ่มเอกสาร
      </button>
      <button
        onClick={() => onChange('track')}
        style={{
          padding: '10px 20px',
          backgroundColor: activeTab === 'track' ? '#667eea' : '#eee',
          color: activeTab === 'track' ? '#fff' : '#000',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        ติดตามเอกสาร
      </button>
    </div>
  );
}
