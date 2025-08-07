import axios from 'axios';

export default async function handler(req, res) {
  try {
    // Make the request to the external API with trailing slash
    const apiResponse = await axios.get('http://202.131.237.188:8000/api/frametypes/');
    
    // Log the data on the server side
    console.log('API Response Data:', apiResponse.data);
    
    // Return the data to the client
    res.status(200).json(apiResponse.data);
  } catch (error) {
    console.error('API Proxy Error:', error.message);
    
    // Return error to the client
    res.status(error.response?.status || 500).json({ 
      error: error.message,
      details: error.response?.data || 'Unknown error'
    });
  }
}
