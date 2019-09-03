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
var app = getApp();

Page({
  data: {
    text: "Page topic",
    categoriesList: [],
    cateSubList: [],
    activeIndex: 0,
    floatDisplay: "none",
    openid: "",
    userInfo: {},
    copyright: app.globalData.copyright
  },
  onLoad: function (options) {
    this.fetchCategoriesData();
    Auth.checkLogin(this);
    // 设置页面导航栏标题
    wx.setNavigationBarTitle({
      title: '分类',
      success: function (res) {}
    });
  },
  //获取分类列表
  fetchCategoriesData: function () {
    var self = this;
    Auth.setUserInfoData(self);
    self.setData({
      categoriesList: []
    });
    //console.log(Api.getCategories());
    var openid = self.data.openid;
    var args = {};
    args.openid = openid;
    // 显示正在加载动画
    wx.showLoading({
      title: '正在加载',
      mask: true
    });
    var getCategoriesRequest = wxRequest.getRequest(Api.getCategories(args));
    getCategoriesRequest.then(response => {
      if (response.statusCode === 200) {
        self.setData({
          floatDisplay: "block",
          categoriesList: self.data.categoriesList.concat(response.data.map(function (item) {
            if (typeof (item.category_thumbnail_image) == "undefined" || item.category_thumbnail_image == "") {
              item.category_thumbnail_image = "../../images/src/post_default_img.jpg";
            }
            // item.subimg = "subscription.png";
            return item;
          }))
        });
        // console.log(response.data);
        // 判断如果第一个是只有一级分类时，右边要显示出一级分类
        if (response.data[0].children.length == 0) {
          let currentCateSubList = response.data[0];
          self.setData({
            cateSubList: [currentCateSubList]
          })
        } else {
          self.setData({
            cateSubList: response.data[0].children
          })
        };
        // 隐藏正在加载动画
        setTimeout(function () {
          wx.hideLoading();
        }, 900);
      } else {
        console.log(response);
      }

    })
      .then(res => {
        // if (self.data.openid) {                
        //     setTimeout(function () {
        //         self.getSubscription();
        //     }, 500);  
        // }
      })
      .catch(function (response) {
        console.log(response);
      }).finally(function () {
        wx.hideLoading();
      })
  },
  onShareAppMessage: function () {
    return {
      title: '分享“' + config.getWebsiteName + '”的专题栏目.',
      path: 'pages/cate/cate',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  // 左边分类菜单切换
  switchCate(e) {
    let index = e.currentTarget.dataset.index;
    let cateChildren = this.data.categoriesList[index];
    // 判断如果只有一级分类，右侧就直接显示出一级分类信息
    if (cateChildren.children.length === 0) {
      cateChildren = [cateChildren]
    } else {
      cateChildren = this.data.categoriesList[index].children
    };
    this.setData({
      activeIndex: index,
      cateSubList: cateChildren
    })
  },
  getSubscription: function () {
    var self = this;
    wx.showLoading({
      title: '正在加载',
      mask: true
    })
    if (self.data.openid) {
      var url = Api.getSubscription() + '?openid=' + self.data.openid;
      var getSubscriptionRequest = wxRequest.getRequest(url);
      getSubscriptionRequest.then(res => {
        if (res.data.status == '200') {
          var catList = res.data.subscription;
          var categoriesList = self.data.categoriesList;
          var newCategoriesList = [];
          if (catList && categoriesList) {
            for (var i = 0; i < categoriesList.length; i++) {
              var subimg = "subscription.png";
              var subflag = "0";

              for (var j = 0; j < catList.length; j++) {
                if (categoriesList[i].id == catList[j]) {
                  subimg = "subscription-on.png";
                  subflag = "1";
                }
                var category_thumbnail_image = "";
                if (typeof (categoriesList[i].category_thumbnail_image) == "undefined" || categoriesList[i].category_thumbnail_image == "") {
                  category_thumbnail_image = "../../images/src/post_default_img.jpg";
                }
                else {
                  category_thumbnail_image = categoriesList[i].category_thumbnail_image;
                }

              }
              var cat = {
                "category_thumbnail_image": category_thumbnail_image,
                "description": categoriesList[i].description,
                "name": categoriesList[i].name,
                "id": categoriesList[i].id,
                "subimg": subimg,
                "subflag": subflag
              }
              newCategoriesList.push(cat);
            }
            if (newCategoriesList.length > 0) {
              self.setData({
                floatDisplay: "block",
                categoriesList: newCategoriesList
              });
            }
          }

        }
        else {
          console.log(res);
        }
      }).finally(function () {
        setTimeout(function () {
          wx.hideLoading();
        }, 500)
        wx.hideNavigationBarLoading();

      })

    }


  },
  postsub: function (e) {
    // console.log(e);
    var self = this;
    if (!self.data.openid) {
      Auth.checkSession(self, 'isLoginNow');
    }
    else {
      var categoryid = e.currentTarget.dataset.id;
      var openid = self.data.openid;
      var url = Api.postSubscription();
      var subflag = e.currentTarget.dataset.subflag;
      var data = {
        categoryid: categoryid,
        openid: openid
      };

      var postSubscriptionRequest = wxRequest.postRequest(url, data);
      postSubscriptionRequest.then(response => {
        if (response.statusCode === 200) {
          if (response.data.status == '200') {
            setTimeout(function () {
              wx.showToast({
                title: '订阅成功',
                icon: 'success',
                duration: 900,
                success: function () {

                }
              });
            }, 900);
            var subimg = "";
            if (subflag == "0") {
              subflag = "1";
              subimg = "subscription-on.png"
            }
            else {
              subflag = "0";
              subimg = "subscription.png"
            }
            self.reloadData(categoryid, subflag, subimg);

          }
          else if (response.data.status == '201') {
            setTimeout(function () {
              wx.showToast({
                title: '取消订阅成功',
                icon: 'success',
                duration: 900,
                success: function () {
                }
              });
            }, 900);
            var subimg = "";
            if (subflag == "0") {
              subflag = "1";
              subimg = "subscription-on.png"
            }
            else {
              subflag = "0";
              subimg = "subscription.png"
            }
            self.reloadData(categoryid, subflag, subimg);

          }
          else if (response.data.status == '501' || response.data.status == '501') {
            console.log(response);
          }
        }
        else {
          setTimeout(function () {
            wx.showToast({
              title: '操作失败,请稍后重试',
              icon: 'success',
              duration: 900,
              success: function () {

              }
            });
          }, 900);
          console.log(response);
        }

      }).catch(function (response) {
        setTimeout(function () {
          wx.showToast({
            title: '操作失败,请稍后重试',
            icon: 'success',
            duration: 900,
            success: function () {
            }
          });
        }, 900);
        console.log(response);
      })
    }
  },
  reloadData: function (id, subflag, subimg) {
    var self = this;
    var newCategoriesList = [];
    var cateSubList = self.data.cateSubList;
    for (var i = 0; i < cateSubList.length; i++) {
      if (cateSubList[i].id == id) {
        cateSubList[i].subflag = subflag;
        cateSubList[i].subimg = subimg;
      }
      newCategoriesList.push(cateSubList[i]);
    }

    if (newCategoriesList.length > 0) {
      self.setData({
        cateSubList: newCategoriesList
      });

    }
  },

  //跳转至某分类下的文章列表
  redictIndex: function (e) {
    //console.log('查看某类别下的文章');  
    var id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.item;
    var url = '../list/list?categoryID=' + id;
    wx.navigateTo({
      url: url
    });
  },
  userAuthorization: function () {
    var self = this;
    // 判断是否是第一次授权，非第一次授权且授权失败则进行提醒
    wx.getSetting({
      success: function success(res) {
        console.log(res.authSetting);
        var authSetting = res.authSetting;
        if (!('scope.userInfo' in authSetting)) {
          //if (util.isEmptyObject(authSetting)) {
          console.log('第一次授权');
          self.setData({
            isLoginPopup: true
          })

        } else {
          console.log('不是第一次授权', authSetting);
          // 没有授权的提醒
          if (authSetting['scope.userInfo'] === false) {
            wx.showModal({
              title: '用户未授权',
              content: '如需正常使用评论、点赞、赞赏等功能需授权获取用户信息。是否在授权管理中选中“用户信息”?',
              showCancel: true,
              cancelColor: '#296fd0',
              confirmColor: '#296fd0',
              confirmText: '设置权限',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.openSetting({
                    success: function success(res) {
                      console.log('打开设置', res.authSetting);
                      var scopeUserInfo = res.authSetting["scope.userInfo"];
                      if (scopeUserInfo) {
                        self.getUsreInfo(null);
                      }
                    }
                  });
                }
              }
            })
          } else {
            auth.getUsreInfo(null);
          }
        }
      }
    });
  },
  agreeGetUser: function (e) {
    let self = this;
    Auth.checkAgreeGetUser(e, app, self, '0');

    setTimeout(function () {
      self.fetchCategoriesData();
    }, 1000);

  },
  closeLoginPopup() {
    this.setData({
      isLoginPopup: false
    });
  },
  openLoginPopup() {
    this.setData({
      isLoginPopup: true
    });
  },
  getOpenId(data) {
    var url = Api.getOpenidUrl();
    var self = this;
    var postOpenidRequest = wxRequest.postRequest(url, data);
    //获取openid
    postOpenidRequest.then(response => {
      if (response.data.status == '200') {
        //console.log(response.data.openid)
        console.log("openid 获取成功");
        app.globalData.openid = response.data.openid;
        app.globalData.isGetOpenid = true;

      } else {
        console.log(response);
      }
    }).then(res => {
      setTimeout(function () {
        self.getSubscription();
      }, 500);
    })
  },
  confirm: function () {
    this.setData({
      'dialog.hidden': true,
      'dialog.title': '',
      'dialog.content': ''
    })
  }

})