import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const techItems = [
  { tech_name: "React", tech_color: "#61DBFB" },
  { tech_name: "Angular", tech_color: "#DD0031" },
  { tech_name: "Vue.js", tech_color: "#4FC08D" },
  { tech_name: "Svelte", tech_color: "#FF3E00" },
  { tech_name: "Next.js", tech_color: "#FFFFFF" },
  { tech_name: "Express.js", tech_color: "#808080" },
  { tech_name: "Node.js", tech_color: "#83CD29" },
  { tech_name: "Django", tech_color: "#092E20" },
  { tech_name: "Ember.js", tech_color: "#E04E39" },
  { tech_name: "GSAP", tech_color: "#8CC84B" },
  { tech_name: "Vite", tech_color: "#646CFF" },
  { tech_name: "Three.js", tech_color: "#FFFFFF" },
  { tech_name: "D3.js", tech_color: "#F9A03C" },
  { tech_name: "Anime.js", tech_color: "#FF0000" },
  { tech_name: "Photoshop", tech_color: "#31A8FF" },
  { tech_name: "Illustrator", tech_color: "#FF9A00" },
  { tech_name: "Figma", tech_color: "#F24E1E" },
  { tech_name: "InDesign", tech_color: "#FF3366" },
  { tech_name: "After Effects", tech_color: "#9999FF" },
  { tech_name: "Blender", tech_color: "#F5792A" },
  { tech_name: "Cinema 4D", tech_color: "#011A6A" },
  { tech_name: "Maya", tech_color: "#34A6C7" },
  { tech_name: "Houdini", tech_color: "#FF7700" },
  { tech_name: "ZBrush", tech_color: "#8C8C8C" }
];

const TechList = () => {
  const boxRef = useRef(null);
  const componentRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.set("#content-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    
    gsap.from("#content-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#content-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray('.tech-line');
      
      const updateAnimations = () => {
        const viewportWidth = window.innerWidth;
        
        lines.forEach((line, index) => {
          const coloredWord = line.querySelector('.colored-word');
          const lineContainer = line.querySelector('.line-container');
          const words = line.querySelectorAll('.tech-word');
          const dots = line.querySelectorAll('.dot');
          
          // Only proceed if we have words and dots (safety check)
          if (words.length === 0 || dots.length === 0) return;
          
          const singleItemWidth = words[0].offsetWidth + dots[0].offsetWidth + 12;
          const totalItems = 20; // Reduced number of items for better centering
          const totalWidth = singleItemWidth * totalItems;
          const offsetToCenter = (viewportWidth - totalWidth) / 2;
          const moveDistance = viewportWidth * 0.2;
          const startX = index % 2 === 0 ? moveDistance : -moveDistance;
          const endX = index % 2 === 0 ? -moveDistance : moveDistance;

          gsap.set(lineContainer, { 
            x: offsetToCenter + startX,
            opacity: 1 
          });

          gsap.to(lineContainer, {
            x: offsetToCenter + endX,
            opacity: 1,
            scrollTrigger: {
              trigger: componentRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
              onEnter: () => {
                if (coloredWord) gsap.to(coloredWord, { opacity: 1, duration: 0.1 });
              },
              onLeaveBack: () => {
                if (coloredWord) gsap.to(coloredWord, { opacity: 1, duration: 0.1 });
              },
            },
            ease: 'none'
          });
        });
      };

      updateAnimations();
      window.addEventListener('resize', updateAnimations);

      return () => window.removeEventListener('resize', updateAnimations);
    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={boxRef}
      className="relative h-dvh w-screen overflow-x-hidden"
    >
      <div
        id="content-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-black flex flex-col"
      >
        <div className="flex-none mt-6">
          <AnimatedTitle
            title="<b>A</b>n Infi<b>n</b>ite List <b>o</b>f Tech I E<b>x</b>cel In, <b>U</b>nle<b>a</b>shing the P<b>o</b>wer <b>o</b>f Y<b>o</b>ur Im<b>a</b>ginati<b>o</b>n"
            containerClass="bento-title special-font text-white"
          />
        </div>
        
        <section 
          ref={componentRef} 
          className="flex-1 relative overflow-hidden select-none pointer-events-none flex flex-col justify-center"
        >
          <div ref={containerRef} className="relative overflow-hidden py-4">
            {techItems.map((item, index) => (
              <div key={index} className="tech-line relative mb-1">
                <div className="line-container flex items-center" style={{ whiteSpace: 'nowrap' }}>
                  {Array(20).fill(null).map((_, repeatIndex) => (
                    <React.Fragment key={repeatIndex}>
                      <span
                        className={`tech-word inline-block text-xl font-bold uppercase tracking-tighter mx-1.5 ${
                          repeatIndex === 10 ? 'colored-word' : ''
                        }`}
                        style={{
                          color: repeatIndex === 10 ? item.tech_color : '#2A3C54',
                        }}
                      >
                        {item.tech_name}
                      </span>
                      <span className="dot text-base text-slate-700 mx-1.5">•</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="flex-none mb-8">
          <h1 className="special-font hero-heading absolute bottom-8 right-8 z-40 text-cream-50">
            Bey<b>o</b>n<b>d</b> the Li<b>m</b>its <b>o</b>f Cre<b>a</b>ti<b>o</b>n
          </h1>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-8 right-8 text-black">
        Bey<b>o</b>n<b>d</b> the Li<b>m</b>its <b>o</b>f Cre<b>a</b>ti<b>o</b>n
      </h1>

      <style jsx>{`
        .tech-line {
          will-change: transform, opacity;
        }
        .line-container {
          transform: translate3d(0, 0, 0);
        }
        .tech-word {
          backface-visibility: hidden;
          -webkit-font-smoothing: antialiased;
        }

        @media (max-width: 768px) {
          .tech-word {
            font-size: 1rem;
          }
          .tech-line {
            margin-bottom: 0;
          }
          .dot {
            font-size: 0.75rem;
          }
        }

        @media (max-width: 480px) {
          .tech-word {
            font-size: 0.9rem;
          }
          .tech-line {
            margin-bottom: -2px;
          }
          .dot {
            font-size: 0.65rem;
            margin-left: 0.25rem !important;
            margin-right: 0.25rem !important;
          }
          .tech-word {
            margin-left: 0.25rem !important;
            margin-right: 0.25rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default TechList;