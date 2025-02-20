"use client";

import { useState, useEffect, useRef } from 'react';
import UserPost from './UserPost';
import { MOCK_POSTS } from '../api/mock-data/mockUserData';

const POSTS_PER_PAGE = 10;

export default function MainFeed() {
  const [posts, setPosts] = useState<typeof MOCK_POSTS>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loader = useRef<HTMLDivElement>(null);

  // Simulate API fetch with delay
  const fetchMorePosts = async () => {
    setLoading(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const start = (page - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    const newPosts = MOCK_POSTS.slice(start, end);
    
    setPosts(prevPosts => [...prevPosts, ...newPosts]);
    setLoading(false);
  };

  // Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const first = entries[0];
        if (first.isIntersecting && !loading && posts.length < MOCK_POSTS.length) {
          setPage(prevPage => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, [loading, posts.length]);

  // Fetch posts when page changes
  useEffect(() => {
    fetchMorePosts();
  }, [page]);

  return (
    <div className="max-w-2xl mx-auto">
      {posts.map((post) => (
        <UserPost
          key={post.id}
          username={post.username}
          content={post.content}
          timestamp={post.timestamp}
          likes={post.likes}
          comments={post.comments}
          avatarUrl={post.avatarUrl}
        />
      ))}
      
      <div ref={loader} className="flex justify-center p-4">
        {loading && posts.length < MOCK_POSTS.length && (
          <div className="animate-pulse flex space-x-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
}