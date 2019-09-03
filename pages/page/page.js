/*
 * 
 * 微慕Plus微信小程序
 * author: jianbo
 * organization: 微慕Plus  www.minapper.com
 
 * 技术支持微信号：iamxjb
 
 *Copyright (c) 2019 https://www.minapper.com All rights reserved.
 * 
 */

var Api = require('../../utils/api.js');
var util = require('../../utils/util.js');
var WxParse = require('../../wxParse/wxParse.js');
import config from '../../utils/config.js'
var app = getApp();

Page({
  data: {
    title: '页面内容',
    pageData: {},
    pagesList: {},
    hidden: false,
    wxParseData: []
  },
  onLoad: function (options) {
    this.fetchData(config.getGuideId);
    this.fetchPagesData();
    wx.setNavigationBarTitle({
      title: '新手指南',
    })
  },
  fetchData: function (id) {
    var self = this;
    self.setData({
      hidden: false
    });
    wx.request({
      url: Api.getPageByID(id, { mdrender: false }),
      success: function (response) {
        //console.log(response);
        WxParse.wxParse('article', 'html', response.data.content.rendered, self, 5);
        self.setData({
          pageData: response.data,
          // wxParseData: WxParse('md',response.data.content.rendered)
          //wxParseData: WxParse.wxParse('article', 'html', response.data.content.rendered, self, 5)
        });
        setTimeout(function () {
          self.setData({
            hidden: true
          });
        }, 300);
      }
    });
  },
  //给a标签添加跳转和复制链接事件
  wxParseTagATap: function (e) {
    var self = this;
    var href = e.currentTarget.dataset.src;
    console.log(href);
 
    //我们可以在这里进行一些路由处理
     {
      wx.setClipboardData({
        data: href,
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              wx.showToast({
                title: '链接已复制',
                //icon: 'success',
                image: '../../images/src/link.png',
                duration: 2000
              })
            }
          })
        }
      })
    }
  

  },
  fetchPagesData: function () {
    var self = this;
    wx.request({
      url: Api.getPages(),
      success: function (response) {
        self.setData({
          pagesList: response.data
        });
        setTimeout(function () {
          self.setData({
            hidden: true
          });
        }, 300);
      }
    });
  }
})
