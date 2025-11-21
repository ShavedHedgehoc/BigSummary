import { Grid, GridItem, Theme } from "@chakra-ui/react";
import React from "react";

export interface InputParametersModalLayoutProps {
  headerComponent: React.ReactNode;
  parameterComponent: React.ReactNode;
  materialPieChartComponent: React.ReactNode;
  productionLineChartComponent: React.ReactNode;
  productionCardComponent: React.ReactNode;
  menuComponent: React.ReactNode;
  userComponent: React.ReactNode;
  loaderComponent: React.ReactNode;
  notFoundComponent: React.ReactNode;
  isLoading: boolean;
  isNotFound: boolean;
}

export default function InputParametersModalLayout(props: InputParametersModalLayoutProps) {
  return (
    <Theme appearance="dark" colorPalette="teal" h="full">
      <Grid
        h="full"
        w="full"
        templateRows="repeat(28, 1fr)"
        templateColumns="repeat(24, 1fr)"
        gap={2}
        backgroundColor="green"
      >
        <GridItem rowSpan={3} colSpan={24}>
          {props.headerComponent}
        </GridItem>
        {!props.isLoading && !props.isNotFound && (
          <React.Fragment>
            <GridItem rowSpan={1} colSpan={24}></GridItem>
            <GridItem rowSpan={12} colSpan={24}>
              {props.parameterComponent}
            </GridItem>
            <GridItem rowSpan={8} colSpan={8}>
              {props.materialPieChartComponent}
            </GridItem>
            <GridItem rowSpan={8} colSpan={8}>
              {props.productionLineChartComponent}
            </GridItem>
            <GridItem rowSpan={8} colSpan={8}>
              {props.productionCardComponent}
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
