const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');


// Registration endpoint
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password.' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpire = Date.now() + 3600000; // Token valid for 1 hour

    const newUser = new User({
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpire,
      isVerified: false, 
    });
    await newUser.save(); 
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'rajaabdurrehman855@gmail.com', // Replace with your actual Gmail address
        pass: 'lsqe zbbb mbwt mkxc', // Replace with your app-specific password
      },
    });
    const verificationLink = `http://localhost:5173/verify-email?token=${verificationToken}`;
    await transporter.sendMail({
      to: email, // Send the verification email to the user's provided email
      subject: 'Verify your email',
      html: `
        <p>Please click the button below to verify your email:</p>
        <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Click here to verify</a>
      `,
    });


    
       // Send a success response
       res.status(201).json({ message: `Verification email sent to ${email}. Please check your email.` });
       
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

router.get('/verify-email', async (req, res) => {
  const { token } = req.query;

  try {
    // Find the user by the verification token and ensure the token is still valid
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpire: { $gt: Date.now() } 
      // Ensure the token is not expired
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    // Mark the user as verified
    user.isVerified = true;
    user.verificationToken = undefined; // Clear the token after verification
    user.verificationTokenExpire = undefined;
  
    await user.save();

    // Redirect the user to the dashboard or another confirmation page
    res.redirect('http://localhost:5173/dashboard'); // Replace with the actual dashboard or confirmation route
  } catch (error) {
    console.error('Error during email verification:', error.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
