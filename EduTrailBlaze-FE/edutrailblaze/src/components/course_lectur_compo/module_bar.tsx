"use client";
import React, { useState } from "react";
import { LuTableOfContents } from "react-icons/lu";
import { RiArrowDropDownLine, RiArrowUpSLine } from "react-icons/ri";
import { BsCheck2 } from "react-icons/bs"; // Checkmark icon
import { FiVideo } from "react-icons/fi"; // Video icon

export default function ModuleBar() {
  const [moduleOpen, setModuleOpen] = useState(false); // Toggle module
  const [activeVideo, setActiveVideo] = useState<number | null>(null); // Track active video

  const toggleModule = () => {
    setModuleOpen((prev) => !prev);
  };

  const videos = [
    { id: 1, name: "Video name", duration: "10:05" },
    { id: 2, name: "Video name", duration: "12:04" },
    { id: 3, name: "Video name", duration: "10:05" },
  ];

  return (
    <div className="w-fit border-r-2 border-gray-200">
      {/* Header */}
      <div className="flex pl-3 text-center items-center font-bold py-3 bg-white">
        <LuTableOfContents className="text-2xl" />
        <h1 className="px-2 text-xl">Course Content</h1>
      </div>

      {/* Module Dropdown */}
      <div
        className="flex bg-gray-100 w-[300px] px-4 py-2 justify-between cursor-pointer items-center"
        onClick={toggleModule}
      >
        <div>
          <p className="font-semibold text-lg">1. Introduction</p>
          <p className="font-thin text-sm">30 min | 1/3</p>
        </div>
        <div>
          {moduleOpen ? (
            <RiArrowUpSLine className="text-3xl" />
          ) : (
            <RiArrowDropDownLine className="text-3xl" />
          )}
        </div>
      </div>

      {/* Submenu */}
      {moduleOpen && (
        <div className="bg-white">
          {videos.map((video) => (
            <div
              key={video.id}
              onClick={() => setActiveVideo(video.id)}
              className={`flex items-center justify-between px-4 py-2 cursor-pointer ${
                activeVideo === video.id ? "bg-blue-100" : "hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-2">
                <FiVideo className="text-gray-500" />
                <div>
                  <p
                    className={`font-semibold ${
                      activeVideo === video.id ? "text-blue-600" : ""
                    }`}
                  >
                    {video.id}. {video.name}
                  </p>
                  <p className="text-sm text-gray-500">{video.duration}</p>
                </div>
              </div>
              <BsCheck2 className="text-xl text-gray-600" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
