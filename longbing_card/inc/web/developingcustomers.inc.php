<?php
global $_GPC, $_W;

//jingshuixian 判断授权文件是否存在  存在引入授权文件
define('ROOT_PATH', IA_ROOT . '/addons/longbing_card/');
is_file(ROOT_PATH . '/inc/we7.php')  or exit('Access Denied Longbing');
require_once ROOT_PATH . '/inc/we7.php';

global $_GPC, $_W;

$type = $_GPC['type'];//    1=>今日数据; 2=>近七天数据; 3=>近30天数据; 4=>本月数据; 5=>自定义时间统计

if (!$type)
    $type = 1;

switch ($type) {
    case 2://   2=>近七天数据
        // 七天前开始的的时间戳
        $beginTime = mktime(0, 0, 0, date('m'), date('d') - 7, date('Y'));
        break;
    case 3://   3=>近30天数据
        $beginTime = mktime(0, 0, 0, date('m'), date('d') - 30, date('Y'));
        break;
    case 4://   4=>本月数据
        // 本月开始的的时间戳
        $beginTime = mktime(0, 0, 0, date('m'), 1, date('Y'));
        break;
    case 5://   5=>自定义时间统计
        $beginTime = mktime(0, 0, 0, date('m'), date('d'), date('Y'));

        if (isset($_GPC['sDate'])) {
            $sDate = $_GPC['sDate'];
            $beginTime = strtotime($sDate . ' 00:00:00');
        }
        if (isset($_GPC['eDate'])) {
            $eDate = $_GPC['eDate'];
            $endTime = strtotime($eDate . ' 23:59:59');
            if ($endTime < $beginTime) {
                unset($endTime);
            }
        }

        break;
    default://  1=>今日数据
        // 今天开始的的时间戳
        $beginTime = mktime(0, 0, 0, date('m'), date('d'), date('Y'));
}

$sql = "SELECT id,nickName FROM " . tablename('longbing_card_user') ." WHERE is_staff = 1 && uniacid = {$_W['uniacid']}";
$users = pdo_fetchall($sql);
if (isset($endTime) && isset($beginTime)) {
    foreach ($users as $k => $v) {
        $sql = "SELECT id FROM " . tablename('longbing_card_collection') ." WHERE to_uid = {$v['id']} && update_time BETWEEN {$beginTime} AND {$endTime} && uniacid = {$_W['uniacid']}";
        $collections = pdo_fetchall($sql);
        $users[$k]['count'] = count($collections);
        $info = pdo_get('longbing_card_user_info', ['fans_id' => $v['id']]);
        $users[$k]['name'] = $info['name'];
        $users[$k]['name'] = $users[$k]['name'] ? $users[$k]['name'] : $users[$k]['nickName'];
    }
} else if (isset($endTime) && !isset($beginTime)) {
    foreach ($users as $k => $v) {
        $sql = "SELECT id FROM " . tablename('longbing_card_collection') ." WHERE to_uid = {$v['id']} && update_time < {$endTime} && uniacid = {$_W['uniacid']}";
        $collections = pdo_fetchall($sql);
        $users[$k]['count'] = count($collections);
        $info = pdo_get('longbing_card_user_info', ['fans_id' => $v['id']]);
        $users[$k]['name'] = $info['name'];
        $users[$k]['name'] = $users[$k]['name'] ? $users[$k]['name'] : $users[$k]['nickName'];
    }
}
else {
    foreach ($users as $k => $v) {
        $sql = "SELECT id FROM " . tablename('longbing_card_collection') ." WHERE to_uid = {$v['id']} && update_time > {$beginTime} && uniacid = {$_W['uniacid']}";
        $collections = pdo_fetchall($sql);
        $users[$k]['count'] = count($collections);
        $info = pdo_get('longbing_card_user_info', ['fans_id' => $v['id']]);
        $users[$k]['name'] = $info['name'];
        $users[$k]['name'] = $users[$k]['name'] ? $users[$k]['name'] : $users[$k]['nickName'];
    }
}

message($users, '', 'success');