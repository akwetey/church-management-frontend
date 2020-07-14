export function addBtnLoading(el) {
  el.setAttribute("disabled", "disabled");
  el.setAttribute("style", "cursor:not-allowed");
  // el.classList.add("is-loading", "is-loading-sm");
  // el.setAttribute("disabled", "");
}

export function removeBtnLoading(el) {
  el.removeAttribute("disabled");
  el.removeAttribute("style");
  // el.classList.remove("is-loading", "is-loading-sm");
  // el.removeAttribute("disabled");
}
