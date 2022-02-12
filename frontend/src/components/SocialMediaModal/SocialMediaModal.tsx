import React, { FC, SetStateAction, useState } from 'react';
import style from '../../pages/User/User.module.scss';
import FormInput from '../UI/inputs/FormInput/FormInput';
import InfoItem from '../UI/InfoItem/InfoItem';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import { ISocialMedia, SocialMediaEnum } from '../../types/userTypes';
import { useTypeSelector } from '../../hooks/useTypeSelector';

interface IProps {
  onChange: any;
  value: string;
  currentChecked: string;
  socialMedia: ISocialMedia;
  setSocialMedia: React.Dispatch<SetStateAction<ISocialMedia>>;
}

const SocialMediaModal: FC<IProps> = React.memo(
  ({ value, onChange, currentChecked, setSocialMedia, socialMedia }) => {
    const { isEdit } = useTypeSelector((state) => state.user);
    const { github, linkedIn, facebook } = SocialMediaEnum;
    const socialMediaArray = [github, linkedIn, facebook];
    const [visibility, setVisibility] = useState<boolean>(false);
    const [socialMediaObject, setSocialMediaObject] = useState<ISocialMedia>(
      {},
    );
    const setSocialMediaHandler = (
      // oldSocialMedia: ISocialMedia,
      event?: React.MouseEvent<HTMLElement>,
    ): ISocialMedia => {
      setSocialMedia({ github: 'asdas' });
      console.log(socialMedia);
      switch (currentChecked) {
        case 'linkedIn': {
          setSocialMediaObject({
            ...socialMedia,
            linkedIn: `https://linkedIn.com/${value}`,
          });
          break;
        }
        case 'github': {
          setSocialMediaObject({
            ...socialMedia,
            github: `https://github.com/${value}`,
          });
          break;
        }
        case 'facebook': {
          setSocialMediaObject({
            ...socialMedia,
            facebook: `https://facebook.com/${value}`,
          });
          break;
        }
      }
      // if (event) delete socialMedia[`${event.currentTarget.id}`];
      return socialMedia;
    };
    return (
      <div>
        {' '}
        <div className={style.user__info_media}>
          {socialMedia
            ? Object.keys(socialMedia).map((media, index) => (
                <InfoItem
                  key={media}
                  onRemove={(event) => setSocialMediaHandler(event)}
                  referral={`https://${media}/${
                    Object.values(socialMedia)[index]
                  }`}
                  name={media}
                />
              ))
            : null}
          {isEdit ? (
            <InfoItem
              onClick={() => setVisibility(true)}
              isAdd={true}
              isButton={true}
              name={'gitHub'}
            />
          ) : null}
        </div>
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
                <InfoItem
                  name={media}
                  isButton={true}
                  checked={currentChecked}
                />
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
            <Button onClick={() => setSocialMedia(setSocialMediaHandler())}>
              Add
            </Button>
          </div>
        </Modal>
      </div>
    );
  },
);

export default SocialMediaModal;
