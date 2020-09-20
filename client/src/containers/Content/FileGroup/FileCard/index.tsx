import _path from 'path';
import React, { useState } from 'react';
import styled from 'styled-components';

import {
    Archive, Audiotrack, Code, Description, Folder, Image, InsertDriveFile, PictureAsPdf,
    SvgIconComponent, VideoLibrary
} from '@material-ui/icons';

import IconText from '../../../../components/IconText';
import service from '../../../../service/FileService';
import { Position } from '../../../../types';
import { File } from '../../../../types/file';
import FileContextMenu from './FileContextMenu';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  file: File;
  onClickHandler?: (path: string) => void;
};

const mime = require('mime-types');

const programmingLanguages = [
  'java',
  'html',
  'json',
  'css',
  'javascript',
  'jsx'
];
const pathToIcon = (address: string): SvgIconComponent => {
  if (isImage(address)) return Image;
  const mimeType = String(mime.lookup(address));
  if (
    programmingLanguages.filter((e) => mimeType.indexOf(e) !== -1).length !== 0
  )
    return Code;
  if (mimeType.startsWith('text')) return Description;
  if (mimeType.startsWith('audio')) return Audiotrack;
  if (mimeType.startsWith('video')) return VideoLibrary;
  if (mimeType.indexOf('pdf') !== -1) return PictureAsPdf;
  if (mimeType.indexOf('zip') !== -1 || mimeType.indexOf('compressed') !== -1)
    return Archive;
  return InsertDriveFile;
};

const isImage = (address: string): boolean => {
  if (address.indexOf('.') === -1) return false;
  const mimeType = mime.lookup(address);
  return mimeType && mimeType.startsWith('image');
};

export default function FileCard({
  file,
  onClickHandler,
  ...otherProps
}: Props) {
  const { isDir, path, progress } = file;
  const Icon = isDir ? Folder : pathToIcon(path);
  const name = _path.basename(path);
  const [isContextMenuVisible, setContextMenuVisible] = useState(false);
  const [position, setPosition] = useState<Position>({});
  const onContextMenuHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setPosition({ top: e.clientY, left: e.clientX });
    setContextMenuVisible(true);
  };
  const ref = React.createRef<HTMLDivElement>();
  return (
    <Root ref={ref} onContextMenu={onContextMenuHandler}>
      {isContextMenuVisible ? (
        <FileContextMenu contextFor={ref} folderPath={path} {...position} />
      ) : null}
      <IconText
        {...otherProps}
        onDoubleClick={() => {
          if (isDir && onClickHandler) {
            onClickHandler(path);
          } else {
            service.download(path);
          }
        }}
        outlined
        icon={<Icon />}
      >
        {name}
      </IconText>
      {progress ? (
        <ProgressBar>
          <ProgressStatus style={{ width: `${progress}%` }} />
        </ProgressBar>
      ) : null}
    </Root>
  );
}

const Root = styled.div`
  max-width: 100%;
  touch-action: pan-x pan-y;
  min-width: 0;
  margin: 7px;
  cursor: pointer;
`;

const ProgressBar = styled.div`
  height: 10px;
  border-radius: 6px;
  width: 100%;
  background-color: lightgrey;
`;
const ProgressStatus = styled.div`
  background-color: blue;
  border-radius: 6px;
  height: 100%;
`;
