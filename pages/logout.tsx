import cookie from 'cookie';
import { GetServerSidePropsContext } from 'next';
import { deleteSessionByToken } from '../database/sessions';

export default function Logout() {
  return null;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken; // is the name of the cookie, web browser

  console.log(token);
  if (token) {
    await deleteSessionByToken(token); // deletes session in the database

    // deletes the whole cookie in the browser
    context.res.setHeader(
      'Set-Cookie',
      // transform the cookie (sessionToken) to an empty string ''
      cookie.serialize('sessionToken', '', {
        // with maxAge -1 it´s gonna get deleted
        maxAge: -1,
        path: '/',
      }),
    );
  }

  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
}
