<?php
global $_GPC, $_W;

//jingshuixian 判断授权文件是否存在  存在引入授权文件
define('ROOT_PATH', IA_ROOT . '/addons/longbing_card/');
is_file(ROOT_PATH . '/inc/we7.php')  or exit('Access Denied Longbing');
require_once ROOT_PATH . '/inc/we7.php';

//  编辑公司信息
if ($_GPC['action'] == 'editCompany') {
    $time = time();
    foreach ($_GPC['formData'] as $k => $v) {
        if (strpos($k, "ulture"))
            $data['culture'][] = $v;
        else
            $data[$k] = $v;
    }
    if (isset($data['culture']))
        $data['culture'] = implode(',', $data['culture']);
    else
        $data['culture'] = '';
    $data['culture'] = trim($data['culture'], ',');
    $data['update_time'] = $time;
    $id = $_GPC['id'];
    $result = false;
    if ($id) {
        $result = pdo_update('longbing_card_company', $data, ['id' => $id]);
    } else {
        $data['create_time'] = $time;
        $data['uniacid'] = $_W['uniacid'];
        $result = pdo_insert('longbing_card_company', $data);
    }

    if ($result) {
        message('编辑成功', $this->createWebUrl('group'), 'success');
    }
    message('编辑失败', '', 'error');
}

$where = [
    'uniacid' => $_W['uniacid'],
];
$id = $_GPC['id'];
if ($id)
{
    $where['id'] = $id;
    $company = pdo_get('longbing_card_company', $where);
    if (!$company || empty($company))
    {
        $id = 0;
    }
}
$perPage = $this->limit;
$company['culture'] = explode(',', $company['culture']);

load()->func('tpl');
include $this->template('company');