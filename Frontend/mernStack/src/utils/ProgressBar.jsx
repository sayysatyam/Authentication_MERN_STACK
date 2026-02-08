const getColor = (value) => {
  if (value < 40) return "bg-red-500";
  if (value < 70) return "bg-yellow-500";
  return "bg-green-500";
};

const getGlow = (value) => {
  if (value < 40) return "group-hover:shadow-[0_0_14px_rgba(239,68,68,0.9)]";
  if (value < 70) return "group-hover:shadow-[0_0_14px_rgba(250,204,21,0.9)]";
  return "group-hover:shadow-[0_0_14px_rgba(34,197,94,0.9)]";
};

const ProgressLine = ({ value }) => {
  const safeValue = Math.min(100, Math.max(0, Number(value)));

  return (
    <div className="w-full bg-gray-500 rounded-full group">
      <div
        className={`
          h-6
          rounded-full
          transition-all duration-300
          ${getColor(safeValue)}
          ${getGlow(safeValue)}
        `}
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
};

export default ProgressLine;