"use client";

import { useState, useEffect, useRef } from 'react';
import UserPost from './UserPost';

// Mock data, will eventually come from API
const ALL_MOCK_POSTS = [
  {
    id: 1,
    username: "JohnDoe",
    content: "Ayoooooo",
    timestamp: "2h ago",
    likes: 42,
    comments: 7,
    avatarUrl: '/api/mock-data/stock-avatar.jp'
  },
  {
    id: 2,
    username: "JaneDoe",
    content: "This app is lit",
    timestamp: "4h ago",
    likes: 28,
    comments: 12,
    avatarUrl: "/api/placeholder/150/150"
  },
  {
    id: 3,
    username: "TechGuru",
    content: "Just deployed my first smart contract! Web3 is the future 🚀",
    timestamp: "5h ago",
    likes: 156,
    comments: 23,
    avatarUrl: "/api/placeholder/150/150"
  },
  {
    id: 4,
    username: "CryptoQueen",
    content: "Market's looking bullish today! 📈 Who's holding?",
    timestamp: "6h ago",
    likes: 89,
    comments: 34,
    avatarUrl: "/api/placeholder/150/150"
  },
  {
    id: 5,
    username: "DevLife",
    content: "4 cups of coffee and still debugging the same issue. Send help! ☕️",
    timestamp: "7h ago",
    likes: 245,
    comments: 45,
    avatarUrl: "/api/placeholder/150/150"
  },
  {
    id: 6,
    username: "ArtisticSoul",
    content: "Just finished my latest digital artwork! What do you think? 🎨",
    timestamp: "8h ago",
    likes: 178,
    comments: 28,
    avatarUrl: "/api/placeholder/150/150"
  },
  {
    id: 7,
    username: "FoodieExplorer",
    content: "Found this amazing ramen spot downtown! The broth is incredible 🍜",
    timestamp: "9h ago",
    likes: 134,
    comments: 19,
    avatarUrl: "/api/placeholder/150/150"
  },
  {
    id: 8,
    username: "StartupFounder",
    content: "Big announcement coming soon! Stay tuned 👀",
    timestamp: "10h ago",
    likes: 567,
    comments: 89,
    avatarUrl: "/api/placeholder/150/150"
  },
  {
    id: 9,
    username: "TravelBug",
    content: "Just booked my tickets to Bali! Any recommendations? ✈️",
    timestamp: "11h ago",
    likes: 223,
    comments: 56,
    avatarUrl: "/api/placeholder/150/150"
  },
  {
    id: 10,
    username: "MusicProducer",
    content: "New track dropping this weekend! It's my best work yet 🎵",
    timestamp: "12h ago",
    likes: 445,
    comments: 67,
    avatarUrl: "/api/placeholder/150/150"
  }
];

const POSTS_PER_PAGE = 3;

export default function MainFeed() {
  const [posts, setPosts] = useState<typeof ALL_MOCK_POSTS>([]);
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
    const newPosts = ALL_MOCK_POSTS.slice(start, end);
    
    setPosts(prevPosts => [...prevPosts, ...newPosts]);
    setLoading(false);
  };

  // Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const first = entries[0];
        if (first.isIntersecting && !loading && posts.length < ALL_MOCK_POSTS.length) {
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
        {loading && posts.length < ALL_MOCK_POSTS.length && (
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