const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from public directory
app.use(express.static('public'));

// Basic health check route (REQUIRED for Elastic Beanstalk)
app.get('/', (req, res) => {
    res.send(`
        <h1>Heavens Above Scraper</h1>
        <p>Application is running successfully!</p>
        <p>Scraping functionality will run in the background.</p>
    `);
});

// Health check endpoint for Elastic Beanstalk
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is healthy' });
});

// Start the web server
app.listen(port, '0.0.0.0', () => {
    console.log(`Heavens Above server running on port ${port}`);
    console.log('Health check available at: http://0.0.0.0:' + port + '/');
    
    // Run your scraping code after a short delay
    setTimeout(() => {
        console.log('Starting background scraping tasks...');
        runScrapingTasks();
    }, 3000);
});

// Your existing scraping functionality
function runScrapingTasks() {
    try {
        const satellite = require("./src/satellite");
        const iridium = require("./src/iridium");
        
        console.log('Running ISS satellite data scraping...');
        satellite.getTable({
            target: 25544,
            pages: 4,
            root: "./public/data/"
        });
        
        // Uncomment if you want Iridium flares too
        /*
        console.log('Running Iridium flares scraping...');
        iridium.getTable({
            pages: 4,
            root: "./public/data/"
        });
        */
        
    } catch (error) {
        console.error('Error running scraping tasks:', error);
    }
}