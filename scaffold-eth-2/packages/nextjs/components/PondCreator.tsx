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
    <div>
    <h1 className="flex justify-center pb-20 pt-20 text-center text-black text-vw-8 break-words">Let's get brewin'</h1>
    <div className="flex pl-40 pr-40 pb-40 bg-lime-50 items-center justify-center">
      <div className="w-1/2">
        {frogUrl &&
        <img src={frogUrl} alt="Square" className="w-30 h-auto object-cover rounded-lg item-center" />}
      </div>
      <div className="rounded-lg border-2 border-grey w-300 h-300 flex-col items-center justify-center overflow-hidden">
      <div className="w-fill h-auto m-20 flex flex-col justify-between">
        {!isPondCreated ? (
          <>
            {/* Before Pond Creation */}
            <div>
              <label htmlFor="winRate" className="block text-black font-bold">Win rate distribution (1-256)</label>
              <input type="text" id="winRate" className="mt-1 mb-4 p-2 border rounded" />

              <label htmlFor="name" className="block text-black font-bold" aria-required>Pond Name</label>
              <input type="text" id="name" className="mt-1 mb-4 p-2 border rounded" />

              <label htmlFor="Symbol" className="block text-black font-bold" aria-required>Symbol</label>
              <input type="text" id="expiryDate" className="mt-1 mb-4 p-2 border rounded" />
            
            <button onClick={handleCreatePond} className="block bg-lime-500 text-white p-2 rounded mt-1">
              Create Pond
            </button>
            </div>
          </>
        ) : !isPondFunded ? (
          <>
            {/* After Pond Creation but before funding */}
            <div className="">
              <h2 className="text-lg font-bold mb-4 text-black">Fill your pond with otherworldly delights</h2>
              <label htmlFor="price" className="block text-black" aria-required>Price per Scratcher (ETH)</label>
              <input type="number" id="price" className="mt-1 mb-4 p-2 border rounded" />

              <label htmlFor="totalForSale" className="block text-black" aria-required>Total for Sale</label>
              <input type="number" id="totalForSale" className="mt-1 mb-4 p-2 border rounded" />

              <label htmlFor="maxPurchase" className="block text-black" aria-required>Max amount one person can purchase</label>
              <input type="number" id="maxPurchase" className="mt-1 mb-4 p-2 border rounded" />
            </div>
            <button onClick={handleFundPond} className="block bg-lime-500 text-white p-2 rounded mt-1">
              Fund Pond
            </button>
          </>
        ) : (
          // After Pond is funded
          <div className="text-8xl font-bold text-black text-break p-4">Godspeed, frogman.</div>
        )}
      </div>
    </div>
    </div>
    </div>
  );
};

export default PondCreator;