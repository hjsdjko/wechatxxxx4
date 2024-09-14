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

biaoti:"",
fengmian:"",
fabushijian:"请选择时间",
showfabushijian:false,
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

if(o=='biaoti'){
            this.setData({
                            biaoti: obj[o],
        })
        ro.biaoti = true;
    continue;
}else{
    }


if(o=='fengmian'){
            this.setData({
                fengmianPath :baseURL+ obj[o].split(",")[0],
        })

        ro.fengmian = true;
    continue;
}else{
    }


if(o=='neirong'){
            this.setData({
                            neirong: obj[o],
        })
        ro.neirong = true;
    continue;
}else{
    }


if(o=='fabushijian'){
            this.setData({
                            fabushijian: obj[o],
        })
        ro.fabushijian = true;
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


const url = wx.getStorageSync("baseURL") + "/"
const detailList = data
let  objtemp= {
detailList,
        biaoti: data.biaoti,
        fengmian:data?.fengmian?.split(',')[0],
        fengmianPath:baseURL+data?.fengmian?.split(',')[0],
        neirong: data.neirong,
        fabushijian:utils.getCurrentDate("yMDhms"),
}
this.data.editStatus? getApp().globalData.editorContent=data.neirong:""
this.setData(objtemp);

//ss读取
let c = this.data
this.setData({
});

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




this.setData({
    fabushijian:utils.getCurrentDate("yMDhms")
})

},





















uploadfengmian() {
wx.chooseImage({
count: 1,
sizeType: ['compressed'],
sourceType: ['album', 'camera'],
success: async (res) => {
const tempFilePaths = res.tempFilePaths;
// 本地临时图片的路径
this.setData({
        fengmianPath: tempFilePaths[0]
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
                    fengmian: 'file/' + result.file
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
















onfabushijianTap(){
this.setData({
showfabushijian: true,
})
},
fabushijianTap(e) {
this.setData({
fabushijian: e.detail.data
})

},






async submit() {
let that = this
var query = wx.createSelectorQuery();




if(this.data.fabushijian?.includes("请选择") || this.data.fabushijian==""){
wx.showToast({
icon: "none",
title: `发布时间不能为空`,
})
return
}

const baseURL = wx.getStorageSync('baseURL') + "/"
const regex = new RegExp(baseURL, "g");
const obj={
biaoti: this.data. biaoti,
fengmian:this.data.fengmian?.replace(regex, ""),
neirong: getApp().globalData.editorContent,
fabushijian: this.data. fabushijian,
}
const detailId= getApp().globalData.detailId
const tableName= `tongzhigonggao`

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

if(!this.data.biaoti ){
wx.showToast({
    icon: "none",
    title: `标题不能为空`,
})
return
}




























let neirong=  getApp().globalData.editorContent
ruleForm['neirong']=getApp().globalData.editorContent
if(neirong==='' ){
wx.showToast({
icon: "none",
title: `内容不能为空`,
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
let corssRes = await list(`tongzhigonggao`, params)
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
await update(`tongzhigonggao`, ruleForm)
}
else {
await add(`tongzhigonggao`, ruleForm)
}
}


}
else {


//跨表计算
if (ruleForm.id || this.data.editStatus) {
this.data.editStatus?ruleForm['id']= getApp().globalData.detailId:""
await update(`tongzhigonggao`, ruleForm)
}
else {
await add(`tongzhigonggao`, ruleForm)
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