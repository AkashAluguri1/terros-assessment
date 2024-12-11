import WebSocket from 'ws';  // Importing the WebSocket class
import { database } from '../../infrasturcture/database';

// Update this function to expect WebSocket.Server as an argument
export const configureRoutes = (wss: WebSocket.Server) => {
    // WebSocket server logic
    wss.on('connection', (ws: WebSocket) => {
        console.log('A user connected via WebSocket');
        
        // Listen for messages from the client
        ws.on('message', (message: string) => {
            const { type, gameId } = JSON.parse(message);

            switch (type) {
                case 'createGame':
                    if (!database.games.has(gameId)) {
                        database.games.set(gameId, { gameId, players: [] });
                        console.log(`Game created with ID: ${gameId}`);
                        ws.send(JSON.stringify({ type: 'gameCreated', gameId }));
                    } else {
                        ws.send(JSON.stringify({ type: 'error', message: 'Game already exists' }));
                    }
                    break;

                case 'joinGame':
                    const game = database.games.get(gameId);
                    if (game) {
                        game.players.push(ws);
                        console.log(`User joined game ${gameId}`);
                        ws.send(JSON.stringify({ type: 'gameJoined', game }));
                    } else {
                        ws.send(JSON.stringify({ type: 'error', message: 'Game not found' }));
                    }
                    break;

                default:
                    console.log(`Unknown message type: ${type}`);
                    break;
            }
        });

        // Handle WebSocket disconnection
        ws.on('close', () => {
            console.log('User disconnected');
        });
    });
};



