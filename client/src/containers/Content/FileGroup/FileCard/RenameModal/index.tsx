import React, { useState } from 'react';

import { Edit } from '@material-ui/icons';

import Button from '../../../../../components/Button';
import IconText from '../../../../../components/IconText';
import InputText from '../../../../../components/InputText';
import Modal from '../../../../../components/Modal';

type Props = {
  closeModal: () => void;
  renameHandler: (name: string) => void;
};

export default function RenameModal({ closeModal, renameHandler }: Props) {
  const [newName, setNewName] = useState('');
  return (
    <Modal closeModal={closeModal}>
      <IconText icon={<Edit />}>Rename</IconText>
      <InputText
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setNewName(e.target.value);
        }}
        style={{ margin: 12 }}
      />
      <Button
        onClick={() => {
          closeModal();
          renameHandler(newName);
        }}
        style={{ backgroundColor: '#4285f4', color: 'white', float: 'right' }}
      >
        RENAME
      </Button>
    </Modal>
  );
}
