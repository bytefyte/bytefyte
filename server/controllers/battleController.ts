import { Request, Response, NextFunction, RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';
const db = require('../models/postgreSQL.ts');
interface problem{
  id: number,
  problem_name: string,
  answer: string,
  difficulty: string,
  problem_question:string,
  editortext: string,
}
const battleController = {
  resetProblems: async ()=>{
    await db.query(`DROP TABLE IF EXISTS problems `)
    await db.query(`CREATE TABLE IF NOT EXISTS problems 
      (id SERIAL PRIMARY KEY,
      problem_name VARCHAR(1000) NOT NULL,
      answer TEXT NOT NULL,
      difficulty VARCHAR(100),
      problem_question TEXT NOT NULL, 
      editortext TEXT NOT NULL)`);
    const problems = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/problems.json')).toString());
    problems.forEach(async (problem: problem) => {
      console.log(problem);
      await db.query('INSERT INTO problems (problem_name, answer, difficulty, problem_question, editortext) VALUES($1, $2, $3, $4, $5)', [problem['problem_name'], problem['answer'], problem['difficulty'] , problem['problem_question'], problem['editortext']])
    });
      return;
  },
  getProblems: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userQuery = `SELECT *
      FROM problems
      ORDER BY RANDOM()
      LIMIT 3;`;
      const userCheckResults = await db.query(userQuery);
      console.log(userCheckResults.rows);
      res.locals.problems = userCheckResults.rows;
      next();
    } catch (error) {
      next(error);
    }
  },
};
const populateProblems = async()=>{
  
}
export default battleController;
