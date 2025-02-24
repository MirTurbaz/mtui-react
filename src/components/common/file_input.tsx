import * as React from 'react';
import { Trash } from '../icons';
import FolderOpen from '../icons/folder_open';
import Image from '../icons/image';
import { Button } from './button';
import { Flex } from './flex';

export interface FileInputProps {
  className?: string;
  value?: any[] | null;
  onChange: (value: any) => void;
  accept?: string;
}

export const FileInput: React.FC<FileInputProps> = (props) => {
  const className = `file_input__wrapper ${props.className}`;

  let files = [];
  for (let i = 0; i < props.value?.length || 0; i++) files.push(props.value[i]);

  return (
    <div className={className}>
      <label className={'file_input__label'} style={props.value && { display: 'none' }}>
        <Button variant={'outline'} size={'auto'}>
          <FolderOpen />
          Выбрать файл
        </Button>
        <input
          type={'file'}
          className={'file_input__input'}
          accept={props.accept}
          onChange={(e) => props.onChange(e.target.files)}
        />
      </label>
      {files.map((file) => (
        <div className={'file_input__uploaded'}>
          <Flex gap={'small'} align={'center'}>
            <Image color={'#1E5BBE'} />
            <div className={'file_input__uploaded_name'}>{file.name}</div>
          </Flex>
          <Button size={'square'} onClick={() => props.onChange(null)}>
            <Trash color={'#1E5BBE'} />
          </Button>
        </div>
      ))}
    </div>
  );
};
