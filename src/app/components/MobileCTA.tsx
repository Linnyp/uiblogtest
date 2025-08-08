'use client'

export default function MobileCTA() {
  return (
    <div className="lg:hidden mt-8">
      <div className="bg-slate-600 rounded-2xl p-6 text-white text-center">
        {/* CTA Section */}
        <div className="relative">
          {/* Decorative Characters - smaller for mobile */}
          <div className="absolute -top-6 left-4">
            <div className="w-12 h-16 bg-orange-400 rounded-full transform -rotate-12 flex items-center justify-center text-lg">
              🎩
            </div>
          </div>
          <div className="absolute -top-6 right-4">
            <div className="w-12 h-16 bg-pink-500 rounded-full transform rotate-12 flex items-center justify-center text-lg">
              🐻
            </div>
          </div>
          
          <div className="pt-8">
            <h4 className="text-lg font-semibold text-yellow-300 mb-4">
              Still Haven't Tried Ord-X?
            </h4>
            <ol className="list-decimal list-inside mb-5 space-y-2 text-sm">
              <li>
                <a href="#connect" className="text-white/90 underline decoration-white/50 hover:decoration-yellow-300 hover:text-yellow-300">
                  Connect a wallet
                </a>
              </li>
              <li>
                <a href="#claim" className="text-white/90 underline decoration-white/50 hover:decoration-yellow-300 hover:text-yellow-300">
                  Claim daily rewards
                </a>
              </li>
              <li>
                <a href="#inscribe" className="text-white/90 underline decoration-white/50 hover:decoration-yellow-300 hover:text-yellow-300">
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
    </div>
  )
}