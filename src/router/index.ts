/*
 * @Author: along
 * @Description:
 * @Date: 2023-08-30 14:50:34
 * @LastEditors: along
 * @LastEditTime: 2025-02-27 14:50:38
 * @FilePath: /vue-tool-web/src/router/index.ts
 */
import {createRouter, createWebHistory} from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { registerNavigationGuard } from './guard';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
		component: () => import('~/views/home/index.vue'),
	},
	{
		path: '/login',
    name: 'login',
		component: () => import('~/views/login/index.vue'),
	},
	{
    path: '/404',
    name: '404',
		component: () => import('~/views/404/index.vue'),
	},
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior: () => ({x: 0, y: 0}),
});

export function resetRouter() {
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route;
      if (name && meta.roles?.length) {
        if (router.hasRoute(name)) {
          router.removeRoute(name);
        }
      }
    });
  } catch {
    location.reload();
  }
}


registerNavigationGuard(router)
