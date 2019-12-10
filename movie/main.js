import Vue from 'vue'
import App from './App'
// const api ="https://www.imovietrailer.com/superhero";
// const qq = 3038366676;
Vue.config.productionTip = false;
	// 挂载到全局
// Vue.prototype.api="https://www.imovietrailer.com/superhero";
// Vue.prototype.qq=3038366676;
// 挂载全局属性userInfo
Vue.prototype.GetUserIfo =function(key){
	var userInfo  =uni.getStorageSync("globalUser")
	if(userInfo != null && userInfo != "" && userInfo !=undefined){
		return userInfo;
	}else{
		return null;
	}
	
}
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
