export const ClearForm = (styles) => {
  let valueText, i;
  valueText = document.querySelectorAll(styles);
  for (i = 0; i < valueText.length; i++) {
    valueText[i].value = ""
  }
}