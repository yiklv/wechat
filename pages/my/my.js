/*
 * 
 * 微慕Plus微信小程序
 * author: jianbo
 * organization: 微慕Plus  www.minapper.com
 
 * 技术支持微信号：iamxjb
 
 * 
 *  *Copyright (c) 2019 https://www.minapper.com All rights reserved.
 */
import config from '../../utils/config.js'
var Api = require('../../utils/api.js');
var util = require('../../utils/util.js');
var Auth = require('../../utils/auth.js');
var WxParse = require('../../wxParse/wxParse.js');
var wxApi = require('../../utils/wxApi.js')
var wxRequest = require('../../utils/wxRequest.js');
const app = getApp();

Page({

    data: {
        readLogs: [],


        showerror: "none",
        shownodata: "none",
        subscription: "",
        userInfo: {},
        userLevel: {},
        openid: '',
        isLoginPopup: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    },

    // 登录信息放在onShow生命周期里，不然从详情页和分类页
    onShow() {
        var self = this;

        Auth.setUserInfoData(self);
        Auth.checkLogin(self);

    },

    onReady: function () {
        var self = this;
        Auth.checkSession(self, 'isLoginNow');
    },
    agreeGetUser: function (e) {
        let self = this;
        Auth.checkAgreeGetUser(e, app, self, '0');

    },

    redictReadlog: function (e) {
        let self = this;
        var id = e.currentTarget.id;
        var url = "";
        if (id == "0") {
            url = '../about/about';
            wx.navigateTo({
                url: url
            })
        }
        else {
            if (self.data.openid) {
                url = '../readlog/readlog?id=' + id;
                wx.navigateTo({
                    url: url
                })
            }
            else {
                Auth.checkSession(self, 'isLoginNow');
            }

        }
    },

    refresh: function (e) {
        var self = this;
        if (self.data.openid) {
            var args = {};
            var userInfo = e.detail.userInfo;
            args.openid = self.data.openid;
            args.avatarUrl = userInfo.avatarUrl;
            args.nickname = userInfo.nickName;
            var url = Api.getUpdateUserInfo();
            var postUpdateUserInfoRequest = wxRequest.postRequest(url, args);
            postUpdateUserInfoRequest.then(res => {
                if (res.data.status == '200') {
                    var userLevel = res.data.userLevel;
                    wx.setStorageSync('userInfo', userInfo);
                    wx.setStorageSync('userLevel', userLevel);
                    self.setData({ userInfo: userInfo });
                    self.setData({ userLevel: userLevel });
                    wx.showToast({
                        title: res.data.message,
                        icon: 'success',
                        duration: 900,
                        success: function () {
                        }
                    })
                }
                else {
                    wx.showToast({
                        title: res.data.message,
                        icon: 'success',
                        duration: 900,
                        success: function () {
                        }
                    })
                }


            });
        }
        else {
            Auth.checkSession(self, 'isLoginNow');

        }

    },

    exit: function (e) {

        Auth.logout(this);
        wx.reLaunch({
            url: '../index/index'
        })

    },
    clear: function (e) {

        Auth.logout(this);

    },



    onShareAppMessage: function () {
        var title = "分享我在“" + config.getWebsiteName + "浏览、评论、点赞、鼓励的文章";
        var path = "pages/readlog/readlog";
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
    closeLoginPopup() {
        this.setData({ isLoginPopup: false });
    },
    openLoginPopup() {
        this.setData({ isLoginPopup: true });
    }
})