'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import RomanticButton from '@/components/ui/RomanticButton';
import LoveInput from '@/components/ui/LoveInput';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function RegisterPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter(); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Register telah dikirimkan!');
    const userRole = 'admin'; 
    router.push(userRole === 'admin' ? '#' : '#');
  };

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

  useEffect(() => {
    setIsClient(true); 
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-rose-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-rose-800">Register</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LoveInput
              label="First Name"
              name="firstName"
              type="text"
              placeholder="Masukan first name"
              required
              className="w-full rounded-lg"

            />
            <LoveInput
              label="Last Name"
              name="lastName"
              type="text"
              placeholder="Masukan last name"
              required
              className="w-full rounded-lg"
            />
          </div>

          <LoveInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="Masukan email"
            required
            className="w-full rounded-lg"
          />

          <div className="relative">
            <LoveInput
              label="Password"
              name="password"
              type={passwordVisible ? 'text' : 'password'}
              placeholder="buat password"
              required
              className="w-full rounded-lg"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-11 right-3  transform -translate-y-1/2 text-rose-600"
            >
              {passwordVisible ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <div className="relative">
            <LoveInput
              label="Confirm Password"
              name="confirmPassword"
              type={confirmPasswordVisible ? 'text' : 'password'}
              placeholder="Konfirmasi password"
              required
              className="w-full rounded-lg"
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute top-11 right-3 transform -translate-y-1/2 text-rose-600"
            >
              {confirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-rose-300 rounded"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-rose-700">
              Saya setuju dengan{' '}
              <a href="#" className="font-medium text-rose-600 hover:text-rose-500">
                syarat dan Ketentuan
              </a>
            </label>
          </div>

          <div>
            <RomanticButton type="submit" fullWidth>
              Register
            </RomanticButton>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-rose-600">
            Sudah punya akun?{' '}
            <a href="/auth/login" className="font-medium text-rose-600 hover:text-rose-500">
              Masuk di sini
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
