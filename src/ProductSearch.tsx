import React, { useEffect, useState } from 'react';
import { Product } from './types/Product';
import ProductCard from './ProductCard';

const ProductSearch: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product | undefined>();
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/products.json')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched data:', data);
        if (data.products && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.error('Unexpected data format:', data);
          setProducts([]);
        }
      })
      .catch((err) => console.error('Error loading:', err));
  }, []);

  const handleSearch = () => {
    const result = products.find((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (result) {
      setFilteredProducts(result);
      setError('');
    } else {
      setFilteredProducts(undefined);
      setError('No product found with the given name.');
    }
  };

  return (
    <div className='product-card'>
      <label>Enter Product Name:</label>
      <div className='search-section'>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p className='error'>{error}</p>}
      <div>
        {filteredProducts ? (
          <ProductCard key={filteredProducts.id} product={filteredProducts} />
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;
