import { Box, Step, StepIndicator, Stepper, Typography } from "@mui/joy";
import { Check } from "@mui/icons-material";
import { useShallow } from "zustand/react/shallow";
import { useRegulationsUpsertFormStore } from "./store/use-regulations-upsert-form-store";

export default function RegulationsUpsertStepper() {
  const file = useRegulationsUpsertFormStore(useShallow((state) => state.file));
  const isValid = useRegulationsUpsertFormStore(useShallow((state) => state.isValid));
  const errs = useRegulationsUpsertFormStore(useShallow((state) => state.errs));
  return (
    <Box sx={{ mt: 4, width: "100%" }}>
      <Stepper size="lg">
        <Step
          orientation="vertical"
          indicator={
            file === undefined ? (
              <StepIndicator variant="solid" color="neutral">
                1
              </StepIndicator>
            ) : (
              <StepIndicator variant="outlined" color="neutral">
                <Check />
              </StepIndicator>
            )
          }
        >
          <Typography level="body-xs">Выбор файла</Typography>
        </Step>
        <Step
          orientation="vertical"
          indicator={
            file === undefined ? (
              <StepIndicator variant="outlined" color="neutral">
                2
              </StepIndicator>
            ) : isValid && errs.length === 0 ? (
              <StepIndicator variant="outlined" color="neutral">
                <Check />
              </StepIndicator>
            ) : (
              <StepIndicator variant="solid" color="neutral">
                2
              </StepIndicator>
            )
          }
        >
          <Typography level="body-xs">Проверка</Typography>
        </Step>
        <Step
          orientation="vertical"
          indicator={
            isValid && errs.length === 0 ? (
              <StepIndicator variant="solid" color="neutral">
                3
              </StepIndicator>
            ) : (
              <StepIndicator variant="outlined" color="neutral">
                3
              </StepIndicator>
            )
          }
        >
          <Typography level="body-xs">Загрузка</Typography>
        </Step>
      </Stepper>
    </Box>
  );
}
