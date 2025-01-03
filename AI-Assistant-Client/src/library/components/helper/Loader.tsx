const Loader = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-white">
      <svg
        className="animate-spinFast"
        width="120"
        height="120"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="50"
          r="47"
          fill="none"
          stroke="white"
          strokeWidth="4"
          strokeDasharray="283"
          strokeDashoffset="75"
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-lg font-semibold">Processing</span>
    </div>
  );
};

export default Loader;
