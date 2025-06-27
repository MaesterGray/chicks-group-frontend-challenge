import { useState } from 'react';
import { BsSearch, BsChevronDown } from 'react-icons/bs';
import { useCurrency, type Currency } from '../../context/CurrencyContext';
import './MobileDrawer.css';

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  dropdownOptions: {
    currency: typeof CURRENCY_OPTIONS;
    items: typeof ITEMS_OPTIONS;
    accounts: typeof ACCOUNTS_OPTIONS;
    services: typeof SERVICES_OPTIONS;
    swap: typeof SWAP_OPTIONS;
    sell: typeof SELL_OPTIONS;
  };
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

type MenuItem = {
  label: string;
  options: typeof CURRENCY_OPTIONS;
  value: string;
  onChange: (value: string) => void;
}

const CURRENCY_OPTIONS = [
  { label: 'USD', value: 'USD' },
  { label: 'EUR', value: 'EUR' },
  { label: 'GBP', value: 'GBP' }
];

const ITEMS_OPTIONS = [
  { label: 'ITEMS', value: 'items' },
  { label: 'Weapons', value: 'weapons' },
  { label: 'Armor', value: 'armor' },
  { label: 'Accessories', value: 'accessories' }
];

const ACCOUNTS_OPTIONS = [
  { label: 'ACCOUNTS', value: 'accounts' },
  { label: 'My Profile', value: 'profile' },
  { label: 'Settings', value: 'settings' },
  { label: 'Logout', value: 'logout' }
];

const SERVICES_OPTIONS = [
  { label: 'SERVICES', value: 'services' },
  { label: 'Trading', value: 'trading' },
  { label: 'Marketplace', value: 'marketplace' },
  { label: 'Support', value: 'support' }
];

const SWAP_OPTIONS = [
  { label: 'SWAP', value: 'swap' },
  { label: 'Quick Swap', value: 'quick-swap' },
  { label: 'Advanced Swap', value: 'advanced-swap' }
];

const SELL_OPTIONS = [
  { label: 'SELL', value: 'sell' },
  { label: 'Quick Sell', value: 'quick-sell' },
  { label: 'Bulk Sell', value: 'bulk-sell' }
];

export function MobileDrawer({ isOpen, onClose, searchQuery, onSearchChange }: DrawerProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const { currency, setCurrency } = useCurrency();
  const [items, setItems] = useState('items');
  const [accounts, setAccounts] = useState('accounts');
  const [services, setServices] = useState('services');
  const [swap, setSwap] = useState('swap');
  const [sell, setSell] = useState('sell');

  const menuItems: MenuItem[] = [
    { label: 'CURRENCY', options: CURRENCY_OPTIONS, value: currency, onChange: (value) => setCurrency(value as Currency) },
    { label: 'ITEMS', options: ITEMS_OPTIONS, value: items, onChange: setItems },
    { label: 'ACCOUNTS', options: ACCOUNTS_OPTIONS, value: accounts, onChange: setAccounts },
    { label: 'SERVICES', options: SERVICES_OPTIONS, value: services, onChange: setServices },
    { label: 'SWAP', options: SWAP_OPTIONS, value: swap, onChange: setSwap },
    { label: 'SELL', options: SELL_OPTIONS, value: sell, onChange: setSell },
  ];

  const handleItemClick = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  return (
    <>
      <div className={`mobile-drawer-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <div className={`mobile-drawer ${isOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-search">
          <div className="search-input-container">
            <BsSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        <div className="mobile-drawer-menu">
          {menuItems.map((item) => (
            <div key={item.label} className="menu-item">
              <button
                className={`menu-item-button ${expandedItem === item.label ? 'expanded' : ''}`}
                onClick={() => handleItemClick(item.label)}
              >
                <span>{item.label}</span>
                <BsChevronDown className={`chevron ${expandedItem === item.label ? 'expanded' : ''}`} />
              </button>
              <div className={`menu-item-content ${expandedItem === item.label ? 'expanded' : ''}`}>
                {item.options.map((option) => (
                  <button
                    key={option.value}
                    className={`menu-option ${item.value === option.value ? 'selected' : ''}`}
                    onClick={() => {
                      item.onChange(option.value);
                      setExpandedItem(null);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}