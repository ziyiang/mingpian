<?php

/**
 * 商城商品搜索接口
 * @access public
 * @param string $user_id 用户id
 * @param string $keyword 搜索关键词
 * @return json
 */

define('ROOT_PATH', IA_ROOT . '/addons/longbing_card/');
is_file(ROOT_PATH . '/inc/we7.php')  or exit('Access Denied Longbing');
require_once ROOT_PATH . '/inc/we7.php';

global $_GPC, $_W;
$uniacid = $_W['uniacid'];
$uid = $_GPC['user_id'];
$keyword = $_GPC['keyword'];

if (!$keyword) {
    return $this->result(0, '请求成功', []);
}

$check = pdo_get('longbing_card_shop_search', ['user_id' => $uid, 'keyword' => $keyword]);

$time = time();

if (empty($check)) {
    $insertData = [
        'user_id' => $uid,
        'keyword' => $keyword,
        'number' => 1,
        'uniacid' => $uniacid,
        'create_time' => $time,
        'update_time' => $time,
    ];
    pdo_insert('longbing_card_shop_search', $insertData);
} else {
    $updateData = [
        'number' => $check['number'] + 1,
        'update_time' => $time,
    ];
    pdo_update('longbing_card_shop_search', $updateData, ['id' => $check['id']]);
}
$keyword = '%' . $keyword . '%';

$list = pdo_getall('longbing_card_goods', ['uniacid' => $uniacid, 'status' => 1, 'name like' => $keyword], ['id', 'name', 'cover', 'top', 'recommend', 'price', 'is_collage'], '', ['recommend desc', 'top desc', 'id desc']);

foreach ($list as $k => $v) {
    $list[$k]['cover_true'] = tomedia($v['cover']);
    $list[$k]['trueCover'] = $list[$k]['cover_true'];
}
return $this->result(0, '请求成功', $list);
