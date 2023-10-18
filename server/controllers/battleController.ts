import { Request, Response, NextFunction, RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';
const db = require('../models/postgreSQL.ts');

const battleController = {
  createTable: async ()=>{
    db.query(`CREATE TABLE IF NOT EXISTS problems 
      (id SERIAL PRIMARY KEY,
      problem_name VARCHAR(1000) NOT NULL,
      answer TEXT NOT NULL,
      difficulty VARCHAR(100),
      problem_question TEXT NOT NULL, 
      editortext TEXT NOT NULL),`
  );
  
  },
  dropTable: async()=>{
    db.query(`DROP TABLE problems`)
  },
  populateProblems: async()=>{
    const problems = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/problems.json')));
    problems.forEach(problem => {
      console.log(problem);
      db.query('INSERT INTO problems (problem_name, answer, difficulty, problem_question, editortext) VALUES($1, $2, $3, $4, $5)', [problem['problem_name'], problem['answer'], problem['difficulty'] , problem['problem_question'], problem['editortext']])
    });
  },
  getProblems: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userQuery = 'SELECT * FROM problems';
      const userCheckResults = await db.query(userQuery);
      console.log(userCheckResults.rows);
      res.locals.problems = userCheckResults.rows;
      next();
    } catch (error) {
      next(error);
    }
  },
};

export default battleController;
