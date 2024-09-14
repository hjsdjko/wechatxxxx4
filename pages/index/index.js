const {
list,
autoSort,
swiperData,
info,
} = require("../../api/index.js")
const utils = require('../../utils/index.js')
const menu = require('../../utils/menu.js')
Page({
data: {
value: null,
     baseURL: wx.getStorageSync('baseURL') + "/",
    systemIntroductionDetail: {},

hometongzhigonggaoList:[],
isIndex: false,
forumArr: [],
swiperList:[],
frontMenuList: [],
},

onReady() {
},
onSwiperTap(e){

},
checkMoreTap(e) {
const tableName = e.currentTarget.dataset.tablename;
const tabar = getApp().globalData.tabarList
if(tabar.includes(tableName)){
 wx.switchTab({
     url: `/pages/${tableName}/list`,
 })
}else{
 wx.navigateTo({
     url: `/pages/${tableName}/list`,
 })
}


},
async onLoad(options) {




    this.getData()


    },
    async onShow() {
this.onLoad()



    },
    async getSystemIntroduction() {
        let  res = await info('systemintro', 1)
        this.setData({
            systemIntroductionDetail:res.data
        })
    },

    selectTap(e) {
        const item = e.currentTarget.dataset.item;
        this.selectComponent('#bottomFrame').showFrame();
        this.setData({
            childItem: item.child
        })
    },
    tomenuTap(e) {
        const myitem = e.currentTarget.dataset.myitem;
        console.log('tableName', myitem);
        utils.menuTap(myitem.tableName)
    },
    cancelShow() {
        this.selectComponent('#bottomFrame').hideFrame();
    },
    menuTap(e) {
        const item = e.currentTarget.dataset.item;
        console.log('item', item);
        const tableName = item.child[0].tableName;
        console.log('tableName', tableName);
        utils.menuTap(tableName)

    },
    async toDetail(e) {
                const item = e.currentTarget.dataset.item;
        const tablename = e.currentTarget.dataset.tablename;
     getApp().globalData.detailId = item.id
    getApp().globalData.detailList=item
    wx.navigateTo({
        url: `/pages/${tablename}/detail`
    })
},


    onSearch() {},

    onHide() {

    },

    onUnload() {

    },
    imageErrorHandler(e) {
        console.log('图片加载失败:', e)
        // 在这里可以进行错误处理，例如显示加载失败的提示文字或设置默认图片
    },
    onPullDownRefresh() {

    },


    onReachBottom() {

    },


    onShareAppMessage() {

    },

    async getData() {
 let baseURL=wx.getStorageSync("baseURL")+"/"
        this.setData({
            baseURL
        })
const role=  wx.getStorageSync("role");
const menus = menu.default.list()
const frontMenuList=[]
menus.forEach((item,key) => {
    if(role==item.roleName) {
        item.frontMenu.forEach((item2,key2) => {
            if(item2.child[0].buttons.indexOf("查看")>-1) {
                frontMenuList.push(item2);
            }
        })
    }
})
this.setData({
    frontMenuList
})
    this.getSystemIntroduction();



    const swiperRes = await swiperData(1, 5)
    const swiperList = swiperRes?.data?.list.filter(item=>(item.value)).map(item => {
            return {
                img: baseURL + item.value,
                title: item.name,
                id: item.id
            };
    })
    this.setData({
        swiperList
    })



    const tongzhigonggao = await list("tongzhigonggao",
        {
                    page: 1,
                                                                                        }


    )
    const tongzhigonggaoresult = tongzhigonggao.data?.list?.map(item => {
    item.fengmian = baseURL + "/" +
        item.fengmian.split(",")[0];

        item.price = item?.price?.toFixed(2);
        item.vipprice = item?.vipprice?.toFixed(2);
        return item;
    });
    this.setData({
        hometongzhigonggaoList:  tongzhigonggaoresult
    })


    }
})