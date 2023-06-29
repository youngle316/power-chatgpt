// scrolls the element's ancestor containers is visible to the user.
export const useScrollToView = (
  ref: React.RefObject<HTMLDivElement> | null
) => {
  const scrollToView = () => {
    ref?.current && ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return scrollToView;
};
