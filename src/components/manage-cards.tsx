'use client'

import React, { useState } from 'react';
import { Copy, Plus, ExternalLink, QrCode } from 'lucide-react';

const DigitalBusinessCardsDashboard = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      name: 'Jane Doe',
      title: 'Product Designer',
      company: 'Acme Co.',
      url: 'https://preview--holo-contact.lovable.app/card/jane-doe',
      qrCode: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzAwMCIvPgogIDxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZmZmIi8+CiAgPHJlY3QgeD0iMzAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmZmYiLz4KICA8cmVjdCB4PSI1MCIgeT0iMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2ZmZiIvPgogIDxyZWN0IHg9IjcwIiB5PSIxMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZmZmIi8+CiAgPHJlY3QgeD0iMTAiIHk9IjMwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmZmYiLz4KICA8cmVjdCB4PSI1MCIgeT0iMzAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2ZmZiIvPgogIDxyZWN0IHg9IjcwIiB5PSIzMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZmZmIi8+CiAgPHJlY3QgeD0iMTAiIHk9IjUwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmZmYiLz4KICA8cmVjdCB4PSIzMCIgeT0iNTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2ZmZiIvPgogIDxyZWN0IHg9IjcwIiB5PSI1MCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZmZmIi8+CiAgPHJlY3QgeD0iMTAiIHk9IjcwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmZmYiLz4KICA8cmVjdCB4PSIzMCIgeT0iNzAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2ZmZiIvPgogIDxyZWN0IHg9IjUwIiB5PSI3MCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZmZmIi8+CiAgPHJlY3QgeD0iNzAiIHk9IjcwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmZmYiLz4KPC9zdmc+'
    },
    {
      id: 2,
      name: 'John Smith',
      title: 'Founder',
      company: 'Smith Labs',
      url: 'https://preview--holo-contact.lovable.app/card/john-smith',
      qrCode: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzAwMCIvPgogIDxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZmZmIi8+CiAgPHJlY3QgeD0iNDAiIHk9IjIwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmZmYiLz4KICA8cmVjdCB4PSI2MCIgeT0iMjAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2ZmZiIvPgogIDxyZWN0IHg9IjIwIiB5PSI0MCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZmZmIi8+CiAgPHJlY3QgeD0iNjAiIHk9IjQwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmZmYiLz4KICA8cmVjdCB4PSIyMCIgeT0iNjAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2ZmZiIvPgogIDxyZWN0IHg9IjQwIiB5PSI2MCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZmZmIi8+CiAgPHJlY3QgeD0iNjAiIHk9IjYwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmZmYiLz4KPC9zdmc+'
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [copiedItem, setCopiedItem] = useState('');
  
  const copyToClipboard = async (text: string, item: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(item);
      setTimeout(() => setCopiedItem(''), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const openCard = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Digital Business Cards Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Create, share, and track your digital business cards. Copy links, generate QR codes, and view analytics.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                <Plus size={16} />
                <span>Create new card</span>
              </button>
            </div>
          </div>
        </div>

        {/* Business Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {cards.map((card) => (
            <div key={card.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{card.name}</h3>
                <p className="text-gray-600">{card.title} • {card.company}</p>
              </div>
              
              <div className="flex items-start space-x-4">
                {/* QR Code */}
                <div className="flex-shrink-0">
                  <img
                    src={card.qrCode}
                    alt="QR Code"
                    className="w-20 h-20 border border-gray-200 rounded"
                  />
                </div>
                
                {/* Card Details and Actions */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-600 mb-3 break-all">{card.url}</p>
                  
                  <div className="space-y-2">
                    <button
                      onClick={() => copyToClipboard(card.url, `link-${card.id}`)}
                      className="flex items-center space-x-2 w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      <Copy size={14} />
                      <span>{copiedItem === `link-${card.id}` ? 'Copied!' : 'Copy link'}</span>
                    </button>
                    
                    <button
                      onClick={() => copyToClipboard(card.qrCode, `qr-${card.id}`)}
                      className="flex items-center space-x-2 w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      <QrCode size={14} />
                      <span>{copiedItem === `qr-${card.id}` ? 'Copied!' : 'Copy QR'}</span>
                    </button>
                    
                    <button
                      onClick={() => openCard(card.url)}
                      className="flex items-center space-x-2 w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      <ExternalLink size={14} />
                      <span>Open</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tip */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Tip:</strong> Click &apos;Copy QR&apos; to quickly paste your card QR into emails or documents.
          </p>
        </div>
      </div>

    </div>
  );
};

export default DigitalBusinessCardsDashboard;