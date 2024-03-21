import React from "react";
import { ITheme } from "roottypes";

import Header from "../../components/appComponents/layoutComponents/header";
import Footer from "../../components/appComponents/layoutComponents/footer";

import useStyles from "./withWrapper.styles";
import { useAppSelector } from "../../store/hooks";
import SideMenu from "../../components/appComponents/layoutComponents/sideMenu/SideMenu";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import Cart from "../../components/appComponents/layoutComponents/cart";

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
    const withEcommerce = useAppSelector(
      (state) => state.websiteConfiguration.withEcommerce
    );
    const cartTotalProducts: number | undefined = useAppSelector(
      (state) => state.cart.cart
    )?.products.length;

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

        {withEcommerce &&
          isLoggedIn &&
          cartTotalProducts &&
          cartTotalProducts > 0 && <Cart />}
      </div>
    );
  };
export default withWrapper;
