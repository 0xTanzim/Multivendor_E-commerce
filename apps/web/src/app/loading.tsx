const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-2xl text-gray-700">
        <span className="font-bold text-3xl">Loading...</span>
      </p>
      <p className="text-lg text-gray-600 text-center mt-2">
        <span className="font-light">
          We are fetching the latest data for you.
        </span>
        <br />
      </p>
    </div>
  );
};

export default Loading;
