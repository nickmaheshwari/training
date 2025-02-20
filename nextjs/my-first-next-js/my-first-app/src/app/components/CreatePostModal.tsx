"use client";

import { useState, useRef } from "react";
import { X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: { content: string; media?: File; tags: string[] }) => void;
}

const AVAILABLE_TAGS = [
  "nsfw",
  "news",
  "meme",
  "gaming",
  "tech",
  "music",
  "art",
  "food",
  "travel",
  "sports",
];

export default function CreatePostModal({
  isOpen,
  onClose,
  onSubmit,
}: CreatePostModalProps) {
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Determine if it's an image or video
      setMediaType(file.type.startsWith("image/") ? "image" : "video");

      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit({
        content,
        media: fileInputRef.current?.files?.[0],
        tags: selectedTags,
      });
      setContent("");
      setSelectedTags([]);
      setMediaPreview(null);
      setMediaType(null);
      onClose();
    }
  };

  const clearMedia = () => {
    setMediaPreview(null);
    setMediaType(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create Post</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full h-32 p-3 border border-gray-200 rounded-lg mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {mediaPreview && (
          <div className="relative mb-4">
            {mediaType === "image" ? (
              <div className="relative h-48 w-full">
                <Image
                  src={mediaPreview}
                  alt="Preview"
                  fill
                  className="object-contain rounded-lg"
                  unoptimized // Since we're using a data URL
                />
              </div>
            ) : (
              <video
                src={mediaPreview}
                className="max-h-48 w-full rounded-lg object-contain"
                controls
              />
            )}
            <button
              onClick={clearMedia}
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {AVAILABLE_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedTags.includes(tag)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleMediaUpload}
              accept="image/*,video/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 hover:bg-gray-100 rounded-full"
              title="Add media"
            >
              <ImageIcon className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!content.trim()}
            className={`px-4 py-2 rounded-lg ${
              content.trim()
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
