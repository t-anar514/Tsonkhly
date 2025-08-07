// API route to proxy requests to the segment options API
import axios from 'axios';

export default async function handler(req, res) {
  try {
    // Make request to the external API with timeout
    const response = await axios.get('http://202.131.237.188:8000/api/segmentoptions/', {
      timeout: 5000, // 5 second timeout
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    // Log successful response
    console.log('Successfully fetched segment options, count:', 
      Array.isArray(response.data) ? response.data.length : 'not an array');
    
    // Return the data from the API
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching segment options:', error.message);
    
    // Provide detailed error information
    const errorDetails = {
      error: 'Failed to fetch segment options',
      message: error.message,
      code: error.code || 'UNKNOWN_ERROR',
      details: error.response?.data || 'No additional details'
    };
    
    console.error('Error details:', JSON.stringify(errorDetails, null, 2));
    
    // Return error details for easier debugging
    res.status(error.response?.status || 500).json(errorDetails);
  }
}
