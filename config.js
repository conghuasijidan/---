/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la

var host = "piaogood.com"

var config = {

    // 下面的地址配合云端 Server 工作
    host,

    // 发送验证码
    sendMessageUrl: `https://${host}/send_auth_sms`,

    // 登录
    loginUrl: `https://${host}/auth_sms_code`,

    // 微信绑定
    weixinBandUrl: `https://${host}/weixin/request_session/`,

    // 产品列表
    listProductUrl: `https://${host}/product`,

    // 具体产品
    productDetailsUrl: `https://${host}/product/`,

    // 资产
    totalAssetUrl: `https://${host}/user_asset/total_asset`,

    // 昨日收益
    yestdRevenueUrl: `https://${host}/user_asset/yesterday_revenue`,

    // 下单
    orderPlaceUrl: `https://${host}/order/place/`,

    // 投资
    orderPayUrl: `https://${host}/order/`,

    //获取付款的优惠券列表
    listCouponUrl: `https://${host}/product/`,

    //获取付款的优惠券详细信息
    couponDetailsUrl: `https://${host}/product/`,

    //充值
    topUpUrl: `https://${host}/user_asset/deposit`,


    // ------------------- 凯 ----------------------
    //  轮播图
    scrollImageUrl: `https://${host}/1.0/promotion`,
    //   导游列表
    guideUrl: `https://${host}/1.0/guide`,
    //   导游评论
    guideCommentsUrl: `https://${host}/1.0/guide/{0}/comment`


};
module.exports = config

