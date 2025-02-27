/*
 * @Author: along
 * @Description:
 * @Date: 2025-02-24 17:13:52
 * @LastEditors: along
 * @LastEditTime: 2025-02-27 15:06:56
 * @FilePath: /vue-tool-web/src/router/guard.ts
 */

import type {Router} from 'vue-router';
import NProgress from 'nprogress';
import {isAuthenticated} from '~/utils/common';

NProgress.configure({
	easing: 'ease', //调整动画设置和速度ms
	speed: 800,
	trickle: true, //关闭进度条步进，设置 trickle 为 false。
	showSpinner: false, //禁用进度环
	trickleRate: 0.08, //每次步进增长多少
	trickleSpeed: 100, //步进间隔ms
	minimum: 0.1, //来修改最小百分比
});

const LOGIN_PATH = '/login';

export const registerNavigationGuard = (router: Router) => {
	router.beforeEach((to, from, next) => {
		NProgress.start();

		if (to.path === LOGIN_PATH) return next();

		if (!isAuthenticated()) {
			return next(LOGIN_PATH);
		} else {
			next();
		}
	});

	router.afterEach(() => {
		NProgress.done();
	});
};
