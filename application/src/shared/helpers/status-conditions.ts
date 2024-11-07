export function statusCondition(status: string) {
  switch (status) {
    case "base_fail":
      return "fail";
    case "product_fail":
      return "fail";
    case "base_check":
      return "wait";
    case "product_check":
      return "wait";
    case "product_correct":
      return "wait";
    case "plug_pass":
      return "success";
    case "product_pass":
      return "success";
    case "product_in_progress":
      return "wait";
    case "product_finished":
      return "success";
    case "base_correct":
      return "wait";
    case "base_continue":
      return "success";
    case "cancelled":
      return "cancelled";
    default:
      return "und";
  }
}

export function rowScope(state: string | null) {
  if (!state) {
    return "list-group-item list-group-item-light";
  }
  return statusCondition(state);
}
