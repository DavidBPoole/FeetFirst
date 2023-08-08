import { Accordion, Button, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';

export default function AccordionRow({ favoriteProduct, onUpdate, keyNumber }) {
  const { user } = useAuth();
  const removeFavorite = () => {
    if (window.confirm(`Delete ${favoriteProduct.product.title}?`)) {
      removeFavorite(favoriteProduct.id, user.uid).then(() => onUpdate());
    }
  };

  return (
    <Accordion.Item eventKey={keyNumber}>
      <Accordion.Header className="favoritesCardContainer">
        <Image className="favoritePic" src={favoriteProduct.product.image_url} />
        <div className="favoritesCardHeader">{favoriteProduct.product.title}</div>
        <div className="favPriceContainer">
          <div className="favoritesCardPrice">${favoriteProduct.product.price}</div>
        </div>
      </Accordion.Header>
      <Accordion.Body>
        <p>
          {favoriteProduct.product.description}
        </p>
        <div className="favBtnContainer">
          <Button className="favBtn" variant="dark" onClick={removeFavorite}>Remove Favorite</Button>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
}

AccordionRow.propTypes = {
  favoriteProduct: PropTypes.shape({
    user: PropTypes.number,
    product: PropTypes.number,
    id: PropTypes.number,
    price: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  keyNumber: PropTypes.number.isRequired,
};
