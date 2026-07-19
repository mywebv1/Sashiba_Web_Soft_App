const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ADMIN_PASSWORD = 'admin123'; // Default fallback, can change directly in code

const DATA_DIR = path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(__dirname, 'public', 'images', 'uploads');

// Helper to ensure directories exist
function ensureDirExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}
ensureDirExists(DATA_DIR);
ensureDirExists(UPLOADS_DIR);

// MIME types mapping
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Main Server Handler
const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  // --- API Routes ---
  
  // 1. GET /api/portfolio - Return portfolio data
  if (req.method === 'GET' && pathname === '/api/portfolio') {
    const dataPath = path.join(DATA_DIR, 'portfolio.json');
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: false, message: 'Error reading portfolio data' }));
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    });
    return;
  }

  // Helper to read post request body as JSON
  function getJSONBody(request, callback) {
    let body = '';
    request.on('data', chunk => { body += chunk; });
    request.on('end', () => {
      try {
        callback(null, JSON.parse(body));
      } catch (err) {
        callback(err, null);
      }
    });
  }

  // 2. POST /api/auth/verify - Verify admin password
  if (req.method === 'POST' && pathname === '/api/auth/verify') {
    getJSONBody(req, (err, body) => {
      if (err || !body || !body.password) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: false, message: 'Invalid payload' }));
      }
      if (body.password === ADMIN_PASSWORD) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } else {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Invalid password' }));
      }
    });
    return;
  }

  // 3. POST /api/portfolio - Save portfolio data
  if (req.method === 'POST' && pathname === '/api/portfolio') {
    const password = req.headers['x-admin-password'];
    if (password !== ADMIN_PASSWORD) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, message: 'Unauthorized: Invalid password' }));
    }

    getJSONBody(req, (err, body) => {
      if (err || !body || !body.portfolioData) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: false, message: 'Invalid portfolio payload' }));
      }
      
      const dataPath = path.join(DATA_DIR, 'portfolio.json');
      fs.writeFile(dataPath, JSON.stringify(body.portfolioData, null, 2), 'utf8', (writeErr) => {
        if (writeErr) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: false, message: 'Error saving portfolio data' }));
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Portfolio data updated successfully' }));
      });
    });
    return;
  }

  // 4. POST /api/upload - Handle raw binary image upload
  if (req.method === 'POST' && pathname === '/api/upload') {
    const password = req.headers['x-admin-password'];
    if (password !== ADMIN_PASSWORD) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, message: 'Unauthorized' }));
    }

    const origFileName = req.headers['x-file-name'] || 'image.png';
    const ext = path.extname(origFileName).toLowerCase();
    
    // Validate extension
    if (!['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(ext)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, message: 'Only image files are allowed' }));
    }

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const newFileName = 'upload-' + uniqueSuffix + ext;
    const filePath = path.join(UPLOADS_DIR, newFileName);

    const writeStream = fs.createWriteStream(filePath);
    req.pipe(writeStream);

    writeStream.on('error', (writeErr) => {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, message: 'Error saving uploaded file' }));
    });

    writeStream.on('finish', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, url: `/images/uploads/${newFileName}` }));
    });
    return;
  }

  // 5. DELETE /api/image — Delete an uploaded image file
  if (req.method === 'DELETE' && pathname === '/api/image') {
    const password = req.headers['x-admin-password'];
    if (password !== ADMIN_PASSWORD) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, message: 'Unauthorized' }));
    }
    getJSONBody(req, (err, body) => {
      if (err || !body || !body.url) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: false, message: 'No url provided' }));
      }
      // Only allow deleting from uploads folder
      const relPath = body.url.replace(/^\//, '');
      const filePath = path.resolve(path.join(__dirname, 'public', relPath));
      const uploadsPath = path.resolve(UPLOADS_DIR);
      if (!filePath.startsWith(uploadsPath)) {
        res.writeHead(403, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: false, message: 'Cannot delete this file' }));
      }
      fs.unlink(filePath, (unlinkErr) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      });
    });
    return;
  }

  // 6. POST /api/contact — Save a contact message
  if (req.method === 'POST' && pathname === '/api/contact') {
    getJSONBody(req, (err, body) => {
      if (err || !body || !body.name || !body.email || !body.message) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: false, message: 'Invalid payload' }));
      }
      const messagesPath = path.join(DATA_DIR, 'messages.json');
      let messages = [];
      try {
        if (fs.existsSync(messagesPath)) {
          messages = JSON.parse(fs.readFileSync(messagesPath, 'utf8'));
        }
      } catch(e) { messages = []; }
      const newMsg = {
        id: Date.now().toString(),
        name: body.name,
        email: body.email,
        phone: body.phone || '',
        subject: body.subject || '',
        message: body.message,
        read: false,
        timestamp: new Date().toISOString()
      };
      messages.unshift(newMsg);
      fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2), 'utf8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, message: 'Message received!' }));
    });
    return;
  }

  // 7. GET /api/messages — Get all contact messages (admin only)
  if (req.method === 'GET' && pathname === '/api/messages') {
    const password = req.headers['x-admin-password'];
    if (password !== ADMIN_PASSWORD) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, message: 'Unauthorized' }));
    }
    const messagesPath = path.join(DATA_DIR, 'messages.json');
    let messages = [];
    try {
      if (fs.existsSync(messagesPath)) {
        messages = JSON.parse(fs.readFileSync(messagesPath, 'utf8'));
      }
    } catch(e) { messages = []; }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(messages));
    return;
  }

  // 8. POST /api/messages/read — Mark a message as read
  if (req.method === 'POST' && pathname.startsWith('/api/messages/read/')) {
    const password = req.headers['x-admin-password'];
    if (password !== ADMIN_PASSWORD) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: false, message: 'Unauthorized' }));
    }
    const msgId = pathname.replace('/api/messages/read/', '');
    const messagesPath = path.join(DATA_DIR, 'messages.json');
    let messages = [];
    try {
      if (fs.existsSync(messagesPath)) {
        messages = JSON.parse(fs.readFileSync(messagesPath, 'utf8'));
      }
    } catch(e) { messages = []; }
    messages = messages.map(m => m.id === msgId ? { ...m, read: true } : m);
    fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2), 'utf8');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true }));
    return;
  }

  // --- Static Files Server ---
  if (req.method === 'GET') {
    // Remove query string from filename
    let relativePath = pathname === '/' ? '/index.html' : pathname;
    
    // Resolve full path and prevent directory traversal attacks
    const resolvedPath = path.resolve(path.join(__dirname, 'public', relativePath));
    const publicPath = path.resolve(path.join(__dirname, 'public'));

    if (!resolvedPath.startsWith(publicPath)) {
      res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Access Denied');
    }

    fs.stat(resolvedPath, (err, stats) => {
      if (err || !stats.isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('404 Not Found');
      }

      const ext = path.extname(resolvedPath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      res.writeHead(200, { 'Content-Type': contentType });
      const readStream = fs.createReadStream(resolvedPath);
      readStream.pipe(res);
    });
    return;
  }

  // Unhandled methods
  res.writeHead(405, { 'Content-Type': 'text/plain' });
  res.end('Method Not Allowed');
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
