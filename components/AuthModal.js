import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function AuthModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const auth = getAuth();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Logged in successfully!");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created successfully!");
      }
      onClose();
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded shadow-lg text-white max-w-md w-full space-y-4">
        <h2 className="text-2xl font-bold">{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded text-black"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded text-black"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-neonPurple hover:bg-neonGreen text-black py-2 px-4 rounded w-full"
          >
            {loading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <div className="flex justify-between items-center">
          <button onClick={() => setIsLogin(!isLogin)} className="text-blue-400 underline">
            {isLogin ? "Create Account" : "Already have an account? Login"}
          </button>
          <button onClick={onClose} className="bg-red-600 hover:bg-red-700 py-2 px-4 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
