import React, { FC, useRef, useState } from 'react';
import style from './Home.module.scss';
import sprite from '../../assets/sprite.svg';
import Title from '../../components/UI/Title/Title';
import colors from '../../styles/vars.module.scss';
import Button from '../../components/UI/Button/Button';
import Footer from '../../components/Footer/Footer';
import room from '../Room/Room';
import Modal from '../../components/UI/Modal/Modal';

const Home: FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isAnim, setIsAnim] = useState<boolean>(false);
  const roomRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const homeRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const descriptionRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const aboutRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const sidebarRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const getSectionPosition = (
    ref: React.MutableRefObject<HTMLInputElement>,
  ) => {
    return Math.ceil(
      ref.current.getBoundingClientRect().top + ref.current.offsetHeight / 2,
    );
  };

  const scrollToRoom = () => {
    setIsAnim(true);
    setTimeout(() => {
      setIsAnim(false);
    }, 400);
  };
  // window.addEventListener('scroll', (e) => {
  //   const activeClass = `${style.sidebar__link_active} ${style.sidebar__link}`;
  //   const sidebar1 = sidebarRef.current.children[0];
  //   const sidebar2 = sidebarRef.current.children[1];
  //   const sidebar3 = sidebarRef.current.children[2];
  //   const sidebar4 = sidebarRef.current.children[3];
  //   const refs = {
  //     sidebar1: getSectionPosition(homeRef),
  //     sidebar2: getSectionPosition(roomRef),
  //     sidebar3: getSectionPosition(descriptionRef),
  //     sidebar4: getSectionPosition(aboutRef),
  //   };
  //
  //   for (let i = 0; i < sidebarRef.current.children.length; i++) {
  //     const filteredRefs = Object.values(refs).filter((a) => a > 0);
  //     Object.values(refs) = filteredRefs;
  //
  //     if (filteredRefs[0]) {
  //       sidebarRef.current.children[i].className = activeClass;
  //     } else sidebarRef.current.children[i].className = style.sidebar__link;
  //   }
  // });
  return (
    <div className={style.home}>
      <Modal setVisibility={setIsVisible} title={'Room'} visibility={isVisible}>
        <div className={style.create__form}>
          <div className={style.create__time}>
            <div className={style.create__date}>
              {/*<FormInput type={'date'} label={'Date'} />*/}
            </div>
            <div className={style.create__hours}>
              {/*<FormInput type={'time'} label={'Time'} />*/}
            </div>
          </div>
          {/*<FormInput label={'Room name'} />*/}
          {/*<FormInput label={'E-mail'} />*/}
          {/*<FormInput label={'Interviewer'} />*/}
          {/*<FormInput label={'Interviewee'} />*/}
          {/*<FormInput label={'Spectators'} />*/}
          <div className={style.create__button}>
            <Button onClick={() => setIsVisible(false)}>Create</Button>y
          </div>
        </div>
      </Modal>

      <div ref={sidebarRef} className={style.sidebar}>
        <a href={'#home'} className={style.sidebar__link}>
          Home
        </a>
        <a href={'#room'} className={style.sidebar__link}>
          Room
        </a>
        <a href={'#description'} className={style.sidebar__link}>
          How to use
        </a>
        <a href={'#about'} className={style.sidebar__link}>
          About
        </a>
      </div>
      <section
        ref={homeRef}
        id={'home'}
        className={`${style.welcome} ${style.section}`}
      >
        <div className={style.welcome__title_wrapper}>
          <div className={style.welcome__title}>Sobbi</div>
          <div className={style.welcome__subtitle}>
            Look at the interview differently with
          </div>
        </div>
        <div className={style.welcome__text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </div>
        <a className={style.welcome__arrow_link} href={'#room'}>
          <svg
            onClick={() => {
              scrollToRoom();
            }}
            className={
              isAnim
                ? `${style.welcome__arrow} ${style.welcome__arrow_active}`
                : style.welcome__arrow
            }
          >
            <use href={`${sprite}#arrow`} />
          </svg>
        </a>
      </section>
      <section
        id={'room'}
        ref={roomRef}
        className={`${style.room} ${style.section}`}
      >
        <div className={style.room__wrapper}>
          <Title color={colors.wheat}>Room</Title>
          <div className={style.room__buttons}>
            <div className={style.room__button_wrapper}>
              <Button onClick={() => setIsVisible(true)}>Create</Button>
            </div>
            <div className={style.room__button_wrapper}>
              <Button>Enter</Button>
            </div>
          </div>
        </div>
      </section>
      <section
        ref={descriptionRef}
        id={'description'}
        className={`${style.instruction} ${style.section}`}
      >
        <div className={style.instruction__wrapper}>
          <Title color={colors.white}>How to use</Title>
          <p className={style.instruction__article}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p className={style.instruction__article}>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
          <p className={style.instruction__article}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p className={style.instruction__article}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </div>
      </section>
      <section
        ref={aboutRef}
        id={'about'}
        className={`${style.about} ${style.section}`}
      >
        <div className={style.about__wrapper}>
          <Title color={colors.wheat}>About</Title>
          <div className={style.about__text}>
            But I must explain to you how all this mistaken idea of denouncing
            pleasure and praising pain was born and I will give you a complete
            account of the system, and expound the actual teachings of the great
            explorer of the truth, the master-builder of human happiness. No one
            rejects, dislikes, or avoids pleasure itself, because it is
            pleasure, but because those who do not know how to pursue pleasure
            rationally encounter consequences that are extremely painful. Nor
            again is there anyone who loves or pursues or desires to obtain pain
            of itself, because it is pain, but because occasionally
            circumstances occur in which toil and pain can procure him some
            great pleasure. To take a trivial example, which of us ever
            undertakes laborious physical exercise, except to obtain some
            advantage from it? But who has any right to find fault with a man
            who chooses to enjoy a pleasure that has no annoying consequences,
            or one who avoids a pain that produces no resultant pleasure?
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
