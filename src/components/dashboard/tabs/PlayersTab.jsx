import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Search, 
  UserPlus,
  Crown,
  Shield
} from 'lucide-react';

const PlayersTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock player data
  const players = [
    {
      id: 1,
      username: 'HELLOmyDUMfriend',
      userId: 63705,
      status: 'online',
      plan: 'Free',
      joinDate: '2024-04-09'
    }
  ];

  const filteredPlayers = players.filter(player =>
    player.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Users className="w-8 h-8 text-zerion-purple mr-3" />
          <h2 className="text-3xl font-bold text-white">Players</h2>
        </div>
        
        <Button
          className="bg-zerion-purple hover:bg-zerion-purple-light text-white flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          Invite Player
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search players..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-zerion-black-dark border-zerion-purple/30 text-white"
          />
        </div>
      </div>

      {/* Players List */}
      <div className="bg-zerion-black-light rounded-xl border border-zerion-purple/20 overflow-hidden">
        <div className="grid grid-cols-5 gap-4 p-4 border-b border-zerion-purple/20 text-sm font-medium text-gray-400">
          <span>Player</span>
          <span>User ID</span>
          <span>Status</span>
          <span>Plan</span>
          <span>Actions</span>
        </div>
        
        {filteredPlayers.map((player) => (
          <div key={player.id} className="grid grid-cols-5 gap-4 p-4 border-b border-zerion-purple/10 hover:bg-zerion-purple/5">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-zerion-purple flex items-center justify-center mr-3">
                <span className="text-white text-sm font-medium">
                  {player.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-white font-medium">{player.username}</span>
            </div>
            
            <span className="text-gray-400 flex items-center">{player.userId}</span>
            
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${
                player.status === 'online' ? 'bg-green-400' : 'bg-gray-500'
              }`}></div>
              <span className={`text-sm capitalize ${
                player.status === 'online' ? 'text-green-400' : 'text-gray-400'
              }`}>
                {player.status}
              </span>
            </div>
            
            <div className="flex items-center">
              {player.plan === 'Premium' && <Crown className="w-4 h-4 text-yellow-400 mr-1" />}
              {player.plan === 'Standard' && <Shield className="w-4 h-4 text-blue-400 mr-1" />}
              <span className={`text-sm ${
                player.plan === 'Premium' ? 'text-yellow-400' : 
                player.plan === 'Standard' ? 'text-blue-400' : 'text-gray-400'
              }`}>
                {player.plan}
              </span>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
              >
                View
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-green-500/30 text-green-400 hover:bg-green-500/10"
              >
                Message
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredPlayers.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No Players Found</h3>
          <p className="text-gray-500">No players match your search criteria.</p>
        </div>
      )}

      {filteredPlayers.length === 0 && !searchTerm && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No Players Online</h3>
          <p className="text-gray-500">No players are currently online in your games.</p>
        </div>
      )}
    </motion.div>
  );
};

export default PlayersTab;