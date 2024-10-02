import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

interface TimerProps {
  time: number;
  size?: number;
  strokeWidth?: number;
  backgroundColor?: string;
  foregroundColor?: string;
}

const CircularTimer: React.FC<TimerProps> = ({
  time,
  size = 50,
  strokeWidth = 3,
  backgroundColor = "#e0e0e0",
  foregroundColor = "#3f51b5",
}) => {
  const [timeLeft, setTimeLeft] = useState(time);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 100) clearInterval(timer);
        return prevTime - 100;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    setTimeLeft(time);
  }, [time]);

  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (timeLeft / time) * circumference;

  return (
    <CircularTimerContainer data-testid="circular-timer" size={size}>
      <svg width={size} height={size}>
        <CircularTimerTrack
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          $strokeWidth={strokeWidth}
        />
        <CircularTimerIndicator
          cx={size / 2}
          cy={size / 2}
          r={radius}
          $strokeWidth={strokeWidth}
          $progress={progress}
          $foregroundcolor={foregroundColor}
        />
      </svg>
      <TimerText>{Math.ceil(timeLeft / 1000)}s</TimerText>
    </CircularTimerContainer>
  );
};

export default CircularTimer;

const CircularTimerContainer = styled.div<{ size: number }>`
  position: relative;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const CircularTimerTrack = styled.circle<{ $strokeWidth: number }>`
  fill: none;
  stroke-width: ${(props) => props.$strokeWidth}px;
`;

const CircularTimerIndicator = styled(CircularTimerTrack)<{
  $progress: number;
  $strokeWidth: number;
  $foregroundcolor: string;
}>`
  stroke-dasharray: ${(props) => props.$progress} 283;
  transition: stroke-dasharray 0.1s linear;
  transform-origin: center;
  animation: ${rotateAnimation} 4s linear infinite;
  stroke: ${(props) => props.$foregroundcolor};
`;

const TimerText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  font-weight: bold;
`;
