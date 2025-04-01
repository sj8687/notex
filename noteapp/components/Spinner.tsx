import React from "react";

const GreenSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-4 border-green-500"></div>
    </div>
  );
};

export default GreenSpinner;
