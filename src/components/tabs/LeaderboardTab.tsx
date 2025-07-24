'use client';

import { useState } from 'react';

interface LeaderboardEntry {
  rank: number;
  name: string;
  totalGames: number;
  totalWins: number;
  winRate: number;
  maxStreak: number;
  totalEarnings: number;
}

// Mock data - replace with real API calls
const mockLeaderboardData: LeaderboardEntry[] = [
  { rank: 1, name: "CrumbMaster", totalGames: 1250, totalWins: 890, winRate: 71.2, maxStreak: 45, totalEarnings: 12.5 },
  { rank: 2, name: "BreadWinner", totalGames: 980, totalWins: 720, winRate: 73.5, maxStreak: 38, totalEarnings: 10.8 },  
  { rank: 3, name: "ToastChamp", totalGames: 875, totalWins: 650, winRate: 74.3, maxStreak: 42, totalEarnings: 9.7 },
  { rank: 4, name: "FlourPower", totalGames: 750, totalWins: 520, winRate: 69.3, maxStreak: 32, totalEarnings: 8.2 },
  { rank: 5, name: "RisingSourdough", totalGames: 680, totalWins: 480, winRate: 70.6, maxStreak: 28, totalEarnings: 7.5 },
  { rank: 6, name: "BaguetteKing", totalGames: 620, totalWins: 420, winRate: 67.7, maxStreak: 25, totalEarnings: 6.8 },
  { rank: 7, name: "CrustCrusher", totalGames: 590, totalWins: 400, winRate: 67.8, maxStreak: 30, totalEarnings: 6.2 },
  { rank: 8, name: "YeastBeast", totalGames: 540, totalWins: 380, winRate: 70.4, maxStreak: 22, totalEarnings: 5.9 },
  { rank: 9, name: "RollMaster", totalGames: 520, totalWins: 350, winRate: 67.3, maxStreak: 26, totalEarnings: 5.4 },
  { rank: 10, name: "GrainGamer", totalGames: 480, totalWins: 320, winRate: 66.7, maxStreak: 20, totalEarnings: 4.8 },
];

type SortKey = 'totalGames' | 'totalWins' | 'winRate' | 'maxStreak' | 'totalEarnings';

export function LeaderboardTab() {
  const [sortKey, setSortKey] = useState<SortKey>('totalEarnings');
  const [sortAscending, setSortAscending] = useState(false);

  const sortedData = [...mockLeaderboardData].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    return sortAscending ? aVal - bVal : bVal - aVal;
  });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAscending(!sortAscending);
    } else {
      setSortKey(key);
      setSortAscending(false);
    }
  };

  const getSortIcon = (key: SortKey) => {
    if (sortKey !== key) return '↕️';
    return sortAscending ? '↑' : '↓';
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="font-press-start text-neon-yellow text-2xl mb-2">🏆 LEADERBOARD</h2>
        <p className="font-vt323 text-gray-300 text-lg">Top Players in the Arcade</p>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-gray-900/50 rounded-lg overflow-hidden border border-neon-blue/30">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/70">
              <tr className="border-b border-neon-blue/30">
                <th className="px-4 py-3 text-left font-press-start text-neon-blue text-xs">RANK</th>
                <th className="px-4 py-3 text-left font-press-start text-neon-blue text-xs">PLAYER</th>
                <th 
                  className="px-4 py-3 text-center font-press-start text-neon-blue text-xs cursor-pointer hover:text-neon-pink transition-colors"
                  onClick={() => handleSort('totalGames')}
                >
                  GAMES {getSortIcon('totalGames')}
                </th>
                <th 
                  className="px-4 py-3 text-center font-press-start text-neon-blue text-xs cursor-pointer hover:text-neon-pink transition-colors"
                  onClick={() => handleSort('totalWins')}
                >
                  WINS {getSortIcon('totalWins')}
                </th>
                <th 
                  className="px-4 py-3 text-center font-press-start text-neon-blue text-xs cursor-pointer hover:text-neon-pink transition-colors"
                  onClick={() => handleSort('winRate')}
                >
                  WIN% {getSortIcon('winRate')}
                </th>
                <th 
                  className="px-4 py-3 text-center font-press-start text-neon-blue text-xs cursor-pointer hover:text-neon-pink transition-colors"
                  onClick={() => handleSort('maxStreak')}
                >
                  STREAK {getSortIcon('maxStreak')}
                </th>
                <th 
                  className="px-4 py-3 text-center font-press-start text-neon-blue text-xs cursor-pointer hover:text-neon-pink transition-colors"
                  onClick={() => handleSort('totalEarnings')}
                >
                  EARNINGS {getSortIcon('totalEarnings')}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((entry, index) => (
                <tr 
                  key={entry.name} 
                  className={`
                    border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors
                    ${entry.rank <= 3 ? 'bg-gradient-to-r from-yellow-900/20 to-transparent' : ''}
                  `}
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-press-start text-neon-yellow text-sm">
                        {getRankIcon(entry.rank)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-vt323 text-white text-lg font-bold">{entry.name}</div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="font-vt323 text-gray-300 text-lg">{entry.totalGames.toLocaleString()}</div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="font-vt323 text-neon-green text-lg">{entry.totalWins.toLocaleString()}</div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className={`font-vt323 text-lg ${entry.winRate >= 70 ? 'text-neon-green' : entry.winRate >= 60 ? 'text-neon-yellow' : 'text-gray-300'}`}>
                      {entry.winRate.toFixed(1)}%
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="font-vt323 text-neon-pink text-lg">{entry.maxStreak}</div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="font-vt323 text-neon-blue text-lg">{entry.totalEarnings.toFixed(2)} SOL</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800/50 rounded-lg p-4 text-center border border-neon-green/30">
          <div className="font-press-start text-neon-green text-sm mb-2">TOP WIN RATE</div>
          <div className="font-vt323 text-white text-lg">{Math.max(...mockLeaderboardData.map(d => d.winRate)).toFixed(1)}%</div>
          <div className="font-vt323 text-gray-400 text-sm">by {mockLeaderboardData.find(d => d.winRate === Math.max(...mockLeaderboardData.map(d => d.winRate)))?.name}</div>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-4 text-center border border-neon-pink/30">
          <div className="font-press-start text-neon-pink text-sm mb-2">LONGEST STREAK</div>
          <div className="font-vt323 text-white text-lg">{Math.max(...mockLeaderboardData.map(d => d.maxStreak))}</div>
          <div className="font-vt323 text-gray-400 text-sm">by {mockLeaderboardData.find(d => d.maxStreak === Math.max(...mockLeaderboardData.map(d => d.maxStreak)))?.name}</div>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-4 text-center border border-neon-blue/30">
          <div className="font-press-start text-neon-blue text-sm mb-2">TOTAL GAMES</div>
          <div className="font-vt323 text-white text-lg">{mockLeaderboardData.reduce((sum, d) => sum + d.totalGames, 0).toLocaleString()}</div>
          <div className="font-vt323 text-gray-400 text-sm">across all players</div>
        </div>
      </div>

      {/* Coming Soon Notice */}
      <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 text-center">
        <p className="font-vt323 text-yellow-300 text-lg">
          🚧 This leaderboard shows sample data. Real-time player rankings coming soon! 🚧
        </p>
      </div>
    </div>
  );
}