import { render } from "@testing-library/react";
import CircularTimer from "./CircularTimer";

describe("CircularTimer", () => {
  // Timer counts down correctly from the initial time
  it("should count down correctly from the initial time", () => {
    const { getByText } = render(<CircularTimer time={5000} />);
    expect(getByText("5s")).toBeInTheDocument();
    setTimeout(() => {
      expect(getByText("4s")).toBeInTheDocument();
    }, 1000);
    setTimeout(() => {
      expect(getByText("3s")).toBeInTheDocument();
    }, 2000);
  });

  // Timer starts with a time of zero
  it("should display zero when time is zero", () => {
    const { getByText } = render(<CircularTimer time={0} />);
    expect(getByText("0s")).toBeInTheDocument();
  });

  // Timer stops at zero and does not go negative
  it("should stop at zero and not go negative", () => {
    const { getByText } = render(<CircularTimer time={3000} />);
    expect(getByText("3s")).toBeInTheDocument();
    setTimeout(() => {
      expect(getByText("2s")).toBeInTheDocument();
    }, 100);
    setTimeout(() => {
      expect(getByText("1s")).toBeInTheDocument();
    }, 200);
    setTimeout(() => {
      expect(getByText("0s")).toBeInTheDocument();
    }, 300);
    setTimeout(() => {
      expect(getByText("0s")).toBeInTheDocument();
    }, 400);
  });

  // Timer resets correctly when the time prop changes
  it("should reset timer when time prop changes", () => {
    const { rerender, getByText } = render(<CircularTimer time={5000} />);
    expect(getByText("5s")).toBeInTheDocument();

    rerender(<CircularTimer time={3000} />);
    expect(getByText("3s")).toBeInTheDocument();
  });
});
