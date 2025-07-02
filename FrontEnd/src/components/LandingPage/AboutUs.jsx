import React, { useContext, useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import garden1 from "../../assets/garden1.jpg";
import garden2 from "../../assets/garden2.jpg";
import garden3 from "../../assets/garden3.jpg";

function AboutUs() {
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

  return (
    <div className="py-10 lg:py-28 flex flex-col lg:flex-row gap-10">
      {/* Image section */}
      <section className="flex flex-col gap-6 items-center lg:w-1/2">
        <motion.div
          ref={ref3}
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
          }}
          initial="hidden"
          animate={controlsPage3}
          transition={{
            duration: 0.5,
            delay: 0.3,
          }}
          className="p-1 img-border rounded-3xl w-2/3 h-1/2 mr-28 hidden lg:block"
        >
          <img
            src={garden3}
            alt="index"
            className="rounded-3xl shadow-xl object-cover w-full h-full"
          />
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
          className="p-1 img-border rounded-3xl w-2/3 h-1/2 hidden lg:block ml-20"
        >
          <img
            src={garden2}
            alt="index"
            className="rounded-3xl shadow-xl w-full h-full z-1 "
          />
        </motion.div>
      </section>
      <motion.section className="flex flex-col gap-4 lg:w-1/2 py-5">
        <motion.div
          ref={ref4}
          variants={{
            hidden: { opacity: 0, x: 100 },
            visible: { opacity: 1, x: 0 },
          }}
          initial="hidden"
          animate={controlsPage4}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="welcom_title text-5xl font-bold my-4 lg:text-left text-center drop-shadow-text"
        >
          Our Mission
        </motion.div>
        <motion.p
          ref={ref5}
          variants={{
            hidden: { opacity: 0, x: 100 },
            visible: { opacity: 1, x: 0 },
          }}
          initial="hidden"
          animate={controlsPage5}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-4 text-center lg:text-left"
        >
          At The BAPS Swaminarayan Chhatralaya, we believe in{" "}
          <span className="grd-text guj">'સત્સંગ સાથે શિક્ષણ'</span> . Our
          journey began in 1991, and since then, we have been provided the right
          mix of comfort, inspiration, and guidance for students to progress
          academically and spiritually.
        </motion.p>
        <motion.div
          ref={ref6}
          variants={{
            hidden: { opacity: 0, x: 100 },
            visible: { opacity: 1, x: 0 },
          }}
          initial="hidden"
          animate={controlsPage6}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="text-xl font-bold text-center lg:text-left"
        >
          🌟 What Sets Us Apart :
        </motion.div>
        <motion.ul
          ref={ref7}
          variants={{
            hidden: { opacity: 0, x: 100 },
            visible: { opacity: 1, x: 0 },
          }}
          initial="hidden"
          animate={controlsPage7}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="list-disc pl-12 flex flex-col items-center lg:items-start gap-2"
        >
          <li>
            Our hostel provides affordable room and board for college students
            and delicious food in a beautiful campus with lush greenery.
          </li>
          <li>
            Study circles and academic assistance programs are provided to
            students for enhancing their learning experience.
          </li>
          <li>
            Sadhus oversee the students and provide basic academic and spiritual
            guidance. Students begin each morning with aarti and are encouraged
            to attend daily sabhas or assemblies in the evening.
          </li>
        </motion.ul>
      </motion.section>
    </div>
  );
}

export default AboutUs;
