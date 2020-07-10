export function addBtnLoading(el) {
  el.classList.add("is-loading", "is-loading-sm");
  el.setAttribute("disabled", "");
}

export function removeBtnLoading(el) {
  el.classList.remove("is-loading", "is-loading-sm");
  el.removeAttribute("disabled");
}
