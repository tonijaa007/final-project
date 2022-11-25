// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { createSession } from '../../database/sessions';
import { createUser, getUserByUsername } from '../../database/users';
import { createSerializedRegisterSessionTokenCookie } from '../../utils/cookies';

export type RegisterResponseBody =
  | { errors: { message: string }[] }
  | { user: { username: string } };

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<RegisterResponseBody>,
) {
  if (request.method === 'POST') {
    // 1.	Make sure the data exists
    if (
      typeof request.body.username !== 'string' ||
      typeof request.body.password !== 'string' ||
      // the typeof is making sure that someone is not able to break our application with sending numbers through postman or something similar
      !request.body.username ||
      !request.body.password
    ) {
      // if data doesn´t exist
      return response
        .status(400)
        .json({ errors: [{ message: 'username or password not provided' }] });
    }
    // 2.	We check if the user already exist
    const user = await getUserByUsername(request.body.username);

    if (user) {
      return response
        .status(401)
        .json({ errors: [{ message: 'username is already taken' }] });
    }
    // 3..	We hash the password
    const passwordHash = await bcrypt.hash(request.body.password, 12);

    // 4..	Sql query to create the record (CREATE TABLE)
    const userWithoutPassword = await createUser(
      request.body.username,
      passwordHash,
    );

    // 4.Create a session token and serialize a cookie with the token
    const session = await createSession(
      userWithoutPassword.id,
      crypto.randomBytes(80).toString('base64'),
    );

    const serializedCookie = createSerializedRegisterSessionTokenCookie(
      session.token,
    );

    // This is the response for any method on this endpoint
    response
      .status(200)
      .setHeader('Set-Cookie', serializedCookie)
      .json({ user: { username: userWithoutPassword.username } });
  } else {
    response.status(401).json({ errors: [{ message: 'Method not allowed' }] });
  }
}
