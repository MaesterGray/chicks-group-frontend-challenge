import { useState } from 'react';
import { Dropdown } from '../Dropdown/Dropdown';
import { MobileDrawer } from '../MobileDrawer/MobileDrawer';
import Logo from '../../assets/chicks-logo.svg';
import { BsCart3, BsPerson, BsList } from 'react-icons/bs';
import { useCart } from '../../context/CartContext';
import { useCurrency, type Currency } from '../../context/CurrencyContext';
import './Header.css';

type DropdownOption = {
  label: string;
  value: string;
};

const CURRENCY_OPTIONS: DropdownOption[] = [
  { label: 'USD', value: 'USD' },
  { label: 'EUR', value: 'EUR' },
  { label: 'GBP', value: 'GBP' }
];

const ITEMS_OPTIONS: DropdownOption[] = [
  { label: 'ITEMS', value: 'items' },
  { label: 'Weapons', value: 'weapons' },
  { label: 'Armor', value: 'armor' },
  { label: 'Accessories', value: 'accessories' }
];

const ACCOUNTS_OPTIONS: DropdownOption[] = [
  { label: 'ACCOUNTS', value: 'accounts' },
  { label: 'My Profile', value: 'profile' },
  { label: 'Settings', value: 'settings' },
  { label: 'Logout', value: 'logout' }
];

const SERVICES_OPTIONS: DropdownOption[] = [
  { label: 'SERVICES', value: 'services' },
  { label: 'Support', value: 'support' },
  { label: 'FAQ', value: 'faq' }
];

const SWAP_OPTIONS: DropdownOption[] = [
  { label: 'SWAP', value: 'swap' },
  { label: 'Exchange', value: 'exchange' }
];

const SELL_OPTIONS: DropdownOption[] = [
  { label: 'SELL', value: 'sell' },
  { label: 'Market', value: 'market' }
];



export function Header() {
  const { totalItems } = useCart();
  const { currency, setCurrency } = useCurrency();
  const [items, setItems] = useState('items');
  const [accounts, setAccounts] = useState('accounts');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <header className="main-header">
      <div className="header-content">
        <div className="header-left">
                    <button 
              className="menu-button" 
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open menu"
            >
              <BsList size={24} />
              {totalItems > 0 && (
                <span className="cart-indicator">{totalItems}</span>
              )}
</button>
          <div className="logo-container">
            <img src={Logo} alt="Chicks Gold" className="header-logo" />
          </div>
          
          <div className="header-nav">
            <Dropdown
              label="CURRENCY"
              options={CURRENCY_OPTIONS}
              value={currency}
              onChange={(value) => setCurrency(value as Currency)}
              variant="header"
            />
            <Dropdown
              label="ITEMS"
              options={ITEMS_OPTIONS}
              value={items}
              onChange={setItems}
              variant="header"
            />
            <Dropdown
              label="ACCOUNTS"
              options={ACCOUNTS_OPTIONS}
              value={accounts}
              onChange={setAccounts}
              variant="header"
            />
          
          </div>
        </div>

        <div className="header-actions">
          <Dropdown
            label={CURRENCY_OPTIONS.find(opt => opt.value === currency)?.label || currency}
            options={CURRENCY_OPTIONS}
                          value={currency}
            onChange={(value) => setCurrency(value as Currency)}
            variant="header"
          />
          <button className="cart-button">
            <BsCart3 className="cart-icon" />
            <span>CART ({totalItems})</span>
          </button>
                      <button className="sign-in-button desktop-only">
              <span>SIGN IN</span>
              <BsPerson className="user-icon" />
            </button>
        </div>
      </div>
    </header>

      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        dropdownOptions={{
          currency: CURRENCY_OPTIONS,
          items: ITEMS_OPTIONS,
          accounts: ACCOUNTS_OPTIONS,
          services: SERVICES_OPTIONS,
          swap: SWAP_OPTIONS,
          sell: SELL_OPTIONS
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
    </>
  );
} 