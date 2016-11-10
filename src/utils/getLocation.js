/**
 * @Date: 2016/10/24  0024  21:30
 * @Author: lxbin
 *
 * Created with JetBrains WebStorm.
 */

/**
 * 获取当前坐标
 * @returns {Promise} 返回promise.then(position=>{})
 */
export default function getLocation() {
    return new Promise(function (resolve, reject) {
        /**
         * 通过高德地图获取坐标
         * 注意：需要先加载《高德地图》
         */
        let AMapGeolocation = ()=> {
            let geolocation
            /**
             * 加载地图，调用浏览器定位服务
             */
            let map = new AMap.Map('container', {resizeEnable: true})
            map.plugin('AMap.Geolocation', function () {
                geolocation = new AMap.Geolocation({
                    //是否使用高精度定位，默认:true
                    enableHighAccuracy: true,
                    //超过10秒后停止定位，默认：无穷大
                    timeout: 10000,
                    //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                    buttonOffset: new AMap.Pixel(10, 20),
                    //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    zoomToAccuracy: true,
                    buttonPosition: 'RB'
                })
                map.addControl(geolocation)
                geolocation.getCurrentPosition()
                AMap.event.addListener(geolocation, 'complete', onComplete)//返回定位信息
                AMap.event.addListener(geolocation, 'error', onError)//返回定位出错信息
            })

            /**
             * 解析定位结果
             * @param data
             */
            function onComplete(data) {
                console.log('[Leo]高德地图定位成功 => ', data.position.getLng(), data.position.getLat())
                resolve([data.position.getLng(), data.position.getLat()])
            }

            /**
             * 解析定位错误信息
             * @param data
             */
            function onError(data) {
                console.log('[Leo] => 高德地图定位失败')
                reject(new Error('定位失败'))
            }
        }

        /**
         * H5定位
         */
        if (navigator.geolocation) {//支持H5定位
            navigator.geolocation.getCurrentPosition(
                /**
                 * H5定位成功
                 * @param position 经纬度坐标
                 */
                function (position) {
                    let longitude = position.coords.longitude//经度
                    let latitude = position.coords.latitude//纬度
                    //console.log('[Leo]当前坐标 => ', position)
                    resolve([longitude, latitude])
                },
                /**
                 * H5定位失败
                 * @param error
                 */
                function (error) {
                    //高德地图定位
                    AMapGeolocation()
                    //H5定位失败信息
                    //switch (error.code) {
                    //    case 1:
                    //        console.error('[Leo] => 位置服务被拒绝')
                    //        reject(new Error('位置服务被拒绝'))
                    //        break
                    //    case 2:
                    //        console.error('[Leo] => 暂时获取不到位置信息')
                    //        reject(new Error('暂时获取不到位置信息'))
                    //        break
                    //    case 3:
                    //        console.error('[Leo] => 获取信息超时')
                    //        reject(new Error('获取信息超时'))
                    //        break
                    //    case 4:
                    //        console.error('[Leo] => 未知错误')
                    //        reject(new Error('未知错误'))
                    //        break
                    //}
                }, {
                    enableHighAccuracy: true,
                    maximumAge: 1000
                }
            )
        } else {//不支持H5定位
            console.error('[Leo] => 浏览器不支持geolocation')
            reject(new Error('浏览器不支持geolocation'))
        }
    })
}
