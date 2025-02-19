import mongoose, { Document, Schema } from 'mongoose';

// Define the TypeScript interface for the Template document
interface ITemplate extends Document {
  name: string;      // Name of the template (e.g., "Welcome Letter")
  template: string;  // HTML content with placeholders (e.g., "<h1>Hello, {{name}}</h1>")
}

// Define the Mongoose schema for the Template
const templateSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,  // Template name is required
    trim: true       // Trim spaces around the name
  },
  template: {
    type: String,
    required: true,  // Template content is required
  }
}, { timestamps: true });  // Optionally include timestamps for createdAt and updatedAt

// Create the Mongoose model for the Template
const Template = mongoose.model<ITemplate>('Template', templateSchema);

export default Template;
