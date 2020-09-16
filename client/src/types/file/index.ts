export interface File {
  path: string;
  isDir: boolean;
}

export interface IUpdateFiles {
  files: File[];
  folders: File[];
}

export interface FileState {
  files: File[];
  folders: File[];
}
