import * as React from 'react';
import { ReactNode } from 'react';
import { useResize } from '../../hooks/use_resize';
import { Flex } from './flex';

export interface IEmptyDataProps {
  title: string;
  description?: string | ReactNode;
  icon: React.ReactNode;
  actions?: React.ReactNode | React.ReactNode[];
}

export const EmptyData: React.FC<IEmptyDataProps> = ({ title, description, icon, actions }) => {
  const { isMobile } = useResize();

  return (
    <Flex vertical align={'center'} className={'empty-data'}>
      <Flex justify={'center'} className={`empty-data__bg ${isMobile ? 'empty-data__bg_mobile' : ''}`}>
        <div className={'empty-data__blur-container'}></div>
        <div className={'empty-data__blur-ellipse'}></div>
      </Flex>
      <div className={'empty-data__icon'}>{icon}</div>
      <Flex vertical gap={'small'} justify={'center'} align={'center'} className={'empty-data__text'}>
        <div className={'typography-medium-3'}>{title}</div>
        {description && <div className={'typography-regular'}>{description}</div>}
      </Flex>
      {actions && <div className={'empty-data__actions'}>{actions}</div>}
    </Flex>
  );
};
