import { Theme, Grid, GridItem } from "@chakra-ui/react";
import React from "react";

export interface CarouselSopPageLayoutProps {
  timeComponent: React.ReactNode;
  headerComponent: React.ReactNode;
  carouselComponent: React.ReactNode;
  menuComponent: React.ReactNode;

  loaderComponent: React.ReactNode;
  notFoundComponent: React.ReactNode;
  isLoading: boolean;
  isNotFound: boolean;
}
export default function CarouselSopPageLayout(props: CarouselSopPageLayoutProps) {
  return (
    <Theme appearance="dark">
      <Grid h="100vh" w="100wv" templateRows="repeat(28, 1fr)" templateColumns="repeat(24, 1fr)" gap={2}>
        <GridItem rowSpan={1} colSpan={24}>
          {props.timeComponent}
        </GridItem>
        <GridItem rowSpan={2} colSpan={24}>
          {props.headerComponent}
        </GridItem>
        <GridItem rowSpan={1} colSpan={24}></GridItem>
        {!props.isLoading && !props.isNotFound && (
          <React.Fragment>
            <GridItem rowSpan={14} colSpan={24}>
              {props.carouselComponent}
            </GridItem>
            <GridItem rowSpan={7} colSpan={24}></GridItem>
            <GridItem rowSpan={2} colSpan={24}>
              {props.menuComponent}
            </GridItem>
            <GridItem rowSpan={1} colSpan={24}></GridItem>
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
