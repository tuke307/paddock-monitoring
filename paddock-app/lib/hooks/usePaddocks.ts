// hooks/usePaddocks.ts
import { useState, useEffect } from 'react';
import { API_URL } from '@/lib/constants/api';

interface Paddock {
  id: number;
  name: string;
  description: string;
  shape: string;
  createdAt: string;
  updatedAt: string;
}

export const usePaddocks = () => {
  const [paddocks, setPaddocks] = useState<Paddock[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/paddocks`)
      .then(response => response.json())
      .then(data => setPaddocks(data))
      .catch(error => console.error('Error fetching paddocks:', error));
  }, []);

  return paddocks;
};
