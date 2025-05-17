import { useWallet } from '../context/WalletContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Login() {
  const { walletAddress, connectWallet } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (walletAddress) {
      navigate('/select-fandom');
    }
  }, [walletAddress, navigate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto mt-20 bg-white rounded-xl shadow-lg p-8"
    >
      <h2 className="text-3xl font-bold text-center mb-8">Welcome to FanVerse</h2>
      <p className="text-gray-600 text-center mb-8">
        Connect your Slush Wallet to enter the world of your favorite celebrities
      </p>
      <button
        onClick={connectWallet}
        className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Connect Wallet
      </button>
    </motion.div>
  );
}