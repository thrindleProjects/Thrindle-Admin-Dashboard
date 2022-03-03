import LoadGif from "../../../assets/images/Loader.gif";

const Loader = () => {
  return (
    <div className='flex items-center justify-center mt-24 mx-auto w-16'>
      <img src={LoadGif} alt='Loader' />
    </div>
  );
};

export default Loader;
