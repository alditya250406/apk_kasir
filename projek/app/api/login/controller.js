const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('./model');

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET belum didefinisikan di file .env');
}

const register = async (req, res) => {
  const { nama, password, email } = req.body;
  try {
    if (!nama || !email || !password) {
      return res.status(400).json({ message: 'Semua field harus diisi' });
    }

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'Email sudah digunakan' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ nama, password: hashedPassword, email });
    const { password: _, ...userWithoutPassword } = newUser.toJSON();
    res.status(201).json({ message: 'Registrasi berhasil', user: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password harus diisi' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const { password: _, ...userWithoutPassword } = user.toJSON();
    res.json({ message: 'Login berhasil', user: userWithoutPassword, token });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { register, login };
