import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import banner from './BannerGetHipnotised.png';
import styles from './Banner.module.scss';
import { Link } from 'react-router-dom';
export const Banner = ({ products }) => {
  const images = products.flatMap((product) =>
    product.photos
      .filter((photo) => photo.type === 'MAIN')
      .map((photo) => photo.url),
  );

  const [imagePositions, setImagePositions] = useState(
    images.map(() => ({
      x: (Math.random() * window.innerWidth) / 2,
      y: (Math.random() * window.innerHeight) / 2,
      xDirection: Math.random() > 0.5 ? 1 : -1,
      yDirection: Math.random() > 0.5 ? 1 : -1,
    })),
  );

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setImagePositions((positions) => {
        return positions.map((position) => {
          const newX = position.x + position.xDirection * Math.random() * 2;
          const newY = position.y + position.yDirection * Math.random() * 2;

          // Reverse direction if image hits left or right edge
          if (newX < 0 || newX > window.innerWidth / 2) {
            position.xDirection = -position.xDirection;
          }

          // Reverse direction if image hits top or bottom edge
          if (newY < 0 || newY > window.innerHeight / 2) {
            position.yDirection = -position.yDirection;
          }

          return { ...position, x: newX, y: newY };
        });
      });
    }, 10);

    return () => {
      clearInterval(imageInterval);
    };
  }, []);

  return (
    <Container
      style={{
        position: 'relative',
      }}
    >
      <Link to={'/products'}>
        <div className={styles.link}>
          <img src={banner} alt="GetHipnotised" className="img-fluid" />
        </div>

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={process.env.PUBLIC_URL + `/productsImages/${image} `}
              alt={`${index}`}
              style={{
                position: 'absolute',
                top: imagePositions[index].y,
                left: imagePositions[index].x,
                width: '15%',
              }}
            />
          ))}
        </div>
      </Link>
    </Container>
  );
};
