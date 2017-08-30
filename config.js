/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la

var host = "piaogood.com/1.0"

var config = {

    // 下面的地址配合云端 Server 工作
    host,

    //  轮播图
    scrollImageUrl: `https://${host}/promotion`,
    //   导游列表
    guideUrl: `https://${host}/guide`,
    //   导游评论
    guideCommentsUrl: `https://${host}/guide/`,
    //  获取某个用户信息
    getUserByUserID: `https://${host}/user/1`,
    //  获取某个用户充值
    postTopUp: `https://${host}/user/1/wallet/deposit`,
    //  获取某个用户体现
    postWithdrawal: `https://${host}/user/1/wallet/withdrawal`,
    //  获取某个用户订单
    getUserOrderByUserID: `https://${host}/user/1/user_order`,
    //  获取某个用户订单的具体详情
    getUserOrderDetailsByUserID: `https://${host}/user/1/user_order/1`,
    //  获取某个乐友订单
    getLYOrderByUserID: `https://${host}/user/1/guide_order`,
    //  获取某个乐友订单的具体详情
    getLYOrderDetailsByUserID: `https://${host}/user/1/guide_order/1`,
    //  更新接单设置
    postLYOrderSetting: `https://${host}/guide/1`,
    //  获取七牛云的token
    getQNToken: `https://${host}/qiniu/upload_token`,
    //  申请成为乐友
    postApplyGuide: `https://${host}/apply_guide`,


};
module.exports = config

