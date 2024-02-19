import "dotenv/config";
import { type Config } from "drizzle-kit";

const { DATABASE_URL, DATABASE_AUTH_TOKEN } = process.env;

if (!DATABASE_URL || !DATABASE_AUTH_TOKEN) {
	throw new Error(
		"DATABASE_URL and DATABASE_AUTH_TOKEN must be defined in the environment",
	);
}

export default {
	schema: "./src/lib/server/db/schema.ts",
	driver: "turso",
	dbCredentials: {
		url: DATABASE_URL,
		authToken: DATABASE_AUTH_TOKEN,
	},
} satisfies Config;
