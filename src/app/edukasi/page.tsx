"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import EducationCard from "../components/EducationCard";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function Edukasi() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledItems, setShuffledItems] = useState([]);


  useEffect(() => {
    const fetchCarouselItems = async () => {
      try {
        const response = await fetch("https://budaya-karya-kita-backend.vercel.app/educations/");
        if (!response.ok) {
          throw new Error("Failed to fetch carousel items");
        }
        const data = await response.json();
        setShuffledItems(shuffleArray(data));
      } catch (error) {
        console.log(error)
      }
    };

    fetchCarouselItems();
  }, []);

  useEffect(() => {
    if (shuffledItems.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffledItems.length);
      }, 10000);

      return () => clearInterval(interval);
    }
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
    <div className="flex flex-col overflow-hidden">
      <Header />
      <div className="flex flex-col justify-center items-center">
        <div className="mt-12 mb-2 text-5xl w-[800px] h-[100px] text-center font-medium">
          Pelajari dan coba berbagai kesenian dan budaya Indonesia
        </div>
        <div className="text-lg w-[800px] mb-4 text-center font-medium text-gray-600">
          Klik gambar dibawah untuk melihat lebih jelas
        </div>
        <div className="flex w-[1000px] items-center px-4">
          {shuffledItems.length > 1 && (
            <button onClick={handlePrev}>
              <ChevronLeftIcon className="size-10 mx-4 active:text-gray-500" />
            </button>
          )}

          <EducationCard currentIndex={currentIndex} shuffledItems={shuffledItems} />

          {shuffledItems.length > 1 && (
            <button onClick={handleNext} className="">
              <ChevronRightIcon className="size-10 mx-4 active:text-gray-500" />
            </button>
          )}
        </div>
        {shuffledItems.length > 1 && (
          <div className="flex justify-center mt-1">
            {shuffledItems.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 mx-1 rounded-full ${
                  index === currentIndex ? "bg-black" : "bg-gray-400"
                }`}
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
