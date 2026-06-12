export default function GameOverScreen({ setScreen, playClick }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e0e5ec]">
      <div className="flex flex-col items-center gap-6 p-10 rounded-3xl bg-[#e0e5ec] shadow-[6px_6px_12px_#a0a8b8,-6px_-6px_12px_#ffffff]">
        <h2 className="text-3xl font-bold text-gray-500">Game Over</h2>
        <button
          onClick={() => {
            setScreen("setup");
            playClick();
          }}
          className="px-8 py-3 rounded-xl font-semibold text-gray-500 bg-[#e0e5ec] shadow-[6px_6px_12px_#a0a8b8,-6px_-6px_12px_#ffffff] active:shadow-[inset_4px_4px_8px_#a0a8b8,inset_-4px_-4px_8px_#ffffff] active:scale-95 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
