
import { useState, useRef, useEffect } from 'react';
import type { ReactNode } from 'react';
import './Dropdown.css';

type DropdownOption = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  options: string[] | DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  variant?: 'default' | 'header';
  className?: string;
  icon?: ReactNode;
};

export function Dropdown({ label, options, value, onChange, variant = 'default', className = '', icon }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const normalizedOptions = options.map(opt => 
    typeof opt === 'string' ? { label: opt, value: opt } : opt
  );

  const selectedOption = normalizedOptions.find(opt => opt.value === value) || normalizedOptions[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div 
      className={`dropdown-container ${variant} ${className} ${isOpen ? 'active' : ''}`}
      ref={dropdownRef}
    >
      <button 
        className="dropdown-button"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
                <div className="dropdown-content">
          {icon && <span className="dropdown-icon">{icon}</span>}
          <div className="dropdown-text">
            {variant !== 'header' && label && <span className="dropdown-label">{label}</span>}
            <span className="dropdown-value">{variant === 'header' ? label : selectedOption.label}</span>
          </div>
          <svg  
            className={`dropdown-arrow ${isOpen ? 'open' : ''}`}
            width="10" 
            height="6" 
            viewBox="0 0 10 6" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M1 1L5 5L9 1" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          {normalizedOptions.map((option) => (
            <button
              key={option.value}
              className={`dropdown-item ${option.value === value ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option.value)}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
