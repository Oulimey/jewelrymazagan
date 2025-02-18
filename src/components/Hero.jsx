import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useRef, useState, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [loading, setLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const scrollProgressRef = useRef(0);
  const isScrollingRef = useRef(false);
  const animationFrameRef = useRef(null);
  const isVideoCompleteRef = useRef(false);
  const wasPlayingReverseRef = useRef(false);
  const touchStartRef = useRef(0);
  const lastTouchYRef = useRef(0);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  // Handle loading screen timing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoLoaded) {
        setLoading(false);
      }
    }, 5000);

    // If video loads after timer, wait for timer
    if (videoLoaded) {
      const videoTimer = setTimeout(() => {
        setLoading(false);
      }, 5000);
      return () => clearTimeout(videoTimer);
    }

    return () => clearTimeout(timer);
  }, [videoLoaded]);

  const updateVideoTime = () => {
    if (videoRef.current && isScrollingRef.current) {
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
    document.body.style.overflow = 'hidden';
    
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
      
      if (videoRef.current && window.scrollY === 0) {
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
    };

    const handleTouchStart = (e) => {
      touchStartRef.current = e.touches[0].clientY;
      lastTouchYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (isVideoCompleteRef.current && e.touches[0].clientY < lastTouchYRef.current) {
        return true;
      }

      if (window.scrollY > 0 && e.touches[0].clientY > lastTouchYRef.current) {
        return true;
      }

      e.preventDefault();

      const currentY = e.touches[0].clientY;
      const deltaY = lastTouchYRef.current - currentY;
      
      if (videoRef.current && window.scrollY === 0) {
        const touchSensitivity = 0.001;
        const newProgress = Math.max(0, Math.min(1,
          scrollProgressRef.current + (deltaY * touchSensitivity)
        ));

        scrollProgressRef.current = newProgress;

        if (!isScrollingRef.current) {
          isScrollingRef.current = true;
          animationFrameRef.current = requestAnimationFrame(updateVideoTime);
        }

        wasPlayingReverseRef.current = deltaY < 0;
      }

      lastTouchYRef.current = currentY;
    };

    const handleTouchEnd = () => {
      if (!isVideoCompleteRef.current) {
        document.body.style.overflow = 'hidden';
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
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useGSAP(() => {
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
  });

  return (
    <div 
      ref={containerRef}
      className="relative h-dvh w-screen overflow-x-hidden"
    >
      {loading && (
        <div className="flex-center fixed z-[100] h-dvh w-screen overflow-hidden bg-cream-50">
          <div className="flex items-center justify-center">
            <img 
              src="img/logo.png" 
              alt="Loading Logo"
              className="h-auto w-40 animate-logo-fade"
            />
          </div>
        </div>
      )}
      
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <video
          ref={videoRef}
          src="videos/hero-1.mp4"
          muted
          playsInline
          className="absolute left-0 top-0 size-full object-cover object-center"
          onLoadedData={handleVideoLoad}
        />

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
