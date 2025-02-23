import { useContext } from 'react';
import { Button } from './common/button';
import { USER_CONTEXT, UserContext } from './contexts/user_context';
import OpenInNew from './icons/open_in_new';
import { ICON_COLOR } from './menu';

export default function HeaderLinks() {
  const userContext = useContext<USER_CONTEXT>(UserContext);
  return (
    <div className={'flex_horizontal middle-width'}>
      <Button href={`https://kurortix.ru${userContext.current_camp.seo_path_kx}`} target={'_blank'}>
        <OpenInNew color={ICON_COLOR} />
        Kurortix
      </Button>
      <Button href={`https://mirturbaz.ru${userContext.current_camp.seo_path}`} target={'_blank'}>
        <OpenInNew color={ICON_COLOR} />
        МирТурбаз
      </Button>
    </div>
  );
}
