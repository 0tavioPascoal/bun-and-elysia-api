import postgres from "postgres";
import { env } from "../env";
import * as schema from '../db/schema/index'
import { drizzle } from "drizzle-orm/postgres-js";

const conn = postgres(env.DATABASE_URL)

export const db = drizzle(conn, {schema: schema})
