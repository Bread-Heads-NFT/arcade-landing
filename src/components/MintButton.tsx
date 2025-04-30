'use client';

interface MintButtonProps {
    onClick: () => void;
    disabled?: boolean;
}

export function MintButton({ onClick, disabled = false }: MintButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`arcade-btn mt-4 font-press-start text-neon-pink hover:text-neon-purple transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
        >
            {disabled ? 'MINTING...' : 'MINT NFT'}
        </button>
    );
} 