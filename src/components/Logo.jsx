import React from 'react';
// Importez directement le logo SVG
import logoSVG from '../assets/logo.svg';

const Logo = ({ size = 'medium', className = '' }) => {
  // Définir les tailles en fonction du paramètre
  const sizes = {
    small: { width: '30px', height: 'auto' },
    medium: { width: '150px', height: 'auto' },
    large: { width: '440px', height: 'auto' },
    hero: { width: '200px', height: 'auto' }
  };
  
  const sizeStyle = sizes[size] || sizes.medium;
  
  return (
    <div className={`logo ${className}`} style={{ display: 'flex', alignItems: 'center' }}>
      <img 
        src={logoSVG} 
        alt="Root:_" 
        style={{ 
          ...sizeStyle,
          filter: 'drop-shadow(0 0 5px rgba(0, 188, 212, 0.4))'
        }} 
      />
    </div>
  );
};

export default Logo;