import { ColorModeProvider } from "@/components/ui/color-mode";
import { useConveyors } from "@/shared/api/use-conveyors";
import Loader from "@/shared/components/info/loader";
import { AppMessages } from "@/shared/resources/app-messages";
import { RouteNames } from "@/shared/router/route-names";
import { Theme, Grid, GridItem, Text, Button, VStack, Heading, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { data, isPending, isSuccess } = useConveyors();
  const navigate = useNavigate();
  if (isPending) return <Loader />;
  return (
    <ColorModeProvider forcedTheme="dark">
      <Theme appearance="dark" colorPalette="gray">
        <Grid h="100vh" w="100wv" templateRows="repeat(12, 1fr)" templateColumns="repeat(12, 1fr)" gap={2}>
          <GridItem rowSpan={1} colSpan={12}></GridItem>
          <GridItem rowSpan={1} colSpan={12}>
            <VStack>
              <Heading size="4xl" color="fg.subtle">
                Выберите конвейер
              </Heading>
            </VStack>
          </GridItem>
          <GridItem rowSpan={10} colSpan={12}>
            {isSuccess && data ? (
              <Center w="full">
                <VStack gap={4} w="1/2">
                  {data.map((item) => (
                    <Button
                      size="2xl"
                      w="full"
                      variant="surface"
                      colorPalette="current"
                      onClick={() => navigate(`${RouteNames.POSTS_ROOT}/${item.name}`)}
                    >
                      <Text textStyle="2xl" color="fg.subtle">{`Конвейер ${item.name}`}</Text>
                    </Button>
                  ))}
                </VStack>
              </Center>
            ) : (
              <Text textStyle="2xl" color="fg.subtle">
                {AppMessages.CONVEYORS_NOT_FOUND}
              </Text>
            )}
          </GridItem>
        </Grid>
      </Theme>
    </ColorModeProvider>
  );
}
