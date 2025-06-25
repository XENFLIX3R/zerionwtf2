import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

const LoginForm = ({ onToggleMode }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.username, formData.password);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-zerion-black-light p-8 rounded-xl shadow-2xl border border-zerion-purple/20">
        <div className="text-center mb-8">
          <img 
            src="https://i.ibb.co/bj2ZXqMq/Screenshot-2025-06-20-015719-Photoroom.png" 
            alt="Zerion Logo" 
            className="h-16 w-auto mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-400">Sign in to access your Zerion dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="username" className="text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-zerion-purple" />
              Username
            </Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
              className="bg-zerion-black-dark border-zerion-purple/30 focus:border-zerion-purple text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-zerion-purple" />
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="bg-zerion-black-dark border-zerion-purple/30 focus:border-zerion-purple text-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-zerion-purple"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-zerion-purple hover:bg-zerion-purple-light text-white py-3 rounded-lg font-medium transition-all duration-300 shadow-[0_0_15px_rgba(147,51,234,0.3)]"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <button
              onClick={onToggleMode}
              className="text-zerion-purple hover:text-zerion-purple-light font-medium"
            >
              Create account
            </button>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-zerion-purple/20">
          <div className="flex justify-center space-x-6 text-sm">
            <a href="/" className="text-gray-400 hover:text-zerion-purple">Home</a>
            <a href="/support" className="text-gray-400 hover:text-zerion-purple">Support</a>
            <a href="/faq" className="text-gray-400 hover:text-zerion-purple">FAQ</a>
            <a href="/pricing" className="text-gray-400 hover:text-zerion-purple">Pricing</a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginForm;