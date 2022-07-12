import { Row, Col } from 'react-bootstrap';

import { Product } from '../components';

import products from '../data/products.json';

type ProductProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

const Store = () => {
  return (
    <>
      <h1>Store</h1>
      <Row lg={3} md={2} sm={1} className="g-3">
        {products.map((props: ProductProps) => (
          <Col key={props.id}>
            <Product {...props} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Store;
