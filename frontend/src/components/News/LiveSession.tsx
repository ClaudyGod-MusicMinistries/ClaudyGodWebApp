// src/components/news/LiveSession.tsx
import { motion } from 'framer-motion';
import { Cover } from '../../assets/';

export const LiveSession = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-[#1a0a2e] rounded-2xl p-6 md:p-8 shadow-xl h-full"
    >
      <h3 className="text-3xl sm:text-4xl md:text-5xl font-roboto-condensed text-white mb-6 text-center">
       Latest Release: You Are Our Everything.
      </h3>

      <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
        <img
          src={Cover}
          alt="Latest Release"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg
              className="w-6 h-6 md:w-8 md:h-8 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      <p className="text-purple-200 font-work-sans
 mb-4 text-sm md:text-base">
        Discover the latest gospel singles now featured on our Gospel News page! Stay updated with fresh releases, 
        inspiring messages, and uplifting melodies. Don’t miss out!
      </p>

     
      <div className="mt-6 md:mt-8 grid grid-cols-2 gap-3 font-raleway-light
">
  
        <a
          href="#"
          className="flex items-center justify-center p-3 bg-green-600 rounded-lg shadow-lg hover:opacity-90 transition-all"
        >
          <svg className="w-5 h-5 mr-2 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-2-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          <span className="text-white text-sm font-medium">Spotify</span>
        </a>

        <a
          href="#"
          className="flex items-center justify-center p-3 bg-red-600 rounded-lg shadow-lg hover:opacity-90 transition-all"
        >
          <svg className="w-5 h-5 mr-2 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
          </svg>
          <span className="text-white text-sm font-medium">YouTube</span>
        </a>
        
    
        <a
          href="#"
          className="flex items-center justify-center p-3 bg-black rounded-lg shadow-lg hover:opacity-90 transition-all"
        >
          <svg className="w-5 h-5 mr-2 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 16.434c-.696 1.041-1.527 1.733-2.501 2.073-.949.333-1.793.35-2.536.062-.714-.276-1.304-.793-1.771-1.551-.647-1.115-.964-2.477-.964-4.078 0-1.643.318-3.002.95-4.078.58-1.001 1.369-1.59 2.365-1.77.92-.164 1.573.019 1.955.546.15.21.266.46.35.75.085.29.127.535.127.735 0 .245-.04.57-.118.976-.079.405-.178.734-.297.988-.08.172-.23.433-.45.782-.22.35-.36.55-.42.6-.126.126-.313.189-.56.189-.164 0-.38-.047-.647-.14-.267-.094-.515-.14-.742-.14-.255 0-.549.065-.882.196-.333.131-.626.314-.877.548-.25.234-.466.495-.646.782-.18.288-.336.577-.469.867-.132.29-.234.55-.305.782-.07.233-.119.495-.146.787-.026.291-.04.554-.04.787 0 .349.026.73.078 1.143.052.414.134.812.246 1.194.111.382.266.765.465 1.148.199.383.44.72.726 1.01.285.29.633.537 1.041.742.409.205.89.322 1.443.35.504.025.922-.054 1.255-.236.333-.182.581-.388.744-.618.164-.23.336-.518.518-.866.182-.348.31-.62.384-.814.078-.19.228-.555.45-1.095.222-.54.333-.877.333-1.009 0-.14-.104-.297-.313-.469-.209-.172-.391-.258-.547-.258-.126 0-.297.068-.513.205-.216.137-.405.205-.57.205-.164 0-.38-.068-.647-.205-.267-.137-.54-.205-.82-.205-.291 0-.591.068-.9.205-.309.137-.586.337-.832.6-.246.263-.452.558-.618.885-.165.328-.3.656-.402.985-.103.328-.174.626-.214.895-.04.269-.06.498-.06.688 0 .328.04.685.118 1.072.078.387.197.756.355 1.108.159.352.362.655.61.91.248.254.547.454.896.6.349.146.757.225 1.224.236.465.011.856-.073 1.173-.254.317-.18.565-.425.743-.732.178-.307.375-.68.59-1.118.215-.437.33-.713.345-.826.014-.113-.07-.254-.254-.423z" />
          </svg>
          <span className="text-white text-sm font-medium">Apple Music</span>
        </a>
        
        <a
          href="#"
          className="flex items-center justify-center p-3 bg-[#feaa2d] rounded-lg shadow-lg hover:opacity-90 transition-all"
        >
          <svg className="w-5 h-5 mr-2 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1.8 0C.806 0 0 .805 0 1.8v3.6c0 .995.805 1.8 1.8 1.8h20.4c.995 0 1.8-.805 1.8-1.8V1.8c0-.995-.805-1.8-1.8-1.8H1.8zm0 7.2C.806 7.2 0 8.005 0 9v3.6c0 .995.805 1.8 1.8 1.8h20.4c.995 0 1.8-.805 1.8-1.8V9c0-.995-.805-1.8-1.8-1.8H1.8zm0 7.2c-.995 0-1.8.805-1.8 1.8v3.6c0 .995.805 1.8 1.8 1.8h20.4c.995 0 1.8-.805 1.8-1.8v-3.6c0-.995-.805-1.8-1.8-1.8H1.8z" />
          </svg>
          <span className="text-white text-sm font-medium">Deezer</span>
        </a>
      </div>
    </motion.div>
  );
};