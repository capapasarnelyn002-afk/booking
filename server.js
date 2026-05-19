import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;

// Fix __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON and urlencoded requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes to serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/customer.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'customer.html'));
});

app.get('/admin.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/staff.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'staff.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Brealls Booking System running on port ${port}`);
});
