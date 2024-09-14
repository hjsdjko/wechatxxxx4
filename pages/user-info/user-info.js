const dateUtils = require('../../utils/defautils')
const menuData=require('../../utils/menu.js')
const {
SendverificationCode,
option,
follow,wxbind,wxunbind
} = require('../../api/login.js')
const {
levelOption,
sheng,
update,
session
} = require('../../api/index.js')
const utils = require("../../utils/index.js")
Page({
data: {
code:'',
openid:'',
tableName:"",
ro:{
},
yuangongzhanghao:'',
yuangongmima:'',
yuangongxingming:'',
touxiang:'../../static/upload.png',
tempPathtouxiang:'../../static/upload.png',
xingbieList:"男,女".split(','),
xingbieIndex:null,

shoujihaoma:'',
bumen:'',
gangwei:'',
qiyezhanghao:'',
qiyemingcheng:'',
qiyezhanghao:'',
mima:'',
qiyemingcheng:'',
qiyetupian:'../../static/upload.png',
tempPathqiyetupian:'../../static/upload.png',
lianxidianhua:'',
qiyedizhi:'',
zhuceshijian:"请选择注册时间",
yuangongshuliang:'',

registerContainerClass: "",
role:""

},

async onLoad() {

wx.login({
provider: 'weixin',
success: function (res) {
let code = res.code;
if (code) {
this.setData({
code
});
}
}.bind(this)
});
let tableName = wx.getStorageSync("nowTable");
const menu = menuData.default.list()
const name = wx.getStorageSync("role")
let role
menu.map(obj => {
if (name == obj.roleName) {
role = obj.tableName
}
})
this.setData({
role,
tableName
})
const  userInfo  = getApp().globalData.userInfo
const   baseURL= wx.getStorageSync('baseURL')+"/"
    let userInfoObj={}
    userInfoObj["yuangongzhanghao"]= userInfo.yuangongzhanghao==null?"":userInfo.yuangongzhanghao
    userInfoObj["yuangongmima"]= userInfo.yuangongmima==null?"":userInfo.yuangongmima
    userInfoObj["yuangongxingming"]= userInfo.yuangongxingming==null?"":userInfo.yuangongxingming
userInfo['touxiang']=userInfo?.touxiang?.replace('upload','file')
this.setData({
touxiang:baseURL+userInfo.touxiang,
tempPathtouxiang:baseURL+userInfo.touxiang,
})
this.data.xingbieList?.map((v, index) => {
if (v ==  userInfo.xingbie) {
this.setData({
xingbieIndex: index
})
}
})

this.setData({
shoujihaoma: userInfo.shoujihaoma,
})
    userInfoObj["bumen"]= userInfo.bumen==null?"":userInfo.bumen
    userInfoObj["gangwei"]= userInfo.gangwei==null?"":userInfo.gangwei
    userInfoObj["qiyezhanghao"]= userInfo.qiyezhanghao==null?"":userInfo.qiyezhanghao
    userInfoObj["qiyemingcheng"]= userInfo.qiyemingcheng==null?"":userInfo.qiyemingcheng
    userInfoObj["qiyezhanghao"]= userInfo.qiyezhanghao==null?"":userInfo.qiyezhanghao
    userInfoObj["mima"]= userInfo.mima==null?"":userInfo.mima
    userInfoObj["qiyemingcheng"]= userInfo.qiyemingcheng==null?"":userInfo.qiyemingcheng
userInfo['qiyetupian']=userInfo?.qiyetupian?.replace('upload','file')
this.setData({
qiyetupian:baseURL+userInfo.qiyetupian,
tempPathqiyetupian:baseURL+userInfo.qiyetupian,
})
this.setData({
lianxidianhua: userInfo.lianxidianhua,
})
    userInfoObj["qiyedizhi"]= userInfo.qiyedizhi==null?"":userInfo.qiyedizhi
    userInfoObj["qiyejianjie"]= userInfo.qiyejianjie==null?"":userInfo.qiyejianjie
    userInfoObj["zhuceshijian"]= userInfo.zhuceshijian==null?"":userInfo.zhuceshijian
    userInfoObj["yuangongshuliang"]= userInfo.yuangongshuliang==null?"":userInfo.yuangongshuliang
    this.setData(
        userInfoObj
    )
//ss读取

},
async onShow() {
},
touxiangTap() {
wx.chooseImage({
count: 1,
sizeType: ['compressed'],
sourceType: ['album', 'camera'],
success: async (res) => {
const tempFilePaths = res.tempFilePaths;
// 本地临时图片的路径
this.setData({
tempPathtouxiang: tempFilePaths[0]
})
// 上传网络图片
const  baseURL=  wx.getStorageSync("baseURL")
wx.uploadFile({
url: `${baseURL}/file/upload`,
filePath: res.tempFilePaths[0],
name: 'file',
header: {
'Token': wx.getStorageSync('token')
},
success: (uploadFileRes) => {
let result = JSON.parse(uploadFileRes.data);
// result.file是上传成功为网络图片的名称
if (result.code == 0) {
this.setData({
        touxiang: 'file/' + result.file
})
} else {
wx.showToast({
    title: result.msg,
    icon: 'none',
    duration: 2000
});
}
}
})



}
})
},
xingbieChange(e) {
const selectedIndex = e.detail.value;
this.setData({
xingbieIndex: selectedIndex,
});
},
async sendCodeHandler() {
if (!this.data.canSendCode) {
return;
}
if (this.data.shoujihaoma == "") {
wx.showToast({
title: '请输入手机号码',
icon: 'none'
})
return;
} else {
if (validatePhoneNumber(this.data.shoujihaoma) == false) {
wx.showToast({
title: '请输入有效手机号码',
icon: 'none'
})
return;
} else {
const res = await SendverificationCode("${tableName}", 'sendsms','shoujihaoma',  this.data.shoujihaoma)
this.setData({
smscode: res.data
})
}
}
this.setData({
canSendCode: false,
});
let time = this.data.countdown;
let timer = setInterval(() => {
time--;
this.setData({
countdown: time, // 更新倒计时的时间
});
if (time <= 0) {
clearInterval(timer); // 倒计时结束，清除定时器
this.setData({
buttonText: '发送验证码',
canSendCode: true,
countdown: 60
});
}
}, 1000);

},
qiyetupianTap() {
wx.chooseImage({
count: 1,
sizeType: ['compressed'],
sourceType: ['album', 'camera'],
success: async (res) => {
const tempFilePaths = res.tempFilePaths;
// 本地临时图片的路径
this.setData({
tempPathqiyetupian: tempFilePaths[0]
})
// 上传网络图片
const  baseURL=  wx.getStorageSync("baseURL")
wx.uploadFile({
url: `${baseURL}/file/upload`,
filePath: res.tempFilePaths[0],
name: 'file',
header: {
'Token': wx.getStorageSync('token')
},
success: (uploadFileRes) => {
let result = JSON.parse(uploadFileRes.data);
// result.file是上传成功为网络图片的名称
if (result.code == 0) {
this.setData({
        qiyetupian: 'file/' + result.file
})
} else {
wx.showToast({
    title: result.msg,
    icon: 'none',
    duration: 2000
});
}
}
})



}
})
},
async sendCodeHandler() {
if (!this.data.canSendCode) {
return;
}
if (this.data.lianxidianhua == "") {
wx.showToast({
title: '请输入联系电话',
icon: 'none'
})
return;
} else {
if (validatePhoneNumber(this.data.lianxidianhua) == false) {
wx.showToast({
title: '请输入有效联系电话',
icon: 'none'
})
return;
} else {
const res = await SendverificationCode("${tableName}", 'sendsms','lianxidianhua',  this.data.lianxidianhua)
this.setData({
smscode: res.data
})
}
}
this.setData({
canSendCode: false,
});
let time = this.data.countdown;
let timer = setInterval(() => {
time--;
this.setData({
countdown: time, // 更新倒计时的时间
});
if (time <= 0) {
clearInterval(timer); // 倒计时结束，清除定时器
this.setData({
buttonText: '发送验证码',
canSendCode: true,
countdown: 60
});
}
}, 1000);

},
zhuceshijianChange(e) {
this.setData({
zhuceshijian:e.detail.value
})
},
quitTap(){
let saveBaseURL = wx.getStorageSync('baseURL')

wx.clearStorageSync();
wx.setStorageSync('baseURL', saveBaseURL)
wx.reLaunch({
url: "/pages/login/login"
});
},
async  saveTap(){


const baseURL = wx.getStorageSync('baseURL') + "/"
const regex = new RegExp(baseURL, "g");
const resultObj={
yuangongzhanghao:this.data.yuangongzhanghao,
yuangongmima:this.data.yuangongmima,
yuangongxingming:this.data.yuangongxingming,
touxiang:this.data.touxiang.replace(regex, ""),
xingbie:this.data.xingbieIndex ? this.data.xingbieList[this.data.xingbieIndex] : "",
shoujihaoma:this.data.shoujihaoma,
bumen:this.data.bumen,
gangwei:this.data.gangwei,
qiyezhanghao:this.data.qiyezhanghao,
qiyemingcheng:this.data.qiyemingcheng,
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
id:getApp().globalData.userInfo.id

}
const res = await update(this.data.role, resultObj)
if (res.code == 0) {
const userInfoRes = await session(this.data.role)
if (userInfoRes.code == 0) {
getApp().globalData.userInfo = userInfoRes.data
wx.reLaunch({
url: '/pages/center/center',
})
}
} else {
wx.showToast({
title: res.msg,
icon: "none"
})
}

},
async   getSession(){
let res = await session(this.data.role)
getApp().globalData.userInfo=res.data
this.setData({
openid:res.data.openid
})
}
});