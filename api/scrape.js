const satellite = require('../src/satellite');

export default async function handler(req, res) {
  try {
    const data = await satellite.getTable({
      target: 25544,
      pages: 4
    });
    
    res.status(200).json({
      success: true,
      data: data,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
