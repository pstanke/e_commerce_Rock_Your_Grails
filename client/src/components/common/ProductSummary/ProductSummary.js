import { truncateString } from '../../../utils/truncateString';
import { Link } from 'react-router-dom';
import styles from './ProductSummary.module.scss';
export const ProductSummary = ({ product }) => {
  const rightPhotoUrls = product.photos
    .filter((photo) => photo.type === 'RIGHT')
    .map((photo) => photo.url);

  const truncatedName = truncateString(product.name, 30);
  return (
    <Link to={`/products/${product.id}`} className={styles.link}>
      <img
        src={process.env.PUBLIC_URL + `/productsImages/${rightPhotoUrls} `}
        alt={product.name}
        style={{ width: '300px' }}
      ></img>
      <h4>{truncatedName}</h4>
      <h6>
        Price: <strong>{product.price}$</strong>
      </h6>
    </Link>
  );
};
