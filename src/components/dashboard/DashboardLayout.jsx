import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  LogOut, 
  User, 
  Settings, 
  Crown,
  Terminal,
  Code,
  Users,
  Gamepad2
} from 'lucide-react';

const DashboardLayout = ({ children, activeTab, onTabChange }) => {
  const { user, logout } = useAuth();

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: User },
    { id: 'executor', label: 'Executor', icon: Terminal },
    { id: 'scripts', label: 'Script Library', icon: Code },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'players', label: 'Players', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-zerion-black flex">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        className="w-64 bg-zerion-black-light border-r border-zerion-purple/20 flex flex-col"
      >
        {/* Logo */}
        <div className="p-6 border-b border-zerion-purple/20">
          <div className="flex items-center">
            <img 
              src="https://i.ibb.co/bj2ZXqMq/Screenshot-2025-06-20-015719-Photoroom.png" 
              alt="Zerion Logo" 
              className="h-8 w-auto"
            />
            <span className="ml-2 text-lg font-bold text-white">
              serverside<span className="text-zerion-purple">.fun</span>
            </span>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-gray-400">Current Plan:</span>
            <span className="ml-2 text-zerion-purple font-medium">{user?.plan || 'Free'}</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-zerion-purple/20 text-zerion-purple border border-zerion-purple/30'
                      : 'text-gray-400 hover:text-white hover:bg-zerion-purple/10'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-zerion-purple/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-zerion-purple flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.username?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-white text-sm font-medium">{user?.username}</p>
                <p className="text-gray-400 text-xs">User ID: {user?.userId}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full border-zerion-purple/30 text-zerion-purple hover:bg-zerion-purple/10"
            >
              <Crown className="w-4 h-4 mr-2" />
              Get Premium
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="w-full text-gray-400 hover:text-white hover:bg-red-500/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-zerion-black-light border-b border-zerion-purple/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">
                Good evening, {user?.username}.
              </h1>
              <p className="text-gray-400 mt-1">Welcome to your Zerion dashboard</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                className="border-green-500/30 text-green-400 hover:bg-green-500/10"
              >
                Purchase Whitelist
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
              >
                Manage Whitelist
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
              >
                Cancel Free Version
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;