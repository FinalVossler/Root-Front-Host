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
        description="Bienvenue sur ma page personnelle ! Je suis une conseillère commerciale spécialisée dans divers domaines. J'ai un master en sciences appliquées et technologies et des compétences communicationnelles hors du commun !"
        title="Salut Tout le monde, je suis Nozha!"
      />

      <div className={styles.cardsContainer}>
        <RotatingCard
          theme={theme}
          description="If you've tried your hand at data analysis, you know that it can sometimes make decision making much more complex. Dashboarding is what we offer..."
        />
        <RotatingCard
          theme={theme}
          description="If you've tried your hand at data analysis, you know that it can sometimes make decision making much more complex. Dashboarding is what we offer..."
        />
        <RotatingCard
          theme={theme}
          description="If you've tried your hand at data analysis, you know that it can sometimes make decision making much more complex. Dashboarding is what we offer..."
        />
      </div>

      <TitleAndText
        theme={theme}
        title="Why 16 types?"
        description="The sociotype is formed by a set of psyche features identified by Carl
          Gustav Jung, namely: rationality / irrationality, extraversion /
          introversion, logic / ethics, and sensibility / intuition."
      />
      <TitleAndText
        theme={theme}
        title="Sociotype"
        description="Humanitarian socionics in the description of types is based on its own Energetic model of the psyche - Model G. Descriptions of types, features of behavior are presented from the point of view of pure types.
          It should be understood that the behavior of each type in real life is greatly influenced by the subtype and accentuations formed under the influence of the surrounding reality."
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
