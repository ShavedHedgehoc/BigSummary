import { Grid, GridItem, Theme } from "@chakra-ui/react";

export interface PageLayoutProps {
  timeComponent: React.ReactNode;
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

export default function PageLayout(props: PageLayoutProps) {
  return (
    <Theme appearance="dark" colorPalette="teal">
      <Grid h="100vh" w="100wv" templateRows="repeat(28, 1fr)" templateColumns="repeat(24, 1fr)" gap={2}>
        <GridItem rowSpan={1} colSpan={24}>
          {props.timeComponent}
        </GridItem>
        <GridItem rowSpan={2} colSpan={24}>
          {props.headerComponent}
        </GridItem>
        {!props.isLoading && !props.isNotFound && (
          <>
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
          </>
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
