import LoadGif from "../../../assets/images/Loader.gif";

const Loader = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <img src={LoadGif} alt="Loader" className="animate-bounce" />
    </div>
  );
};

export default Loader;
