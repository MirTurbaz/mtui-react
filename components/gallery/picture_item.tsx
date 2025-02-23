import React, { useRef, useState } from 'react';
import { GalleryData, PictureData } from '../../pages/gallery/gallery_page';
import { Button } from '../common/button';
import { Checkbox } from '../common/checkbox';
import { Popup } from '../common/popup';
import MoreVert from '../icons/more_vert';
import { EditPictureModal } from './edit_picture_modal';

interface PictureItemProps {
  picture: PictureData;
  key?: any;
  checked: boolean;
  handleChecked: (value: boolean) => void;
  main?: boolean;
  unselected?: boolean;
  handleDelete: (picture: PictureData) => void;
  handleDeleteFromGallery: (picture: PictureData) => void;
  handleMakeMain: (picture: PictureData) => void;
  data: GalleryData;
  updatePicturesInAllGalleries: (
    callback: (pictures: PictureData[], imageable_type: string, imageable_id: number) => PictureData[]
  ) => void;
}

export const PictureItem: React.FC<PictureItemProps> = ({
  picture,
  checked,
  handleChecked,
  main,
  unselected,
  handleDelete,
  handleMakeMain,
  handleDeleteFromGallery,
  data,
  updatePicturesInAllGalleries,
}) => {
  const moreRef = useRef(null);
  const [showMore, setShowMore] = useState(false);
  const [edit, setEdit] = useState(false);

  return (
    <div
      className={`gallery__picture ${checked && 'gallery__picture-checked'} ${unselected && 'gallery__picture-unselected'}`}
      style={{ backgroundImage: `url(${picture.url})` }}
    >
      <div className={'gallery__picture_top'}>
        <Checkbox value={checked} onChange={handleChecked} withBackground={true} />
        <Button
          variant={'outline'}
          size={'auto'}
          btnRef={moreRef}
          onClick={(e) => {
            setShowMore(true);
          }}
        >
          <MoreVert />
        </Button>
        <Popup
          anchor={moreRef.current}
          open={showMore}
          id={'account_popup'}
          title={'Действия с фото'}
          onClose={() => setShowMore(false)}
        >
          <Button
            className={`align-left margin-top-8 margin-bottom-8`}
            onClick={() => {
              setEdit(true);
              setShowMore(false);
            }}
          >
            Редактировать
          </Button>
          <Button
            className={`align-left margin-top-8 margin-bottom-8`}
            onClick={() => {
              handleMakeMain(picture);
              setShowMore(false);
            }}
          >
            Сделать главной
          </Button>
          {picture.imageables.length > 1 && (
            <Button
              className={`align-left margin-top-8 margin-bottom-8`}
              onClick={() => handleDeleteFromGallery(picture)}
            >
              Удалить из галереи
            </Button>
          )}
          <Button
            className={'align-left margin-bottom-8'}
            color={'danger'}
            onClick={() => {
              handleDelete(picture);
              setShowMore(false);
            }}
          >
            Удалить
          </Button>
        </Popup>
      </div>
      <div className={'gallery__picture_bottom'}>
        {!picture.moderated && <div className={'gallery__picture_moderating'}>На модерации</div>}
        {picture.to_moderate_delete && <div className={'gallery__picture_moderating'}>На удаление</div>}
        {main && <div className={'gallery__picture_main'}>Главная фотография</div>}
      </div>
      <EditPictureModal
        data={data}
        open={edit}
        onClose={() => setEdit(false)}
        picture={picture}
        onDelete={() => handleDelete(picture)}
        updatePicturesInAllGalleries={updatePicturesInAllGalleries}
      />
    </div>
  );
};
