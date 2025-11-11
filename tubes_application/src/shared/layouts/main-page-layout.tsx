import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import MainPageLayoutToggler from "./main-page-layout-toggler";

export interface MainLayoutProps {
  title: string;
}

export default function MainPageLayout({ props, children }: { props: MainLayoutProps; children: React.ReactNode }) {
  return (
    <Grid
      h="100vh"
      w="100wv"
      templateRows="repeat(24, 1fr)"
      templateColumns="repeat(12, 1fr)"
      backgroundColor="bg.info"
    >
      <GridItem rowSpan={1} colSpan={12} paddingY={2} paddingX={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Heading size="2xl">{props.title}</Heading>
          <MainPageLayoutToggler />
        </Box>
      </GridItem>

      <GridItem rowSpan={23} colSpan={12} backgroundColor="bg" padding={2}>
        {children}
      </GridItem>
    </Grid>
  );
}
