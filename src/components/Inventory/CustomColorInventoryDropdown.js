import { useEffect, useRef } from "react";
import styled from "styled-components";

const Fieldset = styled.fieldset`
  width: 100%;
  border: 0.98px solid #20639b;
  color: #2f3133;
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  padding: 0 5px 5px;
`;

const Box = styled.div`
  background: white;
`;

function CustomColorDropdown({
  list,
  fieldset,
  emptyState,
  onChange,
  inputValue,
}) {
  const colorRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (colorRef.current) {
        if (!colorRef.current.contains(e.target)) {
          return (colorRef.current.open = false);
        }
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <Fieldset>
      <legend className="ml-4 px-1">{fieldset}</legend>
      <div className="px-2 py-1">
        <div className="flex justify-between">
          <details
            ref={colorRef}
            className="relative w-full border-0.98 border-primary-main px-2 py-1.5 rounded-md cursor-pointer"
          >
            <summary className="text-primary-main cursor-pointer">
              {emptyState}
            </summary>
            <Box className="absolute inset-x-0 top-full mt-1 shadow p-4 h-56 overflow-y-auto">
              {list.map((listItems, index) => (
                <div
                  className="flex items-center justify-between py-1 w-full"
                  key={index}
                >
                  <div>
                    <input
                      checked={inputValue.includes(listItems.hex)}
                      type="checkbox"
                      id={listItems.hex}
                      name={"color"}
                      value={listItems.hex}
                      onChange={onChange}
                      className="align-baseline"
                    />
                    <label htmlFor={listItems.hex} className="pl-2">
                      {listItems.name}
                    </label>
                  </div>
                  <div
                    style={{
                      backgroundColor: `${listItems.hex}`,
                      width: "20px",
                      height: "20px",
                      marginLeft: "30px",
                    }}
                  ></div>
                </div>
              ))}{" "}
            </Box>
          </details>
        </div>
      </div>
    </Fieldset>
  );
}

export default CustomColorDropdown;
