import React, { useState } from 'react';

import { CreateNewFolder } from '@material-ui/icons';

import Button from '../../../components/Button';
import IconText from '../../../components/IconText';
import InputText from '../../../components/InputText';
import Modal from '../../../components/Modal';

type Props = {
  closeModal: () => void;
  uploadFromUrlHandler: (url: string, name?: string) => void;
};
export default function UploadFromUrlModal({
  closeModal,
  uploadFromUrlHandler
}: Props) {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  return (
    <Modal closeModal={closeModal}>
      <IconText icon={<CreateNewFolder />}>URL</IconText>
      <InputText
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setUrl(e.target.value);
        }}
        placeholder="URL"
        style={{ margin: 12 }}
      />
      <InputText
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setName(e.target.value);
        }}
        placeholder="Name"
        style={{ margin: 12 }}
      />
      <Button
        onClick={() => {
          if (name.length === 0) {
            uploadFromUrlHandler(url);
          } else {
            uploadFromUrlHandler(url, name);
          }
          closeModal();
        }}
        style={{ backgroundColor: '#4285f4', color: 'white', float: 'right' }}
      >
        UPLOAD
      </Button>
    </Modal>
  );
}
