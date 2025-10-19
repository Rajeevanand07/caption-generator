import React, { useState } from "react";

export default function CaptionToneSelector({ onSelect }) {
  const [selectedTone, setSelectedTone] = useState(null);

  // Define the colors for the initial/unselected state
  const initialBgColor = "#E0E0E0"; // A neutral grey
  const initialTextColor = "#000000";

  const captionTags = [
    {
      key: "funny",
      label: "Funny",
      color: "#FFD54F", // yellow
      textColor: "#000000",
    },
    {
      key: "romantic",
      label: "Romantic",
      color: "#F48FB1", // pink
      textColor: "#000000",
    },
    {
      key: "motivational",
      label: "Motivational",
      color: "#81C784", // green
      textColor: "#000000",
    },
    {
      key: "sarcastic",
      label: "Sarcastic",
      color: "#B39DDB", // light purple
      textColor: "#000000",
    },
    {
      key: "aesthetic",
      label: "Aesthetic",
      color: "#4FC3F7", // sky blue
      textColor: "#000000",
    },
    {
      key: "dark_humor",
      label: "Dark Humor",
      color: "#424242", // dark grey
      textColor: "#FFFFFF",
    },
    {
      key: "cute",
      label: "Cute",
      color: "#FF7043", // orange
      textColor: "#000000",
    },
    {
      key: "sad",
      label: "Sad",
      color: "#90A4AE", // grey-blue
      textColor: "#000000",
    },
  ];

  const handleSelect = (key) => {
    setSelectedTone(key);
    if (onSelect) onSelect(key);
  };

  return (
    <div className="flex sm:w-[80%] md:w-[40%] justify-center flex-wrap gap-3 p-4">
      {captionTags.map((tag) => (
        <button
          key={tag.key}
          onClick={() => handleSelect(tag.key)}
          className={`px-4 py-2 rounded-full font-medium transition-all duration-200 shadow-sm ${
            selectedTone === tag.key
              ? "scale-110"
              : "border-transparent"
          }`}
          style={{
            // Conditionally apply colors based on selection
            backgroundColor:
              selectedTone === tag.key ? tag.color : initialBgColor,
            color:
              selectedTone === tag.key ? tag.textColor : initialTextColor,
          }}
        >
          {tag.label}
        </button>
      ))}
    </div>
  );
}