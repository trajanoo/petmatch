
import Image from "next/image";
export default function MatchCard() {
  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div className="card-swipe aspect-[3/4] overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src='/perfil.jpeg'
            alt='foto do trajano'
            fill
            className={`object-cover transition-opacity duration-300 rounded-2xl`}
            priority
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-1">
                  Bruno Trajano, 428 anos
                </h2>
                <p className="text-sm opacity-90 mb-2">@trajanoo</p>
                <p className="text-sm leading-relaxed">blablabla</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}