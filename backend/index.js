const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const clientRouter = require('./routes/client');

console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Mount the /api/client route
app.use('/api/client', clientRouter);

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
}); 