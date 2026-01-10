import { useState, useEffect } from 'react';
import 'animate.css';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

function Header() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
      // Scrolling down
      setShowNavbar(false);
    } else {
      // Scrolling up
      setShowNavbar(true);
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className={`w-full flex justify-center items-center transition-all duration-300`}>
      {showNavbar ? (<div className='flex justify-center items-center mt-6 bg-gray-700/50 rounded-full w-fit p-4 px-10 backdrop-blur-md shadow-2xl'>
        <NavLink
          to="/aidoctor"
          className={({ isActive }) => (isActive ? 'logo-active mr-8' : 'mr-8 text-white')}
        >
          <h1 className='text-xl font-bold animate__animated animate__fadeInDown hover:text-2xl transition-all'>RespireNet</h1>
        </NavLink>
        <h1 className='text-3xl font-bold text-red-500'>//</h1>
        <div className='animate__animated animate__fadeInDown flex font-semibold ml-8'>
          <NavLink
            to="/predict"
            className={({ isActive }) => (isActive ? 'underline font-bold text-lg' : '')}
          >
            <motion.button
              className="py-2 mr-10 text-white"
              whileHover={{
                scale: 1.2,
                borderBottom: '2px solid red',
                transition: {
                  duration: 0.5,
                  type: 'spring',
                },
              }}
              whileTap={{
                scale: 0.9,
                transition: {
                  duration: 0.2,
                },
              }}
            >
              Predict Disease
            </motion.button>
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) => `${isActive ? 'underline font-bold text-lg' : ''}`}
          >
            <motion.button
              className="py-2 text-white"
              whileHover={{
                scale: 1.2,
                borderBottom: '2px solid red',
                transition: {
                  duration: 0.5,
                  type: 'spring',
                },
              }}
              whileTap={{
                scale: 0.95,
                transition: {
                  duration: 0.2,
                },
              }}
            >
              About Us
            </motion.button>
          </NavLink>
        </div>
      </div>) : (
          <div className='flex justify-center items-center mt-6 bg-gray-700/50 rounded-full w-fit py-3 px-10 backdrop-blur-md shadow-2xl'>
            <h1 className='text-3xl font-bold text-red-500'>//</h1>
        </div>
      )}
    </div>
  );
}

export default Header;
