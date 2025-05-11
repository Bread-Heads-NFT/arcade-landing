'use client';

import { useUmi } from "@/components/useUmi";
import { getPlayerStatsSerializer, PlayerStats } from "@breadheads/bgl-insert-coin";
import { fetchAssetsByCollection, fetchCollection } from "@metaplex-foundation/mpl-core";
import { displayAmount, lamports, publicKey, SolAmount, Umi } from "@metaplex-foundation/umi";
import React from "react";

// Types for our stats
type ArcadeStats = {
    overall: {
        totalPlayers: number;
        totalGamesPlayed: number;
        totalWins: number;
        totalReferrals: number;
        totalReferralEarnings: SolAmount;
    };
    topPlayers: {
        highestStreak: number;
        highestWinStreak: number;
        mostReferrals: number;
        highestReferralEarnings: bigint;
    };
    gameStats: {
        mostPopularGame: string;
        totalActiveGames: number;
        gamesInDevelopment: number;
    };
    recentActivity: Array<{
        type: string;
        description: string;
        timestamp: string;
    }>;
};

async function fetchArcadeStats(umi: Umi): Promise<ArcadeStats> {
    const collection = process.env.NEXT_PUBLIC_COLLECTION_ID!;
    const collectionInfo = await fetchCollection(umi, collection);
    const players = await fetchAssetsByCollection(umi, collection);
    const totalPlayerStats = {
        totalGamesPlayed: 0,
        totalWins: 0,
        totalReferrals: 0,
        totalReferralEarnings: 0n
    };
    const maxPlayerStats = {
        highestStreak: 0,
        highestWinStreak: 0,
        mostReferrals: 0,
        highestReferralEarnings: 0n
    };
    // Accumulate total stats
    players.forEach(player => {
        if (player.dataSections) {
            const playerStats: PlayerStats = getPlayerStatsSerializer().deserialize(player.dataSections[0].data)[0];
            if (player.owner === publicKey("3AajDgUy6p8cYNr7FUGjN1tsph1PdNdqcp7bHmHVdqsB")) {
                console.log("Player: ", player);
                console.log(player.publicKey);
                console.log(playerStats);
            }
            totalPlayerStats.totalGamesPlayed += playerStats.totalGamesPlayed;
            totalPlayerStats.totalWins += playerStats.totalWins;
            totalPlayerStats.totalReferrals += playerStats.totalReferrals;
            totalPlayerStats.totalReferralEarnings += playerStats.totalReferralEarnings;
        }
    });
    // Find max stats
    players.forEach(player => {
        if (player.dataSections) {
            const playerStats: PlayerStats = getPlayerStatsSerializer().deserialize(player.dataSections[0].data)[0];
            if (playerStats.currentStreak > maxPlayerStats.highestStreak) {
                maxPlayerStats.highestStreak = playerStats.currentStreak;
            }
            if (playerStats.currentWinStreak > maxPlayerStats.highestWinStreak) {
                maxPlayerStats.highestWinStreak = playerStats.currentWinStreak;
            }
            if (playerStats.totalReferrals > maxPlayerStats.mostReferrals) {
                maxPlayerStats.mostReferrals = playerStats.totalReferrals;
            }
            if (playerStats.totalReferralEarnings > maxPlayerStats.highestReferralEarnings) {
                maxPlayerStats.highestReferralEarnings = playerStats.totalReferralEarnings;
            }
        }
    });
    // TODO: Implement actual data fetching
    return {
        overall: {
            totalPlayers: collectionInfo.currentSize,
            totalGamesPlayed: totalPlayerStats.totalGamesPlayed,
            totalWins: totalPlayerStats.totalWins,
            totalReferrals: totalPlayerStats.totalReferrals,
            totalReferralEarnings: lamports(totalPlayerStats.totalReferralEarnings)
        },
        topPlayers: {
            highestStreak: maxPlayerStats.highestStreak,
            highestWinStreak: maxPlayerStats.highestWinStreak,
            mostReferrals: maxPlayerStats.mostReferrals,
            highestReferralEarnings: maxPlayerStats.highestReferralEarnings
        },
        gameStats: {
            mostPopularGame: "-",
            totalActiveGames: 0,
            gamesInDevelopment: 0
        },
        recentActivity: []
    };
}

