import { useState } from "react";
import cardBack from "../assets/images/cardBack.png";

export default function Card({ card, isFlipped, handleFlip }) {
  const [flipping, setFlipping] = useState(false);

  const handleClick = () => {
    if (flipping) return;
    setFlipping(true);
    handleFlip(card);
  };

  return (
    <div
      onClick={handleClick}
      onTransitionEnd={() => setFlipping(false)}
      className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 cursor-pointer select-none perspective-600 rounded-xl transition-shadow duration-500
      }`}
    >
      <div
        className={`relative w-full h-full shadow-[2px_2px_4px_1px_#a0a8b8]  transition-transform duration-500 transform-style-preserve-3d rounded-xl ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        <div className="absolute inset-0 rounded-xl overflow-hidden backface-hidden select-none">
          <img
            src={cardBack}
            className="w-full h-full object-cover pointer-events-none select-none"
          />
        </div>

        <div className="absolute inset-0 rounded-xl overflow-hidden backface-hidden rotate-y-180">
          <img
            src={card.image}
            className="w-full h-full object-cover pointer-events-none select-none"
          />
        </div>
      </div>
    </div>
  );
}
