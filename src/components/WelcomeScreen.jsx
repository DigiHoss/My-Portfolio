import { useState, useEffect } from "react";  // Import React Hooks
import { motion, AnimatePresence } from 'framer-motion';  // Import some Animations from animatiosn library
import AOS from "aos";  // Import animate on scroll library
import "aos/dist/aos.css";

// Import assets
import programming from "../assets/LoadingScreen/programming.svg";
import design from "../assets/LoadingScreen/design.svg";
import github from "../assets/LoadingScreen/Github.svg";
import arrow from "../assets/LoadingScreen/arrow-up.svg"

const WelcomeScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Animation variants
  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 1.1,
      filter: "blur(10px)",
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  // Initialize AOS and handle loading timing
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: false,
    });

    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        onLoadingComplete?.();
      }, 1000);
    }, 4000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-[#2B1C4A]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit="exit"
          variants={containerVariants}
        >
          <div className="relative min-h-screen flex items-center justify-center">
            <div className="w-full max-w-full mx-auto">
              {/* Icons */}
              <motion.div 
                className="flex justify-center gap-3 sm:gap-4 md:gap-8 mb-6 sm:mb-8 md:mb-12"
                variants={childVariants}
              >
                {[programming, design, github].map((iconSrc, index) => (
                  <div key={index} data-aos="fade-down" data-aos-delay={index * 200}>
                    <IconButton iconSrc={iconSrc} />
                  </div>
                ))}
              </motion.div>

                 {/* Welcome Text */}
              <motion.div 
                className="flex justify-center font-Poppins sm:mb-8 md:mb-12"
                variants={childVariants}
              >
                <h1 className="text-3xl sm:text-4xl md:text-6xl  font-bold space-y-2 sm:space-y-4">
                  <div className="mb-2 sm:mb-4">
                    <span data-aos="fade-right" data-aos-delay="200" className="inline-block text-white">
                      Welcome
                    </span>{' '}
                    <span data-aos="fade-right" data-aos-delay="400" className="inline-block px-2 text-white">
                      To
                    </span>{' '}
                    <span data-aos="fade-right" data-aos-delay="600" className="inline-block px-2 text-white">
                      My
                    </span>
                  </div>
                  <div>
                    <span data-aos="fade-up" data-aos-delay="800" className="inline-block px-2 text-gradient-color">
                      Portfolio
                    </span>{' '}
                    <span data-aos="fade-up" data-aos-delay="1000" className="inline-block px-2 text-gradient-color">
                      Website
                    </span>
                  </div>
                </h1>
              </motion.div>
                {/* Arrow-up Icon */}
                <motion.div
                className="flex justify-center"
                variants={childVariants}>
                  <div data-aos="fade-up" data-aos-delay="1000" className="bg-gradient-to-t from-[#432092] to-[#00BFFF] w-[36px] h-[36px] md:w-[42px] md:h-[42px] lg:w-[68px] lg:h-[68px]  rounded-[360%] flex justify-center items-center mt-3">
                    <img src={arrow} alt="arrow-up" className="w-6 h-6 md:w-6.5 md:h-6 lg:w-8 lg:h-8"  />
                  </div>



                </motion.div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Icon button component to use image source
const IconButton = ({ iconSrc }) => (
  <div className="relative group  hover:scale-110 transition-transform duration-300">
    <div className="absolute -inset-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-300" />
    <div className="relative p-2 sm:p-3 bg-black/50 backdrop-blur-sm rounded-full border border-white/10">
      <img 
        src={iconSrc} 
        alt="icon" 
        className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" 
      />
    </div>
  </div>
);

export default WelcomeScreen;