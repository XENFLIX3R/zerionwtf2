import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Gamepad2, 
  Search, 
  Users, 
  Code,
  AlertTriangle
} from 'lucide-react';

const GamesTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock game data - in a real app this would come from your API
  const games = [
    {
      id: 1,
      name: 'Funny Monkey [Fixed]',
      players: 1,
      image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
      status: 'active'
    }
  ];

  const stats = {
    totalGames: 1,
    totalPlayers: 1,
    scriptsExecuted: 'N/A'
  };

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Gamepad2 className="w-8 h-8 text-zerion-purple mr-3" />
          <div>
            <h2 className="text-3xl font-bold text-white">Games</h2>
            <p className="text-gray-400">Updates Every 5 Minutes</p>
          </div>
        </div>
        
        <div className="text-sm text-gray-400">
          Control + K for shortcuts
        </div>
      </div>

      {/* Free Version Notice */}
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center">
        <AlertTriangle className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
        <p className="text-red-400 text-sm">
          Free version includes 1 demo game to prove functionality. Please upgrade to standard or premium to access 60k+ huge, real games.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zerion-black-light p-6 rounded-xl border border-zerion-purple/20">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-lg bg-zerion-purple/10">
              <Gamepad2 className="w-6 h-6 text-zerion-purple" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-400">Total Games</h3>
              <p className="text-2xl font-bold text-white">{stats.totalGames}</p>
            </div>
          </div>
        </div>

        <div className="bg-zerion-black-light p-6 rounded-xl border border-zerion-purple/20">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-lg bg-red-500/10">
              <Users className="w-6 h-6 text-red-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-400">Total Players</h3>
              <p className="text-2xl font-bold text-white">{stats.totalPlayers}</p>
            </div>
          </div>
        </div>

        <div className="bg-zerion-black-light p-6 rounded-xl border border-zerion-purple/20">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-lg bg-zerion-purple/10">
              <Code className="w-6 h-6 text-zerion-purple" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-400">Scripts Executed</h3>
              <p className="text-2xl font-bold text-white">{stats.scriptsExecuted}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search Games"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-zerion-black-dark border-zerion-purple/30 text-white"
          />
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredGames.map((game) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-zerion-black-light rounded-xl border border-zerion-purple/20 overflow-hidden hover:border-zerion-purple/40 transition-all duration-300 cursor-pointer"
          >
            <div className="aspect-[4/3] relative">
              <img
                src={game.image}
                alt={game.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-green-500/20 border border-green-500/30 rounded-full px-2 py-1 flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                <span className="text-green-400 text-xs font-medium">{game.players} Playing</span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-white font-medium text-sm mb-2 truncate">{game.name}</h3>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{game.players} player{game.players !== 1 ? 's' : ''}</span>
                <Button
                  size="sm"
                  className="bg-zerion-purple hover:bg-zerion-purple-light text-white text-xs px-3 py-1 h-auto"
                >
                  Join
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredGames.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No Games Found</h3>
          <p className="text-gray-500">No games match your search criteria.</p>
        </div>
      )}
    </motion.div>
  );
};

export default GamesTab;