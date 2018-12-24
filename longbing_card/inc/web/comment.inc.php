<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/8/10 0010
 * Time: 下午 13:31
 */
global $_GPC, $_W;
//jingshuixian 判断授权文件是否存在  存在引入授权文件
define('ROOT_PATH', IA_ROOT . '/addons/longbing_card/');
is_file(ROOT_PATH . '/inc/we7.php')  or exit('Access Denied Longbing');
require_once ROOT_PATH . '/inc/we7.php';


$limit = array(1, $this->limit);
$where = [
    'uniacid' => $_W['uniacid'],
];

$curr = 1;
if (isset($_GPC['page'])) {
    $limit[0] = $_GPC['page'];
    $curr = $_GPC['page'];
}

$where['status >'] = -1;

//  删除
if ($_GPC['action'] == 'delete') {
    $id = $_GPC['id'];
    $info = pdo_get('longbing_card_timeline_comment', ['id' => $_GPC['id']]);
    if (!$info || empty($info))
        message('未找到数据', '', 'error');

    $result = pdo_update('longbing_card_timeline_comment', ['status' => -1, 'update_time' => time()], ['id' => $_GPC['id']]);

    if ($result) {
        message('删除成功', $this->createWebUrl('comment'), 'success');
    }
    message('删除失败', '', 'error');
}

$keyword = '';
if (isset($_GPC['keyword'])) {
    $where['content like'] = '%' . $_GPC['keyword'] . '%';
    $keyword = $_GPC['keyword'];
}

$comments = pdo_getslice('longbing_card_timeline_comment', $where, $limit , $count, [], '', 'id desc');

foreach ($comments as $k => $v) {
    $timeline = pdo_get('longbing_card_timeline', ['id' => $v['timeline_id']]);
    $comments[$k]['title'] = '';
    if ($timeline)
        $comments[$k]['title'] = $timeline['title'];
}

$perPage = $this->limit;


load()->func('tpl');
include $this->template('company/comment');