function StatsDisplay({ stats }: { stats: ArcadeStats }) {
    return (
        <div className="prose prose-invert max-w-none">
            <h1 className="font-press-start text-4xl mb-8 neon-text">Arcade Statistics</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Overall Stats */}
                <div className="bg-gray-900/50 p-6 rounded-lg">
                    <h2 className="font-press-start text-2xl text-neon-blue mb-4">Overall Stats</h2>
                    <div className="space-y-4">
                        <div>
                            <p className="font-vt323 text-gray-300">Total Players</p>
                            <p className="font-press-start text-2xl text-neon-yellow">{stats.overall.totalPlayers}</p>
                        </div>
                        <div>
                            <p className="font-vt323 text-gray-300">Total Games Played</p>
                            <p className="font-press-start text-2xl text-neon-yellow">{stats.overall.totalGamesPlayed}</p>
                        </div>
                        <div>
                            <p className="font-vt323 text-gray-300">Total Wins</p>
                            <p className="font-press-start text-2xl text-neon-yellow">{stats.overall.totalWins}</p>
                        </div>
                        <div>
                            <p className="font-vt323 text-gray-300">Total Referrals</p>
                            <p className="font-press-start text-2xl text-neon-yellow">{stats.overall.totalReferrals}</p>
                        </div>
                        <div>
                            <p className="font-vt323 text-gray-300">Total Referral Earnings</p>
                            <p className="font-press-start text-2xl text-neon-yellow">{displayAmount(stats.overall.totalReferralEarnings)}</p>
                        </div>
                    </div>
                </div>

                {/* Top Players */}
                <div className="bg-gray-900/50 p-6 rounded-lg">
                    <h2 className="font-press-start text-2xl text-neon-pink mb-4">Top Players</h2>
                    <div className="space-y-4">
                        <div>
                            <p className="font-vt323 text-gray-300">Highest Streak</p>
                            <p className="font-press-start text-2xl text-neon-yellow">{stats.topPlayers.highestStreak}</p>
                        </div>
                        <div>
                            <p className="font-vt323 text-gray-300">Highest Win Streak</p>
                            <p className="font-press-start text-2xl text-neon-yellow">{stats.topPlayers.highestWinStreak}</p>
                        </div>
                        <div>
                            <p className="font-vt323 text-gray-300">Most Referrals</p>
                            <p className="font-press-start text-2xl text-neon-yellow">{stats.topPlayers.mostReferrals}</p>
                        </div>
                        <div>
                            <p className="font-vt323 text-gray-300">Highest Referral Earnings</p>
                            <p className="font-press-start text-2xl text-neon-yellow">{stats.topPlayers.highestReferralEarnings}</p>
                        </div>
                    </div>
                </div>

                {/* Game Stats */}
                <div className="bg-gray-900/50 p-6 rounded-lg">
                    <h2 className="font-press-start text-2xl text-neon-purple mb-4">Game Stats</h2>
                    <div className="space-y-4">
                        <div>
                            <p className="font-vt323 text-gray-300">Most Popular Game</p>
                            <p className="font-press-start text-2xl text-neon-yellow">{stats.gameStats.mostPopularGame}</p>
                        </div>
                        <div>
                            <p className="font-vt323 text-gray-300">Total Active Games</p>
                            <p className="font-press-start text-2xl text-neon-yellow">{stats.gameStats.totalActiveGames}</p>
                        </div>
                        <div>
                            <p className="font-vt323 text-gray-300">Games in Development</p>
                            <p className="font-press-start text-2xl text-neon-yellow">{stats.gameStats.gamesInDevelopment}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 bg-gray-900/50 p-6 rounded-lg">
                <h2 className="font-press-start text-2xl text-neon-green mb-4">Recent Activity</h2>
                <div className="font-vt323 text-gray-300">
                    {stats.recentActivity.length === 0 ? (
                        <p>No recent activity to display</p>
                    ) : (
                        <ul className="space-y-2">
                            {stats.recentActivity.map((activity, index) => (
                                <li key={index}>
                                    <span className="text-neon-yellow">{activity.timestamp}</span> - {activity.description}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function StatsPage() {
    const umi = useUmi();
    const [stats, setStats] = React.useState<ArcadeStats | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function loadStats() {
            try {
                const data = await fetchArcadeStats(umi);
                setStats(data);
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setLoading(false);
            }
        }

        loadStats();
    }, [umi]);

    if (loading) {
        return (
            <div className="prose prose-invert max-w-none">
                <h1 className="font-press-start text-4xl mb-8 neon-text">Arcade Statistics</h1>
                <div className="font-vt323 text-gray-300">Loading stats...</div>
            </div>
        );
    }

    if (!stats) {
        return (
            <div className="prose prose-invert max-w-none">
                <h1 className="font-press-start text-4xl mb-8 neon-text">Arcade Statistics</h1>
                <div className="font-vt323 text-gray-300">Failed to load stats</div>
            </div>
        );
    }

    return <StatsDisplay stats={stats} />;
} 