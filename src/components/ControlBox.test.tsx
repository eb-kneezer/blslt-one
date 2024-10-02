import { fireEvent, render, screen } from "@testing-library/react";
import { ControlBoxComponent } from "./ControlBox";

describe("ControlBox", () => {
  // Start button triggers handleStart function when clicked
  it("should trigger handleStart function on Start button click", () => {
    const handleReset = vi.fn();
    const handleStart = vi.fn();

    render(
      <ControlBoxComponent
        handleReset={handleReset}
        handleStart={handleStart}
      />
    );

    fireEvent.click(screen.getByText("Start"));

    expect(handleStart).toHaveBeenCalledTimes(1);
  });

  // Reset button triggers handleReset function when clicked
  it("should trigger handleReset on Reset button click", () => {
    const handleReset = vi.fn();
    const handleStart = vi.fn();

    render(
      <ControlBoxComponent
        handleReset={handleReset}
        handleStart={handleStart}
      />
    );

    fireEvent.click(screen.getByText("Reset"));

    expect(handleReset).toHaveBeenCalledTimes(1);
  });

  // ControlBox contains two ControlButton components
  it("should render ControlBox with two ControlButton components", () => {
    const handleReset = vi.fn();
    const handleStart = vi.fn();

    render(
      <ControlBoxComponent
        handleReset={handleReset}
        handleStart={handleStart}
      />
    );

    expect(screen.getByText("Start")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
  });
});
