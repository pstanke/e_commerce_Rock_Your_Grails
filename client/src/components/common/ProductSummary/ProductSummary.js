import { truncateString } from '../../../utils/truncateString';
import { Link } from 'react-router-dom';

export const ProductSummary = ({ product }) => {
  const rightPhotoUrls = product.photos
    .filter((photo) => photo.type === 'RIGHT')
    .map((photo) => photo.url);

  const truncatedName = truncateString(product.name, 30);
  return (
    <Link to={`products/${product.id}`}>
      <img
        src={process.env.PUBLIC_URL + `/productsImages/${rightPhotoUrls} `}
        alt={product.name}
        style={{ width: '300px' }}
      ></img>
      <h4>{truncatedName}</h4>
      <h6>Price: ${product.price}</h6>
    </Link>
    // <Card
    //   className="m-3"
    //   style={{
    //     boxShadow: '0 0 20px 2px rgba(0, 0, 0, 0.4)',
    //   }}
    // >
    //   <Card.Img
    //     variant="top"
    //     src={process.env.PUBLIC_URL + `/productsImages/${mainPhotoUrls} `}
    //     style={{ width: '00px' }}
    //   />
    //   <Card.Body
    //     style={{
    //       height: '100px',
    //     }}
    //   >
    //     <Card.Title>{product.name}</Card.Title>
    //     <Card.Text>Price: ${product.price}</Card.Text>
    //   </Card.Body>
    // </Card>
  );
};
