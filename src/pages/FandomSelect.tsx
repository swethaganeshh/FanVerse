import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface Fandom {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

const fandoms: Fandom[] = [
  { id: 'dhoni', name: 'MS Dhoni', emoji: '🏏', color: 'bg-blue-500' },
  { id: 'bts', name: 'BTS', emoji: '🎤', color: 'bg-purple-500' },
  { id: 'messi', name: 'Messi', emoji: '⚽', color: 'bg-red-500' },
  { id: 'taylor', name: 'Taylor Swift', emoji: '🎶', color: 'bg-pink-500' },
  { id: 'naruto', name: 'Naruto', emoji: '🍥', color: 'bg-orange-500' }
];

export default function FandomSelect() {
  const navigate = useNavigate();
  const [selectedFandom, setSelectedFandom] = useState<string | null>(null);
  const [isMinting, setIsMinting] = useState(false);

  const handleFandomSelect = async (fandom: Fandom) => {
    setSelectedFandom(fandom.id);
    setIsMinting(true);

    try {
      // TODO: Implement NFT minting logic here
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulating minting delay
      navigate('/quiz');
    } catch (error) {
      console.error('Error minting NFT:', error);
      setIsMinting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-center mb-8">Choose Your Fandom</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fandoms.map((fandom) => (
          <motion.button
            key={fandom.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${fandom.color} text-white p-8 rounded-xl shadow-lg 
              ${selectedFandom === fandom.id ? 'ring-4 ring-offset-2' : ''}
              ${isMinting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'}
              transition-all duration-300`}
            onClick={() => !isMinting && handleFandomSelect(fandom)}
            disabled={isMinting}
          >
            <div className="text-4xl mb-4">{fandom.emoji}</div>
            <h3 className="text-xl font-semibold">{fandom.name}</h3>
            {selectedFandom === fandom.id && isMinting && (
              <div className="mt-4 text-sm">Minting your badge...</div>
            )}
          </motion.button>
        ))}
      </div>
      {isMinting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-8 text-gray-600"
        >
          Minting your Fan Badge NFT... Please wait
        </motion.div>
      )}
    </motion.div>
  );
}