/* 注册登录 start */

	// 获取 登录验证码
	export const getLoginCaptCha = '/api/user/getLoginCaptcha';
	// 通过验证码登录
	export const userCaptChaLogin = '/api/user/userCaptchaLogin';
	// 账号密码登录
	export const userLogin = '/api/user/userLogin';
	// 获取 注册验证码
	export const getRegisterCaptcha = '/api/user/getRegisterCaptcha';
	// 提交 注册
	export const userRegister = '/api/user/userRegister';
	// 获取 忘记密码 验证码
	export const getForgetPasswordCaptcha = '/api/user/getFindPasswordCaptcha';
	// 提交 忘记密码
	export const submitForgetPassword = '/api/user/findPassword';

	/* 注册登录 end */


	/* 发现 start */

	// 学定制 banner
	export const getFindArticleBanner = '/api/bbsArticle/listTopCovers';
	// 获取 学定制 栏目标题
	export const getFindColumnsTitle = '/api/bbsSection/listPageBbsSection';
	// 根据栏目标题获取文章列表
	export const getFindArticleListByTitle = '/api/bbsArticle/listBbsArticleBySectionId';
	// 获取 发现页看案例维度名称
	export const getDimensionListByLookCase = '/api/bbsReferralDimension/listPageBbsReferralDimension';
	// 获取 案例列表
	export const getFindCaseList = '/api/BbsViewCase/listViewCase';
	// 判断案例是否已被当前用户点赞
	export const getCaseLikeStatus = '/api/bbsThumbCase/isBbsCaseThumb';
	// 判断案例是否已被当前用户收藏
	export const checkCollection = '/api/collection/case/checkCollection';
	// 案例收藏操作
	export const onCaseCollection = '/api/collection/case/collection';
	// 案例点赞操作
	export const onLike = '/api/bbsThumbCase/saveOrUpdateBbsThumbCase';
	// 根据栏目 id 获取文章列表
	export const getArticleListByColumn = '/api/bbsArticle/listBbsArticleBySectionId';
	// 获取 空间 标签
	export const getSpaceLabels = '/api/dimension/listSpace';
	// 获取 文章详情
	export const getArticleDetail = '/api/bbsArticle/getBbsArticleInfo';
	// 检查文章收藏
	export const checkArticleCollectionStatus = '/api/collection/article/checkCollection';
	// 文章收藏
	export const onArticleCollection = '/api/collection/article/collection';
	// 获取 案例详情
	export const getCaseDetail = '/api/merchantCase/getMerchantCaseInfo';


	/* 发现 end */

	/* 店铺 start */

	// 店铺主页 - 店铺信息
	export const getMerchantInfo = '/api/merchant/getMerchantInfo';
	// 店铺主页 - 分类数量统计
	export const listMerchantNearbyGroupsBrand = '/api/merchant/listMerchantNearbyGroupsBrand';
	// 店铺主页 - tab 数据统计
	export const getTabDataTotal = '/api/merchant/getMerchantCenterHomeTotal';
	// 店铺主页 - 获取店铺背景图
	export const getStoreBg = '/api/merchantTopCover/listPageMerchantTopCover';
	// 店铺主页 - 获取产品的空间列表
	export const getSpaceListByStore = '/api/merchantGoods/listGroupsBySpace';
	// 店铺主页 - 根据空间 获取产品列表
	export const getProductListBySpace = '/api/merchantGoods/listMerchantGoodsBySpace';
	// 店铺主页 - 获取设计师列表
	export const getDesignerListByStore = '/api/merchantStaff/listMerchantDesigners';
	// 店铺主页 - 获取案例列表
	export const getCaseListByStore = '/api/merchantCase/listMerchantCase4Consumer';
	// 店铺主页 - 获取广告 banner 数据
	export const getBannerAdData = '/api/merchantBanner/listMerchantBanner4Consumer';
	// 店铺主页 - 获取店铺关注状态
	export const getFollowStatusByStore = '/api/follow/merchant/checkFollow';
	// 店铺主页 - 店铺关注
	export const followStatusByStore = '/api/follow/merchant/follow';
	// 店铺主页 - 获取咨询人员
	export const getTalker = '/api/merchantStaff/getMerchantConsultant';
	// 店铺认领 - 提交认领
	export const submitClaimStore = '/api/merchantApply/saveMerchantApply';


	// 产品详情 - 根据店铺id获取当前店铺产品中心的产品总数和产品所在的店铺信息
	export const countMerchantGoodsInfo = '/api/merchantGoods/countMerchantGoodsInfo';
	// 产品详情 - 获取详情数据
	export const getProductDetailData = '/api/merchantGoods/getMerchantGoodsInfo';
	// 产品详情 - 获取店铺基础信息 和 产品数量
	export const getStoreInfoAndQtyByProductDetail = '/api/merchantGoods/countMerchantGoodsInfo';
	// 检查产品收藏状态
	export const checkProductCollectionStatus = '/api/collection/goods/checkCollection';
	// 添加/取消 收藏产品
	export const onProductCollection = '/api/collection/goods/collection';
	// 提交预约量尺
	export const submitGauge = '/api/merchantMsgMeasure/saveMerchantMsgMeasure';


	// 获取 设计师信息
	export const getDesignerInfo = '/api/merchantStaff/getMerchantDesignerInfo';
	// 获取 设计师被关注状态
	export const getDesignerFollowStatus = '/api/follow/designer/checkFollow';
	// 获取 设计师案例列表
	export const getDesignerCase = '/api/merchantCase/listMerchantCaseByMerchantStaffId';
	// 添加设计师关注
	export const followForDesigner = '/api/follow/designer/follow';

  /* 店铺 end */

  /* 消息通知 start */
  // 获取最新一条订单消息
  export const getLatestOrderNotice = '/api/messageOrder/getLast4Consumer';
  // 获取订单消息列表
  export const getLatestOrderNoticeList = '/api/messageOrder/list4Consumer';
  // 更新一条订单消息未读状态
  export const updateOrderNoticeUnRead = '/api/messageOrder/updateReadStatus';
  // 获取最新一条系统消息
  export const getLatestSystemNotice = '/api/messageSys/getLast4Consumer';
  // 获取系统消息列表
  export const getLatestSystemNoticeList = '/api/messageSys/list4Consumer';
  // 更新所有系统消息的状态为已读
  export const updateSystemNoticeUnRead = '/api/messageSys/updateReadStatus';

  /* 消息通知 end */

	//主页-附近的店
	export const indexGetNearShop ='/api/merchant/nearby/list';
	//主页-推荐标签展示
	export const indexGetRecommendTips ='/api/homeReferralDimension/listHomeReferralDimension';
	//主页-推荐查询展示
	export const indexGetRecommendSelectTip ='/api/homeReferralDimension/listHomeReferralGoods';
	//主页-轮播图展示
	export const indexGetBannerList ='/api/activityBanner/home/listActivityBanner';
	//主页分类及筛选数据
	export const indexFilterData ='/api/dimension/listSpace';
	//主页侧滑选择风格数据展示
	export const indexGetStyleList ='/api/style/listPageStyle';
	//主页-筛选选择-根据actionId
	export const indexSiftGoodsByActionId ='/api/merchantGoods/listHomeSiftGoods';

	//订单列表
	export const listByUid ='/api/order/listByUid';
	//订单详情
	export const getOrderInfo ='/api/order/getOrderInfo';
	//订单详情-跟进人列表
	export const listOrderKeeper ='/api/orderKeeper/listOrderKeeper';
	//交易记录列表
	export const listTransactionRecord ='/api/wallet/listTransactionRecord';
	//交易记录详情（线上）
	export const getTransactionRecord ='/api/wallet/getTransactionRecord';
	//交易记录详情（线下）
	export const listOrderOperate ='/api/orderOperate/listOrderOperate';
	//搜索银行列表
	export const listSearchByBankName ='/api/wallet/listSearchByBankName';
	//支付模块-搜索银行列表
	export const payByBankName ='/api/pay/listSearchByBankName';
	//获取默认支付信息
	export const getDefaultCard ='/api/pay/getDefaultCard';
	//绑定银行卡
	export const bindingCard ='/api/pay/bindingCard';
	//解绑银行卡
	export const unBindingCard ='/api/pay/unBindingCard';
	//获取是否设置了验证码的标志
	export const getBankInfo ='/api/wallet/getBankInfo';
	//钱包支付
	export const walletPayment ='/api/wallet/payment';
	//银联卡支付
	export const bankPayment ='/api/pay/payment';
	//检测银行卡号，注意：bankName;bankCode为空;需用调用另外一个接口（listBankCard）获取列表，用户手动去选择
	export const checkBankCardNo ='/api/pay/checkBankCardNo';
	//检测银行卡号，当bankName;bankCode为空;则调用此接口选择银行卡
	export const listBankCard ='/api/pay/listBankCard';
	//绑定銀行卡短信获取验证码
	export const obtainPaymentBindingVerificationCode ='/api/pay/obtainPaymentBindingVerificationCode';
	//获取自己绑定的银卡列表
	export const listMyCpcnBankCard ='/api/pay/listMyCpcnBankCard';
	//订单确认安装完成
	export const finishOrder ='/api/pay/finishOrder';
	//钱包-验证旧的密码是否正确
	export const verificationPayPassword ='/api/wallet/verificationPayPassword';
	//钱包-修改支付密码
	export const updatePayPassword ='/api/wallet/updatePayPassword';
	//钱包-找回密码步骤一
	export const retrievePayPasswordStepOne ='/api/wallet/retrievePayPasswordStepOne';
	//钱包-找回密码步骤二
	export const retrievePayPasswordStepTwo ='/api/wallet/retrievePayPasswordStepTwo';
	//进入激活钱包-华夏银行协议、阿拉私家协议
	export const sysList ='/api/sys/list';

	//激活钱包 第一步 输入前六位银行卡号获取银行卡信息
	export const verificationBankCode ='/api/wallet/verificationBankCode';
	//激活钱包 第二步 搜索关键字获取支行
	export const searchSubBank ='/api/wallet/searchSubBank';
	//激活钱包 第三步 聚合接口校验银行卡信息，保存银行卡信息(未开通)
	export const saveBankInfo ='/api/wallet/saveBankInfo';
	//激活钱包 第四步 激活钱包前获取验证码 （bizCode  1、激活银行卡：msg-011； 2、 找回支付密码：msg-012 ）
	export const sendCaptcha ='/api/sms/sendCaptcha';
	//激活钱包 第四步 通过绑定手机激活银行卡 开通华夏银行卡
	export const activeBankCard ='/api/wallet/activeBankCard';
	//激活钱包 - 第五步 =设置支付密码
	export const setPayPassword ='/api/wallet/setPayPassword';
	//获取支付验证码
	export const obtainPaymentVerificationCode ='/api/pay/obtainPaymentVerificationCode';

	//主页-产品搜索列表
	export const searchGetProductList ='/api/merchantGoods/homeSearchGoods';
	//主页-店铺搜索列表
	export const searchGetStoreList ='/api/merchant/homeSearchMerchant';
	//主页-文章搜索列表
	export const searchGetArticleList ='/api/bbsArticle/homeSearchArticle';
	//主页-案例搜索列表
	export const searchGetCaseList ='/api/merchantCase/homeSearchCase';


	//附近的店铺-列表
	export const getNearStoreList ='/api/merchant/nearby/list';
	//附近的店-根据店铺id搜索产品列表
	export const getPorductListByStoreId ='/api/merchantGoods/listMerchantGoods';
	//附近的店--城市分组列表
	export const getCityGroupList ='/api/merchant/getMerchantAreaGroupsByCity';
	//附近的店--品牌列表
	export const getCityBrandList ='/api/merchant/listMerchantNearbyGroupsBrand';
	//附近的店--按照城市code查询列表
	export const getStoreListByCityCode ='/api/merchant/nearby/listByArea';
	//附近的店--地图模式
	export const getNearStoreMap ='/api/merchant/nearby/listByWebmap';

	//我的-显示用户详情信息
	export const getUserInfoMsg ='/api/user/getUserInfo';
	//我的-显示用户关注、收藏等数量
	export const getUserBehavior ='/api/user/countBehaviorData';
	//我的-用户退出登录
	export const userOutLogin ='/api/user/userLoginOut';
	//我的-获取用户红包信息
	export const getUserPacketMsg ='/api/packetAccount/getPacketAccountInfo';
	//我的-红包提现接口
	export const userPacketAmountOut ='/api/packetAmountOutHistory/savePacketAmountOutHistory';
	//我的-红包用户提现记录
	export const listPacketAmountOutHistory ='/api/packetAmountOutHistory/listPacketAmountOutHistory';
	//我的-红包提现详情
	export const getPacketHistoryInfo ='/api/packetAmountOutHistory/getPacketAmountOutHistoryInfo';
	//我的-红包明细列表
	export const listPacketAmountHistory ='/api/packetAmountHistory/listPacketAmountHistory';
	//我的-用户收藏案例列表
	export const getCaseCollectList ='/api/collection/case/listCollection';
	//我的-用户收藏产品列表
	export const getProductCollectList ='/api/collection/goods/listCollection';
	//我的-用户收藏文章列表
	export const getArticleCollectList ='/api/collection/article/listCollection';
	//我的-关注设计师列表
	export const getDesignerConcernList ='/api/follow/designer/listFollow';
	//我的-关注店铺列表
	export const getStoreConcernList ='/api/follow/merchant/listFollow';
	//我的-获取个人资料详情
	export const getUserDetailMsg ='/api/user/getUserInfo';
	//我的-个人资料-判断用户有无设置密码
	export const getUserIsSetPassword ='/api/user/checkPasswordExist';
	//我的-个人资料-修改用户密码
	export const updateUserPassword ='/api/user/updatePassword';
	//我的-个人资料-修改用户详情
	export const updateUserMsg ='/api/user/updateUserInfo';
	//我的-个人资料-用户设置密码-获取验证码 (特殊："bizCode" = "msg-006")
	export const getSetPasswordCode ='/api/sms/sendCaptcha';
	//我的-个人资料-用户设置密码（没设置过）
	export const setUserPassword ='/api/user/findPassword';
	//我的-意见反馈-提交
	export const userSetFeedback ='/api/userSuggestion/saveUserSuggestion';

	//消息
	export const getUserByList ='/api/user/getUserByList'
