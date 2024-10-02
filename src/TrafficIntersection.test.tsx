import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import TrafficIntersection from "./TrafficIntersection";

const FULL_CYCLE = 10_000; //10 seconds
const HALF_CYCLE = 5_000; //5 seconds

describe("TrafficIntersection", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // Traffic light cycles from green to red and back to green
  it("should cycle traffic light from green to red and back to green", () => {
    render(<TrafficIntersection />);

    act(() => {
      vi.advanceTimersByTime(11000); // Test wait
    });

    fireEvent.click(screen.getByTestId("start-button"));

    const masterLights = screen.getAllByTestId("traffic-light-master");
    expect(masterLights).toHaveLength(2);

    masterLights.forEach((light) => {
      expect(light.querySelector('[data-testid="green-light"]')).toHaveStyle(
        "background-color: rgb(0, 128, 0)"
      );
      expect(light.querySelector('[data-testid="yellow-light"]')).toHaveStyle(
        "background-color: rgb(200, 156, 44)"
      );
      expect(light.querySelector('[data-testid="red-light"]')).toHaveStyle(
        "background-color: rgb(200, 156, 44)"
      );
    });

    act(() => {
      vi.advanceTimersByTime(FULL_CYCLE);
    });

    masterLights.forEach((light) => {
      expect(light.querySelector('[data-testid="green-light"]')).toHaveStyle(
        "background-color: rgb(200, 156, 44)"
      );
      expect(light.querySelector('[data-testid="yellow-light"]')).toHaveStyle(
        "background-color: rgb(255, 255, 0)"
      );
      expect(light.querySelector('[data-testid="red-light"]')).toHaveStyle(
        "background-color: rgb(200, 156, 44)"
      );
    });

    act(() => {
      vi.advanceTimersByTime(HALF_CYCLE);
    });

    masterLights.forEach((light) => {
      expect(light.querySelector('[data-testid="green-light"]')).toHaveStyle(
        "background-color: rgb(200, 156, 44)"
      );
      expect(light.querySelector('[data-testid="yellow-light"]')).toHaveStyle(
        "background-color: rgb(200, 156, 44)"
      );
      expect(light.querySelector('[data-testid="red-light"]')).toHaveStyle(
        "background-color: rgb(255, 0, 0)"
      );
    });

    act(() => {
      vi.advanceTimersByTime(FULL_CYCLE);
    });

    masterLights.forEach((light) => {
      expect(light.querySelector('[data-testid="green-light"]')).toHaveStyle(
        "background-color: rgb(200, 156, 44)"
      );
      expect(light.querySelector('[data-testid="yellow-light"]')).toHaveStyle(
        "background-color: rgb(255, 255, 0)"
      );
      expect(light.querySelector('[data-testid="red-light"]')).toHaveStyle(
        "background-color: rgb(200, 156, 44)"
      );
    });

    act(() => {
      vi.advanceTimersByTime(HALF_CYCLE);
    });

    masterLights.forEach((light) => {
      expect(light.querySelector('[data-testid="green-light"]')).toHaveStyle(
        "background-color: rgb(0, 128, 0)"
      );
      expect(light.querySelector('[data-testid="yellow-light"]')).toHaveStyle(
        "background-color: rgb(200, 156, 44)"
      );
      expect(light.querySelector('[data-testid="red-light"]')).toHaveStyle(
        "background-color: rgb(200, 156, 44)"
      );
    });
  });

  // handleReset called during a transition
  it("should reset control state when handleReset is called during a transition", () => {
    render(<TrafficIntersection />);

    fireEvent.click(screen.getByTestId("start-button"));

    act(() => {
      vi.advanceTimersByTime(FULL_CYCLE + HALF_CYCLE); // After next half cycle
    });

    fireEvent.click(screen.getByTestId("reset-button"));

    const masterLights = screen.getAllByTestId("traffic-light-master");

    masterLights.forEach((light) => {
      expect(light.querySelector('[data-testid="green-light"]')).toHaveStyle(
        "background-color: rgb(0, 128, 0)"
      );
      expect(light.querySelector('[data-testid="yellow-light"]')).toHaveStyle(
        "background-color: rgb(200, 156, 44)"
      );
      expect(light.querySelector('[data-testid="red-light"]')).toHaveStyle(
        "background-color: rgb(200, 156, 44)"
      );
    });
  });
});
