/*
 * 微慕Plus微信小程序
 * author: jianbo
 * organization: 微慕Plus  www.minapper.com
 * 技术支持微信号：iamxjb
 *Copyright (c) 2019 https://www.minapper.com All rights reserved.
 */


//小程序各项基础配置
//网站域名设置，如果wordpress没有安装在网站根目录请加上目录路径,例如："www.minapper.com/blog"
var DOMAIN = "woaizikao.cn";
var MINAPPTYPE = "0";//小程序的类型，如果是企业小程序请填：0 ，如果是个人小程序请填：1
var WEBSITENAME = "大自考"; //网站名称
//小程序“关于”页面的id,此id是wordpress网站"页面"的id,注意这个是wordpress的"页面",不是"文章"
var ABOUTID = 9;
var PAGECOUNT = '10'; //每页文章数,设置成几,首页每次上拉加载的就是几篇文章
var DETAILSUMMARYHEIGHT = '300px'; // 设置文章详情页内容展示高度（注意单位一定要用px，如 '1000px';），默认值为空 '' 则全文显示

var PAYTEMPPLATEID = '7vnD3IlrrhEClRJktcwkxvJSWhj_nyRbnZGoUQKD0lc';//鼓励消息模版id
var REPLAYTEMPPLATEID = 'LywysjZ6FAJ7TVPCGlHMdaMyrleLXZwfXupqH4B1YJc';//回复评论消息模版id
var ZANIMAGEURL = 'https://woaizikao.cn/zan.jpg';//微信鼓励的图片链接，用于个人小程序的赞赏
var LOGO = "https://woaizikao.cn/logo.jpg"; // 网站的logo图片
//设置downloadFile合法域名,不带https ,在中括号 [] 里增加域名，格式：{id=**,domain:'www.**.com'}，用英文逗号分隔，此处设置的域名和小程序与小程序后台设置的downloadFile合法域名要一致。
var DOWNLOADFILEDOMAIN = [
  { id: 1, domain: 'woaizikao.cn' },
  { id: 2, domain: 'woaizikao.cn' }
];


/*
首页的【精选栏目】导航设置
参数说明：
name 为名称，image 为图标路径，url 为要跳转的页面路径
appid ：当redirecttype为miniapp时，这个值为其他微信小程序的appid，如果redirecttype为apppage和webpage时，这个值设置为空；
extraData ：当redirecttype为miniapp时，这个值为提交到其他微信小程序的参数（也可以不设置），如果redirecttype为apppage和webpage时，这个值设置为空

redirecttype 为跳转的类型：
   ① webpage 为跳转你的业务域名的网页，是通过web-view打开网址，url就是你要打开的网址
   ② miniapp 为跳转其他微信小程序，url 为其他小程序的页面路径
   ③ apppage 为跳转本小程序内的页面，url 为本小程序的页面路径：
      A.如果直接跳转小程序内页面 ../../pages/list/list
      B.如果要跳转到某个分类页 ../../pages/list/list?categoryID=1（这里填你自己的分类id）
*/
var INDEXNAV = [
  
  {
    id: '1',
    name: '最新',
    image: '../../images/src/index_nav1.jpg',
    url: '../../pages/list/list?categoryID=1',
    redirecttype: 'apppage',
    appid: '',
    extraData: ''
  },
  {
    id: '2',
    name: '自考',
    image: '../../images/src/index_nav2.jpg',
    url: '../../pages/list/list?categoryID=5',
    redirecttype: 'apppage',
    appid: '',
    extraData: ''
  },
  {
    id: '3',
    name: '成考',
    image: '../../images/src/index_nav3.jpg',
    url: '../../pages/list/list?categoryID=6',
    redirecttype: 'apppage',
    appid: '',
    extraData: ''
  },
  {
    id: '4',
    name: '其他',
    image: '../../images/src/index_nav4.jpg',
    url: '../../pages/list/list?categoryID=7',
    redirecttype: 'apppage',
    appid: '',
    extraData: ''
  },
];

// 小程序广告banner 的 广告位ID
var BANNERADID = [
    'adunit-0315fcba8d0eda46', 'adunit-47c9506bb07506b2','adunit-c91da6f0c9c0943a'
];
// 小程序广告banner 的显示位置
var BANNERADINDEX = 6;


// 下面这些设置不用动
var CATEGORIESID;
var INDEXLISTTYPE;
export default {
  getDomain: DOMAIN,
  getWebsiteName: WEBSITENAME,
  getAboutId: ABOUTID,
  getPayTemplateId: PAYTEMPPLATEID,
  getPageCount: PAGECOUNT,
  getCategoriesID: CATEGORIESID,
  getIndexNav: INDEXNAV,
  getReplayTemplateId: REPLAYTEMPPLATEID,
  getMinAppType: MINAPPTYPE,
  getZanImageUrl: ZANIMAGEURL,
  getIndexListType: INDEXLISTTYPE,
  getLogo: LOGO,
  getDownloadFileDomain: DOWNLOADFILEDOMAIN,
  detailSummaryHeight: DETAILSUMMARYHEIGHT,
  getBANNERADID:BANNERADID,
  getBANNERADINDEX: BANNERADINDEX,
}