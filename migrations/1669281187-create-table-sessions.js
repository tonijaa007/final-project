exports.up = async (client) => {};

exports.down = async (client) => {};
exports.up = async (sql) => {
  await sql`
    CREATE TABLE sessions (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      token varchar(110) NOT NULL UNIQUE,
      expiry_timestamp timestamp NOT NULL DEFAULT NOW() + INTERVAL '24 hours',
      user_id integer REFERENCES users (id) ON DELETE CASCADE
     /*  ON DELETE CASCADE makes it possible to delete user also when they are referenced somewhere else. Otherwise postgres will not allow it because of reference (Verbindung) */
    )
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE sessions
  `;
};
