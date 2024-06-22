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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
      <div>
        <div className="text-xl font-medium text-black">Chuck Norris Fact</div>
        <p className="text-gray-500">{fact}</p>
      </div>
    </div>
  );
};

export default Fact;
