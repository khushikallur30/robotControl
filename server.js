const express = require('express');
const cors = require('cors');
const si = require('systeminformation');  // For system data

const app = express();
const port = 3000;

// Enable CORS for specific origins
const corsOptions = {
  origin: ['http://127.0.0.1:5500', 'http://127.0.0.1:5501'],  // Allow both ports
  methods: ['GET'],  // Only allow GET requests
  credentials: true, // Allow cookies and authentication headers if needed
};

app.use(cors(corsOptions));

// Define the route for system usage data
app.get('/system-usage', async (req, res) => {
    try {
      const cpu = await si.currentLoad();
      const gpu = await si.graphics();
      const mem = await si.mem();
  
      const data = {
        cpu: cpu.currentLoad,
        gpu: gpu[0] ? gpu[0].memoryUsed / gpu[0].memoryTotal * 100 : 0,
        ram: (mem.total - mem.available) / mem.total * 100,
      };
  
      res.json(data);  // Send system usage data as JSON
    } catch (err) {
      console.error('Error fetching system usage:', err);
      res.status(500).json({ error: 'Failed to fetch system usage' });
    }
  });

// Handle unexpected crashes
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
