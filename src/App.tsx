import { useState, useMemo, useEffect } from 'react';
import { Dropdown } from './components/Dropdown/Dropdown';
import { CartProvider } from './context/CartContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { ItemCard } from './components/ItemCard/ItemCard';
import { Pagination } from './components/Pagination/Pagination';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { GiBroadsword, GiMoneyStack, GiFeather } from 'react-icons/gi';
import './App.css';
import { FaSliders } from 'react-icons/fa6';
import { dummyData } from './data/dummyData';

const gameTypes = ['8-ball', 'apex-legends', 'arcane', 'battlefield', 'default'] as const;

const games = [
  { label: 'Select Game', value: 'all' },
  ...gameTypes.map(game => ({
    label: game.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    value: game
  }))
];

const prices = ['All', 'On Sale', 'Full Price'];
const itemTypes = ['All', 'Hat', 'Skin', 'Weapon'];
const sortOptions = [
  { label: 'Featured', value: 'Featured' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Name: A-Z', value: 'name_asc' },
  { label: 'Name: Z-A', value: 'name_desc' }
];

export default function App() {
  const [selectedGame, setSelectedGame] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const ITEMS_PER_PAGE = 15;

  const filteredItems = useMemo(() => {
    let filtered = [...dummyData];

    if (selectedGame !== 'all') {
      filtered = filtered.filter(item => item.game === selectedGame);
    }

    if (selectedPrice === 'On Sale') {
      filtered = filtered.filter(item => item.onSale);
    } else if (selectedPrice === 'Full Price') {
      filtered = filtered.filter(item => !item.onSale);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        case 'name_asc':
          return a.title.localeCompare(b.title);
        case 'name_desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedGame, selectedPrice, sortBy]);

  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const currentItems = filteredItems.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedGame, selectedPrice, sortBy]);

  return (
    <CurrencyProvider>
      <CartProvider>
        <div className="app">
          <Header />
          <div className="shop-wrapper">
        <div className="shop-content">
          <div className="shop-header">
            <h1>Condimentum consectetur</h1>

            <div className="shop-filters">
              <div className="filter-group">
                    <Dropdown 
                      label=""
                      options={games}
                      value={selectedGame}
                      onChange={setSelectedGame}
                      className="game-dropdown"
                      icon={<GiBroadsword size={20} color="white" />}
                    />
                <div className="search-input-wrapper">
                  <input 
                    className="search-input" 
                    placeholder="Search" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="filter-group">
                <Dropdown 
                  label="Price"
                  options={prices.map(price => ({ label: price, value: price }))}
                  value={selectedPrice}
                  onChange={setSelectedPrice}
                  icon={<GiMoneyStack size={27} color="#00d991" />}
                  variant="default"
                />
                <Dropdown 
                  label="Item Type"
                  options={itemTypes.map(type => ({ label: type, value: type }))}
                  value={selectedType}
                  onChange={setSelectedType}
                  icon={<GiFeather size={27} color="#00d991" />}
                  variant="default"
                />
              </div>
            </div>
          </div>

          <div className="shop-container">
            <div className="results-info">
                                <span>Showing {startIndex + 1} - {endIndex} from {totalItems}</span>
              <Dropdown
                label="Sort by"
                options={sortOptions.map(opt => opt.label)}
                value={sortBy}
                onChange={setSortBy}
                variant="default"
                icon={<FaSliders size={27} color="#00d991" />}
              />
            </div>

            <div className="card-grid">
              {currentItems.map(item => (
                <ItemCard key={item.id} {...item} />
              ))}
            </div>

            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={setCurrentPage} 
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
      </CartProvider>
    </CurrencyProvider>
  );
}
