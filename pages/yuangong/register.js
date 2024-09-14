
const dateUtils = require('../../utils/defautils')
const utils = require("../../utils/index.js")
const {
SendverificationCode,
register,
option,
    smscode,
follow
} = require('../../api/login.js')
const {
    levelOption,
    sheng,
} = require('../../api/index.js')
Page({
data: {
     yuangongzhanghao:'',
     yuangongmima:'',
     yuangongxingming:'',
    touxiang:'',
    tempPathtouxiang:'../../static/upload.png',
xingbieList:"男,女".split(','),
xingbieIndex:0,
     shoujihaoma:'',
     bumen:'',
     gangwei:'',
     qiyezhanghao:'',
     qiyemingcheng:'',

    registerContainerClass: "",

},

async onLoad() {













},
onUnload() {
},
async onShow() {





    this.setData({
            xingbieList:  "男,女".split(',')
    })








},







async  register(){
if (this.data.yuangongzhanghao == "") {
wx.showToast({
title: '请输入员工账号',
icon: "none"
})
return;
}
if (this.data.yuangongmima == "") {
wx.showToast({
title: '请输入员工密码',
icon: "none"
})
return;
}
if (this.data.yuangongmima2=="") {
wx.showToast({
title: '请输入确认员工密码',
icon: "none"
})
return;
}
if (this.data.yuangongmima !== this.data.yuangongmima2) {
wx.showToast({
title: '员工密码与确认员工密码不一致!!',
icon: "none"
})
return;
}












    const regex = new RegExp(wx.getStorageSync("baseURL"), "g");
  const resultObj={
        yuangongzhanghao:this.data.yuangongzhanghao,
        yuangongmima:this.data.yuangongmima,
        yuangongxingming:this.data.yuangongxingming,
        touxiang:this.data.touxiang.replace(regex, ""),
        xingbie: this.data.xingbieList?.length ? this.data.xingbieList[this.data.xingbieIndex] : "",
        shoujihaoma:this.data.shoujihaoma,
        bumen:this.data.bumen,
        gangwei:this.data.gangwei,
        qiyezhanghao:this.data.qiyezhanghao,
        qiyemingcheng:this.data.qiyemingcheng,
  }
    const name="yuangongzhanghao"
    const password="yuangongmima"
    const res = await register("yuangong", name, this.data[name],password , this.data[password], resultObj)
if (res.code == 0) {
wx.navigateTo({
url: '../login/login',
})
} else {
wx.showToast({
title: res.msg,
icon: "none"
})
}

}



});