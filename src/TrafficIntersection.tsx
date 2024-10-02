import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CircularTimer from "./components/CircularTimer";
import { Street } from "./components/Street";
import { ControlState, TrafficLightComponent } from "./components/TrafficLight";
import { ControlBoxComponent } from "./components/ControlBox";

const IntersectionContainer = styled.div`
  position: relative;
  width: 90%;
  max-width: 650px;
  height: 650px;
  margin: 5rem auto;
  aspect-ratio: 1;
`;

const defaultControlState = {
  prev: "red",
  curr: "green",
} as const;

const FULL_CYCLE = 10_000; //10 seconds
const HALF_CYCLE = 5_000; //5 seconds

const TrafficIntersection: React.FC = () => {
  const [cycle, setCycle] = useState<"full" | "half">();

  const [controlState, setControlState] =
    useState<ControlState>(defaultControlState);
  const [isTransiting, setIsTransiting] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (cycle === "full") {
      timer = setTimeout(() => {
        setIsTransiting(true);

        setCycle("half");
      }, FULL_CYCLE);
    }

    if (cycle === "half") {
      timer = setTimeout(() => {
        setIsTransiting(false);

        if (controlState.curr === "green") {
          setControlState({
            prev: "green",
            curr: "red",
          });
        } else {
          setControlState({
            prev: "red",
            curr: "green",
          });
        }

        setCycle("full");
      }, HALF_CYCLE);
    }

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cycle]);

  const handleReset = () => {
    setControlState(defaultControlState);
    setIsTransiting(false);
    setCycle(undefined);
  };

  const handleStart = () => {
    setCycle("full");
  };

  return (
    <>
      <CircularTimer
        time={cycle === "full" ? FULL_CYCLE : cycle === "half" ? HALF_CYCLE : 0}
      />
      <IntersectionContainer>
        <Street $vertical>
          <h3 className="label">Street A</h3>
        </Street>
        <Street>
          <h3 className="label">Street B</h3>
        </Street>
        <ControlBoxComponent
          handleStart={handleStart}
          handleReset={handleReset}
        />
        <TrafficLightComponent
          type="master"
          position="top"
          isTransiting={isTransiting}
          state={controlState}
        />
        <TrafficLightComponent
          type="master"
          position="bottom"
          isTransiting={isTransiting}
          state={controlState}
        />

        <TrafficLightComponent
          type="slave"
          position="right"
          isTransiting={isTransiting}
          state={controlState}
        />
        <TrafficLightComponent
          type="slave"
          position="left"
          isTransiting={isTransiting}
          state={controlState}
        />
      </IntersectionContainer>
    </>
  );
};

export default TrafficIntersection;
