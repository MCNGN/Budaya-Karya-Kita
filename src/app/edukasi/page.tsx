"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";

const carouselItems = [
  {
    id: 1,
    photo: "Foto 1",
    description: "Deskripsi 1",
    bgColor: "bg-red-500",
  },
  {
    id: 2,
    photo: "Foto 2",
    description: "Deskripsi 2",
    bgColor: "bg-blue-500",
  },
  {
    id: 3,
    photo: "Foto 3",
    description: "Deskripsi 3",
    bgColor: "bg-purple-500",
  },
  {
    id: 4,
    photo: "Foto 4",
    description: "Deskripsi 4",
    bgColor: "bg-yellow-500",
  },
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function Card({ currentIndex, shuffledItems }) {
  return (
    <div className="w-[900px] h-[410px] rounded-lg overflow-hidden">
      <div
        className="flex transition-transform duration-1000"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {shuffledItems.map((item) => (
          <div
            key={item.id}
            className={`w-full flex-shrink-0 ${item.bgColor}`}
            style={{ width: "900px", height: "410px" }}
          >
            <div className="flex flex-row h-full w-full">
              <div className="w-1/3">{item.photo}</div>
              <div className="w-2/3 bg-green-500">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Edukasi() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledItems, setShuffledItems] = useState<typeof carouselItems>([]);

  useEffect(() => {
    setShuffledItems(shuffleArray([...carouselItems]));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffledItems.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [shuffledItems]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? shuffledItems.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffledItems.length);
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />
      <div className="flex flex-col items-center">
        <div className="mt-6 mb-16 text-5xl w-[800px] h-[100px] text-center">
          Pelajari dan coba berbagai kesenian dan budaya Indonesia
        </div>
        <div className="flex items-center px-4 ">
          <button onClick={handlePrev}>
            <ChevronLeftIcon className="size-10 mx-4 active:text-gray-500" />
          </button>

          <Card currentIndex={currentIndex} shuffledItems={shuffledItems} />

          <button onClick={handleNext} className="">
            <ChevronRightIcon className="size-10 mx-4 active:text-gray-500" />
          </button>
        </div>
        <div className="flex justify-center mt-4">
          {shuffledItems.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 mx-1 rounded-full ${
                index === currentIndex ? "bg-black" : "bg-gray-400"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
