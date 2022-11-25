import { Children } from 'react';
import Footer from './Footer';
import Header from './Header';

export default function Layout(props) {
  return (
    <>
      <Header user={props.user} />
      {props.children}
      <Footer />
    </>
  );
}
