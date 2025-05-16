import { Knex } from "knex";

const db: Knex = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "password",
    database: "postgres",
  },
});
export interface GetPostgresTablesParam {
  tables: { tablename: string }[];
}
export async function GetPostgresTables(): Promise<GetPostgresTablesParam> {
  const data = await db("pg_catalog.pg_tables")
    .select("tablename")
    .whereNotIn("schemaname", ["pg_catalog", "information_schema"])
    .orderBy(["schemaname", "tablename"]);
  return { tables: data };
}

export async function ShowPostgresTablesContent(
  tableName: string,
  limit: number
) {
  const result = await db(tableName).select("*").limit(limit);
  return result;
}
