import { enmuFileType } from '@/constants';
import { getWebOfficeUrl, refreshWebOfficeUrl } from '@/services/demo/common';
import fsService from '@/utils/fs-service';

import { Image, Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

const getFileData = async (fileId: string) => {
  const { url } = await fsService.getStore().preview(fileId);
  return url;
};

/** 视频预览 */
const RenderVideo = (props: { file: any }) => {
  const [url, setUrl] = useState('');

  const initFile = async () => {
    const blobData = await getFileData(props.file?.fileId);
    setUrl(blobData);
  };

  useEffect(() => {
    initFile();
  }, []);

  return (
    <ReactPlayer
      width="100%"
      height={'70vh'}
      controls={true}
      playing
      url={url}
    />
  );
};

/** 图片预览 */
const RenderImage = (props: { file: any }) => {
  const [url, setUrl] = useState('');

  const initFile = async () => {
    const blobData = await getFileData(props.file?.fileId);
    setUrl(blobData);
  };

  useEffect(() => {
    initFile();
  }, []);

  return (
    <div className="flex justify-center relative">
      <Image src={url} />
    </div>
  );
};

const RenderWebOfficeRender = (props: any) => {
  const file = props.file;
  const errcorCb = props.errcorCb;
  const refIns = useRef();
  const refContainer = useRef();
  const refTokenInfo = useRef();
  const tokenTimeOut = 30 * 60 * 1000;

  const initFileData = async () => {
    refTokenInfo.current = await getWebOfficeUrl(file.fileId).catch(() => {
      errcorCb?.();
    });
    const refreshToken = function () {
      return new Promise(function (resolve) {
        refreshWebOfficeUrl(file.fileId).then(function (tokenInfo) {
          refTokenInfo.current = tokenInfo;
          resolve({
            token: tokenInfo.accessToken,
            timeout: tokenTimeOut, // 单位为ms。可配合refreshToken配置函数使用，在超时前调用refreshToken重新刷新Token。
          });
        });
      });
    };

    refIns.current = window.aliyun?.config({
      url: refTokenInfo.current?.webOfficeUrl, //设置文档协作URL地址。
      mount: refContainer.current,
      refreshToken,
    });

    refIns.current?.setToken({
      token: refTokenInfo.current?.accessToken,
      timeout: tokenTimeOut,
    });
  };

  useEffect(() => {
    if (refContainer.current) {
      initFileData();
    }
  }, [refContainer.current]);

  return <div style={{ height: '70vh' }} ref={refContainer}></div>;
};

export const usePreview = () => {
  const reviewCmp = {
    // 图片
    [enmuFileType.jpeg]: (myFile: any) => <RenderImage file={myFile} />,
    [enmuFileType.jpg]: (myFile: any) => <RenderImage file={myFile} />,
    [enmuFileType.png]: (myFile: any) => <RenderImage file={myFile} />,
    [enmuFileType.webp]: (myFile: any) => <RenderImage file={myFile} />,
    // 视频
    [enmuFileType.mp4]: (myFile: any) => <RenderVideo file={myFile} />,
    [enmuFileType.mov]: (myFile: any) => <RenderVideo file={myFile} />,
    // // 文本
    // [enmuFileType.txt]: (myFile: any) => <RenderText file={myFile} />,
    // // pdf
    // [enmuFileType.pdf]: (myFile: any) => <RenderPdf file={myFile} />,
    // // word
    // [enmuFileType.doc]: (myFile: any) => <RenderDoc file={myFile} />,
    // [enmuFileType.docx]: (myFile: any) => <RenderDoc file={myFile} />,

    // 表格文件预览slsx
    // [enmuFileType.xlsx]: (myFile: any) => <RenderXlsx file={myFile} />,
    // [enmuFileType.csv]: (myFile: any) => <RenderXlsx file={myFile} />,
  };
  const isWebOfficeFileType = (fileType: keyof typeof reviewCmp) => {
    return [
      enmuFileType.pdf,

      enmuFileType.ppt,
      enmuFileType.pptx,

      enmuFileType.xls,
      enmuFileType.xlsx,
      enmuFileType.csv,

      enmuFileType.doc,
      enmuFileType.docx,
      enmuFileType.txt,
    ].includes(fileType);
  };

  const preview = async (file: any) => {
    let renderFn;
    const errcorCb = (fn?: any) => {
      const { destroy } = Modal.info({
        okText: '关闭',
        title: '提示',
        content: '暂不支持在线预览，请下载至本地后查看',
      });
      fn?.();

      setTimeout(() => {
        destroy();
      }, 1500);
    };

    const fileTypeLowerCase =
      file.fileType?.toLowerCase() as keyof typeof reviewCmp;

    const localFn = reviewCmp[fileTypeLowerCase];

    if (localFn) {
      // 图片视频优先本地处理
      renderFn = localFn;
    } else if (isWebOfficeFileType(fileTypeLowerCase)) {
      renderFn = (myFile: any, cbFn: any) => (
        <RenderWebOfficeRender errcorCb={cbFn} file={myFile} />
      );
    } else {
      errcorCb();

      return;
    }

    const { destroy } = Modal.info({
      width: '80%',
      okText: '关闭',
      title: '文件预览' + `:${file.fileName}`,
      maskClosable: true,
      content: renderFn(file, () => errcorCb(destroy)),
      afterClose: () => {
        destroy?.();
      },
    });
  };

  return {
    preview,
  };
};
