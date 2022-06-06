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
  &:focus-within {
    border: 1px solid #f39e28;
    box-shadow: 3px 4px 10px rgba(237, 56, 51, 0.25);
  }
`;

const Box = styled.div`
  background: white;
  position: absolute;
  width: 100%;
  height: 180px;
  overflow-y: scroll;
  border-radius: 10px;
  margin-top: 0.3rem;
  top: 100%;
  left: -5px;
  z-index: 50;
  font-size: 16px;
  padding: 10px 8px;
  box-shadow: 1px 1px 2px 2px #ccc;

  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

function DoubleDropdown({
  list1,
  list2,
  fieldset,
  emptyState1,
  emptyState2,
  onChange1,
  onChange2,
  currentSize,
  removeSize1,
  removeSize2,
}) {
  const sizeRef1 = useRef(null);
  const sizeRef2 = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sizeRef1.current && sizeRef2.current) {
        if (!sizeRef1.current.contains(e.target)) {
          sizeRef1.current.open = false;
        }
        if (!sizeRef2.current.contains(e.target)) {
          sizeRef2.current.open = false;
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, []);

  return (
    <Fieldset>
      <legend className="ml-4 px-1 opacity-75">{fieldset}</legend>
      <div className="px-2 py-1">
        <div className="flex justify-between">
          <details
            className="relative w-49 border-0.98 border-primary-main px-2 py-1.5 rounded-md cursor-pointer"
            ref={sizeRef1}
          >
            {currentSize.size1.length > 0 ? (
              <summary
                style={{ listStyle: "none" }}
                className="flex flex-wrap gap-1 items-center"
              >
                {currentSize.size1.map((item, index) => (
                  <span
                    key={index}
                    className="bg-primary-light mr-1 px-1 py-0.5 rounded-lg text-xs text-white-main"
                  >
                    <span className="align-middle border-r pr-1"> {item}</span>
                    <svg
                      className="inline-block align-middle w-4 h-4 pl-1 cursor-pointer"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => removeSize1(item)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </span>
                ))}
              </summary>
            ) : (
              <summary className="text-primary-main cursor-pointer">
                {emptyState1}
              </summary>
            )}
            <Box>
              {list1.map((listItems, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={currentSize.size1.includes(listItems)}
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

          <details
            className="relative w-49 border-0.98 border-primary-main px-2 py-1.5 rounded-md cursor-pointer"
            ref={sizeRef2}
          >
            {currentSize.size2.length > 0 ? (
              <summary
                style={{ listStyle: "none" }}
                className="flex flex-wrap gap-1 items-center"
              >
                {currentSize.size2.map((item, index) => (
                  <span
                    key={index}
                    className="bg-primary-light mr-1 px-1 py-0.5 rounded-md text-xs text-white-main"
                  >
                    <span className="align-middle border-r pr-1"> {item}</span>
                    <svg
                      className="inline-block align-middle w-4 h-4 pl-1 cursor-pointer"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => removeSize2(item)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </span>
                ))}
              </summary>
            ) : (
              <summary className="text-primary-main cursor-pointer">
                {emptyState2}
              </summary>
            )}
            <Box>
              {list2.map((listItems, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={currentSize.size2.includes(listItems)}
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
