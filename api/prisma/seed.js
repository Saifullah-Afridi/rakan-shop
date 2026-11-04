import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// The six Rakan categories. Run with: npm run db:seed (safe to run again).
const categories = [
  { id: "vegetables", name: "Vegetables", description: "Daily harvest from Houran plains and Jordan Valley", icon: "Carrot", color: "#6f7d1f", tint: "#d9ecd9" },
  { id: "fruits", name: "Fruits", description: "Seasonal orchard fruit from Ajloun and Irbid groves", icon: "Apple", color: "#157a66", tint: "#f6dfd3" },
  { id: "meats", name: "Meats", description: "Baladi Naemi lamb, fresh veal, and farm-chilled poultry", icon: "Beef", color: "#7f1717", tint: "#f2d6da" },
  { id: "dairy-cheeses", name: "Dairy & Cheeses", description: "Nabulsi cheese, Jerash labneh, Karak jameed, fresh milk", icon: "Milk", color: "#6b1f6e", tint: "#d8e6f2" },
  { id: "fresh-juices", name: "Fresh Juices", description: "100% cold-pressed daily, zero added sugar", icon: "CupSoda", color: "#10337a", tint: "#f7e6c4" },
  { id: "supermarket", name: "Supermarket", description: "Kafarat olive oil, aged basmati rice, grains, pantry", icon: "Wheat", color: "#6b3d10", tint: "#e6e2cf" },
];

for (const category of categories) {
  await prisma.category.upsert({ where: { id: category.id }, update: {}, create: category });
}
console.log(`Seeded ${categories.length} categories.`);
await prisma.$disconnect();
