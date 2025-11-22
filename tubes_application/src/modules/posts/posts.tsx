import { ColorModeProvider } from "@/components/ui/color-mode";
import { PostNames } from "@/shared/helpers/post-names";
import type { Params } from "@/shared/router/params";
import { RouteNames } from "@/shared/router/route-names";
import { Theme, Grid, GridItem, Text, Button, VStack, Heading, Center } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

export default function Posts() {
  const params = useParams<Params.CONVEYOR_NAME>();
  const navigate = useNavigate();

  return (
    <ColorModeProvider forcedTheme="dark">
      <Theme appearance="dark" colorPalette="gray">
        <Grid h="100vh" w="100wv" templateRows="repeat(12, 1fr)" templateColumns="repeat(12, 1fr)" gap={2}>
          <GridItem rowSpan={1} colSpan={12}></GridItem>
          <GridItem rowSpan={1} colSpan={12}>
            <VStack>
              <Heading size="4xl" color="fg.subtle">
                Выберите пост
              </Heading>
            </VStack>
          </GridItem>
          <GridItem rowSpan={10} colSpan={12}>
            <Center w="full">
              <VStack gap={4} w="1/2">
                <Button
                  size="2xl"
                  w="full"
                  variant="surface"
                  colorPalette="current"
                  onClick={() => navigate(`${RouteNames.EXTRUSION_ROOT}/${params.conveyor_name}`)}
                >
                  <Text textStyle="2xl" color="fg.subtle">
                    {PostNames.EXTRUSION}
                  </Text>
                </Button>
                <Button
                  size="2xl"
                  w="full"
                  variant="surface"
                  colorPalette="current"
                  onClick={() => navigate(`${RouteNames.VARNISH_ROOT}/${params.conveyor_name}`)}
                >
                  <Text textStyle="2xl" color="fg.subtle">
                    {PostNames.VARNISH}
                  </Text>
                </Button>
                <Button
                  size="2xl"
                  w="full"
                  variant="surface"
                  colorPalette="current"
                  onClick={() => navigate(`${RouteNames.OFFSET_ROOT}/${params.conveyor_name}`)}
                >
                  <Text textStyle="2xl" color="fg.subtle">
                    {PostNames.OFFSET}
                  </Text>
                </Button>
                <Button
                  size="2xl"
                  w="full"
                  variant="surface"
                  colorPalette="current"
                  onClick={() => navigate(`${RouteNames.SEALANT_ROOT}/${params.conveyor_name}`)}
                >
                  <Text textStyle="2xl" color="fg.subtle">
                    {PostNames.SEALANT}
                  </Text>
                </Button>
              </VStack>
            </Center>
          </GridItem>
        </Grid>
      </Theme>
    </ColorModeProvider>
  );
}
