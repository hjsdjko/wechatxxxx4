
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
     qiyezhanghao:'',
     mima:'',
     qiyemingcheng:'',
    qiyetupian:'',
    tempPathqiyetupian:'../../static/upload.png',
     lianxidianhua:'',
     qiyedizhi:'',
     qiyejianjie:'',
     zhuceshijian:"请选择注册时间",
     yuangongshuliang:'',

    registerContainerClass: "",

},

async onLoad() {












},
onUnload() {
},
async onShow() {










},







async  register(){
if (this.data.qiyezhanghao == "") {
wx.showToast({
title: '请输入企业账号',
icon: "none"
})
return;
}
if (this.data.mima == "") {
wx.showToast({
title: '请输入密码',
icon: "none"
})
return;
}
if (this.data.mima2=="") {
wx.showToast({
title: '请输入确认密码',
icon: "none"
})
return;
}
if (this.data.mima !== this.data.mima2) {
wx.showToast({
title: '密码与确认密码不一致!!',
icon: "none"
})
return;
}









    if(this.data.zhuceshijian=="请选择注册时间"){
        this.setData({
                zhuceshijian:""
        })

    }


    const regex = new RegExp(wx.getStorageSync("baseURL"), "g");
  const resultObj={
        qiyezhanghao:this.data.qiyezhanghao,
        mima:this.data.mima,
        mima2:this.data.mima2,
        qiyemingcheng:this.data.qiyemingcheng,
        qiyetupian:this.data.qiyetupian.replace(regex, ""),
        lianxidianhua:this.data.lianxidianhua,
        qiyedizhi:this.data.qiyedizhi,
        qiyejianjie:this.data.qiyejianjie,
        zhuceshijian:this.data.zhuceshijian,
        yuangongshuliang:this.data.yuangongshuliang,
  }
    const name="qiyezhanghao"
    const password="mima"
    const res = await register("qiye", name, this.data[name],password , this.data[password], resultObj)
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