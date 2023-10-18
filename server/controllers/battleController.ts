import { Request, Response, NextFunction, RequestHandler } from 'express';
import bcrypt from 'bcrypt';
const db = require('../models/postgreSQL.ts');

const battleController = {
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
