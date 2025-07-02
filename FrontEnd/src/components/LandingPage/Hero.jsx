import React, { useContext, useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import index from "../../assets/Index.jpg";
import { TypewriterEffectSmooth } from "@/components/ui/TypeWriteEffect";
import { CardBody, CardContainer } from "@/components/ui/3dCard";

function Hero() {
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

  const ref3 = useRef(null);
  const isInViewPage3 = useInView(ref3, { once: true });
  const controlsPage3 = useAnimation();

  useEffect(() => {
    if (isInViewPage3) {
      controlsPage3.start("visible");
    }
  }, [isInViewPage3, controlsPage3]);

  const ref4 = useRef(null);
  const isInViewPage4 = useInView(ref4, { once: true });
  const controlsPage4 = useAnimation();

  useEffect(() => {
    if (isInViewPage4) {
      controlsPage4.start("visible");
    }
  }, [isInViewPage4, controlsPage4]);

  const ref5 = useRef(null);
  const isInViewPage5 = useInView(ref5, { once: true });
  const controlsPage5 = useAnimation();

  useEffect(() => {
    if (isInViewPage5) {
      controlsPage5.start("visible");
    }
  }, [isInViewPage5, controlsPage5]);

  const ref6 = useRef(null);
  const isInViewPage6 = useInView(ref6, { once: true });
  const controlsPage6 = useAnimation();

  useEffect(() => {
    if (isInViewPage6) {
      controlsPage6.start("visible");
    }
  }, [isInViewPage6, controlsPage6]);

  const words = [
    {
      text: `"Your`,
    },
    {
      text: "Home",
    },
    {
      text: "Away",
    },
    {
      text: "From",
    },
    {
      text: `Home"`,
    },
  ];

  return (
    <div className="py-10 lg:py-20 flex flex-col lg:flex-row gap-10 items-center">
      <motion.section className="flex flex-col gap-4 lg:w-1/2">
        <motion.div
          ref={ref}
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
          }}
          initial="hidden"
          animate={controlsPage}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-3xl md:text-3xl lg:text-4xl lg:text-left text-center font-bold drop-shadow-text text-gray-800/90 "
        >
          Welcome to
          <div className="">Swaminarayan Chhatralaya 🎉</div>
        </motion.div>
        <motion.div
          ref={ref2}
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
          }}
          initial="hidden"
          animate={controlsPage2}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-3xl font-bold my-4 lg:text-left text-center flex justify-center lg:justify-start"
        >
          <TypewriterEffectSmooth words={words} />
        </motion.div>
        <motion.p
          ref={ref3}
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
          }}
          initial="hidden"
          animate={controlsPage3}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mb-4 text-center lg:text-left"
        >
          Discover a haven of comfort, camaraderie, and adventure at
          Swaminarayan Chhatralaya. Nestled in the heart of Nadiad, our hostel
          invites you to experience a blend of vibrant cultures, warm
          hospitality, and affordable luxury.
        </motion.p>
        <motion.div
          ref={ref4}
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
          }}
          initial="hidden"
          animate={controlsPage4}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl font-bold text-center lg:text-left"
        >
          🌟 Why Choose Swaminarayan Chhatralaya?
        </motion.div>
        <motion.ul
          ref={ref5}
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
          }}
          initial="hidden"
          animate={controlsPage5}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="list-disc pl-12 flex flex-col items-center lg:items-start gap-2"
        >
          <li>Centrally located with easy access to Universities</li>
          <li>Comfortable and budget-friendly accommodations</li>
          <li>
            Friendly staff ready to assist and create a home away from home.
          </li>
        </motion.ul>
      </motion.section>

      {/* Image section */}
      <section className="flex items-center justify-center lg:w-1/2 md:pl-10">
        <CardContainer>
          <CardBody className="w-full">
            <motion.div
              ref={ref6}
              variants={{
                hidden: { opacity: 0, x: 100 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              animate={controlsPage6}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="p-1 img-border rounded-full"
            >
              <motion.img
                src={index}
                alt="index"
                className="rounded-full sm:h-60 md:h-80 shadow-xl"
              />
            </motion.div>
          </CardBody>
        </CardContainer>
      </section>
    </div>
  );
}

export default Hero;
