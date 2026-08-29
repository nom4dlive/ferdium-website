import styles from "styles/components/Loader.module.scss";

// source: https://loading.io/css/
interface LoaderProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const Loader = ({ className = '', size = 'medium', color }: LoaderProps) => {
  const sizeClass = styles[`lds-ring-${size}`] || '';
  const inlineStyle = color ? { '--loader-color': color } as React.CSSProperties : {};
  
  return (
    <div 
      className={`${styles['lds-ring']} ${sizeClass} ${className}`} 
      role="status"
      aria-label="Loading"
      style={inlineStyle}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
