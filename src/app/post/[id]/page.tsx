'use client';

import { Post } from '@/types/post';
import Image from 'next/image';
import Link from 'next/link';
import PostContent from '@/components/PostContent';
import { useData } from '@/contexts/DataContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function PostPage() {
  const { data } = useData();
  const router = useRouter();
  const pathname = usePathname();
  const postId = pathname?.split('/').pop() || '';
  const decodedId = decodeURIComponent(postId);

  useEffect(() => {
    if (!data) {
      router.push('/');
    }
  }, [data, router]);

  if (!data) {
    return null;
  }

  const post = data.posts.find(p => p.post_url === decodedId);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] py-6">
        <div className="max-w-2xl mx-auto px-4">
          <Link 
            href="/"
            className="inline-flex items-center text-sm text-gray-400 hover:text-gray-200 mb-6"
          >
            ← Back to posts
          </Link>
          <div className="bg-[#1a1a1a] rounded-xl shadow-lg p-6">
            Post not found
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-6">
      <div className="max-w-2xl mx-auto px-4">
        <Link 
          href="/"
          className="inline-flex items-center text-sm text-gray-400 hover:text-gray-200 mb-6"
        >
          ← Back to posts
        </Link>

        <article className="bg-[#1a1a1a] rounded-xl shadow-lg p-6 mb-6">
          <PostContent post={post} />
        </article>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-200 mb-4">
            {post.comment_count} Comments
          </h2>
          {post.comments.map((comment, index) => (
            <div key={index} className="bg-[#1a1a1a] rounded-xl shadow-lg p-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 relative">
                  {comment.commenter_icon && (
                    <Image
                      src={comment.commenter_icon}
                      alt={comment.commenter_name}
                      fill
                      className="rounded-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-200 truncate">
                      {comment.commenter_name}
                    </span>
                    <span className="text-[13px] text-[#aaa] flex-shrink-0">
                      {comment.timestamp}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-2">{comment.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 