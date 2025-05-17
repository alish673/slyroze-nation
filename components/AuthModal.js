import { useState } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';

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
        const result = await signInWithEmailAndPassword(auth, email, password);
        if (!result.user.emailVerified) {
          alert("Please verify your email before logging in.");
          setLoading(false);
          return;
        }
        alert("Logged in successfully!");
      } else {
        const result = await createUserWithEmailAndPassword(auth, email, password);

        // Send email verification
        await sendEmailVerification(result.user);
        alert("Account created. Check your email for verification before logging in.");

        // Create user record in Firestore
        await setDoc(doc(db, "users", result.user.uid), {
          username: email,
          hasPassport: false,
          slyBalance: 0,
          claimedZones: 0,
          createdAt: Date.now()
        });
      }

      onClose();
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const auth = getAuth();
    if (!email) {
      alert("Enter your email above first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent. Please check your inbox.");
    } catch (err) {
      console.error(err);
      alert("Failed to send reset email: " + err.message);
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
          {isLogin && (
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-blue-400 underline"
            >
              Forgot Password?
            </button>
          )}
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
