import { getSessionId } from './tool';

const init = (options: any) => {
  const setToken = (token: string) => {};
  const upload = (file: any) => {};
  const preview = (fileId: string) => {
    return {
      urlResult: {
        url: '',
      },
    };
  };
  const abortUpload = (fileId: string) => {};

  return {
    setToken,
    upload,
    preview,
    abortUpload,
  };
};
export const getStore = (pid?: string) => {
  const envValue =
    process.env.UMI_ENV === 'local'
      ? 'dev'
      : (process.env.UMI_ENV as string) || 'prod';
  const store = init({
    pid: pid || 'aliyunoss的sourceId',
    env: envValue,
    bizType: 'b',
  });
  const sessionId = getSessionId(); // 用户登陆进入系统的token
  if (sessionId && sessionId !== '') {
    store.setToken(sessionId);
  }
  return store;
};

export type UploadedFile = {
  fileId: string;
  fileUrl: string;
  fileName: string;
  fileType: string;
  success: boolean;
  categoryCode: string;
};

export async function upload(
  file: File,
  category: FSCategory,
  cutomerPath: string = '',
  ownerId: '',
  opt?: any,
  pid?: string,
): Promise<UploadedFile | null> {
  const size = file.size / 1024;
  if (size > 2 * 1024 * 1024) {
    throw new Error('附件大小不能超过2G');
  }

  const store = getStore(pid);
  const result = await store.upload(file, category, cutomerPath, ownerId, opt);
  if (result && result[0].code === 0 && result[0].data) {
    const { fileId, categoryCode, path, source, fileType } = result[0].data;
    const urlResult = await store.preview(fileId);
    const previewUrl = urlResult.url;
    return {
      fileId,
      fileUrl: previewUrl,
      fileName: file.name,
      fileType: fileType || file.name.split('.').pop() || '',
      categoryCode,
      path,
      source,
      success: true,
    };
  } else {
    throw new Error('上传失败');
  }
}

export function abortUpload(category: FSCategory): void {
  const store = getStore();
  store.abortUpload(category);
}

export default {
  upload,
  getStore,
  abortUpload,
};
