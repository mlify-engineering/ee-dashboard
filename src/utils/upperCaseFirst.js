const upperCaseFirst = (str) => {
  try {
    const newStr =
      str.toLowerCase().charAt(0).toUpperCase() + str.toLowerCase().slice(1);
    return newStr;
  } catch (e) {
    return str;
  }
};

export default upperCaseFirst;
