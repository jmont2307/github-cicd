import db from "../config/connection.js";
import Question from "../models/Question.js";
import cleanDB from "./cleanDb.js";

import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pythonQuestionsPath = join(__dirname, './pythonQuestions.json');
const pythonQuestionsData = await readFile(pythonQuestionsPath, 'utf8');
const pythonQuestions = JSON.parse(pythonQuestionsData);

db.once('open', async () => {
  await cleanDB('Question', 'questions');

  await Question.insertMany(pythonQuestions);

  console.log('Questions seeded!');
  process.exit(0);
});
