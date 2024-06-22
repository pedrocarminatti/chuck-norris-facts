import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Fact: React.FC = () => {
  const [fact, setFact] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFact = async () => {
      try {
        const response = await axios.post('http://localhost:4000/graphql', {
          query: `
            {
              fact
            }
          `
        });
        setFact(response.data.data.fact);
      } catch (err) {
        setError('Failed to fetch fact');
      } finally {
        setLoading(false);
      }
    };

    fetchFact();
  }, []);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md text-center">
        <p className="text-3xl font-bold text-gray-900 mb-8">{fact}</p>
      </div>
    </div>
  );
};

export default Fact;
