const satellite = require('./src/satellite');
const iridium = require('./src/iridium');

export default async function handler(req, res) {
  try {
    // Run your scraping
    const result = await satellite.getTable({
      target: 25544,
      pages: 4,
      root: './public/data/'
    });
    
    res.status(200).json({ 
      success: true, 
      message: 'Scraping completed',
      data: result 
    });
    
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}