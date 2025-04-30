'use client';

import { useState } from 'react';

interface UsernameInputProps {
    onUsernameChange: (username: string) => void;
    disabled?: boolean;
}

export function UsernameInput({ onUsernameChange, disabled = false }: UsernameInputProps) {
    const [username, setUsername] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUsername(value);
        onUsernameChange(value);
    };

    return (
        <div className="mt-4">
            <input
                type="text"
                value={username}
                onChange={handleChange}
                disabled={disabled}
                placeholder="Enter your username"
                className={`w-full max-w-xs px-4 py-2 bg-gray-900/80 border-2 border-neon-pink rounded-lg 
          font-vt323 text-white text-lg focus:outline-none focus:border-neon-purple
          placeholder-gray-500 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
        </div>
    );
} 