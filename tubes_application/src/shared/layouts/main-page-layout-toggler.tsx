import { useColorMode, useColorModeValue } from "@/components/ui/color-mode";
import { IconButton } from "@chakra-ui/react";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";

export interface MainLayoutProps {
  title: string;
}

export default function MainPageLayoutToggler() {
  const { toggleColorMode } = useColorMode();
  const icon = useColorModeValue(<MdOutlineDarkMode />, <MdOutlineLightMode />);
  return (
    <IconButton variant="outline" onClick={toggleColorMode} rounded="md" bg="brand">
      {icon}
    </IconButton>
  );
}
