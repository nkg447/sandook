import React, { useState } from 'react';

import { CreateNewFolder } from '@material-ui/icons';

import Button from '../../../components/Button';
import IconText from '../../../components/IconText';
import InputText from '../../../components/InputText';
import Modal from '../../../components/Modal';

type Props = {
  closeModal: () => void;
  newFolderHandler: (name: string) => void;
};
export default function NewFolderModal({
  closeModal,
  newFolderHandler
}: Props) {
  const [folderName, setFolderName] = useState('');
  return (
    <Modal closeModal={closeModal}>
      <IconText icon={<CreateNewFolder />}>New Folder</IconText>
      <InputText
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setFolderName(e.target.value);
        }}
        style={{ margin: 12 }}
      />
      <Button
        onClick={() => {
          newFolderHandler(folderName);
          closeModal();
        }}
        style={{ backgroundColor: '#4285f4', color: 'white', float: 'right' }}
      >
        CREATE
      </Button>
    </Modal>
  );
}
