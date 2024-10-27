import React, { useState } from 'react';

interface TabsProps {
  tabs: string[];
  onSelect: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, onSelect }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onSelect(tab);
  };

  return (
    <div className="flex space-x-4 border-b">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`p-2 ${activeTab === tab ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => handleTabClick(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;

