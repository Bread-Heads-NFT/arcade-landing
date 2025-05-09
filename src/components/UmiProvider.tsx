import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { ReactNode, useMemo } from 'react';
import { dasApi } from '@metaplex-foundation/digital-asset-standard-api';
import { generateSigner, signerIdentity } from '@metaplex-foundation/umi';
import { UmiContext } from '@/components/useUmi';
import { bglInsertCoin } from '@breadheads/bgl-insert-coin';
import { mplToolbox } from '@metaplex-foundation/mpl-toolbox';
import { mplCore } from '@metaplex-foundation/mpl-core';

export const UmiProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const wallet = useWallet();
    const { connection } = useConnection();

    const umi = useMemo(() => {
        const u = createUmi(connection)
            .use(bglInsertCoin())
            .use(mplToolbox())
            .use(mplCore())
            .use(dasApi());

        if (wallet.connected) {
            return u.use(walletAdapterIdentity(wallet));
        }
        const anonSigner = generateSigner(u);
        return u.use(signerIdentity(anonSigner));
    }, [wallet, connection]);

    return <UmiContext.Provider value={{ umi }}>{children}</UmiContext.Provider>;
};