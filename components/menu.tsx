import * as React from 'react';
import { useState } from 'react';
import { NavLink, useMatch } from 'react-router-dom';
import { Divider } from './common/divider';
import Bed from './icons/bed';
import Calendar from './icons/calendar';
import ClipboardAccount from './icons/clipboard_account';
import Expand from './icons/expand';
import Gallery from './icons/gallery';
import Group from './icons/group';
import Home from './icons/home';
import Monetization from './icons/monetization';
import OpenInNew from './icons/open_in_new';
import QuestionAnswer from './icons/question_answer';
import Today from './icons/today';

export const ICON_COLOR = 'rgba(0, 0, 0, 0.64)';

export interface MenuProps {
  onGoTo?: () => void;
}

export const Menu: React.FC<MenuProps> = (props) => {
  const [tariffsOpen, setTariffsOpen] = useState(false);
  const [campOpen, setCampOpen] = useState(false);
  const [financesOpen, setFinancesOpen] = useState(false);
  const tariffsActive = useMatch('/tariffs*');
  const campActive = useMatch('/camp*');
  const financesActive = useMatch('/finances*');

  return (
    <div className={'menu__wrapper'}>
      <NavLink to={'/'} className={'menu__item'} onClick={props.onGoTo}>
        <Home color={ICON_COLOR} />
        Сводка
      </NavLink>
      <NavLink to={'/bookings'} className={'menu__item'} onClick={props.onGoTo}>
        <Today color={ICON_COLOR} />
        Бронирования
      </NavLink>
      <NavLink to={'/planning'} className={'menu__item'} onClick={props.onGoTo}>
        <Calendar color={ICON_COLOR} />
        Шахматка
      </NavLink>
      <div className={`menu__item-with_children ${(tariffsOpen || tariffsActive) && 'menu__item-opened'}`}>
        <div className={'menu__item'} onClick={() => setTariffsOpen(!tariffsOpen)}>
          <Bed color={ICON_COLOR} />
          <div className={'menu__item_name'}>Номера и тарифы</div>
          <Expand color={ICON_COLOR} className={'menu__item_expand'} />
        </div>
        <div className={`menu__item-children ${tariffsOpen || tariffsActive ? 'menu__item-children_opened' : ''}`}>
          <NavLink to='/tariffs/apartments' className='menu__item' onClick={props.onGoTo}>
            Категории номеров
          </NavLink>
          <NavLink to='/tariffs/rooms' className='menu__item' onClick={props.onGoTo}>
            Доступность номеров
          </NavLink>
          <NavLink to='/tariffs' className='menu__item' end onClick={props.onGoTo}>
            Тарифы
          </NavLink>
          <NavLink to='/tariffs/prices' className='menu__item' onClick={props.onGoTo}>
            Цены и ограничения
          </NavLink>
        </div>
      </div>
      <NavLink to={'/reviews'} className={'menu__item'} onClick={props.onGoTo}>
        <QuestionAnswer color={ICON_COLOR} />
        Отзывы
      </NavLink>
      <NavLink to={'/gallery'} className={'menu__item'} onClick={props.onGoTo}>
        <Gallery color={ICON_COLOR} />
        Фотографии
      </NavLink>
      <div className={`menu__item-with_children ${(campOpen || campActive) && 'menu__item-opened'}`}>
        <div className={'menu__item'} onClick={() => setCampOpen(!campOpen)}>
          <Bed color={ICON_COLOR} />
          <div className={'menu__item_name'}>Объект</div>
          <Expand color={ICON_COLOR} className={'menu__item_expand'} />
        </div>
        <div className={`menu__item-children ${campOpen || campActive ? 'menu__item-children_opened' : ''}`}>
          <NavLink to={'/camp/cancellation_rules'} className={'menu__item'} onClick={props.onGoTo}>
            Аннуляция и штрафы
          </NavLink>
          <NavLink to={'/camp/services'} className={'menu__item'} onClick={props.onGoTo}>
            Удобства и услуги
          </NavLink>
          <NavLink to={'/camp/medical_services'} className={'menu__item'} onClick={props.onGoTo}>
            Медицинские услуги
          </NavLink>
          <NavLink to={'/camp/info'} className={'menu__item'} end onClick={props.onGoTo}>
            Реквизиты
          </NavLink>
          <NavLink to={'/camp/contracts'} className={'menu__item'} onClick={props.onGoTo}>
            Договоры
          </NavLink>
          <NavLink to={'/camp/settings'} className={'menu__item'} onClick={props.onGoTo}>
            Настройки объекта
          </NavLink>
        </div>
      </div>
      <div className={`menu__item-with_children ${(financesOpen || financesActive) && 'menu__item-opened'}`}>
        <div className={'menu__item'} onClick={() => setFinancesOpen(!financesOpen)}>
          <Monetization />
          <div className={'menu__item_name'}>Финансы</div>
          <Expand color={ICON_COLOR} className={'menu__item_expand'} />
        </div>
        <div className={`menu__item-children ${financesOpen || financesActive ? 'menu__item-children_opened' : ''}`}>
          <NavLink to={'/finances/agent_report'} className={'menu__item'} onClick={props.onGoTo}>
            Отчеты агента
          </NavLink>
          <NavLink to={'/finances/reconciliation_report'} className={'menu__item'} onClick={props.onGoTo}>
            Сверка
          </NavLink>
        </div>
      </div>
      <NavLink to={'/contacts'} className={'menu__item'} onClick={props.onGoTo}>
        <ClipboardAccount />
        Контакты
      </NavLink>
      <NavLink to={'/accounts'} className={'menu__item'} onClick={props.onGoTo}>
        <Group />
        Пользователи
      </NavLink>
      <Divider outerPadding={0} marginVertical={16} />
      <NavLink to={'/more_clients'} className={'menu__item'} onClick={props.onGoTo}>
        <OpenInNew />
        Привлечь клиентов
      </NavLink>
    </div>
  );
};
