import { sql } from './connect';

export type User = {
  id: number;
  username: string;
  passwordHash: string;
};

// A function where we are passing a string that is going to check if the username exists or not. It is returning either the user or undefined.
export async function getUserByUsername(username: string) {
  if (!username) return undefined; // If username is empty return undefined

  const [user] = await sql<{ id: number; username: string }[]>`
  SELECT
    id,
    username
  FROM
    users
  WHERE
    users.username = ${username}
  `;

  return user;
}

// this function is for saving the password_hash in a specific place (safety reasons)
export async function getUserWithPasswordHashByUsername(username: string) {
  if (!username) return undefined; // If username is empty return undefined

  const [user] = await sql<User[]>`
  SELECT
    *
  FROM
    users
  WHERE
    users.username = ${username}
  `;

  return user;
}

// Retrieves user based on token
export async function getUserBySessionToken(token: string) {
  if (!token) return undefined;

  const [user] = await sql<{ id: number; username: string }[]>`
    SELECT
      users.id,
      users.username
    FROM
      users,
      sessions
    /* INNER JOIN
      sessions ON ( */
    WHERE
        sessions.token = ${token} AND
        sessions.user_id = users.id AND
        sessions.expiry_timestamp > now()
      /* ) */
  `;

  return user;
}

// return user created ??!
export async function createUser(username: string, password_hash: string) {
  const [userWithoutPassword] = await sql<{ id: number; username: string }[]>`
  INSERT INTO users
    (username, password_hash)
  VALUES
    (${username}, ${password_hash})
  RETURNING
    id,
    username
  `;
  return userWithoutPassword!;
}
