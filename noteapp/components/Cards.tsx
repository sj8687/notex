import React from 'react';
import { FaPlus, FaTrashAlt, FaRegEdit, FaShareAlt } from 'react-icons/fa';

const cardData = [
  {
    title: "Create",
    description: "Create new notes easily. Organize your thoughts and tasks efficiently.",
    icon: <FaPlus className="text-4xl mb-4" />,
    bgColor: "bg-gray-950",
    borderColor: "hover:border-rgb(57, 255, 20)"
  },
  {
    title: "Delete",
    description: "Remove unwanted or outdated notes to keep things clutter-free.",
    icon: <FaTrashAlt className="text-4xl mb-4" />,
    bgColor: "bg-gray-950",
    borderColor: "hover:border-red-400"
  },
  {
    title: "Update",
    description: "Modify your notes to keep them up-to-date with the latest information.",
    icon: <FaRegEdit className="text-4xl mb-4" />,
    bgColor: "bg-gray-950",
    borderColor: "hover:border-green-400"
  },
  {
    title: "Share",
    description: "Share your notes with others to collaborate and stay connected.",
    icon: <FaShareAlt className="text-4xl mb-4" />,
    bgColor: "bg-gray-950",
    borderColor: "hover:border-yellow-400"
  }
];

 export const Cards = () => {
  return (
    <div className="container mx-auto px-4 py-12 md:mt-[179px]">
              <h1 className='text-4xl ml-[70px] md:ml-[480px] mb-20'>Features‼️</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cardData.map((card, index) => (
          <div
            key={index}
            className= {`${card.bgColor} text-white shadow-[0_0_10px_rgba(105,255,205,4)] p-6 border rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl   ${card.borderColor}`}
          >
            <div className="flex justify-center mb-4">
              {card.icon}
            </div>
            <h3 className="text-xl font-semibold mb-4 text-center">{card.title}</h3>
            <p className="text-center">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

