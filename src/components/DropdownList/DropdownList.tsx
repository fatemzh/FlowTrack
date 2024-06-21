import { useState } from 'react';

type SelectProps = {
  options?: Array<{ value: string; label: string }>;
  onValueChange?: (newValue: string) => void;
  currentRoleLabel?: string;
};

const DropdownSelect: React.FC<SelectProps> = ({ options, onValueChange, currentRoleLabel = 'Choisir une option' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(currentRoleLabel);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (value: string, label: string) => {
    if (onValueChange) {
      onValueChange(value);
    }
    setSelectedLabel(label);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left w-56">
      <button type="button"
        className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-secondary-900 shadow-sm ring-1 ring-inset ring-secondary-300 hover:bg-secondary-50"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{selectedLabel}</span>
        <svg className="-mr-1 h-5 w-5 text-secondary-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd" />
        </svg>
      </button>
      {isOpen && (
        <div
          className="absolute left-0 z-10 mt-2 origin-top-right rounded-md bg-white ring-1 ring-black ring-opacity-25 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1">
            {options.map(option => (
              <button
                key={option.value}
                className="text-secondary-700 block w-full text-left px-4 py-2 text-sm"
                role="menuitem"
                onClick={() => handleOptionClick(option.value, option.label)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownSelect;
