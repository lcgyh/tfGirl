// https://umijs.org/config/
import {
  defineConfig
} from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const {
  REACT_APP_ENV
} = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [{
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [{
        name: 'login',
        path: '/user/login',
        component: './user/login',
      }, ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [{
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [{
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: '/admin',
              name: 'admin',
              icon: 'crown',
              component: './Admin',
              authority: ['admin'],
              routes: [{
                path: '/admin/sub-page',
                name: 'sub-page',
                icon: 'smile',
                component: './Welcome',
                authority: ['admin'],
              }, ],
            },
            // {
            //   name: 'list.table-list',
            //   icon: 'table',
            //   path: '/list',
            //   component: './ListTableList',
            // },
            // {
            //   name: 'order',
            //   icon: 'table',
            //   path: '/order',
            //   redirect: '/order/store',
            // },
            {
              name: 'order',
              icon: 'table',
              path: '/order',
              routes: [{
                  path: '/order',
                  redirect: '/order/store'
                },
                {
                  path: '/order/store',
                  name: 'orderStore',
                  icon: 'smile',
                  component: './order/orderByStore',
                },
                {
                  path: '/order/store/info',
                  name: 'orderStoreInfo',
                  component: './order/orderByStore/info',
                  hideInMenu: true
                }

              ]
            },

            {

              name: 'goods',
              icon: 'table',
              path: '/goods',
              routes: [{
                  path: '/goods',
                  redirect: '/goods/list'
                },
                {
                  path: '/goods/list',
                  name: 'goodsList',
                  icon: 'smile',
                  component: './goods/list',
                },
                {
                  path: '/goods/list/create',
                  name: 'goodsCreate',
                  component: './goods/list/create',
                  hideInMenu: true
                }
              ]

            },

            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
