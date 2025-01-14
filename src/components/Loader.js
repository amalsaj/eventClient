const Loader = () => {
    return (
        <div className="flex justify-center items-center">
        <div className="relative w-16 h-16">
          <div className="absolute w-16 h-16 border-4 border-t-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
          <div className="absolute w-8 h-8 bg-blue-500 rounded-full opacity-75 animate-ping"></div>
        </div>
      </div>
    );
  };
  
  export default Loader;
  