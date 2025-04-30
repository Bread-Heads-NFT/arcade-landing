'use client';

import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { UmiProvider } from './UmiProvider';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';

export function WalletProviderWrapper({ children }: { children: React.ReactNode }) {
    return (
        <ConnectionProvider endpoint={process.env.NEXT_PUBLIC_SOLANA_RPC_ENDPOINT || "https://api.devnet.solana.com"}>
            <WalletProvider wallets={[]} autoConnect>
                <UmiProvider>
                    <WalletModalProvider>{children}</WalletModalProvider>
                </UmiProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
} 