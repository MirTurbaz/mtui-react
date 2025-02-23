import React from 'react';
import LoadingSpinner from '../icons/loading_spinner';

export const PictureUploading: React.FC<{ progress: number; key: any }> = ({ progress }) => {
  return (
    <div className={'gallery__picture_uploading'}>
      <LoadingSpinner color={'#417EE1'} progress={progress} />
    </div>
  );
};
