export default function SetUpScreen({
  timeInput,
  setTimeInput,
  movesInput,
  setMovesInput,
  handleStart,
  playClick,
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e0e5ec]">
      <div className="flex flex-col gap-6 p-8 rounded-3xl w-80 bg-[#e0e5ec] shadow-[6px_6px_12px_#a0a8b8,-6px_-6px_12px_#ffffff]">
        <h1 className="text-2xl font-bold text-center text-gray-600">
          Flip Game
        </h1>

        <p className="text-center text-sm text-gray-400">
          Choose your challenge
        </p>

        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium text-slate-500">
            Time: {timeInput}s
          </label>

          <input
            type="range"
            min={20}
            max={180}
            step={10}
            value={timeInput}
            onChange={(e) => setTimeInput(e.target.value)}
            className="accent-[#8da9c4] select-none"
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium text-slate-500">
            Moves: {movesInput}
          </label>

          <input
            type="range"
            min={12}
            max={40}
            step={2}
            value={movesInput}
            onChange={(e) => setMovesInput(e.target.value)}
            className="accent-[#c59ab4]"
          />
        </div>

        <button
          onClick={() => {
            handleStart();
            playClick();
          }}
          className="
          py-3 rounded-xl font-semibold text-gray-600
          bg-[#e0e5ec]
          shadow-[6px_6px_12px_#a0a8b8,-6px_-6px_12px_#ffffff]
          active:shadow-[inset_4px_4px_8px_#a0a8b8,inset_-4px_-4px_8px_#ffffff]
          active:scale-95
          transition
        "
        >
          Start
        </button>
      </div>
    </div>
  );
}
