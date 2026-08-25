export const seedProducts = [
  {
    id: 1,
    name: "Hydrating Serum",
    price: 25,
    cat: "skincare",
    img: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Vitamin C Oil",
    price: 19,
    cat: "skincare",
    img: "https://images.unsplash.com/photo-1585386959984-a41552231658?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "SPF 50 Sunscreen",
    price: 18.5,
    cat: "skincare",
    img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Gentle Cleanser",
    price: 15,
    cat: "skincare",
    img: "https://images.unsplash.com/photo-1617957743091-4e3780a73b3b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Rose Toner",
    price: 12,
    cat: "skincare",
    img: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Night Repair Cream",
    price: 29,
    cat: "skincare",
    img: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Silk Dress",
    price: 55,
    cat: "clothes",
    img: "https://images.unsplash.com/photo-1520975922203-b1aab9f0ee84?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 8,
    name: "Casual Tee",
    price: 14,
    cat: "clothes",
    img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 9,
    name: "Denim Jacket",
    price: 65,
    cat: "clothes",
    img: "https://images.unsplash.com/photo-1520975589018-6b0daabf2f04?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 10,
    name: "Floral Skirt",
    price: 29,
    cat: "clothes",
    img: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 11,
    name: "Jewelry Set",
    price: 44,
    cat: "jewelry",
    img: "https://images.unsplash.com/photo-1617038260897-3b6e1be77934?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 12,
    name: "Sneakers",
    price: 59,
    cat: "shoes",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 13,
    name: "Handbag",
    price: 48,
    cat: "bags",
    img: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 14,
    name: "Vanilla Eau de Parfum",
    price: 42,
    cat: "perfumes",
    img: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 15,
    name: "Rose Mist Perfume",
    price: 35,
    cat: "perfumes",
    img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop",
  },
];

export const defaultCategories = [
  "skincare",
  "clothes",
  "jewelry",
  "shoes",
  "perfumes",
  "bags",
];

export function freshState() {
  return {
    products: seedProducts.map((product) => ({
      ...product,
      available: true,
    })),

    categories: defaultCategories,

    cart: [],

    filter: "all",

    role: "guest",

    user: {
      name: "Guest",
      points: 500,
      tier: "Silver",
      notifications: 3,
    },

    orders: [
      {
        id: 1001,
        customerName: "Chidera",
        total: 25,
        status: "pending",
        items: [
          {
            id: 1,
            name: "Hydrating Serum",
            price: 25,
            qty: 1,
          },
        ],
      },
      {
        id: 1002,
        customerName: "Ebere",
        total: 55,
        status: "paid",
        items: [
          {
            id: 7,
            name: "Silk Dress",
            price: 55,
            qty: 1,
          },
        ],
      },
    ],

    customers: [
      {
        id: 1,
        name: "Chidera",
        email: "chidera@example.com",
        points: 620,
        tier: "Gold",
        blocked: false,
      },
      {
        id: 2,
        name: "Ebere",
        email: "ebere@example.com",
        points: 150,
        tier: "Silver",
        blocked: false,
      },
    ],

    rewards: [
      {
        id: 1,
        name: "₦5 Off",
        cost: 500,
      },
      {
        id: 2,
        name: "VIP Access",
        cost: 2000,
      },
    ],

    payments: [
      {
        id: "PAY-001",
        orderId: 1002,
        method: "paystack",
        amount: 55,
        customer: "Ebere",
      },
    ],

    admins: [
      {
        id: 1,
        name: "Super Admin",
        email: "admin@example.com",
        role: "Super Admin",
      },
    ],
  };
}