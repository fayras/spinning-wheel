import { Icon, IconProps } from "@chakra-ui/react";

export const Moon = (props: IconProps) => (
  <Icon
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </Icon>
);
