'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { Post } from '@/types/post';
import { formatContent } from '@/utils/formatContent';

export default function PostContent({ post }: { post: Post }) {
  const [formattedHtml, setFormattedHtml] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setFormattedHtml(formatContent(post.content, post.links));
  }, [post.content, post.links]);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : post.images.length - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev < post.images.length - 1 ? prev + 1 : 0));
  };

  return (
    <>
      <div className="flex items-start gap-3 mb-4">
        {post.member_only && (
          <span className="inline-block bg-[#22c55e] text-white text-xs px-2.5 py-1 rounded-full font-medium">
            Members only
          </span>
        )}
        <span className="text-sm text-gray-400">{post.timestamp}</span>
      </div>

      <div 
        className="prose prose-invert max-w-none mb-6 whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: formattedHtml }}
      />

      {post.images && post.images.length > 0 && (
        <>
          <div className="relative mb-6">
            <div 
              className="relative aspect-video w-full rounded-xl overflow-hidden cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              <Image
                src={post.images[currentImageIndex].high_res}
                alt=""
                fill
                className="object-cover hover:opacity-90 transition-opacity"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>

            {post.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {post.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {showModal && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
              onClick={() => setShowModal(false)}
            >
              <div className="relative max-w-7xl w-full h-full">
                <Image
                  src={post.images[currentImageIndex].high_res}
                  alt=""
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
                {post.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                    >
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                    >
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}

      <div className="flex items-center gap-6 text-[13px] text-[#aaa]">
        <span className="flex items-center gap-2">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h5.59c0.45,0,0.83,0.3,0.95,0.77C19.78,12.89,19.98,13.17,19.98,13.17z"/>
          </svg>
          {post.like_count}
        </span>
        <span className="flex items-center gap-2">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm0 15.2L18.8 16H4V4h16v13.2z"/>
          </svg>
          {post.comment_count}
        </span>
      </div>
    </>
  );
} 