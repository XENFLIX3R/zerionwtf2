import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zerion-black via-zerion-black-light to-zerion-black flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-zerion-purple/5 via-transparent to-zerion-purple/5"></div>
      
      <motion.div
        key={isLogin ? 'login' : 'signup'}
        initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 w-full"
      >
        {isLogin ? (
          <LoginForm onToggleMode={toggleMode} />
        ) : (
          <SignupForm onToggleMode={toggleMode} />
        )}
      </motion.div>
    </div>
  );
};

export default AuthPage;