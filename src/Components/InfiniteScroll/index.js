import React, {
  useRef,
  useEffect,
  useMemo,
  useCallback,
  ReactElement,
} from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid red;
`;

const Footer = styled.div`
  height: 2px;
  width: 100%;
  border: 2px solid red;
`;

const InfiniteScroll = (props) => {
  const {
    next,
    children,
    isLoading,
    loader = <></>,
    dataLength,
    endMessage = "",
    hasMore,
    scrollToTop,
    threshold = 0,
  } = props;
  const rootRef = useRef(null);
  const targetRef = useRef(null);
  const options = useMemo(() => {
    return {
      root: rootRef.current,
      rootMargin: "0px",
      threshold: threshold,
    };
  }, [threshold]);

  const handleObserver = useCallback(
    (entries) => {
      const entry = entries[0];
      console.log("entry", entry);
      if (entry?.isIntersecting) {
        hasMore && next();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dataLength]
  );

  useEffect(() => {
    const Observer = new IntersectionObserver(handleObserver, options);
    const targetEle = targetRef.current;
    if (targetEle) {
      Observer.observe(targetEle);
    }

    return () => {
      const element = targetEle;
      if (element) {
        Observer.unobserve(element);
      }
    };
  }, [handleObserver, options, targetRef]);

  useEffect(() => {
    scrollToTop && window.scrollTo(0, 0);
  }, [scrollToTop]);

  return (
    <Wrapper ref={rootRef}>
      {children}
      {loader}
      {!hasMore && endMessage}
      {!isLoading && <Footer ref={targetRef} />}
    </Wrapper>
  );
};

export default InfiniteScroll;
