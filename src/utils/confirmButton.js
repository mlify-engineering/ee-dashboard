const setButtonProps = (btn, label, className) => {
  btn.textContent = label;
  btn.className = className; //btn.className.replace(bgClassNameToReplace, bgConfirmClassName);
};

const confirmButton = (
  btn,
  onConfirm,
  bgClassNameToReplace,
  confirmLabel = "Confirm",
  bgConfirmClassName = "bg-danger",
  delay = 3000,
) => {
  try {
    if (btn.textContent === confirmLabel) {
      onConfirm();
      return;
    }
    const defaultLabel = btn.textContent;
    const defaultClassName = btn.className;
    setButtonProps(btn, confirmLabel, btn.className.replace(bgClassNameToReplace, bgConfirmClassName));
    setTimeout(() => {
      setButtonProps(btn, defaultLabel, defaultClassName);
    }, delay);
  } catch (e) {}
};

export default confirmButton;
