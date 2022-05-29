const Timestamps = ({ uploadDate }) => {
  return (
    <>
      <p className="text-white-text">
        Upload Date:{" "}
        <span className="font-medium text-primary-dark">{uploadDate}</span>
      </p>
    </>
  );
};

export default Timestamps;
