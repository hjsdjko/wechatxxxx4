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

yuangongzhanghao:"",
yuangongmima:"",
yuangongxingming:"",
touxiang:"",
    xingbieList:"男,女".split(','),
    xingbieIndex:null,
shoujihaoma:"",
bumen:"",
gangwei:"",
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
this.setData({
    xingbieList:  "男,女".split(',')
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


if(o=='yuangongmima'){
            this.setData({
                            yuangongmima: obj[o],
        })
        ro.yuangongmima = true;
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


if(o=='touxiang'){
            this.setData({
                touxiangPath :baseURL+ obj[o].split(",")[0],
        })

        ro.touxiang = true;
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


if(o=='shoujihaoma'){
            this.setData({
                            shoujihaoma: obj[o],
        })
        ro.shoujihaoma = true;
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
this.data.xingbieList.map((v, index) => {
    if (v == data.xingbie|| (v == def_5 && def_5 !=null)) {
        this.setData({
                xingbieIndex: index,
                xingbie: v
        })
    }else if (this.data.xingbieList.length == 1) {
        this.setData({
                xingbieIndex: 0,
                xingbie: v,
                xingbieList:[def_5]
        })
    }
})




const url = wx.getStorageSync("baseURL") + "/"
const detailList = data
let  objtemp= {
detailList,
        yuangongzhanghao: data.yuangongzhanghao,
        yuangongmima: data.yuangongmima,
        yuangongxingming: data.yuangongxingming,
        touxiang:data?.touxiang?.split(',')[0],
        touxiangPath:baseURL+data?.touxiang?.split(',')[0],
        shoujihaoma: data.shoujihaoma,
        bumen: data.bumen,
        gangwei: data.gangwei,
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








async xingbieChange(e) {
const selectedIndex = e.detail.value;
let  xingbie=this.data.xingbieList[selectedIndex]
this.setData({
    xingbieIndex: selectedIndex,
    xingbie
});
},














































async submit() {
let that = this
var query = wx.createSelectorQuery();











const baseURL = wx.getStorageSync('baseURL') + "/"
const regex = new RegExp(baseURL, "g");
const obj={
yuangongzhanghao: this.data. yuangongzhanghao,
yuangongmima: this.data. yuangongmima,
yuangongxingming: this.data. yuangongxingming,
touxiang:this.data.touxiang?.replace(regex, ""),
xingbie: this.data. xingbie,
shoujihaoma: this.data. shoujihaoma,
bumen: this.data. bumen,
gangwei: this.data. gangwei,
qiyezhanghao: this.data. qiyezhanghao,
qiyemingcheng: this.data. qiyemingcheng,
}
const detailId= getApp().globalData.detailId
const tableName= `yuangong`

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










if(!this.data.yuangongmima ){
wx.showToast({
    icon: "none",
    title: `员工密码不能为空`,
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
























if(this.data.xingbieList[this.data.xingbieIndex]==undefined ){
wx.showToast({
icon: "none",
title: `性别不能为空`,
})
return
}






const valueshoujihaoma = this.data.shoujihaoma;

if (!mobilePattern.test(valueshoujihaoma)) {
wx.showToast({
icon: "none",
title: `手机号码应输入手机格式`,
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
let corssRes = await list(`yuangong`, params)
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
await update(`yuangong`, ruleForm)
}
else {
await add(`yuangong`, ruleForm)
}
}


}
else {


//跨表计算
if (ruleForm.id || this.data.editStatus) {
this.data.editStatus?ruleForm['id']= getApp().globalData.detailId:""
await update(`yuangong`, ruleForm)
}
else {
await add(`yuangong`, ruleForm)
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