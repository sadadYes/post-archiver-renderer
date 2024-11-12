'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Post } from '@/types/post';
import { useState, useEffect } from 'react';
import { formatContent } from '@/utils/formatContent';

export default function PostCard({ post }: { post: Post }) {
  const [formattedHtml, setFormattedHtml] = useState('');
  const maxLength = 150;
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fullFormattedContent = formatContent(post.content, post.links);
    
    if (!isExpanded && post.content.length > maxLength) {
      let truncatedContent = post.content.slice(0, maxLength) + '...';
      setFormattedHtml(formatContent(truncatedContent, post.links));
    } else {
      setFormattedHtml(fullFormattedContent);
    }
  }, [post.content, post.links, isExpanded]);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : post.images.length - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev < post.images.length - 1 ? prev + 1 : 0));
  };

  return (
    <article className="bg-[#0f0f0f] rounded-xl overflow-hidden border border-[#3f3f3f] hover:bg-[#1f1f1f] transition-colors duration-200">
      <div className="p-4">
        <div>
          <Link href={`/post/${encodeURIComponent(post.post_url)}`} className="block">
            <div className="flex items-center gap-3 mb-4">
              {post.member_only && (
                <span className="inline-flex items-center bg-[#2ba640] text-[13px] px-2 py-0.5 rounded-full font-medium text-white">
                  <svg viewBox="0 0 16 16" className="w-3 h-3 mr-1 fill-current">
                    <path d="M10 14.2L4 8.2l1.4-1.4L10 11.4l4.6-4.6L16 8.2z"/>
                  </svg>
                  Members only
                </span>
              )}
              <span className="text-[13px] text-[#aaa]">{post.timestamp}</span>
            </div>

            <div 
              className="text-[#fff] mb-4 whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: formattedHtml }}
            />

            {post.images && post.images.length > 0 && (
              <div className="relative mb-4">
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#1f1f1f]">
                  <Image
                    src={post.images[currentImageIndex].standard}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 768px"
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
                            e.preventDefault();
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
            )}
          </Link>

          {post.content.length > maxLength && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="block text-[#aaa] hover:text-white mb-4"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
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
        </div>
      </div>
    </article>
  );
} 