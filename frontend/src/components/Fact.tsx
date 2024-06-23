import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

const Fact: React.FC = () => {
  const [factData, setFactData] = useState<{ fact: string; icon_url: string }>({
    fact: '',
    icon_url: ''
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFact = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('https://chuck-norris-facts-backend.vercel.app/graphql', {
        query: `
          {
            chuckNorrisFact {
              fact
              icon_url
            }
          }
        `
      });
      setFactData(response.data.data.chuckNorrisFact);
    } catch (err: any) {
      setError('Failed to fetch fact: ' + (err.message || err));
    } finally {
      setLoading(false);
    }
  };  

  useEffect(() => {
    fetchFact();
  }, []);

  const handleRefresh = () => {
    fetchFact();
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md text-center">
        {factData.icon_url && (
          <img src={factData.icon_url} alt="Chuck Norris Icon" className="mx-auto mb-4 rounded-full h-20 w-20" />
        )}
        <p className="text-3xl font-bold text-gray-900 mb-4">{factData.fact}</p>
        <button
          onClick={handleRefresh}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center mx-auto"
        >
          <FontAwesomeIcon icon={faSync} className="mr-2" />
        </button>
      </div>
    </div>
  );
};

export default Fact;
