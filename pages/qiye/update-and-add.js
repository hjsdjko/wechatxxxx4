// pages/edit/edit.js
const {
detail,
option,
update,
add,
list,
follow,
faceMatch,
session,
rubbish,
baiduIdentify
} = require("../../api/index.js")

const des = require('../../utils/des.js')
const utils = require("../../utils/index.js")

Page({

/**
* 页面的初始数据
*/
data: {
    imgIcon: "../../static/upload.png",
editStatus: false,
baseURL:'',
sessionReadArr:[],

detailList: null,
id: "",
cross:"",
ruleForm:{},
userid:getApp().globalData.userInfo.id,
userInfo:getApp().globalData.userInfo,
ro:{
},

qiyezhanghao:"",
qiyemingcheng:"",
qiyetupian:"",
lianxidianhua:"",
qiyedizhi:"",
zhuceshijian:"请选择日期",
yuangongshuliang:"",
qiyejianjie:"",
},


/**
* 生命周期函数--监听页面加载
*/
async onLoad(options) {
let userid
if (options.id) {
this.setData({
editStatus: true
})


}
if(!this.data.userid){
let nowTable = wx.getStorageSync("nowTable");
const res = await session(nowTable)
getApp().globalData.userInfo=res?.data
userid = res?.data.id
}
let baseURL =wx.getStorageSync('baseURL') + '/'
const id = getApp().globalData.detailId
this.setData({
userid,
refid:id,
baseURL
})
//人脸识别


let  ro=this.data.ro
if(options?.cross){
var obj = wx.getStorageSync('crossObj');

for (var o in obj){

if(o=='qiyezhanghao'){
            this.setData({
                            qiyezhanghao: obj[o],
        })
        ro.qiyezhanghao = true;
    continue;
}else{
    }


if(o=='mima'){
            this.setData({
                            mima: obj[o],
        })
        ro.mima = true;
    continue;
}else{
    }


if(o=='qiyemingcheng'){
            this.setData({
                            qiyemingcheng: obj[o],
        })
        ro.qiyemingcheng = true;
    continue;
}else{
    }


if(o=='qiyetupian'){
            this.setData({
                qiyetupianPath :baseURL+ obj[o].split(",")[0],
        })

        ro.qiyetupian = true;
    continue;
}else{
    }


if(o=='lianxidianhua'){
            this.setData({
                            lianxidianhua: obj[o],
        })
        ro.lianxidianhua = true;
    continue;
}else{
    }


if(o=='qiyedizhi'){
            this.setData({
                            qiyedizhi: obj[o],
        })
        ro.qiyedizhi = true;
    continue;
}else{
    }


if(o=='qiyejianjie'){
            this.setData({
                            qiyejianjie: obj[o],
        })
        ro.qiyejianjie = true;
    continue;
}else{
    }


if(o=='zhuceshijian'){
            this.setData({
                            zhuceshijian: obj[o],
        })
        ro.zhuceshijian = true;
    continue;
}else{
    }


if(o=='yuangongshuliang'){
            this.setData({
                            yuangongshuliang: obj[o],
        })
        ro.yuangongshuliang = true;
    continue;
}else{
    }

}
let  statusColumnName=wx.getStorageSync('statusColumnName');
statusColumnName=statusColumnName.replace('[',"").replace(']',"");
this.setData({
ro,
cross:options?.cross,
statusColumnName
})
}

if(id){
// 如果上一级页面传递了id，获取改id数据信息
const   data=getApp().globalData.detailList


}else {
this.setData({
})
}



// ss读取
let sessionReadArr=[]

this.setData({
cross:options?.cross,
ro,
id,
sessionReadArr

})



},

getUUID () {
return new Date().getTime();
},
onUnload: function () {
console.log('页面被卸载，执行销毁操作');
},
onShow() {
},





































uploadqiyetupian() {
wx.chooseImage({
count: 1,
sizeType: ['compressed'],
sourceType: ['album', 'camera'],
success: async (res) => {
const tempFilePaths = res.tempFilePaths;
// 本地临时图片的路径
this.setData({
        qiyetupianPath: tempFilePaths[0]
})
let _this = this;
// 上传网络图片
const baseURL = wx.getStorageSync('baseURL')
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

this.setData({
    face: tempFilePaths[0]
});

}
})
},
























qiyejianjieInput(e) {
this.setData({
    qiyejianjie: e.detail.value // 每次输入变化时更新文本框的值
});
},









zhuceshijianChange(e) {
this.setData({
zhuceshijian: e.detail.value
})
},














async submit() {
let that = this
var query = wx.createSelectorQuery();
// 在 Page 中的某个方法中调用

query.select('#qiyejianjie').boundingClientRect();
query.exec(function (res) {
//res就是 所有标签为v1的元素的信息 的数组
that.setData({
    qiyejianjie: res[0].dataset.info
})
})








if(this.data.zhuceshijian?.includes("请选择") || this.data.zhuceshijian==""){
wx.showToast({
icon: "none",
title: `注册时间不能为空`,
})
return
}


const baseURL = wx.getStorageSync('baseURL') + "/"
const regex = new RegExp(baseURL, "g");
const obj={
qiyezhanghao: this.data. qiyezhanghao,
qiyemingcheng: this.data. qiyemingcheng,
qiyetupian:this.data.qiyetupian?.replace(regex, ""),
lianxidianhua: this.data. lianxidianhua,
qiyedizhi: this.data. qiyedizhi,
zhuceshijian: this.data. zhuceshijian,
yuangongshuliang: this.data. yuangongshuliang,
qiyejianjie:this.data. qiyejianjie,
}
const detailId= getApp().globalData.detailId
const tableName= `qiye`

//跨表计算判断
var obj2;
var  ruleForm=obj
obj2 = ruleForm
this.data.refid==""? ruleForm['refid']= getApp().globalData.detailId:""
ruleForm['userid']=getApp().globalData.userInfo.id
var userInfo=getApp().globalData.userInfo


const sessionReadArr=this.data.sessionReadArr
const phonePattern = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
const mobilePattern = /^(?:\+?86)?1[3-9]\d{9}$/;
const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const idPattern = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[0-1])\d{3}[\dxX]$/;
const urlPattern = /^(http|https):\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;

if(!this.data.qiyezhanghao ){
wx.showToast({
    icon: "none",
    title: `企业账号不能为空`,
})
return
}










if(!this.data.mima ){
wx.showToast({
    icon: "none",
    title: `密码不能为空`,
})
return
}










if(!this.data.qiyemingcheng ){
wx.showToast({
    icon: "none",
    title: `企业名称不能为空`,
})
return
}





















const valuelianxidianhua = this.data.lianxidianhua;

if (!mobilePattern.test(valuelianxidianhua)) {
wx.showToast({
icon: "none",
title: `联系电话应输入手机格式`,
})
return
}














































//更新跨表属性
var crossuserid;
var crossrefid;
var crossoptnum;

if(this.data.cross) {
wx.setStorageSync('crossCleanType', true);
var statusColumnName = wx.getStorageSync('statusColumnName');
var statusColumnValue = wx.getStorageSync('statusColumnValue');
if (statusColumnName != '') {
obj2 = wx.getStorageSync('crossObj');
if (!statusColumnName.startsWith("[")) {
for (var o in obj2) {
if (statusColumnName.includes(o)){
    obj2[o] = statusColumnValue;
}

}
var table = wx.getStorageSync('crossTable');
await update(table, obj2)
} else {

crossuserid =getApp().globalData.userInfo.id
crossrefid =  this.data.id
crossoptnum = wx.getStorageSync('statusColumnName');
crossoptnum = crossoptnum.replace(/\[/, "").replace(/\]/, "");
}
}
}
this.data.cross ? (crossrefid = this.data.id, crossuserid =this.data.userid) : ""

if(crossrefid && crossuserid) {
ruleForm['crossuserid'] = this.data.userid
ruleForm['crossrefid'] =this.data.id

this.setData({
ruleForm
})
let params = {
page: 1,
limit: 10,
crossuserid: crossuserid,
crossrefid: crossrefid,
}
const tips = wx.getStorageSync('tips')
let corssRes = await list(`qiye`, params)
crossoptnum = wx.getStorageSync('statusColumnName');
crossoptnum = crossoptnum.match(/\d+/g);
if (corssRes.data.total >= parseInt(crossoptnum)) {
wx.showToast({
icon: "none",
title: tips,
})
wx.removeStorageSync('crossCleanType');
return ;
}
else {


//跨表计算










if (ruleForm.id ) {
await update(`qiye`, ruleForm)
}
else {
await add(`qiye`, ruleForm)
}
}


}
else {


//跨表计算
if (ruleForm.id || this.data.editStatus) {
this.data.editStatus?ruleForm['id']= getApp().globalData.detailId:""
await update(`qiye`, ruleForm)
}
else {
await add(`qiye`, ruleForm)
}
}
getApp().globalData.editorContent=''
wx.showToast({
title: '提交成功',
icon: "none"
})
const preId = getApp().globalData.detailId

if(table){
let res = await detail(table, preId)
if(res.code==0){
getApp().globalData.detailList = res.data
}

}



wx.navigateBack({
delta: 1,
complete: () => {
// 触发事件通知，传递需要更新的数据
const pages = getCurrentPages();
if (pages.length >= 1) {
const prePage = pages[pages.length - 1];
prePage.onLoad(); //
}
}
})













},

onHide() {

},

/**
* 生命周期函数--监听页面卸载
*/
onUnload() {

},


/**
* 页面相关事件处理函数--监听用户下拉动作
*/
onPullDownRefresh() {

},

/**
* 页面上拉触底事件的处理函数
*/
onReachBottom() {

},

/**
* 用户点击右上角分享
*/
onShareAppMessage() {

}
})