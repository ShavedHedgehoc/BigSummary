import { useExtrusionEmployeeStore } from "./store/use-extrusion-employee-store";
import { useExtrusionAuthModalStore } from "./store/use-extrusion-auth-modal-store";
import { useShallow } from "zustand/react/shallow";
import { Card, IconButton, StackSeparator, Text, VStack } from "@chakra-ui/react";
import { TbReport } from "react-icons/tb";
import { TbLogout2 } from "react-icons/tb";
import { TbListCheck } from "react-icons/tb";
import { TbLogin2 } from "react-icons/tb";
import { useExtrusionRawMaterialTableModalStore } from "./store/use-extrusion-raw-material-table-modal-store";

export default function ExtrusionMenuCard() {
  const employee = useExtrusionEmployeeStore(useShallow((state) => state.extrusionEmployee));
  const logout = useExtrusionEmployeeStore(useShallow((state) => state.clearExtrusionEmployee));
  const setOpenAuth = useExtrusionAuthModalStore(useShallow((state) => state.setOpen));
  const setOpenRawMaterials = useExtrusionRawMaterialTableModalStore(useShallow((state) => state.setOpen));

  return (
    <Card.Root h="100%" variant="elevated">
      <Card.Body padding={4}>
        <VStack justify="space-between" h="100%" separator={<StackSeparator />}>
          <VStack justify="flex-start" h="100%" gap="4">
            <IconButton variant="outline" size="2xl" rounded="md" bg="brand" p={2} w="80px">
              <VStack>
                <TbListCheck />
                <Text textStyle="xs">ОТК</Text>
              </VStack>
            </IconButton>
            <IconButton
              variant="outline"
              size="2xl"
              rounded="md"
              bg="brand"
              p={2}
              w="80px"
              // onClick={employee ? () => logout() : () => setOpen(true)}
            >
              <VStack>
                <TbReport />
                <Text textStyle="xs">Параметры</Text>
              </VStack>
            </IconButton>
            <IconButton
              variant="outline"
              size="2xl"
              rounded="md"
              bg="brand"
              p={2}
              w="80px"
              onClick={() => setOpenRawMaterials(true)}
            >
              <VStack>
                <TbReport />
                <Text textStyle="xs">Компл-е</Text>
              </VStack>
            </IconButton>
          </VStack>

          <IconButton
            variant="outline"
            size="2xl"
            rounded="md"
            bg="brand"
            p={2}
            w="80px"
            onClick={
              employee
                ? () => logout()
                : (e) => {
                    e.currentTarget.blur();
                    setOpenAuth(true);
                  }
            }
          >
            <VStack>
              {employee ? <TbLogout2 /> : <TbLogin2 />}
              <Text textStyle="xs">{employee ? "Выход" : "Вход"}</Text>
            </VStack>
          </IconButton>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
