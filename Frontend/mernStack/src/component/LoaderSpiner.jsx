const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
    
      <div className="w-16 h-16 border-4 border-green-200 border-t-green-500 rounded-full animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
