import { Theme, Grid, GridItem, Center, Heading } from "@chakra-ui/react";
import React from "react";

export interface PrintPageLayoutProps {
  timeComponent: React.ReactNode;
  headerComponent: React.ReactNode;
  mainComponent: React.ReactNode;
  menuComponent: React.ReactNode;
  userComponent: React.ReactNode;
  loaderComponent: React.ReactNode;
  notFoundComponent: React.ReactNode;
  isLoading: boolean;
  isNotFound: boolean;
}
export default function PrintPageLayout(props: PrintPageLayoutProps) {
  return (
    <Theme appearance="dark">
      <Grid h="100vh" w="100wv" templateRows="repeat(28, 1fr)" templateColumns="repeat(24, 1fr)" gap={2}>
        <GridItem rowSpan={1} colSpan={24}>
          {props.timeComponent}
        </GridItem>
        <GridItem rowSpan={2} colSpan={24}>
          {props.headerComponent}
        </GridItem>
        <GridItem rowSpan={3} colSpan={24}>
          <Center h="full">
            <Heading size="2xl" color="fg.subtle">
              Печать ярлыков
            </Heading>
          </Center>
        </GridItem>
        {!props.isLoading && !props.isNotFound && (
          <React.Fragment>
            <GridItem rowSpan={18} colSpan={24}>
              {props.mainComponent}
            </GridItem>
            <GridItem rowSpan={1} colSpan={24}></GridItem>
            <GridItem rowSpan={2} colSpan={24}>
              {props.menuComponent}
            </GridItem>
            <GridItem rowSpan={1} colSpan={24}>
              {props.userComponent}
            </GridItem>
          </React.Fragment>
        )}
        {props.isLoading && (
          <GridItem rowSpan={25} colSpan={24}>
            {props.loaderComponent}
          </GridItem>
        )}
        {props.isNotFound && (
          <GridItem rowSpan={25} colSpan={24}>
            {props.notFoundComponent}
          </GridItem>
        )}
      </Grid>
    </Theme>
  );
}
