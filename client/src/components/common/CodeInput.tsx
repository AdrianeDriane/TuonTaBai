// src/components/common/CodeInput.tsx
import { useState, useRef, useEffect } from 'react';

interface CodeInputProps {
  length: number;
  onComplete: (code: string) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
}

export function CodeInput({ 
  length, 
  onComplete, 
  disabled = false, 
  error, 
  className = '' 
}: CodeInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(''));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputs.current[0]) {
      inputs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    // Call onComplete when all fields are filled
    if (values.every(val => val !== '')) {
      onComplete(values.join(''));
    }
  }, [values, onComplete]);

  const handleChange = (index: number, value: string) => {
    if (disabled) return;
    
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;
    
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
    
    // Move to next input if value is entered
    if (value && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    if (disabled) return;
    
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text');
    const digits = pasteData.replace(/\D/g, '').slice(0, length);
    
    if (digits.length === length) {
      const newValues = digits.split('');
      setValues(newValues);
      onComplete(digits);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-center space-x-3">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={values[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            disabled={disabled}
            className={`w-14 h-14 text-center text-2xl font-bold border-2 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent 
              transition-all font-manrope ${
                error 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-custom-gray hover:border-gray-400'
              } ${
                disabled 
                  ? 'bg-gray-100 cursor-not-allowed' 
                  : 'bg-white hover:bg-gray-50'
              }`}
          />
        ))}
      </div>
      {error && (
        <p className="text-sm text-red-500 text-center font-sora">{error}</p>
      )}
    </div>
  );
}