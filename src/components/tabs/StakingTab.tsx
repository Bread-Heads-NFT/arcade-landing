'use client';

import { AssetV1 } from "@metaplex-foundation/mpl-core";
import { DasApiAssetContent } from "@metaplex-foundation/digital-asset-standard-api";
import { useState } from 'react';

interface StakingTabProps {
  nftData: { nft: AssetV1, content: DasApiAssetContent } | null;
}

interface StakingPool {
  id: string;
  name: string;
  token: string;
  lockPeriod: string;
  totalStaked: number;
  userStaked: number;
  passType: string;
  icon: string;
  description: string;
  comingSoon?: boolean;
}

const stakingPools: StakingPool[] = [
  {
    id: 'crumbs-7day',
    name: '7-Day Proof Pass',
    token: 'CRUMBS',
    lockPeriod: '7 days',
    totalStaked: 125000,
    userStaked: 0,
    passType: 'Weekly Pass',
    icon: '🎫',
    description: 'Lock CRUMBS for 7 days to get a Weekly Proof Pass - play all games without spending tokens!'
  },
  {
    id: 'crumbs-30day',
    name: '30-Day Proof Pass',
    token: 'CRUMBS',
    lockPeriod: '30 days',
    totalStaked: 450000,
    userStaked: 0,
    passType: 'Monthly Pass',
    icon: '🎟️',
    description: 'Lock CRUMBS for 30 days to get a Monthly Proof Pass - extended free gameplay access.'
  },
  {
    id: 'crumbs-90day',
    name: '90-Day Proof Pass',
    token: 'CRUMBS',
    lockPeriod: '90 days',
    totalStaked: 850000,
    userStaked: 0,
    passType: 'Season Pass',
    icon: '🏆',
    description: 'Lock CRUMBS for 90 days to get a Season Pass - maximum free gameplay benefits.',
    comingSoon: true
  }
];

