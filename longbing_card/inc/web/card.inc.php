<?php
return false;
global $_GPC, $_W;

//jingshuixian 判断授权文件是否存在  存在引入授权文件
define('ROOT_PATH', IA_ROOT . '/addons/longbing_card/');
is_file(ROOT_PATH . '/inc/we7.php')  or exit('Access Denied Longbing');
require_once ROOT_PATH . '/inc/we7.php';


//  设为推荐员工
if ($_GPC['action'] == 'addDefault') {

    //jingshuixian 判断用户是不是员工
    $info = pdo_get('longbing_card_user_info', ['id' => $_GPC['id'] ]);
    if (!$info)
    {
        message('未找到名片信息', '', 'error');
    }
    $user = pdo_get('longbing_card_user', ['id' => $info['fans_id'] ]);
    if (!$user)
    {
        message('未找到用户信息', '', 'error');
    }
    $user = pdo_get('longbing_card_user', ['id' => $info['fans_id'] , 'is_staff'=> 1 ]);
    if (!$user)
    {
        message('请到用户管理里把该用户设置为员工', '', 'error');
    }
    //jingshuixian 判断用户是不是员工 //end

    $result = pdo_update('longbing_card_user_info', ['is_default' => 1, 'update_time' => time()], ['id' => $_GPC['id']]);

    if ($result) {
        message('设置成功', $this->createWebUrl('card'), 'success');
    }
    message('设置失败', '', 'error');
}
//  取消推荐员工
if ($_GPC['action'] == 'delDefault') {
    $result = pdo_update('longbing_card_user_info', ['is_default' => 0, 'update_time' => time()], ['id' => $_GPC['id']]);

    if ($result) {
        message('设置成功', $this->createWebUrl('card'), 'success');
    }
    message('设置失败', '', 'error');
}

$limit = array(1, 10);
$where = [
    'uniacid' => $_W['uniacid'],
    'status >' => -1
];
$curr = 1;
if (isset($_GPC['page'])) {
    $limit[0] = $_GPC['page'];
    $curr = $_GPC['page'];
}

if (isset($_GPC['keyword'])) {
    $keyword = $_GPC['keyword'];
    $where['name like'] = '%' . $_GPC['keyword'] . '%';
}

$info = pdo_getslice('longbing_card_user_info', $where, $limit, $count, [], '', 'is_default desc, top desc,id desc');
foreach ($info as $k => $v) {
    $info[$k]['trueAvatar'] = tomedia($v['avatar']);
}
$jobs = pdo_getall('longbing_card_job', ['status >' => -1]);
$jobList = [];
foreach ($jobs as $k => $v) {
    $jobList[$v['id']] = $v['name'];
}
$perPage = $this->limit;

load()->func('tpl');
include $this->template('card');