import React, { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import index from "../../assets/Index.jpg";
import garden1 from "../../assets/garden1.jpg";
import garden2 from "../../assets/garden2.jpg";
import garden3 from "../../assets/garden3.jpg";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function PhotoGallery() {
  const ref = useRef(null);
  const isInViewPage = useInView(ref, { once: true });
  const controlsPage = useAnimation();

  useEffect(() => {
    if (isInViewPage) {
      controlsPage.start("visible");
    }
  }, [isInViewPage, controlsPage]);

  const ref2 = useRef(null);
  const isInViewPage2 = useInView(ref2, { once: true });
  const controlsPage2 = useAnimation();

  useEffect(() => {
    if (isInViewPage2) {
      controlsPage2.start("visible");
    }
  }, [isInViewPage2, controlsPage2]);

  return (
    <>
      <div className="py-10 lg:py-20 flex flex-col items-center justify-start">
        <motion.div
          ref={ref}
          variants={{
            hidden: { opacity: 0, x: 300 },
            visible: { opacity: 1, x: 0 },
          }}
          initial="hidden"
          animate={controlsPage}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="welcom_title text-4xl lg:text-5xl font-bold my-4  text-center drop-shadow-text "
        >
          Our Photo Gallary
        </motion.div>
        <div
          ref={ref2}
          variants={{
            hidden: { opacity: 0, x: -300 },
            visible: { opacity: 1, x: 0 },
          }}
          initial="hidden"
          animate={controlsPage2}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="py-10 lg:py-15 flex"
        >
          <Carousel className=" py-10">
            <CarouselContent>
              <CarouselItem className="lg:basis-1/2 ">
                <div className="p-0.5 rounded-3xl gallary-photo-border">
                  <img
                    src={garden2}
                    alt="index"
                    className="rounded-3xl w-full object-cover h-[250px] md:h-[450px] "
                  />
                </div>
              </CarouselItem>
              <CarouselItem className="lg:basis-1/2 ">
                <div className="p-0.5 rounded-3xl gallary-photo-border">
                  <img
                    src={garden1}
                    alt="index"
                    className="rounded-3xl w-full object-cover h-[250px] md:h-[450px] "
                  />
                </div>
              </CarouselItem>
              <CarouselItem className="lg:basis-1/2 ">
                <div className="p-0.5 rounded-3xl gallary-photo-border">
                  <img
                    src={garden3}
                    alt="index"
                    className="rounded-3xl w-full object-cover h-[250px] md:h-[450px] "
                  />
                </div>
              </CarouselItem>
              <CarouselItem className="lg:basis-1/2 ">
                <div className="p-0.5 rounded-3xl gallary-photo-border">
                  <img
                    src={index}
                    alt="index"
                    className="rounded-3xl h-[250px] object-cover md:h-[450px]  w-full"
                  />
                </div>
              </CarouselItem>
              <CarouselItem className="lg:basis-1/2 ">
                <div className="p-0.5 rounded-3xl gallary-photo-border">
                  <img
                    src={garden1}
                    alt="index"
                    className="rounded-3xl w-full object-cover h-[250px] md:h-[450px] "
                  />
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </>
  );
}

export default PhotoGallery;
