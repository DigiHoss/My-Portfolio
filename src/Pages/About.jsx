import { useEffect, useState, memo, useMemo } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import idea from "../assets/About_icons/idea_icon.svg";
import project from "../assets/About_icons/Projects_icon.svg";
import certificate from "../assets/About_icons/Cerificates_icon.svg";
import Profile from "../assets/Profile/myProfile.png";
import { FileText } from "lucide-react"


// Memoized Components
const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="inline-block relative group">
      <h2
        className="text-4xl md:text-5xl font-bold font-Poppins text-gradient-color"
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>
    <p
      className="mt-2 text-white font-Montserrat max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <img src={idea} className="w-5 h-5" alt="Idea icon" />
      Innovate, Digitize, Elevate
      <img src={idea} className="w-5 h-5" alt="Idea icon" />
    </p>
  </div>
));

const ProfileImage = memo(() => (
  <div className="flex justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2">
    <div className="relative group" data-aos="fade-up" data-aos-duration="1000">
      {/* Optimized gradient backgrounds with reduced complexity for mobile */}
      <div className="absolute -inset-6 opacity-[25%] z-0 hidden sm:block">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 rounded-full blur-2xl animate-spin-slower" />
        <div className="absolute inset-0 bg-gradient-to-l from-fuchsia-500 via-rose-500 to-pink-600 rounded-full blur-2xl animate-pulse-slow opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-cyan-500 to-teal-400 rounded-full blur-2xl animate-float opacity-50" />
      </div>

      <div className="relative">
        <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(120,119,198,0.3)] transform transition-all duration-700 group-hover:scale-105">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full z-20 transition-all duration-700 group-hover:border-white/40 group-hover:scale-105" />

          {/* Optimized overlay effects - disabled on mobile */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-blue-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden sm:block" />

          <img
          src={Profile}
            alt="Profile"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
            loading="lazy"
          />

          {/* Advanced hover effects - desktop only */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 hidden sm:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/10 to-transparent transform translate-y-full group-hover:-translate-y-full transition-transform duration-1000 delay-100" />
            <div className="absolute inset-0 rounded-full border-8 border-white/10 scale-0 group-hover:scale-100 transition-transform duration-700 animate-pulse-slow" />
          </div>
        </div>
      </div>
    </div>
  </div>
));

const AboutPage = () => {
  // Memoized calculations
  const { totalProjects, totalCertificates } = useMemo(() => {
    // Safe parsing with fallbacks to prevent errors
    const storedProjects = (() => {
      try {
        return JSON.parse(localStorage.getItem("projects") || "[]");
      } catch (error) {
        console.error("Failed to parse projects from localStorage:", error);
        return [];
      }
    })();

    const storedCertificates = (() => {
      try {
        return JSON.parse(localStorage.getItem("certificates") || "[]");
      } catch (error) {
        console.error("Failed to parse certificates from localStorage:", error);
        return [];
      }
    })();

    return {
      totalProjects: storedProjects.length,
      totalCertificates: storedCertificates.length,
    };
  }, []);

  // Optimized AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: false,
      });
    };

    initAOS();

    // Debounced resize handler
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initAOS, 250);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Memoized stats data
  const statsData = useMemo(
    () => [
      {
        id: 1, // Added unique ID for key prop
        icon: project,
        color: "from-[#6366f1] to-[#a855f7]",
        value: totalProjects,
        label: "Total Projects",
        description: "Innovative web solutions crafted",
        animation: "fade-right",
      },
      {
        id: 2, // Added unique ID for key prop
        icon: certificate,
        color: "from-[#a855f7] to-[#6366f1]",
        value: totalCertificates,
        label: "Certificates",
        description: "Professional skills validated",
        animation: "fade-up",
      },
    ],
    [totalProjects, totalCertificates]
  );

  return (
    <div
      className="h-auto pb-[10%] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10 sm-mt-0"
      id="About"
    >
      <Header />

      <div className="w-full mx-auto pt-8 sm:pt-12 relative">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-Poppins"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <span className="text-gradient-color">Hello, I'm</span>
              <span
                className="block mt-2 text-white"
                data-aos="fade-right"
                data-aos-duration="1300"
              >
                Hossam EL HAMDI
              </span>
            </h2>

            <p
              className="text-base sm:text-lg lg:text-xl text-white font-Montserrat leading-relaxed text-justify pb-4 sm:pb-0"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              An Engineering student passionate about web development, UI/UX
              design, and digital creativity. I focus on crafting intuitive
              interfaces and seamless user experiences. Always striving to bring
              the best solutions to every Project.
            </p>
          </div>


          {/* Add ProfileImage component to actually use it */}
          <ProfileImage />
        </div>
        <div>
          <a href="#" className="w-full lg:w-auto">
              <button 
                data-aos="fade-up"
                data-aos-duration="800"
                className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg primary_gradient text-white font-Poppins font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 shadow-lg hover:shadow-xl animate-bounce-slow"
              >
                <FileText className="w-4 h-4 sm:w-5 sm:h-5" /> Download CV
              </button>
              </a>
          </div>
        {/* Display stats data if needed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {statsData.map((stat) => (
            <div
              key={stat.id}
              className={`bg-gradient-to-r ${stat.color} p-6 rounded-lg shadow-lg`}
              data-aos={stat.animation}
              data-aos-duration="1000"
            >
              <div className="flex items-center gap-4">
                <img src={stat.icon} alt={stat.label} className="w-12 h-12" />
                <div>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <p className="text-white/80">{stat.label}</p>
                  <p className="text-white/60 text-sm">{stat.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes spin-slower {
          to {
            transform: rotate(360deg);
          }
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        .animate-pulse-slow {
          animation: pulse 3s infinite;
        }
        .animate-spin-slower {
          animation: spin-slower 8s linear infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default memo(AboutPage);
