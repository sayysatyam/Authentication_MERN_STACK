const LoadingSpinner = () => {
  return (
    <div className="
      min-h-screen
      flex items-center justify-center
      relative overflow-hidden
      bg-linear-to-br
      from-gray-950
      via-purple-950
      to-gray-900
    ">
      <div
        className="
          w-16 h-16
          border-4
          border-purple-300/40
          border-t-purple-600
          rounded-full
          animate-spin
        "
      />
    </div>
  );
};

export default LoadingSpinner;

