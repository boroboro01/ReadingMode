import React from "react";

interface PlaylistTagsProps {
  country?: string;
  era?: string;
  mood?: string;
}

const PlaylistTags: React.FC<PlaylistTagsProps> = ({ country, era, mood }) => {
  const parseTags = (tagString: string): string[] => {
    if (!tagString || tagString.trim() === "") return [];
    return tagString
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
  };

  const countryTags = parseTags(country || "");
  const eraTags = parseTags(era || "");
  const moodTags = parseTags(mood || "");

  const allTags = [...countryTags, ...eraTags, ...moodTags];

  if (allTags.length === 0) return null;

  return (
    <div className="playlist-tags">
      {allTags.map((tag, index) => (
        <span key={index} className="playlist-tag">
          {tag}
        </span>
      ))}
    </div>
  );
};

export default PlaylistTags;
