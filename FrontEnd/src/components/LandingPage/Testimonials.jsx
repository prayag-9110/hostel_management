import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3dCard";
import reviews from "./reviews";

function Testimonials() {
  const [firstPartL, setFirstPartL] = useState([]);
  const [secondPartL, setSecondPartL] = useState([]);
  const [thirdPartL, setThirdPartL] = useState([]);
  const [firstPartM, setFirstPartM] = useState([]);
  const [secondPartM, setSecondPartM] = useState([]);

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

  const ref7 = useRef(null);
  const isInViewPage7 = useInView(ref7, { once: true });
  const controlsPage7 = useAnimation();

  useEffect(() => {
    if (isInViewPage7) {
      controlsPage7.start("visible");
    }
  }, [isInViewPage7, controlsPage7]);

  useEffect(() => {
    // Divide reviews into three parts and two parts
    setFirstPartL(reviews.slice(0, Math.ceil(reviews.length / 3)));
    setSecondPartL(
      reviews.slice(
        Math.ceil(reviews.length / 3),
        Math.ceil((2 * reviews.length) / 3)
      )
    );
    setThirdPartL(reviews.slice(Math.ceil((2 * reviews.length) / 3)));
    setFirstPartM(reviews.slice(0, Math.ceil(reviews.length / 2)));
    setSecondPartM(reviews.slice(Math.ceil(reviews.length / 2)));
  }, []);
  return (
    <>
      <motion.div
        ref={ref}
        variants={{
          hidden: { opacity: 0, y: -100 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={controlsPage}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="welcom_title text-4xl lg:text-5xl font-bold text-center drop-shadow-text"
      >
        Read Our Excellent Reviews
      </motion.div>
      <div className="px-5 py-10">
        <div className="hidden lg:flex flex-row flex-wrap gap-12 items-start justify-center">
          <motion.section
            ref={ref2}
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate={controlsPage2}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="grid gap-10 w-full md:w-[40%] lg:w-[29%]"
          >
            {secondPartL.map((review, index) => (
              <CardContainer className="inter-var">
                <CardBody className=" relative group/card p-6 login_bg rounded-lg flex flex-col gap-4 w-full transition-all duration-300 h-fit hover:scale-105">
                  <CardItem
                    translateZ="30"
                    className="text-sm text-neutral-600 dark:text-white"
                  >
                    "{review.review}"
                  </CardItem>
                  <div className="flex flex-row justify-between">
                    <CardItem as="p" translateZ="30" className="font-semibold">
                      ⭐ {review.rating}/5
                    </CardItem>
                    <CardItem
                      as="p"
                      translateZ="30"
                      className="pr-2 font-semibold"
                    >
                      - {review.name}
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            ))}
          </motion.section>
          <motion.section
            ref={ref3}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={controlsPage3}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="grid gap-10 w-full md:w-[40%] lg:w-[29%]"
          >
            {firstPartL.map((review, index) => (
              <CardContainer className="inter-var">
                <CardBody className=" relative group/card p-6 login_bg rounded-lg flex flex-col gap-4 w-full transition-all duration-300 h-fit hover:scale-105">
                  <CardItem
                    translateZ="30"
                    className="text-sm text-neutral-600 dark:text-white"
                  >
                    "{review.review}"
                  </CardItem>
                  <div className="flex flex-row justify-between">
                    <CardItem as="p" translateZ="30" className="font-semibold">
                      ⭐ {review.rating}/5
                    </CardItem>
                    <CardItem
                      as="p"
                      translateZ="30"
                      className="pr-2 font-semibold"
                    >
                      - {review.name}
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            ))}
          </motion.section>
          <motion.section
            ref={ref4}
            variants={{
              hidden: { opacity: 0, x: 100 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate={controlsPage4}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="grid grid-cols-1 gap-10 w-full md:w-[40%] lg:w-[29%]"
          >
            {thirdPartL.map((review, index) => (
              <CardContainer className="inter-var">
                <CardBody className=" relative group/card p-6 login_bg rounded-lg flex flex-col gap-4 w-full transition-all duration-300 h-fit hover:scale-105">
                  <CardItem
                    translateZ="30"
                    className="text-sm text-neutral-600 dark:text-white"
                  >
                    "{review.review}"
                  </CardItem>
                  <div className="flex flex-row justify-between">
                    <CardItem as="p" translateZ="30" className="font-semibold">
                      ⭐ {review.rating}/5
                    </CardItem>
                    <CardItem
                      as="p"
                      translateZ="30"
                      className="pr-2 font-semibold"
                    >
                      - {review.name}
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            ))}
          </motion.section>
        </div>
        <div className="hidden sm:hidden lg:hidden md:flex flex-row flex-wrap gap-12 items-start justify-center">
          <motion.section
            ref={ref5}
            variants={{
              hidden: { opacity: 0, x: 100 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate={controlsPage5}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="grid gap-10 w-full md:w-[40%] lg:w-[30%]"
          >
            {secondPartM.map((review, index) => (
              <CardContainer className="inter-var">
                <CardBody className=" relative group/card p-6 login_bg rounded-lg flex flex-col gap-4 w-full transition-all duration-300 h-fit hover:scale-105">
                  <CardItem
                    translateZ="30"
                    className="text-sm text-neutral-600 dark:text-white"
                  >
                    "{review.review}"
                  </CardItem>
                  <div className="flex flex-row justify-between">
                    <CardItem as="p" translateZ="30" className="font-semibold">
                      ⭐ {review.rating}/5
                    </CardItem>
                    <CardItem
                      as="p"
                      translateZ="30"
                      className="pr-2 font-semibold"
                    >
                      - {review.name}
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            ))}
          </motion.section>
          <motion.section
            ref={ref6}
            variants={{
              hidden: { opacity: 0, x: 100 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate={controlsPage6}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="grid gap-10 w-full md:w-[40%] lg:w-[30%]"
          >
            {firstPartM.map((review, index) => (
              <CardContainer className="inter-var">
                <CardBody className=" relative group/card p-6 login_bg rounded-lg flex flex-col gap-4 w-full transition-all duration-300 h-fit hover:scale-105">
                  <CardItem
                    translateZ="30"
                    className="text-sm text-neutral-600 dark:text-white"
                  >
                    "{review.review}"
                  </CardItem>
                  <div className="flex flex-row justify-between">
                    <CardItem as="p" translateZ="30" className="font-semibold">
                      ⭐ {review.rating}/5
                    </CardItem>
                    <CardItem
                      as="p"
                      translateZ="30"
                      className="pr-2 font-semibold"
                    >
                      - {review.name}
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            ))}
          </motion.section>
        </div>
        <div className="md:hidden sm:flex flex-row flex-wrap gap-12 items-start justify-center">
          <motion.section
            ref={ref7}
            variants={{
              hidden: { opacity: 0, x: 100 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate={controlsPage7}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="grid gap-10 w-full md:w-[40%] lg:w-[30%]"
          >
            {reviews.map((review, index) => (
              <CardContainer className="inter-var">
                <CardBody className=" relative group/card p-6 login_bg rounded-lg flex flex-col gap-4 w-full transition-all duration-300 h-fit hover:scale-105">
                  <CardItem
                    translateZ="30"
                    className="text-sm text-neutral-600 dark:text-white"
                  >
                    "{review.review}"
                  </CardItem>
                  <div className="flex flex-row justify-between">
                    <CardItem as="p" translateZ="30" className="font-semibold">
                      ⭐ {review.rating}/5
                    </CardItem>
                    <CardItem
                      as="p"
                      translateZ="30"
                      className="pr-2 font-semibold"
                    >
                      - {review.name}
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            ))}
          </motion.section>
        </div>
      </div>
    </>
  );
}

export default Testimonials;
