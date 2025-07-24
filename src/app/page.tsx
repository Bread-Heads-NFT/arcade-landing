'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { WalletConnectButton } from "@/components/WalletConnectButton";
import { NftGate } from "@/components/NftGate";
import { MintButton } from "@/components/MintButton";
import { UsernameInput } from "@/components/UsernameInput";
import { initializePlayer } from "@breadheads/bgl-insert-coin";
import { useUmi } from "@/components/useUmi";
import { generateSigner, publicKey } from "@metaplex-foundation/umi";
import { ArcadeTabs } from '@/components/ArcadeTabs';
import { AssetV1 } from "@metaplex-foundation/mpl-core";
import { DasApiAssetContent } from "@metaplex-foundation/digital-asset-standard-api";

const games = [
  {
    title: "Platformer",
    description: "A basic bread platformer, compatible with Phantom.",
    imageUrl: "/platformer.png",
    comingSoon: false,
    link: "https://adventure.breadheads.io/",
    arcadeProtocolCompatible: false
  },
  {
    title: "Text Adventure",
    description: "A text adventure game where you play a sentient baguette who must escape from a french restaurant.",
    imageUrl: "/zork.png",
    comingSoon: false,
    link: "https://zork.breadheads.io/",
    arcadeProtocolCompatible: false
  },
  {
    title: "Let's Get Toasty",
    description: "A game where you need to catch the toast before it hits the floor.",
    imageUrl: "/toast.png",
    comingSoon: false,
    link: "https://cardboardcabin.github.io/Toasty/",
    arcadeProtocolCompatible: false
  },
  {
    title: "Degen Trail",
    description: "You are about to embark on the journey to launch the next 1000x memecoin.",
    imageUrl: "/degentrail.png",
    comingSoon: false,
    link: "https://trail.breadheads.io/",
    arcadeProtocolCompatible: false
  },
  {
    title: "Crypto Clicker",
    description: "Click as many times as you can!",
    imageUrl: "/cryptoclicker.png",
    comingSoon: false,
    link: "https://click.breadheads.io/",
    arcadeProtocolCompatible: true
  },
  {
    title: "Crumb Catcher",
    description: "Catch as many crumbs as you can!",
    imageUrl: "/flappy.png",
    comingSoon: false,
    link: "https://flap.breadheads.io/",
    arcadeProtocolCompatible: true
  }
];

// Background Glow Component
const BackgroundGlow = () => {
  const [glowPositions, setGlowPositions] = useState([
    { top: '20%', left: '15%', color: 'bg-neon-purple', size: 'w-48 h-48' },
    { top: '60%', left: '75%', color: 'bg-neon-blue', size: 'w-64 h-64' },
    { top: '40%', left: '60%', color: 'bg-neon-pink', size: 'w-40 h-40' },
    { top: '80%', left: '25%', color: 'bg-neon-yellow', size: 'w-56 h-56' },
    { top: '10%', left: '85%', color: 'bg-neon-green', size: 'w-32 h-32' },
    { top: '30%', left: '45%', color: 'bg-neon-pink', size: 'w-72 h-72' },
    { top: '70%', left: '35%', color: 'bg-neon-blue', size: 'w-36 h-36' },
    { top: '15%', left: '65%', color: 'bg-neon-yellow', size: 'w-44 h-44' },
    { top: '85%', left: '80%', color: 'bg-neon-purple', size: 'w-52 h-52' },
    { top: '50%', left: '90%', color: 'bg-neon-green', size: 'w-28 h-28' }
  ]);

  useEffect(() => {
    const updatePositions = () => {
      setGlowPositions(prev => prev.map(glow => ({
        ...glow,
        top: `${Math.random() * 80 + 10}%`,  // Keep within 10-90% of viewport
        left: `${Math.random() * 80 + 10}%`
      })));
    };

    const interval = setInterval(updatePositions, 4000); // Change positions every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {glowPositions.map((glow, index) => (
        <div
          key={index}
          className={`fixed ${glow.color} opacity-10 blur-3xl transition-all duration-3000 ease-in-out ${glow.size} rounded-full`}
          style={{
            top: glow.top,
            left: glow.left
          }}
        />
      ))}
    </>
  );
};

// Neon decorative elements
const NeonDecorations = () => (
  <>
    {/* Left Border */}
    <div className="fixed top-0 left-0 w-8 h-screen bg-gradient-to-r from-neon-pink/50 to-transparent" />
    <div className="fixed top-0 left-8 w-1 h-screen bg-neon-pink animate-pulse" />

    {/* Right Border */}
    <div className="fixed top-0 right-0 w-8 h-screen bg-gradient-to-l from-neon-blue/50 to-transparent" />
    <div className="fixed top-0 right-8 w-1 h-screen bg-neon-blue animate-pulse" />

    {/* Top Border */}
    <div className="fixed top-0 left-0 w-screen h-8 bg-gradient-to-b from-neon-yellow/50 to-transparent" />
    <div className="fixed top-8 left-0 w-screen h-1 bg-neon-yellow animate-pulse" />

    {/* Bottom Border */}
    <div className="fixed bottom-0 left-0 w-screen h-8 bg-gradient-to-t from-neon-purple/50 to-transparent" />
    <div className="fixed bottom-8 left-0 w-screen h-1 bg-neon-purple animate-pulse" />

    {/* Corner Accents */}
    <div className="fixed top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-neon-pink animate-pulse" />
    <div className="fixed top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-neon-blue animate-pulse" />
    <div className="fixed bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-neon-yellow animate-pulse" />
    <div className="fixed bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-neon-purple animate-pulse" />

    {/* Background Glow */}
    <BackgroundGlow />
  </>
);

