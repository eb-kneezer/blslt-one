import styled, { css, keyframes } from "styled-components";

type TrafficLightPosition = "top" | "right" | "bottom" | "left";
type TrafficLightType = "master" | "slave";

type MainStateColors = "red" | "green";
export interface ControlState {
  prev: MainStateColors;
  curr: MainStateColors;
}

interface TrafficLightComponentProps {
  position: TrafficLightPosition;
  type: TrafficLightType;
  isTransiting: boolean;
  state: ControlState;
}

export const TrafficLightComponent: React.FC<TrafficLightComponentProps> = ({
  position,
  type,
  isTransiting,
  state,
}) => {
  const isRed =
    type === "master" ? state.curr === "red" : state.curr === "green";
  const isGreen =
    type === "master" ? state.curr === "green" : state.curr === "red";

  const style: React.CSSProperties = {
    top: position === "top" ? "20px" : position === "bottom" ? "auto" : "50%",
    bottom: position === "bottom" ? "20px" : "auto",
    left: position === "left" ? "20px" : position === "right" ? "auto" : "50%",
    right: position === "right" ? "20px" : "auto",
    transform: `${
      position === "left" || position === "right"
        ? "translateY(-50%)"
        : "translateX(-50%)"
    }`,
  };

  const indicatorStyle: React.CSSProperties = {
    top: position === "top" ? "100%" : "auto",
    bottom: position === "bottom" ? "100%" : "auto",
    left: position === "left" ? "100%" : "auto",
    right: position === "right" ? "100%" : "auto",
  };

  return (
    <TrafficLightWrapper data-testid={`traffic-light-${type}`} style={style}>
      <TrafficLight>
        <Light
          data-testid="red-light"
          $color="red"
          $active={isRed && !isTransiting}
        />
        <Light
          data-testid="yellow-light"
          $color="yellow"
          $active={isTransiting}
        />
        <Light
          data-testid="green-light"
          $color="green"
          $active={isGreen && !isTransiting}
        />
        <PedestrianIndicator
          style={indicatorStyle}
          $state={isRed ? "walk" : "stop"}
          $transiting={isTransiting}
        >
          {isRed ? "👟" : "✋"}
        </PedestrianIndicator>
      </TrafficLight>
    </TrafficLightWrapper>
  );
};

const TrafficLightWrapper = styled.div`
  position: absolute;
`;

const TrafficLight = styled.div`
  width: 40px;
  background-color: #fbc336;
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: space-around;
  align-items: center;
  padding: 5px 0;
  border-radius: 8px;
  position: relative;
`;

interface LightProps {
  $color: string;
  $active: boolean;
}

const Light = styled.div<LightProps>`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: ${(props) => (props.$active ? props.$color : "#c89c2c")};
`;

interface PedestrianIndicatorProps {
  $state: "stop" | "walk";
  $transiting: boolean;
}

const blink = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
`;

const PedestrianIndicator = styled.div<PedestrianIndicatorProps>`
  font-size: 25px;
  position: absolute;
  ${(props) =>
    props.$transiting &&
    css`
      animation: ${blink} 1s ease-in-out infinite;
    `}
`;
