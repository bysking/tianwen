import { getRedirectUrl, gotoUrl } from '@/constants';
import { pwd_login, qr_login } from '@/services/demo';
import { loginOut, tokenTool } from '@/utils/data-tool';
import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormText,
  setAlpha,
} from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, Tabs, message, theme } from 'antd';
import queryString from 'query-string';
import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';

type LoginType = 'phone' | 'account' | 'feishu';

const Login = () => {
  const { token } = theme.useToken();
  const [loginType, setLoginType] = useState<LoginType>('account');
  const qrResult = useRef();
  const feishu_login = 'feishu_login';
  const query = queryString.parse(history.location.search, { decode: false });

  const iconStyles: CSSProperties = {
    marginInlineStart: '16px',
    color: setAlpha(token.colorTextBase, 0.2),
    fontSize: '24px',
    verticalAlign: 'middle',
    cursor: 'pointer',
  };

  // 监听message事件：
  const handleMessage = async function (event: any) {
    const origin = event.origin;
    if (qrResult.current?.matchOrigin(origin)) {
      const loginTmpCode = event.data;
      window.location.href = `${gotoUrl}${getRedirectUrl()}&tmp_code=${loginTmpCode}`;
    }
  };

  // const initFeishuQrCode = async () => {
  //   const qrcode = await window.QRLogin({
  //     id: feishu_login,
  //     goto: gotoUrl + getRedirectUrl(),
  //     width: '300px',
  //     height: '300px',
  //     style: 'border-style: solid', // 可选的，二维码html标签的style属性
  //   });
  //   qrResult.current = qrcode;
  // };

  const handleToken = async (token: string) => {
    await tokenTool.setToken(token);
    history.replace('/');
    window.location.reload();
  };

  const initCode = async () => {
    const code = query.code;
    if (code) {
      // 根据code获取用户信息，token
      await qr_login({
        code,
        login_channel: 'web',
      })
        .then((res) => {
          handleToken(res?.itsm_user_token);
        })
        .catch(() => {
          loginOut();
        });
    } else {
      // initFeishuQrCode();
    }
  };

  useEffect(() => {
    initCode();
    window.addEventListener('message', handleMessage, false);
    return () => {
      window.removeEventListener('message', handleMessage, false);
    };
  }, []);

  const loginByFeishu = async () => {
    const targetUrl = gotoUrl + getRedirectUrl();
    window.location.href = targetUrl;
  };

  const onFinish = async (formData: any) => {
    return pwd_login({
      ...formData,
      grant_type: 'password',
      password: formData.password, // cpx:todo 需要用后端的公钥进行加密
    })
      .then((res) => {
        handleToken(res?.data?.token);
      })
      .catch(() => {
        message.error('用户名或密码错误');
      });
  };

  return (
    <ProConfigProvider hashed={false}>
      <div style={{ backgroundColor: token.colorBgContainer, height: '90vh' }}>
        <LoginForm
          // logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
          title=""
          subTitle=""
          // actions={
          //   <Space>
          //     其他登录方式
          //     <AlipayCircleOutlined style={iconStyles} />
          //     <TaobaoCircleOutlined style={iconStyles} />
          //     <WeiboCircleOutlined style={iconStyles} />
          //   </Space>
          // }
          onFinish={onFinish}
          submitter={{
            render: ({ submit }) => {
              if (loginType === 'feishu') {
                return (
                  <Button
                    onClick={() => loginByFeishu()}
                    type="primary"
                    className="w-full"
                  >
                    飞书一键登陆
                  </Button>
                );
              }
              return (
                <>
                  <Button
                    onClick={() => submit()}
                    type="primary"
                    className="w-full"
                  >
                    登陆
                  </Button>
                </>
              );
            },
          }}
          action={() => {}}
        >
          <Tabs
            centered
            activeKey={loginType}
            onChange={(activeKey) => setLoginType(activeKey as LoginType)}
          >
            {/* <Tabs.TabPane key={'feishu'} tab={'飞书登录'} /> */}
            <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
            {/* <Tabs.TabPane key={'phone'} tab={'手机号登录'} /> */}
          </Tabs>
          {loginType === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'} />,
                }}
                placeholder={'用户名: admin or user'}
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                  strengthText:
                    'Password should contain numbers, letters and special characters, at least 8 characters long.',

                  statusRender: (value) => {
                    const getStatus = () => {
                      if (value && value.length > 12) {
                        return 'ok';
                      }
                      if (value && value.length > 6) {
                        return 'pass';
                      }
                      return 'poor';
                    };
                    const status = getStatus();
                    if (status === 'pass') {
                      return (
                        <div style={{ color: token.colorWarning }}>
                          强度：中
                        </div>
                      );
                    }
                    if (status === 'ok') {
                      return (
                        <div style={{ color: token.colorSuccess }}>
                          强度：强
                        </div>
                      );
                    }
                    return (
                      <div style={{ color: token.colorError }}>强度：弱</div>
                    );
                  },
                }}
                placeholder={'密码: ant.design'}
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ]}
              />
            </>
          )}
          {loginType === 'phone' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined className={'prefixIcon'} />,
                }}
                name="mobile"
                placeholder={'手机号'}
                rules={[
                  {
                    required: true,
                    message: '请输入手机号！',
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: '手机号格式错误！',
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={'请输入验证码'}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${'获取验证码'}`;
                  }
                  return '获取验证码';
                }}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码！',
                  },
                ]}
                onGetCaptcha={async () => {
                  message.success('获取验证码成功！验证码为：1234');
                }}
              />
            </>
          )}

          <div style={{ display: loginType === 'feishu' ? 'block' : 'none' }}>
            <div className="w-full pl-3" id={feishu_login}></div>
            {/* <Button onClick={loginByFeishu} type="link">
              飞书一键登录
            </Button> */}
          </div>

          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            {/* <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox> */}

            {/* {loginType === 'account' && (
              <a
                style={{
                  float: 'right',
                }}
                className="pb-2"
              >
                忘记密码
              </a>
            )} */}
          </div>
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};
export default Login;
