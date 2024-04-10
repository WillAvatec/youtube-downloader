import { useEffect, useState } from "react";

function useScroll() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let previousScrollPosition = 0;
    let currentScrollPosition = 0;

    const controlHeader = () => {
      // Get current position
      currentScrollPosition = window.scrollY;

      //Substract the two and decide if show or not
      if (previousScrollPosition - currentScrollPosition < 0) {
        setShow(false);
      }
      if (previousScrollPosition - currentScrollPosition > 0) {
        setShow(true);
      }

      // Update previous value
      previousScrollPosition = currentScrollPosition;
    };

    window.addEventListener("scroll", controlHeader);

    return () => {
      window.removeEventListener("scroll", controlHeader);
    };
  }, []);

  return show;
}

export default useScroll;