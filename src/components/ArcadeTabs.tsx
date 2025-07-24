'use client';

import { useState } from 'react';
import { AssetV1 } from "@metaplex-foundation/mpl-core";
import { DasApiAssetContent } from "@metaplex-foundation/digital-asset-standard-api";
import { ProfileTab } from './tabs/ProfileTab';
import { LeaderboardTab } from './tabs/LeaderboardTab';
import { StakingTab } from './tabs/StakingTab';
import { AnnouncementsTab } from './tabs/AnnouncementsTab';

interface ArcadeTabsProps {
  nftData: { nft: AssetV1, content: DasApiAssetContent } | null;
}

export type TabType = 'profile' | 'leaderboard' | 'staking' | 'announcements';

interface TabButtonProps {
  id: TabType;
  label: string;
  icon: string;
  active: boolean;
  onClick: (tab: TabType) => void;
}

const TabButton = ({ id, label, icon, active, onClick }: TabButtonProps) => {
  const isComingSoon = id === 'leaderboard' || id === 'staking';
  
  return (
    <button
      onClick={() => !isComingSoon && onClick(id)}
      disabled={isComingSoon}
      className={`
        relative px-6 py-3 font-press-start text-xs transition-all duration-300
        border-2 bg-gray-900/80 backdrop-blur-sm
        ${isComingSoon 
          ? 'border-gray-600 text-gray-300 cursor-not-allowed bg-gray-800/60' 
          : active 
            ? 'border-neon-pink text-neon-pink shadow-[0_0_10px_var(--neon-pink)]' 
            : 'border-gray-600 text-gray-400 hover:border-neon-blue hover:text-neon-blue hover:shadow-[0_0_5px_var(--neon-blue)]'
        }
        group overflow-hidden
      `}
    >
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2">
          <span className="text-sm">{icon}</span>
          <span>{label}</span>
        </div>
        {isComingSoon && (
          <span className="text-yellow-300 text-xs font-bold bg-black/40 px-2 py-0.5 rounded border border-yellow-500/30">
            Coming Soon
          </span>
        )}
      </div>
      
      {/* Animated background on hover */}
      {!isComingSoon && (
        <div className={`
          absolute inset-0 transition-transform duration-300 
          ${active ? 'bg-neon-pink/10' : 'bg-neon-blue/10 translate-y-full group-hover:translate-y-0'}
        `} />
      )}
      
      {/* Active indicator */}
      {active && !isComingSoon && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-pink animate-pulse" />
      )}
      
      {/* Coming Soon overlay */}
      {isComingSoon && (
        <div className="absolute top-1 right-1">
          <span className="text-yellow-400 text-xs">🚧</span>
        </div>
      )}
    </button>
  );
};

export function ArcadeTabs({ nftData }: ArcadeTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  const tabs = [
    { id: 'profile' as TabType, label: 'PROFILE', icon: '👤' },
    { id: 'announcements' as TabType, label: 'NEWS', icon: '📢' },
    { id: 'leaderboard' as TabType, label: 'LEADERBOARD', icon: '🏆' },
    { id: 'staking' as TabType, label: 'PROOF PASS', icon: '🎫' },
  ];

  const handleTabClick = (tab: TabType) => {
    // Only allow switching to non-disabled tabs
    if (tab !== 'leaderboard' && tab !== 'staking') {
      setActiveTab(tab);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 p-4 bg-black/20 backdrop-blur-sm rounded-t-lg border-b border-neon-pink/30">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            id={tab.id}
            label={tab.label}
            icon={tab.icon}
            active={activeTab === tab.id}
            onClick={handleTabClick}
          />
        ))}
      </div>

      {/* Tab Content Container */}
      <div className="min-h-[600px] bg-gray-900/30 backdrop-blur-sm rounded-b-lg border border-t-0 border-neon-pink/30 p-6">
        <TabContent activeTab={activeTab} nftData={nftData} />
      </div>
    </div>
  );
}

// Tab Content Wrapper
interface TabContentProps {
  activeTab: TabType;
  nftData: { nft: AssetV1, content: DasApiAssetContent } | null;
}

function TabContent({ activeTab, nftData }: TabContentProps) {
  switch (activeTab) {
    case 'profile':
      return <ProfileTab nftData={nftData} />;
    case 'leaderboard':
      return <LeaderboardTab />;
    case 'staking':
      return <StakingTab nftData={nftData} />;
    case 'announcements':
      return <AnnouncementsTab />;
    default:
      return <ProfileTab nftData={nftData} />;
  }
}