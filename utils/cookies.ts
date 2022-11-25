import cookie from 'cookie';

export function createSerializedRegisterSessionTokenCookie(token: string) {
  // check if we are in production e.g Fly.io
  const isProduction = process.env.NODE_ENV === 'production'; // NODE_ENV sets a environmental variable

  const maxAge = 60 * 60 * 24; // 24 hours in seconds. That´s the timestamp for the cookies in the browser

  return cookie.serialize('sessionToken', token, {
    //new browsers
    maxAge: maxAge,
    // for internet explorer and old browsers
    expires: new Date(
      // Without the following code the cookies in the internet explorer will never expire
      Date.now() + // current date in milliseconds
        maxAge * 1000, // 24 hours in milliseconds
    ),
    httpOnly: true,
    secure: isProduction,
    path: '/',
    // Be explicit about new default behavior
    // in browsers
    // https://web.dev/samesite-cookies-explained/
    sameSite: 'lax',
  });
}
