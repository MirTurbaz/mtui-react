import React, { useContext, useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { useResize } from '../../hooks/use_resize';
import { GalleryData, PictureData } from '../../pages/gallery/gallery_page';
import { Button } from '../common/button';
import { Flex } from '../common/flex';
import { PopConfirm } from '../common/pop_confirm';
import { NOTIFICATION_CONTEXT, NotificationContext } from '../contexts/notification_context';
import FolderOpen from '../icons/folder_open';
import NoPhoto from '../icons/no_photo';
import { PictureItem } from './picture_item';
import { PictureUploading } from './picture_uploading';

interface GalleryProps {
  pictures: PictureData[];
  data: GalleryData;
  imageableId: number;
  imageableType: string;
  updatePictures: (pictures: PictureData[]) => void;
  onReloadPage: () => void;
  updatePicturesInAllGalleries: (
    callback: (pictures: PictureData[], imageable_type: string, imageable_id: number) => PictureData[]
  ) => void;
  className?: string;
}

interface UploadingFile {
  id: string;
  file: any;
  progress: number;
}

export const Gallery: React.FC<GalleryProps> = ({ pictures, updatePictures, ...props }) => {
  const [checked, setChecked] = useState<number[]>([]);
  // Файлы для загрузки кладем в очередь, берем из очереди по интервалу (ограничиваем одновременную загрузку фоток, дабы не грузить серв)
  const [uploadQueue, setUploadQueue] = useState<UploadingFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [draggedOver, setDraggedOver] = useState(false);
  const [sorting, setSorting] = useState(false);
  const { isMobile, isTouchDevice } = useResize();
  const [deletingId, setDeletingId] = useState(null);
  const [deletingChosen, setDeletingChosen] = useState(false);
  const notyContext = useContext<NOTIFICATION_CONTEXT>(NotificationContext);

  const handleChecked = (value: boolean, id: number) => {
    let newChecked = [...checked];
    if (value) {
      newChecked.push(id);
    } else {
      newChecked = newChecked.filter((i) => i != id);
    }
    setChecked(newChecked);
  };

  const handleCheckAll = () => {
    setChecked(pictures.map((p) => p.id));
  };

  const handleUncheckAll = () => {
    setChecked([]);
  };

  const handleMakeMain = (picture: PictureData) => {
    let newPictures = [picture, ...pictures.filter((p) => p.id != picture.id)];
    updatePictures(newPictures);
    handleReorder(newPictures);
  };

  const handleReorder = (pictures = pictures) => {
    if (pictures.length == 0) return;
    let priorities = {};
    pictures.forEach((pic, i) => {
      priorities[pic.id] = i;
    });

    const request_options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priorities: priorities,
        imageable_type: pictures[0].imageable_type,
        imageable_id: pictures[0].imageable_id,
      }),
    };

    fetch('/api/pictures/update_priorities', request_options);
  };

  const uploadFile = (file: UploadingFile) => {
    setUploading(true);
    let formData = new FormData();
    formData.append('picture', file.file);
    formData.append('imageable_type', props.imageableType);
    formData.append('imageable_id', props.imageableId.toString());

    let xhr = new XMLHttpRequest();
    xhr.onload = () => {
      const newUploadQueue = [...uploadQueue];
      newUploadQueue.splice(0, 1);
      setUploadQueue(newUploadQueue);
      setUploading(false);
      const res = JSON.parse(xhr.response);
      updatePictures([...pictures, res]);
    };
    xhr.onerror = () => {
      notyContext.addNotification({ type: 'danger', title: 'Произошла ошибка при загрузке фото' });
      const newUploadQueue = [...uploadQueue];
      newUploadQueue.splice(0, 1);
      setUploadQueue(newUploadQueue);
      setUploading(false);
    };
    xhr.upload.addEventListener(
      'progress',
      (e) => {
        const newUploadQueue = [...uploadQueue];
        newUploadQueue.find((f) => f.id == file.id).progress = (e.loaded / e.total) * 100;
        setUploadQueue(newUploadQueue);
      },
      false
    );

    xhr.open('POST', '/api/pictures/upload_to_imageable.json');
    xhr.send(formData);
  };

  const addFilesToQueue = (files: []) => {
    const filesObjects = [];
    for (let i = 0; i < files.length; i++) {
      filesObjects.push({
        id: Math.random().toString(16).slice(2),
        file: files[i],
        progress: 0,
      });
    }
    setUploadQueue([...uploadQueue, ...filesObjects]);
  };

  const handleUpload = (e) => {
    const files = e.target.files;
    addFilesToQueue(files);
  };

  useEffect(() => {
    let timer = setInterval(() => {
      if (uploading || uploadQueue.length == 0) return;
      const newUploadQueue = [...uploadQueue];
      uploadFile(newUploadQueue[0]);
    }, 250);

    return () => clearInterval(timer);
  }, [JSON.stringify(uploadQueue), uploading]);

  const handleDelete = () => {
    const picture = pictures.find((p) => p.id == deletingId);
    setDeletingId(null);
    if (!picture) return;
    const request_options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: picture.id }),
    };

    fetch('/api/pictures', request_options)
      .then((res) => res.json())
      .then((res) => {
        if (res.deleted) {
          props.updatePicturesInAllGalleries((pictures) => pictures.filter((p) => p.id != picture.id));
        } else {
          props.updatePicturesInAllGalleries((pictures) => {
            const p = pictures.find((p) => p.id == picture.id);
            if (p) p.to_moderate_delete = true;
            return pictures;
          });
        }
      })
      .catch((e) =>
        notyContext.addNotification({ type: 'danger', title: 'Произошла ошибка при удалении фото' + e.message })
      );
  };

  const handleDeleteFromGallery = (picture: PictureData) => {
    if (picture.imageables.length == 1) {
      notyContext.addNotification({
        type: 'danger',
        title: 'Выбранная фотография доступна только в этой галерее.',
        message: 'Для полного удаления нажмите кнопку «Удалить».',
      });
      return;
    }

    const request_options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageable_type: picture.imageable_type, imageable_id: picture.imageable_id }),
    };

    updatePictures(pictures.filter((p) => p.id != picture.id));

    fetch(`/api/pictures/${picture.id}/remove_from_imageable`, request_options).catch(() =>
      notyContext.addNotification({ type: 'danger', title: 'Произошла ошибка при удалении фото' })
    );
  };

  const handleDeleteChosenFromGallery = () => {
    checked.forEach((id) => {
      let picture = pictures.find((p) => p.id == id);
      handleDeleteFromGallery(picture);
    });

    setChecked([]);
  };

  const handleDeleteChosen = () => {
    setDeletingChosen(false);
    let promises = [];
    checked.forEach((id) => {
      const request_options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      };
      promises.push(fetch('/api/pictures', request_options));
    });

    Promise.all(promises).then((results) => {
      let jsonPromises = [];

      results.forEach((res) => jsonPromises.push(res.json()));

      Promise.all(jsonPromises).then((results) => {
        props.updatePicturesInAllGalleries((pictures) => {
          results.forEach((res, i) => {
            if (res['deleted']) {
              pictures = pictures.filter((p) => p.id != checked[i]);
            } else {
              const pic = pictures.find((p) => p.id == checked[i]);
              if (pic) pic.to_moderate_delete = true;
            }
          });
          return pictures;
        });
        setChecked([]);
      });
    });
  };

  const handleDragOver = (e) => {
    if (sorting) return;
    e.preventDefault();
    setDraggedOver(true);
  };

  const handleDrop = (e) => {
    if (sorting) return;
    e.preventDefault();
    e.stopPropagation();
    let dt = e.dataTransfer;
    let files = dt.files;
    addFilesToQueue(files);
    setDraggedOver(false);
  };

  const handleDragEnter = (e) => {
    if (sorting) return;
    e.preventDefault();
    e.stopPropagation();
    setDraggedOver(true);
  };

  return (
    <div
      className={`gallery__wrapper ${draggedOver && 'gallery__wrapper-dragged'} ${props.className}`}
      onDragEnter={handleDragEnter}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={() => setDraggedOver(false)}
    >
      <Flex justify={'space-between'} wrap={'wrap'} className={'gallery__buttons_wrapper'}>
        {checked.length == 0 && (
          <Flex align={'center'} gap={16}>
            <label>
              <Button variant={'filled'} color={'primary'}>
                <FolderOpen color={'white'} />
                Выбрать фото
              </Button>
              <input type={'file'} style={{ display: 'none' }} accept='image/*' multiple onChange={handleUpload} />
            </label>
            {!isMobile && <span>или перетащите фото сюда</span>}
          </Flex>
        )}
        {checked.length > 0 && (
          <Flex align={'center'} wrap={'wrap'}>
            <div className={'gallery__buttons_label'}>С выбранными:</div>
            <Button color={'primary'} onClick={handleDeleteChosenFromGallery}>
              Удалить из галереи
            </Button>
            <Button color={'danger'} onClick={() => setDeletingChosen(true)}>
              Удалить
            </Button>
          </Flex>
        )}
        <Flex>
          {checked.length > 0 && (
            <Button color={'primary'} onClick={handleUncheckAll}>
              Отменить выбор
            </Button>
          )}
          {checked.length < pictures.length && (
            <Button color={'primary'} onClick={handleCheckAll}>
              Выбрать все
            </Button>
          )}
        </Flex>
      </Flex>
      {pictures.length == 0 && uploadQueue.length == 0 && (
        <div className={'gallery__empty'}>
          <NoPhoto color={'#0000001F'} />
          Фото не заданы
        </div>
      )}
      {(pictures.length > 0 || uploadQueue.length > 0) && (
        <ReactSortable<PictureData>
          swap
          delayOnTouchStart={isTouchDevice && isMobile}
          delay={isTouchDevice && isMobile ? 400 : 0}
          list={pictures}
          setList={updatePictures}
          onStart={() => setSorting(true)}
          onEnd={() => setSorting(false)}
          onSort={() => handleReorder(pictures)}
          disabled={uploading}
          className={'gallery__pictures_wrapper'}
        >
          {pictures.map((picture, i) => (
            <PictureItem
              picture={picture}
              data={props.data}
              key={picture.id}
              main={i == 0}
              unselected={checked.length > 0 && !checked.includes(picture.id)}
              checked={checked.includes(picture.id)}
              handleDelete={() => setDeletingId(picture.id)}
              handleDeleteFromGallery={handleDeleteFromGallery}
              handleChecked={(value: boolean) => handleChecked(value, picture.id)}
              handleMakeMain={handleMakeMain}
              updatePicturesInAllGalleries={props.updatePicturesInAllGalleries}
            />
          ))}
          {uploadQueue.map((file) => (
            <PictureUploading key={file.id} progress={file.progress} />
          ))}
        </ReactSortable>
      )}
      <PopConfirm
        title={'Вы действительно хотите удалить это фото?'}
        onConfirm={handleDelete}
        open={!!deletingId}
        onCancel={() => setDeletingId(null)}
        okText={'Да, удалить'}
        description={
          <>
            <div>Фотография будут удалена из следующих категорий номеров и услуг:</div>
            <ul>{pictures.find((p) => p.id == deletingId)?.imageables.map((i) => <li>{i.name}</li>)}</ul>
          </>
        }
      />
      <PopConfirm
        title={'Вы действительно хотите удалить эти фото?'}
        onConfirm={handleDeleteChosen}
        open={deletingChosen}
        okText={'Да, удалить'}
        onCancel={() => setDeletingChosen(false)}
        description={
          <>
            <div>Фотографии будут удалены из следующих категорий номеров и услуг:</div>
            <ul>
              {checked
                .map((id) => pictures.find((p) => p.id == id).imageables)
                .flat(1)
                .map((i) => (
                  <li>{i.name}</li>
                ))}
            </ul>
          </>
        }
      />
    </div>
  );
};
