interface Cred {
  username: string;
  password: string;
}

type Params = { [key: string]: string };

interface ApiError {
  title: string;
  message: string;
}

interface UserDirectory {
  name: string;
  scopedPath: string;
  files: PartialArcFile[];
  directories: PartialUserDir[];
}

interface PartialUserDir {
  name: string;
  scopedPath: string;
}

interface PartialArcFile {
  size?: number;
  mime: string;
  filename: string;
  scopedPath: string;
  dateCreated: number;
  dateModified: number;
}

interface ArcFile {
  name: string;
  path: string;
  data: ArrayBuffer;
  mime: string;
  anymime?: boolean;
}

interface DirReadResponse {
  valid: boolean;
  data: UserDirectory;
  error?: ApiError;
}

type DirectoryGet = Promise<UserDirectory | false>;

interface DefaultResponse {
  valid: boolean;
  data: any;
  error?: {
    title: string;
    message: string;
  };
  statusCode?: number;
}

type ApiResponse = Promise<DefaultResponse>;

type UrlParams = Record<string, any>;

interface FSQuota {
  username: string;
  max: number;
  free: number;
  used: number;
}
