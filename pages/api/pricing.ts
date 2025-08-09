import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface PricingData {
  include_open_count: number;
  base_price_per_m2: string;
  less_than_one: string;
  option_color_price_m2: string;
  option_dried_glass_price_m2: string;
  option_triple_glass_price_m2: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PricingData | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Fetch from the real API endpoint
    const response = await axios.get('http://202.131.237.188:8000/api/frame-price-configs/');
    
    // Filter and extract the specific pricing variables from the first active config
    const activeConfig = response.data.find((config: any) => config.is_active);
    
    if (activeConfig) {
      const pricingData: PricingData = {
        include_open_count: activeConfig.include_open_count,
        base_price_per_m2: activeConfig.base_price_per_m2,
        less_than_one: activeConfig.less_than_one,
        option_color_price_m2: activeConfig.option_color_price_m2,
        option_dried_glass_price_m2: activeConfig.option_dried_glass_price_m2,
        option_triple_glass_price_m2: activeConfig.option_triple_glass_price_m2,
      };

      res.status(200).json(pricingData);
    } else {
      res.status(404).json({ error: 'No active pricing configuration found' });
    }
  } catch (error) {
    console.error('Pricing API error:', error);
    res.status(500).json({ error: 'Failed to fetch pricing data from external API' });
  }
} 