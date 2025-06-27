import ArGun from '../assets/game-assets/ar-gun.png';
import BroadSword from '../assets/game-assets/broad-sword.png';
import Helmet from '../assets/game-assets/helmet.png';
import JahRune from '../assets/game-assets/jah-rune.png';
import WoodenShield from '../assets/game-assets/wooden-shield.png';

const gameAssets = [ArGun, BroadSword, Helmet, JahRune, WoodenShield];
const games = ['8-ball', 'apex-legends', 'arcane', 'battlefield', 'default'] as const;

const getRandomPrice = () => Math.floor(Math.random() * (1000 - 50) + 50);
const getRandomImage = () => gameAssets[Math.floor(Math.random() * gameAssets.length)];
const getRandomGame = () => games[Math.floor(Math.random() * games.length)];
const getRandomBoolean = () => Math.random() > 0.5;

const weaponPrefixes = ['Ancient', 'Mystic', 'Dragon', 'Shadow', 'Divine', 'Infernal', 'Celestial', 'Void', 'Storm', 'Frost'];
const weaponTypes = ['Sword', 'Shield', 'Helmet', 'Rune', 'Gun', 'Bow', 'Dagger', 'Staff', 'Axe', 'Mace'];
const weaponSuffixes = ['of Power', 'of the Titan', 'of Destruction', 'of the Phoenix', 'of the Dragon', 'of Time', 'of the Void', 'of Light', 'of Darkness', 'of the Storm'];

const generateItemName = () => {
  const prefix = weaponPrefixes[Math.floor(Math.random() * weaponPrefixes.length)];
  const type = weaponTypes[Math.floor(Math.random() * weaponTypes.length)];
  const suffix = weaponSuffixes[Math.floor(Math.random() * weaponSuffixes.length)];
  return `${prefix} ${type} ${suffix}`;
};

const descriptions = [
  "A legendary item of immense power",
  "Forged in the depths of ancient volcanoes",
  "Blessed by the gods themselves",
  "A rare artifact from a forgotten era",
  "Imbued with mysterious magical properties",
  "Created by master craftsmen of the old world",
  "Carries the essence of elemental forces",
  "A treasured relic of immeasurable value",
  "Enchanted with powerful protective magic",
  "Holds secrets of ancient civilizations"
];

const getRandomDescription = () => descriptions[Math.floor(Math.random() * descriptions.length)];

export const dummyData = Array.from({ length: 150 }, (_, index) => {
  const basePrice = getRandomPrice();
  const onSale = getRandomBoolean();
  
  return {
    id: index + 1,
    title: generateItemName(),
    price: basePrice,
    originalPrice: onSale ? basePrice * 1.2 : basePrice,
    onSale,
    image: getRandomImage(),
    description: getRandomDescription(),
    game: getRandomGame()
  };
});

export type ItemData = typeof dummyData[0];