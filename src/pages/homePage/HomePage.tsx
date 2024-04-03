import React from "react";

import withWrapper from "../../hoc/wrapper";
import { useAppSelector } from "../../store/hooks";
import Banner from "../../components/fundamentalComponents/postsComponents/banner";
import AnimatedTitle from "../../components/fundamentalComponents/postsComponents/animatedTitle";
import TitleTextAndImage from "../../components/fundamentalComponents/postsComponents/titleTextAndImage";
import RotatingCard from "../../components/fundamentalComponents/postsComponents/rotatingCard";
import TitleAndText from "../../components/fundamentalComponents/postsComponents/titleAndText";
import Card from "../../components/fundamentalComponents/postsComponents/card";
import UnderlinedTitle from "../../components/fundamentalComponents/postsComponents/underlinedTitle";

import ContactForm from "../../components/appComponents/formComponents/contactForm";
import Person from "../../components/fundamentalComponents/postsComponents/Person";
import Video from "../../components/fundamentalComponents/postsComponents/video";

import useStyles from "./homePage.styles";
import withChat from "../../hoc/withChat";
import { ITheme } from "roottypes";

interface IHomeProps {}
const HomePage: React.FunctionComponent<IHomeProps> = (props: IHomeProps) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const styles = useStyles({ theme });
  return (
    <div className={styles.homePageContainer}>
      <Banner theme={theme} />

      <br />
      <br />
      <br />

      <Person theme={theme} />

      <Video theme={theme} title="How it works" videoId="g0jiB6xHHLk" />

      <AnimatedTitle theme={theme} title="Creative Developer" />

      <UnderlinedTitle theme={theme} title="Hamza Khalifa" />

      <TitleTextAndImage
        theme={theme}
        description="This is a description placeholder. This CMS is made to be configured by a super admin to behave as either a Marketplace, a social network, or a data analysis plateforme..."
        title="Hello everyone!"
      />

      <div className={styles.cardsContainer}>
        <RotatingCard
          theme={theme}
          description="This is a description placeholder. This CMS is made to be configured by a super admin to behave as either a Marketplace, a social network, or a data analysis plateforme..."
        />
        <RotatingCard
          theme={theme}
          description="This is a description placeholder. This CMS is made to be configured by a super admin to behave as either a Marketplace, a social network, or a data analysis plateforme..."
        />
        <RotatingCard
          theme={theme}
          description="This is a description placeholder. This CMS is made to be configured by a super admin to behave as either a Marketplace, a social network, or a data analysis plateforme..."
        />
      </div>

      <TitleAndText
        theme={theme}
        title="Why though?"
        description="To not have to repeat oneself"
      />
      <TitleAndText
        theme={theme}
        title="For who"
        description="Anyone interested?"
      />

      <br />
      <br />

      <br />

      <div className={styles.content}>
        <div className={styles.cardsContainer}>
          <Card
            theme={theme}
            title="Alpha Quadra"
            description="Open and trusting types of Alpha, like a moth to the fire, fly towards their destruction"
            backgroundImage="assets/images/card1.jpeg"
          />
          <Card
            theme={theme}
            title="Beta Quadra"
            description="Quadra of struggle and revolutions. Beta is the main supplier of selfless fighters and fanatics of all kinds"
            backgroundImage="assets/images/card2.jpeg"
          />
          <Card
            theme={theme}
            title="Gamma Quadra"
            description="Selfishness is no longer hidden, but is considered the norm. All that is beneficial is recognized as true"
            backgroundImage="assets/images/card3.jpeg"
          />
          <Card
            theme={theme}
            title="Delta Quadra"
            description="Duality and a cozy family alone are not enough to experience the fullness of life"
            backgroundImage="assets/images/card4.jpeg"
          />
        </div>
      </div>

      <br />
      <br />
      <br />

      <ContactForm />
    </div>
  );
};

export const HomePageForLoggedIn = React.memo(HomePage);

export default withChat(
  withWrapper(React.memo(HomePage), {
    withFooter: true,
    withSideMenu: true,
  })
);
