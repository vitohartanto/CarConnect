import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Blurhash } from 'react-blurhash';

function ImageBackground({ src, hash }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = src;
  }, [src]);

  return (
    <>
      <div style={{ display: imageLoaded ? 'none' : 'inline' }}>
        <Blurhash hash={hash} height="100vh" width="100vw" />
      </div>
      <img
        src={src}
        alt="Background"
        className="w-screen h-screen fixed z-[-100]"
        style={{ display: !imageLoaded ? 'none' : 'inline' }}
      />
    </>
  );
}

ImageBackground.propTypes = {
  src: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
};

export default ImageBackground;
