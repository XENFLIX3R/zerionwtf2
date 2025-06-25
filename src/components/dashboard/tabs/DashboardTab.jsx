import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Code, User, Fingerprint, Activity } from 'lucide-react';

const DashboardTab = () => {
  const { user } = useAuth();
  const [robloxUsername, setRobloxUsername] = useState('');
  const [activities] = useState([
    { id: 728276, action: 'Whitelist changed to HELLOmyDUMfriend', date: '4/9/2025', status: 'Success' },
    { id: 728273, action: 'Whitelist changed to Ug1616', date: '4/9/2025', status: 'Success' },
    { id: 728268, action: 'Whitelist changed to HELLOmyDUMfriend', date: '4/9/2025', status: 'Success' },
    { id: 728267, action: 'Started Free Version', date: '4/9/2025', status: 'Success' }
  ]);

  useEffect(() => {
    if (user?.robloxUsername) {
      setRobloxUsername(user.robloxUsername);
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ robloxUsername })
      });

      if (response.ok) {
        // Update local user data
        const updatedUser = { ...user, robloxUsername };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Profile update error:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-white">Dashboard</h2>

      {/* User Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zerion-black-light p-6 rounded-xl border border-zerion-purple/20">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-lg bg-zerion-purple/10">
              <Code className="w-6 h-6 text-zerion-purple" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-400">Whitelist Type</h3>
              <p className="text-xl font-semibold text-white">{user?.plan || 'Free Plan'}</p>
            </div>
          </div>
        </div>

        <div className="bg-zerion-black-light p-6 rounded-xl border border-zerion-purple/20">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-lg bg-red-500/10">
              <User className="w-6 h-6 text-red-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-400">Roblox Username</h3>
              <div className="flex items-center space-x-2 mt-2">
                <Input
                  value={robloxUsername}
                  onChange={(e) => setRobloxUsername(e.target.value)}
                  placeholder="Enter Roblox username"
                  className="bg-zerion-black-dark border-zerion-purple/30 text-white text-sm"
                />
                <Button
                  onClick={handleUpdateProfile}
                  size="sm"
                  className="bg-zerion-purple hover:bg-zerion-purple-light"
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zerion-black-light p-6 rounded-xl border border-zerion-purple/20">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-lg bg-zerion-purple/10">
              <Fingerprint className="w-6 h-6 text-zerion-purple" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-400">User ID</h3>
              <p className="text-xl font-semibold text-white">{user?.userId}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-zerion-black-light p-6 rounded-xl border border-zerion-purple/20">
          <div className="flex items-center mb-6">
            <Activity className="w-6 h-6 text-zerion-purple mr-3" />
            <h3 className="text-xl font-semibold text-white">Activity</h3>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-400 border-b border-zerion-purple/20 pb-2">
              <span>ID</span>
              <span>Activity History</span>
              <span>Date</span>
              <span>Status</span>
            </div>
            
            {activities.map((activity) => (
              <div key={activity.id} className="grid grid-cols-4 gap-4 text-sm py-2">
                <span className="text-gray-300">{activity.id}</span>
                <span className="text-gray-300">{activity.action}</span>
                <span className="text-gray-300">{activity.date}</span>
                <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-400 w-fit">
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-zerion-purple/20">
            <span className="text-sm text-gray-400">Showing 1 to 4 of 8 results</span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="border-zerion-purple/30">1</Button>
              <Button variant="ghost" size="sm" className="text-gray-400">2</Button>
            </div>
          </div>
        </div>

        {/* News Section */}
        <div className="bg-zerion-black-light p-6 rounded-xl border border-zerion-purple/20">
          <h3 className="text-xl font-semibold text-white mb-6">News</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-medium text-white mb-2">September 2024 Update</h4>
              <p className="text-sm text-gray-400 mb-3">CEO 9/27/2024, 4:34:13 PM</p>
              
              <div className="bg-zerion-black-dark p-4 rounded-lg">
                <img 
                  src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg" 
                  alt="Update preview" 
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <p className="text-gray-300 text-sm">
                  Hello! Just here to let you know that serverside.fun is still fully functional and bypasses byfron. With over 70k games, we're the highest rated and best serverside in the market. You can try it out by using our free tier. If any issues arise, let us know at support@serverside.fun. Thank you!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardTab;