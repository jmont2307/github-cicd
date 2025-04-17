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

// Set a timeout to exit the process if MongoDB connection fails
const connectionTimeout = setTimeout(() => {
  console.error('MongoDB connection timeout - could not connect to database');
  process.exit(1);
}, 10000);

// Handle connection errors
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  clearTimeout(connectionTimeout);
  process.exit(1);
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
