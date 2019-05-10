Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:[
      {id:1, img_url: 'http://127.0.0.1:3000/banner/banner-1.gif'},
      {id:2, img_url: 'http://127.0.0.1:3000/banner/banner-2.gif'},
      {id:3, img_url: 'http://127.0.0.1:3000/banner/banner-3.gif'},
      { id: 3, img_url: 'http://127.0.0.1:3000/banner/banner-4.gif' }
    ],
    product:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.load();
  },
  load:function(){
    wx.request({
      url: 'http://127.0.0.1:3000/product',
      success:(result)=>{
        console.log(result);
        this.setData({
          product: result.data
        });
      },
      fail: () => { },
      complete: () => {
        console.log("请求成功");
      }
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