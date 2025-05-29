require('dotenv').config();
const http = require('http');
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('node:path');
const cors = require('cors');
const { Server } = require('socket.io');

const PORT = 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
    },
});

app.use(cookieParser('ihawp.com'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true,
}));

// Routers
const authRouter = require('./routers/authRouter');
const teamsRouter = require('./routers/teamsRouter');
const accountsRouter = require('./routers/accountsRouter');

/**
 * @route USE /auth
 * @description Authentication route (login, register, magic...). Sub-routes are used to alter user-sesion status.
 * @router authRouter
 */
app.use('/auth', authRouter);


/**
 * @route USE /teams
 * @description Teams related route, mainly used for database operations of `teams` table
 * @router teamsRouter
 */
app.use('/teams', teamsRouter);


/**
 * @route USE /accounts
 * @description Allow users to retrieve and update their own account information
 * @router accountsRouter
 */
app.use('/accounts', accountsRouter);

// socket.io

io.on('connection', (socket) => {
    socket.on('message', (data) => {
        console.log(data);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Serve Front-End
app.use(express.static(path.join(__dirname, 'react-frontend', 'dist')));
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'react-frontend', 'dist', 'index.html'));
});

server.listen(PORT);