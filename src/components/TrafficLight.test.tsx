import { render } from "@testing-library/react";
import { TrafficLightComponent } from "./TrafficLight";

describe("TrafficLight", () => {
  // Renders correctly with default props
  it("should render correctly with default props", () => {
    const { container } = render(
      <TrafficLightComponent
        position="top"
        type="master"
        isTransiting={false}
        state={{ curr: "red", prev: "green" }}
      />
    );
    expect(container).toMatchSnapshot();
  });

  // Display red light when curr state is red and type is master
  it("should display red light when state is red and type is master", () => {
    const { container } = render(
      <TrafficLightComponent
        position="top"
        type="master"
        isTransiting={false}
        state={{ curr: "red", prev: "green" }}
      />
    );
    const redLight = container.querySelector('[data-testid="red-light"]');
    expect(redLight).toHaveStyle("background-color: rgb(255, 0, 0)");
  });

  // Displays green light when curr state is green and type is master
  it("should display green light when state is green and type is master", () => {
    const { container } = render(
      <TrafficLightComponent
        position="top"
        type="master"
        isTransiting={false}
        state={{ curr: "green", prev: "red" }}
      />
    );
    const greenLight = container.querySelector('[data-testid="green-light"]');
    expect(greenLight).toHaveStyle("background-color: rgb(0, 128, 0)");
  });

  // Display red light when curr state is red and type is slave
  it("should display green light when state is red and type is slave", () => {
    const { container } = render(
      <TrafficLightComponent
        position="top"
        type="slave"
        isTransiting={false}
        state={{ curr: "red", prev: "green" }}
      />
    );
    const greenLight = container.querySelector('[data-testid="green-light"]');
    expect(greenLight).toHaveStyle("background-color: rgb(0, 128, 0)");
  });

  // Displays green light when curr state is green and type is slave
  it("should display red light when state is green and type is slave", () => {
    const { container } = render(
      <TrafficLightComponent
        position="top"
        type="slave"
        isTransiting={false}
        state={{ curr: "green", prev: "red" }}
      />
    );
    const redLight = container.querySelector('[data-testid="red-light"]');
    expect(redLight).toHaveStyle("background-color: rgb(255, 0, 0)");
  });

  // Shows yellow light when isTransiting is true
  it("should show yellow light when isTransiting is true", () => {
    const { container } = render(
      <TrafficLightComponent
        position="top"
        type="master"
        isTransiting={true}
        state={{ curr: "green", prev: "red" }}
      />
    );
    const yellowLight = container.querySelector('[data-testid="yellow-light"]');
    expect(yellowLight).toHaveStyle("background-color: rgb(255, 255, 0)");
  });

  // Pedestrian indicator shows walk when light is red
  it("should show walk indicator when light is red", () => {
    const { getByText } = render(
      <TrafficLightComponent
        position="top"
        type="master"
        isTransiting={false}
        state={{ curr: "red", prev: "green" }}
      />
    );
    const walkIndicator = getByText("👟");
    expect(walkIndicator).toBeInTheDocument();
  });

  // Pedestrian indicator shows stop when light is green
  it("should show stop pedestrian indicator when light is green", () => {
    const { getByText } = render(
      <TrafficLightComponent
        position="top"
        type="master"
        isTransiting={false}
        state={{ curr: "green", prev: "red" }}
      />
    );
    expect(getByText("✋")).toBeInTheDocument();
  });
});
