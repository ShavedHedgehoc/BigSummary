export function openSidebar() {
  if (typeof window !== "undefined") {
    document.body.style.overflow = "hidden";
    document.documentElement.style.setProperty("--SideNavigation-slideIn", "1");
  }
}

export function closeSidebar() {
  if (typeof window !== "undefined") {
    document.documentElement.style.removeProperty("--SideNavigation-slideIn");
    document.body.style.removeProperty("overflow");
  }
}

export function toggleSidebar() {
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    const slideIn = window.getComputedStyle(document.documentElement).getPropertyValue("--SideNavigation-slideIn");
    if (slideIn) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }
}

// export function getTomorrowDate(): string {
//   const tomorrow = new Date();
//   tomorrow.setDate(tomorrow.getDate() + 1);
//   return tomorrow.toJSON().slice(0, 10);
// }

// export function formatDateToString(dateToFormat: Date) {
//   const date = new Date(dateToFormat);
//   return ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear();
// }

// export function formatTimeToString(dateToFormat: Date) {
//   const date = new Date(dateToFormat);
//   return ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + date.getSeconds();
// }

// export function statusCondition(status: string) {
//   switch (status) {
//     case "base_fail":
//       return "fail";
//     case "product_fail":
//       return "fail";
//     case "base_check":
//       return "wait";
//     case "product_check":
//       return "wait";
//     case "plug_pass":
//       return "success";
//     case "product_pass":
//       return "success";
//     case "product_in_progress":
//       return "wait";
//     case "product_finished":
//       return "success";
//     case "base_correct":
//       return "wait";
//     case "base_continue":
//       return "success";
//     case "cancelled":
//       return "cancelled";
//     default:
//       return "und";
//   }
// }
