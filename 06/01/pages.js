export default (container) => {
  const home = () => (container.textContent = "Home");
  const list = () => (container.textContent = "List");
  const notFound = () => (container.textContent = "Not Found");

  return {
    home,
    list,
    notFound,
  };
};
