import React from 'react';
import ProductCard from '../components/ProductCard';
import { useNavigate, useLocation } from 'react-router-dom';

const Shop = ({ products, isLoading, handleAddToCart, onOpenChat }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('search') || '';

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(query.toLowerCase()) || 
    (p.description && p.description.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="container" style={{ paddingTop: '50px', paddingBottom: '50px', minHeight: '60vh' }}>
      <div className="glass" style={{
        display: 'inline-block',
        padding: '8px 20px',
        borderRadius: '12px',
        marginBottom: '16px',
        background: 'rgba(255,255,255,0.07)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: '1px solid rgba(255,255,255,0.15)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
        width: 'fit-content',
      }}>
        <h1 className="section-title" style={{ margin: 0, fontSize: '20px' }}>
          {query ? `Search Results for "${query}"` : 'Our Shop'}
        </h1>
      </div>

      {filteredProducts.length === 0 ? (
        isLoading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '60px', gap: '14px' }}>
            <div style={{ width: '38px', height: '38px', border: '3px solid rgba(255,255,255,0.1)', borderTop: '3px solid var(--primary)', borderRadius: '50%', animation: 'spin 0.9s linear infinite' }} />
            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '14px' }}>Loading products...</p>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        ) : (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '40px' }}>No products found.</p>
        )
      ) : (
        filteredProducts.map(product => (
          <ProductCard key={product.id || product._id} product={product} onMoreDetailClick={() => navigate(`/product/${product.id || product._id}`)} onAddToCart={handleAddToCart} onOpenChat={onOpenChat} />
        ))
      )}
    </div>
  );
};

export default Shop;
