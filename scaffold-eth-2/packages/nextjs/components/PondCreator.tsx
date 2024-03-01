import React, { useEffect, useState } from 'react';

const PondCreator: React.FC = () => {
  const [isPondCreated, setIsPondCreated] = useState(false);
  const [isPondFunded, setIsPondFunded] = useState(false);
  const [frogUrl, setFrogUrl] = useState('');

  const handleCreatePond = () => {
    setIsPondCreated(true);
  };

  const handleFundPond = () => {
    setIsPondFunded(true);
  };

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch('/api/random_img');
      const data = await response.json();
      setFrogUrl(data.frog);
    };

    fetchImages();
  }, []);

  return (
    <div className="flex p-40 bg-lime-50">
      <div className="w-1/2">
        {frogUrl &&
        <img src={frogUrl} alt="Square" className="w-70 h-auto object-cover rounded-lg item-center" />}
      </div>
      <div className="w-1/2 flex flex-col justify-between">
        {!isPondCreated ? (
          <>
            {/* Before Pond Creation */}
            <div>
              <label htmlFor="winRate" className="block text-black">Win rate distribution (1-256)</label>
              <input type="text" id="winRate" className="mt-1 mb-4 p-2 border rounded" />

              <label htmlFor="expiryDate" className="block text-black">Expiry Date</label>
              <input type="date" id="expiryDate" className="mt-1 mb-4 p-2 border rounded" />
            </div>
            <button onClick={handleCreatePond} className="bg-secondary text-white p-2 rounded">
              Create Pond
            </button>
          </>
        ) : !isPondFunded ? (
          <>
            {/* After Pond Creation but before funding */}
            <div className="flex flex-col">
              <h2 className="text-lg font-bold mb-4 text-black">Fill your pond with otherworldly delights</h2>
              <label htmlFor="tokenAddress" className="block text-black">Token Address</label>
              <input type="text" id="tokenAddress" className="mt-1 mb-4 p-2 border rounded" />

              <label htmlFor="amount" className="block text-black">Amount (decimal adjusted)</label>
              <input type="text" id="amount" className="mt-1 mb-4 p-2 border rounded" />
            </div>
            <button onClick={handleFundPond} className="bg-green-500 text-white p-2 rounded">
              Fund Pond
            </button>
          </>
        ) : (
          // After Pond is funded
          <div className="text-8xl font-bold text-black text-break p-4">Godspeed, frogman.</div>
        )}
      </div>
    </div>
  );
};

export default PondCreator;