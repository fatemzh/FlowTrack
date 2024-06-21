import { ChangeEvent } from 'react';

type TextInputProps = {
  id?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  onTextChange?: (newValue: string) => void;
  autoComplete?: string;
  label?: string;
  value?: string;
  required?: boolean;
};

export default function TextInput({
  id,
  name,
  type = 'text',
  placeholder,
  onTextChange,
  autoComplete,
  required,
  value,
  label,
}: TextInputProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    if (onTextChange) {
      onTextChange(newValue);
    }
  }

  return (
    <div>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        autoComplete={autoComplete}
        required={required}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );
}
