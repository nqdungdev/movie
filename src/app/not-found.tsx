import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative bg-[#242424] w-full h-full flex items-center justify-center flex-col p-5 after:absolute after:left-0 after:top-0 after:right-0 after:bottom-0 after:bg-gradient-radial after:from-black/10 after:to-black overflow-hidden">
      <div className="absolute top-0 left-0 right-0 bottom-0 before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:block before:animate-scanLine before:bg-gradient-to-b before:from-black/30 before:via-black/10 before:via-[90%] before:to-black/30 after:absolute after:top-0 after:left-0 after:right-0 after:h-2 after:block after:animate-[scanLine_9s_linear_infinite] after:bg-gradient-to-b after:from-black/40 after:via-black/10 after:via-[90%] after:to-black/40">
        <svg width="100%" height="100%">
          <filter id="noise" x="0" y="0" width="100%" height="100%">
            <feTurbulence
              id="feTurbulence"
              type="fractalNoise"
              baseFrequency="2.5"
              numOctaves="100"
            >
              <animate
                attributeName="seed"
                from="0"
                to="100"
                dur="3s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feBlend in="SourceGraphic" in2="feTurbulence" mode="color-burn" />
          </filter>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            style={{ fill: "#444", filter: "url(#noise)" }}
          />
        </svg>
      </div>
      <div className="">
        <h2 className="text-black/30 filter blur-sm text-[16rem] font-bold animate-funnyText">
          404
        </h2>

        <p className="text-4xl text-black/60 font-semibold text-center uppercase animate-funnyText">
          PAGE NOT FOUND.
        </p>
      </div>
      <Link className="relative text-center z-50 cursor-pointer mt-5" href="/">
        Return Home
      </Link>
    </div>
  );
}
