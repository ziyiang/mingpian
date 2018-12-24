<?php
defined('IN_IA') or exit('Access Denied');

class Longbing_cardModule extends WeModule
{
    public $module_name;
    public $mini_name;

    public function __construct()
    {
        global $_GPC, $_W;
        $module_name       = $_W['current_module']['name'];
        $mini_name         = $_W['account']['name'];
        $this->module_name = $module_name;
        $this->mini_name   = $mini_name;

        try {
//            $redis_server = new Redis();
//            $redis_server->connect('127.0.0.1', 6379);
//
//            $this->redis_sup_v3 = true;
//            $this->redis_server_v3 = $redis_server;

        } catch (Exception $e) {
//            $this->redis_sup_v3 = false;
//            $this->redis_server_v3 = false;
//            print $e->getMessage();
//            exit();
        }
    }

    public function welcomeDisplay($menus = array())
    {

        global $_GPC, $_W;

        $module_name = $this->module_name;
        $mini_name   = $this->mini_name;
        $ser         = $_SERVER['HTTP_HOST'];
//        $ser         = $_SERVER['SERVER_NAME'];

        $overview     = $this->createWebUrl('manage/overview');//  概览链接
        $companyList  = $this->createWebUrl('manage/company');//  公司列表
        $companyEdit  = $this->createWebUrl('manage/companyedit');//  添加公司
        $dutiesList   = $this->createWebUrl('manage/duties');//  职务列表
        $usersList    = $this->createWebUrl('manage/users');//  名片管理
        $typeList     = $this->createWebUrl('manage/type');//  商品分类
        $goodsList    = $this->createWebUrl('manage/goods');//  商品分类
        $addGoods     = $this->createWebUrl('manage/goodsEdit');//  添加商品
        $orderList    = $this->createWebUrl('manage/orders');//  订单id
        $timelineList = $this->createWebUrl('manage/timeline');//  动态列表
        $timelineEdit = $this->createWebUrl('manage/timelineedit');//  新增/编辑动态
        $commentList  = $this->createWebUrl('manage/comment');//  评论管理
        $modularList  = $this->createWebUrl('manage/modular');//  官网管理
        $message      = $this->createWebUrl('manage/message');//  万能通知
        $config       = $this->createWebUrl('manage/config');//  万能通知
        $userCollage  = $this->createWebUrl('manage/usercollage');//  拼团记录
        $tabBar       = $this->createWebUrl('manage/tabBar');//  拼团记录
        $replyType    = $this->createWebUrl('manage/replytype');//  话术分类
        $reply        = $this->createWebUrl('manage/reply');//  话术列表
        $clientList   = $this->createWebUrl('manage/client');//  客户列表
        $posterType   = $this->createWebUrl('manage/postertype');//  海报分类
        $poster       = $this->createWebUrl('manage/poster');//  海报列表
        $bossexplain  = $this->createWebUrl('manage/bossexplain');//  员工雷达
        $staffexplain = $this->createWebUrl('manage/staffexplain');//  BOSS雷达
        $couponList   = $this->createWebUrl('manage/coupon');//  福包/优惠券列表

        $res       = false;
        $auth      = 0;

        $domainMd5 = md5($_SERVER['HTTP_HOST']);

//        $domainMd5 = md5($_SERVER['SERVER_NAME']);
        if (is_file(IA_ROOT . '/data/tpl/web/' . $domainMd5 . 'tplAuth.txt')) {
            $fileInfo = file_get_contents(IA_ROOT . '/data/tpl/web/' . $domainMd5 . 'tplAuth.txt');
            if (!$fileInfo) {
                $res = $this->checkExists($_W, $domainMd5);
            } else {
                $fileInfo = date('Y-m-d', $fileInfo);
                if ($fileInfo != date('Y-m-d')) {
                    $res = $this->checkExists($_W, $domainMd5);
                }
            }
        } else {
            $res = $this->checkExists($_W, $domainMd5);
        }

        if ($res) {
            $overview     = 'javascript:;';
            $companyList  = 'javascript:;';
            $companyEdit  = 'javascript:;';
            $dutiesList   = 'javascript:;';
            $usersList    = 'javascript:;';
            $typeList     = 'javascript:;';
            $goodsList    = 'javascript:;';
            $addGoods     = 'javascript:;';
            $orderList    = 'javascript:;';
            $timelineList = 'javascript:;';
            $timelineEdit = 'javascript:;';
            $commentList  = 'javascript:;';
            $modularList  = 'javascript:;';
            $message      = 'javascript:;';
            $config       = 'javascript:;';
            $userCollage  = 'javascript:;';
            $tabBar       = 'javascript:;';
            $replyType    = 'javascript:;';
            $reply        = 'javascript:;';
            $clientList   = 'javascript:;';
            $posterType   = 'javascript:;';
            $poster       = 'javascript:;';
            $auth         = 1;
        }


        load()->func('tpl');
        include $this->template('manage/index');

//        load()->func('tpl');
//        include $this->template('welcome');
    }


    protected function checkExists($_W, $domainMd5)
    {
        file_put_contents(IA_ROOT . '/data/tpl/web/' . $domainMd5 . 'tplAuth.txt', time());
        $checkExists = pdo_tableexists('longbing_cardauth2_config');
        if ($checkExists) {
            $auth_info = pdo_get('longbing_cardauth2_config', ['modular_id' => $_W['uniacid']]);

            $time = time();
            if ($auth_info) {
                if ($auth_info['end_time'] < $time) {
                    return true;
                }
            }
        }

        return false;
    }


    public function pp($data)
    {
        echo '<pre>';
        var_dump($data);
        echo '</pre>';
        die;
    }
}