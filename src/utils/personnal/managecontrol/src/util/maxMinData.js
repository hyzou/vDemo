import parameter from "@/config/parameter.js";

const maxMinData = {};
let maxTempDataIndexArray = []; //最大温度数据索引
let minTempDataIndexArray = []; //最小温度数据索引
let timer = null;
let callbackHolder = {callback:null,timeout:1000};
let _init = function () {
    if (maxTempDataIndexArray && maxTempDataIndexArray.length !== 0) {
        maxTempDataIndexArray.splice(0, maxTempDataIndexArray.length);
    }
    if (minTempDataIndexArray && minTempDataIndexArray.length !== 0) {
        minTempDataIndexArray.splice(0, minTempDataIndexArray.length);
    }
}

maxMinData.clear = function() {
    _init();
    if (timer !== null) {
        clearInterval(timer);
    }
}
maxMinData.stop = function() {
    if (timer !== null) {
        clearInterval(timer);
    }
}
maxMinData.start = function() {
    if (callbackHolder.callback) {
        timer = setInterval(function () {
            if (minTempDataIndexArray.length>0 || maxTempDataIndexArray.length > 0) {
                callbackHolder.callback(maxTempDataIndexArray, minTempDataIndexArray);
            }
        }, callbackHolder.timeout);
    }
}
maxMinData.get = function(){
    return{min:minTempDataIndexArray,
        max:maxTempDataIndexArray}
}
maxMinData.reInit = function() {
    _init();
}
maxMinData.putMaxIndex = function(index) {
    maxTempDataIndexArray.push(index);
}
maxMinData.putMinIndex = function(index) {
    minTempDataIndexArray.push(index);
}
maxMinData.setCallback = function (callback, timeout) {
    if (timer !== null) {
        clearInterval(timer);
    }
    callbackHolder.callback = callback;
        callbackHolder.timeout = timeout;
    if (callback) {
        timer = setInterval(function () {
            if (minTempDataIndexArray.length>0 || maxTempDataIndexArray.length > 0) {
                callback(maxTempDataIndexArray, minTempDataIndexArray);
            }
        }, timeout || 1000);
    }
}

export default maxMinData;
