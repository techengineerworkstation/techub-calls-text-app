'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Toaster } from 'react-hot-toast';
import {
  UserCircleIcon,
  PhoneIcon,
  BellIcon,
  ShieldCheckIcon,
  PaintBrushIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    incomingCalls: true,
    messages: true,
    voicemail: true,
  });

  const [appearance, setAppearance] = useState({
    theme: 'light',
    fontSize: 'medium',
  });

  return (
    <div className="flex h-screen bg-cream-50">
      <Toaster position="top-right" />

      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
            <p className="text-gray-500 mt-1">Manage your account and preferences</p>
          </div>

          {/* Profile Section */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <UserCircleIcon className="w-6 h-6 text-teal-600" />
              <h2 className="text-lg font-semibold text-gray-800">Profile</h2>
            </div>

            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-teal-700">T</span>
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-medium text-gray-800">TelnyxPhone User</h3>
                <p className="text-gray-500">+1 (225) 513-7157</p>
                <p className="text-sm text-gray-400 mt-1">techengineerworkstation</p>
              </div>

              <button className="px-4 py-2 bg-cream-100 text-gray-700 rounded-xl hover:bg-cream-200 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Phone Settings */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <PhoneIcon className="w-6 h-6 text-teal-600" />
              <h2 className="text-lg font-semibold text-gray-800">Phone Settings</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-cream-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-800">Caller ID</p>
                  <p className="text-sm text-gray-500">Your outgoing caller ID number</p>
                </div>
                <span className="text-gray-700">+1 (225) 513-7157</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-cream-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-800">Call Recording</p>
                  <p className="text-sm text-gray-500">Automatically record all calls</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-cream-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-800">Voicemail</p>
                  <p className="text-sm text-gray-500">Enable voicemail for missed calls</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <BellIcon className="w-6 h-6 text-teal-600" />
              <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-cream-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-800">Incoming Calls</p>
                  <p className="text-sm text-gray-500">Show notifications for incoming calls</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.incomingCalls}
                    onChange={(e) => setNotifications({ ...notifications, incomingCalls: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-cream-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-800">Messages</p>
                  <p className="text-sm text-gray-500">Show notifications for new messages</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.messages}
                    onChange={(e) => setNotifications({ ...notifications, messages: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-cream-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-800">Voicemail</p>
                  <p className="text-sm text-gray-500">Show notifications for new voicemails</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.voicemail}
                    onChange={(e) => setNotifications({ ...notifications, voicemail: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <PaintBrushIcon className="w-6 h-6 text-teal-600" />
              <h2 className="text-lg font-semibold text-gray-800">Appearance</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-cream-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-800">Theme</p>
                  <p className="text-sm text-gray-500">Choose your preferred theme</p>
                </div>
                <select
                  value={appearance.theme}
                  onChange={(e) => setAppearance({ ...appearance, theme: e.target.value })}
                  className="px-4 py-2 bg-white border border-cream-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-4 bg-cream-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-800">Font Size</p>
                  <p className="text-sm text-gray-500">Adjust the text size</p>
                </div>
                <select
                  value={appearance.fontSize}
                  onChange={(e) => setAppearance({ ...appearance, fontSize: e.target.value })}
                  className="px-4 py-2 bg-white border border-cream-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <InformationCircleIcon className="w-6 h-6 text-teal-600" />
              <h2 className="text-lg font-semibold text-gray-800">About</h2>
            </div>

            <div className="space-y-3 text-sm text-gray-600">
              <p><strong>App:</strong> TelnyxPhone</p>
              <p><strong>Version:</strong> 1.0.0</p>
              <p><strong>Phone Number:</strong> +1 (225) 513-7157</p>
              <p><strong>SIP Connection:</strong> techengineerworkstation</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
