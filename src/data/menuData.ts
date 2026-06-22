// Tailwind custom colors required in tailwind.config.js:
// colors: {
//   lapis: '#1a3a5c',
//   gold: '#d4a843',
//   pomegranate: '#a83232',
//   ivory: '#faf6f0',
//   charcoal: '#1a1a2e',
// }

export interface MenuItem {
  id: string;
  name: string;
  nameUzbek?: string;
  description: string;
  price: number;
  category: 'appetizers' | 'soups' | 'mains' | 'kebabs' | 'breads' | 'beverages';
  image: string;
  popular?: boolean;
}

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'appetizers', label: 'Appetizers' },
  { id: 'soups', label: 'Soups' },
  { id: 'mains', label: 'Main Courses' },
  { id: 'kebabs', label: 'Kebabs' },
  { id: 'breads', label: 'Breads & Sides' },
  { id: 'beverages', label: 'Beverages' },
] as const;

export const menuItems: MenuItem[] = [
  {
    id: 'achuk-chuchuk',
    name: 'Achuk-Chuchuk',
    nameUzbek: 'Achichuk',
    description:
      'Fresh tomato and onion salad with herbs, dressed in a light vinaigrette.',
    price: 5.99,
    category: 'appetizers',
    image:
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80',
  },
  {
    id: 'samsa-beef',
    name: 'Samsa (Beef)',
    nameUzbek: 'Somsa',
    description:
      'Flaky baked pastry filled with seasoned ground beef and onions.',
    price: 7.99,
    category: 'appetizers',
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80',
    popular: true,
  },
  {
    id: 'samsa-lamb',
    name: 'Samsa (Lamb)',
    nameUzbek: 'Somsa',
    description:
      'Traditional baked pastry with tender lamb and caramelized onions.',
    price: 8.99,
    category: 'appetizers',
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80',
  },
  {
    id: 'shurpa',
    name: 'Shurpa',
    nameUzbek: "Sho'rva",
    description:
      'Slow-cooked clear lamb soup with whole potatoes, carrots, and fresh herbs.',
    price: 15.99,
    category: 'soups',
    image:
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80',
    popular: true,
  },
  {
    id: 'mastava',
    name: 'Mastava',
    nameUzbek: 'Mastava',
    description:
      'Hearty rice and vegetable soup with tender pieces of lamb.',
    price: 14.99,
    category: 'soups',
    image:
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80',
  },
  {
    id: 'uzbek-plov',
    name: 'Uzbek Plov',
    nameUzbek: 'Palov',
    description:
      'The crown jewel — saffron rice pilaf with tender lamb, carrots, and chickpeas.',
    price: 18.99,
    category: 'mains',
    image:
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80',
    popular: true,
  },
  {
    id: 'lagman',
    name: 'Lagman',
    nameUzbek: "Lag'mon",
    description:
      'Hand-pulled noodles in a rich tomato broth with lamb and vegetables.',
    price: 16.99,
    category: 'mains',
    image:
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80',
    popular: true,
  },
  {
    id: 'manti',
    name: 'Manti',
    nameUzbek: 'Manti',
    description:
      'Large steamed dumplings filled with seasoned lamb, served with sour cream.',
    price: 18.99,
    category: 'mains',
    image:
      'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&q=80',
  },
  {
    id: 'norin',
    name: 'Norin',
    nameUzbek: 'Norin',
    description:
      'Cold hand-pulled noodles tossed with finely shredded horsemeat.',
    price: 19.99,
    category: 'mains',
    image:
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80',
  },
  {
    id: 'lamb-kebab',
    name: 'Lamb Kebab',
    nameUzbek: 'Kabob',
    description:
      'Marinated lamb cubes grilled over open charcoal, served with fresh herbs.',
    price: 19.99,
    category: 'kebabs',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80',
  },
  {
    id: 'chicken-kebab',
    name: 'Chicken Kebab',
    nameUzbek: 'Tovuq Kabob',
    description:
      'Tender chicken pieces marinated in aromatic spices and charcoal-grilled.',
    price: 16.99,
    category: 'kebabs',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80',
  },
  {
    id: 'kazan-kebab',
    name: 'Kazan Kebab',
    nameUzbek: 'Qozon Kabob',
    description:
      'Seared lamb with golden potatoes braised in a traditional kazan pot.',
    price: 25.99,
    category: 'kebabs',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80',
    popular: true,
  },
  {
    id: 'uzbek-non',
    name: 'Uzbek Non',
    nameUzbek: 'Non',
    description: 'Traditional round bread baked in a tandoor oven.',
    price: 6.0,
    category: 'breads',
    image:
      'https://images.unsplash.com/photo-1549931319-a545753467c8?w=600&q=80',
  },
  {
    id: 'somsa-bread',
    name: 'Somsa Bread',
    nameUzbek: 'Patir Non',
    description: 'Light, flaky flatbread perfect for scooping.',
    price: 5.99,
    category: 'breads',
    image:
      'https://images.unsplash.com/photo-1549931319-a545753467c8?w=600&q=80',
  },
  {
    id: 'green-tea',
    name: 'Green Tea (Pot)',
    nameUzbek: "Ko'k Choy",
    description:
      'Traditional Central Asian green tea served in a ceramic pot.',
    price: 3.99,
    category: 'beverages',
    image:
      'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80',
  },
  {
    id: 'compot',
    name: 'Compot',
    nameUzbek: 'Kompot',
    description: 'Refreshing homemade fruit compote drink.',
    price: 4.99,
    category: 'beverages',
    image:
      'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80',
  },
];
