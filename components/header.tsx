import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResize } from '../hooks/use_resize';
import CampSelect from './camp_select';
import { Button } from './common/button';
import { Modal } from './common/modal';
import { Popup } from './common/popup';
import { USER_CONTEXT, UserContext } from './contexts/user_context';
import HeaderLinks from './header_links';
import Account from './icons/account';
import BellCogOutline from './icons/bell_cog_outline';
import Expand from './icons/expand';
import Help from './icons/help';
import Logout from './icons/logout';
import MenuIcon from './icons/menu_icon';
import { Menu } from './menu';

export const HEADER_HEIGHT = 56;

export default function Header({ showSidebar, onOpenSidebar }: { showSidebar: boolean; onOpenSidebar: () => void }) {
  const helpRef = useRef(null);
  const accountRef = useRef(null);
  const [showHelp, setShowHelp] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const userContext = useContext<USER_CONTEXT>(UserContext);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const { isExtraLargeScreen } = useResize();
  const navigate = useNavigate();

  return (
    <div
      className={`header ${!showSidebar && 'header-full_width'} ${userContext.current_user.has_pending_contract && 'header-no_sidebar'}`}
    >
      {isExtraLargeScreen && (
        <div
          onClick={() => navigate('/')}
          className={`sidebar__logo_wrapper header__logo ${!userContext.current_user.has_pending_contract && 'show-xl'}`}
        >
          <div className={'sidebar__logo'} />
        </div>
      )}
      {!isExtraLargeScreen && !showSidebar && (
        <Button variant={'outline'} className={'sidebar__btn'} onClick={onOpenSidebar} title={'Показать меню'}>
          <MenuIcon />
        </Button>
      )}
      {!userContext.current_user.has_pending_contract && (
        <div className={'hide-md'}>
          <CampSelect />
        </div>
      )}
      {!userContext.current_user.has_pending_contract && (
        <div className={'hide-xl'}>
          <HeaderLinks />
        </div>
      )}
      <div style={{ flex: 1 }} />
      <div className={'flex_horizontal'}>
        <Button
          btnRef={helpRef}
          onClick={(e) => {
            setShowHelp(true);
          }}
        >
          <Help />
          <Popup
            anchor={helpRef.current}
            title={'Поддержка'}
            open={showHelp}
            id={'help_popup'}
            onClose={() => setShowHelp(false)}
          >
            <div className={'header_help__wrapper'}>
              <div className={'typography-regular'}>Есть вопросы?</div>
              <div className={'typography-light margin-top-12'}>Звоните:</div>
              <a href={'tel:+7 (499) 641-1525'} className={'typography-link'}>
                +7 (499) 641-1525
              </a>
              <div className={'typography-light margin-top-8'}>Или пишите:</div>
              <a href={'mailto:manager@mirturbaz.ru'} className={'typography-link'}>
                manager@mirturbaz.ru
              </a>
            </div>
          </Popup>
        </Button>
        <Button
          btnRef={accountRef}
          onClick={(e) => {
            setShowAccount(true);
          }}
        >
          <Account />
          <span className={'hide-xl'}>{userContext.current_user.name}</span>
          <Expand className={'hide-xl'} rotated={showAccount} />
          <Popup
            anchor={accountRef.current}
            open={showAccount}
            id={'account_popup'}
            title={userContext.current_user.name}
            onClose={() => setShowAccount(false)}
          >
            <Button
              style={{ whiteSpace: 'nowrap' }}
              onClick={() => setShowAccount(false)}
              href={'/notifications_settings'}
              className={'align-left'}
            >
              <BellCogOutline />
              Настройка уведомлений
            </Button>
            <Button style={{ whiteSpace: 'nowrap' }} href={'/logout'} native={true} className={'align-left'}>
              <Logout />
              Выйти
            </Button>
          </Popup>
        </Button>
        <Button className={'show-xl'} onClick={() => setOpenMobileMenu(true)}>
          <MenuIcon />
        </Button>
        <Modal
          className={'modal-no_padding'}
          onClose={() => setOpenMobileMenu(false)}
          open={openMobileMenu}
          title={<CampSelect />}
        >
          <Menu onGoTo={() => setOpenMobileMenu(false)} />
        </Modal>
      </div>
    </div>
  );
}
