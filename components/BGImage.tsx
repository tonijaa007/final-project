import { css } from '@emotion/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import heroImage from '../public/heroImage.jpg';

const Box = css`
  position: fixed;
  z-index: 0;
  top: 0;
`;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function BGImage() {
  const [width, setWidth] = useState<number>();
  const [height, setheight] = useState<number>();

  useEffect(() => {
    const { width, height } = getWindowDimensions();

    setWidth(width);

    setheight(height);
  }, []);

  useEffect(() => {
    function handleResize() {
      const { width, height } = getWindowDimensions();

      setWidth(width);

      setheight(height);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (width && height) {
    return (
      <Box>
        <Image src={heroImage} alt="" width={width} height={height} />
      </Box>
    );
  }

  return null;
}

export default BGImage;
