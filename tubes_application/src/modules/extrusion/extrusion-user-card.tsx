import { useExtrusionEmployeeStore } from "./store/use-extrusion-employee-store";
import { useShallow } from "zustand/react/shallow";
import { Card, Heading } from "@chakra-ui/react";

export default function ExtrusionUserCard() {
  const employee = useExtrusionEmployeeStore(useShallow((state) => state.extrusionEmployee));
  return (
    <Card.Root h="100%" variant="elevated">
      <Card.Body
        display="flex"
        alignItems="center"
        justifyContent="center"
        backgroundColor={employee ? "bg.panel" : "bg.error"}
      >
        <Heading size="2xl" animation={employee ? "none" : "colorCycle"}>
          {employee ? employee.name : "Не авторизован"}
        </Heading>
      </Card.Body>
    </Card.Root>
  );
}
