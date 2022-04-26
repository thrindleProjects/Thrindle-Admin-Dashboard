const SelectedColors = ({ colors, removeColor }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {colors.map((item, index) => {
        return (
          <div
            key={index}
            className={`flex flex-row flex-nowrap items-center gap-1`}
          >
            <div
              key={item}
              className="w-5 h-5 rounded-full cursor-pointer border-0.98 border-white-tableHeader"
              style={{ backgroundColor: `${item}` }}
            ></div>
            <svg
              className="inline-block align-middle w-4 h-4 cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => removeColor(item)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
};

export default SelectedColors;
