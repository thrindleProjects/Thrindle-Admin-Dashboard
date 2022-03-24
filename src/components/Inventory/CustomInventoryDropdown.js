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

function DoubleDropdown({
  list1,
  list2,
  fieldset,
  emptyState1,
  emptyState2,
  onChange,
  inputValue,
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
      <legend className="ml-4 px-1">{fieldset}</legend>
      <div className="px-2 py-1">
        <div className="flex justify-between">
          <details
            ref={sizeRef1}
            className="relative w-48 border-0.98 border-primary-main px-2 py-1.5 rounded-md cursor-pointer"
          >
            <summary className="text-primary-main cursor-pointer">
              {emptyState1}
            </summary>
            <Box className="absolute inset-x-0 top-full mt-1 shadow p-4 h-28 overflow-y-auto">
              {list1.map((listItems, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={inputValue.includes(listItems.title)}
                    id={listItems.title}
                    name={"size"}
                    value={listItems.title}
                    onChange={onChange}
                    className="align-baseline"
                  />
                  <label htmlFor={listItems.title} className="pl-2 py-1">
                    {listItems.title}
                  </label>
                </div>
              ))}{" "}
            </Box>
          </details>

          <details
            ref={sizeRef2}
            className="relative w-48 border-0.98 border-primary-main px-2 py-1.5 rounded-md cursor-pointer"
          >
            <summary className="text-primary-main cursor-pointer">
              {emptyState2}
            </summary>
            <Box className="absolute inset-x-0 top-full mt-1 shadow p-4 h-28 overflow-y-auto">
              {list2.map((listItems, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={inputValue.includes(listItems.title)}
                    id={listItems.title}
                    name={"size"}
                    value={listItems.title}
                    onChange={onChange}
                    className="align-baseline"
                  />
                  <label htmlFor={listItems.title} className="pl-2 py-1">
                    {listItems.title}
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
