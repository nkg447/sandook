export interface File {
  path: string;
  isDir: boolean;
}

export interface FileState {
  files: File[];
  folders: File[];
}
