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

    yuangongzhanghaoIndex: null,
    yuangongzhanghaoList: [],
yuangongxingming:"",
bumen:"",
gangwei:"",
chuqintianshu:"",
qingjiatianshu:"",
chidaotianshu:"",
zaotuicishu:"",
queqintianshu:"",
tongjishijian:"请选择时间",
showtongjishijian:false,
qiyezhanghao:"",
qiyemingcheng:"",
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
const yuangongzhanghaores = await option('yuangong/yuangongzhanghao')
    yuangongzhanghaores.data.unshift('请选择员工账号')
this.setData({
    yuangongzhanghaoList: yuangongzhanghaores.data
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


if(o=='chuqintianshu'){
            this.setData({
                            chuqintianshu: obj[o],
        })
        ro.chuqintianshu = true;
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


if(o=='chidaotianshu'){
            this.setData({
                            chidaotianshu: obj[o],
        })
        ro.chidaotianshu = true;
    continue;
}else{
    }


if(o=='zaotuicishu'){
            this.setData({
                            zaotuicishu: obj[o],
        })
        ro.zaotuicishu = true;
    continue;
}else{
    }


if(o=='queqintianshu'){
            this.setData({
                            queqintianshu: obj[o],
        })
        ro.queqintianshu = true;
    continue;
}else{
    }


if(o=='tongjishijian'){
            this.setData({
                            tongjishijian: obj[o],
        })
        ro.tongjishijian = true;
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
    yuangongzhanghaores.data.map((item, index) => {
    if (item == data.yuangongzhanghao) {
        this.setData({
                yuangongzhanghaoIndex: index,
                yuangongzhanghao: item
        })
                                                        this.getfollow("yuangong","yuangongzhanghao",item,"yuangongxingming")
                                                this.getfollow("yuangong","yuangongzhanghao",item,"bumen")
                                                this.getfollow("yuangong","yuangongzhanghao",item,"gangwei")
                                                                                                                                                                                        }else if (this.data.yuangongzhanghaoList.length == 1) {
        this.setData({
                yuangongzhanghaoIndex: 0,
                yuangongzhanghao: v
        })
    }
})




const url = wx.getStorageSync("baseURL") + "/"
const detailList = data
let  objtemp= {
detailList,
        yuangongzhanghao: data.yuangongzhanghao,
        chuqintianshu: data.chuqintianshu,
        qingjiatianshu: data.qingjiatianshu,
        chidaotianshu: data.chidaotianshu,
        zaotuicishu: data.zaotuicishu,
        queqintianshu: data.queqintianshu,
        tongjishijian:utils.getCurrentDate("yMDhms"),
        qiyezhanghao: data.qiyezhanghao,
        qiyemingcheng: data.qiyemingcheng,
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
    tongjishijian:utils.getCurrentDate("yMDhms")
})



},













async getfollow(refTable, refColumn, refColumnValue, suiColumnName) {
const {
    data
} = await follow(`${refTable}/${refColumn}`, refColumnValue)
let tempObj = {};
tempObj[suiColumnName] = data[suiColumnName];
this.setData(tempObj);
},

async yuangongzhanghaoChange(e) {
const selectedIndex = e.detail.value;
let  yuangongzhanghao=this.data.yuangongzhanghaoList[selectedIndex]
this.setData({
    yuangongzhanghaoIndex: selectedIndex,
    yuangongzhanghao
});
const {
data
} = await follow('yuangong/yuangongzhanghao', yuangongzhanghao)
    if(data.yuangongxingming){
        this.setData({
                yuangongxingming:data.yuangongxingming
        })
    }
    if(data.bumen){
        this.setData({
                bumen:data.bumen
        })
    }
    if(data.gangwei){
        this.setData({
                gangwei:data.gangwei
        })
    }

},








































































ontongjishijianTap(){
this.setData({
showtongjishijian: true,
})
},
tongjishijianTap(e) {
this.setData({
tongjishijian: e.detail.data
})

},






















async submit() {
let that = this
var query = wx.createSelectorQuery();










if(this.data.tongjishijian?.includes("请选择") || this.data.tongjishijian==""){
wx.showToast({
icon: "none",
title: `统计时间不能为空`,
})
return
}



const baseURL = wx.getStorageSync('baseURL') + "/"
const regex = new RegExp(baseURL, "g");
const obj={
yuangongzhanghao: this.data. yuangongzhanghao,
yuangongxingming: this.data. yuangongxingming,
bumen: this.data. bumen,
gangwei: this.data. gangwei,
chuqintianshu: this.data. chuqintianshu,
qingjiatianshu: this.data. qingjiatianshu,
chidaotianshu: this.data. chidaotianshu,
zaotuicishu: this.data. zaotuicishu,
queqintianshu: this.data. queqintianshu,
tongjishijian: this.data. tongjishijian,
qiyezhanghao: this.data. qiyezhanghao,
qiyemingcheng: this.data. qiyemingcheng,
}
const detailId= getApp().globalData.detailId
const tableName= `kaoqinxinxi`

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






if(this.data.yuangongzhanghaoList[this.data.yuangongzhanghaoIndex]==undefined ){
wx.showToast({
icon: "none",
title: `员工账号不能为空`,
})
return
}































if(!this.data.chuqintianshu ){
wx.showToast({
    icon: "none",
    title: `出勤天数不能为空`,
})
return
}










if(!this.data.qingjiatianshu ){
wx.showToast({
    icon: "none",
    title: `请假天数不能为空`,
})
return
}










if(!this.data.chidaotianshu ){
wx.showToast({
    icon: "none",
    title: `迟到天数不能为空`,
})
return
}










if(!this.data.zaotuicishu ){
wx.showToast({
    icon: "none",
    title: `早退次数不能为空`,
})
return
}










if(!this.data.queqintianshu ){
wx.showToast({
    icon: "none",
    title: `缺勤天数不能为空`,
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
let corssRes = await list(`kaoqinxinxi`, params)
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
await update(`kaoqinxinxi`, ruleForm)
}
else {
await add(`kaoqinxinxi`, ruleForm)
}
}


}
else {


//跨表计算
if (ruleForm.id || this.data.editStatus) {
this.data.editStatus?ruleForm['id']= getApp().globalData.detailId:""
await update(`kaoqinxinxi`, ruleForm)
}
else {
await add(`kaoqinxinxi`, ruleForm)
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