const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = 1234;

app.use(cors());
app.use(bodyParser.json());

const path = require('path');

// Database setup
const dbPath = process.env.NODE_ENV === 'production' 
  ? path.join(__dirname, 'data', 'database.sqlite') 
  : path.join(__dirname, 'data', 'database.sqlite');

const fs = require('fs');
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)){
    fs.mkdirSync(dataDir);
}

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false
});

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  fullName: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING }
});

// Sync database
sequelize.sync().then(async () => {
  console.log('Database synced');
  
  // Auto-seed: Create default users if database is empty
  try {
    const userCount = await User.count();
    if (userCount === 0) {
      console.log('Database empty. Seeding default users...');
      await User.bulkCreate([
        { username: 'admin', password: 'admin123', fullName: 'System Administrator', email: 'admin@gmail.com' },
        { username: 'guest', password: 'guest123', fullName: 'Guest Visitor', email: 'guest@gmail.com' },
        { username: 'budi_santoso', password: 'budi123', fullName: 'Budi Santoso', email: 'budi@gmail.com' },
        { username: 'siti_aminah', password: 'siti123', fullName: 'Siti Aminah', email: 'siti@gmail.com' },
        { username: 'joko_widodo', password: 'joko123', fullName: 'Joko Widodo', email: 'joko@gmail.com' }
      ]);
      console.log('✅ 5 Default users seeded successfully.');
    }
  } catch (error) {
    console.error('Seed error:', error);
  }
});

// Routes
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    user ? res.json(user) : res.status(404).json({ error: 'User not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.update(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
