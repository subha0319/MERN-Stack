// TemplateForm.tsx

import React, { useState } from 'react';

const TemplateForm: React.FC = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [templateId, setTemplateId] = useState('');
  const [generatedDocument, setGeneratedDocument] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        templateId,
        variables: { name, address, phone },
      }),
    });
    
    const data = await response.json();
    setGeneratedDocument(data.generatedDocument);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Address:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        <label>
          Phone:
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <button type="submit">Generate Document</button>
      </form>
      
      {generatedDocument && (
        <div>
          <h3>Generated Document:</h3>
          <div dangerouslySetInnerHTML={{ __html: generatedDocument }} />
        </div>
      )}
    </div>
  );
};

export default TemplateForm;
