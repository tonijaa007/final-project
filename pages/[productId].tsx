import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import { getProductById, getProducts } from '../database/connect';

const productStyles = css`
  text-align: center;
  font-size: 20px;
`;
const containerStyle = css`
  display: flex;
  margin: 10px;
  justify-content: space-evenly;
  align-items: center;
`;
const imageStyle = css`
  border: 1px solid lightgray;
  border-radius: 20px;
  padding: 10px;

  /* flex: 2 1 auto; */
`;
const productInformation = css`
  display: inline;
`;
const headerStyles = css``;
const textStyle = css`
  line-height: 1.5;
`;
const priceStyle = css`
  margin-top: 10px;
`;

export default function Product(props) {
  return (
    <>
      <div css={productStyles}>
        <Head>
          <title>
            {props.product.name}, the {props.product.price}
          </title>
          <meta
            name="description"
            content={`${props.product.name} costs ${props.product.price} `}
          />
        </Head>
        <div css={containerStyle}>
          <div css={imageStyle}>
            <Image
              src={`/${
                props.product.id
              }-${props.product.name.toLowerCase()}.jpg`}
              alt=""
              width="400"
              height="400"
              css={css`
                max-width: 100%;
              `}
            />
          </div>
          <div css={productInformation}>
            <div
              css={css`
                margin-bottom: 30px;
              `}
            >
              <h1>{props.product.name}</h1>
            </div>
            <div
              css={css`
                width: 500px;
                font-size: 18px;
              `}
            >
              {props.product.description}
            </div>
            <div css={priceStyle}>
              <div>Price: {props.product.price}</div>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2">
              Buy
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  // Retrieve the animal ID from the URL
  const productId = parseInt(context.query.productId);

  // Finding the animal
  //
  // Note: This is not the most efficient way
  // of finding the single animal, because it
  // will run every time. Using a database
  // like PostgreSQL will allow you to do this
  // in a nicer way.
  // const foundAnimal = animals.find((animal) => {
  //   return animal.id === animalId;
  // });
  const foundProduct = await getProductById(productId);

  if (typeof foundProduct === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Product not found',
      },
    };
  }

  return {
    props: {
      product: foundProduct,
    },
  };
}
