# WebSocket Dashboard Example

A real-time dashboard application demonstrating WebSocket communication between Express.js server and React client.

> ⚠️ **Note:** This is an experimental project created for learning purposes. The code is not optimized for production use and serves as a practice example for WebSocket API implementation.

## Features

- Real-time data visualization using Recharts
- WebSocket server implementation with Express.js
- Dynamic chart updates with mock user count data
- WebSocket client using React WebSocket API

## Tech Stack

- Backend: Express.js, WebSocket
- Frontend: React, Recharts
- Protocol: WebSocket (ws://)

## Setup

1. Clone the repository
2. Install dependencies:

```bash
cd server
cd npm i
```

```bash
cd client
cd npm i
```

3. Start the server:

```bash
cd server
npm run dev
```

4. Start the client:

```bash
cd client
npm run dev
```

## How It Works

1. Server establishes WebSocket connection
2. Client connects using React WebSocket API
3. Server sends mock user count data periodically
4. Frontend displays data in real-time using Recharts
5. Chart updates dynamically as new data arrives
