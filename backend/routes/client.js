const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const router = express.Router();

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// POST /api/client - Create a new client
router.post('/', async (req, res) => {
  const { name, dob, email } = req.body;

  // Basic validation
  if (!name || !dob || !email) {
    return res.status(400).json({ error: 'Name, date of birth, and email are required.' });
  }

  // Insert into Supabase
  try {
    const { data, error } = await supabase
      .from('clients')
      .insert([{ name, dob, email }])
      .select();

    if (error) {
      // Handle duplicate email or other DB errors
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ client: data[0] });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router; 