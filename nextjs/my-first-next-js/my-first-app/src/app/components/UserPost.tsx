import { Heart, MessageCircle, Share2 } from 'lucide-react';
import Image from 'next/image';

interface PostProps {
  username: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  avatarUrl: string;
}

export default function UserPost({ 
  username, 
  content, 
  timestamp, 
  likes, 
  comments, 
  avatarUrl 
}: PostProps) {
  return (
    <div className="border-b border-gray-200 p-4">
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={avatarUrl}
              alt={`${username}'s avatar`}
              fill
              className="border-black object-cover"
            />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h2 className="text-blue-700 font-semibold">{username}</h2>
            <span className="text-blue-400 text-sm">· {timestamp}</span>
          </div>
          
          <p className="mt-2 text-gray-900">{content}</p>
          
          <div className="flex items-center space-x-6 mt-3">
            <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500">
              <Heart className="w-5 h-5" />
              <span>{likes}</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
              <MessageCircle className="w-5 h-5" />
              <span>{comments}</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}