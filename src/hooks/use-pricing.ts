import { useState, useEffect } from 'react';
import axios from 'axios';

export interface PricingData {
  include_open_count: number;
  base_price_per_m2: string;
  less_than_one: string;
  option_color_price_m2: string;
  option_dried_glass_price_m2: string;
  option_triple_glass_price_m2: string;
}

export function usePricing() {
  const [pricingData, setPricingData] = useState<PricingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use the local proxy API to avoid CORS issues
        const response = await axios.get('/api/pricing');
        setPricingData(response.data);
      } catch (err) {
        console.error('Failed to fetch pricing data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch pricing data');
      } finally {
        setLoading(false);
      }
    };

    fetchPricing();
  }, []);

  return { pricingData, loading, error };
} 