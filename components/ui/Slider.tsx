
import React, { InputHTMLAttributes } from 'react';

interface SliderProps extends InputHTMLAttributes<HTMLInputElement> {}

const Slider: React.FC<SliderProps> = ({ className, ...props }) => {
  const customStyles = `
    .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 16px;
        height: 16px;
        background: #0891B2; /* primary color */
        cursor: pointer;
        border-radius: 50%;
        margin-top: -6px; /* Adjust to center */
    }
    .slider::-moz-range-thumb {
        width: 16px;
        height: 16px;
        background: #0891B2;
        cursor: pointer;
        border-radius: 50%;
        border: none;
    }
  `;

  return (
    <>
      <style>{customStyles}</style>
      <input
        type="range"
        className={`w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider ${className}`}
        {...props}
      />
    </>
  );
};

export default Slider;