export function StakingTab({ nftData }: StakingTabProps) {
  const [selectedPool, setSelectedPool] = useState<string | null>(null);
  const [stakeAmount, setStakeAmount] = useState('');

  const handleStake = (poolId: string) => {
    // Implement staking logic here
    console.log(`Staking ${stakeAmount} in pool ${poolId}`);
  };

  const handleUnstake = (poolId: string) => {
    // Implement unstaking logic here
    console.log(`Unstaking from pool ${poolId}`);
  };

  if (!nftData) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-800/50 rounded-lg p-8 max-w-md mx-auto">
          <h3 className="font-press-start text-neon-yellow text-lg mb-4">🔐 Connect Required</h3>
          <p className="font-vt323 text-gray-300 text-lg">
            Connect your wallet and mint your player NFT to access staking features.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="font-press-start text-neon-purple text-2xl mb-2">🎫 PROOF PASS SYSTEM</h2>
        <p className="font-vt323 text-gray-300 text-lg">Lock your CRUMBS to get free gameplay passes</p>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-gray-800/70 to-gray-900/70 rounded-lg p-4 border border-neon-green/30">
          <div className="text-center">
            <div className="font-press-start text-neon-green text-sm mb-2">CRUMBS LOCKED</div>
            <div className="font-vt323 text-white text-2xl">0.00 CRUMBS</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-gray-800/70 to-gray-900/70 rounded-lg p-4 border border-neon-blue/30">
          <div className="text-center">
            <div className="font-press-start text-neon-blue text-sm mb-2">ACTIVE PASSES</div>
            <div className="font-vt323 text-white text-2xl">0 PASSES</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-gray-800/70 to-gray-900/70 rounded-lg p-4 border border-neon-pink/30">
          <div className="text-center">
            <div className="font-press-start text-neon-pink text-sm mb-2">GAMES PLAYED FREE</div>
            <div className="font-vt323 text-white text-2xl">0 GAMES</div>
          </div>
        </div>
      </div>

      {/* Staking Pools */}
      <div className="space-y-4">
        {stakingPools.map((pool) => (
          <div
            key={pool.id}
            className={`
              relative bg-gray-900/50 rounded-lg border transition-all duration-300
              ${pool.comingSoon 
                ? 'border-gray-600 opacity-60' 
                : 'border-gray-700 hover:border-neon-blue/50 hover:shadow-[0_0_20px_rgba(0,255,255,0.1)]'
              }
            `}
          >
            {pool.comingSoon && (
              <div className="absolute top-2 right-2 bg-yellow-600/80 text-black px-2 py-1 rounded text-xs font-press-start">
                COMING SOON
              </div>
            )}
            
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Pool Info */}
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{pool.icon}</div>
                  <div>
                    <h3 className="font-press-start text-neon-blue text-lg mb-1">{pool.name}</h3>
                    <p className="font-vt323 text-gray-300 text-sm">{pool.description}</p>
                    <div className="flex gap-4 mt-2">
                      <span className="font-vt323 text-neon-green text-sm">
                        Pass: {pool.passType}
                      </span>
                      <span className="font-vt323 text-gray-400 text-sm">
                        Lock: {pool.lockPeriod}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pool Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="font-vt323 text-gray-400 text-xs">TOTAL LOCKED</div>
                    <div className="font-vt323 text-white text-sm">
                      {pool.totalStaked.toLocaleString()} {pool.token}
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-vt323 text-gray-400 text-xs">YOUR LOCK</div>
                    <div className="font-vt323 text-neon-yellow text-sm">
                      {pool.userStaked.toLocaleString()} {pool.token}
                    </div>
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    {!pool.comingSoon ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedPool(selectedPool === pool.id ? null : pool.id)}
                          className="font-press-start text-xs px-3 py-2 border-2 border-neon-green text-neon-green hover:bg-neon-green hover:text-black transition-all duration-300 rounded"
                        >
                          {selectedPool === pool.id ? 'CLOSE' : 'GET PASS'}
                        </button>
                        {pool.userStaked > 0 && (
                          <button
                            onClick={() => handleUnstake(pool.id)}
                            className="font-press-start text-xs px-3 py-2 border-2 border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-black transition-all duration-300 rounded"
                          >
                            UNLOCK
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="font-vt323 text-yellow-400 text-sm">
                        🚧 Coming Soon
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Proof Pass Interface */}
              {selectedPool === pool.id && !pool.comingSoon && (
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <div className="max-w-md mx-auto space-y-4">
                    <div className="text-center mb-4">
                      <h4 className="font-press-start text-neon-purple text-sm mb-2">GET {pool.passType.toUpperCase()}</h4>
                      <p className="font-vt323 text-gray-300 text-sm">
                        Lock CRUMBS for {pool.lockPeriod} to play games without spending tokens
                      </p>
                    </div>
                    
                    <div>
                      <label className="block font-vt323 text-gray-300 text-sm mb-2">
                        Amount to Lock
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={stakeAmount}
                          onChange={(e) => setStakeAmount(e.target.value)}
                          placeholder="0.00"
                          className="w-full bg-gray-800/50 border border-gray-600 rounded px-4 py-3 font-vt323 text-white text-lg focus:border-neon-blue focus:outline-none"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 font-vt323 text-gray-400 text-sm">
                          {pool.token}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => setStakeAmount('1000')}
                        className="flex-1 font-vt323 text-xs py-2 border border-gray-600 text-gray-300 hover:border-neon-blue hover:text-neon-blue transition-colors rounded"
                      >
                        1K
                      </button>
                      <button
                        onClick={() => setStakeAmount('5000')}
                        className="flex-1 font-vt323 text-xs py-2 border border-gray-600 text-gray-300 hover:border-neon-blue hover:text-neon-blue transition-colors rounded"
                      >
                        5K
                      </button>
                      <button
                        onClick={() => setStakeAmount('10000')}
                        className="flex-1 font-vt323 text-xs py-2 border border-gray-600 text-gray-300 hover:border-neon-blue hover:text-neon-blue transition-colors rounded"
                      >
                        10K
                      </button>
                      <button
                        onClick={() => setStakeAmount('25000')}
                        className="flex-1 font-vt323 text-xs py-2 border border-gray-600 text-gray-300 hover:border-neon-blue hover:text-neon-blue transition-colors rounded"
                      >
                        MAX
                      </button>
                    </div>

                    <button
                      onClick={() => handleStake(pool.id)}
                      disabled={!stakeAmount || parseFloat(stakeAmount) <= 0}
                      className="w-full font-press-start text-sm py-3 bg-gradient-to-r from-neon-green/20 to-neon-blue/20 border-2 border-neon-green text-neon-green hover:bg-gradient-to-r hover:from-neon-green hover:to-neon-blue hover:text-black transition-all duration-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      LOCK & GET PASS
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Information */}
      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
        <h3 className="font-press-start text-neon-blue text-sm mb-4">ℹ️ PROOF PASS INFO</h3>
        <div className="space-y-2 font-vt323 text-gray-300">
          <p>• Lock CRUMBS for specified periods to get free gameplay passes</p>
          <p>• Proof Passes let you play games without spending CRUMBS tokens</p>
          <p>• Your tokens are automatically unlocked when the period expires</p>
          <p>• Longer lock periods provide better value and extended benefits</p>
          <p>• You can have multiple active passes at the same time</p>
        </div>
      </div>
    </div>
  );
}