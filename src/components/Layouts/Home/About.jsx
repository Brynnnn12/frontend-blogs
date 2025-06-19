import { motion } from "framer-motion";
import { FaPenFancy, FaLightbulb, FaUsers, FaChartLine } from "react-icons/fa";

const About = () => {
  return (
    <motion.section
      id="About"
      className="py-16 px-4 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ y: -20 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Tentang Blog Kami
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div
            className="lg:w-1/2"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img
                src="https://www.topkarir.com/article/show_banner/189294038362cd48e57a222?type=1000"
                alt="Tentang Blog Kami"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-blue-900 opacity-20"></div>
            </div>
          </motion.div>

          <motion.div
            className="lg:w-1/2"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Mengapa Blog Ini Ada?
            </h3>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Blog{" "}
              <span className="font-semibold text-blue-600">
                DigitalInspira
              </span>{" "}
              hadir sebagai platform berbagi pengetahuan seputar perkembangan
              teknologi digital, tips pengembangan diri, dan strategi kreatif
              untuk menghadapi era transformasi digital.
            </p>

            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FaPenFancy className="text-blue-500 mr-3" />
                Fokus Konten Kami:
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-800">
                    Artikel mendalam tentang teknologi terkini
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-800">
                    Panduan praktis untuk pengembangan web dan mobile
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-800">
                    Analisis tren digital dan case study
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-800">
                    Tips produktivitas dan manajemen waktu
                  </span>
                </li>
              </ul>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div
                className="bg-blue-50 p-4 rounded-lg"
                whileHover={{ y: -3 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center mb-2">
                  <FaLightbulb className="text-yellow-500 text-xl mr-2" />
                  <h5 className="text-gray-800 font-medium">Visi</h5>
                </div>
                <p className="text-sm text-gray-600">
                  Menjadi sumber inspirasi digital terpercaya bagi generasi muda
                  Indonesia.
                </p>
              </motion.div>

              <motion.div
                className="bg-blue-50 p-4 rounded-lg"
                whileHover={{ y: -3 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center mb-2">
                  <FaUsers className="text-blue-500 text-xl mr-2" />
                  <h5 className="text-gray-800 font-medium">Komunitas</h5>
                </div>
                <p className="text-sm text-gray-600">
                  10.000+ pembaca aktif setiap bulan dari berbagai kalangan.
                </p>
              </motion.div>
            </div>

            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm shadow-md hover:bg-blue-700 transition-colors"
              >
                Jelajahi Artikel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium text-sm shadow-sm hover:bg-blue-50 transition-colors"
              >
                Gabung Newsletter
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
