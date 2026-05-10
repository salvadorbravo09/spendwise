const { neon } = require("@neondatabase/serverless");
const crypto = require("node:crypto");

const databaseUrl =
  "postgresql://neondb_owner:npg_BuFP4GNxt1Vi@ep-snowy-cell-ap7mfq5j-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const sql = neon(databaseUrl);

const expenseItems = [
  {
    title: "Lunch at cafe",
    category: "Food",
    amount: 250,
    expense_date: "04-13-2026",
  },
  {
    title: "Grocery shopping",
    category: "Food",
    amount: 500,
    expense_date: "04-14-2026",
  },
];

async function seed() {
  await sql`
    CREATE TABLE IF NOT EXISTS expense_transaction (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      amount INTEGER NOT NULL,
      expense_date TEXT NOT NULL,
      created_at BIGINT NOT NULL
    )
  `;

  for (const item of expenseItems) {
    await sql`
      INSERT INTO expense_transaction(id, title, category, amount, expense_date, created_at)
      VALUES(
        ${crypto.randomUUID()},
        ${item.title},
        ${item.category},
        ${item.amount},
        ${item.expense_date},
        ${Date.now()}
      )
    `;
  }

  console.log(`Seed complete inserted ${expenseItems.length} items.`);
}

seed().catch((error) => {
  console.log("Seed failed", error);
  process.exit(1);
});
