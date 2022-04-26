import React, { useEffect } from 'react';

const useScrollNavigation = (
  sectionRefs: Array<React.MutableRefObject<HTMLElement>>,
  navigationWrapperRef: React.MutableRefObject<HTMLElement>,
  className: string,
) => {
  const setActive = () => {
    const navigationItem = navigationWrapperRef.current.children;
    let activeSection: Element | undefined;
    const scrollYPosition = scrollY;
    sectionRefs.forEach((section, index) => {
      const sectionTopPosition = section.current.offsetTop;
      const sectionHeight = section.current.clientHeight;
      navigationItem[index].classList.remove(className);
      if (scrollYPosition >= sectionTopPosition - sectionHeight / 1.7) {
        activeSection = navigationItem[index];
      }
    });
    activeSection?.classList.add(className);
  };
  useEffect(() => {
    window.addEventListener('scroll', setActive);
    return () => {
      window.removeEventListener('scroll', setActive);
    };
  }, []);
};

export default useScrollNavigation;
