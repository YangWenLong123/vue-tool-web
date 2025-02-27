/*
 * @Author: along
 * @Description:
 * @Date: 2025-02-21 11:18:20
 * @LastEditors: along
 * @LastEditTime: 2025-02-27 15:08:40
 * @FilePath: /vue-tool-web/src/main.ts
 */
import {createApp} from 'vue';
import App from './App.vue';
import {router} from '~/router';
import '~/assets/css/app.less';

const app = createApp(App);

app.use(router);

router.isReady().then(() => {
	app.mount('#app');
});
