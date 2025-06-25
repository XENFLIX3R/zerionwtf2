import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const MONGODB_URI = 'mongodb+srv://EntityAdmin:MEBFFjsYkkpReVld@zerioncluster.nqqft1w.mongodb.net/?retryWrites=true&w=majority&appName=ZerionCluster';

app.use(cors());
app.use(express.json());

let db;

// Connect to MongoDB
MongoClient.connect(MONGODB_URI)
  .then(client => {
    console.log('Connected to MongoDB');
    db = client.db('zerion');
  })
  .catch(error => console.error('MongoDB connection error:', error));

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Register endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = {
      username,
      password: hashedPassword,
      createdAt: new Date(),
      plan: 'Free',
      robloxUsername: '',
      userId: Math.floor(Math.random() * 100000)
    };

    const result = await db.collection('users').insertOne(user);
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: result.insertedId, username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: result.insertedId,
        username,
        plan: user.plan,
        userId: user.userId
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    // Find user
    const user = await db.collection('users').findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        plan: user.plan,
        userId: user.userId,
        robloxUsername: user.robloxUsername
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user profile
app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    const user = await db.collection('users').findOne(
      { _id: req.user.userId },
      { projection: { password: 0 } }
    );
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user profile
app.put('/api/profile', authenticateToken, async (req, res) => {
  try {
    const { robloxUsername } = req.body;
    
    await db.collection('users').updateOne(
      { _id: req.user.userId },
      { $set: { robloxUsername, updatedAt: new Date() } }
    );

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user scripts
app.get('/api/scripts', authenticateToken, async (req, res) => {
  try {
    const scripts = await db.collection('scripts')
      .find({ userId: req.user.userId })
      .toArray();
    
    res.json(scripts);
  } catch (error) {
    console.error('Scripts fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Save script
app.post('/api/scripts', authenticateToken, async (req, res) => {
  try {
    const { name, content, description } = req.body;
    
    const script = {
      userId: req.user.userId,
      name,
      content,
      description: description || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('scripts').insertOne(script);
    
    res.status(201).json({
      message: 'Script saved successfully',
      script: { ...script, _id: result.insertedId }
    });
  } catch (error) {
    console.error('Script save error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update script
app.put('/api/scripts/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, content, description } = req.body;
    
    await db.collection('scripts').updateOne(
      { _id: new MongoClient.ObjectId(id), userId: req.user.userId },
      { 
        $set: { 
          name, 
          content, 
          description: description || '',
          updatedAt: new Date() 
        } 
      }
    );

    res.json({ message: 'Script updated successfully' });
  } catch (error) {
    console.error('Script update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete script
app.delete('/api/scripts/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.collection('scripts').deleteOne({
      _id: new MongoClient.ObjectId(id),
      userId: req.user.userId
    });

    res.json({ message: 'Script deleted successfully' });
  } catch (error) {
    console.error('Script delete error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});