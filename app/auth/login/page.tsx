'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RomanticButton from '@/components/ui/RomanticButton';
import LoveInput from '@/components/ui/LoveInput';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icon for eye

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get('username');
    const password = formData.get('password');

    // Admin credentials
    if (username === 'admin123' && password === '12345') {
      router.push('/admin/dashboard'); // Redirect to Admin Dashboard
    }
    // User credentials
    else if (username === 'user123' && password === '12345') {
      router.push('/main/home'); // Redirect to User Dashboard
    } 
    // Invalid credentials
    else {
      setError('Username atau Password tidak valid!!');
    }
  };

  return (
    <div className="min-h-screen bg-rose-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-rose-800">Login</h1>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-100 text-rose-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <LoveInput
            label="Username"
            name="username"
            type="text"
            placeholder="Masukan username"
            required
            className="w-full rounded-lg border-2 border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400"  // Rounded corners and border focus
          />
          <div className="relative w-full">
            <LoveInput
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Masukan password"
              required
              className="w-full rounded-lg border-2 border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400"  // Rounded corners and border focus
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)} 
              className="absolute right-3 top-11 transform -translate-y-1/2 text-rose-500"
            >
              {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-rose-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-rose-700">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="/auth/forgot-password" className="font-medium text-rose-600 hover:text-rose-500">
                Lupa kata sandi?
              </a>
            </div>
          </div>

          <div>
            <RomanticButton type="submit" fullWidth>
              Login
            </RomanticButton>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-rose-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-rose-500">Or</span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-rose-600">
              Belum punya akun?{' '}
              <a href="/auth/register" className="font-medium text-rose-600 hover:text-rose-500">
                Daftar di sini
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
