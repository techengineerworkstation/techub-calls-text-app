'use client';

import React, { useState } from 'react';
import { PhoneIcon, BackspaceIcon } from '@heroicons/react/24/solid';

interface DialPadProps {
  onCall: (number: string) => void;
  isCallActive: boolean;
}

const dialButtons = [
  { digit: '1', letters: '' },
  { digit: '2', letters: 'ABC' },
  { digit: '3', letters: 'DEF' },
  { digit: '4', letters: 'GHI' },
  { digit: '5', letters: 'JKL' },
  { digit: '6', letters: 'MNO' },
  { digit: '7', letters: 'PQRS' },
  { digit: '8', letters: 'TUV' },
  { digit: '9', letters: 'WXYZ' },
  { digit: '*', letters: '' },
  { digit: '0', letters: '+' },
  { digit: '#', letters: '' },
];

export default function DialPad({ onCall, isCallActive }: DialPadProps) {
  const [number, setNumber] = useState('');

  const handleDigit = (digit: string) => {
    setNumber(prev => prev + digit);
  };

  const handleBackspace = () => {
    setNumber(prev => prev.slice(0, -1));
  };

  const handleCall = () => {
    if (number.length >= 3) {
      onCall(number);
    }
  };

  const formatNumber = (num: string) => {
    if (num.length <= 3) return num;
    if (num.length <= 6) return `(${num.slice(0, 3)}) ${num.slice(3)}`;
    return `(${num.slice(0, 3)}) ${num.slice(3, 6)}-${num.slice(6, 10)}`;
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Number Display */}
      <div className="w-full max-w-xs">
        <div className="bg-white rounded-2xl shadow-lg p-4 text-center min-h-[60px] flex items-center justify-center">
          <span className="text-3xl font-light text-gray-800 tracking-wider">
            {number ? formatNumber(number) : (
              <span className="text-gray-400">Enter number</span>
            )}
          </span>
        </div>
      </div>

      {/* Dial Grid */}
      <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
        {dialButtons.map(({ digit, letters }) => (
          <button
            key={digit}
            onClick={() => handleDigit(digit)}
            className="dial-btn bg-white hover:bg-teal-500 hover:text-white rounded-2xl p-4 shadow-md transition-all"
          >
            <div className="text-2xl font-semibold text-gray-800">{digit}</div>
            {letters && (
              <div className="text-[10px] text-gray-500 tracking-widest mt-0.5">{letters}</div>
            )}
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-6 w-full max-w-xs">
        {/* Backspace */}
        <button
          onClick={handleBackspace}
          disabled={!number}
          className="p-3 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 transition-all"
        >
          <BackspaceIcon className="w-6 h-6" />
        </button>

        {/* Call Button */}
        <button
          onClick={handleCall}
          disabled={number.length < 3 || isCallActive}
          className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white rounded-2xl py-4 flex items-center justify-center gap-2 shadow-lg shadow-green-500/30 transition-all"
        >
          <PhoneIcon className="w-6 h-6" />
          <span className="font-semibold text-lg">Call</span>
        </button>

        {/* Clear */}
        <button
          onClick={() => setNumber('')}
          disabled={!number}
          className="p-3 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 transition-all text-sm"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
