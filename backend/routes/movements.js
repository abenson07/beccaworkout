const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

// GET all movements
router.get('/movements', async (req, res) => {
  const { data, error } = await supabase
    .from('movements')
    .select('*')
    .order('id', { ascending: true });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// ADD a movement
router.post('/movements', async (req, res) => {
  const { type, machine_name, movement_name, description, image_url, video_url, gif_url } = req.body;
  const { data, error } = await supabase
    .from('movements')
    .insert([{ type, machine_name, movement_name, description, image_url, video_url, gif_url }])
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

// EDIT a movement
router.patch('/movements/:id', async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;
  const { data, error } = await supabase
    .from('movements')
    .update(updateFields)
    .eq('id', id)
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

// DELETE a movement
router.delete('/movements/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase
    .from('movements')
    .delete()
    .eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.status(204).send();
});

module.exports = router; 