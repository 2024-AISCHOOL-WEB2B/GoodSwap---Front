import React from "react";

interface ArtistDropdownProps {
  onSelect: (artistId: number) => void;
}

const artistList = [
  { id: 0, name: "전체 게시판" }, // 전체 게시판 항목 추가
  { id: 1, name: "아티스트 A" },
  { id: 2, name: "아티스트 B" },
  { id: 3, name: "아티스트 C" },
];

const ArtistDropdown: React.FC<ArtistDropdownProps> = ({ onSelect }) => {
  return (
    <div className="bg-white border rounded-lg shadow-lg p-2">
      {artistList.map((artist) => (
        <div
          key={artist.id}
          className="p-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => onSelect(artist.id)}
        >
          {artist.name}
        </div>
      ))}
    </div>
  );
};

export { ArtistDropdown };
