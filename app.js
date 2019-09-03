/*
 * 
 * 微慕Plus微信小程序
 * author: jianbo
 * organization: 微慕Plus  www.minapper.com
 
 * 技术支持微信号：iamxjb
 *Copyright (c) 2019 https://www.minapper.com All rights reserved.
 * 
 */
import config from 'utils/config.js';

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var that = this
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs) 
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo: null,
    openid: '',
    isGetUserInfo: false,
    isGetOpenid: false,
    // 定义全局变量：”小程序版权信息“ 
    copyright: '©  ' + config.getWebsiteName + ' ' + config.getDomain
  }
})