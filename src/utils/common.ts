/*
 * @Author: along
 * @Description:
 * @Date: 2025-02-27 15:01:16
 * @LastEditors: along
 * @LastEditTime: 2025-02-27 15:03:06
 * @FilePath: /vue-tool-web/src/utils/common.ts
 */

export const isAuthenticated: boolean = () => {
	return !!localStorage.getItem('token');
};
