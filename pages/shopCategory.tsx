import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import a from 'next/link';
import Link from 'next/link';
import { useState } from 'react';
import { getProducts } from '../database/connect';

const bodyStyles = css`
  margin: 20px 60px;
`;
const headerStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const inputStyles = css`
  border: 1px solid black;
  background-color: white;
  width: 300px;
  padding: 5px;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 5px;
`;

const products = css``;
const gridContainer = css`
  /* display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); */
  display: flex;
  flex-wrap: wrap;
`;
const productStyles = css`
  border: 1px solid lightgray;
  border-radius: 20px;
  padding: 10px;
  margin: 10px;
  /* flex: 2 1 auto; */
`;
const productImage = css``;
const productInfo = css`
  text-align: center;
`;
export default function NewArrival(props) {
  const [product, setProduct] = useState('');
  const [productName, setProductName] = useState('');
  return (
    <>
      <Head>
        <title>All of the products</title>
        <meta name="description" content="List page of all products" />
      </Head>
      <div css={bodyStyles}>
        <div css={headerStyles}>
          <h1>Yo, what´s up</h1>
          <h1>{productName}</h1>
          <input
            css={inputStyles}
            value={productName}
            placeholder="Search Product"
            onChange={(event) => {
              setProductName(event.target.value);

              /*  const chosenProduct = products(event.target.value)?.product;
              if (chosenProduct) {
                setProduct(chosenProduct);
              } */
            }}
          />
        </div>
        <div css={products}>
          <div css={gridContainer}>
            {props.products.map((product) => {
              return (
                <div key={`product-${product.id}`} css={productStyles}>
                  <div /* className={productImage} */>
                    <Link href={`/${product.id}`}>
                      <Image
                        src={`/${product.id}-${product.name.toLowerCase()}.jpg`}
                        /* src="/1-greenstringer.jpg" */
                        css={productImage}
                        alt=""
                        width="300"
                        height="300"
                      />
                    </Link>
                  </div>
                  <div css={productInfo}>
                    <h2>{product.name}</h2>
                    <div
                      css={css`
                        color: red;
                      `}
                    >
                      {product.price}
                    </div>
                    <div>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2">
                        Button
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export function SearchBar(props) {
  const [searchInput, setSearchInput] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  if (searchInput.length > 0) {
    props.products.find((product) => {
      return product.name.match(searchInput);
    });
  }

  return (
    <>
      <input
        type="text"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput}
      />
      <div css={gridContainer}>
        {props.products.map((product) => {
          return (
            <div key={`product-${product.id}`} css={productStyles}>
              <div /* className={productImage} */>
                <Image
                  src={`/${product.id}-${product.name.toLowerCase()}.jpg`}
                  /* src="/1-greenstringer.jpg" */
                  css={productImage}
                  alt=""
                  width="300"
                  height="300"
                />
              </div>
              <div css={productInfo}>
                <h2>{product.name}</h2>
                <div
                  css={css`
                    color: red;
                  `}
                >
                  {product.price}
                </div>
                <div>{product.description}</div>
                <div>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2">
                    Button
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
export async function getServerSideProps() {
  const products = await getProducts();
  return {
    props: {
      products: products,
    },
  };
}
