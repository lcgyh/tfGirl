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
          // authority: ['admin', 'user'],
          routes: [{
              path: '/',
              redirect: '/order',
            },
            // {
            //   path: '/welcome',
            //   name: 'welcome',
            //   icon: 'smile',
            //   component: './Welcome',
            // },
            {
              name: 'order',
              icon: 'table',
              path: '/order',
              routes: [{
                  path: '/order',
                  redirect: '/order/store',
                },
                {
                  path: '/order/store',
                  name: 'orderStore',
                  icon: 'smile',
                  component: './order/orderByStore',
                },
                {
                  path: '/order/store/info/:orderId',
                  name: 'orderStoreInfo',
                  component: './order/orderByStore/info',
                  hideInMenu: true,
                },
              ],
            },
            {
              name: 'goods',
              icon: 'table',
              path: '/goods',
              routes: [{
                  path: '/goods',
                  redirect: '/goods/list',
                },
                {
                  path: '/goods/list',
                  name: 'goodsList',
                  icon: 'smile',
                  component: './goods/list',
                },
                {
                  path: '/goods/create',
                  name: 'goodsCreate',
                  component: './goods/list/create',
                  hideInMenu: true,
                },
                {
                  path: '/goods/info/:spuId',
                  name: 'goodsInfo',
                  component: './goods/list/info',
                  hideInMenu: true,
                },
                {
                  path: '/goods/log/:spuId',
                  name: 'goodsLog',
                  component: './goods/list/log',
                  hideInMenu: true,
                },
                {
                  path: '/goods/edit/:spuId',
                  name: 'goodsEdit',
                  component: './goods/list/create',
                  hideInMenu: true,
                },

                {
                  path: '/goods/inventory',
                  name: 'inventory',
                  icon: 'smile',
                  component: './goods/inventory',
                },
                {
                  path: '/goods/specs',
                  name: 'specs',
                  icon: 'smile',
                  component: './goods/specs',
                },
                {
                  path: '/goods/classify',
                  name: 'classify',
                  icon: 'smile',
                  component: './goods/classify',
                },
                {
                  path: '/goods/brand',
                  name: 'brand',
                  icon: 'smile',
                  component: './goods/brand',
                },
                {
                  path: '/goods/country',
                  name: 'country',
                  icon: 'smile',
                  component: './goods/country',
                },
              ],
            },

            {
              name: 'cooperation',
              icon: 'table',
              path: '/cooperation',
              routes: [{
                  path: '/cooperation',
                  redirect: '/cooperation/store',
                },
                {
                  path: '/cooperation/store',
                  name: 'storeCenter',
                  icon: 'smile',
                  component: './cooperation/store',
                },
                {
                  path: '/cooperation/store/create',
                  name: 'storeCreate',
                  hideInMenu: true,
                  component: './cooperation/store/create',
                },
                {
                  path: '/cooperation/store/:shopId/edit',
                  name: 'storeEdit',
                  hideInMenu: true,
                  component: './cooperation/store/create',
                }
              ],
            },
            {
              name: 'activity',
              icon: 'table',
              path: '/activity',
              routes: [{
                  path: '/activity',
                  redirect: '/activity/banner',
                },
                {
                  path: '/activity/banner',
                  name: 'banner',
                  icon: 'smile',
                  component: './activity/banner',
                },
                {
                  path: '/activity/banner/create',
                  name: 'createBanner',
                  hideInMenu: true,
                  component: './activity/banner/create',
                },
                {
                  path: '/activity/banner/:bannerId/edit',
                  name: 'editBanner',
                  hideInMenu: true,
                  component: './activity/banner/create',
                },


                {
                  path: '/activity/seckill',
                  name: 'seckill',
                  component: './activity/seckill',
                },
                {
                  path: '/activity/seckill/create',
                  name: 'createSeckill',
                  hideInMenu: true,
                  component: './activity/seckill/create',
                },
                {
                  path: '/activity/new',
                  name: 'new',
                  component: './activity/new',
                },
                {
                  path: '/activity/new/create',
                  name: 'createNew',
                  hideInMenu: true,
                  component: './activity/new/create',
                },
                {
                  path: '/activity/new/:newId/edit',
                  name: 'editNew',
                  hideInMenu: true,
                  component: './activity/new/create',
                },
                {
                  path: '/activity/hot',
                  name: 'hot',
                  component: './activity/hot',
                },
                {
                  path: '/activity/hot/create',
                  name: 'createHot',
                  hideInMenu: true,
                  component: './activity/hot/create',
                },
                {
                  path: '/activity/hot/:popularId/edit',
                  name: 'editHot',
                  hideInMenu: true,
                  component: './activity/hot/create',
                },
                {
                  path: '/activity/express',
                  name: 'express',
                  component: './activity/express',
                },
              ],
            },
            {
              name: 'article',
              icon: 'table',
              path: '/article',
              routes: [{
                  path: '/article',
                  redirect: '/article/list',
                },
                {
                  path: '/article/list',
                  name: 'articleList',
                  icon: 'smile',
                  component: './article/list',
                },
                {
                  path: '/article/createArticle',
                  name: 'createArticle',
                  hideInMenu: true,
                  component: './article/list/createArticle',
                },
                {
                  path: '/article/editArticle/:id',
                  name: 'editArticle',
                  hideInMenu: true,
                  component: './article/list/createArticle',
                },
                {
                  path: '/article/createVideo',
                  name: 'createVideo',
                  hideInMenu: true,
                  component: './article/list/createVideo',
                },
                {
                  path: '/article/editVideo/:id',
                  name: 'editVideo',
                  hideInMenu: true,
                  component: './article/list/createVideo',
                },
                {
                  path: '/article/createVoice',
                  name: 'createVoice',
                  hideInMenu: true,
                  component: './article/list/createVoice',
                },
                {
                  path: '/article/editVoice/:id',
                  name: 'editVoice',
                  hideInMenu: true,
                  component: './article/list/createVoice',
                },
                {
                  path: '/article/createWeChat',
                  name: 'createWeChat',
                  hideInMenu: true,
                  component: './article/list/createWeChat',
                },
                {
                  path: '/article/editWeChat/:id',
                  name: 'editWeChat',
                  hideInMenu: true,
                  component: './article/list/createWeChat',
                }
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
