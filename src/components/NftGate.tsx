'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useState, useEffect } from 'react';
import { useUmi } from './useUmi';
import { das } from '@metaplex-foundation/mpl-core-das';
import { AssetV1, fetchAsset } from '@metaplex-foundation/mpl-core';
import { DasApiAssetContent } from '@metaplex-foundation/digital-asset-standard-api';

interface NftGateProps {
    onNftFound: (nft: AssetV1, content: DasApiAssetContent) => void;
    onNoNft: () => void;
    resetTrigger?: boolean;
}

export function NftGate({ onNftFound, onNoNft, resetTrigger = false }: NftGateProps) {
    const { connected } = useWallet();
    const umi = useUmi();
    const [isLoading, setIsLoading] = useState(false);
    const [hasChecked, setHasChecked] = useState(false);

    useEffect(() => {
        const checkNfts = async () => {
            if (!connected || hasChecked) return;

            setIsLoading(true);
            try {
                const assets = await das.searchAssets(umi, {
                    grouping: ['collection', process.env.NEXT_PUBLIC_COLLECTION_ID as string],
                    owner: umi.identity.publicKey,
                });
                console.log(assets);
                const hasNft = assets.length > 0;
                if (hasNft) {
                    const asset = await fetchAsset(umi, assets[0].publicKey)
                    console.log(asset);
                    onNftFound(asset, assets[0].content);
                } else {
                    onNoNft();
                }
            } catch (error) {
                console.error('Error checking NFTs:', error);
                onNoNft();
            } finally {
                setIsLoading(false);
                setHasChecked(true);
            }
        };

        checkNfts();
    }, [connected, hasChecked, onNftFound, onNoNft, umi, resetTrigger]);

    // Reset hasChecked when resetTrigger changes
    useEffect(() => {
        setHasChecked(false);
    }, [resetTrigger]);

    if (!connected) {
        return null;
    }

    if (isLoading) {
        return (
            <div className="text-center mt-4">
                <p className="font-vt323 text-neon-yellow animate-pulse">
                    Checking your wallet...
                </p>
            </div>
        );
    }

    return null;
} 