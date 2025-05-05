export default function DocsPage() {
    return (
        <div className="prose prose-invert max-w-none">
            <h1 className="font-press-start text-4xl mb-8 neon-text">Arcade Documentation</h1>

            <section className="mb-12">
                <h2 className="font-press-start text-2xl text-neon-pink mb-4">Getting Started</h2>
                <p className="font-vt323 text-xl text-gray-300">
                    Welcome to the Bread Heads Arcade! This documentation will help you understand how to use our platform and start earning $CRUMBS tokens through gaming.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="font-press-start text-2xl text-neon-blue mb-4">How to Play</h2>
                <div className="space-y-4">
                    <div className="bg-gray-900/50 p-6 rounded-lg">
                        <h3 className="font-press-start text-xl text-neon-yellow mb-2">1. Connect Your Wallet</h3>
                        <p className="font-vt323 text-gray-300">
                            Click the &ldquo;Connect Wallet&rdquo; button to connect your Solana wallet. We support all major Solana wallets including Phantom.
                        </p>
                    </div>

                    <div className="bg-gray-900/50 p-6 rounded-lg">
                        <h3 className="font-press-start text-xl text-neon-yellow mb-2">2. Mint Your Player NFT</h3>
                        <p className="font-vt323 text-gray-300">
                            If you don&apos;t have a Bread Heads NFT yet, you&apos;ll need to mint one to start playing. Enter your desired username and click the mint button. This NFT will be your player profile in the arcade.
                        </p>
                    </div>

                    <div className="bg-gray-900/50 p-6 rounded-lg">
                        <h3 className="font-press-start text-xl text-neon-yellow mb-2">3. Choose a Game</h3>
                        <p className="font-vt323 text-gray-300">
                            Browse through our collection of games. Each game offers unique gameplay and rewards. Some games are compatible with the Arcade Protocol, which provides additional features and rewards.
                        </p>
                    </div>

                    <div className="bg-gray-900/50 p-6 rounded-lg">
                        <h3 className="font-press-start text-xl text-neon-yellow mb-2">4. Start Playing</h3>
                        <p className="font-vt323 text-gray-300">
                            Click &ldquo;Play Now&rdquo; on your chosen game to start playing. Your progress, achievements, and rewards will be tracked automatically through your NFT.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="font-press-start text-2xl text-neon-purple mb-4">Arcade Protocol</h2>
                <p className="font-vt323 text-xl text-gray-300 mb-4">
                    Games marked with the Arcade Protocol badge (🎮 Arcade Protocol 🕹️) support these features:
                </p>
                <ul className="font-vt323 text-gray-300 space-y-2 list-disc pl-6">
                    <li>Referral System: Generate and share referral links to earn rewards when others play</li>
                    <li>Progress Tracking: Your achievements and stats are recorded on-chain <span className="text-neon-yellow animate-pulse">(Coming Soon)</span></li>
                    <li>Cross-game Achievements: Complete challenges across different games <span className="text-neon-yellow animate-pulse">(Coming Soon)</span></li>
                    <li>Token Rewards: Earn $CRUMBS tokens for playing and completing achievements <span className="text-neon-yellow animate-pulse">(Coming Soon)</span></li>
                    <li>Player Stats: Track your current streak, max streak, total games, and wins <span className="text-neon-yellow animate-pulse">(Coming Soon)</span></li>
                </ul>
            </section>

            <section className="mb-12">
                <h2 className="font-press-start text-2xl text-neon-green mb-4">Player Stats</h2>
                <p className="font-vt323 text-xl text-gray-300 mb-4">
                    Your player profile tracks various statistics:
                </p>
                <ul className="font-vt323 text-gray-300 space-y-2 list-disc pl-6">
                    <li>Current/Max Streak: Your current and longest playing streaks</li>
                    <li>Win/Max Win Streak: Your current and longest winning streaks</li>
                    <li>Total Games: Number of games you&apos;ve played</li>
                    <li>Total Wins: Number of games you&apos;ve won</li>
                    <li>Last Play/Last Win: Timestamps of your most recent activity</li>
                    <li>Referral Stats: Number of referrals and total earnings from referrals</li>
                </ul>
            </section>

            <section className="mb-12">
                <h2 className="font-press-start text-2xl text-neon-green mb-4">Need Help?</h2>
                <p className="font-vt323 text-xl text-gray-300">
                    If you encounter any issues or have questions about the Arcade, please reach out to our support team. We&apos;re here to help you get the most out of your gaming experience!
                </p>
            </section>
        </div>
    )
} 