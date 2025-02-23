import React, { useEffect, useState } from 'react';
import { GalleryData, PictureData } from '../../pages/gallery/gallery_page';
import { Button } from '../common/button';
import { Checkbox } from '../common/checkbox';
import { Chips } from '../common/chips';
import { Divider } from '../common/divider';
import { Flex } from '../common/flex';
import { Modal } from '../common/modal';
import { Popup } from '../common/popup';
import { Select } from '../common/select';
import { TextField } from '../common/text_field';
import { Delete } from '../icons';
import Search from '../icons/search';

interface EditPictureModalProps {
  picture: PictureData;
  open: boolean;
  onClose: () => void;
  data: GalleryData;
  onDelete: () => void;
  updatePicturesInAllGalleries: (
    callback: (pictures: PictureData[], imageable_type: string, imageable_id: number) => PictureData[]
  ) => void;
}

const CATEGORIES = [
  { value: 'interior', label: 'Интерьер' },
  { value: 'exterior', label: 'Экстерьер' },
  { value: 'map', label: 'Карта территории / схема' },
  { value: 'exterior_winter', label: 'Экстерьер (зима)' },
  { value: 'exterior_summer', label: 'Экстерьер (лето)' },
];

export const EditPictureModal: React.FC<EditPictureModalProps> = (props) => {
  const [searchApartments, setSearchApartments] = useState(false);
  const [searchServices, setSearchServices] = useState(false);
  const [searchApartmentsRef, setSearchApartmentsRef] = useState<HTMLElement>(null);
  const [searchServicesRef, setSearchServicesRef] = useState<HTMLElement>(null);
  const [searchApartmentsValue, setSearchApartmentsValue] = useState('');
  const [searchServicesValue, setSearchServicesValue] = useState('');
  const [picture, setPicture] = useState<PictureData>(props.picture);
  const [originalPicture, setOriginalPicture] = useState<PictureData>(props.picture);
  const [isSending, setIsSending] = useState(false);
  const [modalRef, setModalRef] = useState<HTMLElement>(null);

  useEffect(() => {
    setPicture(props.picture);
    setOriginalPicture(JSON.parse(JSON.stringify(props.picture)));
  }, [JSON.stringify(props.picture)]);

  const filterApartment = (apartment: { name: string }) => {
    return (
      searchApartmentsValue.length == 0 || apartment.name?.toLowerCase()?.includes(searchApartmentsValue.toLowerCase())
    );
  };

  const filterServiceCategory = (category: { name: string; service_new: { name: string }[] }) => {
    return (
      searchServicesValue.length == 0 ||
      category.name?.toLowerCase()?.includes(searchServicesValue.toLowerCase()) ||
      category.service_new.some(filterServices)
    );
  };

  const filterServices = (service: { name: string }) => {
    return searchServicesValue.length == 0 || service.name?.toLowerCase()?.includes(searchServicesValue.toLowerCase());
  };

  const toggleImageable = (value: boolean, type: string, id: number, name: string) => {
    const newPicture = { ...picture };
    if (value) {
      newPicture.imageables = [...newPicture.imageables, { type: type, id: id, name: name }];
    } else {
      newPicture.imageables = newPicture.imageables.filter((i) => i.type != type || i.id != id);
    }
    setPicture(newPicture);
  };

  const save = () => {
    setIsSending(true);
    const request_options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(picture),
    };

    fetch('/api/pictures', request_options).then((r) => {
      setIsSending(false);
      props.onClose();
      props.updatePicturesInAllGalleries((pictures, imageable_type, imageable_id) => {
        if (picture.imageables.some((i) => i.id == imageable_id && i.type == imageable_type)) {
          if (!pictures.some((p) => p.id == picture.id)) {
            pictures.push({ ...picture, imageable_type: imageable_type, imageable_id: imageable_id });
          } else {
            pictures[pictures.findIndex((p) => p.id == picture.id)] = {
              ...picture,
              imageable_type: imageable_type,
              imageable_id: imageable_id,
            };
          }
        } else {
          pictures = pictures.filter((p) => p.id != picture.id);
        }
        return pictures;
      });
    });
  };

  return (
    <Modal onClose={props.onClose} open={props.open} title={'Редактирование фотографии'} bodyRef={setModalRef}>
      <img src={picture.big_url} className={'edit_picture_modal__img'} alt={'Фотография'} draggable={false} />
      <Flex className={'margin-top-16'} justify={'space-between'} align={'center'}>
        <Checkbox
          label={'В основной галерее'}
          onChange={(value) => toggleImageable(value, 'camp', props.data.camp.id, "Главная галерея")}
          value={picture.imageables.some((i) => i.type == 'camp')}
        />
        <Flex gap={8}>
          {/*<Button variant={'outline'}>Заменить</Button>*/}
          <Button
            variant={'outline'}
            color={'danger'}
            onClick={() => {
              props.onDelete();
              props.onClose();
            }}
          >
            <Delete />
          </Button>
        </Flex>
      </Flex>
      <TextField
        placeholder={'Описание'}
        value={picture.description}
        onChange={(value) => {
          const newPicture = { ...picture };
          newPicture.description = value;
          setPicture(newPicture);
        }}
        className={'margin-top-16'}
      />
      <Select
        label={'Категория фотографии'}
        className={'margin-top-16'}
        options={CATEGORIES}
        onChange={(value) => {
          const newPicture = { ...picture };
          newPicture.category = value.value as string;
          setPicture(newPicture);
        }}
        value={CATEGORIES.find((c) => c.value == picture.category)}
      />
      <Divider outerPadding={24} />
      <div className={'typography-h2'}>Привязка к категории номера</div>
      <Chips
        className={'margin-top-24'}
        chips={props.data.apartments
          .filter((i) => picture.imageables.some((_i) => _i.type == 'apartment' && _i.id == i.id))
          .map((i) => {
            return { label: i.name, value: i.id };
          })}
        onDelete={(value, label) => toggleImageable(false, 'apartment', value, label)}
      />
      <div style={{ position: 'relative' }}>
        <Popup
          open={searchApartments}
          onClose={() => setSearchApartments(false)}
          style={{ bottom: -24 }}
          id={'search_apartments'}
          anchor={searchApartmentsRef}
          preventMobileStyle={true}
          placement={'top'}
          disablePortal={true}
          className={'edit_picture_modal__search_popup'}
        >
          {props.data.apartments.filter(filterApartment).length == 0 && (
            <Flex justify={'center'} align={'center'} style={{ height: '100%' }} className={'typography-medium-3'}>
              Ничего не найдено
            </Flex>
          )}
          {props.data.apartments.filter(filterApartment).map((apartment) => (
            <Checkbox
              label={apartment.name}
              value={picture.imageables.some((i) => i.id == apartment.id && i.type == 'apartment')}
              onChange={(value) => toggleImageable(value, 'apartment', apartment.id, apartment.name)}
            />
          ))}
        </Popup>
      </div>
      <TextField
        icon={<Search />}
        placeholder={'Категория'}
        className={'margin-top-24'}
        wrapperRef={setSearchApartmentsRef}
        onClick={() => setSearchApartments(true)}
        value={searchApartmentsValue}
        onChange={setSearchApartmentsValue}
      />
      <Divider outerPadding={24} />
      <div className={'typography-h2'}>Привязка к услуге</div>
      <Chips
        className={'margin-top-24'}
        chips={props.data.service_categories
          .filter((i) => picture.imageables.some((_i) => _i.type == 'service_category' && _i.id == i.id))
          .map((i) => {
            return { label: i.name, value: i.id };
          })}
        onDelete={(value, label) => toggleImageable(false, 'service_category', value, label)}
      />
      <Chips
        className={'margin-top-8'}
        chips={props.data.service_categories
          .map((i) => i.service_new)
          .flat(1)
          .filter((i) => picture.imageables.some((_i) => _i.type == 'service_new' && _i.id == i.id))
          .map((i) => {
            return { label: i.name, value: i.id };
          })}
        onDelete={(value, label) => toggleImageable(false, 'service_new', value, label)}
      />
      <div style={{ position: 'relative' }}>
        <Popup
          open={searchServices}
          onClose={() => setSearchServices(false)}
          id={'search_services'}
          anchor={searchServicesRef}
          preventMobileStyle={true}
          placement={'top'}
          disablePortal={true}
          style={{ bottom: -24 }}
          className={'edit_picture_modal__search_popup'}
        >
          {props.data.service_categories.filter(filterServiceCategory).length == 0 && (
            <Flex justify={'center'} align={'center'} style={{ height: '100%' }} className={'typography-medium-3'}>
              Ничего не найдено
            </Flex>
          )}
          {props.data.service_categories.filter(filterServiceCategory).map((category) => (
            <>
              <Checkbox
                label={category.name}
                value={picture.imageables.some((i) => i.id == category.id && i.type == 'service_category')}
                onChange={(value) => toggleImageable(value, 'service_category', category.id, category.name)}
              />
              {category.service_new.filter(filterServices).map((service) => (
                <Checkbox
                  label={service.name}
                  value={picture.imageables.some((i) => i.id == service.id && i.type == 'service_new')}
                  onChange={(value) => toggleImageable(value, 'service_new', service.id, category.name)}
                  style={{ marginLeft: 38 }}
                />
              ))}
            </>
          ))}
        </Popup>
      </div>
      <TextField
        icon={<Search />}
        placeholder={'Услуга'}
        className={'margin-top-24'}
        wrapperRef={setSearchServicesRef}
        onClick={() => setSearchServices(true)}
        onChange={setSearchServicesValue}
        value={searchServicesValue}
      />
      <div className={'modal__buttons'}>
        <Button
          variant={'outline'}
          onClick={() => {
            setPicture(originalPicture);
            props.onClose();
          }}
          disabled={isSending}
        >
          Отмена
        </Button>
        <Button
          variant={'filled'}
          color={'primary'}
          onClick={() => {
            save();
            props.onClose();
          }}
          disabled={isSending}
        >
          Сохранить
        </Button>
      </div>
    </Modal>
  );
};
