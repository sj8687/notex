import React from "react";

export function MainSkeleton() {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-black">
      <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-red-700 bg-gradient-to-b from-red-700 via-yellow-500 to-yellow-600 animate-spin">
        <span className="absolute inset-0 rounded-full bg-gradient-to-b from-red-700 via-yellow-500 to-yellow-600 blur-sm"></span>
        <span className="absolute inset-0 rounded-full bg-gradient-to-b from-red-700 via-yellow-500 to-yellow-600 blur-md"></span>
        <span className="absolute inset-0 rounded-full bg-gradient-to-b from-red-700 via-yellow-500 to-yellow-600 blur-xl"></span>
        <span className="absolute inset-0 rounded-full bg-gradient-to-b from-red-700 via-yellow-500 to-yellow-600 blur-3xl"></span>
        <div className="absolute inset-2 rounded-full bg-white border-4 border-white"></div>
      </div>
    </div>
  );
}
