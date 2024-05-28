import type { IApi } from '@umijs/max';

// https://github.com/cheeriojs/cheerio/wiki/Chinese-README
/*
    api.modifyHTML(($) => {
        return $;
    });
    api.addHTMLMetas(() => [{ name: 'foo', content: 'bar' }]);
    api.addHTMLLinks(() => [{ rel: 'foo', content: 'bar' }]);
    api.addHTMLStyles(() => [`body { color: red; }`]);
    api.addHTMLHeadScripts(() => [`console.log('hello world from head')`]);
    api.addHTMLScripts(() => [`console.log('hello world')`]);
    api.addEntryCodeAhead(() => [`console.log('entry code ahead')`]);
    api.addEntryCode(() => [`console.log('entry code')`]);
    api.onDevCompileDone((opts) => {
        opts;
        // console.log('> onDevCompileDone', opts.isFirstCompile);
    });
    api.onBuildComplete((opts) => {
        opts;
        // console.log('> onBuildComplete', opts.isFirstCompile);
    });
    api.chainWebpack((memo) => {
        memo;
    });
    api.onStart(() => {});
    api.onCheckCode((args) => {
        args;
        // console.log('> onCheckCode', args);
    });
*/

export default (api: IApi) => {
  api.addHTMLMetas(() => [
    { name: 'theme-color', content: '#1890ff' },
    { name: 'keywords', content: 'HCN,Uranus,Sub App' },
    { name: 'description', content: 'HCN业务后台子应用' },
    { name: 'description', content: 'Uranus微前端管理后台子应用' },
  ]);
  api.modifyHTML(($) => {
    // const env = process.env.UMI_ENV || 'local';
    // const { publicPath } = api.config;

    $('body').prepend([]);

    $('body #root').prepend([
      `<style>
      html,
      body,
      #root {
        height: 100%;
        margin: 0;
        padding: 0;
      }
      #root {
        background-repeat: no-repeat;
        background-size: 100% auto;
      }
      .noscript-container {
        display: flex;
        align-content: center;
        justify-content: center;
        margin-top: 90px;
        font-size: 20px;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode',
          Geneva, Verdana, sans-serif;
      }
      .noscript-enableJS {
        padding-right: 3px;
        padding-left: 3px;
      }
      .page-loading-warp {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 98px;
      }
      .ant-spin {
        position: absolute;
        display: none;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        color: rgba(0, 0, 0, 0.65);
        color: #1890ff;
        font-size: 14px;
        font-variant: tabular-nums;
        line-height: 1.5;
        text-align: center;
        list-style: none;
        opacity: 0;
        -webkit-transition: -webkit-transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
        transition: -webkit-transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
        transition: transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
        transition: transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86),
          -webkit-transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
        -webkit-font-feature-settings: 'tnum';
        font-feature-settings: 'tnum';
      }

      .ant-spin-spinning {
        position: static;
        display: inline-block;
        opacity: 1;
      }

      .ant-spin-dot {
        position: relative;
        display: inline-block;
        width: 20px;
        height: 20px;
        font-size: 20px;
      }

      .ant-spin-dot-item {
        position: absolute;
        display: block;
        width: 9px;
        height: 9px;
        background-color: #1890ff;
        border-radius: 100%;
        -webkit-transform: scale(0.75);
        -ms-transform: scale(0.75);
        transform: scale(0.75);
        -webkit-transform-origin: 50% 50%;
        -ms-transform-origin: 50% 50%;
        transform-origin: 50% 50%;
        opacity: 0.3;
        -webkit-animation: antspinmove 1s infinite linear alternate;
        animation: antSpinMove 1s infinite linear alternate;
      }

      .ant-spin-dot-item:nth-child(1) {
        top: 0;
        left: 0;
      }

      .ant-spin-dot-item:nth-child(2) {
        top: 0;
        right: 0;
        -webkit-animation-delay: 0.4s;
        animation-delay: 0.4s;
      }

      .ant-spin-dot-item:nth-child(3) {
        right: 0;
        bottom: 0;
        -webkit-animation-delay: 0.8s;
        animation-delay: 0.8s;
      }

      .ant-spin-dot-item:nth-child(4) {
        bottom: 0;
        left: 0;
        -webkit-animation-delay: 1.2s;
        animation-delay: 1.2s;
      }

      .ant-spin-dot-spin {
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
        -webkit-animation: antrotate 1.2s infinite linear;
        animation: antRotate 1.2s infinite linear;
      }

      .ant-spin-lg .ant-spin-dot {
        width: 32px;
        height: 32px;
        font-size: 32px;
      }

      .ant-spin-lg .ant-spin-dot i {
        width: 14px;
        height: 14px;
      }

      @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
        .ant-spin-blur {
          background: #fff;
          opacity: 0.5;
        }
      }

      @-webkit-keyframes antSpinMove {
        to {
          opacity: 1;
        }
      }

      @keyframes antSpinMove {
        to {
          opacity: 1;
        }
      }

      @-webkit-keyframes antRotate {
        to {
          -webkit-transform: rotate(405deg);
          transform: rotate(405deg);
        }
      }

      @keyframes antRotate {
        to {
          -webkit-transform: rotate(405deg);
          transform: rotate(405deg);
        }
      }
    </style>
    <div
      style="
        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        min-height: 420px;
      "
    >
      <div class="page-loading-warp">
        <div class="ant-spin ant-spin-lg ant-spin-spinning">
          <span class="ant-spin-dot ant-spin-dot-spin"
            ><i class="ant-spin-dot-item"></i><i class="ant-spin-dot-item"></i
            ><i class="ant-spin-dot-item"></i><i class="ant-spin-dot-item"></i
          ></span>
        </div>
      </div>
    </div>
    `,
    ]);
    return $;
  });
};
