export interface File {
  path: string;
  isDir: boolean;
  progress?: number;
}

export interface FileState {
  files: File[];
  folders: File[];
  path: string;
}
