<!--
 * @Author: along
 * @Description:
 * @Date: 2025-02-21 11:18:20
 * @LastEditors: along
 * @LastEditTime: 2025-02-27 15:13:17
 * @FilePath: /vue-tool-web/src/App.vue
-->
<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

const locale = zhCN;
</script>

<template>
	<a-config-provider :locale="locale">
		<RouterView />
	</a-config-provider>
</template>

<style scoped></style>
