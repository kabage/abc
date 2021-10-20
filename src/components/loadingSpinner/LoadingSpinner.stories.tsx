import { ComponentStory } from "@storybook/react";
import LoadingSpinner from ".";

export default {
  title: "Components/Loading Spinner",
  component: LoadingSpinner,
};

const Template: ComponentStory<typeof LoadingSpinner> = (args: any) => (
  <LoadingSpinner {...args} />
);

export const DefaultLoadingSpinner = Template.bind({});
