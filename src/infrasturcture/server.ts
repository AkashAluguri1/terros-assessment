import express from 'express';
import http from 'http';
import WebSocket from 'ws';  // Import WebSocket
import { configureRoutes } from '../adapters/http';  // Import configureRoutes
import { database } from './database';  // Import the in-memory database

const app = express();
const server = http.createServer(app);

// Create WebSocket server and attach it to the HTTP server
const wss = new WebSocket.Server({ server });

// Middleware for parsing JSON
app.use(express.json());

// Call configureRoutes to set up WebSocket communication
configureRoutes(wss);

// Start the server
const startServer = () => {
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

export default startServer;


