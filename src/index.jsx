import 'react-app-polyfill/stable'; // polyfill
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/normalize.css'; // reset css
import './styles/base.css'; // base css
import 'amfe-flexible'; // rem 响应式适配
import './assets/js/base'; // base js
import App from './App';
import { ConfigProvider } from 'antd-mobile';
import zhCN from 'antd-mobile/es/locales/zh-CN'; // 国际化

const rootEl = document.getElementById('root');
const root = ReactDOM.createRoot(rootEl);
root.render(
  <ConfigProvider locale={zhCN}>
    <App></App>
  </ConfigProvider>
);

// ! 90 56:05
