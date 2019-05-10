 // pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product:[],
    lid:0,
    isShow:true,
    count:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://127.0.0.1:3000/details?lid='+options.lid,
      success:(result)=>{
        this.setData({
          product:result.data.data,
          lid:options.lid
        })
      }
    })
  },
  show(){
    this.setData({
      isShow:false
    })
  },
  hide(){
    this.setData({
      isShow:true
    })
  },
  add(){
    console.log(this.data.count);
    this.setData({
      count: this.data.count+1
    })
  },
  reduce(){
    if (this.data.count>1){
      this.setData({
        count: this.data.count-1
      })
    }else{
      wx.showToast({
        title: '亲，不能在减少了！',
        icon: 'loading',
        duration: 2000,
        mask: true
      })
    }
  },
  addCar(){
    var lid=this.data.lid;
    var pic = this.data.product[0].pic;
    var subtitle=this.data.product[0].subtitle;
    var price=this.data.product[0].price;
    var count=this.data.count;
    //获取缓存中的已添加购物车信息
    var cartItems = wx.getStorageSync('cartItems') || []
    // console.log(cartItems)
     //判断购物车缓存中是否已存在该货品
    var exist = cartItems.find(function (ele) {
      // console.log(ele)
      return ele.lid == lid
    })
    //  console.log(exist);
    if (exist) {
      //如果存在，则增加该货品的购买数量
      wx.showToast({
        title: "购物车已有该商品",
        icon: "success",
        durantion: 2000
      })
      exist.count= parseInt(exist.count) + count;
      
    } else {
      //如果不存在，传入该货品信息
      cartItems.push({
        lid: lid,
        count:count,
        price: price,
        subtitle: subtitle,
        pic:pic
      })
      // console.log(cartItems);
      wx.setStorage({
        key: 'cartItems',
        data: cartItems,
        success: function (res) {
          console.log(res)
          //添加购物车的消息提示框
          wx.showToast({
            title: "添加购物车",
            icon: "success",
            durantion: 2000
          })
        }
      })
    }
    
  },
  car(){
    wx.switchTab({
      url: '/pages/car/car'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})