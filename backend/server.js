require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.set('io', io);
app.use(cors());
app.use(express.json({ limit: '5mb' }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/favorites', require('./routes/favorites'));
app.use('/api/users', require('./routes/users'));
app.use('/api/dashboard', require('./routes/dashboard'));

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Zentra Store API sedang berjalan 🚀' });
});

io.on('connection', (socket) => {
  console.log('🔌 Client terhubung:', socket.id);
  socket.on('disconnect', () => console.log('❌ Client terputus:', socket.id));
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`\n🟢 Zentra API berjalan di http://localhost:${PORT}`);
  console.log(`🔌 Socket.io realtime sync aktif — perubahan admin langsung tersinkron ke app customer\n`);
});
