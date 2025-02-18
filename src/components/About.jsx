import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font-general text-sm uppercase md:text-[10px]">
          Welcome to Oulimey
        </p>
      
        <AnimatedTitle
          title="<b>W</b><b>e<b/>b, <b>M</b>obil<b>e<b/>, 3<b>D</b> &amp; Gr<b>a</b>phi<b>c</b>s<br /><b>A</b>ll in <b>o</b>n<b>e<b/> cre<b>a</b>tiv<b>e<b/> min<b>d</b>"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext">
          <p>A multidisciplinary developer and designer with a passion for web, mobile, 3D, and visual storytelling, I turn simple ideas into immersive digital experiences.</p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="img/about.webp"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
