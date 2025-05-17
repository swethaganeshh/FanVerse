import { useWallet } from '../context/WalletContext';
import { useState, useEffect } from 'react';
import { PriceServiceConnection } from '@pythnetwork/price-service-client';

export default function Header() {
  const { walletAddress, disconnectWallet } = useWallet();
  const [suiPrice, setSuiPrice] = useState<string>('Loading...');

  useEffect(() => {
    const connection = new PriceServiceConnection(
      'https://hermes-beta.pyth.network'
    );
    
    const getSuiPrice = async () => {
      try {
        const priceId = 'ff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace'; // SUI/USD price feed
        const price = await connection.getLatestPriceFeeds([priceId]);
        if (price && price[0]) {
          const currentPrice = price[0].getPriceUnchecked();
          setSuiPrice(`$${currentPrice.price.toFixed(2)}`);
        }
      } catch (error) {
        console.error('Error fetching SUI price:', error);
        setSuiPrice('Error');
      }
    };

    getSuiPrice();
    const interval = setInterval(getSuiPrice, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-indigo-600">FanVerse</h1>
        <div className="flex items-center gap-4">
          <div className="text-sm">
            <span className="font-medium">SUI Price: </span>
            <span className="text-green-600">{suiPrice}</span>
          </div>
          {walletAddress && (
            <>
              <div className="text-sm truncate max-w-[200px]">
                {walletAddress}
              </div>
              <button
                onClick={disconnectWallet}
                className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition-colors"
              >
                Disconnect
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}