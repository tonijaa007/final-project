// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import crypto, { randomBytes } from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { createSession } from '../../database/sessions';
import { getUserWithPasswordHashByUsername } from '../../database/users';
import { createSerializedRegisterSessionTokenCookie } from '../../utils/cookies';

export type LoginResponseBody =
  | { errors: { message: string }[] }
  | { user: { username: string } };

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<LoginResponseBody>,
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
    // 2.	Get the user by the username
    const user = await getUserWithPasswordHashByUsername(request.body.username);

    if (!user) {
      return response
        .status(401)
        .json({ errors: [{ message: 'user not found' }] });
    }
    // 3. Check if the hash and the password match
    const isValidPassword = await bcrypt.compare(
      request.body.password,
      user.passwordHash,
    );
    if (!isValidPassword) {
      return response
        .status(401)
        .json({ errors: [{ message: 'password is not valid' }] });
    }

    // 4. Create a session token and serialize a coolie with the token
    const session = await createSession(
      user.id,
      crypto.randomBytes(80).toString('base64'),
    );

    const serializedCookie = createSerializedRegisterSessionTokenCookie(
      session.token,
    );

    // This is the response for any method on this endpoint
    response
      .status(200)
      .setHeader('Set-Cookie', serializedCookie)
      .json({ user: { username: user.username } });
  } else {
    response.status(401).json({ errors: [{ message: 'Method not allowed' }] });
  }
}
