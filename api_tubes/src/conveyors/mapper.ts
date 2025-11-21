import { Conveyor } from "./../../generated/prisma/index.d";

export interface IMappedConveyor {
  data: { conveyor: Conveyor };
}

export const mappedConveyor = (conveyor: Conveyor): IMappedConveyor => {
  return {
    data: { conveyor: conveyor },
  };
};
