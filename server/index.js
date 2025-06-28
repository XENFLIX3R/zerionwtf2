import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const MONGODB_URI = 'mongodb+srv://EntityAdmin:MEBFFjsYkkpReVld@zerioncluster.nqqft1w.mongodb.net/?retryWrites=true&w=majority&appName=ZerionCluster';

// Enhanced CORS configuration
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// Enhanced JSON parsing with error handling
app.use(express.json({ 
  limit: '10mb',
  type: 'application/json'
}));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Error handling middleware for JSON parsing
app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    console.error('JSON Parse Error:', error);
    return res.status(400).json({ 
      error: 'Invalid JSON format in request body' 
    });
  }
  next();
});

let db;

// Connect to MongoDB with enhanced error handling
MongoClient.connect(MONGODB_URI, {
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 10000,
})
  .then(client => {
    console.log('Connected to MongoDB');
    db = client.db('zerion');
  })
  .catch(error => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

// Enhanced middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        console.error('JWT verification error:', err);
        return res.status(403).json({ error: 'Invalid or expired token' });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.error('Authentication middleware error:', error);
    return res.status(500).json({ error: 'Authentication error' });
  }
};

// Enhanced input validation
const validateInput = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  if (typeof username !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ error: 'Username and password must be strings' });
  }

  if (username.trim().length < 3) {
    return res.status(400).json({ error: 'Username must be at least 3 characters long' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }

  req.body.username = username.trim();
  next();
};

// Enhanced register endpoint
app.post('/api/register', validateInput, async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if database is available
    if (!db) {
      return res.status(503).json({ error: 'Database connection not available' });
    }

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ 
      username: { $regex: new RegExp(`^${username}$`, 'i') } 
    });
    
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = {
      username,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
      plan: 'Free',
      robloxUsername: '',
      userId: Math.floor(Math.random() * 100000),
      isActive: true
    };

    const result = await db.collection('users').insertOne(user);
    
    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: result.insertedId, 
        username,
        plan: user.plan 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Remove password from response
    const { password: _, ...userResponse } = user;
    userResponse._id = result.insertedId;

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: userResponse
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error during registration' });
  }
});

// Enhanced login endpoint
app.post('/api/login', validateInput, async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if database is available
    if (!db) {
      return res.status(503).json({ error: 'Database connection not available' });
    }

    // Find user (case-insensitive)
    const user = await db.collection('users').findOne({ 
      username: { $regex: new RegExp(`^${username}$`, 'i') } 
    });
    
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Check if user is active
    if (user.isActive === false) {
      return res.status(403).json({ error: 'Account has been deactivated' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Update last login
    await db.collection('users').updateOne(
      { _id: user._id },
      { 
        $set: { 
          lastLogin: new Date(),
          updatedAt: new Date()
        } 
      }
    );

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        username: user.username,
        plan: user.plan 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Remove password from response
    const { password: _, ...userResponse } = user;

    res.json({
      message: 'Login successful',
      token,
      user: userResponse
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error during login' });
  }
});

// Enhanced get user profile
app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ error: 'Database connection not available' });
    }

    const user = await db.collection('users').findOne(
      { _id: new ObjectId(req.user.userId) },
      { projection: { password: 0 } }
    );
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Enhanced update user profile
app.put('/api/profile', authenticateToken, async (req, res) => {
  try {
    const { robloxUsername } = req.body;

    if (!db) {
      return res.status(503).json({ error: 'Database connection not available' });
    }

    // Validate robloxUsername if provided
    if (robloxUsername && typeof robloxUsername !== 'string') {
      return res.status(400).json({ error: 'Roblox username must be a string' });
    }
    
    const updateData = {
      updatedAt: new Date()
    };

    if (robloxUsername !== undefined) {
      updateData.robloxUsername = robloxUsername.trim();
    }

    await db.collection('users').updateOne(
      { _id: new ObjectId(req.user.userId) },
      { $set: updateData }
    );

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Enhanced get user scripts
app.get('/api/scripts', authenticateToken, async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ error: 'Database connection not available' });
    }

    const scripts = await db.collection('scripts')
      .find({ userId: new ObjectId(req.user.userId) })
      .sort({ updatedAt: -1 })
      .toArray();
    
    res.json(scripts);
  } catch (error) {
    console.error('Scripts fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Enhanced save script
app.post('/api/scripts', authenticateToken, async (req, res) => {
  try {
    const { name, content, description } = req.body;

    if (!db) {
      return res.status(503).json({ error: 'Database connection not available' });
    }

    // Validate input
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'Script name is required' });
    }

    if (!content || typeof content !== 'string') {
      return res.status(400).json({ error: 'Script content is required' });
    }
    
    const script = {
      userId: new ObjectId(req.user.userId),
      name: name.trim(),
      content: content.trim(),
      description: (description || '').trim(),
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

// Enhanced update script
app.put('/api/scripts/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, content, description } = req.body;

    if (!db) {
      return res.status(503).json({ error: 'Database connection not available' });
    }

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid script ID' });
    }

    // Validate input
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'Script name is required' });
    }

    if (!content || typeof content !== 'string') {
      return res.status(400).json({ error: 'Script content is required' });
    }
    
    const updateData = {
      name: name.trim(),
      content: content.trim(),
      description: (description || '').trim(),
      updatedAt: new Date()
    };

    const result = await db.collection('scripts').updateOne(
      { 
        _id: new ObjectId(id), 
        userId: new ObjectId(req.user.userId) 
      },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Script not found' });
    }

    res.json({ message: 'Script updated successfully' });
  } catch (error) {
    console.error('Script update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Enhanced delete script
app.delete('/api/scripts/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (!db) {
      return res.status(503).json({ error: 'Database connection not available' });
    }

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid script ID' });
    }
    
    const result = await db.collection('scripts').deleteOne({
      _id: new ObjectId(id),
      userId: new ObjectId(req.user.userId)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Script not found' });
    }

    res.json({ message: 'Script deleted successfully' });
  } catch (error) {
    console.error('Script delete error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: db ? 'Connected' : 'Disconnected'
  });
});

// Root endpoint for testing
app.get('/', (req, res) => {
  res.json({ 
    message: 'Zerion API Server is running',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// 404 handler - This should be the last route
app.use('*', (req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});