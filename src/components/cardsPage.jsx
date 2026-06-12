import { useEffect, useState } from "react";
import { FaClock, FaRandom } from "react-icons/fa";
import { FaRotateRight } from "react-icons/fa6";
import GameOverScreen from "./gameOverScreen";
import SetUpScreen from "./setUpScreen";
import WinScreen from "./winScreen";

import clickSoundFile from "../assets/sounds/click.mp3";
import flipSoundFile from "../assets/sounds/flip.mp3";

import img1 from "../assets/images/product-1.jpg";
import img2 from "../assets/images/product-2.jpg";
import img3 from "../assets/images/product-3.jpg";
import img4 from "../assets/images/product-4.jpg";
import img5 from "../assets/images/product-5.jpg";
import img6 from "../assets/images/product-6.jpg";
import img7 from "../assets/images/product-7.jpg";
import img8 from "../assets/images/product-8.jpg";
import Card from "./Card";

const initialCards = [
  { id: 1, value: 1, image: img1 },
  { id: 2, value: 2, image: img2 },
  { id: 3, value: 3, image: img3 },
  { id: 4, value: 4, image: img4 },
  { id: 5, value: 5, image: img5 },
  { id: 6, value: 6, image: img6 },
  { id: 7, value: 7, image: img7 },
  { id: 8, value: 8, image: img8 },
  { id: 9, value: 1, image: img1 },
  { id: 10, value: 2, image: img2 },
  { id: 11, value: 3, image: img3 },
  { id: 12, value: 4, image: img4 },
  { id: 13, value: 5, image: img5 },
  { id: 14, value: 6, image: img6 },
  { id: 15, value: 7, image: img7 },
  { id: 16, value: 8, image: img8 },
];

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

const flipAudio = new Audio(flipSoundFile);
const clickAudio = new Audio(clickSoundFile);

const playClick = () => {
  clickAudio.currentTime = 0;
  clickAudio.play();
};
const playFlip = () => {
  flipAudio.currentTime = 0;
  flipAudio.play();
};

export default function CardsPage() {
  const [screen, setScreen] = useState("setup");
  const [timeInput, setTimeInput] = useState(75);
  const [movesInput, setMovesInput] = useState(24);
  const [cards, setCards] = useState(() => shuffle(initialCards));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [timeLeft, setTimeLeft] = useState(75);
  const [movesLeft, setMovesLeft] = useState(24);
  const [gameStarted, setGameStarted] = useState(false);
  const [locked, setLocked] = useState(false);

  const won = matched.length === cards.length;
  const gameOver = timeLeft === 0 || movesLeft === 0;

  useEffect(() => {
    if (!gameStarted || gameOver || won) return;
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [gameStarted, gameOver, won]);

  const handleStart = () => {
    playClick();
    setCards(shuffle(initialCards));
    setFlipped([]);
    setMatched([]);
    setTimeLeft(Number(timeInput));
    setMovesLeft(Number(movesInput));
    setGameStarted(false);
    setLocked(false);
    setScreen("game");
  };

  const handleFlip = (card) => {
    if (locked || gameOver || won) return;
    if (!gameStarted) setGameStarted(true);
    if (
      flipped.length === 2 ||
      flipped.some((c) => c.id === card.id) ||
      matched.includes(card.id)
    )
      return;

    if (flipped.length === 0) setMovesLeft((m) => m - 1);

    const newFlipped = [...flipped, card];
    setFlipped(newFlipped);

    playFlip();

    if (newFlipped.length === 2) {
      setLocked(true);
      const [a, b] = newFlipped;
      if (a.value === b.value) {
        setMatched((prev) => [...prev, a.id, b.id]);
        setFlipped([]);
        setLocked(false);
      } else {
        setTimeout(() => {
          playFlip();
          setFlipped([]);
          setLocked(false);
        }, 800);
      }
    }
  };

  if (screen === "setup") {
    return (
      <SetUpScreen
        timeInput={timeInput}
        setTimeInput={setTimeInput}
        movesInput={movesInput}
        setMovesInput={setMovesInput}
        handleStart={handleStart}
      />
    );
  }

  if (won) {
    return <WinScreen setScreen={setScreen} playClick={playClick} />;
  }

  if (gameOver) {
    return <GameOverScreen setScreen={setScreen} playClick={playClick} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#e0e5ec]">
      <div className="flex flex-col gap-4 p-6 rounded-3xl bg-[#e0e5ec] shadow-[6px_6px_12px_#a0a8b8,-6px_-6px_12px_#ffffff]">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center gap-2 text-[#7c9cbf]">
            <FaClock className="text-2xl" />
            <span className="text-xl font-bold">{timeLeft}s</span>
          </div>

          <div className="flex items-center gap-2 text-[#b07ca0]">
            <FaRandom className="text-2xl" />
            <span className="text-xl font-bold">{movesLeft}</span>
          </div>

          <button
            onClick={() => {
              setScreen("setup");
              playClick();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-500 bg-[#e0e5ec] shadow-[6px_6px_12px_#a0a8b8,-6px_-6px_12px_#ffffff] active:shadow-[inset_4px_4px_8px_#a0a8b8,inset_-4px_-4px_8px_#ffffff] active:scale-95 transition"
          >
            <FaRotateRight />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              isFlipped={
                flipped.some((c) => c.id === card.id) ||
                matched.includes(card.id)
              }
              handleFlip={handleFlip}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
