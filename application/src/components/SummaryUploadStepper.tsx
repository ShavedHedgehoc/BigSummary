import { Step, StepIndicator, Stepper } from "@mui/joy";
import { Check } from "@mui/icons-material";

interface SummaryUploadStepperProps {
  file: File | undefined;
  isValid: boolean;
  errs: string[];
}

export default function SummaryUploadStepper(props: SummaryUploadStepperProps) {
  return (
    <Stepper>
      <Step
        orientation="vertical"
        indicator={
          props.file === undefined ? (
            <StepIndicator variant="solid" color="primary">
              1
            </StepIndicator>
          ) : (
            <StepIndicator variant="outlined" color="primary">
              <Check />
            </StepIndicator>
          )
        }
      >
        Выбор файла
      </Step>
      <Step
        orientation="vertical"
        indicator={
          props.file === undefined ? (
            <StepIndicator variant="outlined" color="primary">
              2
            </StepIndicator>
          ) : props.isValid && props.errs.length === 0 ? (
            <StepIndicator variant="outlined" color="primary">
              <Check />
            </StepIndicator>
          ) : (
            <StepIndicator variant="solid" color="primary">
              2
            </StepIndicator>
          )
        }
      >
        Проверка
      </Step>
      <Step
        orientation="vertical"
        indicator={
          props.isValid && props.errs.length === 0 ? (
            <StepIndicator variant="solid" color="primary">
              3
            </StepIndicator>
          ) : (
            <StepIndicator variant="outlined" color="primary">
              3
            </StepIndicator>
          )
        }
      >
        Загрузка
      </Step>
    </Stepper>
  );
}
