# MERN-Stack

Project Overview:
The goal of this project is to:
- Save HTML templates with placeholders (like {{name}}, {{address}}, etc.) in MongoDB Atlas.
- Dynamically fill in the placeholders with provided variables and generate documents (e.g., letters, invoices).
- Allow users to input variables via a form and generate a filled document based on the selected template.

```
/mern-template-generator
  /backend
    ├── /src
    │   ├── server.ts       // Express server code
    │   ├── models
    │   │   └── template.ts // Mongoose template schema
    ├── /node_modules
    ├── package.json
  /frontend
    ├── /src
    │   ├── App.tsx           // React main component
    │   ├── components
    │   │   └── TemplateForm.tsx  // Form for submitting variables
    ├── /node_modules
    ├── package.json
