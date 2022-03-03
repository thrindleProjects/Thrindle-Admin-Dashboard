import React from "react";
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
  background: #949494;
  position: absolute;
  width: 100%;
  height: 180px;
  overflow-y: scroll;
  border-radius: 10px;
  top: 32px;
  color: white;
  z-index: 50;
  font-size: 16px;
  padding: 14px;
`;

function SingleDropdown({colors, fieldset, emptyState, onChange}) {
  return (
    <Fieldset>
      <legend className="ml-4 px-1 opacity-75">{fieldset}</legend>
      <div className="px-2 py-1">
        <div>
          <details className="relative w-full border-[0.98px] border-primary-main cursor-pointery-main px-2 py-1.5 rounded-md ">
            <summary className="text-primary-main cursor-pointer">
              {emptyState}
            </summary>
            <Box>
              {colors.map((color, index) => (
                <div
                  className="flex items-center justify-between py-1"
                  key={index}>
                  <div>
                    <input
                      type="checkbox"
                      id={color.hex}
                      name={color.name}
                      value={color.hex}
                      onChange={e => onChange(e.target.value)}
                      className="align-baseline"
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
                    }}></div>
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
