import React, { FC, SetStateAction, useState } from 'react';
import style from '../../pages/User/User.module.scss';
import FormInput from '../UI/inputs/FormInput/FormInput';
import InfoItem from '../UI/InfoItem/InfoItem';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import { ISocialMedia, SocialMediaEnum } from '../../types/userTypes';

interface IProps {
  onChange: any;
  value: string;
  currentChecked: string;
  socialMedia: ISocialMedia;
  setSocialMedia: React.Dispatch<SetStateAction<ISocialMedia>>;
}

const SocialMediaModal: FC<IProps> = React.memo(
  ({ value, onChange, currentChecked, setSocialMedia, socialMedia }) => {
    const { github, linkedIn, facebook } = SocialMediaEnum;
    const socialMediaArray = [github, linkedIn, facebook];
    const [visibility, setVisibility] = useState<boolean>(false);
    const setSocialMediaHandler = (
      oldSocialMedia: ISocialMedia,
    ): ISocialMedia => {
      switch (currentChecked) {
        case socialMedia.linkedIn: {
          socialMedia.linkedIn = `https://linkedIn.com/${value}`;
          break;
        }
        case socialMedia.github: {
          socialMedia.github = `https://github.com/${value}`;
          break;
        }
        case socialMedia.facebook: {
          socialMedia.facebook = `https://facebook.com/${value}`;
          break;
        }
      }
      return socialMedia;
    };
    return (
      <Modal
        title={'Add new'}
        visibility={visibility}
        setVisibility={setVisibility}
      >
        <div className="">
          <FormInput
            name={'formSocialMedia'}
            label={'Name'}
            value={value}
            onChange={onChange}
          />
          {socialMediaArray.map((media) => (
            <label htmlFor={media} key={media}>
              <InfoItem name={media} isButton={true} checked={currentChecked} />
              <input
                className={style.modal__radio}
                id={media}
                type={'radio'}
                name={'formPicked'}
                value={media}
                onChange={onChange}
              />
            </label>
          ))}
          <Button
            onClick={() => setSocialMedia(setSocialMediaHandler(socialMedia))}
          >
            Add
          </Button>
        </div>
      </Modal>
    );
  },
);

export default SocialMediaModal;
