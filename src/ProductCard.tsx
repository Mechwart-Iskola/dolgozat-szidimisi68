import { Product } from "./types/Product";

type ProductCardProps = {
  product: Product;
}

const ProductCard:React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-info">
      <img className="product-image" src={product.image} alt={product.name} />
      <div className="product-details">
        <p className="data">ID: {product.id}</p>
        <p className="data">Name: {product.name}</p>
        <p className="data">Price: {product.price}$</p>
        <p className="data">Category: {product.category}</p>
      </div>
    </div>
  );
};

export default ProductCard;