const express = require('express');
const { v4: uuid } = require('uuid');
const db = require('../db');
const { authRequired, adminOnly } = require('../middleware/auth');

const router = express.Router();

// Admin: daftar semua customer
router.get('/', authRequired, adminOnly, (req, res) => {
  const rows = db.prepare(`SELECT id,name,email,role,avatar,phone,created_at FROM users WHERE role='customer' ORDER BY created_at DESC`).all();
  res.json(rows);
});

router.put('/me', authRequired, (req, res) => {
  const { name, phone, avatar } = req.body;
  db.prepare('UPDATE users SET name = COALESCE(?,name), phone = COALESCE(?,phone), avatar = COALESCE(?,avatar) WHERE id = ?')
    .run(name, phone, avatar, req.user.id);
  const { password, ...user } = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
  res.json(user);
});

// Addresses
router.get('/me/addresses', authRequired, (req, res) => {
  res.json(db.prepare('SELECT * FROM addresses WHERE user_id = ?').all(req.user.id));
});

router.post('/me/addresses', authRequired, (req, res) => {
  const { label, recipient, phone, full_address, is_default } = req.body;
  const id = uuid();
  if (is_default) db.prepare('UPDATE addresses SET is_default = 0 WHERE user_id = ?').run(req.user.id);
  db.prepare('INSERT INTO addresses (id,user_id,label,recipient,phone,full_address,is_default) VALUES (?,?,?,?,?,?,?)')
    .run(id, req.user.id, label, recipient, phone, full_address, is_default ? 1 : 0);
  res.status(201).json(db.prepare('SELECT * FROM addresses WHERE id = ?').get(id));
});

router.delete('/me/addresses/:id', authRequired, (req, res) => {
  db.prepare('DELETE FROM addresses WHERE id = ? AND user_id = ?').run(req.params.id, req.user.id);
  res.json({ success: true });
});

// Notifications
router.get('/me/notifications', authRequired, (req, res) => {
  res.json(db.prepare('SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC').all(req.user.id));
});

router.put('/me/notifications/:id/read', authRequired, (req, res) => {
  db.prepare('UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?').run(req.params.id, req.user.id);
  res.json({ success: true });
});

module.exports = router;
