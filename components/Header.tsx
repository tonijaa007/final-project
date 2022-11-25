import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Ashura from '../pages/logo/Arogun-01.png';
import Search from '../pages/logo/search.png';

const rightSection = css``;
const leftSection = css`
  display: flex;
  align-items: center;
  flex: 1;

  @media (max-width: 800px) {
    .flex-container {
      flex-direction: column;
    }
  }
`;
const middleSection = css`
  display: flex;
`;
const inputStyle = css`
  width: 210px;
`;
const searchStyle = css`
  border: 2px solid white;
  background-color: white;
`;
const unOrderedStyles = css`
  display: flex;
  flex-direction: row;
  list-style: none;
  align-items: center;
`;
const listStyles = css`
  font-size: 16px;
  padding: 5px 20px;

  a {
    margin: 0 10px;
    text-decoration: none;
    color: black;
    text-transform: uppercase;
  }

  a.active,
  a:hover {
    background-color: yellow;
    transition: 0.5s;
  }
`;

const headerStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: lightgray;
  padding: 20px 60px;
  margin: 0;
`;
const unorderedStyles2 = css`
  display: flex;
  align-items: center;
  list-style: none;
`;
export default function Header(props) {
  return (
    <>
      <Head>
        <title>Header</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header css={headerStyles}>
        <div css={leftSection}>
          <a href="./">
            <Image
              className="logo"
              src={Ashura}
              alt="logo"
              width={40}
              priority
            />
          </a>
          <nav css={leftSection}>
            <ul css={unOrderedStyles}>
              {/* <li css={listStyles}>
                <a href="arrival">NEW ARRIVAL</a>
              </li> */}
              <li css={listStyles}>
                <a href="shopCategory"> SHOP</a>
              </li>
              <li css={listStyles}>
                <Link href="private-profile">Private-Profile</Link>
              </li>
              {/* <li css={listStyles}>
                <a href="women">WOMEN</a>
              </li> */}
              {/* <li css={listStyles}>
                <a href="children">CHILDREN</a>
              </li> */}
            </ul>
          </nav>
        </div>
        {/* <form css={middleSection}>
          <input css={inputStyle} placeholder="Search" />
          <button css={searchStyle}>
            <Image src={Search} alt="search icon" width={30} height={25} />
          </button>
        </form> */}
        <nav css={rightSection}>
          <ul css={unorderedStyles2}>
            {props.user && props.user.username}
            {props.user ? (
              <li css={listStyles}>
                {/* the slash / needs to be removed when using a tags otherwise it will force you to use Link */}
                <a
                  /* css={css`
                    margin-right: 20px;
                  `} */
                  href="logout"
                >
                  Logout
                </a>
              </li>
            ) : (
              <>
                <li css={listStyles}>
                  <Link href="/register">Register</Link>
                </li>
                <li css={listStyles}>
                  <Link href="/login">Login</Link>
                </li>
              </>
            )}

            <li css={listStyles}>
              <a href="children">🛍️</a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
