# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint to check for code issues

## Architecture Overview

This is a Next.js 15 application built for the Bread Heads Arcade, a Solana-based gaming platform where users mint NFTs to access games and track their progress.

### Core Technologies
- **Framework**: Next.js 15 with App Router
- **Blockchain**: Solana with Metaplex Foundation libraries
- **Styling**: Tailwind CSS with custom neon-themed design
- **Wallet Integration**: Solana Wallet Adapter
- **NFT/Gaming Protocol**: Custom Arcade Protocol using @breadheads/bgl-insert-coin

### Key Architecture Patterns

**Wallet & Blockchain Integration**:
- `src/components/WalletProvider.tsx` - Wraps app with Solana wallet connectivity
- `src/components/UmiProvider.tsx` - Provides Umi (Metaplex) instance for blockchain operations
- `src/components/useUmi.ts` - React hook for accessing Umi instance
- All blockchain operations use the Umi framework from Metaplex Foundation

**NFT Gating System**:
- `src/components/NftGate.tsx` - Checks if connected wallet owns required NFT
- `src/components/MintButton.tsx` - Handles minting new player NFTs
- `src/components/NftDisplay.tsx` - Shows user's NFT information
- Uses Digital Asset Standard (DAS) API to query NFTs by collection

**Game Integration**:
- Games are external applications with links stored in the main page
- Arcade Protocol compatible games support referral links and progress tracking
- NFT public key is passed as URL parameter to games for user identification

### Environment Variables Required
- `NEXT_PUBLIC_SOLANA_RPC_ENDPOINT` - Solana RPC endpoint
- `NEXT_PUBLIC_COLLECTION_ID` - NFT collection ID for gating
- `NEXT_PUBLIC_TOKEN_MINT` - Token mint address for rewards
- `NEXT_PUBLIC_ARCADE_AUTHORITY` - Authority for arcade protocol operations

### Styling Conventions
- Uses custom Tailwind config with neon color palette (`neon-pink`, `neon-blue`, `neon-yellow`)
- Retro gaming aesthetic with pixel fonts (Press Start 2P, VT323)
- Components use `pixel-border` and `neon-text` classes for consistent styling
- Animated backgrounds with moving neon glows and pulsing effects

### File Structure
- `src/app/` - Next.js App Router pages and layouts
- `src/components/` - Reusable React components
- `src/types/` - TypeScript type definitions
- Custom fonts are loaded in the root layout with CSS variables

### Key Dependencies
- `@metaplex-foundation/umi*` - Blockchain interaction framework
- `@solana/wallet-adapter-*` - Wallet connectivity
- `@breadheads/bgl-insert-coin` - Custom arcade protocol for player initialization
- `@metaplex-foundation/mpl-core*` - NFT operations and querying

### Testing Notes
No test framework is currently configured in this project.