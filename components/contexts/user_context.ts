import { createContext } from 'react';

export interface USER_CONTEXT {
  current_camp: {
    full_name: string;
    id: number;
    seo_path: string;
    seo_path_kx: string;
    seo_path_ubook: string;
    has_channel_manager: boolean;
  };
  setCurrentCamp: (camp: USER_CONTEXT['current_camp']) => void;
  camps: [
    {
      full_name: string;
      id: number;
      img: string;
    },
  ];
  current_user: {
    name: string;
    is_admin: boolean;
    id: number;
    has_pending_contract: boolean;
  };
}

export const UserContext = createContext<USER_CONTEXT>({
  current_camp: { full_name: '', id: 0, seo_path: '', seo_path_kx: '', seo_path_ubook: '', has_channel_manager: false },
  setCurrentCamp: () => {},
  camps: [],
  current_user: { name: '', is_admin: false, id: 0, has_pending_contract: false },
});
