import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import Handlebars from 'handlebars';

import Template from './models/template';  // Import the Template model

const app = express();
app.use(express.json());

// MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/mernTemplateDb?retryWrites=true&w=majority';

// Connect to MongoDB Atlas
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

// MongoDB template schema
const templateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  template: { type: String, required: true } // Contains the template HTML with placeholders like {{name}}
});

const Template = mongoose.model('Template', templateSchema);

// Save template
app.post('/api/templates', async (req: Request, res: Response) => {
  const { name, template } = req.body;
  const newTemplate = new Template({ name, template });
  await newTemplate.save();
  res.status(201).json(newTemplate);
});

// Save a new template
app.post('/api/templates', async (req, res) => {
  const { name, template } = req.body;
  const newTemplate = new Template({ name, template });  // Create a new template instance
  await newTemplate.save();  // Save the template to MongoDB
  res.status(201).json(newTemplate);  // Respond with the saved template
});

// Generate document from template
app.post('/api/generate', async (req: Request, res: Response) => {
  const { templateId, variables } = req.body;

  // Fetch template from DB
  const template = await Template.findById(templateId);

  if (!template) {
    return res.status(404).json({ error: 'Template not found' });
  }

  // Compile the template with Handlebars
  const compiledTemplate = Handlebars.compile(template.template);
  const resultDocument = compiledTemplate(variables);

  // Return the generated document (in HTML format to preserve formatting)
  res.status(200).json({ generatedDocument: resultDocument });
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
