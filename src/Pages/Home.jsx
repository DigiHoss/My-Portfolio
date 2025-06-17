import { useState, useEffect, useCallback, memo } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import projectsIcon from "../assets/Home_icons/projects.svg";
import messagesIcon from "../assets/Home_icons/messages.svg";
import illustration from "../assets/Home_icons/illustration_programming.svg"
import Spline from '@splinetool/react-spline';
// Memorized Components


const MainTitle = memo(() => (
// "DigiHoss" text
  <div className="space-y-2" data-aos="fade-down" data-aos-delay="600">
    <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold font-Poppins sm:mt-2">
      <span className="relative inline-block">
        <span className="absolute -inset-2 primary_gradient blur-2xl opacity-20"></span>
        <span className="relative text-gradient-color">DigiHoss</span>
      </span>
    </h1>
  </div>
));
// Buttons, Thhere are two buttons : Projects and Contact buttons
const CTAButton = memo(({ href, text, icon }) => (
  <a href={href}>
    <button className="group relative w-[116px] h-[40px]">
    <div className="absolute -inset-0.5 bg-gradient-to-r primary_gradient opacity-50 blur-lg group-hover:opacity-90 transition-all duration-700"></div>
      <div className="relative h-full rounded-[6px] leading-none overflow-hidden">
        <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 primary-gradient"></div>
        <span className="absolute bg-[#2B1C4A] backdrop-blur-xl inset-0 flex items-center justify-center gap-[4px] text-sm group-hover:gap-3 transition-all duration-300">
          <span className="text-[#fff] font-bold font-Poppins z-10">{text}</span>
          <img
            src={icon}
            alt={`${text} icon`}
            className="w-[16px] h-[16px] group-hover:translate-x-1 transform transition-all duration-300 z-103"
          />
        </span>
      </div>
    </button>
  </a>
));

const Illustration = memo(() => (
    <div className="relative">
        <section className="">
          <span>
            <span className="primary_gradient blur-2xl opacity-20"></span>
            <span><img src={illustration} className="z-50 w-1xl md:max-w-2xl "/></span>
          </span>
        </section>
    </div>
));

// Constants
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["Engineering Student", "Full-Stack Developer", "UI/UX Designer"];

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AOS.init({ once: true, offset: 10 });
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText((prev) => prev + WORDS[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  return (
    <div className="min-h-screen overflow-hidden" id="Home">
      <div
        className={`relative z-10 transition-all duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container mx-auto px-[5%] sm:px-6 lg:px-8 min-h-screen">
          <div className="flex flex-col-reverse md:flex-row-reverse items-center justify-center h-screen mt-[150px] pb-5 md:mt-5 md:pb-0 md:justify-between gap-7 sm:gap-12 lg:mx-20 lg:gap-20 ">
            {/* Left Column */}
            <div
              className="flex sm:justify-center justify-start lg:justify-start w-full lg:w-1/2  lg:ml-8 space-y-6 sm:space-y-8 text-left order-1 lg:order-1"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <div className="space-y-4 sm:space-y-6">
                <MainTitle />

                {/* Typing Effect */}
                <div
                  className="h-8 flex items-center"
                  data-aos="fade-up"
                  data-aos-delay="800"
                >
                  <span className="text-xl md:text-2xl font-Montserrat text-[#fff] font-light">
                    {text}
                  </span>
                  <span className="w-[3px] h-6 bg-[#2CCFFF] ml-1 animate-blink"></span>
                </div>

                {/* CTA Buttons */}
                <div
                  className="flex flex-row gap-3 w-full justify-center md:justify-start "
                  data-aos="fade-up"
                  data-aos-delay="1400"
                >
                  <CTAButton
                    href="#Portofolio"
                    text="Projects"
                    icon={projectsIcon}
                  />
                  <CTAButton
                    href="#Contact"
                    text="Contact"
                    icon={messagesIcon}
                  />
                </div>
                {/* animation 3D of languages */}
                <div className="relative w-[300px] h-[170px] mb-5" >
                   <div className="top-0 bg-[#2B1C4A] border-1 border-[#000] text-center p-2" style={{boxShadow: "0px 0px 96.769px 45.159px rgba(117, 222, 255, 0.25)"}}>
                    <div className="text-white font-semibold font-Montserrat text-[12px]">A lot of technlogies waiting for you !</div>
                   </div>
                   <div>
                   <Spline className="absolute" scene="/src/assets/Animate-box/language_spherers.splinecode" />;         </div> 
                   <div className="absolute bg-gradient-to-b from-[#6E3FE8] to-[#000] border-1 border-[#2CCFFF] w-[300px] h-[170px] z-50 opacity-40 top-9"></div>

                </div>
              </div>
            </div>
            {/* Right Column if needed */}
            <div className="flex" data-aos="fade-up" data-aos-delay="1600">
            <Illustration></Illustration>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);
