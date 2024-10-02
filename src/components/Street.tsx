import styled from "styled-components";

interface StreetProps {
  $vertical?: boolean;
}

export const Street = styled.div<StreetProps>`
  position: absolute;
  background-color: var(--street-color);
  border: 2px solid var(--street-curb-color);
  ${(props) =>
    props.$vertical
      ? "width: var(--street-width); height: 650px; left: 50%; transform: translateX(-50%);"
      : "height: var(--street-width); width: 100%; top: 50%; transform: translateY(-50%);"}

  .label {
    position: relative;
    top: -25px;
  }
`;
