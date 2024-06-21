import React, { useState, useEffect } from 'react';

interface ButtonProps {
  label: string;
  confirmationText?: string;
  onClickAction?: () => void;
  isDisabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, confirmationText, onClickAction, isDisabled }) => {
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    if (isConfirming) {
      const timer = setTimeout(() => {
        setIsConfirming(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isConfirming]);

  const handleClick = () => {
    if (isDisabled) return;

    if (isConfirming && onClickAction) {
      onClickAction();
      setIsConfirming(false);
    } else {
      setIsConfirming(true);
    }
  };

  return (
    <button
      className={`w-full rounded p-3 mt-2 text-xs font-semibold transition-all
        ${isDisabled ? 'text-gray-500 bg-gray-200 cursor-not-allowed' : 'text-white bg-green-600 bg-opacity-80 hover:bg-opacity-100'}
        ${isConfirming ? 'text-red-300 shadow-lg shadow-red-300' : ''}`}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {isConfirming ? confirmationText || 'Are you sure?' : label}
    </button>
  );
};

export default Button;
