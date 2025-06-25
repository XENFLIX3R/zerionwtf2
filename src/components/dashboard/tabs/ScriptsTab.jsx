import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Code, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  X,
  Search,
  Grid,
  List
} from 'lucide-react';

const ScriptsTab = () => {
  const [scripts, setScripts] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingScript, setEditingScript] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [newScript, setNewScript] = useState({
    name: '',
    description: '',
    content: ''
  });

  useEffect(() => {
    fetchScripts();
  }, []);

  const fetchScripts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/scripts', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setScripts(data);
      }
    } catch (error) {
      console.error('Error fetching scripts:', error);
    }
  };

  const handleSaveScript = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/scripts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newScript)
      });

      if (response.ok) {
        await fetchScripts();
        setIsCreating(false);
        setNewScript({ name: '', description: '', content: '' });
      }
    } catch (error) {
      console.error('Error saving script:', error);
    }
  };

  const handleUpdateScript = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/scripts/${editingScript._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editingScript)
      });

      if (response.ok) {
        await fetchScripts();
        setEditingScript(null);
      }
    } catch (error) {
      console.error('Error updating script:', error);
    }
  };

  const handleDeleteScript = async (scriptId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/scripts/${scriptId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        await fetchScripts();
      }
    } catch (error) {
      console.error('Error deleting script:', error);
    }
  };

  const filteredScripts = scripts.filter(script =>
    script.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    script.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Code className="w-8 h-8 text-zerion-purple mr-3" />
          <h2 className="text-3xl font-bold text-white">Script Library</h2>
        </div>
        
        <Button
          onClick={() => setIsCreating(true)}
          className="bg-zerion-purple hover:bg-zerion-purple-light text-white flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Script
        </Button>
      </div>

      {/* Search and View Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search scripts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-zerion-black-dark border-zerion-purple/30 text-white"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? 'bg-zerion-purple' : 'border-zerion-purple/30'}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
            className={viewMode === 'list' ? 'bg-zerion-purple' : 'border-zerion-purple/30'}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Create/Edit Script Modal */}
      {(isCreating || editingScript) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-zerion-black-light p-6 rounded-xl border border-zerion-purple/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">
                {isCreating ? 'Create New Script' : 'Edit Script'}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsCreating(false);
                  setEditingScript(null);
                  setNewScript({ name: '', description: '', content: '' });
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="scriptName" className="text-white">Script Name</Label>
                <Input
                  id="scriptName"
                  value={isCreating ? newScript.name : editingScript?.name || ''}
                  onChange={(e) => {
                    if (isCreating) {
                      setNewScript({ ...newScript, name: e.target.value });
                    } else {
                      setEditingScript({ ...editingScript, name: e.target.value });
                    }
                  }}
                  className="bg-zerion-black-dark border-zerion-purple/30 text-white"
                  placeholder="Enter script name"
                />
              </div>

              <div>
                <Label htmlFor="scriptDescription" className="text-white">Description</Label>
                <Input
                  id="scriptDescription"
                  value={isCreating ? newScript.description : editingScript?.description || ''}
                  onChange={(e) => {
                    if (isCreating) {
                      setNewScript({ ...newScript, description: e.target.value });
                    } else {
                      setEditingScript({ ...editingScript, description: e.target.value });
                    }
                  }}
                  className="bg-zerion-black-dark border-zerion-purple/30 text-white"
                  placeholder="Enter script description"
                />
              </div>

              <div>
                <Label htmlFor="scriptContent" className="text-white">Script Content</Label>
                <textarea
                  id="scriptContent"
                  value={isCreating ? newScript.content : editingScript?.content || ''}
                  onChange={(e) => {
                    if (isCreating) {
                      setNewScript({ ...newScript, content: e.target.value });
                    } else {
                      setEditingScript({ ...editingScript, content: e.target.value });
                    }
                  }}
                  className="w-full h-64 bg-zerion-black-dark border border-zerion-purple/30 rounded-md p-3 text-white font-mono text-sm resize-none focus:outline-none focus:border-zerion-purple"
                  placeholder="Enter your Lua script here..."
                />
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingScript(null);
                    setNewScript({ name: '', description: '', content: '' });
                  }}
                  className="border-gray-500/30 text-gray-400"
                >
                  Cancel
                </Button>
                <Button
                  onClick={isCreating ? handleSaveScript : handleUpdateScript}
                  className="bg-zerion-purple hover:bg-zerion-purple-light text-white flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {isCreating ? 'Save Script' : 'Update Script'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scripts Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScripts.map((script) => (
            <motion.div
              key={script._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-zerion-black-light p-6 rounded-xl border border-zerion-purple/20 hover:border-zerion-purple/40 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{script.name}</h3>
                  <p className="text-gray-400 text-sm">{script.description}</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingScript(script)}
                    className="text-blue-400 hover:bg-blue-500/10"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteScript(script._id)}
                    className="text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="bg-zerion-black-dark p-3 rounded-lg mb-4">
                <code className="text-xs text-gray-300 font-mono">
                  {script.content.substring(0, 100)}
                  {script.content.length > 100 && '...'}
                </code>
              </div>
              
              <div className="text-xs text-gray-500">
                Created: {new Date(script.createdAt).toLocaleDateString()}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-zerion-black-light rounded-xl border border-zerion-purple/20 overflow-hidden">
          <div className="grid grid-cols-5 gap-4 p-4 border-b border-zerion-purple/20 text-sm font-medium text-gray-400">
            <span>Name</span>
            <span>Description</span>
            <span>Created</span>
            <span>Updated</span>
            <span>Actions</span>
          </div>
          
          {filteredScripts.map((script) => (
            <div key={script._id} className="grid grid-cols-5 gap-4 p-4 border-b border-zerion-purple/10 hover:bg-zerion-purple/5">
              <span className="text-white font-medium">{script.name}</span>
              <span className="text-gray-400">{script.description}</span>
              <span className="text-gray-400 text-sm">{new Date(script.createdAt).toLocaleDateString()}</span>
              <span className="text-gray-400 text-sm">{new Date(script.updatedAt).toLocaleDateString()}</span>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingScript(script)}
                  className="text-blue-400 hover:bg-blue-500/10"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteScript(script._id)}
                  className="text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredScripts.length === 0 && (
        <div className="text-center py-12">
          <Code className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No Scripts Found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm ? 'No scripts match your search criteria.' : 'Create your first script to get started.'}
          </p>
          {!searchTerm && (
            <Button
              onClick={() => setIsCreating(true)}
              className="bg-zerion-purple hover:bg-zerion-purple-light text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Script
            </Button>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default ScriptsTab;