export const truncateString = (name, maxLength) => {
  if (name.length > maxLength) {
    return name.slice(0, maxLength - 3) + '...';
  } else {
    return name;
  }
};
