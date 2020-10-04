import React, { useState } from 'react';

import { CreateNewFolder } from '@material-ui/icons';

import Button from '../../../components/Button';
import IconText from '../../../components/IconText';
import InputText from '../../../components/InputText';
import Modal from '../../../components/Modal';

type Props = {
  closeModal: () => void;
  uploadFromUrlHandler: (name: string) => void;
};
export default function UploadFromUrlModal({
  closeModal,
  uploadFromUrlHandler
}: Props) {
  const [url, setUrl] = useState('');
  return (
    <Modal closeModal={closeModal}>
      <IconText icon={<CreateNewFolder />}>URL</IconText>
      <InputText
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setUrl(e.target.value);
        }}
        style={{ margin: 12 }}
      />
      <Button
        onClick={() => {
          uploadFromUrlHandler(url);
          closeModal();
        }}
        style={{ backgroundColor: '#4285f4', color: 'white', float: 'right' }}
      >
        UPLOAD
      </Button>
    </Modal>
  );
}
