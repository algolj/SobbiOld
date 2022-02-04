import React, { useState } from 'react';
import style from './Room.module.scss';
import NavBar from '../../components/NavBar/NavBar';
import TestsSearcher from '../../components/TestsSeacher/TestsSearcher';
import Chat from '../../components/Chat/Chat';
import Button from '../../components/UI/Button/Button';

const Room = () => {
  const [isVideo, setIsVideo] = useState<boolean>(true);
  return (
    <div className={style.room}>
      <div className={style.room__chats}>
        <div className={style.room__chats_switcher}>
          <Button active={!isVideo} onClick={() => setIsVideo(false)}>
            Chat
          </Button>
          <Button active={isVideo} onClick={() => setIsVideo(true)}>
            Video
          </Button>
        </div>
        <Chat isHide={!isVideo} />
        <img
          className={isVideo ? style.room__video : style.room__video_hide}
          src={'./assets/icon/video1.jpg'}
          alt=""
        />
      </div>
      <div className={style.room__menu}>
        <NavBar
          navBars={[
            ['text', 'tasks', 'live coding'],
            ['core', 'frameworks', 'algorithms'],
          ]}
        />
        <div className={style.room__searcher}>
          <TestsSearcher />
          <TestsSearcher />
          <TestsSearcher />
        </div>
      </div>
    </div>
  );
};

export default Room;
