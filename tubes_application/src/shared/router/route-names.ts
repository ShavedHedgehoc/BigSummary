export enum RouteNames {
  NOT_FOUND = "*",
  EXTRUSION_ROOT = "/extrusion",
  EXTRUSION = "/extrusion/:conveyor_name",
  EXTRUSION_ADD_ENTRY_ROOT = "/extrusion_add_entry",
  EXTRUSION_ADD_ENTRY = "/extrusion_add_entry/:conveyor_name",
  OFFSET = "/offset/:conveyor_name",
  TEST = "/test/:conveyor_name",
}
