import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useRef, useState, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const scrollProgressRef = useRef(0);
  const isScrollingRef = useRef(false);
  const animationFrameRef = useRef(null);
  const isVideoCompleteRef = useRef(false);
  const wasPlayingReverseRef = useRef(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        // Enable normal scrolling on mobile
        document.body.style.overflow = 'auto';
      } else {
        // Reset video and scroll lock on desktop
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
        }
        document.body.style.overflow = 'hidden';
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const updateVideoTime = () => {
    if (videoRef.current && isScrollingRef.current && !isMobile) {
      const currentTime = videoRef.current.currentTime;
      const targetTime = scrollProgressRef.current * videoRef.current.duration;
      const smoothness = 0.1;
      
      const newTime = currentTime + (targetTime - currentTime) * smoothness;
      videoRef.current.currentTime = Math.max(0, Math.min(newTime, videoRef.current.duration));

      if (newTime >= videoRef.current.duration - 0.1) {
        isVideoCompleteRef.current = true;
        document.body.style.overflow = 'auto';
      }

      if (Math.abs(targetTime - newTime) > 0.01) {
        animationFrameRef.current = requestAnimationFrame(updateVideoTime);
      } else {
        isScrollingRef.current = false;
      }
    }
  };

  useEffect(() => {
    if (isMobile) return; // Skip scroll handling on mobile

    const handleWheel = (e) => {
      const isScrollingUp = e.deltaY < 0;
      
      if (isVideoCompleteRef.current && !isScrollingUp) {
        return true;
      }
      
      if (window.scrollY > 0 && isScrollingUp) {
        return true;
      }

      if (wasPlayingReverseRef.current && !isScrollingUp) {
        wasPlayingReverseRef.current = false;
        isVideoCompleteRef.current = false;
        document.body.style.overflow = 'hidden';
      }

      e.preventDefault();
      
      if (videoRef.current) {
        if (window.scrollY === 0) {
          const scrollSensitivity = 0.0015;
          const newProgress = Math.max(0, Math.min(1, 
            scrollProgressRef.current + (e.deltaY * scrollSensitivity)
          ));

          scrollProgressRef.current = newProgress;
          
          if (!isScrollingRef.current) {
            isScrollingRef.current = true;
            animationFrameRef.current = requestAnimationFrame(updateVideoTime);
          }

          wasPlayingReverseRef.current = isScrollingUp;
        }
      }
    };

    const handleScroll = () => {
      if (window.scrollY === 0) {
        if (isVideoCompleteRef.current) {
          scrollProgressRef.current = 1;
          isVideoCompleteRef.current = false;
          document.body.style.overflow = 'hidden';
          if (videoRef.current) {
            videoRef.current.currentTime = videoRef.current.duration;
          }
          wasPlayingReverseRef.current = true;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isMobile]); // Added isMobile dependency

  useGSAP(() => {
    if (isMobile) {
      // Simple animation for mobile
      gsap.set("#video-frame", {
        clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
        borderRadius: "0% 0% 40% 10%",
      });
    } else {
      // Desktop animations
      gsap.set("#video-frame", {
        clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
        borderRadius: "0% 0% 40% 10%",
      });
      
      gsap.from("#video-frame", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        borderRadius: "0% 0% 0% 0%",
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: "#video-frame",
          start: "center center",
          end: "bottom center",
          scrub: true,
        },
      });

      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
    }
  }, [isMobile]); // Added isMobile dependency

  const handleVideoError = () => {
    setVideoError(true);
  };

  return (
    <div 
      ref={containerRef}
      className="relative h-dvh w-screen overflow-x-hidden"
    >
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-black"
      >
        {!videoError ? (
          <video
            ref={videoRef}
            muted
            playsInline
            autoPlay={isMobile} // Auto play on mobile
            loop={isMobile} // Loop on mobile
            className="absolute left-0 top-0 size-full object-cover object-center"
            onError={handleVideoError}
            src={isMobile ? "videos/hero-1-small.mp4" : "videos/hero-1.mp4"}
          />
        ) : (
          <div className="flex-center absolute inset-0 bg-black text-cream-50">
            <p>Error loading video</p>
          </div>
        )}

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-cream-50">
          A DEC<b>A</b>DE OF C<b>O</b>DING
        </h1>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        A DEC<b>A</b>DE OF C<b>O</b>DING
      </h1>
    </div>
  );
};

export default Hero;
