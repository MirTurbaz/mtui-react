import { useContext, useRef, useState } from 'react';
import { Button } from './common/button';
import { Popup } from './common/popup';
import { NOTIFICATION_CONTEXT, NotificationContext } from './contexts/notification_context';
import { USER_CONTEXT, UserContext } from './contexts/user_context';
import Add from './icons/add';
import Done from './icons/done';
import Expand from './icons/expand';
import { ICON_COLOR } from './menu';

export default function CampSelect() {
  const userContext = useContext<USER_CONTEXT>(UserContext);
  const ref = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const notyContext = useContext<NOTIFICATION_CONTEXT>(NotificationContext);

  const handleCampSelect = (camp) => {
    if (camp.id !== userContext.current_camp.id) {
      fetch('/api/update_current_camp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userContext.current_user.id,
          camp_id: camp.id,
        }),
      })
        .then((r) => {
          userContext.setCurrentCamp(camp);
          setShowPopup(false);
          notyContext.addNotification({ type: 'success', title: `Успешно переключено на ${camp.full_name}` });
          window.location.reload();
        })
        .catch((e) => notyContext.addNotification({ type: 'danger', title: 'Произошла ошибка' }));
    }
  };

  return (
    <div
      className={'camp_select'}
      ref={ref}
      onClick={(e) => {
        setShowPopup(!showPopup);
        e.stopPropagation();
      }}
    >
      <div className={'camp_select__current_name'}>{userContext.current_camp.full_name}</div>
      <Expand color={ICON_COLOR} className={'menu__item_expand'} />
      <Popup
        anchor={ref.current}
        open={showPopup}
        id={'camp_select'}
        title={'Мои объекты'}
        onClose={() => setShowPopup(false)}
        level={10}
      >
        <div>
          {userContext.camps.map((camp, index) => (
            <div className={'camp_select__camp'} key={index} onClick={() => handleCampSelect(camp)}>
              <img src={camp.img} className={'camp_select__camp-img'} />
              <div className={'camp_select__camp-name'}>{camp.full_name}</div>
              {camp.id == userContext.current_camp?.id && <Done color={'rgba(0,0,0,0.48)'} />}
            </div>
          ))}
          <div className={'camp_select__button'}>
            <Button variant={'outline'} href={'https://mirturbaz.ru/pages/partnership'}>
              <Add />
              Добавить объект
            </Button>
          </div>
        </div>
      </Popup>
    </div>
  );
}
