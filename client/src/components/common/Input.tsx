import type { ReactNode } from 'react';

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  className?: string;
  icon?: ReactNode;
}

export function Input({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  className = '',
  icon,
}: InputProps) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-custom-black mb-2 font-sora">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={`w-full px-4 py-3 ${icon ? 'pl-10' : ''} border border-custom-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-sora ${
            error ? 'border-red-500 focus:ring-red-500' : ''
          }`}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500 font-sora">{error}</p>
      )}
    </div>
  );
}