

const Loading = () => {
  return (
    <div className="flex flex-row justify-center items-center h-screen">
      <p className="text-5xl font-semibold">L</p>
      <div className="border-white h-10 w-10 animate-spin rounded-full border-8 border-t-yellow-500" />
      <p className="text-5xl font-semibold">ADING</p>
    </div>
  );
};

export default Loading;
