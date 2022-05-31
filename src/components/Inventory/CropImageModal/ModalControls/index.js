import styled from "styled-components";

const ModalControls = ({
  onZoomChange,
  handleReset,
  handleCrop,
  zoom,
  aspect,
  onAspectChange,
  possibleAspectRatios,
  activeImage,
}) => {
  return (
    <div className="w-full flex flex-col items-center gap-2">
      <div className="w-full flex items-center justify-center gap-2">
        <input
          className="w-1/2 flex-shrink-0"
          type="range"
          name="range"
          id="range"
          min={1}
          max={3}
          step={0.01}
          value={zoom}
          onInput={(e) => onZoomChange(e.target.value)}
        />
        <select
          className="rounded-md flex-shrink-0"
          name="aspect"
          id="aspect"
          value={aspect.name}
          onChange={onAspectChange}
        >
          {possibleAspectRatios.map((ratio) => (
            <option key={ratio.name} value={ratio.name}>
              {ratio.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-2">
        {!!activeImage.original && (
          <ModalButton
            className="border border-secondary-yellow text-secondary-yellow"
            onClick={handleReset}
          >
            Reset
          </ModalButton>
        )}
        <ModalButton
          className="bg-primary-main text-white-main"
          onClick={handleCrop}
        >
          Crop
        </ModalButton>
      </div>
    </div>
  );
};

export default ModalControls;

const ModalButton = styled.button`
  padding: 0.5rem 1.75rem;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
`;
