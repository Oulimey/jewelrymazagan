import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#experience-clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".experience-mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="experience" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font-general text-sm uppercase md:text-[10px]">
          My Journey
        </p>
      
        <AnimatedTitle
          title="<b>T</b>en ye<b>a</b>rs of cre<b>a</b>ting digit<b>a</b>l exp<b>e</b>riences"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="experience-subtext">
          <p>From simple websites to complex applications, I've spent a decade crafting digital experiences that merge creativity with functionality.</p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="experience-clip">
        <div className="experience-mask-clip-path experience-image">
          <img
            src="img/balloons.webp"
            alt="Experience Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>

      <h1 className="special-font transition-heading absolute bottom-5 right-5 text-black">
        CR<b>A</b>FTING THE FUTU<b>R</b>E
      </h1>
    </div>
  );
};

export default Experience;