const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Serve static frontend files from project root
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const DATA_DIR = path.join(__dirname, 'data');
const RSVP_FILE = path.join(DATA_DIR, 'rsvps.json');

// Ensure data directory and file exist
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(RSVP_FILE)) fs.writeFileSync(RSVP_FILE, '[]', 'utf8');

function readRsvps(){
  try{
    const raw = fs.readFileSync(RSVP_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  }catch(e){
    return [];
  }
}

function writeRsvps(list){
  fs.writeFileSync(RSVP_FILE, JSON.stringify(list, null, 2), 'utf8');
}

app.get('/api/rsvps', (req, res) => {
  const list = readRsvps();
  res.json(list);
});

app.post('/api/rsvp', (req, res) => {
  const { name, email, attend } = req.body || {};
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Name is required' });
  }
  const list = readRsvps();
  const id = Date.now() + '-' + Math.floor(Math.random()*1000);
  const entry = { id, name: name.trim(), email: email ? email.trim() : '', attend: attend || 'yes', createdAt: new Date().toISOString() };
  list.push(entry);
  writeRsvps(list);
  res.json({ ok: true, entry });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
