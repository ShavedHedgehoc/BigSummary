export enum ApiRoutes {
  HEALTH_CHECK = "health-check",
  CONVEYORS = "conveyors",
  GET_EMPLOYEES_BY_BARCODE = "employees/by_barcode",
  SUMMARY_RAW_MATERIALS_BY_SUMMARY_ID = "summary-raw-materials/by_summary_id",
  CREATE_SUMMARY_RAW_MATERIALS_CURRENT = "summary-raw-material-current/create",
  GET_SUMMARY_RAW_MATERIALS_CURRENT = "summary-raw-material-current/get_list",
  GET_CHIEF_TECHNOLOGIST_NOTE = "chief-technologist-notes/by_summary_id",
  GET_EXTRUSION_TRESHOLDS = "extrusion/get_trehsholds",
  GET_EXTRUSION_CURRENT_PARAMS = "extrusion/get_params",
}
