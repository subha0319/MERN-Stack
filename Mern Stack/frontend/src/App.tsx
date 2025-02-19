import React, { useState } from 'react';
import axios from 'axios';

const TemplateForm: React.FC = () => {
  const [variables, setVariables] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    date: ''
  });
  const [generatedDoc, setGeneratedDoc] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVariables({
      ...variables,
      [e.target.name]: e.target.value
    });
  };

  const generateDocument = async () => {
    try {
      const response = await axios.post('/api/generate', {
        templateId: 'templateIdHere', // This would be dynamic in a real case
        variables
      });
      setGeneratedDoc(response.data.generatedDocument);
    } catch (error) {
      console.error('Error generating document:', error);
    }
  };

  return (
    <div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={variables.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={variables.address}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={variables.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={variables.phone}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="text"
          name="date"
          value={variables.date}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={generateDocument}>Generate Document</button>

      <div>
        <h3>Generated Document:</h3>
        <div dangerouslySetInnerHTML={{ __html: generatedDoc }} />
      </div>
    </div>
  );
};

export default TemplateForm;
