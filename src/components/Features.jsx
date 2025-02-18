import { useState, useRef } from "react";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current || window.innerWidth < 768) return; // Disable tilt on mobile
    
    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;
    
    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;
    
    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);
  const videoRef = useRef(null);

  // Handle video playback
  const handleVideoPlay = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        // Handle autoplay restrictions by attempting to play on user interaction
        document.addEventListener('touchstart', () => {
          videoRef.current.play().catch(() => {
            // If still failing, we'll at least ensure the video is visible
            if (videoRef.current) {
              videoRef.current.currentTime = 0;
            }
          });
        }, { once: true });
      });
    }
  };

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current || window.innerWidth < 768) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();
    
    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(window.innerWidth >= 768 ? 1 : 0);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        autoPlay
        onLoadedMetadata={handleVideoPlay}
        className="absolute left-0 top-0 size-full object-cover object-center select-none pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <div className="bento-title special-font">{title}</div>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => (
  <section className="bg-black pb-10">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-16 md:py-32">
        <p className="font-circular-web text-base md:text-lg text-cream-50">
          My creative Toolkit
        </p>
        <p className="max-w-md font-circular-web text-base md:text-lg text-blue-50 opacity-50">
          Blending design, code, and creativity to craft seamless web,
          mobile, and 3D experiences.
        </p>
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-80 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="videos/graph.mp4"
          title={
            <h1 className="bento-title special-font text-white">
              Gr<b>a</b>phic desig<b>n</b>
            </h1>
          }
          description={
            <p className="text-white">
              Designing with purpose, blending creativity and strategy into visuals that speak louder than words.
            </p>
          }
        />
      </BentoTilt>

      <div className="grid h-auto md:h-[135vh] w-full grid-cols-1 md:grid-cols-2 gap-7 md:grid-rows-3">
        <BentoTilt className="h-80 md:h-auto bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="videos/feature-2.mp4"
            title={
              <h1 className="bento-title special-font text-white">
                ph<b>o</b>tosh<b>o</b>p
              </h1>
            }
            description={
              <p className="text-white">
                Pixel perfect edits, mind blowing manipulations, wielding Photoshop like a digital sorcerer.
              </p>
            }
          />
        </BentoTilt>

        <BentoTilt className="h-80 md:h-auto bento-tilt_1 row-span-1 md:col-span-1">
          <BentoCard
            src="videos/feature-1.mp4"
            title={
              <h1 className="bento-title special-font text-white">
                <b>W</b>eb de<b>v</b>el<b>o</b>p<b>m</b>ent
              </h1>
            }
            description={
              <p className="text-white">
                Turning lines of code into seamless interactive experiences that feel like magic.
              </p>
            }
          />
        </BentoTilt>

        <BentoTilt className="h-80 md:h-auto bento-tilt_1 md:col-span-1">
          <BentoCard
            src="videos/feature-4.mp4"
            title={
              <h1 className="bento-title special-font text-white">
                3<b>D</b> <b>A</b>NIM<b>A</b>TI<b>O</b>N
              </h1>
            }
            description={
              <p className="text-white">
                Bringing ideas to life one frame at a time, because reality is just the beginning.
              </p>
            }
          />
        </BentoTilt>

        <BentoTilt className="h-80 md:h-auto bento-tilt_2">
          <BentoCard
            src="videos/feature-3.mp4"
            title={
              <h1 className="bento-title special-font text-white">
                br<b>a</b>n<b>d</b>ing
              </h1>
            }
            description={
              <p className="text-white">
                Crafting visual identities that don't just stand out, they stick in minds and hearts.
              </p>
            }
          />
        </BentoTilt>

        <BentoTilt className="h-80 md:h-auto bento-tilt_2">
          <BentoCard
            src="videos/feature-5.mp4"
            title={
              <h1 className="bento-title special-font text-white">
                S<b>o</b>ci<b>a</b>l <b>m</b>edi<b>a</b> m<b>a</b>rketing
              </h1>
            }
            description={
              <p className="text-white">
                More than just posts and ads, strategic storytelling that turns likes into loyalty.
              </p>
            }
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;
