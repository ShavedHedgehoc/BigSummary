import { Grid, GridItem } from "@chakra-ui/react";

export interface ExtrusionLayoutProps {
  product: React.ReactNode;
  picture: React.ReactNode;
  time: React.ReactNode;
  date: React.ReactNode;
  user: React.ReactNode;
  reglament: React.ReactNode;
  current: React.ReactNode;
  note: React.ReactNode;
  material: React.ReactNode;
  menu: React.ReactNode;
  quality: React.ReactNode;
}

export default function ExtrusionLayout({ props }: { props: ExtrusionLayoutProps }) {
  return (
    <Grid maxH="100%" w="100%" templateRows="repeat(12, 1fr)" templateColumns="repeat(24, 1fr)" gap={2}>
      <GridItem colSpan={5} rowSpan={3}>
        {props.product}
      </GridItem>
      <GridItem colSpan={18} rowSpan={3}>
        {props.reglament}
      </GridItem>
      <GridItem colSpan={1} rowSpan={12}>
        {props.menu}
      </GridItem>
      <GridItem colSpan={5} rowSpan={6}>
        {props.picture}
      </GridItem>
      <GridItem colSpan={18} rowSpan={3}>
        {props.current}
      </GridItem>
      <GridItem colSpan={9} rowSpan={3}>
        {props.quality}
      </GridItem>
      <GridItem colSpan={9} rowSpan={6}>
        {props.material}
      </GridItem>
      <GridItem colSpan={5} rowSpan={1}>
        {props.date}
      </GridItem>
      <GridItem colSpan={9} rowSpan={3}>
        {props.note}
      </GridItem>
      <GridItem colSpan={5} rowSpan={1}>
        {props.time}
      </GridItem>
      <GridItem colSpan={5} rowSpan={1}>
        {props.user}
      </GridItem>
    </Grid>
  );
}
