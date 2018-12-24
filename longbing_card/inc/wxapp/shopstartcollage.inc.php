<?php
/**
 * 开启拼团
 * @access public
 * @param string $user_id 用户id
 * @param int $collage_id 拼团id
 * @param int $goods_id 商品id
 * @param int $number 购买数量
 * @return json
 */

define('ROOT_PATH', IA_ROOT . '/addons/longbing_card/');
is_file(ROOT_PATH . '/inc/we7.php')  or exit('Access Denied Longbing');
require_once ROOT_PATH . '/inc/we7.php';

global $_GPC, $_W;
$uniacid = $_W['uniacid'];
$uid = $_GPC['user_id'];
$collage_id = $_GPC['collage_id'];
$goods_id = $_GPC['goods_id'];
$address_id = $_GPC['address_id'];
$number = $_GPC['number'];
$to_uid = $_GPC['to_uid'];
$number = intval($number);

if (!$address_id || !$number)
{
    return $this->result(-1, '请求参数错误', []);
}

$goods = pdo_get('longbing_card_goods', ['id' => $goods_id], ['id', 'name', 'cover', 'price', 'freight']);

if (empty($goods))
{
    return $this->result(-1, '未找到商品', []);
}

$address = pdo_get('longbing_card_shop_address', ['id' => $address_id, 'user_id' => $uid]);
if (empty($address)) {
    return $this->result(-1, '未找到收货地址', []);
}

$collage = pdo_get('longbing_card_shop_collage', ['goods_id' => $goods_id, 'id' => $collage_id]);

if (empty($collage))
{
    return $this->result(-1, '未找到拼团条件', []);
}

if ($number < $collage['number'])
{
    return $this->result(-1, '购买商品数量未达到拼团条件: ' . $number, []);
}

$time = time();
$insertCollageListData = array(
    'user_id' => $uid,
    'goods_id' => $goods_id,
    'collage_id' => $collage_id,
    'name' => $goods['name'],
    'cover' => $goods['cover'],
    'number' => $collage['people'],
    'left_number' => $collage['people'] - 1,
    'price' => $collage['price'],
    'uniacid' => $uniacid,
    'create_time' => $time,
    'update_time' => $time,
);
$resultCollageList = pdo_insert('longbing_card_shop_collage_list', $insertCollageListData);

if (!$resultCollageList)
{
    return $this->result(-1, '拼团失败', []);
}
$collage_list_id = pdo_insertid();

$price = sprintf('%.2f', $number * $collage['price']);
$insertOrder = array(
    'user_id' => $uid,
    'address_id' => $address_id,
    'freight' => $goods['freight'],
    'price' => $price,
    'total_price' => sprintf('%.2f', $goods['freight'] + $price),
    'uniacid' => $uniacid,
    'name' => $address['name'],
    'sex' => $address['sex'],
    'phone' => $address['phone'],
    'address' => $address['address'],
    'address_detail' => $address['address_detail'],
    'province' => $address['province'],
    'city' => $address['city'],
    'area' => $address['area'],
    'type' => 1,
    'collage_id' => $collage_list_id,
    'to_uid' => $to_uid,
    'create_time' => $time,
    'update_time' => $time,
);
$result = pdo_insert('longbing_card_shop_order', $insertOrder);


if (!$result)
{
    pdo_delete('longbing_card_shop_collage_list', ['id' => $collage_list_id]);
    return $this->result(-1, '拼团失败', []);
}
$order_id = pdo_insertid();




$spe_price = pdo_get('longbing_card_shop_spe_price', ['id' => $collage['spe_price_id'], 'uniacid' => $uniacid]);

if (empty($spe_price)) {
    return $this->result(-1, '未找到规格组合', []);
}

$spe_id_1 = $spe_price['spe_id_1'];

$arr = explode('-', $spe_id_1);

$str = implode(',', $arr);

if (strpos($str, ','))
{
    $str = '(' . $str . ')';
    $sql = "SELECT * FROM " . tablename('longbing_card_shop_spe') . " WHERE id IN $str";
}
else
{
    $sql = "SELECT * FROM " . tablename('longbing_card_shop_spe') . " WHERE id = $str";
}
$speList = pdo_fetchall($sql);
$titles = '';
foreach ($speList as $k2 => $v2)
{
    $titles .= '-' . $v2['title'];
}
$titles = trim($titles, '-');




$insertItem = array(
    'order_id' => $order_id,
    'goods_id' => $goods_id,
    'name' => $goods['name'],
    'cover' => $goods['cover'],
    'spe_price_id' => $collage['spe_price_id'],
    'content' => $titles,
    'number' => $number,
    'price' => $price,
    'uniacid' => $uniacid,
    'create_time' => $time,
    'update_time' => $time,
);
$result = pdo_insert('longbing_card_shop_order_item', $insertItem);


if (!$result)
{
    pdo_delete('longbing_card_shop_collage_list', ['id' => $collage_list_id]);
    pdo_delete('longbing_card_shop_order', ['id' => $order_id]);
    return $this->result(-1, '拼团失败', []);
}

pdo_insert("longbing_card_shop_user_collage", [
    'user_id' => $uid,
    'collage_id' => $collage_list_id,
    'uniacid' => $uniacid,
    'create_time' => $time,
    'update_time' => $time,
]);

return $this->result(0, '拼团成功', ['order_id' => $order_id]);