// pages/playlist/playlist.js
const MAX_LIMIT=15
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperImgUrls:[
      { imgUrl:'https://kwimg.kuwo.cn/star/upload/4/4/1480909297444_.jpg'},
      { imgUrl:'https://kwimg.kuwo.cn/star/upload/4/4/1480909297444_.jpg' }
    ],
    playList:[
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getPlayList();
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
    this.setData({
      playList:[]
    })
    this._getPlayList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
this._getPlayList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  _getPlayList(){
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name: 'music', data: {
        start: this.data.playList.length,
        count: MAX_LIMIT,
      }
    }).then((res) => {
      this.setData({
        playList: this.data.playList.concat(res.result.data)
      })
      wx.stopPullDownRefresh()
      wx.hideLoading()
    })
  }
})