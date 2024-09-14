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
address:"",
sessionReadArr:[],
userface : '',
faceMatchFlag: false,

detailList: null,
id: "",
cross:"",
ruleForm:{},
userid:getApp().globalData.userInfo.id,
userInfo:getApp().globalData.userInfo,
ro:{
},

yuangongzhanghao:"",
yuangongxingming:"",
xingbie:"",
bumen:"",
gangwei:"",
touxiang:"",
dakashijian:"请选择时间",
showdakashijian:false,
    dakaleixingList:"上班,下班".split(','),
    dakaleixingIndex:null,
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
this.setData({
userface: getApp().globalData.userInfo.touxiang,
})

this.setData({
    dakaleixingList:  "上班,下班".split(',')
})



let  ro=this.data.ro
if(options?.cross){
var obj = wx.getStorageSync('crossObj');

for (var o in obj){

if(o=='yuangongzhanghao'){
            this.setData({
                            yuangongzhanghao: obj[o],
        })
        ro.yuangongzhanghao = true;
    continue;
}else{
    }


if(o=='yuangongxingming'){
            this.setData({
                            yuangongxingming: obj[o],
        })
        ro.yuangongxingming = true;
    continue;
}else{
    }


if(o=='xingbie'){
            this.setData({
                            xingbie: obj[o],
        })
        ro.xingbie = true;
    continue;
}else{
    }


if(o=='bumen'){
            this.setData({
                            bumen: obj[o],
        })
        ro.bumen = true;
    continue;
}else{
    }


if(o=='gangwei'){
            this.setData({
                            gangwei: obj[o],
        })
        ro.gangwei = true;
    continue;
}else{
    }


if(o=='touxiang'){
            this.setData({
                touxiangPath :baseURL+ obj[o].split(",")[0],
        })

        ro.touxiang = true;
    continue;
}else{
    }


if(o=='dakashijian'){
            this.setData({
                            dakashijian: obj[o],
        })
        ro.dakashijian = true;
    continue;
}else{
    }


if(o=='dakaleixing'){
            this.setData({
                            dakaleixing: obj[o],
        })
        ro.dakaleixing = true;
    continue;
}else{
    }


if(o=='userid'){
            this.setData({
                            userid: obj[o],
        })
        ro.userid = true;
    continue;
}else{
    }


if(o=='longitude'){
            this.setData({
                            longitude: obj[o],
        })
        ro.longitude = true;
    continue;
}else{
    }


if(o=='latitude'){
            this.setData({
                            latitude: obj[o],
        })
        ro.latitude = true;
    continue;
}else{
    }


if(o=='fulladdress'){
            this.setData({
                            fulladdress: obj[o],
        })
        ro.fulladdress = true;
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
const  def_8= null  ;
this.data.dakaleixingList.map((v, index) => {
    if (v == data.dakaleixing|| (v == def_8 && def_8 !=null)) {
        this.setData({
                dakaleixingIndex: index,
                dakaleixing: v
        })
    }else if (this.data.dakaleixingList.length == 1) {
        this.setData({
                dakaleixingIndex: 0,
                dakaleixing: v,
                dakaleixingList:[def_8]
        })
    }
})




}else {
this.setData({
})
}



// ss读取
let sessionReadArr=[]
let yuangongzhanghao= getApp().globalData.userInfo.yuangongzhanghao
ro.yuangongzhanghao=true
this.setData({
        yuangongzhanghao,
})
sessionReadArr.push('yuangongzhanghao')
let yuangongxingming= getApp().globalData.userInfo.yuangongxingming
ro.yuangongxingming=true
this.setData({
        yuangongxingming,
})
sessionReadArr.push('yuangongxingming')
let xingbie= getApp().globalData.userInfo.xingbie
ro.xingbie=true
this.setData({
        xingbie,
})
sessionReadArr.push('xingbie')
let bumen= getApp().globalData.userInfo.bumen
ro.bumen=true
this.setData({
        bumen,
})
sessionReadArr.push('bumen')
let gangwei= getApp().globalData.userInfo.gangwei
ro.gangwei=true
this.setData({
        gangwei,
})
sessionReadArr.push('gangwei')

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





















































uploadtouxiang() {
wx.chooseImage({
count: 1,
sizeType: ['compressed'],
sourceType: ['album', 'camera'],
success: async (res) => {
const tempFilePaths = res.tempFilePaths;
// 本地临时图片的路径
this.setData({
        touxiangPath: tempFilePaths[0]
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

this.setData({
    face: tempFilePaths[0]
});

}
})
},








ondakashijianTap(){
this.setData({
showdakashijian: true,
})
},
dakashijianTap(e) {
this.setData({
dakashijian: e.detail.data
})

},








async dakaleixingChange(e) {
const selectedIndex = e.detail.value;
let  dakaleixing=this.data.dakaleixingList[selectedIndex]
this.setData({
    dakaleixingIndex: selectedIndex,
    dakaleixing
});
},

































adressTap() {
// wx.navigateTo({
//     url: '/pages/address/list',
// })
let that = this
wx.getLocation({
// type: '6d82583d03f5544e3d109c2e289f34eb',
type: 'gcj02',
isHighAccuracy: true,
success: function (res) {
var latitude = res.latitude;
var longitude = res.longitude;
wx.chooseLocation({
latitude: res.latitude,
longitude: res.longitude,
success: function (data) {
        let address = data.address
    that.setData({
        address
    })
}
})

},
fail: function (err) {
console.log('获取位置信息失败', err);
}
});
},





async submit() {
let that = this
var query = wx.createSelectorQuery();







if(this.data.dakashijian?.includes("请选择") || this.data.dakashijian==""){
wx.showToast({
icon: "none",
title: `打卡时间不能为空`,
})
return
}






const baseURL = wx.getStorageSync('baseURL') + "/"
const regex = new RegExp(baseURL, "g");
const obj={
address: this.data.address,
yuangongzhanghao: this.data. yuangongzhanghao,
yuangongxingming: this.data. yuangongxingming,
xingbie: this.data. xingbie,
bumen: this.data. bumen,
gangwei: this.data. gangwei,
touxiang:this.data.touxiang?.replace(regex, ""),
dakashijian: this.data. dakashijian,
dakaleixing: this.data. dakaleixing,
userid: this.data. userid,
longitude: this.data. longitude,
latitude: this.data. latitude,
fulladdress: this.data. fulladdress,
}
const detailId= getApp().globalData.detailId
const tableName= `daka`

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

if(!this.data.yuangongzhanghao ){
wx.showToast({
    icon: "none",
    title: `员工账号不能为空`,
})
return
}










if(!this.data.yuangongxingming ){
wx.showToast({
    icon: "none",
    title: `员工姓名不能为空`,
})
return
}





































if(!this.data.touxiang ){
wx.showToast({
    icon: "none",
    title: `头像不能为空`,
})
return
}
























if(this.data.dakaleixingList[this.data.dakaleixingIndex]==undefined ){
wx.showToast({
icon: "none",
title: `打卡类型不能为空`,
})
return
}










































if(!this.data.faceMatchFlag) {
let params = {
    face1: this.data?.userface?.replace("file/",""),
    face2: this.data?.touxiang?.replace("file/","")
}
let faceres = await faceMatch(params);
if(faceres && faceres.score>=60) {
        this.setData({
        faceMatchFlag:true
    })
    wx.showToast({
        icon: "none",
        title: '匹配成功',
    })
    return
} else {
    wx.showToast({
        icon: "none",
        title: '匹配失败',
    })
    return
}
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
let corssRes = await list(`daka`, params)
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
await update(`daka`, ruleForm)
}
else {
await add(`daka`, ruleForm)
}
}


}
else {


//跨表计算
if (ruleForm.id || this.data.editStatus) {
this.data.editStatus?ruleForm['id']= getApp().globalData.detailId:""
await update(`daka`, ruleForm)
}
else {
await add(`daka`, ruleForm)
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