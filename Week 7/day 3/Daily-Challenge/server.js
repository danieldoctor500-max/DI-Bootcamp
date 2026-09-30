const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3002;
const USERS_FILE = path.join(__dirname, 'users.json');
const router = express.Router();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

function readUsers() {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

function validateUserData(payload) {
  const { name, lastName, email, username, password } = payload || {};

  if (!name || !lastName || !email || !username || !password) {
    return 'All fields are required.';
  }

  if (typeof name !== 'string' || typeof lastName !== 'string' || typeof email !== 'string' || typeof username !== 'string' || typeof password !== 'string') {
    return 'All fields must be strings.';
  }

  if (name.trim() === '' || lastName.trim() === '' || email.trim() === '' || username.trim() === '' || password.trim() === '') {
    return 'Fields cannot be empty.';
  }

  return null;
}

function userToPublic(user) {
  const { password, ...safeUser } = user;
  return safeUser;
}

router.post('/register', async (req, res) => {
  try {
    const errorMessage = validateUserData(req.body);
    if (errorMessage) {
      return res.status(400).json({ message: errorMessage });
    }

    const users = readUsers();
    const existingUser = users.find(
      (user) => user.username.toLowerCase() === req.body.username.trim().toLowerCase()
    );

    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists.' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = {
      id: Date.now().toString(),
      name: req.body.name.trim(),
      lastName: req.body.lastName.trim(),
      email: req.body.email.trim(),
      username: req.body.username.trim(),
      password: hashedPassword,
    };

    users.push(newUser);
    writeUsers(users);

    return res.status(201).json({
      message: 'User registered successfully!',
      user: userToPublic(newUser),
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error while registering user.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body || {};

    if (typeof username !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    const users = readUsers();
    const user = users.find(
      (entry) => entry.username.toLowerCase() === username.trim().toLowerCase()
    );

    if (!user) {
      return res.status(404).json({ message: 'User not registered.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password.' });
    }

    return res.status(200).json({
      message: 'Login successful!',
      user: userToPublic(user),
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error while logging in.' });
  }
});

router.get('/users', (req, res) => {
  try {
    const users = readUsers();
    return res.json(users.map(userToPublic));
  } catch (error) {
    return res.status(500).json({ message: 'Error reading users file.' });
  }
});

router.get('/users/:id', (req, res) => {
  try {
    const users = readUsers();
    const user = users.find((item) => item.id === req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.json(userToPublic(user));
  } catch (error) {
    return res.status(500).json({ message: 'Error reading user data.' });
  }
});

router.put('/users/:id', (req, res) => {
  try {
    const users = readUsers();
    const index = users.findIndex((user) => user.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const updatedUser = {
      ...users[index],
      ...req.body,
    };

    users[index] = updatedUser;
    writeUsers(users);

    return res.json({
      message: 'User updated successfully.',
      user: userToPublic(updatedUser),
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating user.' });
  }
});

app.use('/api', router);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.listen(PORT, () => {
  console.log(`User management API running at http://localhost:${PORT}`);
});
