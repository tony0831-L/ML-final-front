import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import "prismjs/themes/prism-okaidia.css";  // theme
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import router from './router/router'

createApp(App).use(ElementPlus).use(router).mount('#app')
