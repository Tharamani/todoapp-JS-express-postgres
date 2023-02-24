const dropSchema = 'DROP SCHEMA todoschema CASCADE;'
const createSchema = 'CREATE SCHEMA todoschema;'

const dropTable = 'DROP TABLE todoschema.todo;'
const craeteTodoTable = `CREATE TABLE todoschema.todo (
    todo_id serial PRIMARY KEY NOT NULL,
    title VARCHAR,
     notes TEXT,
    due_date VARCHAR,
    priority VARCHAR,
    is_checked BOOLEAN DEFAULT 'false'
);`
