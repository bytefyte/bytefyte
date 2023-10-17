import 'dotenv/config';
import express, { Express, Request, Response, NextFunction } from 'express';
import { join } from 'path';
import { Server, Socket } from 'socket.io';
import http from 'http';
import cors from 'cors';

// const authenticationController = require('./controllers/authenticationController')
import authenticationController from './controllers/authenticationController';

const app: Express = express();
const httpServer: http.Server = http.createServer(app);
const io: Server = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:8000'],
  },
});

app.use(cors<Request>());
app.use(express.json());
app.use(express.static(join(__dirname, '../client/assets')));

// This only comes into play when we build the app and run it in production mode
if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/dist'
  app.use('/dist', express.static(join(__dirname, '../dist')));
  // serve index.html on the route '/'
  app.get('/', (req: Request, res: Response) =>
    res.status(200).sendFile(join(__dirname, '../index.html'))
  );
}

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server :)');
});

app.post(
  '/api/signup',
  authenticationController.signup,
  (req: Request, res: Response) => {
    res.status(200).json({
      message: 'User successfully created',
      username: res.locals.username,
    });
  }
);

app.post(
  '/api/login',
  authenticationController.login,
  (req: Request, res: Response) => {
    res
      .status(200)
      .json({ message: 'Login successful', username: res.locals.username });
  }
);

// Unknown route handler
app.use((req: Request, res: Response) => res.sendStatus(404));

//TODO: Validate error handling is working correctly
// Global Error Handler
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: err,
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

const matchmakingQueue: string[] = []; // Array to hold users in queue

io.on('connection', (socket: Socket) => {
  console.log('User connected:', socket.id);

  // Handle joinMatch event
  socket.on('joinQueue', (username) => {
    console.log('User joined queue:', username, socket.id);
    matchmakingQueue.push(socket.id);
  
    // Check if two users are in the queue
    if (matchmakingQueue.length >= 2) {
      const user1 = matchmakingQueue.shift();
      const user2 = matchmakingQueue.shift();
  
      if (user1 && user2) {
        const roomName = user1 + user2;  // or username1 + username2
        io.to(user1).emit('matchFound', { roomName });
        io.to(user2).emit('matchFound', { roomName });

        io.sockets.sockets.get(user1)?.join(roomName);
        io.sockets.sockets.get(user2)?.join(roomName);
      }
    }
  });

  // Handle leaveMatch event
  socket.on('leaveMatch', () => {
    console.log('User left match:', socket.id);
    // Notify the other user in the match that their opponent has left
    // Note: You may need additional logic to determine the other user in the match
    // For simplicity, we'll assume the other user's socket ID is stored in a variable called otherUser
    // const otherUser = ...;
    // io.to(otherUser).emit('opponentLeft');
  });
  socket.on('whateva', () => {
    console.log('poop 1');
    socket.broadcast.emit('whateva');
  });
  // Handle disconnect event
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    // Optional: Remove user from matchmaking queue if they disconnect
    const index = matchmakingQueue.indexOf(socket.id);
    if (index !== -1) {
      matchmakingQueue.splice(index, 1);
    }
  });
});

httpServer.listen(3000, () => {
  console.log(`[server]: Server is running at http://localhost:3000`);
});
