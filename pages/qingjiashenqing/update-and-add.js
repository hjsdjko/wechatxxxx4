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
qingjiayuanyin:"",
qingjiatianshu:"",
kaishishijian:"请选择日期",
    qingjialeixingList:"事假,病假,其他".split(','),
    qingjialeixingIndex:null,
beizhu:"",
yuangongzhanghao:"",
yuangongxingming:"",
bumen:"",
gangwei:"",
qiyezhanghao:"",
qiyemingcheng:"",
shenqingshijian:"请选择时间",
showshenqingshijian:false,
sfsh: '待审核',
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
    qingjialeixingList:  "事假,病假,其他".split(',')
})



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


if(o=='qingjiayuanyin'){
            this.setData({
                            qingjiayuanyin: obj[o],
        })
        ro.qingjiayuanyin = true;
    continue;
}else{
    }


if(o=='qingjiatianshu'){
            this.setData({
                            qingjiatianshu: obj[o],
        })
        ro.qingjiatianshu = true;
    continue;
}else{
    }


if(o=='kaishishijian'){
            this.setData({
                            kaishishijian: obj[o],
        })
        ro.kaishishijian = true;
    continue;
}else{
    }


if(o=='qingjialeixing'){
            this.setData({
                            qingjialeixing: obj[o],
        })
        ro.qingjialeixing = true;
    continue;
}else{
    }


if(o=='beizhu'){
            this.setData({
                            beizhu: obj[o],
        })
        ro.beizhu = true;
    continue;
}else{
    }


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


if(o=='qiyezhanghao'){
            this.setData({
                            qiyezhanghao: obj[o],
        })
        ro.qiyezhanghao = true;
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


if(o=='shenqingshijian'){
            this.setData({
                            shenqingshijian: obj[o],
        })
        ro.shenqingshijian = true;
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
const  def_5= null  ;
this.data.qingjialeixingList.map((v, index) => {
    if (v == data.qingjialeixing|| (v == def_5 && def_5 !=null)) {
        this.setData({
                qingjialeixingIndex: index,
                qingjialeixing: v
        })
    }else if (this.data.qingjialeixingList.length == 1) {
        this.setData({
                qingjialeixingIndex: 0,
                qingjialeixing: v,
                qingjialeixingList:[def_5]
        })
    }
})




const url = wx.getStorageSync("baseURL") + "/"
const detailList = data
let  objtemp= {
detailList,
        biaoti: data.biaoti,
        qingjiayuanyin: data.qingjiayuanyin,
        qingjiatianshu: data.qingjiatianshu,
        kaishishijian: data.kaishishijian,
        beizhu: data.beizhu,
        yuangongzhanghao: data.yuangongzhanghao,
        yuangongxingming: data.yuangongxingming,
        bumen: data.bumen,
        gangwei: data.gangwei,
        qiyezhanghao: data.qiyezhanghao,
        qiyemingcheng: data.qiyemingcheng,
        shenqingshijian:utils.getCurrentDate("yMDhms"),
        shhf: data.shhf,
        userid: data.userid,
        sfsh: '待审核',

}
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
let qiyezhanghao= getApp().globalData.userInfo.qiyezhanghao
ro.qiyezhanghao=true
this.setData({
        qiyezhanghao,
})
sessionReadArr.push('qiyezhanghao')
let qiyemingcheng= getApp().globalData.userInfo.qiyemingcheng
ro.qiyemingcheng=true
this.setData({
        qiyemingcheng,
})
sessionReadArr.push('qiyemingcheng')

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
    shenqingshijian:utils.getCurrentDate("yMDhms")
})




},





































kaishishijianChange(e) {
this.setData({
kaishishijian: e.detail.value
})
},








async qingjialeixingChange(e) {
const selectedIndex = e.detail.value;
let  qingjialeixing=this.data.qingjialeixingList[selectedIndex]
this.setData({
    qingjialeixingIndex: selectedIndex,
    qingjialeixing
});
},
































































onshenqingshijianTap(){
this.setData({
showshenqingshijian: true,
})
},
shenqingshijianTap(e) {
this.setData({
shenqingshijian: e.detail.data
})

},








shhfInput(e) {
this.setData({
    shhf: e.detail.value // 每次输入变化时更新文本框的值
});
},























async submit() {
let that = this
var query = wx.createSelectorQuery();




if(this.data.kaishishijian?.includes("请选择") || this.data.kaishishijian==""){
wx.showToast({
icon: "none",
title: `开始时间不能为空`,
})
return
}









if(this.data.shenqingshijian?.includes("请选择") || this.data.shenqingshijian==""){
wx.showToast({
icon: "none",
title: `申请时间不能为空`,
})
return
}




const baseURL = wx.getStorageSync('baseURL') + "/"
const regex = new RegExp(baseURL, "g");
const obj={
biaoti: this.data. biaoti,
qingjiayuanyin: this.data. qingjiayuanyin,
qingjiatianshu: this.data. qingjiatianshu,
kaishishijian: this.data. kaishishijian,
qingjialeixing: this.data. qingjialeixing,
beizhu: this.data. beizhu,
yuangongzhanghao: this.data. yuangongzhanghao,
yuangongxingming: this.data. yuangongxingming,
bumen: this.data. bumen,
gangwei: this.data. gangwei,
qiyezhanghao: this.data. qiyezhanghao,
qiyemingcheng: this.data. qiyemingcheng,
shenqingshijian: this.data. shenqingshijian,
userid: this.data. userid,
sfsh:"是",
}
const detailId= getApp().globalData.detailId
const tableName= `qingjiashenqing`

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










































if(this.data.qingjialeixingList[this.data.qingjialeixingIndex]==undefined ){
wx.showToast({
icon: "none",
title: `请假类型不能为空`,
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
let corssRes = await list(`qingjiashenqing`, params)
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
await update(`qingjiashenqing`, ruleForm)
}
else {
await add(`qingjiashenqing`, ruleForm)
}
}


}
else {


//跨表计算
if (ruleForm.id || this.data.editStatus) {
this.data.editStatus?ruleForm['id']= getApp().globalData.detailId:""
await update(`qingjiashenqing`, ruleForm)
}
else {
await add(`qingjiashenqing`, ruleForm)
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