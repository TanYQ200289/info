const base = "http://120.79.243.22:80";
console.log(base)
function Http(url, method, data = {}) {
	uni.showLoading({
		title: '加载中'
	});
	return new Promise((resolve) => {
		uni.request({
			url: base + url, //仅为示例，并非真实接口地址。
			data,
			method: method.toLocaleUpperCase(),
			success: (res) => {
					resolve(res);
			},
			complete() {
				uni.hideLoading();
			}
		});
	})
}
export default Http;