// Toast component
const Toast = ({ message, show }: { message: string; show: boolean }) => {
  if (!show) return null;
  return (
    <div className="fixed bottom-4 right-4 bg-black/90 border border-neon-green text-neon-green px-4 py-2 rounded-md font-vt323 text-sm z-50 animate-fadeInOut">
      {message}
    </div>
  );
};

export default function Home() {
  const umi = useUmi();
  const [hasNft, setHasNft] = useState<boolean | null>(null);
  const [nftData, setNftData] = useState<{ nft: AssetV1, content: DasApiAssetContent } | null>(null);
  const [isMinting, setIsMinting] = useState(false);
  const [username, setUsername] = useState('');
  const [resetTrigger, setResetTrigger] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleNftFound = (nft: AssetV1, content: DasApiAssetContent) => {
    setHasNft(true);
    setNftData({ nft, content });
  };

  const handleNoNft = () => {
    setHasNft(false);
    setNftData(null);
  };

  const handleUsernameChange = (newUsername: string) => {
    setUsername(newUsername);
  };

  const handleMintClick = async () => {
    if (isMinting || !username.trim()) return; // Prevent minting without username

    setIsMinting(true);
    try {
      console.log('Starting mint process...');

      const authority = process.env.NEXT_PUBLIC_ARCADE_AUTHORITY!;
      await initializePlayer(umi, {
        player: generateSigner(umi),
        tokenMint: publicKey(process.env.NEXT_PUBLIC_TOKEN_MINT as string),
        authority: publicKey(authority),
        name: username.trim(),
        uri: "https://raw.githubusercontent.com/Bread-Heads-NFT/arcade-landing/refs/heads/main/public/asset.json"
      }).sendAndConfirm(umi, { confirm: { commitment: 'finalized' } });

      console.log('Mint completed successfully');
      // Trigger NFT check refresh
      setResetTrigger(prev => !prev);
    } catch (error) {
      console.error('Minting failed:', error);
      // Handle error (show error message, etc.)
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <main className="min-h-screen p-8 relative">
      <NeonDecorations />

      {/* Hero Section */}
      <div className="text-center mb-16 mt-8 relative">
        <div className="absolute inset-0 bg-black/50 blur-xl -z-10" />
        <h1 className="font-press-start text-4xl md:text-6xl mb-4 neon-text">
          BREAD HEADS
          <span className="block mt-2 text-3xl md:text-5xl text-neon-pink">ARCADE</span>
        </h1>
        <p className="font-vt323 text-xl md:text-2xl mt-4 text-neon-blue animate-pulse">
          Powered by $CRUMBS
        </p>
        <div className="mt-8 space-y-2">
          <p className="font-vt323 text-2xl text-neon-yellow animate-textFlicker">
            INSERT COIN TO PLAY
          </p>
          <p className="font-vt323 text-lg text-gray-400">
            Your Gateway to Retro Gaming Excellence
          </p>
          <WalletConnectButton />
          <NftGate onNftFound={handleNftFound} onNoNft={handleNoNft} resetTrigger={resetTrigger} />
          {hasNft === false && (
            <>
              <UsernameInput
                onUsernameChange={handleUsernameChange}
                disabled={isMinting}
              />
              <MintButton
                onClick={handleMintClick}
                disabled={isMinting}
              />
            </>
          )}
        </div>
      </div>

      {/* Arcade Tabs - Show when user has NFT */}
      {hasNft === true && nftData && (
        <div className="max-w-7xl mx-auto mb-16">
          <ArcadeTabs nftData={nftData} />
        </div>
      )}

      {/* Games Grid */}
      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game, index) => (
            <div
              key={index}
              className="relative group pixel-border bg-gray-900/80 p-6 transition-all duration-300 hover:transform hover:scale-105 backdrop-blur-sm"
            >
              <div className="aspect-video relative mb-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <Image
                  src={game.imageUrl}
                  alt={game.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                {game.arcadeProtocolCompatible && (
                  <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
                    <div className="bg-black/80 border border-neon-blue text-neon-blue px-2 py-1 rounded-md font-press-start text-xs z-20 shadow-lg">
                      🎮 Arcade Protocol 🕹️
                    </div>
                    {nftData && (
                      <button
                        onClick={() => {
                          const referralLink = `${game.link}?referrer=${nftData.nft.publicKey}`;
                          navigator.clipboard.writeText(referralLink);
                          showToastMessage('Referral link copied to clipboard!');
                        }}
                        className="bg-black/80 border border-neon-blue text-neon-blue px-2 py-1 rounded-md font-vt323 text-xs z-20 shadow-lg hover:text-neon-pink transition-colors flex items-center gap-1"
                      >
                        <span>📋</span>
                        <span>Referral Link</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
              <h3 className="font-press-start text-lg mb-2 neon-text">
                {game.title}
              </h3>
              <p className="font-vt323 text-xl text-gray-300 mb-4">
                {game.description}
              </p>
              {game.comingSoon ? (
                <span className="font-press-start text-sm text-neon-yellow animate-pulse">
                  Coming Soon
                </span>
              ) : (
                <Link
                  href={`${game.link}${nftData ? `?nft=${nftData.nft.publicKey}` : ''}`}
                  className="arcade-btn inline-block"
                >
                  Play Now
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center font-vt323 text-xl relative">
        <div className="absolute inset-0 bg-black/30 blur-xl -z-10" />
        <p className="text-neon-blue animate-pulse">
          © 2025 Bread Heads NFT
        </p>
        <p className="text-gray-400 mt-2">
          All rights reserved
        </p>
        <Link href="/docs" className="text-neon-pink hover:text-neon-blue transition-colors mt-4 inline-block">
          Documentation
        </Link>
      </footer>

      {/* Toast Notification */}
      <Toast message={toastMessage} show={showToast} />
    </main>
  );
}
