import { Container } from 'react-bootstrap';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import banner from './BannerGetHipnotised.png';
import styles from './Banner.module.scss';

export const Banner = ({ products }) => {
  const containerRef = useRef(null);

  const images = products.flatMap((product) =>
    product.photos
      .filter((photo) => photo.type === 'MAIN')
      .map((photo) => photo.url),
  );

  const [imagePositions, setImagePositions] = useState(
    images.map(() => ({
      x: 0,
      y: 0,
      xDirection: Math.random() > 0.5 ? 1 : -1,
      yDirection: Math.random() > 0.5 ? 1 : -1,
      xSpeed: Math.random() * 3,
      ySpeed: Math.random() * 3,
    })),
  );

  useEffect(() => {
    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = containerRef.current.offsetHeight;

    setImagePositions((positions) =>
      positions.map(() => ({
        x: Math.random() * (containerWidth - containerWidth / 7), // Adjust the image width to be 1/7th of the container width
        y: Math.random() * (containerHeight - containerHeight / 7), // Adjust the image height to be 1/7th of the container height
        xDirection: Math.random() > 0.5 ? 1 : -1,
        yDirection: Math.random() > 0.5 ? 1 : -1,
        xSpeed: Math.random(),
        ySpeed: Math.random(),
      })),
    );
  }, [containerRef]);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setImagePositions((positions) => {
        return positions.map((position) => {
          const newX =
            position.x +
            position.xDirection * (Math.random() * 2 + position.xSpeed);
          const newY =
            position.y +
            position.yDirection * (Math.random() * 2 + position.ySpeed);

          const containerWidth = containerRef.current.offsetWidth;
          const containerHeight = containerRef.current.offsetHeight;

          // Reverse direction if image hits left or right edge
          if (newX < 0 || newX > containerWidth - containerWidth / 7) {
            position.xDirection = -position.xDirection;
          }

          // Reverse direction if image hits top or bottom edge
          if (newY < 0 || newY > containerHeight - containerHeight / 7) {
            position.yDirection = -position.yDirection;
          }

          return { ...position, x: newX, y: newY };
        });
      });
    }, 10);

    return () => {
      clearInterval(imageInterval);
    };
  }, [containerRef]);

  return (
    <Container className={styles.container} ref={containerRef}>
      <Link to={'/products'}>
        <div className={styles.link}>
          <img src={banner} alt="GetHipnotised" className="img-fluid" />
        </div>

        <div className={styles.imagesContainer}>
          {images.map((image, index) => (
            <img
              key={index}
              src={process.env.PUBLIC_URL + `/productsImages/${image}`}
              alt={`${index}`}
              style={{
                position: 'absolute',
                top: imagePositions[index].y,
                left: imagePositions[index].x,
                width: '16%',
              }}
            />
          ))}
        </div>
      </Link>
    </Container>
  );
};

Banner.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      photos: PropTypes.arrayOf(
        PropTypes.shape({
          type: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        }),
      ).isRequired,
    }),
  ).isRequired,
};
