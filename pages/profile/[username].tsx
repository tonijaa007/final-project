import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { getUserByUsername, User } from '../../database/users';

type Props = {
  user?: User; // User is from the database
};
export default function UserProfile(props: Props) {
  if (!props.user) {
    return (
      <>
        <Head>
          <title>Personal Information</title>
          <meta name="description" content="Biography of the person" />
        </Head>
        <h1>404 - User not found</h1>
        Better luck next time
      </>
    );
  }
  return (
    <>
      <Head>
        <title>Personal Information</title>
        <meta name="description" content="Biography of the person" />
      </Head>
      <h1>Personal Information</h1>
      id: {props.user.id} username: {props.user.username}
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Retrieve the username from the URL
  const username = context.query.username as string; // context.query.username is from the filename [username.ts]

  const user = await getUserByUsername(username.toLowerCase());

  if (!user) {
    context.res.statusCode = 404;
    return {
      props: {},
    };
  }

  return {
    props: { user },
  };
}
