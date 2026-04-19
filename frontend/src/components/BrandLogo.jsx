const BrandLogo = ({ className = '', alt = 'GoatReady Mutton logo', src = '/favicon.svg' }) => {
  return <img src={src} alt={alt} className={className} />;
};

export default BrandLogo;
