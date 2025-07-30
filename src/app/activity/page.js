'use client';

import { useState } from 'react';
import TabBar from '../components/TabBar';
import AddDocumentForm from '../components/AddDocumentForm';
import DocumentTracker from '../components/DocumentTracker';

export default function ActivityPage() {
  const [activeTab, setActiveTab] = useState('add');

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      
      <TabBar activeTab={activeTab} onChange={setActiveTab} />
      <div style={{ marginTop: '20px' }}>
        {activeTab === 'add' ? <AddDocumentForm /> : <DocumentTracker />}
      </div>
    </div>
  );
}
