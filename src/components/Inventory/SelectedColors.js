const SelectedColors = ({ colors, removeColor }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {colors.map((item) => {
        return (
          <div
            key={item}
            className="w-8 h-8 rounded-full cursor-pointer"
            style={{ backgroundColor: `${item}` }}
            onClick={() => removeColor(item)}
          ></div>
        );
      })}
    </div>
  );
};

export default SelectedColors;
