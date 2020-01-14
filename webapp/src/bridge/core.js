var callbackMap = {};

var Bridge = {
    //核心方法
    open: function (msg, callback) {
        if (callback && typeof (callback) === 'function') {
            var callbackid = this.getNextCallbackID();
            callbackMap[callbackid] = callback;
            msg.params = {
                params,
                callbackId: callbackid,
                callback: 'window.callbackDispatcher'
            }
        }
        if (this.isIOS()) {
            try {
                window.webkit.messageHandlers.WKJSBridge.postMessage(msg)
            } catch (error) {
                console.log('error native message')
            }
        } else if (this.isAndroid()) {
            try {
                var result = prompt(JSON.stringify(msg))
                console.log(result)
            } catch (error) {
                console.log('error native message')
            }
        }
    },

    //生成随机callbackId
    getNextCallbackID: function () {
        let timestamp = new Date().getTime();
        let $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let maxPos = $chars.length;
        let randomStr = '';
        for (let i = 0; i < 32; i++) {
            randomStr += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return randomStr + timestamp;
    },

    //判断Android
    isAndroid: function () {
        let u = navigator.userAgent
        return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
    },

    //判断iOS
    isIOS: function () {
        let u = navigator.userAgent
        return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    },

};

window.callbackDispatcher = function (callbackId, resultjson) {
    var callback = callbackMap[callbackId];
    if (callback && typeof (callback) === 'function') {
        console.log(resultjson);
        var resultObj = resultjson ? JSON.parse(resultjson) : {};
        callback(resultObj);
    }
}

export default Bridge