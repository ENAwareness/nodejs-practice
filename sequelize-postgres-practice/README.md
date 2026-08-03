# sequelize-postgres-practice

Practicing database modeling, connection, and seeding using Sequelize (ORM) with a PostgreSQL database hosted on Supabase.

## Stack

- **Runtime**: Bun
- **ORM**: Sequelize 6
- **Database**: PostgreSQL (Supabase, via the transaction pooler on port 6543)
- **Driver**: pg / pg-hstore

## Structure

```
src/
├── models/todoModel.js      # Todo model definition (table schema)
├── utils/dbHelper.js        # Sequelize instance (database connection)
└── scripts/
    ├── seed.js              # Seed script: read JSON -> create table -> bulk insert
    └── data/initData.json   # Initial data
```

## Run

```bash
bun install
bun run seed        # Create the table and insert the initial data
```

Create a `.env` file in the project root (not committed — see .gitignore) with your Supabase connection info:

```
DB_HOST=...
DB_PORT=6543
DB_USER=postgres.<project-ref>
DB_PASSWORD=...
DB_NAME=postgres
```

## What I learned

- An ORM (Sequelize) translates between JS objects and SQL tables; under the hood it still uses the `pg` driver.
- `dialect: 'postgres'` decides which SQL dialect is generated.
- In ESM, `export` / `import` must match: if a file defines something but does not export it, other files cannot use it.
- `readFile` returns a string; you need `JSON.parse` to get a usable array.
- `sync({ force: true })` drops and recreates the table (wiping data); plain `sync()` only creates it if it does not exist.
