import { motion } from "framer-motion";
import Image from "next/image";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  return (
    <div className="pt-[120px] px-6 lg:px-20 pb-16 bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        variants={fadeInUp}
      >
        <h1 className="text-[35px] font-extrabold text-gray-900 leading-tight">
          Who's Behind The{" "}
          <span className="text-red-500 animate-pulse">Camera</span>
        </h1>
        <p className="text-gray-600 text-sm mt-2">
          The story, sarcasm & chaos behind{" "}
          <span className="text-red-500">X</span>SNAPSTER
        </p>
        <div className="w-16 h-1 bg-red-500 mx-auto mt-3 rounded-full"></div>
      </motion.div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {[
          {
            title: (
              <>
                The Truth <span className="text-red-500">(Sort of)</span>
              </>
            ),
            content: (
              <>
                Welcome to{" "}
                <span className="font-semibold text-gray-900">
                  <span className="text-red-500">X</span>SNAPSTER.STORE
                </span>
                — the site that looks dirty at first glance, but is actually…
                just about Frames. The only thing getting nailed here is your
                wall.
              </>
            ),
          },
          {
            title: (
              <>
                What We Actually <span className="text-red-500">Do</span>
              </>
            ),
            content: (
              <>
                We sell aesthetic photo frames — Cars, Anime, Music Albums,
                Sports, you name it. Our job? To make your walls look{" "}
                <span className="text-red-500 font-semibold">hotter</span> than
                your search history. Think of us as{" "}
                <span className="text-red-500 font-semibold">XHAM$TER</span>’s
                innocent cousin.
              </>
            ),
          },
          {
            title: (
              <>
                Why We <span className="text-red-500">Exist</span>
              </>
            ),
            content: (
              <>
                <ul className="list-disc ml-5 text-[16px] text-gray-700 leading-relaxed">
                  <li>Because bare walls are depressing.</li>
                  <li>Because posters with tape are for teenagers.</li>
                  <li>Because a little sarcasm makes shopping fun.</li>
                </ul>

                <p className="mt-3 text-[16px] text-gray-700">
                  We believe Frames should be:
                </p>
                <ul className="list-disc ml-5 text-[16px] text-gray-700 leading-relaxed">
                  <li>
                    <span className="text-red-500 font-semibold">Sexy</span> –
                    bold and aesthetic.
                  </li>
                  <li>
                    <span className="text-red-500 font-semibold">Playful</span>{" "}
                    – full of double meanings.
                  </li>
                  <li>
                    <span className="text-red-500 font-semibold">
                      Satisfying
                    </span>{" "}
                    – the kind of wall climax you didn’t know you needed.
                  </li>
                </ul>
              </>
            ),
          },
          {
            title: (
              <>
                Who We’re <span className="text-red-500">For</span>
              </>
            ),
            content: (
              <>
                <ul className="list-disc ml-5 text-[16px] text-gray-700 leading-relaxed">
                  <li>The car guy who wants horsepower on his wall.</li>
                  <li>The anime lover tired of hiding their waifu posters.</li>
                  <li>The gym bro who flexes more in mirrors than in life.</li>
                  <li>The Marvel nerd with “The Avengers HQ” bedroom.</li>
                  <li>
                    The music addict who needs Drake watching them cry at 2 AM.
                  </li>
                  <li>
                    The “She/Her” & “He/Him” crews who love gifts with attitude.
                  </li>
                </ul>
              </>
            ),
          },
          {
            title: (
              <>
                Our <span className="text-red-500">Promise</span>
              </>
            ),
            content: (
              <>
                <ul className="text-[16px] text-gray-700 leading-relaxed list-disc ml-5">
                  <li>No catfishing.</li>
                  <li>
                    Just Frames so good, your walls will scream,{" "}
                    <span className="text-red-500 font-semibold">
                      “Harder, Daddy.”
                    </span>
                  </li>
                </ul>
              </>
            ),
          },
        ].map((section, i) => (
          <motion.div
            key={i}
            className={`bg-white rounded-2xl shadow-lg p-6 hover:scale-[1.02] transition-all duration-300 border border-gray-200 ${
              section.title?.props?.children?.includes("Promise")
                ? "col-span-1 lg:col-span-2"
                : ""
            }`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-semibold mb-3">{section.title}</h2>
            <hr className="border-gray-300 mb-3" />
            <div className="text-[16px] text-gray-700 leading-relaxed">
              {section.content}
            </div>
          </motion.div>
        ))}

        {/* Closing Section */}
        <motion.div
          className="bg-gradient-to-br from-gray-800 to-gray-500 rounded-2xl shadow-2xl p-8 text-center col-span-1 lg:col-span-2 hover:scale-[1.02] transition-all duration-300"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          variants={fadeInUp}
        >
          <p className="text-gray-100 text-[15px] leading-relaxed mb-5">
            So go ahead. Browse around. Laugh a little. Buy a frame or ten.
            <br />
            Your walls deserve some attention.
          </p>
          <div className="flex justify-center">
            <Image
              src="/loading.webp"
              alt="logo"
              width={100}
              height={100}
              className="shadow-lg"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
