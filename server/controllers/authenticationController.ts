import { Request, Response, NextFunction, RequestHandler } from 'express';
import bcrypt from 'bcrypt';
const db = require('../models/postgreSQL.ts');

interface AuthenticationController {
    signup: (req: Request, res: Response, next: NextFunction) => void;
    login: (req: Request, res: Response, next: NextFunction) => void;
}


const authenticationController: AuthenticationController =  {
    signup: async (req, res, next) => {
        try {
            const { username, password, email } = req.body;
            
            // Check if username and email are unique
            const userCheckQuery = 'SELECT * FROM Users WHERE username = $1 OR email = $2';
            const userCheckResults = await db.query(userCheckQuery, [username, email]);
            if (userCheckResults.rows.length > 0) {
                const existingUser = userCheckResults.rows[0];
                if (existingUser.username === username) {
                    return res.status(400).json({ error: 'Username is already in use.' });
                }
                if (existingUser.email === email) {
                    return res.status(400).json({ error: 'Email is already in use, please login.' });
                }
            }
            
            // Hash the password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            
            // Insert new user into the database
            const insertUserQuery = 'INSERT INTO Users (username, password, email) VALUES ($1, $2, $3)';
            const insertUserResults = await db.query(insertUserQuery, [username, hashedPassword, email]);
            // res.locals.signup = insertUserResults.rows[0];
            // console.log(res.locals.signup)
            return next();
        } catch (err) {
            console.log(err);
            return next(err);  // Passing error to the next middleware (error handler)
        }
    },
    login: async (req, res, next) => {
        try {
            const { username, password } = req.body;
    
            // Query the database to find a user with the given username
            const userQuery = 'SELECT * FROM Users WHERE username = $1';
            const userResults = await db.query(userQuery, [username]);
    
            // If no user is found, send an error response
            if (userResults.rows.length === 0) {
                return res.status(400).json({ error: 'Username or password incorrect.' });
            }
    
            const user = userResults.rows[0];
    
            // Compare the given password with the stored hashed password using bcrypt
            const passwordsMatch = await bcrypt.compare(password, user.password);
    
            // If the passwords match, proceed to the next middleware function
            // If they don't match, send an error response
            if (passwordsMatch) {
                return next();
            } else {
                return res.status(400).json({ error: 'Username or password incorrect.' });
            }
        } catch (err) {
            console.log(err);
            return next(err);  // Passing error to the next middleware (error handler)
        }
    }
};

export default authenticationController;