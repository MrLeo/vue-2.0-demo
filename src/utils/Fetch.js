/**
 * @Date: 2016/10/23  0023  13:02
 * @Author: lxbin
 *
 * Created with JetBrains WebStorm.
 */
//Fetch API : https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalFetch/fetch

/**
 * 返回结果转JSON
 * @param response
 * @return {*}
 */
function parseJSON(response) {
    return response.json()//生成JSON.parse(responseText)的结果
}

/**
 * 检查返回状态
 * @param response
 * @return {*}
 */
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    }
    const error = new Error(response.statusText)
    error.response = response
    throw error
}

/**
 * json转url参数
 * @param {object} param json格式的URL参数
 * @param {string} key 包裹在最外层的键
 * @return {string} url参数字符串
 */
const parseParam = function (param, key) {
    let paramStr = ""
    if (param == "" && key) {
        paramStr += "&" + key
    } else if (param instanceof String || param instanceof Number || param instanceof Boolean) {
        paramStr += "&" + key + "=" + encodeURIComponent(param)
    } else {
        for (let i in param) {
            var k = key == null ? i : key + (param instanceof Array ? "[" + i + "]" : "." + i)
            paramStr += '&' + parseParam(param[i], k)
        }
    }
    return paramStr.substr(1)
}

/**
 * Fetch默认配置信息
 * @type {{method: string, mode: string, credentials: string, cache: string}}
 */
let config = {
    method: 'GET',//'POST'
    //headers: {"Content-Type": "application/json"},
    //body: '',//可能是一个 Blob、BufferSource、FormData、URLSearchParams 或者 USVString 对象。注意 GET 或 HEAD 方法的请求不能包含 body 信息。
    mode: 'same-origin',//same-origin, cors, no-cors
    credentials: 'same-origin',//same-origin, include, omit
    cache: 'default'//no-store, reload, no-cache, force-cache, 或者 only-if-cached
}

/**
 * Default Get Requests a URL, returning a promise.
 * @param {string} url The URL we want to request
 * @param {object} params The params we want to pass to "fetch"
 * @param {object} options The options we want to pass to "fetch"
 * @example {
 *      method:'GET',
 *      mode:'cors',
 *      credentials:'include'
 *      body:{ page:1 }
 * }
 * @param args Other options we want to pass to "fetch"
 * @return {Promise.<TResult>} An object containing either "data" or "err"
 * @constructor
 */
export default function Fetch(url, param = {}, options = {}) {
    //合并配置信息
    for (let key in options) {
        config[key] = options[key]
    }
    return fetch(url + '?' + parseParam(param), config)
        .then(checkStatus)
        .then(parseJSON)
        //.then((data) => ({data}))
        .catch((err) => ({err}))
}

/**
 * Post request a url,returning a promise
 * @param url                       The URL we want to request
 * @param params                    The params we want to pass to "fetch"
 * @param option                    The options we want to pass to "fetch"
 * @returns {Promise.<TResult>}     An object containing either "data" or "err"
 * @constructor
 */
export function FetchPost(url, params = {}, option = {}) {
    config = {
        method: "POST",
        body: JSON.stringify(params),
        option
    }
    return fetch(url, config).then(checkStatus)
        .then(parseJSON)
        //.then((data) => ({data}))
        .catch((err) => ({err}))
}