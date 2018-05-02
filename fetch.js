/**
 * 同源策略：1.协议相同2.域名相同3.端口号相同
 * 给予fetch分装的请求方法 支持get post
 * 
 * 
 */
let domin
if (process.env == 'development') {
  domin = 'http://localhost:9000'
}
if (process.env == 'production') {
  domin = 'http://www.lb717.com'
}
let $http = {
  get(url, data) {
    if (Object.prototype.toString.call(data) != "[object Object]") {
      return {
        then(callback) {
          callback("get请求入参格式不正确，需要传object")
          return {
            catch(err){
              err(new Error("入参格式不正确"))
            }
          }
        }
      }
    }
    let queryString = "?"
    for (let i in data) {
      queryString += (i + "=" + data[i] + "&")
    }
    queryString = queryString.slice(0, -1)
    url = encodeURI(url + queryString.slice(0, -1))
    return fetch(domin+url, {
      headers: {
        "Content-Type": "application/json;charset-utf-8"
      }
    }).then(res => res.json())
  },
  post(url, data) {
    if (Object.prototype.toString.call(data) != "[object Object]") {
      return {
        then(callback) {
          callback("get请求入参格式不正确，需要传object")
          return {
            catch(err){
              err(new Error("入参格式不正确"))
            }
          }
        }
      }
    }
    return fetch(domin+url, {
      body: JSON.stringify(data), 
      headers:{
        "Content-Type": "application/json;charset=utf-8",
        "token": ""
      },
      method: "POST"
    }).then(res => res.json())
  },
  jsonp(url){
    return new Promise((resolve, reject) => {
      window[callbackName] = function(data){
        resolve(data)
      }
      let script = document.createElement('script')
      let body = document.body
      script.src = url
      body.appendChild(script)
    })
  }
}

export default $http