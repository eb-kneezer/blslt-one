import styled from "styled-components";

interface ControlBoxComponentProps {
  handleReset: () => void;
  handleStart: () => void;
}

export const ControlBoxComponent = ({
  handleReset,
  handleStart,
}: ControlBoxComponentProps) => {
  return (
    <ControlBox>
      <ControlButton data-testid="start-button" onClick={handleStart}>
        Start
      </ControlButton>
      <ControlButton data-testid="reset-button" onClick={handleReset}>
        Reset
      </ControlButton>
    </ControlBox>
  );
};

const ControlBox = styled.div`
  position: absolute;
  width: var(--street-width);
  height: var(--street-width);
  background-color: var(--street-color);
  border: 2px solid var(--street-color);

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;

interface ButtonProps {
  $primary?: boolean;
  $size?: "small" | "medium" | "large";
  disabled?: boolean;
  onClick?: () => void;
}

const ControlButton = styled.button<ButtonProps>`
  font-size: 16px;
  padding: 6px 12px;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  background-color: green;
  color: white;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 255, 0, 0.3);
  }
`;
