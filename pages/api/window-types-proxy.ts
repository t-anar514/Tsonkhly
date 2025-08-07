import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// Define types
type OpeningType = {
  id: number;
  name: string;
  image_path: string;
  opening: string;
  is_active: boolean;
};

// Fallback examples in case the API is unreachable
const fallbackExamples: OpeningType[] = [
  { id: 1, name: 'Single Window', image_path: '', opening: JSON.stringify({ rows: 1, cols: 1, openingType: 'casement', handlePosition: 'right' }), is_active: true },
  { id: 2, name: 'Double Horizontal', image_path: '', opening: JSON.stringify({ rows: 1, cols: 2, openingType: 'casement', handlePosition: 'right' }), is_active: true },
  { id: 3, name: 'Double Vertical', image_path: '', opening: JSON.stringify({ rows: 2, cols: 1, openingType: 'casement', handlePosition: 'right' }), is_active: true },
  { id: 4, name: 'Triple Window', image_path: '', opening: JSON.stringify({ rows: 1, cols: 3, openingType: 'casement', handlePosition: 'right' }), is_active: true },
  { id: 5, name: 'Complex Grid', image_path: '', opening: JSON.stringify({ grid: [[1, 1], [1, 1, 1]], openingType: 'casement', handlePosition: 'left' }), is_active: true },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OpeningType[]>
) {
  try {
    // Set a timeout for the API request (3 seconds)
    const apiResponse = await axios.get('http://202.131.237.188:8000/api/openingtypes/', {
      timeout: 3000,
    });
    
    // Return the data from the external API
    res.status(200).json(apiResponse.data);
  } catch (error) {
    console.error('Error fetching from external API:', error);
    
    // Return fallback data when the API is unreachable
    res.status(200).json(fallbackExamples);
  }
}
