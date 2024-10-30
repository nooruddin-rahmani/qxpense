import { query } from "./db";
import fs from "fs";
import path from "path";

export async function initializeDatabase() {
  try {
    const sqlScript = fs.readFileSync(
      path.join(process.cwd(), "scripts", "init-db.sql"),
      "utf8"
    );
    const statements = sqlScript
      .split(";")
      .filter((statement) => statement.trim() !== "");

    for (const statement of statements) {
      await query(statement, []);
    }

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}