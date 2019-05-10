// pages/car/car.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts: [ ],
    totalPrice:0,
    checked:true,
    checkedAll:true,
    chooseGoods:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  totalPrice(){
    var totalPrice = 0;
    for (var i = 0; i < this.data.carts.length; i++) {
      if (this.data.carts[i].checked) {
        totalPrice += this.data.carts[i].count* this.data.carts[i].price
      }
    }
    //更新数据
    this.setData({ totalPrice: totalPrice});
  },
  // 选择商品
  select: function (e) {
    var index=e.currentTarget.dataset.index
    var checkedAll = this.data.checkedAll;
    var carts = this.data.carts
    // carts[index].checked = !carts[index].checked
    checkedAll=!checkedAll
    
      carts[index].checked = checkedAll
    this.setData({
      carts: carts,
      checkedAll: checkedAll
    })
    this.totalPrice()
  },
  selectAll: function (e) {
    var carts = this.data.carts 
    var checkedAll=this.data.checkedAll 
    checkedAll=!checkedAll
    if(checkedAll==true){
      for(var i=0;i<carts.length;i++){
        carts[i].checked=true;
      }
    }else{
      for (var i = 0; i < carts.length; i++) {
        carts[i].checked =false;
      }
    }
    this.setData({
      carts: carts,
      checkedAll:checkedAll
    })
    this.totalPrice();
    wx.setStorageSync("cartItems", carts)
  },
  add:function(e){
    var index=e.currentTarget.dataset.index;
    var carts=this.data.carts;
    carts[index].count++;
    this.setData({
      carts:carts
    })
    this.totalPrice();
    wx.setStorageSync('cartItems', carts)
  },
  reduce:function(e){
    var index = e.currentTarget.dataset.index;
    var carts = this.data.carts;
    if(carts[index].count>1){
      carts[index].count--
    }else{
      wx.showToast({
        title:'不能再删除了',
        icon:'none',
        duration:2000
      })
    }
    this.setData({
      carts:carts
    })
    this.totalPrice();
    wx.setStorageSync('cartItems', carts)
  },
  del:function(e){ 
    var index=e.currentTarget.dataset.index   
    var carts = this.data.carts;
    wx.showModal({
      title: '温馨提示',
      content: '确定删除已选中的商品吗？',
      success:(res)=>{
        if(res.confirm){
          carts.splice(index,1)
          console.log(carts)
          this.setData({
            carts: carts
          })
          this.totalPrice()
          wx.setStorageSync("cartItems", carts)
          wx.showToast({
            title: '删除成功',
            icon:'none',
            duration:2000
          })
          
        }else if(res.cancel){
          wx.showToast({
            title: '取消删除',
            icon:'none',
            duration:1000
          })
        }
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
    var carts = wx.getStorageSync("cartItems")
    for(var i = 0; i < carts.length; i++) {
      carts[i].checked = true;
    }    
    this.setData({
      carts: carts,
    })
    this.totalPrice();
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