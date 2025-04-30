'use client';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export function WalletConnectButton() {
    return (
        <div className="flex justify-center">
            <WalletMultiButton className="!bg-neon-pink hover:!bg-neon-purple !text-white font-press-start" />
        </div>
    );
} 