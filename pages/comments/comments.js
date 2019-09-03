/*
 * 
 * 微慕Plus微信小程序
 * author: jianbo
 * organization: 微慕Plus  www.minapper.com
 
 * 技术支持微信号：iamxjb
 
 * 
 *  *Copyright (c) 2019 https://www.minapper.com All rights reserved.
 */

var Api = require('../../utils/api.js');
var util = require('../../utils/util.js');
var WxParse = require('../../wxParse/wxParse.js');
var wxApi = require('../../utils/wxApi.js')
var wxRequest = require('../../utils/wxRequest.js')

import config from '../../utils/config.js'
var pageCount = config.getPageCount;
var app = getApp();

Page({
    data: {
        title: '最新评论列表',
        showerror: "none",
        showallDisplay: "block",
        commentsList: [],
        copyright: app.globalData.copyright
    },
    onShareAppMessage: function () {
        var title = "分享"+config.getWebsiteName+"的最新评论";
        var path = "pages/comments/comments";
        return {
            title: title,
            path: path,
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    },
    reload: function (e) {
        var self = this;        
        self.fetchCommentsData();
    },
    onLoad: function (options) {
        var self = this;
        self.fetchCommentsData();

      wx.setNavigationBarTitle({
        title: '最新评论',
        success: function (res) {
          // success
        }
      });
    },
    //获取文章列表数据
    fetchCommentsData: function () {
        var self = this;
        wx.showLoading({
            title: '正在加载',
            mask: true
        });
        self.setData({
            commentsList: []
        });
        var getNewComments = wxRequest.getRequest(Api.getNewComments());
        getNewComments.then(response => {
            if (response.statusCode == 200) {
                
                self.setData({
                    commentsList: response.data.data
                });
                
            }
            else {
                console.log(response);
                this.setData({
                    showerror: 'block'
                });

            }
        }).catch(function () {
                self.setData({
                    showerror: "block",
                    
                });

            })
            .finally(function () {
                wx.hideLoading();
            })
    },
    // 跳转至查看文章详情
    redictDetail: function (e) {
        // console.log('查看文章');
        var id = e.currentTarget.dataset.postid,
        url = '../detail/detail?id=' + id;
        wx.navigateTo({
            url: url
        })
    },
    onPullDownRefresh: function () {
        var self = this;
        this.setData({
            readLogs: []
        });
        self.setData({
            showallDisplay: "none",
            showerror: "none",

        });
        self.fetchCommentsData();
        //消除下刷新出现空白矩形的问题。
        wx.stopPullDownRefresh();

    }
})



