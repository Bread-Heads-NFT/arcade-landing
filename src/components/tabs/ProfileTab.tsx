'use client';

import { AssetV1 } from "@metaplex-foundation/mpl-core";
import { DasApiAssetContent } from "@metaplex-foundation/digital-asset-standard-api";
import Image from "next/image";
import { getPlayerStatsSerializer, PlayerStats } from "@breadheads/bgl-insert-coin";
import { amountToString, createNoopSigner, lamports, publicKey, SolAmount, subtractAmounts } from "@metaplex-foundation/umi";
import { useUmi } from "../useUmi";
import { useEffect, useState } from "react";
import { transferSol } from "@metaplex-foundation/mpl-toolbox";
import { execute, fetchAsset, fetchCollection, findAssetSignerPda, CollectionV1 } from "@metaplex-foundation/mpl-core";

interface ProfileTabProps {
  nftData: { nft: AssetV1, content: DasApiAssetContent } | null;
}

export function ProfileTab({ nftData }: ProfileTabProps) {
  const umi = useUmi();
  const [isClaiming, setIsClaiming] = useState(false);
  const [referralBalance, setReferralBalance] = useState<SolAmount>(lamports(0));

  if (!nftData) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-800/50 rounded-lg p-8 max-w-md mx-auto">
          <h3 className="font-press-start text-neon-yellow text-lg mb-4">No Profile Found</h3>
          <p className="font-vt323 text-gray-300 text-lg">
            Connect your wallet and mint your player NFT to view your profile.
          </p>
        </div>
      </div>
    );
  }

  let playerStats: PlayerStats | null = null;
  if (nftData.nft.linkedAppDatas) {
    playerStats = getPlayerStatsSerializer().deserialize(nftData.nft.linkedAppDatas[0].data)[0];
  }

  const handleClaim = async () => {
    if (isClaiming) return;
    setIsClaiming(true);
    try {
      const asset = await fetchAsset(umi, nftData.nft.publicKey);
      let collection: CollectionV1 | undefined = undefined;
      const assetSigner = findAssetSignerPda(umi, { asset: nftData.nft.publicKey });
      const balance = await umi.rpc.getBalance(publicKey(assetSigner));
      if (asset.updateAuthority.type == 'Collection' && asset.updateAuthority.address) {
        collection = await fetchCollection(umi, asset.updateAuthority.address);
      }
      await execute(umi, {
        asset,
        collection,
        instructions: transferSol(umi, {
          source: createNoopSigner(publicKey(assetSigner)),
          destination: umi.identity.publicKey,
          amount: subtractAmounts(balance, await umi.rpc.getRent(0)),
        })
      }).sendAndConfirm(umi);

      const newBalance = await umi.rpc.getBalance(publicKey(assetSigner));
      setReferralBalance(newBalance);
    } catch (error) {
      console.error('Failed to claim earnings:', error);
    } finally {
      setIsClaiming(false);
    }
  };

  useEffect(() => {
    if (!nftData) return;
    
    const fetchReferralBalance = async () => {
      const assetSigner = findAssetSignerPda(umi, { asset: nftData.nft.publicKey });
      const referralBalance = await umi.rpc.getBalance(publicKey(assetSigner));
      setReferralBalance(referralBalance);
    }
    fetchReferralBalance();
  }, [umi, nftData?.nft.publicKey]);

  const formatTimestamp = (timestamp: bigint | number) => {
    if (Number(timestamp) === 0) return 'Never';
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="relative bg-gradient-to-r from-gray-900/70 to-gray-800/70 rounded-lg p-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-green/10 to-transparent"></div>
        <div className="relative">
          <h1 className="font-press-start text-neon-green text-2xl md:text-3xl mb-2">
            Welcome, {nftData.nft.name}!
          </h1>
          <p className="font-vt323 text-gray-300 text-lg">
            Your arcade journey awaits
          </p>
        </div>
      </div>

      {/* Profile Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* NFT Image */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-800/50 rounded-lg overflow-hidden">
            <Image
              src={nftData.content.files?.[0]?.uri || ''}
              alt={nftData.nft.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
          
          {/* Player Name Card */}
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <h3 className="font-press-start text-neon-pink text-lg mb-2">{nftData.nft.name}</h3>
            <p className="font-vt323 text-gray-400 text-sm">Arcade Player</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="space-y-4">
          <h3 className="font-press-start text-neon-blue text-xl mb-4">🎮 Player Stats</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <p className="font-vt323 text-gray-400 text-sm mb-1">Current Streak</p>
              <p className="font-press-start text-neon-yellow text-lg">{playerStats?.currentStreak || 0}</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <p className="font-vt323 text-gray-400 text-sm mb-1">Max Streak</p>
              <p className="font-press-start text-neon-yellow text-lg">{playerStats?.maxStreak || 0}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <p className="font-vt323 text-gray-400 text-sm mb-1">Win Streak</p>
              <p className="font-press-start text-neon-green text-lg">{playerStats?.currentWinStreak || 0}</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <p className="font-vt323 text-gray-400 text-sm mb-1">Max Win Streak</p>
              <p className="font-press-start text-neon-green text-lg">{playerStats?.maxWinStreak || 0}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <p className="font-vt323 text-gray-400 text-sm mb-1">Total Games</p>
              <p className="font-press-start text-white text-lg">{playerStats?.totalGamesPlayed || 0}</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <p className="font-vt323 text-gray-400 text-sm mb-1">Total Wins</p>
              <p className="font-press-start text-white text-lg">{playerStats?.totalWins || 0}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <p className="font-vt323 text-gray-400 text-sm mb-1">Last Play</p>
              <p className="font-vt323 text-white text-sm">{formatTimestamp(playerStats?.lastPlayTimestamp || 0)}</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <p className="font-vt323 text-gray-400 text-sm mb-1">Last Win</p>
              <p className="font-vt323 text-white text-sm">{formatTimestamp(playerStats?.lastWinTimestamp || 0)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Referral Section */}
      <div className="bg-gradient-to-r from-gray-800/70 to-gray-900/70 rounded-lg p-6 border border-neon-purple/30">
        <h3 className="font-press-start text-neon-purple text-xl mb-4">💰 Referral Earnings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800/50 p-4 rounded-lg text-center">
            <p className="font-vt323 text-gray-400 text-sm mb-1">Total Referrals</p>
            <p className="font-press-start text-neon-blue text-lg">{playerStats?.totalReferrals || 0}</p>
          </div>
          
          <div className="bg-gray-800/50 p-4 rounded-lg text-center">
            <p className="font-vt323 text-gray-400 text-sm mb-1">Total Earned</p>
            <p className="font-press-start text-neon-green text-lg">
              {amountToString(lamports(playerStats?.totalReferralEarnings || 0), 3)} SOL
            </p>
          </div>
          
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <p className="font-vt323 text-gray-400 text-sm mb-1">Available to Claim</p>
            <div className="flex items-center justify-between">
              <p className="font-press-start text-neon-yellow text-lg">
                {amountToString(referralBalance, 3)} SOL
              </p>
              {referralBalance.basisPoints > 890_880 && (
                <button
                  onClick={handleClaim}
                  disabled={isClaiming}
                  className={`
                    font-press-start text-xs px-3 py-2 rounded border-2 
                    border-neon-green text-neon-green hover:bg-neon-green hover:text-black 
                    transition-all duration-300 ${isClaiming ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-[0_0_10px_var(--neon-green)]'}
                  `}
                >
                  {isClaiming ? 'CLAIMING...' : 'CLAIM'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}