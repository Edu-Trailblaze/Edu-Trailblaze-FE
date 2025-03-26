'use client'
import React, { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
  PanInfo,
} from "framer-motion";

const IMGS: string[] = [
  "https://res.cloudinary.com/dtjgueyp2/image/upload/v1742976775/4dc9321b-f608-4196-9fb7-02f6c0029a5f_xvyksv.jpg",
  "https://res.cloudinary.com/dtjgueyp2/image/upload/v1742976775/study_tip.png_j5ol7v.webp",
  "https://res.cloudinary.com/dtjgueyp2/image/upload/v1742976775/studying-ahead-1421056_n6c06f.jpg",
  "https://res.cloudinary.com/dtjgueyp2/image/upload/v1742976775/image_vwgvvv.png",
  "https://res.cloudinary.com/dtjgueyp2/image/upload/v1742976914/benefits-of-teaching-english-in-the-united-states_qvennc.jpg",
  "https://res.cloudinary.com/dtjgueyp2/image/upload/v1742976914/Elementary-Education_rzbyzj.jpg",
  "https://res.cloudinary.com/dtjgueyp2/image/upload/v1742976913/hero_blog_New-teachers_Teaching-Strategies_photo_iStock_1670514539_Martine-Severin_xpauzh.jpg",
  "https://res.cloudinary.com/dtjgueyp2/image/upload/v1742976913/teacher-centered-vs-student-centered-learning_posc61.jpg",
  "https://res.cloudinary.com/dtjgueyp2/image/upload/v1742976912/Effective_Teacher_Professional_Development_920_joikyv.png",
  "https://res.cloudinary.com/dtjgueyp2/image/upload/v1742977251/pexels-yankrukov-8199665_okpr07.jpg",
];

interface RollingGalleryProps {
  autoplay?: boolean;
  pauseOnHover?: boolean;
  images?: string[];
}

const RollingGallery: React.FC<RollingGalleryProps> = ({
  autoplay = false,
  pauseOnHover = false,
  images = [],
}) => {
  // Use default images if none are provided
  const galleryImages = images.length > 0 ? images : IMGS;

  const [isScreenSizeSm, setIsScreenSizeSm] = useState<boolean>(
    window.innerWidth <= 640
  );
  useEffect(() => {
    const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 3D geometry calculations
  const cylinderWidth: number = isScreenSizeSm ? 2100 : 2800;
  const faceCount: number = galleryImages.length;
  const faceWidth: number = (cylinderWidth / faceCount) * 1.5;
  const radius: number = cylinderWidth / (2 * Math.PI);

  // Framer Motion values and controls
  const dragFactor: number = 0.05;
  const rotation = useMotionValue(0);
  const controls = useAnimation();

  // Create a 3D transform based on the rotation motion value
  const transform = useTransform(
    rotation,
    (val: number) => `rotate3d(0,1,0,${val}deg)`
  );

  const startInfiniteSpin = (startAngle: number) => {
    controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  useEffect(() => {
    if (autoplay) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    } else {
      controls.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay]);

  const handleUpdate = (latest: any) => {
    if (typeof latest.rotateY === "number") {
      rotation.set(latest.rotateY);
    }
  };

  const handleDrag = (_: any, info: PanInfo): void => {
    controls.stop();
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_: any, info: PanInfo): void => {
    const finalAngle = rotation.get() + info.velocity.x * dragFactor;
    rotation.set(finalAngle);
    if (autoplay) {
      startInfiniteSpin(finalAngle);
    }
  };

  // const handleMouseEnter = (): void => {
  //   if (autoplay && pauseOnHover) {
  //     controls.stop();
  //   }
  // };

  // const handleMouseLeave = (): void => {
  //   if (autoplay && pauseOnHover) {
  //     const currentAngle = rotation.get();
  //     startInfiniteSpin(currentAngle);
  //   }
  // };

  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      <div className="flex h-full items-center justify-center [perspective:1000px] [transform-style:preserve-3d]">
        <motion.div
          drag="x"
          dragElastic={0}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
          animate={controls}
          onUpdate={handleUpdate}
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          className="flex min-h-[350px] cursor-grab items-center justify-center [transform-style:preserve-3d]"
        >
          {galleryImages.map((url, i) => (
            <div
              key={i}
              className="group absolute flex h-fit items-center justify-center p-[8%] [backface-visibility:hidden] md:p-[6%]"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${(360 / faceCount) * i}deg) translateZ(${radius}px)`,
              }}
            >
              <img
                src={url}
                alt="gallery"
                className="pointer-events-none h-[200px] w-[180px] rounded-[15px] object-cover transition-transform duration-300 ease-out group-hover:scale-105 sm:h-[100px] sm:w-[400px]"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RollingGallery;
