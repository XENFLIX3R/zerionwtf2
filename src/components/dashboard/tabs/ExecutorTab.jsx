import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  Trash2, 
  Eye, 
  EyeOff, 
  RotateCcw, 
  User,
  Terminal
} from 'lucide-react';

const ExecutorTab = () => {
  const [script, setScript] = useState('-- Welcome to Zerion Executor\n-- Enter your Lua script here\n\nprint("Hello, Zerion!")');
  const [isHidden, setIsHidden] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleExecute = async () => {
    setIsExecuting(true);
    // Simulate script execution
    setTimeout(() => {
      setIsExecuting(false);
      console.log('Script executed:', script);
    }, 1000);
  };

  const handleClear = () => {
    setScript('');
  };

  const handleReset = () => {
    setScript('-- Welcome to Zerion Executor\n-- Enter your Lua script here\n\nprint("Hello, Zerion!")');
  };

  const handleR6 = () => {
    const r6Script = `-- R6 Character Script
game.Players.LocalPlayer.Character.Humanoid.RigType = Enum.HumanoidRigType.R6
print("Switched to R6 rig type")`;
    setScript(r6Script);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Terminal className="w-8 h-8 text-zerion-purple mr-3" />
          <h2 className="text-3xl font-bold text-white">Executor</h2>
        </div>
        
        <div className="text-sm text-gray-400">
          Control + K for shortcuts
        </div>
      </div>

      {/* Script Editor */}
      <div className="bg-zerion-black-light rounded-xl border border-zerion-purple/20 overflow-hidden">
        <div className="bg-zerion-black-dark px-4 py-2 border-b border-zerion-purple/20">
          <span className="text-xs text-gray-400">Lua Editor</span>
        </div>
        
        <div className="relative">
          {!isHidden ? (
            <textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              className="w-full h-96 bg-transparent text-gray-300 p-4 resize-none focus:outline-none font-mono text-sm"
              placeholder="Enter your Lua script here..."
              spellCheck={false}
            />
          ) : (
            <div className="h-96 flex items-center justify-center bg-zerion-black-dark">
              <div className="text-center">
                <EyeOff className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-500">Script editor is hidden</p>
              </div>
            </div>
          )}
        </div>

        {/* Control Buttons */}
        <div className="bg-zerion-black-dark p-4 border-t border-zerion-purple/20">
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={handleExecute}
              disabled={isExecuting}
              className="bg-zerion-purple hover:bg-zerion-purple-light text-white flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              {isExecuting ? 'Executing...' : 'Execute'}
            </Button>
            
            <Button
              onClick={handleClear}
              variant="outline"
              className="border-red-500/30 text-red-400 hover:bg-red-500/10 flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear
            </Button>
            
            <Button
              onClick={() => setIsHidden(!isHidden)}
              variant="outline"
              className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 flex items-center gap-2"
            >
              {isHidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              {isHidden ? 'Show' : 'Hide'}
            </Button>
            
            <Button
              onClick={handleR6}
              variant="outline"
              className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              R6
            </Button>
            
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-gray-500/30 text-gray-400 hover:bg-gray-500/10 flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Script Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zerion-black-light p-4 rounded-lg border border-zerion-purple/20">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Script Length</h3>
          <p className="text-lg font-semibold text-white">{script.length} characters</p>
        </div>
        
        <div className="bg-zerion-black-light p-4 rounded-lg border border-zerion-purple/20">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Lines</h3>
          <p className="text-lg font-semibold text-white">{script.split('\n').length}</p>
        </div>
        
        <div className="bg-zerion-black-light p-4 rounded-lg border border-zerion-purple/20">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Status</h3>
          <p className="text-lg font-semibold text-green-400">Ready</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ExecutorTab;