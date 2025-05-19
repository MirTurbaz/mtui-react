import * as React from 'react';
import { ReactElement, useEffect, useState } from 'react';
import { useResize } from '../hooks';
import { Button } from './button';
import { Flex } from './flex';
import { Modal } from './modal';

interface IPopConfirmProps {
  /** The text of the Cancel button (default: 'Нет') */
  cancelText?: string;
  /** The text of the Confirm button (default: 'Да') */
  okText?: string;
  title: string;
  open?: boolean;
  description?: string | ReactElement;
  onCancel?: (e) => void;
  onConfirm: (e) => void;
  children?: ReactElement;
  withoutCancel?: boolean;
}

export const PopConfirm: React.FC<IPopConfirmProps> = ({ cancelText = 'Отмена', okText = 'Да', ...props }) => {
  const [open, setOpen] = useState<boolean>(props.open);
  const { isMobile } = useResize();

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  function handleClose() {
    setOpen(false);
  }

  function handleCancel(e) {
    props.onCancel?.(e);
    handleClose();
  }

  function handleConfirm(e) {
    props.onConfirm(e);
    handleClose();
  }

  return (
    <>
      {props.children && <div onClick={() => setOpen(true)}>{props.children}</div>}
      <Modal
        className={'modal_mobile-height_auto'}
        open={open}
        onClose={handleCancel}
        title={
          <Flex vertical className={'margin-top-14 margin-bottom-14'}>
            <span className={'typography-h2'}>{props.title}</span>
          </Flex>
        }
        titleClassName={'flex-container flex-container_align_start no-border padding-bottom-0'}
        bodyClassName={'padding-top-12'}
        size={isMobile ? 'xs' : 'sm'}
      >
        <Flex>{props.description && <span className={'typography-regular-3'}>{props.description}</span>}</Flex>
        <Flex justify={'start'} className={'modal__buttons'} gap={'small'}>
          <Button variant={'filled'} color={'primary'} onClick={handleConfirm}>
            {okText}
          </Button>
          {!props.withoutCancel && (
            <Button variant={'outline'} onClick={handleCancel}>
              {cancelText}
            </Button>
          )}
        </Flex>
      </Modal>
    </>
  );
};
