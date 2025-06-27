import './ItemCard.css';

import { useState } from 'react';
import { BsCart3 } from 'react-icons/bs';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import EightBallLogo from '../../assets/game-logos/8-ball-logo.png';
import ApexLogo from '../../assets/game-logos/apex-legends-logo.png';
import ArcaneLogo from '../../assets/game-logos/arcane-logo.png';
import BattlefieldLogo from '../../assets/game-logos/battlefield-logo.png';
import DefaultLogo from '../../assets/game-logos/game-logo.png';

type Game = '8-ball' | 'apex-legends' | 'arcane' | 'battlefield' | 'default';

type Props = {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  onSale: boolean;
  image: string;
  description?: string;
  game: Game;
}

const getGameLogo = (game: Game) => {
  switch (game) {
    case '8-ball':
      return EightBallLogo;
    case 'apex-legends':
      return ApexLogo;
    case 'arcane':
      return ArcaneLogo;
    case 'battlefield':
      return BattlefieldLogo;
    default:
      return DefaultLogo;
  }
};

export function ItemCard({ id, title, price, originalPrice, onSale, image, description, game }: Props) {
  const [quantity, setQuantity] = useState(1);
  const { addItem, removeItem, isItemInCart } = useCart();
  const { convertPrice, formatPrice } = useCurrency();

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="item-card">
      <div className="item-status">
        <div className="status-indicators">
          {onSale && (
            <div className="status-indicator">
              <div className="status-dot sale-dot"></div>
              <span>ON SALE</span>
            </div>
          )}
          <div className="stock-indicator">
            <span className="stock-text">IN STOCK</span>
          </div>
        </div>
        <div className="quantity-controls">
          <span className="quantity-display">{quantity}</span>
          <div className="quantity-buttons">
            <button className="quantity-btn up" onClick={increaseQuantity}>
              <span className="chevron">▲</span>
            </button>
            <button className="quantity-btn down" onClick={decreaseQuantity}>
              <span className="chevron">▼</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="item-image-container">
        <img src={image} alt={title} className="item-image" />
      </div>
      
      <div className="item-info">
        <div className="item-title-container">
          <h3 className="item-title">{title}</h3>
          <div className="game-logo-container">
            <img src={getGameLogo(game)} alt={game} className="game-logo" />
          </div>
        </div>
        {description && <p className="item-description">{description}</p>}
        <div className="item-price">
          {formatPrice(convertPrice(price))}
          {onSale && <span className="item-original-price">{formatPrice(convertPrice(originalPrice))}</span>}
        </div>
        <div className="item-actions">
          <button className="btn-details">DETAILS</button>
          <button 
            className={`btn-add ${isItemInCart(id.toString()) ? 'remove' : ''}`}
            onClick={() => {
              const itemId = id.toString();
              if (isItemInCart(itemId)) {
                removeItem(itemId);
              } else {
                addItem({
                  id: itemId,
                  title,
                  price: convertPrice(price),
                  quantity,
                  image
                });
              }
            }}
          >
            <span>{isItemInCart(id.toString()) ? 'REMOVE' : 'ADD'}</span>
            <div className="icon-container">
              <BsCart3 className="cart-icon" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
