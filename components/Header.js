import { motion } from 'framer-motion';

export default function Header() {
  return (
    <header className="bg-darkGray bg-opacity-50 backdrop-blur-md p-4 text-center shadow-neon">
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-neonPurple drop-shadow-lg"
      >
        Slyroze Nation
      </motion.h1>
      <p className="text-slyrozePink text-sm mt-2 animate-pulse">
        Powered by SLYP Utility Token
      </p>
    </header>
  );
}
