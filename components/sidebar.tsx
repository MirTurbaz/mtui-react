import { useNavigate } from 'react-router-dom';
import { useResize } from '../hooks/use_resize';
import { Button } from './common/button';
import { Flex } from './common/flex';
import { DoubleArrowLeft } from './icons/double_arrow_left';
import { Menu } from './menu';

export default function Sidebar({ isShow = true, onClose }: { isShow: boolean; onClose: () => void }) {
  const { isExtraLargeScreen } = useResize();
  const navigate = useNavigate();

  return (
    <div className={`sidebar ${isShow && !isExtraLargeScreen ? 'sidebar_opened' : ''}`}>
      <Flex align={'center'} className={'sidebar__logo_wrapper'}>
        <div className={'sidebar__logo'} onClick={() => navigate('/')} />
        <Button variant={'outline'} className={'sidebar__btn'} onClick={onClose} title={'Скрыть меню'}>
          <DoubleArrowLeft />
        </Button>
      </Flex>
      <Menu />
    </div>
  );
}
