'use client';

import { AssetV1, CollectionV1, execute, fetchAsset, fetchCollection, findAssetSignerPda } from "@metaplex-foundation/mpl-core";
import { DasApiAssetContent } from "@metaplex-foundation/digital-asset-standard-api";
import Image from "next/image";
import { getPlayerStatsSerializer, PlayerStats } from "@breadheads/bgl-insert-coin";
import { amountToString, createNoopSigner, lamports, publicKey, SolAmount, subtractAmounts } from "@metaplex-foundation/umi";
import { useUmi } from "./useUmi";
import { useEffect, useState } from "react";
import { transferSol } from "@metaplex-foundation/mpl-toolbox";

export function NftDisplay({ nftData }: { nftData: { nft: AssetV1, content: DasApiAssetContent } }) {
    const umi = useUmi();
    const [isClaiming, setIsClaiming] = useState(false);
    const [referralBalance, setReferralBalance] = useState<SolAmount>(lamports(0));
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

            // Refresh the referral balance after successful claim
            const newBalance = await umi.rpc.getBalance(publicKey(assetSigner));
            setReferralBalance(newBalance);
        } catch (error) {
            console.error('Failed to claim earnings:', error);
        } finally {
            setIsClaiming(false);
        }
    };

    useEffect(() => {
        const fetchReferralBalance = async () => {
            const assetSigner = findAssetSignerPda(umi, { asset: nftData.nft.publicKey });
            const referralBalance = await umi.rpc.getBalance(publicKey(assetSigner));
            setReferralBalance(referralBalance);
        }
        fetchReferralBalance();
    }, [umi, nftData.nft.publicKey]);

    const formatTimestamp = (timestamp: bigint | number) => {
        if (Number(timestamp) === 0) return 'Never';
        const date = new Date(Number(timestamp) * 1000);
        return date.toLocaleDateString();
    };

    return (
        <div className="mt-4">
            <div className="relative bg-gray-900/50 rounded-lg p-6 mb-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-neon-green/10 to-transparent"></div>
                <div className="relative">
                    <h1 className="font-vt323 text-neon-green text-3xl mb-2">
                        Welcome, {nftData.nft.name}!
                    </h1>
                    <p className="text-gray-300 text-sm">
                        Your journey awaits
                    </p>
                </div>
            </div>
            <div className="w-[80%] mx-auto">
                <div className="grid grid-cols-2 gap-4">
                    <div className="relative aspect-square">
                        <Image
                            src={nftData.content.files?.[0]?.uri || ''}
                            alt={nftData.nft.name}
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>
                    <div className="p-6 bg-gray-900/50 rounded-lg">
                        <h3 className="font-vt323 text-neon-green text-xl mb-4">Player Stats</h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-800/50 p-3 rounded">
                                    <p className="text-gray-400 text-sm">Current/Max Streak</p>
                                    <p className="text-white font-bold">{playerStats?.currentStreak || 0}/{playerStats?.maxStreak || 0}</p>
                                </div>
                                <div className="bg-gray-800/50 p-3 rounded">
                                    <p className="text-gray-400 text-sm">Win/Max Win Streak</p>
                                    <p className="text-white font-bold">{playerStats?.currentWinStreak || 0}/{playerStats?.maxWinStreak || 0}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-800/50 p-3 rounded">
                                    <p className="text-gray-400 text-sm">Total Games</p>
                                    <p className="text-white font-bold">{playerStats?.totalGamesPlayed || 0}</p>
                                </div>
                                <div className="bg-gray-800/50 p-3 rounded">
                                    <p className="text-gray-400 text-sm">Total Wins</p>
                                    <p className="text-white font-bold">{playerStats?.totalWins || 0}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-800/50 p-3 rounded">
                                    <p className="text-gray-400 text-sm">Last Play</p>
                                    <p className="text-white font-bold">{formatTimestamp(playerStats?.lastPlayTimestamp || 0)}</p>
                                </div>
                                <div className="bg-gray-800/50 p-3 rounded">
                                    <p className="text-gray-400 text-sm">Last Win</p>
                                    <p className="text-white font-bold">{formatTimestamp(playerStats?.lastWinTimestamp || 0)}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-800/50 p-3 rounded">
                                    <p className="text-gray-400 text-sm">Number of Referrals</p>
                                    <p className="text-white font-bold">{playerStats?.totalReferrals || 0}</p>
                                </div>
                                <div className="bg-gray-800/50 p-3 rounded">
                                    <p className="text-gray-400 text-sm">Total Referral Earnings</p>
                                    <p className="text-white font-bold">{amountToString(lamports(playerStats?.totalReferralEarnings || 0), 3)}</p>
                                </div>
                            </div>
                            <div className="bg-gray-800/50 p-3 rounded">
                                <p className="text-gray-400 text-sm">Current Referral Earnings</p>
                                <div className="flex items-center justify-between mt-1">
                                    <p className="text-white font-bold">{amountToString(referralBalance, 3)}</p>
                                    {referralBalance.basisPoints > 890_880 && (
                                        <button
                                            onClick={handleClaim}
                                            disabled={isClaiming}
                                            className={`font-vt323 text-xs px-2 py-1 rounded border border-neon-green text-neon-green hover:bg-neon-green hover:text-black transition-colors ${isClaiming ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            {isClaiming ? 'CLAIMING...' : 'CLAIM'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 