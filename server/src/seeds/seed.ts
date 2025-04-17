import db from "../config/connection.js";
import Question from "../models/Question.js";
import cleanDB from "./cleanDb.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pythonQuestionsPath = path.join(__dirname, 'pythonQuestions.json');
let pythonQuestions;

try {
  const fileData = fs.readFileSync(pythonQuestionsPath, 'utf8');
  pythonQuestions = JSON.parse(fileData);
  console.log(`Loaded ${pythonQuestions.length} questions from JSON file`);
} catch (err) {
  console.error('Error loading questions file:', err);
  process.exit(1);
}

// Set a timeout for MongoDB connection
const connectionTimeout = setTimeout(() => {
  console.log('MongoDB connection timeout - application will continue without seeding');
  process.exit(0); // Exit with success code to not fail the build
}, 5000);

// Handle connection errors
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  clearTimeout(connectionTimeout);
  console.log('Continuing without seeding due to connection error');
  process.exit(0); // Exit with success code to not fail the build
});

// When connected, seed the database
db.once('open', async () => {
  try {
    clearTimeout(connectionTimeout);
    console.log('Connected to MongoDB, seeding database...');
    
    await cleanDB('Question', 'questions');
    await Question.insertMany(pythonQuestions);
    
    console.log(`${pythonQuestions.length} questions seeded successfully!`);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
});
