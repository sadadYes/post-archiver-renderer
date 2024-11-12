'use client';

import { useState, useCallback } from 'react';
import type { ChannelData } from '@/types/post';
import PostCard from '@/components/PostCard';
import Image from 'next/image';
import { useData } from '@/contexts/DataContext';
import Link from 'next/link';

export default function Home() {
  const { data, setData } = useData();
  const [error, setError] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileData = (file: File) => {
    if (!file || !file.name.endsWith('.json')) {
      setError('Please upload a JSON file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string);
        setData(jsonData);
        setError('');
      } catch (error) {
        console.error('Error parsing JSON:', error);
        setError('Invalid JSON file format');
        setData(null);
      }
    };
    reader.readAsText(file);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleFileData(file);
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileData(file);
  }, [handleFileData]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const loadExampleData = async () => {
    try {
      const response = await fetch('/data.json');
      const jsonData = await response.json();
      setData(jsonData);
      setError('');
    } catch (error) {
      console.error('Failed to load example data:', error);
      setError('Failed to load example data');
      setData(null);
    }
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <h1 className="text-3xl font-bold text-center text-gray-100 mb-8">
            Post Archiver Renderer
          </h1>
          <div 
            className={`p-6 bg-gray-800 rounded-lg border-2 border-dashed transition-colors
              ${isDragging ? 'border-violet-500 bg-gray-700' : 'border-gray-600'}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <h2 className="text-2xl font-bold text-gray-100 mb-4">Upload JSON Data</h2>
            <p className="text-gray-400 mb-2">
              Drag and drop your YouTube community posts JSON data file here, or click to select
            </p>
            <p className="text-gray-400 mb-6 text-sm">
              To get the JSON data, you can use{' '}
              <Link 
                href="https://github.com/sadadYes/post-archiver"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 hover:text-violet-300 underline"
              >
                post-archiver
              </Link>
            </p>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-400 mb-4
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100"
            />
            <button
              onClick={loadExampleData}
              className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors"
            >
              Load Example Data
            </button>
            {error && (
              <p className="mt-4 text-red-500">{error}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-12">
          {data.channel_icon && (
            <Image
              src={data.channel_icon}
              alt={data.channel}
              width={64}
              height={64}
              className="rounded-full"
            />
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-100 mb-1">{data.channel}</h1>
            <p className="text-sm text-gray-400">
              {data.posts_count} posts
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          {data.posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
