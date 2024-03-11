import React from "react";

import Header from "../../components/appComponents/layoutComponents/header";
import Footer from "../../components/fundamentalComponents/postsComponents/footer";

import useStyles from "./withWrapper.styles";
import { useAppSelector } from "../../store/hooks";
import SideMenu from "../../components/appComponents/layoutComponents/sideMenu/SideMenu";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { ITheme } from "roottypes";

const withWrapper =
  (
    Component: React.FunctionComponent<any>,
    options: { withFooter?: boolean; withSideMenu?: boolean } = {
      withFooter: true,
      withSideMenu: false,
    }
  ): React.FunctionComponent<any> =>
  (props: any) => {
    const theme: ITheme = useAppSelector(
      (state) => state.websiteConfiguration.theme
    );
    const title = useAppSelector((state) => state.websiteConfiguration.title);

    const [scrolledDown, setScrolledDown] = React.useState(
      window.scrollY >= 80
    );

    const scrollableRef = React.useRef<HTMLDivElement>(null);
    const styles = useStyles({ theme });
    const isLoggedIn: boolean = useIsLoggedIn();

    React.useEffect(() => {
      const handleScrollEvent = () => {
        if (scrollableRef && scrollableRef.current) {
          setScrolledDown(scrollableRef.current.scrollTop >= 80);
        }
      };

      handleScrollEvent();

      if (scrollableRef.current) {
        scrollableRef?.current.addEventListener("scroll", handleScrollEvent);
      }

      return () => {
        if (scrollableRef.current) {
          scrollableRef.current.removeEventListener(
            "scroll",
            handleScrollEvent
          );
        }
      };
    }, []);

    return (
      <div className={styles.sideMenuAndContent}>
        {options.withSideMenu && isLoggedIn && <SideMenu />}

        <div
          ref={scrollableRef as React.RefObject<HTMLDivElement>}
          className={styles.headerAndContent}
        >
          <Header scrolledDown={scrolledDown} />
          <Component {...props} />
          {options.withFooter && <Footer theme={theme} title={title} />}
        </div>
      </div>
    );
  };
export default withWrapper;
