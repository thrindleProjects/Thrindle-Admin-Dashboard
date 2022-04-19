import React, { useEffect, useRef } from "react";
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
  position: absolute;
  width: 100%;
  height: 400px;
  overflow-y: scroll;
  border-radius: 10px;
  margin-top: 0.3rem;
  top: 100%;
  left: 0;
  z-index: 50;
  font-size: 16px;
  padding: 14px;
  box-shadow: 1px 1px 2px 2px #ccc;

  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

function SingleDropdown({
  colors,
  fieldset,
  emptyState,
  onChange,
  mainColors,
  removeColor,
}) {
  const colorRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (colorRef.current && !colorRef.current.contains(e.target)) {
        colorRef.current.open = false;
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  console.log(colors);
  return (
    <Fieldset>
      <legend className="ml-4 px-1 opacity-75">{fieldset}</legend>
      <div className="px-2 py-1">
        <div>
          <details
            className="relative w-full border-[0.98px] border-primary-main cursor-pointer px-2 py-1.5 rounded-md "
            ref={colorRef}
          >
            {colors.length > 0 ? (
              <summary
                style={{ listStyle: "none" }}
                className="flex flex-wrap items-center gap-1"
              >
                {colors.map((item, index) => (
                  <div key={index} className="mr-2">
                    <span
                      key={index}
                      style={{
                        display: "inline-block",
                        backgroundColor: `${item}`,
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        verticalAlign: "middle",
                        marginRight: "0.1em",
                      }}
                    ></span>
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
                ))}
              </summary>
            ) : (
              <summary className="text-primary-main cursor-pointer">
                {emptyState}
              </summary>
            )}

            <Box>
              {mainColors.map((color, index) => (
                <div
                  className="flex items-center justify-between py-1"
                  key={index}
                >
                  <div>
                    <input
                      type="checkbox"
                      checked={colors.includes(color.hex)}
                      id={color.hex}
                      name={color.name}
                      value={color.hex}
                      onChange={(e) => onChange(e.target.value)}
                      className="align-baseline cursor-pointer"
                    />
                    <label htmlFor={color.name} className="pl-2">
                      {color.name}
                    </label>
                  </div>

                  <div
                    style={{
                      backgroundColor: `${color.hex}`,
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

export default SingleDropdown;
