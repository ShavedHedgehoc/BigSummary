import { Button, VStack, Icon, Text } from "@chakra-ui/react";

export interface MenuButtonProps {
  title: string;
  icon: React.ReactNode;
  disabled: boolean;
  action: () => void;
}
export default function MenuButton(props: MenuButtonProps) {
  return (
    <Button
      variant="subtle"
      px={12}
      py={12}
      backgroundColor="bg"
      disabled={props.disabled}
      onClick={(e) => {
        e.currentTarget.blur();
        props.action();
      }}
    >
      <VStack>
        <Icon size="2xl" color="fg.subtle">
          {props.icon}
        </Icon>
        <Text textStyle="md" color="fg.subtle">
          {props.title}
        </Text>
      </VStack>
    </Button>
  );
}
