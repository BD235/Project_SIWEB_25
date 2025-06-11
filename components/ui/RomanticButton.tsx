'use client'; // Menambahkan 'use client' untuk memastikan komponen hanya di-render di klien

import { ReactNode, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaArrowRight, FaShoppingCart } from 'react-icons/fa';

interface RomanticButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: 'heart' | 'arrow' | 'cart' | 'none';
  animate?: 'pulse' | 'heartbeat' | 'float' | 'none';
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean; // Add the disabled prop here
}

export default function RomanticButton({
  children,
  variant = 'primary',
  size = 'md',
  icon = 'heart',
  animate = 'heartbeat',
  fullWidth = false,
  className = '',
  onClick,
  type = 'button',
  disabled = false, // Add disabled to the destructured props and set a default value
}: RomanticButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isClient, setIsClient] = useState(false); // State untuk memastikan komponen hanya dirender di klien

  // useEffect to ensure we only run on the client side
  useEffect(() => {
    setIsClient(true); // This ensures the component is rendered on the client side only
  }, []);

  if (!isClient) {
    return null; // Prevent rendering during SSR
  }

  const variants = {
    primary: 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-200',
    secondary: 'bg-pink-100 text-rose-700 border border-pink-200',
    outline: 'bg-white text-rose-600 border-2 border-rose-400',
    ghost: 'text-rose-600 hover:bg-rose-50',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const iconComponents = {
    heart: <FaHeart className="mr-2" />,
    arrow: <FaArrowRight className="ml-2" />,
    cart: <FaShoppingCart className="mr-2" />,
    none: null,
  };

  const animationVariants = {
    pulse: {
      hover: { scale: 1.05 },
      tap: { scale: 0.98 },
    },
    heartbeat: {
      hover: { scale: [1, 1.1, 1], transition: { duration: 0.7, repeat: Infinity } },
      tap: { scale: 0.95 },
    },
    float: {
      hover: {
        y: -3,
        transition: {
          y: { duration: 0.3, repeat: Infinity, repeatType: "reverse", ease: "easeOut" }
        }
      },
      tap: { y: 0 }
    },
    none: {
      hover: { scale: 1.01 },
      tap: { scale: 0.99 },
    }
  };

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 1000);
    onClick?.();
  };

  return (
    <motion.button
      initial={false}
      animate={isHovered ? 'hover' : 'rest'}
      whileTap="tap"
      variants={animationVariants[animate]}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      type={type}
      disabled={disabled} // Add the disabled prop to the button
      className={`
        rounded-full font-medium flex items-center justify-center transition-all
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : 'w-auto'}
        ${className}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''} // Add styling for disabled state
      `}
    >
      {/* Left icon */}
      {icon !== 'arrow' && iconComponents[icon]}

      {children}

      {/* Right icon */}
      {icon === 'arrow' && iconComponents[icon]}

      {/* Heart particles animation when clicked */}
      <AnimatePresence>
        {isClicked && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: 0,
                  scale: 1.5,
                  x: Math.random() * 60 - 30,
                  y: Math.random() * -50 - 20,
                }}
                transition={{
                  duration: 1,
                  ease: "easeOut"
                }}
                className="absolute pointer-events-none text-rose-400"
              >
                <FaHeart />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
