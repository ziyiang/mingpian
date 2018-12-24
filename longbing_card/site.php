<?php
defined('IN_IA') or exit('Access Denied');

class Longbing_cardModuleSite extends WeModuleSite
{
    public $limit = 10;

//    public function __call($name, $arguments) {
//
//        global $_GPC, $_W;
//
//        $this->pp($_GPC);
//
//        $_GET["s"] = $_GPC['state'];
//
//        // 定义应用目录
//        define('APP_PATH', ADDON_PATH . '/core/application/');
//        define('APP_STATIC_PATH', '/addons/'. APP_NAME .'/core/public/static/');
//        // 绑定模块
//        //define('BIND_MODULE','admin');
//
//        require ADDON_PATH . '/core/thinkphp/start.php';
//
//    }

    public function doMobileWelcome ()
    {
        echo 123;
    }
}