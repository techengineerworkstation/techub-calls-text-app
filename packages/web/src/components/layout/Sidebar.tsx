'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  ClockIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const navItems = [
  { href: '/', label: 'Dialer', icon: PhoneIcon },
  { href: '/calls', label: 'Calls', icon: ClockIcon },
  { href: '/messages', label: 'Messages', icon: ChatBubbleLeftRightIcon },
  { href: '/contacts', label: 'Contacts', icon: UserGroupIcon },
  { href: '/settings', label: 'Settings', icon: Cog6ToothIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-20 lg:w-64 bg-teal-800 text-white flex flex-col">
      {/* Logo */}
      <div className="p-4 lg:p-6 border-b border-teal-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cream-200 rounded-xl flex items-center justify-center">
            <PhoneIcon className="w-6 h-6 text-teal-800" />
          </div>
          <div className="hidden lg:block">
            <h1 className="text-lg font-bold">TelnyxPhone</h1>
            <p className="text-xs text-teal-300">PBX System</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 lg:p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/30'
                  : 'text-teal-200 hover:bg-teal-700 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="hidden lg:block font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Status */}
      <div className="p-4 lg:p-6 border-t border-teal-700">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="hidden lg:block text-xs text-teal-300">Connected</span>
        </div>
      </div>
    </aside>
  );
}
