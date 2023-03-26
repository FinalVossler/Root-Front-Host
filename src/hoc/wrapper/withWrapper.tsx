import React from "react";

import { Theme } from "../../config/theme";
import Header from "../../components/header";
import Footer from "../../components/postsComponents/footer";

import useStyles from "./withWrapper.styles";
import { useAppSelector } from "../../store/hooks";
import SideMenu from "../../components/sideMenu/SideMenu";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { IUser, Role } from "../../store/slices/userSlice";

const withWrapper =
  (
    Component: any,
    options: { withFooter?: boolean; withSideMenu?: boolean } = {
      withFooter: true,
      withSideMenu: false,
    }
  ): React.FunctionComponent<any> =>
  (props: any) => {
    const theme: Theme = useAppSelector(
      (state) => state.websiteConfiguration.theme
    );
    const user: IUser = useAppSelector((state) => state.user.user);

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
        {options.withSideMenu &&
          isLoggedIn &&
          user.role === Role.SuperAdmin && <SideMenu />}

        <div
          ref={scrollableRef as React.RefObject<HTMLDivElement>}
          className={styles.headerAndContent}
        >
          <Header scrolledDown={scrolledDown} />
          <Component {...props} />
          {options.withFooter && <Footer />}
        </div>
      </div>
    );
  };
export default withWrapper;
