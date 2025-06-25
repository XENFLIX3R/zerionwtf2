import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import DashboardTab from './tabs/DashboardTab';
import ExecutorTab from './tabs/ExecutorTab';
import ScriptsTab from './tabs/ScriptsTab';
import GamesTab from './tabs/GamesTab';
import PlayersTab from './tabs/PlayersTab';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'executor':
        return <ExecutorTab />;
      case 'scripts':
        return <ScriptsTab />;
      case 'games':
        return <GamesTab />;
      case 'players':
        return <PlayersTab />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderActiveTab()}
    </DashboardLayout>
  );
};

export default Dashboard;