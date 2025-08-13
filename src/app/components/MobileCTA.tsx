"use client";

import Image from "next/image";
import puppy1 from "@/assets/puppy1.png";
import puppy2 from "@/assets/puppy2.png";

export default function MobileCTA() {
  return (
    <div className="lg:hidden mt-8">
      <div className="relative w-full max-w-sm mx-auto">
        {/* Decorative Characters */}
        <div className="absolute -top-18 left-2 z-0">
          <div className="w-18 h-22 rounded-full transform -rotate-12 flex items-center justify-center text-2xl">
            <Image src={puppy1} alt="Puppy 1" width={100} height={100} />
          </div>
        </div>
        <div className="absolute -top-18 right-2 z-0">
          <div className="w-18 h-22 rounded-full transform rotate-12 flex items-center justify-center text-2xl">
            <Image src={puppy2} alt="Puppy 2" width={80} height={80} />
          </div>
        </div>

        {/* Main CTA Content */}
        <div className="relative z-10 bg-slate-600 rounded-2xl p-6 pt-12 text-white text-center">

          <h4 className="text-lg font-semibold text-[#FF9C00] mb-4">
            Still Haven't Tried Ord-X?
          </h4>
            <ol className="list-decimal list-inside mb-5 space-y-2 text-sm">
              <li>
                <a
                  href="#connect"
                  className="text-white/90 decoration-white/50 hover:decoration-yellow-300 hover:text-yellow-300"
                >
                  Connect a wallet
                </a>
              </li>
              <li>
                <a
                  href="#claim"
                  className="text-white/90 decoration-white/50 hover:decoration-yellow-300 hover:text-yellow-300"
                >
                  Claim daily rewards
                </a>
              </li>
              <li>
                <a
                  href="#inscribe"
                  className="text-white/90 decoration-white/50 hover:decoration-yellow-300 hover:text-yellow-300"
                >
                  Start inscribing your Bitcoin collectibles
                </a>
              </li>
            </ol>
          <button className="w-full max-w-48 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold py-3 px-5 rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-sm">
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
}
