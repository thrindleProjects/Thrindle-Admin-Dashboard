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
  padding: 10px 8px;
`;

function DoubleDropdown({
  list1,
  list2,
  fieldset,
  emptyState1,
  emptyState2,
  onChange1,
  onChange2,
}) {
  return (
    <Fieldset>
      <legend className="ml-4 px-1 opacity-75">{fieldset}</legend>
      <div className="px-2 py-1">
        <div className="flex justify-between">
          <details className="relative w-[48%] border-[0.98px] border-primary-main px-2 py-1.5 rounded-md cursor-pointer">
            <summary className="text-primary-main cursor-pointer">
              {emptyState1}
            </summary>
            <Box>
              {list1.map((listItems, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={listItems}
                    name={listItems}
                    value={listItems}
                    onChange={(e) => onChange1(e.target.value)}
                    className="align-baseline"
                  />
                  <label htmlFor={listItems} className="pl-2 py-1">
                    {listItems}
                  </label>
                </div>
              ))}{" "}
            </Box>
          </details>

          <details className="relative w-[48%] border-[0.98px] border-primary-main px-2 py-1.5 rounded-md cursor-pointer">
            <summary className="text-primary-main cursor-pointer">
              {emptyState2}
            </summary>
            <Box>
              {list2.map((listItems, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={listItems}
                    name={listItems}
                    value={listItems}
                    onChange={(e) => onChange2(e.target.value)}
                    className="align-baseline"
                  />
                  <label htmlFor={listItems} className="pl-2 py-1">
                    {listItems}
                  </label>
                </div>
              ))}
            </Box>
          </details>
        </div>
      </div>
    </Fieldset>
  );
}

export default DoubleDropdown;
