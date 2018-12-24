<?php
defined('IN_IA') or exit('Access Denied');
define('ROOT_PATH', IA_ROOT . '/addons/longbing_card/');
define('ADDON_PATH', IA_ROOT . "/addons/longbing_card/");
define('PP_DEBUG', false);  //是否开启打印调试
define('APP_NAME', 'longbing_card');

is_file(ROOT_PATH . '/inc/we7.php') or exit('Access Denied Longbing');
require_once ROOT_PATH . '/inc/we7.php';
is_file(ROOT_PATH . '/inc/html2wxml/class.ToWXML.php') or exit('Access Denied Longbing ToWXML');
require_once ROOT_PATH . '/inc/html2wxml/class.ToWXML.php';

class Longbing_cardModuleWxapp extends WeModuleWxapp
{
    protected $errno = 0;
    protected $message = '';
    protected $data = [];
    protected $limit = 10;

    protected $redis_sup = false;
    protected $redis_server = false;

    protected $redis_sup_v2 = false;
    protected $redis_server_v2 = false;

    public function __construct()
    {
        global $_GPC, $_W;
        if (isset($_GPC['__input']) && !empty($_GPC['__input'])) {
            foreach ($_GPC['__input'] as $k => $v) {
                $_GPC[$k] = $v;
            }
        }

        $domainMd5 = md5($_SERVER['HTTP_HOST']);

//        if (!is_file(IA_ROOT . '/data/tpl/web/' . $domainMd5 . 'tplQr.txt'))
//        {
//            file_put_contents(IA_ROOT . '/data/tpl/web/' . $domainMd5 . 'tplQr.txt', 1);
//            if ( is_dir(ATTACHMENT_ROOT . '/' . "images/longbing_card/{$_W['uniacid']}/") )
//            {
//                $dir = ATTACHMENT_ROOT . '/' . "images/longbing_card/{$_W['uniacid']}/";
//                $dh=opendir($dir);
//                while ($file=readdir($dh)) {
//                    if ($file != "." && $file != "..") {
//                        $fullpath = $dir . "/" . $file;
//                        if (!is_dir($fullpath)) {
//                            unlink($fullpath);
//                        } else {
//                            deldir($fullpath);
//                        }
//                    }
//                }
//            }
//
//        }






        if (!is_dir(IA_ROOT . '/data/tpl'))
        {
            mkdir(IA_ROOT . '/data/tpl');
        }
        if (!is_dir(IA_ROOT . '/data/tpl/web'))
        {
            mkdir(IA_ROOT . '/data/tpl/web');
        }

        if (is_file(IA_ROOT . '/data/tpl/web/' . $domainMd5 . 'tplAuth.txt')) {
            $fileInfo = file_get_contents(IA_ROOT . '/data/tpl/web/' . $domainMd5 . 'tplAuth.txt');
            if (!$fileInfo)
            {
                $this->checkExists($_W, $domainMd5);
            }
            else
            {
                $fileInfo = date('Y-m-d', $fileInfo);
                if ($fileInfo != date('Y-m-d'))
                {
                    $this->checkExists($_W, $domainMd5);
                }
            }
        }
        else
        {
            $this->checkExists($_W, $domainMd5);
        }

        // 指定允许其他域名访问
        header('Access-Control-Allow-Origin:*');
        // 响应类型
        header('Access-Control-Allow-Methods:GET,POST');
        // 响应头设置
        header('Access-Control-Allow-Headers:x-requested-with,content-type');


        try {
//            $redis_server = new Redis();
//            $redis_server->connect('127.0.0.1', 6379);
//
//            $this->redis_sup_v2 = true;
//            $this->redis_server_v2 = $redis_server;
////            $this->redis_sup = false;
//            $this->redis_server = false;

//            $redis_key = 'longbing_card_companylist_' . $_W['uniacid'];
//            $data      = $this->redis_server->get($redis_key);
//            if (!$data)
//            {
//                $company = pdo_getall('longbing_card_company', ['uniacid' => $_W['uniacid'], 'status' => 1]);
//                foreach ($company as $k => $v) {
//                    $company[$k]['logo'] = tomedia($v['logo']);
//                }
//                $this->redis_sup_v2->set($redis_key, json_encode($company));
//                $this->redis_server_v->EXPIRE($redis_key, 30 * 60);
//            }

        } catch (Exception $e) {
//            $this->redis_sup_v2 = false;
//            $this->redis_server_v2 = false;
//            print $e->getMessage();
//            exit();
        }
    }

    protected function checkExists ($_W, $domainMd5)
    {
        @file_put_contents(IA_ROOT . '/data/tpl/web/' . $domainMd5 . 'tplAuth.txt', time());
        $checkExists = pdo_tableexists('longbing_cardauth2_config');
        if ($checkExists)
        {
            $auth_info = pdo_get('longbing_cardauth2_config', ['modular_id' => $_W['uniacid']]);

            $time = time();
            if ($auth_info)
            {
                if ($auth_info['end_time'] < $time)
                {
                    return $this->result(-2, '授权已到期, 请联系管理员', []);
                }
            }
        }
    }

    protected function curlPost($url, $data)
    {
//        if (!empty($data))
//            $data = $this->arr2xml($data);

        //初使化init方法
        $ch = curl_init();

        //指定URL
        curl_setopt($ch, CURLOPT_URL, $url);

        //设定请求后返回结果
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        //声明使用POST方式来进行发送
        curl_setopt($ch, CURLOPT_POST, 1);

        //发送什么数据呢
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);


        //忽略证书
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

        //忽略header头信息
        curl_setopt($ch, CURLOPT_HEADER, 0);

        //设置超时时间
        curl_setopt($ch, CURLOPT_TIMEOUT, 1);

        //发送请求
        $output = curl_exec($ch);

        //关闭curl
        curl_close($ch);

        //返回数据
//        $output = (array)\simplexml_load_string($output, null, LIBXML_NOCDATA | LIBXML_COMPACT);
        return $output;
    }

    /**
     * 登录
     * @access public
     * @param string $code code
     * @return json
     */
    public function doPageLogin()
    {
        global $_GPC, $_W;
        $code = $_GPC['code'];
        $pid = $_GPC['from_id'];
        $uniacid = $_W['uniacid'];
        $openGId = false;
        $this->checkOrderTime();

        if (LONGBING_AUTH_MINI) {
            $sql = "SELECT id, uniacid FROM " . tablename('longbing_card_user') . " GROUP BY uniacid";
            $check_mini1 = pdo_fetchall($sql);
            $check_mini12 = count($check_mini1);
            $sql = "SELECT id, uniacid FROM " . tablename('longbing_card_user_info') . " GROUP BY uniacid";
            $check_mini2 = pdo_fetchall($sql);
            $check_mini22 = count($check_mini2);
            $sql = "SELECT id, uniacid FROM " . tablename('longbing_card_count') . " GROUP BY uniacid";
            $check_mini3 = pdo_fetchall($sql);
            $check_mini32 = count($check_mini3);

            if ($check_mini12 > LONGBING_AUTH_MINI || $check_mini22 > LONGBING_AUTH_MINI || $check_mini32 > LONGBING_AUTH_MINI) {

                foreach ($check_mini1 as $index => $item)
                {
                    if ( ( $index + 1 ) > LONGBING_AUTH_MINI && $uniacid == $item['uniacid'] )
                    {
                        return $this->result(-2, '1微信小程序已达到上线' . $check_mini12 . '-' . $check_mini22 . '-' . $check_mini32, []);
                    }
                }
                foreach ($check_mini2 as $index => $item)
                {
                    if ( ( $index + 1 ) > LONGBING_AUTH_MINI && $uniacid == $item['uniacid'] )
                    {
                        return $this->result(-2, '2微信小程序已达到上线' . $check_mini12 . '-' . $check_mini22 . '-' . $check_mini32, []);
                    }
                }
                foreach ($check_mini3 as $index => $item)
                {
                    if ( ( $index + 1 ) > LONGBING_AUTH_MINI && $uniacid == $item['uniacid'] )
                    {
                        return $this->result(-2, '3微信小程序已达到上线' . $check_mini12 . '-' . $check_mini22 . '-' . $check_mini32, []);
                    }
                }
            }
        }

        $encryptedData = $_GPC['encryptedData'];
        $iv = $_GPC['iv'];

        $this->checkEmpty();

        if (!$code) {
            return $this->result(-1, '请传入code', []);
        }
        if (!$pid) {
            $pid = 0;
        }
        $is_qr = 0;
        if (isset($_GPC['is_qr'])) {
            $is_qr = $_GPC['is_qr'];
        }

        $appid = $_W['account']['key'];
        $appsecret = $_W['account']['secret'];

        $url = "https://api.weixin.qq.com/sns/jscode2session?appid={$appid}&secret={$appsecret}&js_code=$code&grant_type=authorization_code";
        $info = ihttp_get($url);
        $info = json_decode($info['content'], true);

        if (!isset($info['session_key'])) {
            return $this->result(-1, json_decode($info), $info);
        }
        $session_key = $info['session_key'];
        if ($encryptedData) {
            include_once "wxBizDataCrypt.php";
            $pc = new WXBizDataCrypt($appid, $session_key);
            $errCode = $pc->decryptData($encryptedData, $iv, $data);


            if ($errCode == 0) {
                $data = json_decode($data, true);
                $openGId = $data['openGId'];
            }
        }

        $randName = $this->getRandStr(4);
        if (isset($info['openid'])) {
            $openid = $info['openid'];
            $user = pdo_get('longbing_card_user', ['openid' => $openid, 'uniacid' => $uniacid]);
            if (!$user) {
                $data = ['openid' => $openid];
                $data['nickName'] = $randName;
                $data['scene'] = $_GPC['scene'];
                $data['pid'] = $pid;
                $data['uniacid'] = $uniacid;
                $data['is_qr'] = $is_qr;
                $data['create_time'] = time();
                $data['update_time'] = time();
                if ($openGId) {
                    $data['openGId'] = $openGId;
                }
                if (isset($_GPC['is_group']) && $_GPC['is_group']) {
                    $data['is_group'] = $_GPC['is_group'];
                }
                if (isset($_GPC['type']) && $_GPC['type']) {
                    $data['type'] = $_GPC['type'];
                }
                if (isset($_GPC['target_id']) && $_GPC['target_id']) {
                    $data['target_id'] = $_GPC['target_id'];
                }
                $insert = pdo_insert('longbing_card_user', $data);
                if ($insert) {
                    $uid = pdo_insertid();
                    $user = pdo_get('longbing_card_user', ['openid' => $openid, 'uniacid' => $uniacid]);
                    $user['phone'] = '';
                }
            } else {
                $result = pdo_get('longbing_card_user_phone', ['user_id' => $user['id'], 'uniacid' => $uniacid]);
                $uid = $user['id'];
                $user['phone'] = $result ? $result['phone'] : '';
            }
            if (!$uid) {
                return $this->result(-1, ['插入失败'], []);
            }
            return $this->result(0, '请求成功', ['user_id' => $uid, 'user' => $user]);
        } else {
            return $this->result(-2, json_decode($info), $info);
        }
    }

    /**
     * 改变用户信息
     * @access public
     * @param string $user_id 用户id
     * @return json
     */
    public function doPageUpdate()
    {
        $this->cross();
        global $_GPC, $_W;
        $user_id = $_GPC['user_id'];
        $uniacid = $_W['uniacid'];
        $openGId = false;
        $encryptedData = $_GPC['encryptedData'];
        $iv = $_GPC['iv'];

        if (!$user_id) {
            return $this->result(-1, '请传入id', []);
        }

        if ($encryptedData) {
            $code = $_GPC['code'];

            $appid = $_W['account']['key'];
            $appsecret = $_W['account']['secret'];

            $url = "https://api.weixin.qq.com/sns/jscode2session?appid={$appid}&secret={$appsecret}&js_code=$code&grant_type=authorization_code";
            $info = ihttp_get($url);
            $info = json_decode($info['content'], true);

            if (!isset($info['session_key'])) {
                return $this->result(-1, 'session_key', []);
            }

            $session_key = $info['session_key'];
            if (!$code) {
                return $this->result(-1, '请传入code', []);
            }
            include_once "wxBizDataCrypt.php";
            $pc = new WXBizDataCrypt($appid, $session_key);
            $errCode = $pc->decryptData($encryptedData, $iv, $data);


            if ($errCode == 0) {
                $data = json_decode($data, true);
                $openGId = $data['openGId'];
            }
        }

        $user = pdo_get('longbing_card_user', ['id' => $user_id, 'uniacid' => $uniacid]);
        if (!$user) {
            return $this->result(-1, '未找到用户', []);
        }

        $data = [
            'nickName' => $_GPC['nickName'],
            'avatarUrl' => $_GPC['avatarUrl'],
            'update_time' => time()
        ];
        if ($openGId && !$user['openGId']) {
            $data['openGId'] = $openGId;
        }

        pdo_update('longbing_card_user', $data, ['id' => $user_id]);
        return $this->result(0, '请求成功', []);
    }

    /**
     * 名片列表
     * @access public
     * @param string $uid 用户id
     * @return json
     */
    public function doPageCards()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $to_uid = $_GPC['to_uid'];


        pdo_delete('longbing_card_collection', ['to_uid' => 0]);
        pdo_delete('longbing_card_user_info', ['fans_id' => 0]);
        if (!$uid) {
            return $this->result(-1, '未获取到用户', []);
        }

        $limit = array(1, $this->limit);

        $curr = 1;
        if (isset($_GPC['page'])) {
            $limit[0] = $_GPC['page'];
            $curr = $_GPC['page'];
        }

        $where = array(
            'uniacid' => $_W['uniacid'],
        );

        //  公司信息
        if ($this->redis_sup)
        {
            $redis_key = 'longbing_card_companylist_' . $_W['uniacid'];
            $company      = $this->redis_server->get($redis_key);

            if ($company)
            {
                $company               = json_decode($company, true);
                $company[0]['from_redis'] = 1;
            }
        }

        $company = pdo_getall('longbing_card_company', ['uniacid' => $_W['uniacid'], 'status' => 1]);



        $where['uid'] = $uid;
        $where['to_uid !='] = $uid;
        $where['status'] = 1;

        //  所收藏的名片列表
        $cards = pdo_getslice('longbing_card_collection', $where, $limit, $count, [], '', ['id desc']);

//        $count = count($count);
        if (empty($cards)) {
            $list_card = pdo_getall('longbing_card_user_info', ['fans_id !=' => 0, 'uniacid' => $_W['uniacid'], 'status' => 1, 'is_default' => 1], [], '', ['top desc']);
            if (empty($list_card)) {
                $data = [
                    'page' => $curr,
                    'total_page' => ceil($count / $this->limit),
                    'list' => [],
                    'company' => $company
                ];

                return $this->result(0, '', $data);

            } else {
                foreach ($list_card as $k => $v) {
                    $user = $v;
                    $user['avatar'] = tomedia($user['avatar']);
                    $job = pdo_get('longbing_card_job', ['id' => $v['job_id']]);
                    $user['job_name'] = $job['name'];
                    if ($v['from_uid']) {
                        $userFrom = pdo_get('longbing_card_user_info', ['fans_id' => $v['from_uid']]);
                        $cards[$k]['shareBy'] = $userFrom['name'];
                    }
                    $info = pdo_get('longbing_card_user', ['id' => $v['fans_id']]);
                    $i = $info;
                    $message = pdo_getall('longbing_card_message', ['user_id' => $v['fans_id'], 'target_id' => $uid, 'uniacid' => $_W['uniacid'], 'status' => 1]);
                    $cards[$k]['userInfo'] = $user;
                    $cards[$k]['info'] = $info;
                    $cards[$k]['type'] = 'no';
                    $cards[$k]['message'] = count($message);
                    $cards[$k]['create_time'] = time();
                    $cards[$k]['shareBy'] = '搜索';
                }
                $count = count($list_card);
            }

        }
        else
        {
            $i = pdo_get('longbing_card_user', ['id' => $uid]);
            if ($i['is_staff'] && $curr == 1)
            {
                $card_self = pdo_getall('longbing_card_collection', ['uid' => $uid, 'to_uid' => $uid]);

                if ($card_self)
                {
                    $card_tmp[0] = $card_self[0];
                    $cards = array_merge($card_tmp, $cards);
                }
            }

            foreach ($cards as $k => $v) {
                $user = pdo_get('longbing_card_user_info', ['fans_id' => $v['to_uid'], 'uniacid' => $_W['uniacid']]);

                $user['avatar'] = tomedia($user['avatar']);
                $images = $user['images'];
                $images = trim($images, ',');
                $images = explode(',', $images);
                $tmp = [];
                foreach ($images as $k2 => $v2) {
                    $tmpUrl = tomedia($v2);
                    array_push($tmp, $tmpUrl);
                }
                $user['images'] = $tmp;

                $job = pdo_get('longbing_card_job', ['id' => $user['job_id']]);
                $user['job_name'] = $job['name'];
                $cards[$k]['userInfo'] = $user;
                $cards[$k]['shareBy'] = '';
                $cards[$k]['type'] = 'yes';
                $message = pdo_getall('longbing_card_message', ['user_id' => $v['to_uid'], 'target_id' => $uid, 'uniacid' => $_W['uniacid'], 'status' => 1]);
//                $i = pdo_get('longbing_card_user', ['id' => $uid]);
                if (!empty($i)) {
                    if ($i['is_group']) {
                        $cards[$k]['shareBy'] = '群分享';
                    }
                    if ($i['type'] == 1) {
                        $cards[$k]['shareBy'] = '自定义码';
                    }
                    if ($i['type'] == 2) {
                        $cards[$k]['shareBy'] = '产品分享';
                    }
                    if ($i['type'] == 3) {
                        $cards[$k]['shareBy'] = '动态分享';
                    }
                }
                $cards[$k]['message'] = count($message);
                if ($v['from_uid']) {
                    $userFrom = pdo_get('longbing_card_user_info', ['fans_id' => $v['from_uid']]);
                    $cards[$k]['shareBy'] = $userFrom['name'];
                }
            }
        }

        $i = pdo_get('longbing_card_user', ['id' => $uid]);
        if ($i['is_staff']) {
            $cardsTmp = array();
            foreach ($cards as $k => $v) {
                if ($v['to_uid'] == $uid) {
                    array_push($cardsTmp, $v);
                    break;
                }
            }
            foreach ($cards as $k => $v) {
                if ($v['to_uid'] != $uid) {
                    array_push($cardsTmp, $v);
                }
            }
            $cards = $cardsTmp;
        }

        foreach ($cards as $k => $v) {
            $cards[$k]['userInfo']['myCompany'] = [];
            $cards[$k]['create_time2'] = date("Y-m-d H:i:s", $v['create_time']);
            if ($v['userInfo']['company_id']) {
                foreach ($company as $k2 => $v2) {
                    if ($v['userInfo']['company_id'] == $v2['id']) {
                        $cards[$k]['userInfo']['myCompany'] = $v2;
                    }
                }
            }
        }

        $data = [
            'page' => $curr,
            'total_page' => ceil($count / $this->limit),
            'list' => $cards,
            'company' => $company
        ];

        return $this->result(0, '', $data);
    }

    /**
     * 名片详情
     * @access public
     * @param string $uid 用户id
     * @param string $card_id 用户id
     * @return json
     */
    public function doPageCard()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $scene = $_GPC['scene'];
        if (!$scene) {
            $scene = 0;
        }

        $time = time();

        $this->checkEmpty();

        $to_uid = $_GPC['to_uid'];


        if (!$uid || !$to_uid) {
            return $this->result(-1, '请传入参数', []);
        }

        if ($uid == $to_uid) {
            $check_is_staff = pdo_get('longbing_card_user', ['id' => $uid, 'uniacid' => $_W['uniacid']]);
            if (empty($check_is_staff) || $check_is_staff['is_staff'] != 1) {
                return $this->result(-1, '请求错误', []);
            }
        }

        $from_uid = 0;
        if (isset($_GPC['from_uid'])) {
            $from_uid = $_GPC['from_uid'];
        }
        if (!$to_uid) {
            $have = pdo_get('longbing_card_collection', ['uid' => $uid, 'to_uid' => $to_uid, 'uniacid' => $_W['uniacid']]);
            if (empty($have)) {
                pdo_insert('longbing_card_collection', ['uniacid' => $_W['uniacid'], 'uid' => $uid, 'to_uid' => $to_uid, 'create_time' => time(), 'update_time' => time(), 'scene' => $scene]);
            }
        } else {
            $have = pdo_get('longbing_card_collection', ['uid' => $uid, 'to_uid' => $to_uid, 'uniacid' => $_W['uniacid']]);
            if (empty($have)) {
                pdo_insert('longbing_card_collection', ['uniacid' => $_W['uniacid'], 'uid' => $uid, 'to_uid' => $to_uid, 'create_time' => time(), 'update_time' => time(), 'scene' => $scene]);
            } else {
                if ($have['to_uid'] == 0) {
                    pdo_update('longbing_card_collection', ['to_uid' => $to_uid, 'scene' => $scene], ['id' => $have['id']]);
                }
            }
        }
        $check = pdo_get('longbing_card_user_info', ['fans_id' => $to_uid, 'uniacid' => $_W['uniacid']]);
        if (!$check || empty($check)) {
            return $this->result(-1, '未找到该名片', []);
        }

        $data = [
            'user_id' => $uid,
            'to_uid' => $to_uid,
            'type' => 2,
            'uniacid' => $_W['uniacid'],
            'target' => '',
            'sign' => 'praise',
            'scene' => $_GPC['scene'],
            'create_time' => $time,
            'update_time' => $time,
        ];
        pdo_insert('longbing_card_count', $data);

        $info = $check;

        $info['avatar'] = tomedia($info['avatar']);
        $info['voice'] = tomedia($info['voice']);
        $images = $info['images'];
        $images = trim($images, ',');
        $images = explode(',', $images);
        $tmp = [];
        foreach ($images as $k2 => $v2) {
            $tmpUrl = tomedia($v2);
            array_push($tmp, $tmpUrl);
        }
        $info['images'] = $tmp;
        $job = pdo_get('longbing_card_job', ['id' => $info['job_id'], 'uniacid' => $_W['uniacid']]);
        $info['job_name'] = $job['name'];
        $data['info'] = $info;

        $sql = "SELECT user_id, count(*) FROM " . tablename('longbing_card_count') . " where `type` = 2 && `to_uid` = {$to_uid} && sign = 'praise' && uniacid = {$_W['uniacid']} && `user_id` != $to_uid GROUP BY user_id";
        $count = pdo_fetchall($sql);

        $data['peoples'] = count($count);
        $ids = '';
        foreach ($count as $k => $v) {
            //            if ($k == 8)
            //                break;
            $ids .= ',' . $v['user_id'];
        }
        $ids = trim($ids, ',');
        $data['peoplesInfo'] = [];
        if ($ids) {
            if (strstr($ids, ",")) {
                $sql = "SELECT * FROM " . tablename('longbing_card_user') . " where `id` in ($ids) && `avatarUrl` != '' && uniacid = {$_W['uniacid']}";
            } else {
                $sql = "SELECT * FROM " . tablename('longbing_card_user') . " where `id` = $ids && `avatarUrl` != '' && uniacid = {$_W['uniacid']}";
            }
            $count = pdo_fetchall($sql);

            $data['peoplesInfo'] = $count;
        }

        $sql = "SELECT user_id, count(*) FROM " . tablename('longbing_card_count') . " where `type` = 3 && `to_uid` = {$to_uid} && sign = 'praise' && uniacid = {$_W['uniacid']} GROUP BY user_id";
        $count = pdo_fetchall($sql);
        $data['thumbs_up'] = count($count);

        $sql = "SELECT user_id, count(*) FROM " . tablename('longbing_card_count') . " where `type` = 4 && `to_uid` = {$to_uid} && sign = 'praise' && uniacid = {$_W['uniacid']} GROUP BY user_id";
        $count = pdo_fetchall($sql);
        $data['share'] = count($count);

        $isT = pdo_get('longbing_card_count', ['type' => 1, 'user_id' => $uid, 'to_uid' => $to_uid, 'sign' => 'praise']);

        $isT2 = pdo_get('longbing_card_count', ['type' => 3, 'user_id' => $uid, 'to_uid' => $to_uid, 'sign' => 'praise']);
        if ($isT) {
            $data['voiceThumbs'] = 1;
        } else {
            $data['voiceThumbs'] = 0;
        }
        if ($isT2) {
            $data['isThumbs'] = 1;
        } else {
            $data['isThumbs'] = 0;
        }
        return $this->result(0, '', $data);
    }

    /**
     * 名片详情V2
     * @access public
     * @param string $uid 用户id
     * @param string $card_id 用户id
     * @return json
     */
    public function doPageCardV2()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $scene = $_GPC['scene'];
        if (!$scene) {
            $scene = 0;
        }

        $time = time();

        $this->checkEmpty();

        $to_uid = $_GPC['to_uid'];


        if (!$uid || !$to_uid) {
            return $this->result(-1, '请传入参数', []);
        }

        if ($uid == $to_uid) {
            $check_is_staff = pdo_get('longbing_card_user', ['id' => $uid, 'uniacid' => $_W['uniacid']]);
            if (empty($check_is_staff) || $check_is_staff['is_staff'] != 1) {
                return $this->result(-1, '请求错误', []);
            }
        }

        $from_uid = 0;
        if (isset($_GPC['from_uid'])) {
            $from_uid = $_GPC['from_uid'];
        }
        if (!$to_uid) {
            $have = pdo_get('longbing_card_collection', ['uid' => $uid, 'to_uid' => $to_uid, 'uniacid' => $_W['uniacid']]);
            if (empty($have)) {
                pdo_insert('longbing_card_collection', ['uniacid' => $_W['uniacid'], 'uid' => $uid, 'to_uid' => $to_uid, 'create_time' => time(), 'update_time' => time(), 'scene' => $scene]);
            }
        } else {
            $have = pdo_get('longbing_card_collection', ['uid' => $uid, 'to_uid' => $to_uid, 'uniacid' => $_W['uniacid']]);
            if (empty($have)) {
                pdo_insert('longbing_card_collection', ['uniacid' => $_W['uniacid'], 'uid' => $uid, 'to_uid' => $to_uid, 'create_time' => time(), 'update_time' => time(), 'scene' => $scene]);
            } else {
                pdo_update('longbing_card_collection', ['to_uid' => $to_uid, 'scene' => $scene, 'status' => 1], ['id' => $have['id']]);
            }
        }
        $check = pdo_get('longbing_card_user_info', ['fans_id' => $to_uid, 'uniacid' => $_W['uniacid']]);
        if (!$check || empty($check)) {
            return $this->result(-1, '未找到该名片', []);
        }

        $data = [
            'user_id' => $uid,
            'to_uid' => $to_uid,
            'type' => 2,
            'uniacid' => $_W['uniacid'],
            'target' => '',
            'sign' => 'praise',
            'scene' => $_GPC['scene'],
            'create_time' => $time,
            'update_time' => $time,
        ];
        pdo_insert('longbing_card_count', $data);

        $info = $check;

        //        $info['avatar'] = tomedia($info['avatar']);

        if ($info['avatar']) {
            //jingshuixian 恢复云端头像路径
            $tmp = $info['avatar'];
            $info['avatar_2'] = tomedia($tmp);
            $info['avatar'] = $this->transImage($info['avatar']);
        }

        $info['voice'] = tomedia($info['voice']);
        $images = $info['images'];
        $images = trim($images, ',');
        $images = explode(',', $images);
        $tmp = [];
        foreach ($images as $k2 => $v2) {
            $tmpUrl = tomedia($v2);
            array_push($tmp, $tmpUrl);
        }
        $info['images'] = $tmp;
        $job = pdo_get('longbing_card_job', ['id' => $info['job_id'], 'uniacid' => $_W['uniacid']]);
        $info['job_name'] = $job['name'];
        $data['info'] = $info;

        $sql = "SELECT user_id, count(*) FROM " . tablename('longbing_card_count') . " where `type` = 2 && `to_uid` = {$to_uid} && sign = 'praise' && uniacid = {$_W['uniacid']} && `user_id` != $to_uid GROUP BY user_id";
        $count = pdo_fetchall($sql);

        $data['peoples'] = count($count);
        $ids = '';
        foreach ($count as $k => $v) {
            if ($k == 8) {
                break;
            }
            $ids .= ',' . $v['user_id'];
        }
        $ids = trim($ids, ',');
        $data['peoplesInfo'] = [];
        if ($ids) {
            if (strstr($ids, ",")) {
                $sql = "SELECT * FROM " . tablename('longbing_card_user') . " where `id` in ($ids) && `avatarUrl` != '' && uniacid = {$_W['uniacid']}";
            } else {
                $sql = "SELECT * FROM " . tablename('longbing_card_user') . " where `id` = $ids && `avatarUrl` != '' && uniacid = {$_W['uniacid']}";
            }
            $count = pdo_fetchall($sql);

            $data['peoplesInfo'] = $count;
        }

        $sql = "SELECT user_id, count(*) FROM " . tablename('longbing_card_count') . " where `type` = 3 && `to_uid` = {$to_uid} && sign = 'praise' && uniacid = {$_W['uniacid']} GROUP BY user_id";
        $count = pdo_fetchall($sql);
        $data['thumbs_up'] = count($count);

        $sql = "SELECT user_id, count(*) FROM " . tablename('longbing_card_count') . " where `type` = 4 && `to_uid` = {$to_uid} && sign = 'praise' && uniacid = {$_W['uniacid']} GROUP BY user_id";
        $count = pdo_fetchall($sql);
        $data['share'] = count($count);

        $isT = pdo_get('longbing_card_count', ['type' => 1, 'user_id' => $uid, 'sign' => 'praise']);
        $isT2 = pdo_get('longbing_card_count', ['type' => 3, 'user_id' => $uid, 'sign' => 'praise']);
        if ($isT) {
            $data['voiceThumbs'] = 1;
        } else {
            $data['voiceThumbs'] = 0;
        }
        if ($isT2) {
            $data['isThumbs'] = 1;
        } else {
            $data['isThumbs'] = 0;
        }
        return $this->result(0, '', $data);
    }

    /**
     * 名片详情V3
     * @access public
     * @param string $uid 用户id
     * @param string $card_id 用户id
     * @return json
     */
    public function doPageCardV3()
    {
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $scene = $_GPC['scene'];
        if (!$scene) {
            $scene = 0;
        }

        $time = time();

        $to_uid = $_GPC['to_uid'];


        if (!$uid || !$to_uid) {
            return $this->result(-1, '请传入参数', []);
        }

        if ($uid == $to_uid) {
            $check_is_staff = pdo_get('longbing_card_user', ['id' => $uid, 'uniacid' => $_W['uniacid']]);
            if (empty($check_is_staff) || $check_is_staff['is_staff'] != 1) {
                return $this->result(-1, '请求错误', []);
            }
        }

        $from_uid = 0;
        if (isset($_GPC['from_uid'])) {
            $from_uid = $_GPC['from_uid'];
        }
        if (!$to_uid) {
            $have = pdo_get('longbing_card_collection', ['uid' => $uid, 'to_uid' => $to_uid, 'uniacid' => $_W['uniacid']]);
            if (empty($have)) {
                pdo_insert('longbing_card_collection', ['uniacid' => $_W['uniacid'], 'uid' => $uid, 'to_uid' => $to_uid, 'create_time' => time(), 'update_time' => time(), 'scene' => $scene]);
            }
        } else {
            $have = pdo_get('longbing_card_collection', ['uid' => $uid, 'to_uid' => $to_uid, 'uniacid' => $_W['uniacid']]);
            if (empty($have)) {
                pdo_insert('longbing_card_collection', ['uniacid' => $_W['uniacid'], 'uid' => $uid, 'to_uid' => $to_uid, 'create_time' => time(), 'update_time' => time(), 'scene' => $scene]);
            } else {
                pdo_update('longbing_card_collection', ['to_uid' => $to_uid, 'scene' => $scene, 'status' => 1], ['id' => $have['id']]);
            }
        }
        $check = pdo_get('longbing_card_user_info', ['fans_id' => $to_uid, 'uniacid' => $_W['uniacid']]);
        if (!$check || empty($check)) {
            return $this->result(-1, '未找到该名片', []);
        }

        if ($check['company_id']) {
            $com = pdo_get('longbing_card_company', ['uniacid' => $_W['uniacid'], 'id' => $check['company_id'], 'status' => 1]);
            if (!$com)
            {
                $com = pdo_get('longbing_card_company', ['uniacid' => $_W['uniacid'], 'status' => 1]);
            }
            $com['logo'] = $this->transImage($com['logo']);
            $check['myCompany'] = $com;
        } else {
            $com = pdo_get('longbing_card_company', ['uniacid' => $_W['uniacid'], 'status' => 1]);
            $com['logo'] = $this->transImage($com['logo']);
            $check['myCompany'] = $com;
        }


        if (mb_strlen($check['myCompany']['addr'],'utf8') > 18)
        {
            $check['myCompany']['addrMore'] = mb_substr($check['myCompany']['addr'],0,20,"UTF-8") . '...';
        }
        else
        {
            $check['myCompany']['addrMore'] = $check['myCompany']['addr'];
        }


        $data = [
            'user_id' => $uid,
            'to_uid' => $to_uid,
            'type' => 2,
            'uniacid' => $_W['uniacid'],
            'target' => '',
            'sign' => 'praise',
            'scene' => $_GPC['scene'],
            'create_time' => $time,
            'update_time' => $time,
        ];
        pdo_insert('longbing_card_count', $data);

        $info = $check;

        if ($info['avatar']) {

            $tmp = $info['avatar'];
            $info['avatar_2'] = tomedia($tmp);
            $info['avatar'] = $this->transImage($info['avatar']);
        }
        if ($info['my_video']) {
            $info['my_video'] = tomedia($info['my_video']);
        }
        if ($info['my_video_cover']) {
            $info['my_video_cover'] = tomedia($info['my_video_cover']);
        }

        $info['voice'] = tomedia($info['voice']);
        $images = $info['images'];
        $images = trim($images, ',');
        $images = explode(',', $images);
        $tmp = [];
        foreach ($images as $k2 => $v2) {
            $tmpUrl = tomedia($v2);
            array_push($tmp, $tmpUrl);
        }
        $info['images'] = $tmp;
        $job = pdo_get('longbing_card_job', ['id' => $info['job_id'], 'uniacid' => $_W['uniacid']]);
        $info['job_name'] = $job['name'];
        $data['info'] = $info;

        $sql = "SELECT user_id, count(*) FROM " . tablename('longbing_card_count') . " where `type` = 2 && `to_uid` = {$to_uid} && sign = 'praise' && uniacid = {$_W['uniacid']} && `user_id` != $to_uid GROUP BY user_id";
        $count = pdo_fetchall($sql);

        $data['peoples'] = count($count);

        $sql = "SELECT user_id, count(*) FROM " . tablename('longbing_card_count') . " where `type` = 3 && `to_uid` = {$to_uid} && sign = 'praise' && uniacid = {$_W['uniacid']} GROUP BY user_id";
        $count = pdo_fetchall($sql);
        $data['thumbs_up'] = count($count);

        $sql = "SELECT user_id, count(*) FROM " . tablename('longbing_card_count') . " where `type` = 4 && `to_uid` = {$to_uid} && sign = 'praise' && uniacid = {$_W['uniacid']} GROUP BY user_id";
        $count = pdo_fetchall($sql);
        $data['share'] = count($count);

        $isT = pdo_get('longbing_card_count', ['type' => 1, 'user_id' => $uid, 'to_uid' => $to_uid, 'sign' => 'praise']);
        $isT2 = pdo_get('longbing_card_count', ['type' => 3, 'user_id' => $uid, 'to_uid' => $to_uid, 'sign' => 'praise']);
        if ($isT) {
            $data['voiceThumbs'] = 1;
        } else {
            $data['voiceThumbs'] = 0;
        }
        if ($isT2) {
            $data['isThumbs'] = 1;
        } else {
            $data['isThumbs'] = 0;
        }



        $info = pdo_get('longbing_card_user', ['uniacid' => $_W['uniacid'], 'id' => $uid]);

        if (!empty($info) && $info['is_staff']) {
            $data['is_staff'] = 1;
            $data['is_boss'] = $info['is_boss'];
        } else {
            $data['is_staff'] = 0;
        }

        $extension = pdo_getall('longbing_card_extension', ['user_id' => $to_uid], ['goods_id']);

        if (empty($extension)) {
            $data['goods'] = [];
        }
        else
        {
            $ids = [];
            foreach ($extension as $k => $v) {
                array_push($ids, $v['goods_id']);
            }
            $ids = implode(',', $ids);
            if (count($extension) > 1) {
                $ids = '(' . $ids . ')';
                $sql = "SELECT id,`name`,cover,price,status FROM " . tablename('longbing_card_goods') . " WHERE id IN {$ids} && status = 1 ORDER BY top DESC";
            } else {
                $sql = "SELECT id,`name`,cover,price,status FROM " . tablename('longbing_card_goods') . " WHERE id = {$ids} && status = 1 ORDER BY top DESC";
            }

            $goods = pdo_fetchall($sql);
            foreach ($goods as $k => $v) {
                if ($v['status'] == 1) {
                    $goods[$k]['cover'] = tomedia($v['cover']);
                }
            }
            $data['goods'] = $goods;
        }


        $data['peoplesInfo'] = [];






        $view_count = pdo_fetchall("SELECT id, user_id FROM " . tablename('longbing_card_count') . " WHERE to_uid = {$to_uid} && user_id != {$to_uid} ORDER BY id DESC LIMIT 100");

        if (empty($view_count))
        {
            $peoplesInfo = [];
        }
        else if (count($view_count) == 1)
        {
            $peoplesInfo = pdo_getall('longbing_card_user', ['id' => $view_count[0]['user_id']], ['id', 'avatarUrl']);
        }
        else
        {
            $checkArr = [];
            $peoplesInfo = [];
            foreach ($view_count as $k => $v)
            {
                if (in_array($v['user_id'], $checkArr))
                {
                    continue;
                }
                if ($v['user_id'] == $to_uid)
                {
                    continue;
                }
                array_push($checkArr, $v['user_id']);
                $userInfo = pdo_get('longbing_card_user', ['id' => $v['user_id']], ['id', 'avatarUrl']);
                if ($userInfo['avatarUrl'])
                {
                    array_push($peoplesInfo, $userInfo);
                    if (count($peoplesInfo) == 8)
                    {
                        break;
                    }
                }
            }
        }






        $data['peoplesInfo'] = $peoplesInfo;

        $info = pdo_get('longbing_card_user', ['id' => $to_uid, 'uniacid' => $_W['uniacid']]);
//        $info   = $check_is_staff;


        if ($info['qr_path']) {
            @$size = filesize(ATTACHMENT_ROOT . '/' . $info['qr_path']);

            if ($size > 51220)  // 大于5k, 用户判断图片是否正确
            {
                $image = $this->transImage($info['qr_path']);
                $data['qr'] = $image;
            }
            else
            {
//                @require_once(IA_ROOT . '/framework/function/file.func.php');
                load()->func('file');

                if (!is_dir(ATTACHMENT_ROOT . '/' . "images")) {
                    mkdir(ATTACHMENT_ROOT . '/' . "images");
                }
                if (!is_dir(ATTACHMENT_ROOT . '/' . "images/longbing_card")) {
                    mkdir(ATTACHMENT_ROOT . '/' . "images/longbing_card");
                }
                if (!is_dir(ATTACHMENT_ROOT . '/' . "images/longbing_card/{$_W['uniacid']}/")) {
                    mkdir(ATTACHMENT_ROOT . '/' . "images/longbing_card/{$_W['uniacid']}/");
                }
                //jingshuixian  定义上传目录
                $destination_folder = ATTACHMENT_ROOT . '/images' . "/longbing_card/{$_W['uniacid']}";
                $image              = $destination_folder . '/' . $_W['uniacid'] . '-' . $to_uid . 'qr.png';
                $path               = "longbing_card/pages/index/index?to_uid={$to_uid}&currentTabBar=toCard&is_qr=1";
                $res                = $this->createQr($image, $path);
                if ($res != true) {
                    return $this->result(-1, '请求失败', []);
                }
                $image = tomedia('images' . "/longbing_card/{$_W['uniacid']}/" . $_W['uniacid'] . '-' . $to_uid . 'qr.png');

                if (!strstr($image, 'ttp')) {
                    $image = 'https://' . $image;
                }

                pdo_update('longbing_card_user', ['qr_path' => 'images' . "/longbing_card/{$_W['uniacid']}/" . $_W['uniacid'] . '-' . $to_uid . 'qr.png'], ['id' => $to_uid]);

                $image = $this->transImage($image);
            }
        }
        else
        {
            load()->func('file');

            if (!is_dir(ATTACHMENT_ROOT . '/' . "images")) {
                mkdir(ATTACHMENT_ROOT . '/' . "images");
            }
            if (!is_dir(ATTACHMENT_ROOT . '/' . "images/longbing_card")) {
                mkdir(ATTACHMENT_ROOT . '/' . "images/longbing_card");
            }
            if (!is_dir(ATTACHMENT_ROOT . '/' . "images/longbing_card/{$_W['uniacid']}/")) {
                mkdir(ATTACHMENT_ROOT . '/' . "images/longbing_card/{$_W['uniacid']}/");
            }
            //jingshuixian  定义上传目录
            $destination_folder = ATTACHMENT_ROOT . '/images' . "/longbing_card/{$_W['uniacid']}";
            $image              = $destination_folder . '/' . $_W['uniacid'] . '-' . $to_uid . 'qr.png';
            $path               = "longbing_card/pages/index/index?to_uid={$to_uid}&currentTabBar=toCard&is_qr=1";
            $res                = $this->createQr($image, $path);
            if ($res != true) {
                return $this->result(-2, '请求失败', []);
            }
            $image = tomedia('images' . "/longbing_card/{$_W['uniacid']}/" . $_W['uniacid'] . '-' . $to_uid . 'qr.png');

            if (!strstr($image, 'ttp')) {
                $image = 'https://' . $image;
            }

            pdo_update('longbing_card_user', ['qr_path' => 'images' . "/longbing_card/{$_W['uniacid']}/" . $_W['uniacid'] . '-' . $to_uid . 'qr.png'], ['id' => $to_uid]);

            $image = $this->transImage($image);
        }


        $data['qr'] = $image;

        $this->sendTplStaff($uid, $to_uid, 1, $_W['uniacid']);
        return $this->result(0, '', $data);
    }

    public function doPagePeoplesInfo() {
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];

        $to_uid = $_GPC['to_uid'];

        if (!$uid || !$to_uid) {
            return $this->result(-1, '请传入参数', []);
        }

        $data['peoplesInfo'] = [];

        $view_count = pdo_fetchall("SELECT id, user_id FROM " . tablename('longbing_card_count') . " WHERE to_uid = {$to_uid} && user_id != {$to_uid} ORDER BY id DESC LIMIT 100");

        if (empty($view_count))
        {
            $peoplesInfo = [];
        }
        else if (count($view_count) == 1)
        {
            $peoplesInfo = pdo_getall('longbing_card_user', ['id' => $view_count[0]['user_id']], ['id', 'avatarUrl']);
        }
        else
        {
            $checkArr = [];
            $peoplesInfo = [];
            foreach ($view_count as $k => $v)
            {
                if (in_array($v['user_id'], $checkArr))
                {
                    continue;
                }
                if ($v['user_id'] == $to_uid)
                {
                    continue;
                }
                array_push($checkArr, $v['user_id']);
                $userInfo = pdo_get('longbing_card_user', ['id' => $v['user_id']], ['id', 'avatarUrl']);
                if ($userInfo['avatarUrl'])
                {
                    array_push($peoplesInfo, $userInfo);
                    if (count($peoplesInfo) == 8)
                    {
                        break;
                    }
                }
            }
        }

        $data['peoplesInfo'] = $peoplesInfo;
        return $this->result(0, '', $data);
    }

    /**
     * 点赞
     * @access public
     * @param string $uid 用户id
     * @param string $to_uid 名片fans_id
     * @return json
     */
    public function doPageThumbs()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $to_uid = $_GPC['to_uid'];
        $type = $_GPC['type'];
        if ($type != 1 && $type != 3) {
            return $this->result(-1, '请传入类型', []);
        }
        if (!$to_uid && $to_uid !== 0 && $to_uid !== '0') {
            return $this->result(-1, '请传入名片id', []);
        }

        $check = pdo_get('longbing_card_count', ['type' => $type, 'user_id' => $uid, 'to_uid' => $to_uid, 'sign' => 'praise']);

        $result = false;
        $time = time();
        if (!empty($check)) {
            $result = pdo_delete('longbing_card_count', ['type' => $type, 'user_id' => $uid, 'to_uid' => $to_uid, 'sign' => 'praise']);
        } else {
            $data = [
                'user_id' => $uid,
                'to_uid' => $to_uid,
                'type' => $type,
                'uniacid' => $_W['uniacid'],
                'target' => '',
                'sign' => 'praise',
                'scene' => $_GPC['scene'],
                'create_time' => $time,
                'update_time' => $time,
            ];
            $result = pdo_insert('longbing_card_count', $data);
        }
        if ($result) {
            return $this->result(0, '请求成功', []);
        } else {
            return $this->result(-1, '请传入类型', []);
        }
    }

    /**
     * 公司信息
     * @access public
     * @param string $uid 用户id
     * @param string $to_uid 名片fans_id
     * @return json
     */
    public function doPageCompany()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $info = pdo_get('longbing_card_company', ['uniacid' => $_W['uniacid']]);

        $info['desc'] = tomedia($info['desc']);
        $info['logo'] = tomedia($info['logo']);

        $images = $info['culture'];
        $images = trim($images, ',');
        $images = explode(',', $images);
        $tmp = [];
        foreach ($images as $k => $v) {
            $src = tomedia($v);
            array_push($tmp, $src);
        }
        $info['culture'] = $tmp;

        $user = pdo_get('longbing_card_user_info', ['fans_id' => $uid, 'is_staff' => 1, 'status' => 1]);
        if ($user) {
            if ($user['company_id']) {
                $company = pdo_get('longbing_card_company', ['uniacid' => $_W['uniacid'], 'id' => $user['company_id']]);
                if ($company) {
                    $info['company'] = $company;
                }
            }
        }

        return $this->result(0, '请求成功', $info);
    }

    /**
     * 公司信息V2
     * @access public
     * @param string $uid 用户id
     * @param string $to_uid 名片fans_id
     * @return json
     */
    public function doPageCompanyV2()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $info = pdo_get('longbing_card_company', ['uniacid' => $_W['uniacid']]);


        $info['desc'] = tomedia($info['desc']);
        $info['logo'] = $this->transImage($info['logo']);

        $images = $info['culture'];
        $images = trim($images, ',');
        $images = explode(',', $images);
        $tmp = [];
        foreach ($images as $k2 => $v2) {
            $src = tomedia($v2);
            array_push($tmp, $src);
        }
        $info['culture'] = $tmp;


        return $this->result(0, '请求成功', $info);
    }

    /**
     * 公司信息V3
     * @access public
     * @param string $uid 用户id
     * @param string $to_uid 名片fans_id
     * @return json
     */
    public function doPageCompanyV3()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $info = pdo_getall('longbing_card_company', ['uniacid' => $_W['uniacid'], 'status' => 1]);

        foreach ($info as $k => $v) {
            $info[$k]['desc'] = tomedia($v['desc']);
            $info[$k]['logo'] = $this->transImage($v['logo']);

            $images = $v['culture'];
            $images = trim($images, ',');
            $images = explode(',', $images);
            $tmp = [];
            foreach ($images as $k2 => $v2) {
                $src = tomedia($v2);
                array_push($tmp, $src);
            }
            $info[$k]['culture'] = $tmp;
        }


        $data['list'] = $info;

        $user = pdo_get('longbing_card_user_info', ['fans_id' => $uid, 'is_staff' => 1, 'status' => 1]);
        if ($user) {
            if ($user['company_id']) {
                $company = pdo_get('longbing_card_company', ['uniacid' => $_W['uniacid'], 'id' => $user['company_id']]);
                if ($company) {
                    $company['logo'] = $this->transImage($company['logo']);
                    $data['my'] = $company;
                } else {
                    $data['my'] = $info[0];
                }
            } else {
                $data['my'] = $info[0];
            }
        }

        return $this->result(0, '请求成功', $data);
    }

    /**
     * 商品列表
     * @access public
     * @param string $uid 用户id
     * @param string $to_uid 名片fans_id
     * @return json
     */
    public function doPageGoods()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $to_uid = $_GPC['to_uid'];
        if (!$uid || (!$to_uid && $to_uid != 0)) {
            return $this->result(-1, '请求参数错误', []);
        }

        $limit = array(1, $this->limit);

        $curr = 1;
        if (isset($_GPC['page'])) {
            $limit[0] = $_GPC['page'];
            $curr = $_GPC['page'];
        }
        //jingshuixian 添加status
        $info = pdo_getslice('longbing_card_goods', ['uniacid' => $_W['uniacid'], 'status' => 1], $limit, $count, [], '', ['top desc']);
        foreach ($info as $k => $v) {
            $info[$k]['cover'] = tomedia($v['cover']);
        }
        $data = [
            'page' => $curr,
            'total_page' => ceil($count / $this->limit),
            'list' => $info,
        ];
        $this->insertView($uid, $to_uid, 1, $_W['uniacid']);
        return $this->result(0, '请求成功', $data);
    }

    /**
     * 商品详情
     * @access public
     * @param string $uid 用户id
     * @param string $to_uid 名片fans_id
     * @return json
     */
    public function doPageGoodsDetail()
    {
        $this->cross();
        global $_GPC, $_W;
        $id = $_GPC['id'];
        $user_id = $_GPC['user_id'];
        $to_uid = $_GPC['to_uid'];
        if (!$user_id || !$to_uid) {
            return $this->result(-1, '请求参数错误', []);
        }

        if (!$id) {
            return $this->result(-1, '请传入商品id', []);
        }

        $info = pdo_get('longbing_card_goods', ['uniacid' => $_W['uniacid'], 'id' => $id]);
        $info['cover'] = tomedia($info['cover']);
        $images = $info['images'];
        $images = trim($images, ',');
        $images = explode(',', $images);
        $tmp = [];
        foreach ($images as $k => $v) {
            $src = tomedia($v);
            array_push($tmp, $src);
        }
        $info['images'] = $tmp;
        $info['collStatus'] = 0;
        $check = pdo_get('longbing_card_goods_collection', [
            'uniacid' => $_W['uniacid'],
            'user_id' => $user_id,
            'goods_id' => $id,
        ]);
        if ($check) {
            $info['collStatus'] = 1;
        }
        //        $info['content'] = htmlspecialchars_decode($info['content']);
        pdo_update('longbing_card_goods', ['view_count' => $info['view_count'] + 1], ['id' => $info['id']]);
        $this->insertView($user_id, $to_uid, 2, $_W['uniacid'], $id);
        $info['content'] = $this->toWXml($info['content']);
        return $this->result(0, '请求成功', $info);
    }

    /**
     * 商品收藏/取消收藏
     * @access public
     * @param string $uid 用户id
     * @param string $to_uid 名片fans_id
     * @return json
     */
    public function doPageGoodsCollection()
    {
        $this->cross();
        global $_GPC, $_W;
        $id = $_GPC['id'];
        $uid = $_GPC['user_id'];

        if (!$id) {
            return $this->result(-1, '请传入商品id', []);
        }
        if (!$uid) {
            return $this->result(-1, '请传入id', []);
        }

        $check = pdo_get('longbing_card_goods_collection', [
            'uniacid' => $_W['uniacid'],
            'user_id' => $uid,
            'goods_id' => $id,
        ]);

        $result = false;
        $time = time();
        if ($check) {
            $result = pdo_delete('longbing_card_goods_collection', [
                'uniacid' => $_W['uniacid'],
                'user_id' => $uid,
                'goods_id' => $id,
            ]);
        } else {
            $result = pdo_insert('longbing_card_goods_collection', [
                'user_id' => $uid,
                'uniacid' => $_W['uniacid'],
                'goods_id' => $id,
                'create_time' => $time,
                'update_time' => $time,
            ]);
        }

        if ($result) {
            return $this->result(0, '请求成功', []);
        } else {
            return $this->result(-1, '请求失败', []);
        }
    }

    /**
     * 公司模块信息
     * @access public
     * @return json
     */
//    public function doPageModular()
//    {
//
//    }

    /**
     * 公司模块信息列表
     * @access public
     * @return json
     */
    public function doPageModularList()
    {
        $this->cross();
        global $_GPC, $_W;

        $identification = $_GPC['identification'];
        $uniacid = $_W['uniacid'];

        if (!$identification) {
            return $this->result(-1, '请传入标识', []);
        }

        $where = [
            'uniacid' => $uniacid,
            'status' => 1,
            'id' => $identification
        ];

        $modular = pdo_get('longbing_card_modular', $where);

        if (!$modular) {
            return $this->result(-1, '未找到该模块', []);
        }

        $table_name = $modular['table_name'];
        $limit = array(1, $this->limit);
        $curr = 1;
        if (isset($_GPC['page'])) {
            $limit[0] = $_GPC['page'];
            $curr = $_GPC['page'];
        }

        $list = pdo_getslice($table_name, ['uniacid' => $_W['uniacid'], 'status' => 1, 'modular_id' => $identification], $limit, $count, [], '', ['top desc']);

        foreach ($list as $k => $v) {
            $list[$k]['cover'] = tomedia($v['cover']);
            if ($modular['type'] == 7)
            {
                $list[$k]['video'] = tomedia($v['video']);
            }
        }

        $data = [
            'page' => $curr,
            'total_page' => ceil($count / $this->limit),
            'list' => $list,
            'table_name' => $table_name,
        ];
        return $this->result(0, '请求成功', $data);
    }

    /**
     * 公司模块信息详情
     * @access public
     * @return json
     */
    public function doPageModularInfo()
    {
        $this->cross();
        global $_GPC, $_W;

        $table_name = $_GPC['table_name'];
        $id = $_GPC['id'];
        $uniacid = $_W['uniacid'];

        if (!$table_name) {
            return $this->result(-1, '请传入表名', []);
        }
        if (!$id) {
            return $this->result(-1, '请传入id', []);
        }

        $where = [
            'uniacid' => $uniacid,
            'status' => 1,
            'id' => $id
        ];

        $info = pdo_get($table_name, $where);

        if (!$info) {
            return $this->result(-1, '未找到数据', []);
        }
        $info['cover'] = tomedia($info['cover']);
        $info['content'] = $this->toWXml($info['content']);
        $info['introduction'] = $this->toWXml($info['introduction']);
        return $this->result(0, '请求成功', $info);
    }

    /**
     * 公司动态列表
     * @access public
     * @return json
     */
    public function doPageTimeline()
    {
        $this->cross();
        global $_GPC, $_W;

        $uniacid = $_W['uniacid'];
        $uid = $_GPC['user_id'];
        $to_uid = $_GPC['to_uid'];

        if (!$uid || (!$to_uid && $to_uid != 0)) {
            return $this->result(-1, '请求参数错误', []);
        }
        $this->insertView($uid, $to_uid, 3, $_W['uniacid']);

        if ($this->redis_sup) {

            $redis_key = 'longbing_card_timeline_' . $to_uid . '_' . $uniacid;
            $data      = $this->redis_server->get($redis_key);

            if ($data) {
                $data               = json_decode($data, true);
                $data['from_redis'] = 1;
                return $this->result(0, '请求成功', $data);
            }
        }

        $where = [
            'uniacid' => $uniacid,
            'status' => 1,
            'user_id in' => "0, $to_uid",
        ];

        $limit = array(1, $this->limit);
        $curr = 1;
        if (isset($_GPC['page'])) {
            //            $limit[0] = $_GPC['page'];
            $curr = $_GPC['page'];
        }
        $start = ($curr - 1) * 10;
        $end = $curr * 10;
        $limit = $start . ',' . $end;

        $ins = '(0, ' . $to_uid . ')';

        $list = pdo_fetchall("SELECT id,title,cover,create_time,user_id,`type`, url_type FROM " . tablename('longbing_card_timeline') . " where uniacid = {$uniacid} && status = 1 && user_id IN {$ins} ORDER BY top DESC, create_time DESC LIMIT $limit");
        $count = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_timeline') . " where uniacid = {$uniacid} && status = 1 && user_id IN {$ins} ");

        foreach ($list as $k => $v) {

            //  检查用户是否点赞该动态
            $info = [];
            if ($v['user_id']) {
                $info = pdo_get('longbing_card_user_info', ['fans_id' => $v['user_id']]);
                $info['avatar'] = tomedia($info['avatar']);
            }
            $list[$k]['user_info'] = $info;
            $list[$k]['is_thumbs'] = 0;
            $check = pdo_get('longbing_card_timeline_thumbs', ['user_id' => $uid, 'timeline_id' => $v['id']]);
            if ($check) {
                $list[$k]['is_thumbs'] = 1;
            }

            $thumbs = pdo_getall('longbing_card_timeline_thumbs', ['timeline_id' => $v['id']]);
            foreach ($thumbs as $k2 => $v2) {
                $thumbs[$k2]['user'] = pdo_get('longbing_card_user', ['id' => $v2['user_id']]);
            }
            $list[$k]['thumbs'] = $thumbs;

            //  该动态评论列表
            $comments = pdo_getall('longbing_card_timeline_comment', ['timeline_id' => $v['id'], 'status' => 1]);
            foreach ($comments as $k2 => $v2) {
                $comments[$k2]['user'] = pdo_get('longbing_card_user', ['id' => $v2['user_id']]);
            }
            $list[$k]['comments'] = $comments;
            $list[$k]['cover'] = tomedia($v['cover']);
            $images = $v['cover'];
            $images = trim($images, ',');
            $images = explode(',', $images);
            $tmp = [];
            foreach ($images as $k2 => $v2) {
                $src = tomedia($v2);
                array_push($tmp, $src);
            }
            $list[$k]['cover'] = $tmp;

            if ($v['type']) {
                $content = pdo_get('longbing_card_timeline', ['id' => $v['id']], ['content']);
                $list[$k]['content'] = $content['content'];
                if ($v['type'] == 1)
                {
                    $list[$k]['content'] = tomedia($content['content']);
                }
            }
        }

        if ($this->redis_sup)
        {
            $redis_key = 'longbing_card_companylist_' . $_W['uniacid'];
            $companyList      = $this->redis_server->get($redis_key);

            if ($companyList)
            {
                $companyList               = json_decode($companyList, true);
                $companyList[0]['from_redis'] = 1;
            }
        }
        if (!$companyList)
        {
            $companyList = pdo_getall('longbing_card_company', ['uniacid' => $uniacid, 'status' => 1]);
        }

        if (!$companyList)
        {
            $companyList = [0 => []];
        }

        $company = $companyList[0];
        if ($to_uid)
        {
            $user_info = pdo_get('longbing_card_user_info', ['fans_id' => $to_uid]);
            if ($user_info)
            {
                foreach ($companyList as $k => $v)
                {
                    if ($v['id'] == $user_info['company'])
                    {
                        $company = $v;
                        break;
                    }
                }
            }
        }

        $company['logo'] = tomedia($company['logo']);
        $company['desc'] = tomedia($company['desc']);


        $data = [
            'page' => $curr,
            'total_page' => ceil(count($count) / 10),
            'list' => $list,
        ];
        $data['timeline_company'] = $company;

        if ($this->redis_sup) {
            $redis_key = 'longbing_card_timeline_' . $to_uid . '_' . $uniacid;
            $this->redis_server->set($redis_key, json_encode($data));
            $this->redis_server->EXPIRE($redis_key, 30 * 60);
        }

        return $this->result(0, '请求成功', $data);
    }

    public function doPageTimelineNew()
    {
        $this->cross();
        global $_GPC, $_W;

        $uniacid = $_W['uniacid'];
        $uid = $_GPC['user_id'];
        $id = $_GPC['id'];
        if (!$uid || !$id) {
            return $this->result(-1, '请求参数错误', []);
        }
        $thumbs = pdo_getall('longbing_card_timeline_thumbs', ['timeline_id' => $id]);
        foreach ($thumbs as $k2 => $v2) {
            $thumbs[$k2]['user'] = pdo_get('longbing_card_user', ['id' => $v2['user_id']]);
        }

        $comments = pdo_getall('longbing_card_timeline_comment', ['timeline_id' => $id]);
        foreach ($comments as $k2 => $v2) {
            $comments[$k2]['user'] = pdo_get('longbing_card_user', ['id' => $v2['user_id']]);
        }
        return $this->result(0, '请求成功', ['thumbs' => $thumbs, 'comments' => $comments]);
    }

    /**
     * 公司动态点赞
     * @access public
     * @return json
     */
    public function doPageTimelineThumbs()
    {
        $this->cross();
        global $_GPC, $_W;

        $uniacid = $_W['uniacid'];
        $uid = $_GPC['user_id'];
        $id = $_GPC['id'];
        $to_uid = $_GPC['to_uid'];
        if (!$uid || (!$to_uid && $to_uid != 0)) {
            return $this->result(-1, '请求参数错误', []);
        }

        if (!$id) {
            return $this->result(-1, '请传入动态id', []);
        }
        if (!$uid) {
            return $this->result(-1, '请传入id', []);
        }

        $check = pdo_get('longbing_card_timeline_thumbs', [
            'uniacid' => $_W['uniacid'],
            'user_id' => $uid,
            'timeline_id' => $id,
        ]);

        $result = false;
        $time = time();
        if ($check) {
            $result = pdo_delete('longbing_card_timeline_thumbs', [
                'uniacid' => $uniacid,
                'user_id' => $uid,
                'timeline_id' => $id,
            ]);
        } else {
            $result = pdo_insert('longbing_card_timeline_thumbs', [
                'user_id' => $uid,
                'uniacid' => $uniacid,
                'timeline_id' => $id,
                'create_time' => $time,
                'update_time' => $time,
            ]);
        }

        $this->insertView($uid, $to_uid, 4, $_W['uniacid']);
        if ($result) {
            return $this->result(0, '请求成功', []);
        } else {
            return $this->result(-1, '请求失败', []);
        }
    }

    /**
     * 公司动态评论
     * @access public
     * @return json
     */
    public function doPageTimelineComment()
    {
        $this->cross();
        global $_GPC, $_W;
        $uniacid = $_W['uniacid'];
        $uid = $_GPC['user_id'];
        $id = $_GPC['id'];
        $content = $_GPC['content'];
        $to_uid = $_GPC['to_uid'];
        if (!$uid || (!$to_uid && $to_uid != 0)) {
            return $this->result(-1, '请求参数错误', []);
        }

        if (!$id) {
            return $this->result(-1, '请传入动态id', []);
        }
        if (!$uid) {
            return $this->result(-1, '请传入id', []);
        }
        if (!$content) {
            return $this->result(-1, '请传入评论内容', []);
        }

        $result = false;
        $time = time();
        $result = pdo_insert('longbing_card_timeline_comment', [
            'user_id' => $uid,
            'uniacid' => $uniacid,
            'content' => $content,
            'timeline_id' => $id,
            'create_time' => $time,
            'update_time' => $time,
        ]);
        $this->insertView($uid, $to_uid, 5, $_W['uniacid'], $id);
        if ($result) {
            return $this->result(0, '评论成功', []);
        } else {
            return $this->result(-1, '评论失败', []);
        }
    }

    /**
     * 公司动态详情
     * @access public
     * @return json
     */
    public function doPageTimelineDetail()
    {
        $this->cross();
        global $_GPC, $_W;
        $uniacid = $_W['uniacid'];
        $uid = $_GPC['user_id'];
        $id = $_GPC['id'];
        $to_uid = $_GPC['to_uid'];
        if (!$uid || (!$to_uid && $to_uid != 0)) {
            return $this->result(-1, '请求参数错误', []);
        }

        if (!$id) {
            return $this->result(-1, '请传入动态id', []);
        }
        if (!$uid) {
            return $this->result(-1, '请传入id', []);
        }

        $info = pdo_get('longbing_card_timeline', ['id' => $id]);

        $arr = explode(',', $info['cover']);
        $tmp = [];
        foreach ($arr as $k => $v) {
            array_push($tmp, tomedia($v));
        }
        $info['cover'] = $tmp;

        if ($info['user_id']) {
            $user = pdo_get('longbing_card_user_info', ['fans_id' => $info['user_id']]);
            $user['avatar'] = tomedia($user['avatar']);
            $info['info'] = $user;
        }

        $this->insertView($uid, $to_uid, 7, $_W['uniacid'], $id);


        $content = $info['content'];


        $info['content'] = $this->toWXml($content);

        return $this->result(0, '成功', $info);
    }

    /**
     * 解析html代为微信小程序格式 jingshuixian
     */
    protected function toWXml($content, $is_decode = true)
    {
        $this->cross();
        if ($is_decode) {
            $content = htmlspecialchars_decode($content);
        }

        if ($content != strip_tags($content)) {
        } else {
            $content = '<p><span style="color: rgb(0, 0, 0);">' . $content . '</span></p>';
        }

        $towxml = new ToWXML();
        $json = $towxml->towxml($content, array(
            'type' => 'html',
            'highlight' => true,
            'linenums' => true,
            'imghost' => null,
            'encode' => false,
            'highlight_languages' => array('html', 'js', 'php', 'css')
        ));
        return $json;
    }

    /**
     * 获取名片的小程序码
     * @access public
     * @return json
     */
    public function doPageQr()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid    = $_GPC['user_id'];
        $to_uid = $_GPC['to_uid'];
        $info   = pdo_get('longbing_card_user', ['id' => $to_uid]);
        if (empty($info)) {
            return $this->result(-1, '未找到名片信息', []);
        }

        if ($info['qr_path']) {
            @$size = filesize(ATTACHMENT_ROOT . '/' . $info['qr_path']);

            if ($size > 51220)  // 大于5k, 用户判断图片是否正确
            {
                $image = $this->transImage($info['qr_path']);
                //jingshuixian 名片码被删除以后,返回值错误问题
                if ($image != 'https://' && $image != 'http://') {
                    return $this->result(0, '请求成功_1', ['image' => $image]);
                }
            }
        }
        if (!$to_uid && $to_uid !== 0 && $to_uid !== '0') {
            return $this->result(-1, '请传入名片id', []);
        }


//        @require_once(IA_ROOT . '/framework/function/file.func.php');
        load()->func('file');

        if (!is_dir(ATTACHMENT_ROOT . '/' . "images")) {
            mkdir(ATTACHMENT_ROOT . '/' . "images");
        }
        if (!is_dir(ATTACHMENT_ROOT . '/' . "images/longbing_card")) {
            mkdir(ATTACHMENT_ROOT . '/' . "images/longbing_card");
        }
        if (!is_dir(ATTACHMENT_ROOT . '/' . "images/longbing_card/{$_W['uniacid']}/")) {
            mkdir(ATTACHMENT_ROOT . '/' . "images/longbing_card/{$_W['uniacid']}/");
        }
        //jingshuixian  定义上传目录
        $destination_folder = ATTACHMENT_ROOT . '/images' . "/longbing_card/{$_W['uniacid']}";
        $image              = $destination_folder . '/' . $_W['uniacid'] . '-' . $to_uid . 'qr.png';
        $path               = "longbing_card/pages/index/index?to_uid={$to_uid}&currentTabBar=toCard&is_qr=1";
        $res                = $this->createQr($image, $path);
        if ($res != true) {
            return $this->result(-1, '请求失败', []);
        }
        $image = tomedia('images' . "/longbing_card/{$_W['uniacid']}/" . $_W['uniacid'] . '-' . $to_uid . 'qr.png');

        if (!strstr($image, 'ttp')) {
            $image = 'https://' . $image;
        }

        pdo_update('longbing_card_user', ['qr_path' => 'images' . "/longbing_card/{$_W['uniacid']}/" . $_W['uniacid'] . '-' . $to_uid . 'qr.png'], ['id' => $to_uid]);

        $image = $this->transImage($image);
        return $this->result(0, '请求成功_2', ['image' => $image]);
    }

    /**
     * 获取商品的小程序码
     * @access public
     * @return json
     */
    public function doPageGoodsQr()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $to_uid = $_GPC['to_uid'];
        $id = $_GPC['id'];
        $info = pdo_get('longbing_card_goods', ['id' => $id]);
        if (empty($info))
        {
            return $this->result(-1, '未找到信息', []);
        }
        if (!$to_uid && $to_uid !== 0 && $to_uid !== '0')
        {
            return $this->result(-1, '请传入名片id', []);
        }

//        @require_once(IA_ROOT . '/framework/function/file.func.php');
        load()->func('file');


        if (!is_dir(ATTACHMENT_ROOT . '/' . "images"))
        {
            mkdir(ATTACHMENT_ROOT . '/' . "images");
        }
        if (!is_dir(ATTACHMENT_ROOT . '/' . "images/longbing_card"))
        {
            mkdir(ATTACHMENT_ROOT . '/' . "images/longbing_card");
        }
        if (!is_dir(ATTACHMENT_ROOT . '/' . "images/longbing_card/{$_W['uniacid']}/"))
        {
            mkdir(ATTACHMENT_ROOT . '/' . "images/longbing_card/{$_W['uniacid']}/");
        }
        //jingshuixian  定义上传目录
        $destination_folder = 'images' . "/longbing_card/{$_W['uniacid']}";

        $image = $destination_folder . '/' . $_W['uniacid'] . '-goods-' . $id . 'qr.png';
        $image2 = $destination_folder . '/' . $_W['uniacid'] . '-goods-' . $id . '.png';




        if (file_exists(ATTACHMENT_ROOT . $image))
        {
            @$size = filesize(ATTACHMENT_ROOT . $image);
            if ($size < 51220)  // 大于5k, 用户判断图片是否正确
            {
                $path = "longbing_card/pages/shop/detail/detail?id={$id}&to_uid={$to_uid}";
                $res  = $this->createQr(ATTACHMENT_ROOT . $image, $path);
                if ($res != true) {
                    return $this->result(-1, '请求失败', []);
                }
            }
        }
        else
        {
            $path = "longbing_card/pages/shop/detail/detail?id={$id}&to_uid={$to_uid}";
            $res  = $this->createQr(ATTACHMENT_ROOT . $image, $path);
            if ($res != true) {
                return $this->result(-1, '请求失败', []);
            }
        }

        $url = $_W['siteroot'] . $_W['config']['upload']['attachdir'] . '/' . $image;


        if (file_exists(ATTACHMENT_ROOT . $image2))
        {
            @$size2 = filesize(ATTACHMENT_ROOT . $image2);
            if ($size < 51220)  // 大于5k, 用户判断图片是否正确
            {
                $path  = tomedia($info['cover']);
                $files = file_get_contents($path);
                file_put_contents(ATTACHMENT_ROOT . $image2, $files);
            }
        }
        else
        {
            $path  = tomedia($info['cover']);
            $files = file_get_contents($path);
            file_put_contents(ATTACHMENT_ROOT . $image2, $files);
        }


        $urlCover = $_W['siteroot'] . $_W['config']['upload']['attachdir'] . '/' . $image2;
        return $this->result(0, '请求成功_2', ['image' => $url, 'cover' => $urlCover]);
    }

    protected function createQr($image, $path)
    {


//        $appid = $_W['account']['key'];
//        $appsecret = $_W['account']['secret'];
//
//        $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={$appid}&secret={$appsecret}";
//        $data = ihttp_get($url);
//        $data = json_decode($data['content'], true);
//        if (!isset($data['access_token'])) {
//            return createQr2($image, $path, $_W['uniacid']);
//        }
//        $access_token = $data['access_token'];
//
//        $url = "https://api.weixin.qq.com/wxa/getwxacode?access_token={$access_token}";
////    $page = "longbing_card/chat/staffChat/staffChat?is_tpl=1&to_uid={$uid}";
//        $postData = [
//            'path' => $path,
//        ];
//        $postData = json_encode($postData);
//
//        $response = ihttp_post($url, $postData);
//
//        if (strlen($response['content']) > 200)
//        {
//            $res = file_put_contents($image, $response['content']);
//            return true;
//        }
//        return createQr2($image, $path, $_W['uniacid']);




//        @require_once(IA_ROOT . '/framework/function/file.func.php');
        load()->func('file');
        global $_GPC, $_W;
        $account_api = WeAccount::create();
        $response = $account_api
            ->getCodeLimit($path, 430, array(
                'auto_color' => false,
                'line_color' => array(
                    'r' => '0',
                    'g' => '0',
                    'b' => '0',
                ),
            ));
        if (!is_error($response)) {
            $res = file_put_contents($image, $response);
            return $res;
        } else {
            $cachekey = cache_system_key('accesstoken_key', array('key' => $_W['account']['key']));
            cache_delete($cachekey);
            return false;
        }
    }

    /**
     * 分享名片记录
     * @access public
     * @return json
     */
    public function doPageRecord()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $to_uid = $_GPC['to_uid'];
        if ($uid == $to_uid || $to_uid == 0) {
            return $this->result(0, '', []);
        }
        if ($to_uid && $to_uid > 0) {
            $time = time();
            //            $data = [
            //                'uid' => $uid,
            //                'uniacid' => $_W['uniacid'],
            //                'to_uid' => $to_uid,
            //                'type' => 4,
            //                'create_time' => $time,
            //                'update_time' => $time,
            //            ];
            //            $result = pdo_insert('longbing_card_praise', $data);
            $data = [
                'user_id' => $uid,
                'to_uid' => $to_uid,
                'type' => 4,
                'uniacid' => $_W['uniacid'],
                'target' => '',
                'sign' => 'praise',
                'scene' => $_GPC['scene'],
                'create_time' => $time,
                'update_time' => $time,
            ];
            $result = pdo_insert('longbing_card_count', $data);
            if ($result) {
                return $this->result(0, '', []);
            } else {
                return $this->result(0, '', []);
            }
        } else {
            return $this->result(0, '', []);
        }
    }

    /**
     * 操作名片内容记录
     * @access public
     * @return json
     */
    public function doPageCopyRecord()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $to_uid = $_GPC['to_uid'];
        $type = $_GPC['type'];

        if ($uid == $to_uid || $to_uid == 0 || !$type) {
            return $this->result(-1, '', []);
        }

        if ($to_uid && $to_uid > 0) {
            $time = time();
            //            $data = [
            //                'user_id' => $uid,
            //                'uniacid' => $_W['uniacid'],
            //                'to_uid' => $to_uid,
            //                'type' => $type,
            //                'create_time' => $time,
            //                'update_time' => $time,
            //            ];
            //            $result = pdo_insert('longbing_card_copy_count', $data);
            $data = [
                'user_id' => $uid,
                'to_uid' => $to_uid,
                'type' => $type,
                'uniacid' => $_W['uniacid'],
                'target' => '',
                'sign' => 'copy',
                'scene' => $_GPC['scene'],
                'create_time' => $time,
                'update_time' => $time,
            ];
            $result = pdo_insert('longbing_card_count', $data);

            if ($result) {
                return $this->result(0, '', []);
            }
        }
        return $this->result(-1, '', []);

    }

    /**
     * formId记录
     * @access public
     * @return json
     */
    public function doPageFormid()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $formId = $_GPC['formId'];

        if (!$uid || !$formId) {
            return $this->result(-1, '1', []);
        }

        if ($formId == 'the formId is a mock one') {
            return $this->result(0, '', []);
        }

        $time = time();
        $data = [
            'user_id' => $uid,
            'uniacid' => $_W['uniacid'],
            'formId' => $formId,
            'create_time' => $time,
            'update_time' => $time,
        ];
        $result = pdo_insert('longbing_card_formId', $data);
        if ($result) {
            return $this->result(0, '', []);
        }

        return $this->result(-1, '2', []);
    }

    public function doPageImage()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $to_uid = $_GPC['to_uid'];
        $imgUrl = $_GPC['imgUrl'];
        //        $imgUrl = 'http://pb14gmv45.bkt.clouddn.com/12-2-950531535508982qr.png';
        load()->func('file');
        $res = file_remote_attach_fetch($imgUrl);
        $res = tomedia($res);
        $res = str_replace('ttp://', 'ttps://', $res);

        if (!strstr($res, 'ttps://')) {
            $res = 'https://' . $res;
        }

        return $this->result(0, '请求成功', ['image' => $res]);
    }

    /**
     * 记录用户授权手机号码
     * @access public
     * @return json
     */
    public function doPagePhone()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $to_uid = $_GPC['to_uid'];
        //        $phone = $_GPC['phone'];
        $uniacid = $_W['uniacid'];
        $encryptedData = $_GPC['encryptedData'];
        $iv = $_GPC['iv'];
        $code = $_GPC['code'];

        if (!$uid || !$to_uid) {
            return $this->result(-1, '', []);
        }


        $appid = $_W['account']['key'];
        $appsecret = $_W['account']['secret'];

        $url = "https://api.weixin.qq.com/sns/jscode2session?appid={$appid}&secret={$appsecret}&js_code=$code&grant_type=authorization_code";

        $info = ihttp_get($url);
        $infoTmp = $info;
        $info = json_decode($info['content'], true);

        if (!isset($info['session_key'])) {
            return $this->result(-1, 'session_key2', $infoTmp);
        }
        $session_key = $info['session_key'];

        include_once "wxBizDataCrypt.php";
        $pc = new WXBizDataCrypt($appid, $session_key);
        $errCode = $pc->decryptData($encryptedData, $iv, $data);

        if ($errCode == 0) {
            $data = json_decode($data, true);

            $phone = $data['purePhoneNumber'];
        } else {
            return $this->result(-1, $errCode, []);
        }


        $info = pdo_get('longbing_card_user_phone', ['user_id' => $uid, 'phone' => $phone, 'to_uid' => $to_uid, 'uniacid' => $uniacid]);
        if ($info) {
            return $this->result(0, '请求成功', ['phone' => $phone]);
        }
        $time = time();
        $data = [
            'user_id' => $uid,
            'to_uid' => $to_uid,
            'phone' => $phone,
            'uniacid' => $uniacid,
            'create_time' => $time,
            'update_time' => $time,
        ];
        $result = pdo_insert('longbing_card_user_phone', $data);
        if ($result) {
            return $this->result(0, '', ['phone' => $phone]);
        }

        return $this->result(-1, '1', []);
    }

    /**
     * 获取用户授权手机号码
     * @access public
     * @return json
     */
    public function doPageUserPhone()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $uniacid = $_W['uniacid'];

        if (!$uid) {
            return $this->result(-1, '', []);
        }

        $result = pdo_get('longbing_card_user_phone', ['user_id' => $uid, 'uniacid' => $uniacid]);
        if ($result) {
            return $this->result(0, '', $result);
        }

        return $this->result(0, '未找到数据', []);
    }

    /**
     * 雷达--时间排序
     * @access public
     * @return json
     */
    public function doPageAiTime()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $uniacid = $_W['uniacid'];

        $staff_id = $_GPC['staff_id'];
        if ($staff_id) {
            $uid = $staff_id;
        }

        if (!$uid) {
            return $this->result(-1, '1', []);
        }

        $limit = array(1, $this->limit);
        $curr = 1;
        if (isset($_GPC['page'])) {
            $limit[0] = $_GPC['page'];
            $curr = $_GPC['page'];
        }
        $info = pdo_getslice('longbing_card_count', ['uniacid' => $uniacid, 'to_uid' => $uid, 'user_id !=' => $uid], $limit, $count, [], '', ['id desc']);

        foreach ($info as $k => $v) {
            $user = pdo_get('longbing_card_user', ['id' => $v['user_id']]);
            $client = pdo_get('longbing_card_client_info', ['user_id' => $v['user_id'], 'staff_id' => $uid]);
            $info[$k]['user'] = $user;
            $info[$k]['name'] = $client['name'] ? $client['name'] : $user['nickName'];

            $phone = pdo_get('longbing_card_user_phone', ['user_id' => $v['user_id']]);
            $info[$k]['phone'] = $phone ? $phone['phone'] : '';

            if ($v['target'])
            {
                $lists = pdo_getall('longbing_card_count', ['uniacid' => $uniacid, 'to_uid' => $uid, 'sign' => $v['sign'], 'type' => $v['type'], 'id <=' => $v['id'], 'user_id' => $v['user_id'], 'target' => $v['target']], [], '', 'id asc');
            }
            else
            {
                $lists = pdo_getall('longbing_card_count', ['uniacid' => $uniacid, 'to_uid' => $uid, 'sign' => $v['sign'], 'type' => $v['type'], 'id <=' => $v['id'], 'user_id' => $v['user_id']], [], '', 'id asc');
            }


            $info[$k]['count'] = count($lists);

            if (($v['sign'] == 'view' && $v['type'] == 2) || ($v['sign'] == 'view' && $v['type'] == 7)) {
                if ($v['type'] == 2) {
                    $target_info = pdo_get('longbing_card_goods', ['id' => $v['target']]);
                    $info[$k]['target_name'] = $target_info['name'];
                } else {
                    $target_info = pdo_get('longbing_card_timeline', ['id' => $v['target']]);
                    $info[$k]['target_name'] = $target_info['title'];
                }
            }
        }

        $data = [
            'page' => $curr,
            'total_page' => ceil($count / $this->limit),
            'list' => $info,
        ];
        return $this->result(0, '请求成功', $data);
    }

    /**
     * 雷达--行为
     * @access public
     * @return json
     */
    public function doPageAiBehaviorHeader()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $uniacid = $_W['uniacid'];
        $type = $_GPC['type'];
        if (!$uid) {
            return $this->result(-1, '1', []);
        }

        $beginTime = mktime(0, 0, 0, date('m'), date('d') - 7, date('Y'));

        if ($type == 2) {
            $beginTime = mktime(0, 0, 0, date('m'), date('d') - 30, date('Y'));
        }

        $view_goods_count = pdo_fetchall("SELECT count(to_uid) FROM " . tablename('longbing_card_count') . " where to_uid = {$uid} && create_time > {$beginTime} && uniacid = {$uniacid} && `type` = 2 && sign='view'");
        $view_goods_count = $view_goods_count[0]['count(to_uid)'];

        $view_web_count = pdo_fetchall("SELECT count(to_uid) FROM " . tablename('longbing_card_count') . " where to_uid = {$uid} && create_time > {$beginTime} && uniacid = {$uniacid} && `type` = 6 && sign='view'");
        $view_web_count = $view_web_count[0]['count(to_uid)'];

        $copy_wechat_count = pdo_fetchall("SELECT count(to_uid) FROM " . tablename('longbing_card_count') . " where to_uid = {$uid} && create_time > {$beginTime} && uniacid = {$uniacid} && `type` = 4 && sign='copy'");
        $copy_wechat_count = $copy_wechat_count[0]['count(to_uid)'];

        $share_card_count = pdo_fetchall("SELECT count(to_uid) FROM " . tablename('longbing_card_count') . " where to_uid = {$uid} && create_time > {$beginTime} && uniacid = {$uniacid} && `type` = 4 && sign='praise'");
        $share_card_count = $share_card_count[0]['count(to_uid)'];

        $data['view_goods_count'] = $view_goods_count;
        $data['view_web_count'] = $view_web_count;
        $data['copy_wechat_count'] = $copy_wechat_count;
        $data['share_card_count'] = $share_card_count;

        //        echo '<pre>';
        //        var_dump($data);
        //        echo '</pre>';
        return $this->result(0, '请求成功', $data);
    }

    /**
     * 雷达--行为
     * @access public
     * @return json
     */
    public function doPageAiBehaviorOther()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $uniacid = $_W['uniacid'];
        $type = $_GPC['type'];
        if (!$uid) {
            return $this->result(-1, '1', []);
        }

        $beginTime = mktime(0, 0, 0, date('m'), date('d') - 7, date('Y'));
        if ($type == 2) {
            $beginTime = mktime(0, 0, 0, date('m'), date('d') - 30, date('Y'));
        }

        $view_card_count = pdo_fetchall("SELECT count(to_uid) FROM " . tablename('longbing_card_count') . " where to_uid = {$uid} && uniacid = {$uniacid} && `type` = 2 && user_id != {$uid} && sign='praise' && create_time > {$beginTime}");
        $view_card_count = $view_card_count[0]['count(to_uid)'];

        $view_timeline_count = pdo_fetchall("SELECT count(to_uid) FROM " . tablename('longbing_card_count') . " where to_uid = {$uid} && uniacid = {$uniacid} && `type` = 7 && sign='view' && create_time > {$beginTime}");
        $view_timeline_count = $view_timeline_count[0]['count(to_uid)'];

        $phone_count = pdo_fetchall("SELECT count(to_uid) FROM " . tablename('longbing_card_user_phone') . " where to_uid = {$uid} && uniacid = {$uniacid} && create_time > {$beginTime}");
        $phone_count = $phone_count[0]['count(to_uid)'];

        $ask_goods_count = pdo_fetchall("SELECT count(to_uid) FROM " . tablename('longbing_card_count') . "  where to_uid = {$uid} && uniacid = {$uniacid} && `type` = 8 && sign='copy' && create_time > {$beginTime}");
        $ask_goods_count = $ask_goods_count[0]['count(to_uid)'];

        $save_phone_count = pdo_fetchall("SELECT count(to_uid) FROM " . tablename('longbing_card_count') . "  where to_uid = {$uid} && uniacid = {$uniacid} && `type` = 1 && sign='copy' && create_time > {$beginTime}");
        $save_phone_count = $save_phone_count[0]['count(to_uid)'];

        $thumbs_count = pdo_fetchall("SELECT count(to_uid) FROM " . tablename('longbing_card_count') . " where to_uid = {$uid} && uniacid = {$uniacid} && `type` = 3 && user_id != {$uid} && sign='praise' && create_time > {$beginTime}");
        $thumbs_count = $thumbs_count[0]['count(to_uid)'];

        $call_phone_count = pdo_fetchall("SELECT count(to_uid) FROM " . tablename('longbing_card_count') . "  where to_uid = {$uid} && uniacid = {$uniacid} && `type` = 2 && sign='copy' && create_time > {$beginTime}");
        $call_phone_count = $call_phone_count[0]['count(to_uid)'];

        $play_voice_count = pdo_fetchall("SELECT count(to_uid) FROM " . tablename('longbing_card_count') . " where to_uid = {$uid} && uniacid = {$uniacid} && `type` = 9 && sign='copy' && create_time > {$beginTime}");
        $play_voice_count = $play_voice_count[0]['count(to_uid)'];

        $copy_email_count = pdo_fetchall("SELECT count(to_uid) FROM " . tablename('longbing_card_count') . " where to_uid = {$uid} && uniacid = {$uniacid} && `type` = 5 && sign='copy' && create_time > {$beginTime}");
        $copy_email_count = $copy_email_count[0]['count(to_uid)'];

        $data['view_card_count'] = $view_card_count;
        $data['view_timeline_count'] = $view_timeline_count;
        $data['phone_count'] = $phone_count;
        $data['ask_goods_count'] = $ask_goods_count;
        $data['save_phone_count'] = $save_phone_count;
        $data['thumbs_count'] = $thumbs_count;
        $data['call_phone_count'] = $call_phone_count;
        $data['play_voice_count'] = $play_voice_count;
        $data['copy_email_count'] = $copy_email_count;

        return $this->result(0, '请求成功', $data);
    }

    /**
     * 聊天列表
     * @access public
     * @return json
     */
    public function doPageChat()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $uniacid = $_W['uniacid'];

        if (!$uid) {
            return $this->result(-1, '1', []);
        }

        $chat = pdo_fetchall("SELECT id,user_id,target_id,create_time FROM " . tablename('longbing_card_chat') . " where (user_id = {$uid} && target_id != {$uid}) OR (user_id != {$uid} && target_id = {$uid})");

        foreach ($chat as $k => $v) {
            if ($v['user_id'] == $uid) {
                $tid = $v['target_id'];
            } else {
                $tid = $v['user_id'];
            }
            $user = pdo_get('longbing_card_user', ['id' => $tid], ['nickName', 'avatarUrl']);
            $chat[$k]['user'] = $user;

            $phone = pdo_get('longbing_card_user_phone', ['user_id' => $tid]);
            $chat[$k]['phone'] = $phone ? $phone['phone'] : 0;

            $message_not_read_count = pdo_fetchall("SELECT count(chat_id),create_time FROM " . tablename('longbing_card_message') . " where chat_id = {$v['id']} && status = 1 && target_id = {$uid} ORDER BY create_time");
            $chat[$k]['message_not_read_count'] = $message_not_read_count[0]['count(chat_id)'];
            $last_message = pdo_getall('longbing_card_message', ['chat_id' => $v['id']], [], '', ['create_time desc'], 1);
            $chat[$k]['last_message'] = '';
            if ($last_message) {
                $chat[$k]['last_message'] = $last_message[0]['content'];
                $chat[$k]['last_time'] = $last_message[0]['create_time'];
                $chat[$k]['type'] = $last_message[0]['message_type'];
            }

        }
        $tmp = [];
        foreach ($chat as $k => $v) {
            if ($v['last_message'])
                array_push($tmp, $v);
        }
        array_multisort(array_column($tmp, 'last_time'), SORT_DESC, $tmp);

        $data = [
            'page' => 1,
            'total_page' => 1,
            'list' => $tmp,
        ];

        return $this->result(0, '请求成功', $data);
    }

    /**
     * 聊天记录 -- 按照记录时间倒序排序
     * @access public
     * @return json
     */
    public function doPageMessages()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $chat_id = $_GPC['chat_id'];

        $uniacid = $_W['uniacid'];

        if (!$uid || !$chat_id) {
            return $this->result(-1, '1', []);
        }

        $create_time = false;
        if (isset($_GPC['create_time'])) {
            $create_time = $_GPC['create_time'];
        }

        if ($create_time) {
            $messages = pdo_fetchall("SELECT id,user_id,target_id,create_time,content,status,message_type as `type` FROM " . tablename('longbing_card_message') . " WHERE chat_id = {$chat_id} && id < {$create_time} ORDER BY id DESC LIMIT 10");
        } else {
            $messages = pdo_fetch("SELECT id,user_id,target_id,create_time,content,status,message_type as `type` FROM " . tablename('longbing_card_message') . " WHERE chat_id = {$chat_id} && target_id = {$uid} && status = 1 ORDER BY id ASC LIMIT 1");
            if (empty($messages)) {
                $messages = pdo_fetchall("SELECT id,user_id,target_id,create_time,content,status,message_type as `type` FROM " . tablename('longbing_card_message') . " WHERE chat_id = {$chat_id} ORDER BY create_time DESC LIMIT 10");
            } else {
                $messages = pdo_fetchall("SELECT id,user_id,target_id,create_time,content,status,message_type as `type` FROM " . tablename('longbing_card_message') . " WHERE chat_id = {$chat_id} && id >= {$messages['id']} ORDER BY create_time DESC");
                pdo_update('longbing_card_message', ['status' => 2], ['chat_id' => $chat_id, 'target_id' => $uid]);
            }
        }

        $create_time = 0;
        if ($messages) {
            $create_time = $messages[count($messages) - 1]['id'];
            $create_time2 = $messages[count($messages) - 1]['create_time'];
        }

        if (LONGBING_AUTH_MESSAGE) {
            $b = mktime(0, 0, 0, date('m'), date('d') - LONGBING_AUTH_MESSAGE, date('Y'));

            if ($b > $create_time2 && $create_time2 > 0) {
                $messages = [];
            }
        }

        foreach ($messages as $index => $item)
        {
            if ($item['type'] == '')
            {
                $messages[$index]['type'] = 'text';
            }
        }

        $data = [
            'list' => $messages,
            'create_time' => $create_time,
        ];

        return $this->result(0, '请求成功', $data);
    }

    /**
     * 获取会话id
     * @access public
     * @return json
     */
    public function doPageChatId()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $to_uid = $_GPC['to_uid'];
        $uniacid = $_W['uniacid'];

        if (!$uid || !$to_uid) {
            return $this->result(-1, '1', []);
        }

        $check1 = pdo_get('longbing_card_chat', ['user_id' => $uid, 'target_id' => $to_uid]);

        if ($check1) {
            $user_info = pdo_get('longbing_card_user', ['id' => $uid], ['nickName', 'avatarUrl']);
            $target_info = pdo_get('longbing_card_user', ['id' => $to_uid], ['nickName', 'avatarUrl']);
            return $this->result(0, '请求成功', [
                'chat_id' => $check1['id'],
                'user_info' => $user_info,
                'target_info' => $target_info,
            ]);
        }

        $check2 = pdo_get('longbing_card_chat', ['user_id' => $to_uid, 'target_id' => $uid]);

        if ($check2) {
            $user_info = pdo_get('longbing_card_user', ['id' => $uid], ['nickName', 'avatarUrl']);
            $target_info = pdo_get('longbing_card_user', ['id' => $to_uid], ['nickName', 'avatarUrl']);
            return $this->result(0, '请求成功', [
                'chat_id' => $check2['id'],
                'user_info' => $user_info,
                'target_info' => $target_info,
            ]);
        }

        $data = [
            'user_id' => $uid,
            'target_id' => $to_uid,
            'uniacid' => $uniacid,
            'create_time' => time(),
            'update_time' => time(),
        ];
        $result = pdo_insert('longbing_card_chat', $data);
        if ($result) {
            $insertid = pdo_insertid();
            $user_info = pdo_get('longbing_card_user', ['id' => $uid], ['nickName', 'avatarUrl']);
            $target_info = pdo_get('longbing_card_user', ['id' => $to_uid], ['nickName', 'avatarUrl']);
            return $this->result(0, '请求成功', [
                'chat_id' => $insertid,
                'user_info' => $user_info,
                'target_info' => $target_info,
            ]);
        }
        return $this->result(-1, '1', []);
    }

    /**
     * 推广统计
     * @access public
     * @return json
     */
    public function doPageExtensionStatistics()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $uniacid = $_W['uniacid'];


        if (!$uid) {
            return $this->result(-1, '1', []);
        }

        $type = $_GPC['type'];//    1=>今日数据; 2=>近七天数据; 3=>近30天数据; 4=>本月数据;

        if (!$type) {
            $type = 3;
        }

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
            default://  1=>今日数据
                // 今天开始的的时间戳
                $beginTime = mktime(0, 0, 0, date('m'), date('d'), date('Y'));
            // 今天结束的时间戳
            //                $endTime = mktime(0, 0, 0, date('m'), date('d') + 1, date('Y')) - 1;
        }

        $timeline = pdo_getall('longbing_card_timeline', ['user_id' => $uid]);
        if (empty($timeline)) {
            $data['timeline'] = [
                'count' => 0,
                'last_time' => 0,
            ];
        } else {
            $ids = '';
            foreach ($timeline as $k => $v) {
                $ids .= ',' . $v['id'];
            }
            $ids = trim($ids, ',');
            if (count($timeline) > 1) {
                $ids = '(' . $ids . ')';
                $view_timeline_count = pdo_fetchall("SELECT count(to_uid),create_time FROM " . tablename('longbing_card_count') . " where to_uid = {$uid} && uniacid = {$uniacid} && `type` = 7 && create_time > {$beginTime} && sign='view' && target in {$ids} ORDER BY id DESC");
            } else {
                $view_timeline_count = pdo_fetchall("SELECT count(to_uid),create_time FROM " . tablename('longbing_card_count') . " where to_uid = {$uid} && uniacid = {$uniacid} && `type` = 7 && create_time > {$beginTime} && sign='view' && target = {$ids} ORDER BY id DESC");
            }

            $view_timeline_last_time = $view_timeline_count[0]['create_time'];
            $view_timeline_count = $view_timeline_count[0]['count(to_uid)'];
            $data['timeline'] = [
                'count' => $view_timeline_count,
                'last_time' => $view_timeline_last_time ? $view_timeline_last_time : 0,
            ];
        }

        $extension = pdo_getall('longbing_card_extension', ['user_id' => $uid], ['goods_id']);

        if (empty($extension) && false) {
            $data['extension'] = [
                'count' => 0,
                'last_time' => 0,
            ];
        } else {
            $ids = '';
            foreach ($extension as $k => $v) {
                $ids .= $v['goods_id'];
            }
            $ids = trim($ids, ',');

            if (count($extension) > 1) {
                //                $ids = '(' . $ids . ')';
                //                $view_goods_count = pdo_fetchall("SELECT count(to_uid) FROM " . tablename('longbing_card_count') ." where to_uid = {$uid} && uniacid = {$uniacid} && `type` = 2 && create_time > {$beginTime} && target in $ids && sign='view' ORDER BY id DESC");
                $view_goods_count = pdo_fetchall("SELECT count(to_uid) FROM " . tablename('longbing_card_count') . " where to_uid = {$uid} && uniacid = {$uniacid} && `type` = 2 && create_time > {$beginTime} && sign='view' ORDER BY id DESC");
                $view_goods_last_time = $view_goods_count[0]['create_time'];
                $view_goods_count = $view_goods_count[0]['count(to_uid)'];

            } else {
                //                $view_goods_count = pdo_fetchall("SELECT count(to_uid) FROM " . tablename('longbing_card_count') ." where to_uid = {$uid} && create_time > {$beginTime} && uniacid = {$uniacid} && `type` = 2 && target = $ids && sign='view' ORDER BY id DESC");
                $view_goods_count = pdo_fetchall("SELECT create_time FROM " . tablename('longbing_card_count') . " where to_uid = {$uid} && create_time > {$beginTime} && uniacid = {$uniacid} && `type` = 2 && sign='view' ORDER BY id DESC");
                $view_goods_last_time = $view_goods_count[0]['create_time'];
                $view_goods_count = count($view_goods_count);
            }
            $data['extension'] = [
                'count' => $view_goods_count,
                'last_time' => $view_goods_last_time,
            ];
        }

        $view_card_count = pdo_fetchall("SELECT count(staff_id),create_time FROM " . tablename('longbing_card_custom_qr_record') . " where staff_id = {$uid} && uniacid = {$uniacid} && user_id != {$uid} && create_time > {$beginTime} ORDER BY id DESC");
        $view_card_last_time = $view_card_count[0]['create_time'];
        $view_card_count = $view_card_count[0]['count(to_uid)'];

        $data['card'] = [
            'count' => $view_card_count,
            'last_time' => $view_card_last_time ? $view_card_last_time : 0,
        ];

        $count = pdo_fetchall("SELECT create_time FROM " . tablename('longbing_card_count') . " where to_uid = {$uid} && user_id != {$uid} && create_time > {$beginTime} && uniacid = {$uniacid} && `type` = 2 && sign='praise' ORDER BY id DESC");
        $count = count($count);
        $last_time = $count[0]['$beginTime'] ? $count[0]['$beginTime'] : 0;
        if ($last_time > $data['card']['last_time']) {
            $data['card']['last_time'] = $last_time;
        }
        $data['card']['count'] += $count;

        return $this->result(0, '', $data);
    }

    /**
     * 员工设置/取消主推产品
     * @access public
     * @return json
     */
    public function doPageExtension()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $goods_id = $_GPC['goods_id'];
        $uniacid = $_W['uniacid'];

        if (!$uid || !$goods_id) {
            return $this->result(-1, '请传入参数', []);
        }

        $check = pdo_get('longbing_card_extension', [
            'uniacid' => $uniacid,
            'user_id' => $uid,
            'goods_id' => $goods_id,
        ]);

        $result = false;
        $time = time();
        if ($check) {
            $result = pdo_delete('longbing_card_extension', [
                'uniacid' => $uniacid,
                'user_id' => $uid,
                'goods_id' => $goods_id,
            ]);
        } else {
            $result = pdo_insert('longbing_card_extension', [
                'user_id' => $uid,
                'uniacid' => $uniacid,
                'goods_id' => $goods_id,
                'create_time' => $time,
                'update_time' => $time,
            ]);
        }

        if ($result) {
            return $this->result(0, '请求成功', []);
        } else {
            return $this->result(-1, '请求失败', []);
        }
    }

    /**
     * 员工商品列表
     * @access public
     * @return json
     */
    public function doPageExtensions()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];

        if (!$uid) {
            return $this->result(-1, '请求参数错误', []);
        }

        $limit = array(1, $this->limit);

        $curr = 1;
        if (isset($_GPC['page'])) {
            $limit[0] = $_GPC['page'];
            $curr = $_GPC['page'];
        }

        $info = pdo_getslice('longbing_card_goods', ['uniacid' => $_W['uniacid'], 'status' => 1], $limit, $count, ['id', 'name', 'cover', 'price'], '', ['top desc']);

        $extension = pdo_getall('longbing_card_extension', ['user_id' => $uid], ['goods_id']);
        $ids = [];
        foreach ($extension as $k => $v) {
            array_push($ids, $v['goods_id']);
        }
        foreach ($info as $k => $v) {
            $info[$k]['cover'] = tomedia($v['cover']);
            $info[$k]['is_extension'] = 0;
            if (!empty($ids)) {
                if (in_array($v['id'], $ids)) {
                    $info[$k]['is_extension'] = 1;
                }
            }
        }
        $data = [
            'page' => $curr,
            'total_page' => ceil($count / $this->limit),
            'list' => $info,
        ];
        return $this->result(0, '请求成功', $data);
    }

    /**
     * 员工主推商品列表
     * @access public
     * @return json
     */
    public function doPageExtensionsSelf()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $to_uid = $_GPC['to_uid'];

        if (!$uid || !$to_uid) {
            return $this->result(-1, '请求参数错误', []);
        }

        $limit = array(1, $this->limit);

        $curr = 1;
        if (isset($_GPC['page'])) {
            $limit[0] = $_GPC['page'];
            $curr = $_GPC['page'];
        }

        $extension = pdo_getall('longbing_card_extension', ['user_id' => $to_uid], ['goods_id']);
        if (empty($extension)) {
            return $this->result(0, '请求成功', []);
        }
        $ids = [];
        foreach ($extension as $k => $v) {
            array_push($ids, $v['goods_id']);
        }
        $ids = implode(',', $ids);
        if (count($extension) > 1) {
            $ids = '(' . $ids . ')';
            $sql = "SELECT id,`name`,cover,price,status FROM " . tablename('longbing_card_goods') . " WHERE id IN {$ids} ORDER BY top DESC";
        } else {
            $sql = "SELECT id,`name`,cover,price,status FROM " . tablename('longbing_card_goods') . " WHERE id = {$ids} ORDER BY top DESC";
        }

        $goods = pdo_fetchall($sql);
        $tmp = [];
        foreach ($goods as $k => $v) {
            if ($v['status'] == 1) {
                $goods[$k]['cover'] = tomedia($v['cover']);
                array_push($tmp, $goods[$k]);
            }
        }
        return $this->result(0, '请求成功', $tmp);
    }

    /**
     * 我发布的动态列表
     * @access public
     * @return json
     */
    public function doPageMyTimeline()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        if (!$uid) {
            return $this->result(-1, '请求参数错误', []);
        }

        $limit = array(1, $this->limit);

        $curr = 1;
        if (isset($_GPC['page'])) {
            $limit[0] = $_GPC['page'];
            $curr = $_GPC['page'];
        }

        $info = pdo_getslice('longbing_card_timeline', ['uniacid' => $_W['uniacid'], 'status' => 1, 'user_id' => $uid], $limit, $count, ['id', 'title', 'cover', 'create_time'], '', ['create_time desc']);
        load()->func('file');
        foreach ($info as $k => $v) {
            $tmp = $v['cover'];
            $tmp = explode(',', $tmp);
            foreach ($tmp as $k2 => $v2) {
                $tmp[$k2] = tomedia($v2);
            }
            $info[$k]['cover'] = $tmp;
            $info[$k]['create_time2'] = date("Y-m-d", $v['create_time']);
        }

        $data = [
            'page' => $curr,
            'total_page' => ceil($count / $this->limit),
            'list' => $info,
        ];
        return $this->result(0, '请求成功', $data);
    }

    /**
     * 我发布的动态列表
     * @access public
     * @return json
     */
    public function doPageDeleteTimeline()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $id = $_GPC['id'];
        if (!$uid || !$id) {
            return $this->result(-1, '请求参数错误', []);
        }

        $info = pdo_get('longbing_card_timeline', ['uniacid' => $_W['uniacid'], 'id' => $id, 'user_id' => $uid]);

        if (!$info) {
            return $this->result(-1, '未找到动态信息', []);
        }

        $result = pdo_delete('longbing_card_timeline', ['uniacid' => $_W['uniacid'], 'id' => $id, 'user_id' => $uid]);

        if ($result) {
            return $this->result(0, '删除成功', []);
        } else {
            return $this->result(-1, '删除失败', []);
        }
    }

    /**
     * 发布动态
     * @access public
     * @return json
     */
    public function doPageReleaseTimeline()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $uniacid = $_W['uniacid'];
        $title = $_GPC['title'];
        $cover = $_GPC['cover'];
        $content = $_GPC['content'];
        //        if (!$uid || !$title || !$cover || !$content) {
        if (!$uid || !$title) {
            return $this->result(-1, '请求参数错误', []);
        }

        if (LONGBING_AUTH_TIMELINE) {
            $list = pdo_getall('longbing_card_timeline', ['uniacid' => $_W['uniacid'],
                'status >' => -1]);
            $count = count($list);
            if ($count >= LONGBING_AUTH_TIMELINE)
            {
                return $this->result(-1, "添加动态已达到 "  . ', 如需增加请购买高级版本', []);
            }
        }

        $time = time();
        $result = pdo_insert('longbing_card_timeline', [
            'user_id' => $uid,
            'uniacid' => $uniacid,
            'cover' => $cover,
            'content' => $content,
            'title' => $title,
            'create_time' => $time,
            'update_time' => $time,
        ]);
        if ($result) {
            return $this->result(0, '请求成功', []);
        } else {
            return $this->result(-1, '请求失败', []);
        }
    }

    /**
     * 发布自定义码
     * @access public
     * @return json
     */
    public function doPageReleaseQr()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $uniacid = $_W['uniacid'];
        $title = $_GPC['title'];
        $content = $_GPC['content'];

        if (!$uid || !$title || !$content) {
            return $this->result(-1, '请求参数错误', []);
        }

        $time = time();

        if (LONGBING_AUTH_CUSTOM_QR) {
            $list = pdo_getall('longbing_card_custom_qr', ['uniacid' => $_W['uniacid'],
                'status >' => -1]);
            $count = count($list);
            if ($count >= LONGBING_AUTH_CUSTOM_QR)
                message("添加自定义码已达到上线 " . ', 如需增加请购买高级版本', '', 'error');
        }

        $result = pdo_insert('longbing_card_custom_qr', [
            'user_id' => $uid,
            'uniacid' => $uniacid,
            'title' => $title,
            'content' => $content,
            'uniacid' => $uniacid,
            'create_time' => $time,
            'update_time' => $time,
        ]);

        if ($result) {
            $insertid = pdo_insertid();

            $destination_folder = ATTACHMENT_ROOT . '/'; //上传文件路径
            if (!file_exists($destination_folder)) {
                mkdir($destination_folder);
            }

//            @require_once(IA_ROOT . '/framework/function/file.func.php');
            load()->func('file');
            $destination_folder = ATTACHMENT_ROOT . '/images' . "/longbing_card/{$_W['uniacid']}";

            if (!file_exists($destination_folder)) {
                mkdirs($destination_folder);
            }
            $image = $destination_folder . '/' . $uid . '-' . $insertid . 'releaseQr.png';

            $path = "longbing_card/pages/index/index?to_uid={$uid}&currentTabBar=toCard&custom={$insertid}&is_qr=1";
            $res = $this->createQr($image, $path);
            if ($res != true) {
                return $this->result(-1, '请求失败', []);
            }

            pdo_update('longbing_card_custom_qr', ['path' => 'images' . "/longbing_card/{$_W['uniacid']}" . '/' . $uid . '-' . $insertid . 'releaseQr.png'], ['id' => $insertid]);

            return $this->result(0, '请求成功', []);
        } else {
            return $this->result(-1, '请求失败', []);
        }
    }

    /**
     * 删除自定义码
     * @access public
     * @return json
     */
    public function doPageDeleteQr()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $uniacid = $_W['uniacid'];
        $id = $_GPC['id'];

        if (!$uid || !$id) {
            return $this->result(-1, '请求参数错误', []);
        }

        $info = pdo_get('longbing_card_custom_qr', ['user_id' => $uid, 'id' => $id, 'status' => 1]);
        if (empty($info)) {
            return $this->result(-1, '未找到自定义码', []);
        }
        $result = pdo_update('longbing_card_custom_qr', ['status' => -1], ['user_id' => $uid, 'id' => $id, 'status' => 1]);

        if ($result) {
            return $this->result(0, '删除成功', []);
        } else {
            return $this->result(-1, '删除失败', []);
        }
    }

    /**
     * 上传图片
     * @access public
     * @return json
     */
    public function doPageUpload()
    {
        $this->cross();
        global $_GPC, $_W;
        $uptypes = array('image/jpg', 'image/jpeg', 'image/png', 'image/pjpeg', 'image/gif', 'image/bmp', 'image/x-png', 'audio/mpeg', 'application/octet-stream');
        $max_file_size = 200000000; //上传文件大小限制, 单位BYTE
        $destination_folder = ATTACHMENT_ROOT . '/' . 'images' . "/longbing_card_upload/{$_W['uniacid']}/"; //上传文件路径

        if (!is_dir(ATTACHMENT_ROOT . '/' . "images"))
        {
            mkdir(ATTACHMENT_ROOT . '/' . "images");
        }
        if (!is_dir(ATTACHMENT_ROOT . '/' . "images/longbing_card_upload"))
        {
            mkdir(ATTACHMENT_ROOT . '/' . "images/longbing_card_upload");
        }
        if (!is_dir(ATTACHMENT_ROOT . '/' . "images/longbing_card_upload/{$_W['uniacid']}/"))
        {
            mkdir(ATTACHMENT_ROOT . '/' . "images/longbing_card_upload/{$_W['uniacid']}/");
        }

        if (!is_uploaded_file($_FILES["upfile"]['tmp_name'])) //是否存在文件
        {
            echo "图片不存在!";
            exit;
        }
        $file = $_FILES["upfile"];
        if ($max_file_size < $file["size"]) //检查文件大小
        {
            echo "文件太大!";
            exit;
        }

        if (!in_array($file["type"], $uptypes)) //检查文件类型
        {
            echo "文件类型不符!" . $file["type"];
            exit;
        }
        load()->func('file');
        if (!file_exists($destination_folder)) {
            mkdirs($destination_folder);
        }
        $filename = $file["tmp_name"];
        $pinfo = pathinfo($file["name"]);
        $ftype = $pinfo['extension'];
        $destination = $destination_folder . str_shuffle(time() . rand(111111, 999999)) . "." . $ftype;
        $overwrite = false;
        if (file_exists($destination) && $overwrite != true) {
            echo "同名文件已经存在了";
            exit;
        }
        if (!move_uploaded_file($filename, $destination)) {
            echo "移动文件出错";
            exit;
        }
        $pinfo = pathinfo($destination);

        $fname = $pinfo['basename'];
        $fname = 'images' . "/longbing_card_upload/{$_W['uniacid']}/" . $fname;
        //        echo $fname;
        @$filename = $fname;
        @file_remote_upload($filename);

        return $this->result(0, '成功', ['path' => tomedia($fname), 'img' => $fname]);
    }

    /**
     * 自定义码列表
     * @access public
     * @return json
     */
    public function doPageReleaseQrList()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];

        if (!$uid) {
            return $this->result(-1, '请求参数错误', []);
        }

        $limit = array(1, $this->limit);

        $curr = 1;
        if (isset($_GPC['page'])) {
            $limit[0] = $_GPC['page'];
            $curr = $_GPC['page'];
        }

        $info = pdo_getslice('longbing_card_custom_qr', ['uniacid' => $_W['uniacid'], 'user_id' => $uid, 'status' => 1], $limit, $count, ['id', 'user_id', 'title', 'path', 'create_time'], '', ['create_time desc']);

        $data = [
            'page' => $curr,
            'total_page' => ceil($count / $this->limit),
            'list' => $info,
        ];
        return $this->result(0, '请求成功', $data);
    }

    /**
     * 自定义码详情
     * @access public
     * @return json
     */
    public function doPageReleaseQrDetail()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $id = $_GPC['id'];

        if (!$uid || !$id) {
            return $this->result(-1, '请求参数错误', []);
        }

        $info = pdo_get('longbing_card_custom_qr', ['uniacid' => $_W['uniacid'], 'id' => $id]);

        if ($info['qr_path'] ) {
            @$size = filesize(ATTACHMENT_ROOT . '/' . $info['qr_path']);

            if ($size > 51220)  // 大于5k, 用户判断图片是否正确
            {
                $info['path'] = $_W['siteroot'] . $_W['config']['upload']['attachdir'] . '/' . $info['qr_path'];
            }
            else
            {
//                @require_once(IA_ROOT . '/framework/function/file.func.php');
                load()->func('file');
                $destination_folder = ATTACHMENT_ROOT . '/images' . "/longbing_card/{$_W['uniacid']}";

                if (!file_exists($destination_folder)) {
                    mkdirs($destination_folder);
                }
                $image = $info['qr_path'];

                $path = "longbing_card/pages/index/index?to_uid={$uid}&currentTabBar=toCard&custom={$info['id']}&is_qr=1";
                $res = $this->createQr($image, $path);
                if ($res != true) {
                    return $this->result(-1, '请求失败', []);
                }
            }
        }
        $info['path'] = $_W['siteroot'] . $_W['config']['upload']['attachdir'] . '/' . $info['qr_path'];

        return $this->result(0, '请求成功', $info);
    }

    /**
     * 自定义码详情V2
     * @access public
     * @return json
     */
    public function doPageReleaseQrDetailV2()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $id = $_GPC['id'];

        if (!$uid || !$id) {
            return $this->result(-1, '请求参数错误', []);
        }

        $info = pdo_get('longbing_card_custom_qr', ['uniacid' => $_W['uniacid'], 'id' => $id]);
        $info['path'] = tomedia($info['path']);

        if (!strstr($info['path'], $_SERVER['HTTP_HOST'])) {
            load()->func('file');
            $res = file_remote_attach_fetch($info['path']);
            $res = tomedia($res);
            $res = str_replace('ttp://', 'ttps://', $res);

            if (!strstr($res, 'ttps://')) {
                $res = 'https://' . $res;
            }
            $info['path'] = $res;
        }

        return $this->result(0, '请求成功', $info);
    }

    /**
     * 新增客户列表
     * @access public
     * @return json
     */
    public function doPageNewClient()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $staff_id = $_GPC['staff_id'];
        if ($staff_id) {
            $uid = $staff_id;
        }
        if (!$uid) {
            return $this->result(-1, '请求参数错误', []);
        }

        $limit = array(1, $this->limit);

        $curr = 1;
        if (isset($_GPC['page'])) {
            $limit[0] = $_GPC['page'];
            $curr = $_GPC['page'];
        }

        $info = pdo_getslice('longbing_card_collection', ['uniacid' => $_W['uniacid'], 'to_uid' => $uid, 'uid !=' => $uid], $limit, $count, ['id', 'uid', 'create_time'], '', ['create_time desc']);

        foreach ($info as $k => $v) {
            $user = pdo_get('longbing_card_user', ['id' => $v['uid']], ['nickName', 'avatarUrl']);
            $info[$k]['user'] = $user;

            $check1 = pdo_get('longbing_card_chat', ['user_id' => $v['uid'], 'target_id' => $uid]);
            if (empty($check1)) {
                $check2 = pdo_get('longbing_card_chat', ['user_id' => $uid, 'target_id' => $v['uid']]);
                if (empty(!$check2)) {
                    $chat_id = 0;
                } else {
                    $chat_id = $check2['id'];
                }
            } else {
                $chat_id = $check1['id'];
            }
            if ($chat_id) {
                $message = pdo_getall('longbing_card_message', ['chat_id' => $chat_id], ['create_time'], '', ['id desc']);
                $info[$k]['count'] = count($message);
                $info[$k]['last_time'] = $message[0]['create_time'];
            } else {
                $info[$k]['count'] = 0;
                $info[$k]['last_time'] = 0;
            }
        }

        $data = [
            'page' => $curr,
            'total_page' => ceil($count / $this->limit),
            'list' => $info,
        ];
        return $this->result(0, '请求成功', $data);
    }

    /**
     * 客户浏览记录
     * @access public
     * @return json
     */
    public function doPageClientView()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $client_id = $_GPC['client_id'];

        $staff_id = $_GPC['staff_id'];
        if ($staff_id) {
            $uid = $staff_id;
        }
        $uniacid = $_W['uniacid'];

        if (!$uid || !$client_id) {
            return $this->result(-1, '1', []);
        }

        $limit = array(1, $this->limit);
        $curr = 1;
        if (isset($_GPC['page'])) {
            $limit[0] = $_GPC['page'];
            $curr = $_GPC['page'];
        }

        $info = pdo_getslice('longbing_card_count', ['uniacid' => $uniacid, 'to_uid' => $uid, 'user_id' => $client_id], $limit, $count, [], '', ['id desc']);

        $user = pdo_get('longbing_card_user', ['id' => $client_id]);
        $client = pdo_get('longbing_card_client_info', ['user_id' => $client_id, 'staff_id' => $uid]);
        foreach ($info as $k => $v) {
            $info[$k]['user'] = $user;
            $info[$k]['name'] = $client['name'] ? $client['name'] : $user['nickName'];
            $lists = pdo_getall('longbing_card_count', ['uniacid' => $uniacid, 'to_uid' => $uid, 'sign' => $v['sign'], 'type' => $v['type'], 'id <=' => $v['id'], 'user_id' => $v['user_id']], [], '', 'id asc');
            $info[$k]['count'] = count($lists);

            if (($v['sign'] == 'view' && $v['type'] == 2) || ($v['sign'] == 'view' && $v['type'] == 7)) {
                if ($v['type'] == 2) {
                    $target_info = pdo_get('longbing_card_goods', ['id' => $v['target']]);
                    $info[$k]['target_name'] = $target_info['name'];
                } else {
                    $target_info = pdo_get('longbing_card_timeline', ['id' => $v['target']]);
                    $info[$k]['target_name'] = $target_info['title'];
                }
            }
        }

        $data = [
            'page' => $curr,
            'total_page' => ceil($count / $this->limit),
            'list' => $info,
        ];
        return $this->result(0, '请求成功', $data);
    }

    /**
     * 客户信息
     * @access public
     * @return json
     */
    public function doPageClientInfo()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $client_id = $_GPC['client_id'];
        $uniacid = $_W['uniacid'];
        $staff_id = $_GPC['staff_id'];
        if ($staff_id) {
            $uid = $staff_id;
        }
        if (!$uid || !$client_id) {
            return $this->result(-1, '1', []);
        }

        $user = pdo_get('longbing_card_user', ['id' => $client_id]);

        $info = pdo_get('longbing_card_client_info', ['staff_id' => $uid, 'user_id' => $client_id]);

        if (!$info) {
            $info['is_empty'] = true;
        }
        $info['is_qr'] = $user['is_qr'];
        $user['info'] = $info;
        $user['is_new'] = 0;
        if (time() - $user['cretea_time'] < 60 * 60 * 24) {
            $user['is_new'] = 1;
        }

        $info = pdo_get('longbing_card_user_mark', ['staff_id' => $uid, 'user_id' => $client_id]);

        if ($info) {
            if ($info['mark'] == 1) {
                $user['is_new'] = 2;
            }
            if ($info['mark'] == 2) {
                $user['is_new'] = 3;
            }
        }
        $phone = pdo_get('longbing_card_user_phone', ['user_id' => $client_id]);

        $user['phone'] = $phone ? $phone['phone'] : '';
        if ($user['phone']) {
            $user['info']['phone'] = $user['phone'];
        }
        //  预计成交时间
        $date = pdo_getall('longbing_card_date', ['user_id' => $client_id, 'uniacid' => $uniacid], [], '', ['date desc']);


        $user['info']['date'] = !$date ? 0 : $date[0]['date'];
        return $this->result(0, '请求成功', $user);
    }

    /**
     * 编辑客户信息
     * @access public
     * @return json
     */
    public function doPageEditClient()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];

        $client_id = $_GPC['client_id'];
        $staff_id = $_GPC['staff_id'];
        if ($staff_id) {
            $uid = $staff_id;
        }

        $uniacid = $_W['uniacid'];

        if (!$uid || !$client_id) {
            return $this->result(-1, '1', []);
        }

        $info = pdo_get('longbing_card_client_info', ['staff_id' => $uid, 'user_id' => $client_id]);

        $data = [
            'name' => $_GPC['name'],
            'sex' => $_GPC['sex'],
            'phone' => $_GPC['phone'],
            'email' => $_GPC['email'],
            'company' => $_GPC['company'],
            'position' => $_GPC['position'],
            'address' => $_GPC['address'],
            'birthday' => $_GPC['birthday'],
            'is_mask' => $_GPC['is_mask'],
            'remark' => $_GPC['remark'],
        ];

        if (empty($info)) {
            $data['user_id'] = $client_id;
            $data['staff_id'] = $uid;
            $data['uniacid'] = $uniacid;
            $result = pdo_insert('longbing_card_client_info', $data);
        } else {
            $result = pdo_update('longbing_card_client_info', $data, ['id' => $info['id']]);
        }
        if ($result || $result == 0) {
            return $this->result(0, '请求成功', []);
        }
        return $this->result(-1, '请求失败' . $result, []);
    }

    /**
     * 常用标签
     * @access public
     * @return json
     */
    public function doPageOftenLabel()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $staff_id = $_GPC['staff_id'];
        if ($staff_id) {
            $uid = $staff_id;
        }

        $info = pdo_getall('longbing_card_label');

        if (empty($info)) {
            pdo_insert('longbing_card_label', ['name' => '新客户',
                'uniacid' => $_W['uniacid'],
                'create_time' => time(),
                'update_time' => time(),
            ]);
            pdo_insert('longbing_card_label', ['name' => '跟进中',
                'uniacid' => $_W['uniacid'],
                'create_time' => time(),
                'update_time' => time(),
            ]);
            pdo_insert('longbing_card_label', ['name' => '老客户',
                'uniacid' => $_W['uniacid'],
                'create_time' => time(),
                'update_time' => time(),
            ]);
            pdo_insert('longbing_card_label', ['name' => '已成交',
                'uniacid' => $_W['uniacid'],
                'create_time' => time(),
                'update_time' => time(),
            ]);
            $info = pdo_getall('longbing_card_label', ['id <' => 5]);
        }

        $sql = "SELECT count( id ) AS `count`,id,lable_id,update_time FROM " . tablename('longbing_card_user_label') . " WHERE staff_id = {$uid} GROUP BY lable_id";
        $list = pdo_fetchall($sql);
        array_multisort(array_column($list, 'count'), SORT_DESC, $list);
        if (empty($list)) {
            return $this->result(0, '请求成功', $info);
        } else {
            $ids = '';
            foreach ($list as $k => $v) {
                $ids .= ',' . $v['lable_id'];
//                if ($k == 3)
//                    break;
            }
            $ids = trim($ids, ',');
            if (count($list) > 1) {
                $ids = '(' . $ids . ')';
                $sql = "SELECT * FROM " . tablename('longbing_card_label') . " WHERE id in {$ids}";
            } else {
                $sql = "SELECT * FROM " . tablename('longbing_card_label') . " WHERE id = {$ids}";
            }
            $info = pdo_fetchall($sql);
        }

        return $this->result(0, '请求成功', $info);
    }

    /**
     * 添加用户标签
     * @access public
     * @return json
     */
    public function doPageInsertLabel()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $staff_id = $_GPC['staff_id'];
        if ($staff_id) {
            $uid = $staff_id;
        }
        $target_id = $_GPC['target_id'];

        $label = $_GPC['label'];
        $label_id = $_GPC['label_id'];

        if (!$label && !$label_id) {
            return $this->result(-1, '请求参数错误', []);
        }
        if (!$target_id) {
            return $this->result(-1, '请求参数错误', []);
        }

        if ($label_id) {
            $check = pdo_get('longbing_card_label', ['id' => $label_id, 'uniacid' => $_W['uniacid']]);
            if (empty($check))
                return $this->result(-1, '请求参数错误', []);
            $check2 = pdo_get('longbing_card_user_label', [
                'lable_id' => $label_id,
                'user_id' => $target_id,
                'uniacid' => $_W['uniacid'],
                'staff_id' => $uid,
            ]);
            if (!empty($check2))
                return $this->result(-1, '已存在该标签', []);
            $result = pdo_insert('longbing_card_user_label', [
                'lable_id' => $label_id,
                'user_id' => $target_id,
                'staff_id' => $uid,
                'uniacid' => $_W['uniacid'],
                'create_time' => time(),
                'update_time' => time(),
            ]);
            if ($result) {
                return $this->result(0, '添加成功', []);
            } else {
                return $this->result(-1, '添加失败', []);
            }
        }

        $check = pdo_get('longbing_card_label', ['name' => $label, 'uniacid' => $_W['uniacid']]);

        if (empty($check)) {
            $result = pdo_insert('longbing_card_label', [
                'name' => $label,
                'uniacid' => $_W['uniacid'],
                'create_time' => time(),
                'update_time' => time(),
            ]);
            if ($result) {
                $label_id = pdo_insertid();
            } else
                return $this->result(-1, '添加失败', []);
        } else {
            $label_id = $check['id'];
        }
        $check = pdo_get('longbing_card_user_label', ['lable_id' => $label_id, 'uniacid' => $_W['uniacid'], 'user_id' => $target_id]);
        if (!empty($check)) {
            return $this->result(-1, '已添加过该标签', []);
        }
        $result = pdo_insert('longbing_card_user_label', [
            'lable_id' => $label_id,
            'user_id' => $target_id,
            'staff_id' => $uid,
            'uniacid' => $_W['uniacid'],
            'create_time' => time(),
            'update_time' => time(),
        ]);
        if ($result) {

            $check = pdo_get('longbing_card_user_mark', ['user_id' => $target_id, 'staff_id' => $uid]);
            if (empty($check)) {
                pdo_insert('longbing_card_user_mark', [
                    'user_id' => $target_id,
                    'staff_id' => $uid,
                    'mark' => 1,
                    'create_time' => time(),
                    'update_time' => time()
                ]);
            }

            return $this->result(0, '添加成功', []);
        } else {
            return $this->result(-1, '添加失败', []);
        }

    }

    /**
     * 删除用户标签
     * @access public
     * @return json
     */
    public function doPageDeleteLabel()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $target_id = $_GPC['target_id'];
        $staff_id = $_GPC['staff_id'];
        if ($staff_id) {
            $uid = $staff_id;
        }

        $id = $_GPC['id'];

        if (!$target_id || !$id) {
            return $this->result(-1, '请求参数错误', []);
        }

        $result = pdo_delete('longbing_card_user_label', ['staff_id' => $uid, 'user_id' => $target_id, 'id' => $id]);

        if ($result) {
            return $this->result(0, '删除成功', []);
        } else {
            return $this->result(-1, '删除失败', []);
        }
    }

    /**
     * 用户标签列表
     * @access public
     * @return json
     */
    public function doPageLabels()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $target_id = $_GPC['target_id'];
        $staff_id = $_GPC['staff_id'];
        if ($staff_id) {
            $uid = $staff_id;
        }

        if (!$target_id) {
            return $this->result(-1, '请求参数错误', []);
        }

        $list = pdo_getall('longbing_card_user_label', ['staff_id' => $uid, 'user_id' => $target_id], ['id', 'lable_id']);
        foreach ($list as $k => $item) {
            $info = pdo_get('longbing_card_label', ['id' => $item['lable_id']], ['name']);
            $list[$k]['name'] = $info['name'];
        }
        return $this->result(0, '请求成功', $list);
    }

    /**
     * 分享到群之后 -- 已废弃
     * @access public
     * @return json
     */
    public function doPageAfterShare()
    {
        $this->cross();
        return false;
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $shareTickets = $_GPC['shareTickets'];
        $uniacid = $_W['uniacid'];

        if (!$shareTickets) {
            return $this->result(-1, '请求参数错误', []);
        }

        $check = pdo_get('longbing_card_share_group', ['user_id' => $uid, 'openGId' => $shareTickets]);

        if (empty($check)) {
            pdo_insert('longbing_card_share_group', [
                'user_id' => $uid,
                'openGId' => $shareTickets, 'uniacid' => $uniacid,
                'create_time' => time(),
                'update_time' => time(),
            ]);
        }
        return $this->result(0, '请求成功', []);
    }

    /**
     * 在群里打开分享内容后
     * @access public
     * @return json
     */
    public function doPageGetShare()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $encryptedData = $_GPC['encryptedData'];
        $iv = $_GPC['iv'];
        $code = $_GPC['code'];
        $type = $_GPC['type'];
        $target_id = $_GPC['target_id'];
        $uniacid = $_W['uniacid'];
        $to_uid = $_GPC['to_uid'];

        if (!$encryptedData || !$iv || !$code || !$type || !$to_uid) {
            return $this->result(-1, '请求参数错误', []);
        }

        if ($type != 1 && !$target_id) {
            return $this->result(-1, '请求对象错误', []);
        }

        $appid = $_W['account']['key'];
        $appsecret = $_W['account']['secret'];

        $url = "https://api.weixin.qq.com/sns/jscode2session?appid={$appid}&secret={$appsecret}&js_code=$code&grant_type=authorization_code";

        $info = ihttp_get($url);
        $info = json_decode($info['content'], true);

        if (!isset($info['session_key'])) {
            return $this->result(-1, 'session_key', []);
        }
        $session_key = $info['session_key'];

        include_once "wxBizDataCrypt.php";
        $pc = new WXBizDataCrypt($appid, $session_key);
        $errCode = $pc->decryptData($encryptedData, $iv, $data);

        if ($errCode == 0) {
            $data = json_decode($data, true);

            $openGId = $data['openGId'];


            $insertData = [
                'user_id' => $to_uid,
                'client_id' => $uid,
                'openGId' => $openGId,
                'uniacid' => $uniacid,
                'create_time' => time(),
                'update_time' => time(),
            ];
            switch ($type) {
                case 1:
                    $insertData['view_card'] = 1;
                    break;
                case 2:
                    $insertData['view_custom_qr'] = 1;
                    $insertData['target_id'] = $target_id;
                    break;
                case 3:
                    $insertData['view_goods'] = 1;
                    $insertData['target_id'] = $target_id;
                    break;
                case 4:
                    $insertData['view_timeline'] = 1;
                    $insertData['target_id'] = $target_id;
                    break;
                default:
            }
            pdo_insert('longbing_card_share_group', $insertData);

            return $this->result(0, '请求成功', []);


            $check = pdo_get('longbing_card_share_group', ['user_id' => $to_uid, 'openGId' => $openGId]);
            if (empty($check)) {
                $insertData = [
                    'user_id' => $to_uid,
                    'openGId' => $openGId,
                    'uniacid' => $uniacid,
                    'create_time' => time(),
                    'update_time' => time(),
                ];
                switch ($type) {
                    case 1:
                        $insertData['view_card'] = 1;
                        break;
                    case 2:
                        $insertData['view_custom_qr'] = json_encode([
                            [
                                'id' => $target_id,
                                'count' => 1
                            ]
                        ]);
                        break;
                    case 3:
                        $insertData['view_goods'] = json_encode([
                            [
                                'id' => $target_id,
                                'count' => 1
                            ]
                        ]);
                        break;
                    case 4:
                        $insertData['view_timeline'] = json_encode([
                            [
                                'id' => $target_id,
                                'count' => 1
                            ]
                        ]);
                        break;
                    default:
                }
                pdo_insert('longbing_card_share_group', $insertData);

                return $this->result(0, '请求成功', []);
            } else {
                switch ($type) {
                    case 1:
                        $insertData['view_card'] = $check['view_card'] + 1;
                        break;
                    case 2:
                        $array = json_decode($check['view_custom_qr'], true);
                        $in = false;
                        foreach ($array as $k => $v) {
                            if ($target_id == $v['id']) {
                                $in = true;
                                $array[$k]['count'] += 1;
                                break;
                            }
                            if (!$in) {
                                $tmp = [
                                    'id' => $target_id,
                                    'count' => 1,
                                ];
                            }
                            array_push($array, $tmp);
                        }
                        if (empty($array)) {
                            $array = [[
                                'id' => $target_id,
                                'count' => 1,
                            ]];
                        }
                        $insertData['view_custom_qr'] = json_encode($array);
                        break;
                    case 3:
                        $array = json_decode($check['view_goods'], true);
                        $in = false;
                        foreach ($array as $k => $v) {
                            if ($target_id == $v['id']) {
                                $in = true;
                                $array[$k]['count'] += 1;
                                break;
                            }
                            if (!$in) {
                                $tmp = [
                                    'id' => $target_id,
                                    'count' => 1,
                                ];
                            }
                            array_push($array, $tmp);
                        }
                        if (empty($array)) {
                            $array = [[
                                'id' => $target_id,
                                'count' => 1,
                            ]];
                        }
                        $insertData['view_goods'] = json_encode($array);
                        break;
                    case 4:
                        $array = json_decode($check['view_timeline'], true);
                        $in = false;
                        foreach ($array as $k => $v) {
                            if ($target_id == $v['id']) {
                                $in = true;
                                $array[$k]['count'] += 1;
                                break;
                            }
                            if (!$in) {
                                $tmp = [
                                    'id' => $target_id,
                                    'count' => 1,
                                ];
                            }
                            array_push($array, $tmp);
                        }
                        if (empty($array)) {
                            $array = [[
                                'id' => $target_id,
                                'count' => 1,
                            ]];
                        }
                        $insertData['view_timeline'] = json_encode($array);
                        break;
                    default:
                }
                $insertData['update_time'] = time();
                pdo_update('longbing_card_share_group', $insertData, ['id' => $check['id']]);

                return $this->result(0, '请求成功', []);
            }
        } else {
            return $this->result(-1, $errCode, []);
        }
    }

    /**
     * 推广详情
     * @access public
     * @return json
     */
    public function doPageExtensionDetail()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $staff_id = $_GPC['staff_id'];
        $type = $_GPC['type']; // 1=>产品推广 2=>动态推广 3=>名片推广
        if ($staff_id) {
            $uid = $staff_id;
        }

        if (!$type) {
            return $this->result(-1, '请求参数错误', []);
        }

        $limit = array(1, $this->limit);

        $curr = 1;
        if (isset($_GPC['page'])) {
            $limit[0] = $_GPC['page'];
            $curr = $_GPC['page'];
        }

        //        $info = pdo_getslice('longbing_card_custom_qr', ['uniacid' => $_W['uniacid'], 'user_id' => $uid], $limit, $count, ['id','user_id','title','path','create_time'], '', 'create_time desc');

        if ($type == 1) {// 1=>产品推广
            $extension = pdo_getslice('longbing_card_extension', ['user_id' => $uid], $limit, $count, ['id', 'user_id', 'goods_id', 'create_time'], '', 'id desc');
            //            if (empty($extension)) {
            //                $data = [
            //                    'page' => $curr,
            //                    'total_page' => ceil($count / $this->limit),
            //                    'list' => [],
            //                ];
            //                return $this->result(0, '请求成功', $data);
            //            }

            $ids = '';
            foreach ($extension as $k => $v) {
                $ids .= ',' . $v['goods_id'];
            }
            $ids = trim($ids, ',');
            if (count($extension) > 1) {
                $ids = '(' . $ids . ')';
                $sql = "SELECT id,cover,price,`name` FROM " . tablename('longbing_card_goods') . " WHERE id IN {$ids}";
            } else {
                $sql = "SELECT id,cover,price,`name` FROM " . tablename('longbing_card_goods') . " WHERE id = {$ids}";
            }
            $sql = "SELECT id,cover,price,`name` FROM " . tablename('longbing_card_goods') . " WHERE uniacid = {$_W['uniacid']} && `status` = 1";
            //            $goods = pdo_fetchall($sql);
            $goods = pdo_getslice('longbing_card_goods', ['uniacid' => $_W['uniacid']], $limit, $count, ['id', 'cover', 'price', 'name'], '', '');
            foreach ($goods as $k => $v) {
                $goods[$k]['cover'] = tomedia($v['cover']);
                $like = '%"id":"' . $v['id'] . '",%';
                $sql = "SELECT sum( view_goods ) AS `view_goods_sum`,openGId,update_time FROM " . tablename('longbing_card_share_group') . " WHERE user_id = {$uid} && view_goods = 1 && target_id = {$v['id']} GROUP BY openGId";
                $groups = pdo_fetchall($sql);

                $goods[$k]['groups'] = $groups;
                //                $consult_count = pdo_getall('longbing_card_copy_count', ['type' => 8, 'to_uid' => $uid, 'target' => $v['id']], ['id']);
                $consult_count = pdo_getall('longbing_card_count', ['type' => 8, 'to_uid' => $uid, 'target' => $v['id'], 'sign' => 'copy'], ['id']);
                $consult_count = count($consult_count);
                $goods[$k]['consult_count'] = $consult_count;

                $forward_count = pdo_getall('longbing_card_forward', ['type' => 2, 'staff_id' => $uid, 'target_id' => $v['id']], ['id']);
                $forward_count = count($forward_count);
                $goods[$k]['forward_count'] = $forward_count;

                //                $view_count = pdo_getall('longbing_card_view_count', ['type' => 2, 'to_uid' => $uid, 'target' => $v['id']], ['id']);
                $view_count = pdo_getall('longbing_card_count', ['type' => 2, 'to_uid' => $uid, 'target' => $v['id'], 'sign' => 'view'], ['id']);
                $view_count = count($view_count);
                $goods[$k]['view_count'] += $view_count;
                $goods[$k]['follow_count'] = 0;
                $goods[$k]['deal_count'] = 0;
            }
            $data = [
                'page' => $curr,
                'total_page' => ceil($count / $this->limit),
                'list' => $goods,
            ];
            return $this->result(0, '请求成功', $data);
        } // 2=>动态推广
        else if ($type == 2) {
            $timeline = pdo_getslice('longbing_card_timeline', ['user_id' => $uid, 'uniacid' => $_W['uniacid'], 'status' => 1], $limit, $count, ['id', 'user_id', 'title', 'cover', 'create_time'], '', ['id desc']);
            if (empty($timeline)) {
                $data = [
                    'page' => $curr,
                    'total_page' => ceil($count / $this->limit),
                    'list' => [],
                ];
                return $this->result(0, '请求成功', $data);
            }
            foreach ($timeline as $k => $v) {
                $arr = explode(',', $v['cover']);
                $tmp = [];
                foreach ($arr as $k2 => $v2) {
                    array_push($tmp, tomedia($v2));
                }
                $timeline[$k]['cover'] = $tmp;
                $like = '%"id":"' . $v['id'] . '",%';
                //                $sql = "SELECT id,user_id,openGId,`view_timeline`,`update_time` FROM " . tablename('longbing_card_count') ."longbing_card_share_group WHERE user_id = {$uid} && view_timeline LIKE '{$like}'";
                $sql = "SELECT sum( view_timeline ) AS `view_timeline_sum` FROM " . tablename('longbing_card_share_group') . " WHERE user_id = {$uid} && view_timeline = 1 && target_id = {$v['id']} GROUP BY openGId";
                $groups = pdo_fetchall($sql);
                $timeline[$k]['groups'] = $groups;
                $forward_count = pdo_getall('longbing_card_forward', ['type' => 3, 'staff_id' => $uid, 'target_id' => $v['id']], ['id']);
                $forward_count = count($forward_count);
                $timeline[$k]['forward_count'] = $forward_count;

                //                $view_count = pdo_getall('longbing_card_view_count', ['type' => 7, 'to_uid' => $uid, 'target' => $v['id']], ['id']);
                $view_count = pdo_getall('longbing_card_count', ['type' => 7, 'to_uid' => $uid, 'target' => $v['id'], 'sign' => 'view'], ['id']);
                $view_count = count($view_count);
                $timeline[$k]['view_count'] += $view_count;
                $timeline[$k]['follow_count'] = 0;
                $timeline[$k]['deal_count'] = 0;
            }
            $data = [
                'page' => $curr,
                'total_page' => ceil($count / $this->limit),
                'list' => $timeline,
            ];
            return $this->result(0, '请求成功', $data);
        } //  3=>名片推广
        else if ($type == 3) {
            //            if ($limit[0] == 1)
            $qr = pdo_getslice('longbing_card_custom_qr', ['user_id' => $uid, 'uniacid' => $_W['uniacid'], 'status' => 1], $limit, $count, ['id', 'user_id', 'title', 'create_time'], '', ['id desc']);
            if (empty($qr) && $curr != 1) {
                $data = [
                    'page' => $curr,
                    'total_page' => ceil($count / $this->limit),
                    'list' => [],
                ];
                return $this->result(0, '请求成功', $data);
            }
            if ($curr == 1) {
                $tmp = [
                    'id' => 0,
                    'user_id' => $uid,
                    'title' => '名片',
                    'groups' => [],
                    'follow_count' => 0,
                    'deal_count' => 0,
                ];
                $list = pdo_getall('longbing_card_user_mark', ['staff_id' => $uid, 'uniacid' => $_W['uniacid'], 'mark >' => 0]);
                $tmp['follow_count'] = count($list);
                foreach ($list as $k => $v) {
                    if ($v['mark'] == 2)
                        $tmp['deal_count'] += 1;
                }
                $qr = array_merge([$tmp], $qr);
            }

            foreach ($qr as $k => $v) {
                if ($v['id'] == 0)
                    continue;
                //                $like = '%"id":"' . $v['id'] . '",%';
                //                $sql = "SELECT id,user_id,openGId,`view_custom_qr`,`update_time` FROM " . tablename('longbing_card_count') ."longbing_card_share_group WHERE user_id = {$uid} && view_custom_qr LIKE '{$like}'";
                $sql = "SELECT sum( view_custom_qr ) AS `view_custom_qr_sum` FROM " . tablename('longbing_card_share_group') . " WHERE user_id = {$uid} && view_custom_qr = 1 && target_id = {$v['id']} GROUP BY openGId";
                $groups = pdo_fetchall($sql);
                $qr[$k]['groups'] = $groups;
                $qr[$k]['follow_count'] = 0;
                $qr[$k]['deal_count'] = 0;
                $beginTime = mktime(0, 0, 0, date('m'), date('d'), date('Y'));
                //                if ($v['id']) {
                //                    $list = pdo_get('longbing_card_user', ['']);
                //                } else {
                //
                //                }
            }
            $data = [
                'page' => $curr,
                'total_page' => ceil($count / $this->limit),
                'list' => $qr,
            ];
            return $this->result(0, '请求成功', $data);
        }
        return $this->result(-1, '请求失败', []);
    }

    /**
     * 推广详情V2
     * @access public
     * @return json
     */
    public function doPageExtensionDetailV2()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
//        $uid = 2;
        $staff_id = $_GPC['staff_id'];
        $type = $_GPC['type']; // 1=>产品推广 2=>动态推广 3=>名片推广
//        $type = 1;
        if ($staff_id) {
            $uid = $staff_id;
        }

        if (!$type) {
            return $this->result(-1, '请求参数错误', []);
        }

        $limit = array(1, $this->limit);

        $curr = 1;
        if (isset($_GPC['page'])) {
            $limit[0] = $_GPC['page'];
            $curr = $_GPC['page'];
        }

        // 1=>产品推广
        if ($type == 1)
        {
            $goods = pdo_getslice('longbing_card_goods', ['uniacid' => $_W['uniacid']], $limit, $count, ['id', 'cover', 'price', 'name'], '', '');

            foreach ($goods as $k => $v) {
                $goods[$k]['cover'] = tomedia($v['cover']);
                $like = '%"id":"' . $v['id'] . '",%';
                $sql = "SELECT sum( view_goods ) AS `view_goods_sum`, openGId, update_time FROM " . tablename('longbing_card_share_group') . " WHERE user_id = {$uid} && view_goods = 1 && target_id = {$v['id']} && client_id != {$uid} GROUP BY openGId";
                $groups = pdo_fetchall($sql);

                $groups = $groups ? $groups : [];

//                if (empty($groups))
//                {
                $goods[$k]['total_number'] = 0;
                $goods[$k]['attract_number'] = 0;
                $goods[$k]['chat_number'] = 0;
                $goods[$k]['follow_number'] = 0;
                $goods[$k]['deal_number'] = 0;
//                }
                foreach ($groups as $k2 => $v2)
                {
                    $last = pdo_fetch("SELECT update_time FROM " . tablename('longbing_card_share_group') . " WHERE user_id = {$uid} && view_goods = 1 && client_id != {$uid} && openGId = '{$v2['openGId']}' && target_id = {$v['id']} ORDER BY id DESC");
                    $groups[$k2]['update_time'] = $last ? $last['update_time'] : $groups['update_time'];
                    $tmpUidArr = [];
                    $number = pdo_get('longbing_card_group_number', ['openGId' => $v2['openGId']]);
                    $goods[$k]['total_number'] += $number ? $number['number'] : 0;
//                    $attract = pdo_getall('longbing_card_share_group', ['openGId' => $v2['openGId'], 'user_id' => $uid, 'target_id' => $v['id']], ['client_id']);
                    $attract = pdo_fetchall("SELECT client_id FROM " . tablename('longbing_card_share_group') . " WHERE user_id = {$uid} && target_id = {$v['id']} && client_id != {$uid} && openGId = '{$v2['openGId']}'");
                    if (!empty($attract))
                    {
                        $tmpArr = array();
                        foreach ($attract as $k3 => $v3)
                        {
                            array_push($tmpArr, $v3['client_id']);
                            array_push($tmpUidArr, $v3['client_id']);
                        }
                        $tmpArr = array_unique($tmpArr);
                        $goods[$k]['attract_number'] += count($tmpArr);
                    }
                    $tmpArr = array_unique($tmpUidArr);
                    $tmpUidStr = implode(',', $tmpUidArr);
                    if (count($tmpUidArr) > 1)
                    {
                        $tmpUidStr = '(' . $tmpUidStr . ')';
                        $chat_number = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_chat') . " WHERE user_id IN $tmpUidStr");
                        $goods[$k]['chat_number'] += count($chat_number);
                        $follow_number = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_user_follow') . " WHERE user_id IN $tmpUidStr");
                        $goods[$k]['follow_number'] += count($follow_number);
                        $deal_number = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_user_mark') . " WHERE user_id IN $tmpUidStr && mark = 2");
                        $goods[$k]['deal_number'] += count($deal_number);
                    }
                    else
                    {
                        $chat_number = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_chat') . " WHERE user_id = $tmpUidStr");
                        $goods[$k]['chat_number'] += count($chat_number);
                        $follow_number = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_user_follow') . " WHERE user_id = $tmpUidStr");
                        $goods[$k]['follow_number'] += count($follow_number);
                        $deal_number = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_user_mark') . " WHERE user_id = $tmpUidStr && mark = 2");
                        $goods[$k]['deal_number'] += count($deal_number);
                    }
                }
                $goods[$k]['groups'] = $groups;
            }
            $data = [
                'page' => $curr,
                'total_page' => ceil($count / $this->limit),
                'list' => $goods,
            ];
            return $this->result(0, '请求成功', $data);
        }
        // 2=>动态推广
        else if ($type == 2)
        {
            $timeline = pdo_getslice('longbing_card_timeline', ['user_id' => $uid, 'uniacid' => $_W['uniacid'], 'status' => 1], $limit, $count, ['id', 'user_id', 'title', 'cover', 'create_time'], '', ['id desc']);
            if (empty($timeline)) {
                $data = [
                    'page' => $curr,
                    'total_page' => ceil($count / $this->limit),
                    'list' => [],
                ];
                return $this->result(0, '请求成功', $data);
            }
            foreach ($timeline as $k => $v) {
                $timeline[$k]['total_number'] = 0;
                $timeline[$k]['attract_number'] = 0;
                $timeline[$k]['chat_number'] = 0;
                $timeline[$k]['follow_number'] = 0;
                $timeline[$k]['deal_number'] = 0;
                $arr = explode(',', $v['cover']);
                $tmp = [];
                foreach ($arr as $k2 => $v2) {
                    array_push($tmp, tomedia($v2));
                }
                $timeline[$k]['cover'] = $tmp;

                $sql = "SELECT sum( view_timeline ) AS `view_timeline_sum`, openGId, update_time FROM " . tablename('longbing_card_share_group') . " WHERE user_id = {$uid} && view_timeline = 1 && target_id = {$v['id']} && client_id != {$uid} GROUP BY openGId";
                $groups = pdo_fetchall($sql);

                $groups = $groups ? $groups : [];
                foreach ($groups as $k2 => $v2)
                {
                    $last = pdo_fetch("SELECT update_time FROM " . tablename('longbing_card_share_group') . " WHERE user_id = {$uid} && view_timeline = 1 && client_id != {$uid} && openGId = '{$v2['openGId']}' && target_id = {$v['id']} ORDER BY id DESC");
                    $groups[$k2]['update_time'] = $last ? $last['update_time'] : $groups['update_time'];
                    $tmpUidArr = [];
                    $number = pdo_get('longbing_card_group_number', ['openGId' => $v2['openGId']]);
                    $timeline[$k]['total_number'] += $number ? $number['number'] : 0;
//                    $attract = pdo_getall('longbing_card_share_group', ['openGId' => $v2['openGId'], 'user_id' => $uid, 'target_id' => $v['id']], ['client_id']);
                    $attract = pdo_fetchall("SELECT client_id FROM " . tablename('longbing_card_share_group') . " WHERE user_id = {$uid} && target_id = {$v['id']} && client_id != {$uid} && openGId = '{$v2['openGId']}'");
                    if (!empty($attract))
                    {
                        $tmpArr = array();
                        foreach ($attract as $k3 => $v3)
                        {
                            array_push($tmpArr, $v3['client_id']);
                            array_push($tmpUidArr, $v3['client_id']);
                        }
                        $tmpArr = array_unique($tmpArr);
                        $timeline[$k]['attract_number'] += count($tmpArr);
                    }
                    $tmpUidArr = array_unique($tmpUidArr);
                    $tmpUidStr = implode(',', $tmpUidArr);
                    if (count($tmpUidArr) > 1)
                    {
                        $tmpUidStr = '(' . $tmpUidStr . ')';
                        $chat_number = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_chat') . " WHERE user_id IN $tmpUidStr");
                        $timeline[$k]['chat_number'] += count($chat_number);
                        $follow_number = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_user_follow') . " WHERE user_id IN $tmpUidStr");
                        $timeline[$k]['follow_number'] += count($follow_number);
                        $deal_number = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_user_mark') . " WHERE user_id IN $tmpUidStr && mark = 2");
                        $timeline[$k]['deal_number'] += count($deal_number);
                    }
                    else
                    {
                        $chat_number = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_chat') . " WHERE user_id = $tmpUidStr");
                        $timeline[$k]['chat_number'] += count($chat_number);
                        $follow_number = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_user_follow') . " WHERE user_id = $tmpUidStr");
                        $timeline[$k]['follow_number'] += count($follow_number);
                        $deal_number = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_user_mark') . " WHERE user_id = $tmpUidStr && mark = 2");
                        $timeline[$k]['deal_number'] += count($deal_number);
                    }
                }
                $timeline[$k]['groups'] = $groups;
            }
            $data = [
                'page' => $curr,
                'total_page' => ceil($count / $this->limit),
                'list' => $timeline,
            ];
            return $this->result(0, '请求成功', $data);
        }
        // 3=>名片推广
        else if ($type == 3) {
            //            if ($limit[0] == 1)
            $qr = pdo_getslice('longbing_card_custom_qr', ['user_id' => $uid, 'uniacid' => $_W['uniacid'], 'status' => 1], $limit, $count, ['id', 'user_id', 'title', 'create_time'], '', ['id desc']);
            if (empty($qr) && $curr != 1) {
                $data = [
                    'page' => $curr,
                    'total_page' => ceil($count / $this->limit),
                    'list' => [],
                ];
                return $this->result(0, '请求成功', $data);
            }
            if ($curr == 1) {


                $sql = "SELECT sum( view_card ) AS `view_card_sum`, openGId, update_time FROM " . tablename('longbing_card_share_group') . " WHERE user_id = {$uid} && view_card = 1 && client_id != {$uid} GROUP BY openGId";
                $groups = pdo_fetchall($sql);

                $groups = $groups ? $groups : [];

                $tmp = [
                    'id' => 0,
                    'user_id' => $uid,
                    'title' => '名片',
                    'groups' => $groups,
                    'total_number' => 0,
                    'attract_number' => 0,
                    'chat_number' => 0,
                    'follow_number' => 0,
                    'deal_number' => 0,
                ];

                foreach ($groups as $k2 => $v2)
                {
                    $last = pdo_fetch("SELECT update_time FROM " . tablename('longbing_card_share_group') . " WHERE user_id = {$uid} && view_card = 1 && client_id != {$uid} && openGId = '{$v2['openGId']}' ORDER BY id DESC");
                    $groups[$k2]['update_time'] = $last ? $last['update_time'] : $groups['update_time'];
                    $tmpUidArr = [];
                    $number = pdo_get('longbing_card_group_number', ['openGId' => $v2['openGId']]);
                    $tmp['total_number'] += $number ? $number['number'] : 0;
//                    $attract = pdo_getall('longbing_card_share_group', ['openGId' => $v2['openGId'], 'user_id' => $uid, 'target_id' => $v['id']], ['client_id']);
                    $attract = pdo_fetchall("SELECT client_id FROM " . tablename('longbing_card_share_group') . " WHERE user_id = {$uid} && client_id != {$uid} && openGId = '{$v2['openGId']}' && view_card = 1");
                    if (!empty($attract))
                    {
                        $tmpArr = array();
                        foreach ($attract as $k3 => $v3)
                        {
                            array_push($tmpArr, $v3['client_id']);
                            array_push($tmpUidArr, $v3['client_id']);
                        }
                        $tmpArr = array_unique($tmpArr);
                        $tmp['attract_number'] += count($tmpArr);
                    }
                    $tmpUidArr = array_unique($tmpUidArr);
                    $tmpUidStr = implode(',', $tmpUidArr);
                    if (count($tmpUidArr) > 1)
                    {
                        $tmpUidStr = '(' . $tmpUidStr . ')';
                        $chat_number = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_chat') . " WHERE user_id IN $tmpUidStr");
                        $tmp['chat_number'] += count($chat_number);
                        $follow_number = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_user_follow') . " WHERE user_id IN $tmpUidStr");
                        $tmp['follow_number'] += count($follow_number);
                        $deal_number = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_user_mark') . " WHERE user_id IN $tmpUidStr && mark = 2");
                        $tmp['deal_number'] += count($deal_number);
                    }
                    else
                    {
                        $chat_number = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_chat') . " WHERE user_id = $tmpUidStr");
                        $tmp['chat_number'] += count($chat_number);
                        $follow_number = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_user_follow') . " WHERE user_id = $tmpUidStr");
                        $tmp['follow_number'] += count($follow_number);
                        $deal_number = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_user_mark') . " WHERE user_id = $tmpUidStr && mark = 2");
                        $tmp['deal_number'] += count($deal_number);
                    }
                }

                $qr = array_merge([$tmp], $qr);
            }

            foreach ($qr as $k => $v) {
                if ($v['id'] == 0)
                {
                    continue;
                }
                $sql = "SELECT sum( view_custom_qr ) AS `view_custom_qr_sum`, openGId, update_time FROM " . tablename('longbing_card_share_group') . " WHERE user_id = {$uid} && view_custom_qr = 1 && target_id = {$v['id']} && client_id != {$uid} GROUP BY openGId";
                $groups = pdo_fetchall($sql);

//                if (empty($groups))
//                {
                $qr[$k]['total_number'] = 0;
                $qr[$k]['attract_number'] = 0;
                $qr[$k]['chat_number'] = 0;
                $qr[$k]['follow_number'] = 0;
                $qr[$k]['deal_number'] = 0;
//                }

                foreach ($groups as $k2 => $v2)
                {
                    $last = pdo_fetch("SELECT update_time FROM " . tablename('longbing_card_share_group') . " WHERE user_id = {$uid} && view_custom_qr = 1 && client_id != {$uid} && openGId = '{$v2['openGId']}' && target_id = {$v['id']} ORDER BY id DESC");
                    $groups[$k2]['update_time'] = $last ? $last['update_time'] : $groups['update_time'];
                    $tmpUidArr = [];
                    $number = pdo_get('longbing_card_group_number', ['openGId' => $v2['openGId']]);
                    $qr[$k]['total_number'] += $number ? $number['number'] : 0;
//                    $attract = pdo_getall('longbing_card_share_group', ['openGId' => $v2['openGId'], 'user_id' => $uid, 'target_id' => $v['id']], ['client_id']);
                    $attract = pdo_fetchall("SELECT client_id FROM " . tablename('longbing_card_share_group') . " WHERE user_id = {$uid} && target_id = {$v['id']} && client_id != {$uid} && openGId = '{$v2['openGId']}'");
                    if (!empty($attract))
                    {
                        $tmpArr = array();
                        foreach ($attract as $k3 => $v3)
                        {
                            array_push($tmpArr, $v3['client_id']);
                            array_push($tmpUidArr, $v3['client_id']);
                        }
                        $tmpArr = array_unique($tmpArr);
                        $qr[$k]['attract_number'] += count($tmpArr);
                    }
                    $tmpUidArr = array_unique($tmpUidArr);
                    $tmpUidStr = implode(',', $tmpUidArr);
                    if (count($tmpUidArr) > 1)
                    {
                        $tmpUidStr = '(' . $tmpUidStr . ')';
                        $chat_number = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_chat') . " WHERE user_id IN $tmpUidStr");
                        $qr[$k]['chat_number'] += count($chat_number);
                        $follow_number = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_user_follow') . " WHERE user_id IN $tmpUidStr");
                        $qr[$k]['follow_number'] += count($follow_number);
                        $deal_number = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_user_mark') . " WHERE user_id IN $tmpUidStr && mark = 2");
                        $qr[$k]['deal_number'] += count($deal_number);
                    }
                    else
                    {
                        $chat_number = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_chat') . " WHERE user_id = $tmpUidStr");
                        $qr[$k]['chat_number'] += count($chat_number);
                        $follow_number = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_user_follow') . " WHERE user_id = $tmpUidStr");
                        $qr[$k]['follow_number'] += count($follow_number);
                        $deal_number = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_user_mark') . " WHERE user_id = $tmpUidStr && mark = 2");
                        $qr[$k]['deal_number'] += count($deal_number);
                    }
                }
                $qr[$k]['groups'] = $groups;
            }
            $data = [
                'page' => $curr,
                'total_page' => ceil($count / $this->limit),
                'list' => $qr,
            ];
            return $this->result(0, '请求成功', $data);
        }
        return $this->result(-1, '请求失败', []);
    }

    /**
     * 群引流人数
     * @access public
     * @return json
     */
    public function doPageGroupPeople()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $openGId = $_GPC['openGId'];
        $staff_id = $_GPC['staff_id'];
        if ($staff_id) {
            $uid = $staff_id;
        }
        if (!$openGId) {
            return $this->result(-1, '请传入群openGId', []);
        }

        $info = pdo_getall('longbing_card_share_group', ['openGId' => $openGId], [], '', 'id asc');

        if (empty($info)) {
            return $this->result(-1, '未找到群信息', []);
        }

        $sql = "SELECT create_time,client_id FROM " . tablename('longbing_card_share_group') . " WHERE openGId = '{$openGId}' && client_id != {$uid} GROUP BY client_id";
        $info = pdo_fetchall($sql);
//        $users = pdo_getall('longbing_card_user', ['is_group' => 1, 'openGId' => $openGId]);
        if (empty($info)) {
            $data = [
                'count' => 0,
                'last_time' => 0
            ];
            return $this->result(0, '请求成功', $data);
        }
        $lset_time = pdo_getall('longbing_card_share_group', ['openGId' => $openGId], ['create_time'], '', ['create_time desc']);
        $lset_time = $lset_time ? $lset_time[0]['create_time'] : 0;
        $data = [
            'count' => count($info),
            'last_time' => $lset_time
        ];

        return $this->result(0, '请求成功', $data);
        // ---------------------------------------------------------------------------------------------------------
        $ids = '';
        foreach ($collection as $k => $v) {
            $ids .= ',' . $v['uid'];
        }
        $ids = trim($ids, ',');
        if (!$ids) {
            $data = [
                'count' => 0,
                'last_time' => 0
            ];
            return $this->result(0, '请求成功', $data);
        }
        if (count($collection) > 1) {
            $users = pdo_getall('longbing_card_user', ['id in' => $ids], ['uid']);
        } else {
            $users = pdo_getall('longbing_card_user', ['id' => $ids], ['uid']);
        }
        $data['count'] = count($users);
        $data['last_time'] = 0;

        $groups = pdo_getall('longbing_card_share_group', ['user_id' => [$uid]], ['update_time'], '', ['update_time desc'], 1);
        if (!empty($groups)) {
            $data['last_time'] = $groups[0]['update_time'];
        }
        return $this->result(0, '请求成功', $data);
    }

    /**
     * 群成交率统计
     * @access public
     * @return json
     */
    public function doPageTurnoverRate()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $openGId = $_GPC['openGId'];
        $staff_id = $_GPC['staff_id'];
        if ($staff_id) {
            $uid = $staff_id;
        }
        if (!$openGId) {
            return $this->result(-1, '请传入群openGId', []);
        }

        $type = $_GPC['type'];//    1=>今日数据; 2=>近七天数据; 3=>近30天数据; 4=>本月数据;

        if (!$type) {
            $type = 1;
        }

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
            default://  1=>今日数据
                // 今天开始的的时间戳
                $beginTime = mktime(0, 0, 0, date('m'), date('d'), date('Y'));
            // 今天结束的时间戳
            //                $endTime = mktime(0, 0, 0, date('m'), date('d') + 1, date('Y')) - 1;
        }

        $sql = "SELECT create_time,client_id FROM " . tablename('longbing_card_share_group') . " WHERE openGId = '{$openGId}' && client_id != {$uid} && create_time > {$beginTime} GROUP BY client_id";
        $info = pdo_fetchall($sql);

        if (empty($info)) {
            return $this->result(-1, '未找到群信息', []);
        }

        //        $users = pdo_getall('longbing_card_collection', ['to_uid' => $uid, 'update_time >' => $beginTime]);
        //        $users = pdo_getall('longbing_card_user', ['is_group' => 1, 'target_id' => $info['id'], 'to_uid' => $uid, 'update_time >' => $beginTime]);
        //        $users = pdo_getall('longbing_card_user', ['is_group' => 1, 'target_id' => $info[0]['id'], 'update_time >' => $beginTime]);
        $data['users'] = count($info);

        if (empty($info)) {
            $data['follows'] = 0;
            $data['deals'] = 0;
        } else {
            $ids = '';
            foreach ($info as $k => $v) {
                $ids .= ',' . $v['client_id'];
            }
            $ids = trim($ids, ',');

            if (count($info) > 1) {
                $ids = '(' . $ids . ')';
                $sqlF = "SELECT id FROM " . tablename('longbing_card_user_mark') . " WHERE staff_id = {$uid} && user_id IN {$ids} && create_time > {$beginTime} && mark = 1";
                $sqlD = "SELECT id FROM " . tablename('longbing_card_user_mark') . " WHERE staff_id = {$uid} && user_id IN {$ids} && create_time > {$beginTime} && mark = 2";
                $sqlC = "SELECT id FROM " . tablename('longbing_card_chat') . " WHERE target_id = {$uid} && user_id IN {$ids} && create_time > {$beginTime}";
            } else {
                $sqlF = "SELECT id FROM " . tablename('longbing_card_user_mark') . " WHERE staff_id = {$uid} && user_id = {$ids} && create_time > {$beginTime} && mark = 1";
                $sqlD = "SELECT id FROM " . tablename('longbing_card_user_mark') . " WHERE staff_id = {$uid} && user_id = {$ids} && create_time > {$beginTime} && mark = 2";
                $sqlC = "SELECT id FROM " . tablename('longbing_card_chat') . " WHERE target_id = {$uid} && user_id = {$ids} && create_time > {$beginTime}";
            }

            $follows = pdo_fetchall($sqlF);
            $data['follows'] = count($follows);

            $deals = pdo_fetchall($sqlD);
            $data['deals'] = count($deals);

            $data['follows'] += $data['deals'];

            $chats = pdo_fetchall($sqlC);
            $data['chats'] = count($chats);
        }

        $number = pdo_get('longbing_card_group_number', ['openGId' => $openGId, 'staff_id' => $uid]);

        $data['number'] = empty($number) ? 0 : $number['number'];

        $data['new_rate'] = 0;
        $data['chat_rate'] = 0;
        $data['deal_rate'] = 0;
        if ($data['number']) {
            $data['new_rate'] = sprintf("%.2f", $data['users'] / $data['number']) * 100;
            $data['chat_rate'] = sprintf("%.2f", $data['chats'] / $data['number']) * 100;
            $data['deal_rate'] = sprintf("%.2f", $data['deals'] / $data['number']) * 100;
        }

        return $this->result(0, '请求成功', $data);
    }

    /**
     * 设置群人数
     * @access public
     * @return json
    nsionDetail*/
    public function doPageSetGroupNumber()
    {
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $openGId = $_GPC['openGId'];
        $number = $_GPC['number'];
        $number = intval($number);
        $staff_id = $_GPC['staff_id'];
        if ($staff_id) {
            $uid = $staff_id;
        }
        if (!$openGId) {
            return $this->result(-1, '请传入群openGId', []);
        }
        if (!$number) {
            $number = 0;
        }
        $time = time();
        $data = array(
            'openGId' => $openGId,
            'staff_id' => $uid,
            'number' => $number,
            'uniacid' => $_W['uniacid'],
            'update_time' => $time,
        );
        $check = pdo_get('longbing_card_group_number', ['openGId' => $openGId, 'staff_id' => $uid]);
        if ($check) {
            $result = pdo_update('longbing_card_group_number', $data, ['id' => $check['id']]);
        } else {
            $data['create_time'] = $time;
            $result = pdo_insert('longbing_card_group_number', $data);
        }

        if ($result) {
            return $this->result(0, '设置成功', []);
        }
        return $this->result(-1, '设置失败', []);
    }

    /**
     * 成交率统计
     * @access public
     * @return json
     */
    public function doPageTurnoverRateTotal()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $staff_id = $_GPC['staff_id'];
        if ($staff_id) {
            $uid = $staff_id;
        }
        //        $type = $_GPC['type'];//    1=>今日数据; 2=>近七天数据; 3=>近30天数据; 4=>本月数据;
        //
        //        if (!$type)
        //            $type = 1;
        //
        //        switch ($type) {
        //            case 2://   2=>近七天数据
        //                // 七天前开始的的时间戳
        //                $beginTime = mktime(0, 0, 0, date('m'), date('d') - 7, date('Y'));
        //                break;
        //            case 3://   3=>近30天数据
        //                $beginTime = mktime(0, 0, 0, date('m'), date('d') - 30, date('Y'));
        //                break;
        //            case 4://   4=>本月数据
        //                // 本月开始的的时间戳
        //                $beginTime = mktime(0, 0, 0, date('m'), 1, date('Y'));
        //                break;
        //            default://  1=>今日数据
        //                // 今天开始的的时间戳
        //                $beginTime = mktime(0, 0, 0, date('m'), date('d'), date('Y'));
        //            // 今天结束的时间戳
        ////                $endTime = mktime(0, 0, 0, date('m'), date('d') + 1, date('Y')) - 1;
        //        }

        $users = pdo_getall('longbing_card_collection', ['to_uid' => $uid, 'uid !=' => $uid]);
        $data['users'] = count($users);

        $sqlF = "SELECT id FROM " . tablename('longbing_card_user_mark') . " WHERE staff_id = {$uid} && mark = 1";
        $sqlD = "SELECT id FROM " . tablename('longbing_card_user_mark') . " WHERE staff_id = {$uid} && mark = 2";
        $follows = pdo_fetchall($sqlF);
        $data['follows'] = count($follows);

        $deals = pdo_fetchall($sqlD);
        $data['deals'] = count($deals);
        $data['follows'] += $data['deals'];

        return $this->result(0, '请求成功', $data);
    }

    /**
     * 互动分类
     * @access public
     * @return json
     */
    public function doPageInteraction()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $type = $_GPC['type'];//    1=>今日数据; 2=>近七天数据; 3=>近30天数据; 4=>本月数据;
        $staff_id = $_GPC['staff_id'];
        if ($staff_id) {
            $uid = $staff_id;
        }


        $openGId = $_GPC['openGId'];

        if (!$openGId) {
            return $this->result(-1, '请传入群openGId', []);
        }

        if (!$type) {
            $type = 1;
        }

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
            default://  1=>今日数据
                // 今天开始的的时间戳
                $beginTime = mktime(0, 0, 0, date('m'), date('d'), date('Y'));
            // 今天结束的时间戳
            //                $endTime = mktime(0, 0, 0, date('m'), date('d') + 1, date('Y')) - 1;
        }

        //        $info = pdo_getall('longbing_card_share_group', ['openGId' => $openGId]);
        //        $info = pdo_getall('longbing_card_share_group', ['openGId' => $openGId], [], '', 'id asc');
        $sql = "SELECT create_time,client_id FROM " . tablename('longbing_card_share_group') . " WHERE openGId = '{$openGId}' && client_id != {$uid} && create_time > {$beginTime} GROUP BY client_id";
        $info = pdo_fetchall($sql);

        if (empty($info)) {
            return $this->result(-1, '未找到群信息', []);
        }

        $data = [
            'goods' => ['count' => 0, 'rate' => 0],
            'timeline' => ['count' => 0, 'rate' => 0],
            'card' => ['count' => 0, 'rate' => 0],
            'qr' => ['count' => 0, 'rate' => 0],
            'custom_qr' => ['count' => 0, 'rate' => 0],
        ];
        if (empty($info)) {
            return $this->result(0, '请求成功', $data);
        } else {
            $ids = '';
            foreach ($info as $k => $v) {
                $ids .= ',' . $v['client_id'];
            }
            $ids = trim($ids, ',');

            if (count($info) > 1) {
                $ids = '(' . $ids . ')';
                //                $sql = "SELECT * FROM " . tablename('longbing_card_count') ."longbing_card_praise WHERE to_uid = {$uid} && type = 2 && create_time > {$beginTime} && uid in {$ids}";
                $sql = "SELECT * FROM " . tablename('longbing_card_count') . " WHERE to_uid = {$uid} && type = 2 && create_time > {$beginTime} && user_id in {$ids} && sign = 'praise'";
                $cards = pdo_fetchall($sql);
                $data['card']['count'] = count($cards);

                $sql = "SELECT * FROM " . tablename('longbing_card_custom_qr_record') . " WHERE staff_id = {$uid} && create_time > {$beginTime} && user_id in {$ids}";
                $custom_qr = pdo_fetchall($sql);
                $data['custom_qr']['count'] = count($custom_qr);

                $sql = "SELECT * FROM " . tablename('longbing_card_count') . " WHERE to_uid = {$uid} && type = 2 && create_time > {$beginTime} && user_id in {$ids} && sign = 'view'";
                $goods = pdo_fetchall($sql);
                $data['goods']['count'] = count($goods);

                $sql = "SELECT * FROM " . tablename('longbing_card_count') . " WHERE to_uid = {$uid} && type = 7 && create_time > {$beginTime} && user_id in {$ids} && sign = 'view'";
                $timeline = pdo_fetchall($sql);
                $data['timeline']['count'] = count($timeline);


            } else {
                //                $sql = "SELECT * FROM " . tablename('longbing_card_praise') ." WHERE to_uid = {$uid} && type = 2 && create_time > {$beginTime} && uid = {$ids}";
                $sql = "SELECT * FROM " . tablename('longbing_card_count') . " WHERE to_uid = {$uid} && type = 2 && create_time > {$beginTime} && user_id = {$ids} && sign = 'praise'";
                $cards = pdo_fetchall($sql);
                $data['card']['count'] = count($cards);

                $sql = "SELECT * FROM " . tablename('longbing_card_custom_qr_record') . " WHERE staff_id = {$uid} && create_time > {$beginTime} && user_id = {$ids}";
                $custom_qr = pdo_fetchall($sql);
                $data['custom_qr']['count'] = count($custom_qr);

                $sql = "SELECT * FROM " . tablename('longbing_card_count') . " WHERE to_uid = {$uid} && type = 2 && create_time > {$beginTime} && user_id = {$ids} && sign = 'view'";
                $goods = pdo_fetchall($sql);
                $data['goods']['count'] = count($goods);

                $sql = "SELECT * FROM " . tablename('longbing_card_count') . " WHERE to_uid = {$uid} && type = 7 && create_time > {$beginTime} && user_id = {$ids} && sign = 'view'";
                $timeline = pdo_fetchall($sql);
                $data['timeline']['count'] = count($timeline);
            }
        }


        $total = 0;
        foreach ($data as $k => $v) {
            $total += $v['count'];
        }
        if ($total > 0) {
            foreach ($data as $k => $v) {
                $data[$k]['rate'] = sprintf("%.2f", $v['count'] / $total) * 100;
            }
        }


        return $this->result(0, '请求成功', $data);
    }

    /**
     * 群互动排行榜
     * @access public
     * @return json
     */
    public function doPageGroupRank()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $openGId = $_GPC['openGId'];
        $staff_id = $_GPC['staff_id'];
        if ($staff_id) {
            $uid = $staff_id;
        }

        if (!$openGId) {
            return $this->result(-1, '请传入群openGId', []);
        }

        //        $info = pdo_get('longbing_card_share_group', ['openGId' => $openGId]);
        $info = pdo_getall('longbing_card_share_group', ['openGId' => $openGId, 'user_id' => $uid], [], '', 'id asc');
        if (empty($info)) {
            return $this->result(-1, '未找到群信息', []);
        }


        $type = $_GPC['type'];//    1=>今日数据; 2=>近七天数据; 3=>近30天数据; 4=>本月数据;
        $order = $_GPC['order'];//    time=>按最近互动时间排序, number=>按互动次数排序;

        if (!$type) {
            $type = 1;
        }
        if (!$order) {
            $order = 'time';
        }


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
            default://  1=>今日数据
                // 今天开始的的时间戳
                $beginTime = mktime(0, 0, 0, date('m'), date('d'), date('Y'));
        }

        $sql = "SELECT sum( view_goods ) AS `view_goods_sum`, sum( view_card ) AS `view_card_sum`, sum( view_custom_qr ) AS `view_custom_qr_sum`,sum( view_timeline ) AS `view_timeline_sum`,create_time,client_id,openGId FROM " . tablename('longbing_card_share_group') . " WHERE openGId = '{$openGId}' && user_id = {$uid} && client_id != {$uid} && create_time > {$beginTime} GROUP BY client_id";
        $groups = pdo_fetchall($sql);

        if (!empty($groups)) {
            foreach ($groups as $k => $v) {
                $groups[$k]['count'] = $v['view_goods_sum'] + $v['view_card_sum'] + $v['view_custom_qr_sum'] + $v['view_timeline_sum'];
                $info = pdo_get('longbing_card_client_info', ['user_id' => $v['client_id']]);

                $groups[$k]['name'] = $info['name'];
                $user = pdo_get('longbing_card_user', ['id' => $v['client_id']]);
                $groups[$k]['name'] = $info['name'] ? $info['name'] : $user['nickName'];
                $groups[$k]['avatarUrl'] = $user['avatarUrl'];

            }
        }
        if ($order == 'time') {
            array_multisort(array_column($groups, 'create_time'), SORT_DESC, $groups);
        } else {
            array_multisort(array_column($groups, 'count'), SORT_DESC, $groups);
        }

        return $this->result(0, '请求成功', $groups);
    }

    /**
     * 客户列表
     * @access public
     * @return json
     */
    public function doPageClientList()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $type = $_GPC['type'];//    1=>新增客户; 2=>跟进中; 3=>已成交;
        $staff_id = $_GPC['staff_id'];
        $uniacid = $_W['uniacid'];
        if ($staff_id) {
            $uid = $staff_id;
            $type = 1;
        }
        if (!$type) {
            $type = 1;
        }

        $limit = array(1, 15);

        $curr = 1;
        if (isset($_GPC['page'])) {
            $limit[0] = $_GPC['page'];
            $curr = $_GPC['page'];
        }


        $ids = '';
        if ($type == 1) {
            $collections = pdo_getslice('longbing_card_collection', ['to_uid' => $uid, 'uid !=' => $uid], $limit, $count, ['id', 'uid', 'create_time'], '', 'update_time desc');
            if (!empty($collections)) {
                foreach ($collections as $k => $v) {
                    $ids .= ',' . $v['uid'];
                }
                $ids = trim($ids, ',');
            }
        } else if ($type == 2) {
            $list = pdo_getslice('longbing_card_user_mark', ['staff_id' => $uid, 'mark' => 1], $limit, $count, [], '', ['create_time desc']);
            if (!empty($list)) {
                foreach ($list as $k => $v) {
                    $ids .= ',' . $v['user_id'];
                }
                $ids = trim($ids, ',');
            }
        } else if ($type == 3) {
            $list = pdo_getslice('longbing_card_user_mark', ['staff_id' => $uid, 'mark' => 2], $limit, $count, [], '', ['create_time desc']);
            if (!empty($list)) {
                foreach ($list as $k => $v) {
                    $ids .= ',' . $v['user_id'];
                }
                $ids = trim($ids, ',');
            }
        } else {
            return $this->result(-1, '请求失败', []);
        }


        if (!$ids) {
            return $this->result(0, '请求成功', []);
        }
        if (strpos($ids, ',')) {
            $sql = "SELECT id,nickName,avatarUrl FROM " . tablename('longbing_card_user') . " where `id` in ($ids)";
        } else {
            $sql = "SELECT id,nickName,avatarUrl FROM " . tablename('longbing_card_user') . " where `id` = $ids";
        }

        $users = pdo_fetchall($sql);

        foreach ($users as $k => $v) {
            $praise = pdo_getall('longbing_card_count', ['user_id' => $v['id'], 'to_uid' => $uid, 'sign' => 'praise'], ['id', 'create_time'], '', ['create_time desc']);
            $message1 = pdo_getall('longbing_card_message', ['user_id' => $v['id'], 'target_id' => $uid], ['id', 'create_time'], '', ['create_time desc']);
            $message2 = pdo_getall('longbing_card_message', ['user_id' => $uid, 'target_id' => $v['id']], ['id', 'create_time'], '', ['create_time desc']);
            $view = pdo_getall('longbing_card_count', ['user_id' => $uid, 'to_uid' => $v['id'], 'sign' => 'view'], ['id', 'create_time'], '', ['create_time desc']);
            $copy = pdo_getall('longbing_card_count', ['user_id' => $uid, 'to_uid' => $v['id'], 'sign' => 'copy'], ['id', 'create_time'], '', ['create_time desc']);
            $users[$k]['count'] = count($praise) + count($message1) + count($message2) + count($view) + count($copy);
            $times = [];
            $times[] = $praise[0]['create_time'];
            $times[] = $message1[0]['create_time'];
            $times[] = $message2[0]['create_time'];
            $times[] = $view[0]['create_time'];
            $times[] = $copy[0]['create_time'];
            rsort($times);
            $users[$k]['last_time'] = $times[0] ? $times[0] : 0;
            $phone = pdo_get('longbing_card_user_phone', ['user_id' => $v['id']]);
            $client_info = pdo_get('longbing_card_client_info', ['user_id' => $v['id']]);
            $client_phone = '';
            if (!empty($client_info) && $client_info['phone']) {
                $client_phone = $client_info['phone'];
            }
            $users[$k]['phone'] = !empty($phone) ? $phone['phone'] : $client_phone;
        }

        if ($staff_id) {
            foreach ($users as $k => $v) {
                $client_info = pdo_get('longbing_card_client_info', ['user_id' => $v['id'], 'uniacid' => $uniacid]);
                $users[$k]['name'] = !$client_info ? '' : $client_info['name'];


                //  AI成交率
                $rate = pdo_getall('longbing_card_rate', ['user_id' => $v['id'], 'uniacid' => $uniacid], [], '', ['rate desc']);
                $users[$k]['rate'] = !$rate ? 0 : $rate[0]['rate'];
//
                //  预计成交时间
                $date = pdo_getall('longbing_card_date', ['user_id' => $v['id'], 'uniacid' => $uniacid], [], '', ['date desc']);
                $users[$k]['date'] = !$date ? 0 : $date[0]['date'];

                //  跟进状态
                $mark = @pdo_getall('longbing_card_user_mark', ['user_id' => $v['id']], [], '', ['status desc', 'mark desc']);
                $users[$k]['mark'] = !$mark ? 0 : $mark[0]['mark'];

                $users[$k]['order'] = 0;
                $users[$k]['money'] = 0;

            }
        }
        $data = [
            'page' => $curr,
            'total_page' => ceil($count / 15),
            'list' => $users,
            'total_count' => $count
        ];
//        $this->pp($data);
        return $this->result(0, '请求成功', $data);
    }

    /**
     * 添加客户跟进记录
     * @access public
     * @return json
     */
    public function doPageFollowInsert()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $client_id = $_GPC['client_id'];
        $content = $_GPC['content'];
        $staff_id = $_GPC['staff_id'];
        $type = $_GPC['type'];
        if ($staff_id) {
            $uid = $staff_id;
        }
        if (!$type) {
            $type = 1;
        }

        if (!$client_id || !$content) {
            return $this->result(-1, '请传入参数', []);
        }
        $time = time();
        $data = [
            'user_id' => $client_id,
            'staff_id' => $uid,
            'content' => $content,
            'uniacid' => $_W['uniacid'],
            'type' => $type,
            'create_time' => $time,
            'update_time' => $time,
        ];

        $result = pdo_insert('longbing_card_user_follow', $data);
        $check = pdo_get('longbing_card_user_mark', ['user_id' => $client_id, 'staff_id' => $uid]);
        if (empty($check)) {
            pdo_insert('longbing_card_user_mark', [
                'user_id' => $client_id,
                'staff_id' => $uid,
                'uniacid' => $_W['uniacid'],
                'mark' => 1,
                'create_time' => time(),
                'update_time' => time()
            ]);
        }
        if ($result) {
            return $this->result(0, '添加成功', []);
        } else {
            return $this->result(-1, '添加失败', []);
        }
    }

    /**
     * 修改客户跟进记录
     * @access public
     * @return json
     */
    public function doPageFollowUpdate()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $id = $_GPC['id'];
        $content = $_GPC['content'];
        $staff_id = $_GPC['staff_id'];
        if ($staff_id) {
            $uid = $staff_id;
        }

        if (!$id || !$content) {
            return $this->result(-1, '请传入参数', []);
        }
        $time = time();
        $data = [
            'content' => $content,
            'update_time' => $time,
        ];

        $check = pdo_get('longbing_card_user_follow', ['staff_id' => $uid, 'id' => $id]);
        if (empty($check)) {
            return $this->result(-1, '未找到数据', []);
        }

        $result = pdo_update('longbing_card_user_follow', $data, ['id' => $id]);

        if ($result) {
            return $this->result(0, '修改成功', []);
        } else {
            return $this->result(-1, '修改失败', []);
        }
    }

    /**
     * 删除客户跟进记录
     * @access public
     * @return json
     */
    public function doPageFollowDelete()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $id = $_GPC['id'];
        $staff_id = $_GPC['staff_id'];
        if ($staff_id) {
            $uid = $staff_id;
        }

        if (!$id) {
            return $this->result(-1, '请传入参数', []);
        }

        $check = pdo_get('longbing_card_user_follow', ['staff_id' => $uid, 'id' => $id]);
        if (empty($check)) {
            return $this->result(-1, '未找到数据', []);
        }

        $result = pdo_delete('longbing_card_user_follow', ['id' => $id]);

        if ($result) {
            return $this->result(0, '删除成功', []);
        } else {
            return $this->result(-1, '删除失败', []);
        }
    }

    /**
     * 客户跟进记录列表
     * @access public
     * @return json
     */
    public function doPageFollowList()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $client_id = $_GPC['client_id'];
        $staff_id = $_GPC['staff_id'];
        if ($staff_id) {
            $uid = $staff_id;
        }
        $uniacid = $_W['uniacid'];


            if (!$uid || !$client_id) {
                return $this->result(-1, '请传入参数', []);
            }


        if ($staff_id) {
            $follow = pdo_fetchall("SELECT id,user_id,staff_id,content,create_time,type FROM " . tablename('longbing_card_user_follow') . " where staff_id = {$uid} && uniacid = {$uniacid} && user_id = {$client_id}");

            $mark = pdo_fetchall("SELECT id,user_id,staff_id,mark,create_time FROM " . tablename('longbing_card_user_mark') . " where staff_id = {$uid} && uniacid = {$uniacid} && user_id = {$client_id}");

            $label = pdo_fetchall("SELECT a.id,a.user_id,a.staff_id,a.create_time,b.name FROM " . tablename('longbing_card_user_label') . " a LEFT JOIN " . tablename('longbing_card_label') . " b ON a.lable_id = b.id where a.staff_id = {$uid} && a.uniacid = {$uniacid} && a.user_id = {$client_id}");
        } else {
            $follow = pdo_fetchall("SELECT id,user_id,staff_id,content,create_time,type FROM " . tablename('longbing_card_user_follow') . " where user_id = {$client_id} && staff_id = {$uid} && uniacid = {$uniacid}");

            $mark = pdo_fetchall("SELECT id,user_id,staff_id,mark,create_time FROM " . tablename('longbing_card_user_mark') . " where user_id = {$client_id} && staff_id = {$uid} && uniacid = {$uniacid}");

            $label = pdo_fetchall("SELECT a.id,a.user_id,a.staff_id,a.create_time,b.name FROM " . tablename('longbing_card_user_label') . " a LEFT JOIN " . tablename('longbing_card_label') . " b ON a.lable_id = b.id where a.user_id = {$client_id} && a.staff_id = {$uid} && a.uniacid = {$uniacid}");
        }


        function meargeList(&$value, $key, $param)
        {
            $value[$param['key']] = $param['val'];
            if (isset($value['count(a.uid)']))
                $value['count'] = $value['count(a.uid)'];
        }

        array_walk($follow, "meargeList", array('key' => 'sign', 'val' => 'follow'));
        array_walk($mark, "meargeList", array('key' => 'sign', 'val' => 'mark'));
        array_walk($label, "meargeList", array('key' => 'sign', 'val' => 'label'));

        $array = array_merge($follow, $mark, $label);

        //  二维数组排序
        array_multisort(array_column($array, 'create_time'), SORT_DESC, $array);

        $limit = array(1, 10);

        $curr = 1;
        if (isset($_GPC['page'])) {
            $limit[0] = $_GPC['page'];
            $curr = $_GPC['page'];
        }
        $offset = ($curr - 1) * 10;
        $array = array_slice($array, $offset, 10);
        $data = [
            'page' => $curr,
            'total_page' => ceil(count($array) / 10),
            'list' => $array,
            'total_count' => count($array)
        ];

        return $this->result(0, '请求成功', $data);
    }

    /**
     * 客户兴趣
     * @access public
     * @return json
     */
    public function doPageInterest()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $type = $_GPC['type'];//    1=>今日数据; 2=>近七天数据; 3=>近30天数据; 4=>本月数据;
        $client_id = $_GPC['client_id'];
        $staff_id = $_GPC['staff_id'];
        if ($staff_id) {
            $uid = $staff_id;
        }

        $uniacid = $_W['uniacid'];
        if (!$uid || !$client_id) {
            return $this->result(-1, '请传入参数', []);
        }

        if (!$type) {
            $type = 3;
        }
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
            default://  1=>今日数据
                // 今天开始的的时间戳
                $beginTime = mktime(0, 0, 0, date('m'), date('d'), date('Y'));
        }
        $data = [];
        $total_count = 0;

        //  转发名片
        $qr_share = pdo_getall('longbing_card_forward', ['staff_id' => $uid, 'user_id' => $client_id, 'type' => 1, 'create_time >' => $beginTime], ['id']);

        //  浏览名片
        $qr_view = pdo_getall('longbing_card_count', ['to_uid' => $uid, 'user_id' => $client_id, 'type' => 2, 'create_time >' => $beginTime, 'sign' => 'praise'], ['id']);

        $count = count($qr_share) + count($qr_view);
        if ($count) {
            $data['qr'] = [
                'count' => $count,
                'rate' => 0
            ];
            $total_count += $count;
        }


        //  转发动态
        $timeline_share = pdo_getall('longbing_card_forward', ['staff_id' => $uid, 'user_id' => $client_id, 'type' => 3, 'create_time >' => $beginTime], ['id']);
        //  浏览动态
        //        $timeline_view = pdo_getall('longbing_card_view_count', ['to_uid' => $uid, 'user_id' => $client_id, 'type' => 7, 'create_time >' => $beginTime], ['id']);
        $timeline_view = pdo_getall('longbing_card_count', ['to_uid' => $uid, 'user_id' => $client_id, 'type' => 7, 'create_time >' => $beginTime, 'sign' => 'view'], ['id']);
        $count = count($timeline_share) + count($timeline_view);
        if ($count) {
            $data['timeline'] = [
                'count' => $count,
                'rate' => 0
            ];
            $total_count += $count;
        }

        //  转发商品
        $goods_share = pdo_getall('longbing_card_forward', ['staff_id' => $uid, 'user_id' => $client_id, 'type' => 2, 'create_time >' => $beginTime], ['id']);
        //  浏览商品
        //        $goods_view = pdo_getall('longbing_card_view_count', ['to_uid' => $uid, 'user_id' => $client_id, 'type' => 2, 'create_time >' => $beginTime], ['id']);
        $goods_view = pdo_getall('longbing_card_count', ['to_uid' => $uid, 'user_id' => $client_id, 'type' => 2, 'create_time >' => $beginTime, 'sign' => 'view'], ['id']);
        $count = count($goods_share) + count($goods_view);
        if ($count) {
            $data['goods'] = [
                'count' => $count,
                'rate' => 0
            ];
            $total_count += $count;
        }

        //  浏览自定义码
        $custom_qr_view = pdo_getall('longbing_card_custom_qr_record', ['staff_id' => $uid, 'user_id' => $client_id, 'create_time >' => $beginTime]);
        $count = count($custom_qr_view);
        if ($count) {
            $data['custom_qr'] = [
                'count' => $count,
                'rate' => 0
            ];
            $total_count += $count;
        }
        if ($total_count) {
            foreach ($data as $k => $v) {
                $data[$k]['rate'] = sprintf("%.2f", $v['count'] / $total_count) * 100;
            }
        }
        return $this->result(0, '请求成功', $data);
    }

    /**
     * 新增用户自定义码浏览记录
     * @access public
     * @return json
     */
    public function doPageCustomQrRecordInsert()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $staff_id = $_GPC['to_uid'];
        $qr_id = $_GPC['qr_id'];

        if (!$qr_id) {
            $qr_id = 0;
        }

        if (!$uid || !$staff_id) {
            return $this->result(-1, '请传入参数', []);
        }

        $result = pdo_insert('longbing_card_custom_qr_record', [
            'user_id' => $uid,
            'staff_id' => $staff_id,
            'qr_id' => $qr_id,
            'uniacid' => $_W['uniacid'],
            'create_time' => time(),
            'update_time' => time(),
        ]);
        if ($result) {
            return $this->result(0, '添加成功', []);
        } else {
            return $this->result(-1, '添加失败', []);
        }
    }

    /**
     * 客户活跃度
     * @access public
     * @return json
     */
    public function doPageActivity()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $type = $_GPC['type'];//    1=>近七天数据; 2=>近30天数据
        $client_id = $_GPC['client_id'];
        $staff_id = $_GPC['staff_id'];
        if ($staff_id) {
            $uid = $staff_id;
        }
        $uniacid = $_W['uniacid'];


        if ($type != 1 && $type != 2) {
            $type = 1;
        }

        if (!$uid || !$client_id) {
            return $this->result(-1, '请传入参数', []);
        }
        $last = 0;
        switch ($type) {
            case 1://   1=>近七天数据
                $last = 7;
                break;
            case 2:
                $last = 30;
                break;
        }

        $data = [];
        for ($i = 0; $i < $last; $i++) {
            $beginTime = mktime(0, 0, 0, date('m'), date('d') - $i, date('Y'));
            $endTime = mktime(0, 0, 0, date('m'), date('d') - $i + 1, date('Y')) - 1;
            $date = date('Y-m-d', $beginTime);
            $data[$i]['date'] = $date;
            $data[$i]['beginTime'] = $beginTime;
            $data[$i]['endTime'] = $endTime;

            $count1 = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_custom_qr_record') . " WHERE user_id = {$client_id} && staff_id = {$uid} && create_time BETWEEN {$beginTime} AND {$endTime}");

            $count2 = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_forward') . " WHERE user_id = {$client_id} && staff_id = {$uid} && create_time BETWEEN {$beginTime} AND {$endTime}");

            $count3 = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_message') . " WHERE user_id = {$client_id} && target_id = {$uid} && create_time BETWEEN {$beginTime} AND {$endTime}");

            //            $count4 = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_count') ."longbing_card_copy_count WHERE user_id = {$client_id} && to_uid = {$uid} && create_time BETWEEN {$beginTime} AND {$endTime}");
            $count4 = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_count') . " WHERE user_id = {$client_id} && to_uid = {$uid} && create_time BETWEEN {$beginTime} AND {$endTime} && sign = 'copy'");

            //            $count5 = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_count') ."longbing_card_view_count WHERE user_id = {$client_id} && to_uid = {$uid} && create_time BETWEEN {$beginTime} AND {$endTime}");
            $count5 = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_count') . " WHERE user_id = {$client_id} && to_uid = {$uid} && create_time BETWEEN {$beginTime} AND {$endTime} && sign = 'view'");

            //            $count6 = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_count') ."longbing_card_praise WHERE uid = {$client_id} && to_uid = {$uid} && create_time BETWEEN {$beginTime} AND {$endTime}");
            $count6 = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_count') . " WHERE user_id = {$client_id} && to_uid = {$uid} && create_time BETWEEN {$beginTime} AND {$endTime} && sign = 'praise'");

            $count = count($count1) + count($count2) + count($count3) + count($count4) + count($count5) + count($count6);
            $data[$i]['count'] = $count;
        }
        return $this->result(0, '添加成功', $data);
    }

    /**
     * 客户标签列表
     * @access public
     * @return json
     */
    public function doPageClientLabels()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $client_id = $_GPC['client_id'];
        $staff_id = $_GPC['staff_id'];
        if ($staff_id) {
            $uid = $staff_id;
        }
        $uniacid = $_W['uniacid'];

        if (!$uid || !$client_id) {
            return $this->result(-1, '请传入参数', []);
        }

        $data = [];

        $label = pdo_fetchall("SELECT a.id,a.user_id,a.staff_id,a.create_time,b.name FROM " . tablename('longbing_card_user_label') . " a LEFT JOIN " . tablename('longbing_card_label') . " b ON a.lable_id = b.id where a.user_id = {$client_id} && a.staff_id = {$uid} && a.uniacid = {$uniacid}");

        return $this->result(0, '添加成功', $data);
    }

    /**
     * 客户互动
     * @access public
     * @return json
     */
    public function doPageClientInteraction()
    {
        global $_GPC, $_W;
        $uid = $_GPC['user_id'] = 3;
        $type = $_GPC['type'];//    1=>今日数据; 2=>近七天数据; 3=>近30天数据; 4=>本月数据; 5=>全部数据
        $client_id = $_GPC['client_id'] = 1;
        $staff_id = $_GPC['staff_id'];
        if ($staff_id) {
            $uid = $staff_id;
        }
        $uniacid = $_W['uniacid'];

        if (!$type) {
            $type = 3;
        }

        if (!$uid || !$client_id) {
            return $this->result(-1, '请传入参数', []);
        }

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
            case 5://   5=>全部数据
                $beginTime = 0;
                break;
            default://  1=>今日数据
                // 今天开始的的时间戳
                $beginTime = mktime(0, 0, 0, date('m'), date('d'), date('Y'));
        }

        $total_count = 0;
        $data = [];

        //  识别自定义码
        $list = pdo_getall('longbing_card_custom_qr_record',
            [
                'user_id' => $client_id,
                'staff_id' => $uid,
                'qr_id >' => 0,
                'create_time >' => $beginTime
            ],
            ['id']
        );
        $count = count($list);
        if ($count) {
            $total_count += $count;
            $data['custom_qr'] = ['count' => $count, 'rate' => 0, 'title' => '识别自定义码'];
        }

        //  识别名片码
        $list = pdo_getall('longbing_card_custom_qr_record',
            [
                'user_id' => $client_id,
                'staff_id' => $uid,
                'qr_id' => 0,
                'create_time >' => $beginTime
            ],
            ['id']
        );
        $count = count($list);
        if ($count) {
            $total_count += $count;
            $data['qr'] = ['count' => $count, 'rate' => 0, 'title' => '识别名片码'];
        }

        //  转发
        $list = pdo_getall('longbing_card_forward',
            [
                'user_id' => $client_id,
                'staff_id' => $uid,
                'create_time >' => $beginTime
            ],
            ['id', 'type']
        );
        if (!empty($list)) {
            foreach ($list as $k => $v) {
                $total_count += 1;
                switch ($v['type']) {
                    case 1:
                        if (isset($data['share_card'])) {
                            $data['share_card']['count'] += 1;
                        } else {
                            $data['share_card'] = ['count' => 1, 'rate' => 0, 'title' => '分享名片'];
                        }
                        break;
                    case 2:
                        if (isset($data['share_goods'])) {
                            $data['share_goods']['count'] += 1;
                        } else {
                            $data['share_goods'] = ['count' => 1, 'rate' => 0, 'title' => '分享商品'];
                        }
                        break;
                    case 3:
                        if (isset($data['share_timeline'])) {
                            $data['share_timeline']['count'] += 1;
                        } else {
                            $data['share_timeline'] = ['count' => 1, 'rate' => 0, 'title' => '分享动态'];
                        }
                        break;
                    case 4:
                        if (isset($data['share_web'])) {
                            $data['share_web']['count'] += 1;
                        } else {
                            $data['share_web'] = ['count' => 1, 'rate' => 0, 'title' => '分享官网'];
                        }
                        break;
                }
            }
        }

        //  聊天
        $list = pdo_getall('longbing_card_message',
            [
                'user_id' => $client_id,
                'target_id' => $uid,
                'create_time >' => $beginTime
            ],
            ['id']
        );
        $count = count($list);
        if ($count) {
            $total_count += $count;
            $data['send_message'] = ['count' => $count, 'rate' => 0, 'title' => '发送聊天信息'];
        }

        //  用户操作内容
        $list = pdo_getall('longbing_card_count',
            [
                'user_id' => $client_id,
                'to_uid' => $uid,
                'sign' => 'copy',
                'create_time >' => $beginTime
            ],
            ['id', 'type']
        );
        if (!empty($list)) {
            foreach ($list as $k => $v) {
                $total_count += 1;
                switch ($v['type']) {
                    case 1:
                        if (isset($data['copy_count_1'])) {
                            $data['copy_count_1']['count'] += 1;
                        } else {
                            $data['copy_count_1'] = ['count' => 1, 'rate' => 0, 'title' => '同步到通讯录'];
                        }
                        break;
                    case 2:
                        if (isset($data['copy_count_2'])) {
                            $data['copy_count_2']['count'] += 1;
                        } else {
                            $data['copy_count_2'] = ['count' => 1, 'rate' => 0, 'title' => '拨打手机号'];
                        }
                        break;
                    case 3:
                        if (isset($data['copy_count_3'])) {
                            $data['copy_count_3']['count'] += 1;
                        } else {
                            $data['copy_count_3'] = ['count' => 1, 'rate' => 0, 'title' => '拨打座机号'];
                        }
                        break;
                    case 4:
                        if (isset($data['copy_count_4'])) {
                            $data['copy_count_4']['count'] += 1;
                        } else {
                            $data['copy_count_4'] = ['count' => 1, 'rate' => 0, 'title' => '复制微信'];
                        }
                        break;
                    case 5:
                        if (isset($data['copy_count_5'])) {
                            $data['copy_count_5']['count'] += 1;
                        } else {
                            $data['copy_count_5'] = ['count' => 1, 'rate' => 0, 'title' => '复制邮箱'];
                        }
                        break;
                    case 6:
                        if (isset($data['copy_count_6'])) {
                            $data['copy_count_6']['count'] += 1;
                        } else {
                            $data['copy_count_6'] = ['count' => 1, 'rate' => 0, 'title' => '复制公司名'];
                        }
                        break;
                    case 7:
                        if (isset($data['copy_count_7'])) {
                            $data['copy_count_7']['count'] += 1;
                        } else {
                            $data['copy_count_7'] = ['count' => 1, 'rate' => 0, 'title' => '查看定位'];
                        }
                        break;
                    case 8:
                        if (isset($data['copy_count_8'])) {
                            $data['copy_count_8']['count'] += 1;
                        } else {
                            $data['copy_count_8'] = ['count' => 1, 'rate' => 0, 'title' => '咨询产品'];
                        }
                        break;
                    case 9:
                        if (isset($data['copy_count_9'])) {
                            $data['copy_count_9']['count'] += 1;
                        } else {
                            $data['copy_count_9'] = ['count' => 1, 'rate' => 0, 'title' => '播放语音'];
                        }
                        break;
                }
            }
        }

        //  用户浏览内容
        $list = pdo_getall('longbing_card_count',
            [
                'user_id' => $client_id,
                'to_uid' => $uid,
                'sign' => 'view',
                'create_time >' => $beginTime
            ],
            ['id', 'type']
        );
        if (!empty($list)) {
            foreach ($list as $k => $v) {
                $total_count += 1;
                switch ($v['type']) {
                    case 1:
                        if (isset($data['view_count_1'])) {
                            $data['view_count_1']['count'] += 1;
                        } else {
                            $data['view_count_1'] = ['count' => 1, 'rate' => 0, 'title' => '浏览商城列表'];
                        }
                        break;
                    case 2:
                        if (isset($data['view_count_2'])) {
                            $data['view_count_2']['count'] += 1;
                        } else {
                            $data['view_count_2'] = ['count' => 1, 'rate' => 0, 'title' => '浏览商品详情'];
                        }
                        break;
                    case 3:
                        if (isset($data['view_count_3'])) {
                            $data['view_count_3']['count'] += 1;
                        } else {
                            $data['view_count_3'] = ['count' => 1, 'rate' => 0, 'title' => '浏览动态列表'];
                        }
                        break;
                    case 4:
                        if (isset($data['view_count_4'])) {
                            $data['view_count_4']['count'] += 1;
                        } else {
                            $data['view_count_4'] = ['count' => 1, 'rate' => 0, 'title' => '点赞动态'];
                        }
                        break;
                    case 5:
                        if (isset($data['view_count_5'])) {
                            $data['view_count_5']['count'] += 1;
                        } else {
                            $data['view_count_5'] = ['count' => 1, 'rate' => 0, 'title' => '动态留言'];
                        }
                        break;
                    case 6:
                        if (isset($data['view_count_6'])) {
                            $data['view_count_6']['count'] += 1;
                        } else {
                            $data['view_count_6'] = ['count' => 1, 'rate' => 0, 'title' => '浏览公司官网'];
                        }
                        break;
                    case 7:
                        if (isset($data['view_count_7'])) {
                            $data['view_count_7']['count'] += 1;
                        } else {
                            $data['view_count_7'] = ['count' => 1, 'rate' => 0, 'title' => '浏览动态详情'];
                        }
                        break;
                }
            }
        }

        //  用户评论动态
        $list = pdo_getall('longbing_card_timeline_comment',
            [
                'user_id' => $client_id,
                'create_time >' => $beginTime
            ],
            ['id']
        );
        $count = count($list);
        if ($count) {
            $total_count += $count;
            $data['timeline_comment'] = ['count' => $count, 'rate' => 0, 'title' => '评论动态'];
        }

        //  动态点赞
        $list = pdo_getall('longbing_card_timeline_thumbs',
            [
                'user_id' => $client_id,
                'create_time >' => $beginTime
            ],
            ['id']
        );
        $count = count($list);
        if ($count) {
            $total_count += $count;
            $data['timeline_thumbs'] = ['count' => $count, 'rate' => 0, 'title' => '点赞动态'];
        }

        //  商品收藏
        $list = pdo_getall('longbing_card_goods_collection',
            [
                'user_id' => $client_id,
                'create_time >' => $beginTime
            ],
            ['id']
        );
        $count = count($list);
        if ($count) {
            $total_count += $count;
            $data['goods_collection'] = ['count' => $count, 'rate' => 0, 'title' => '收藏商品'];
        }


        $list = pdo_getall('longbing_card_count',
            [
                'user_id' => $client_id,
                'to_uid' => $uid,
                'sign' => 'praise',
                'type <' => 4,
                'create_time >' => $beginTime
            ],
            ['id', 'type']
        );
        if (!empty($list)) {
            foreach ($list as $k => $v) {
                $total_count += 1;
                switch ($v['type']) {
                    case 1:
                        if (isset($data['voice'])) {
                            $data['voice']['count'] += 1;
                        } else {
                            $data['voice'] = ['count' => 1, 'rate' => 0, 'title' => '点赞语音'];
                        }
                        break;
                    case 2:
                        if (isset($data['view_detail'])) {
                            $data['view_detail']['count'] += 1;
                        } else {
                            $data['view_detail'] = ['count' => 1, 'rate' => 0, 'title' => '打开名片'];
                        }
                        break;
                    case 3:
                        if (isset($data['th'])) {
                            $data['th']['count'] += 1;
                        } else {
                            $data['th'] = ['count' => 1, 'rate' => 0, 'title' => '点赞名片'];
                        }
                        break;
                }
            }
        }

        if ($total_count) {
            foreach ($data as $k => $v) {
                $data[$k]['rate'] = floatval(sprintf("%.4f", $v['count'] / $total_count) * 100);
            }
        }

        //  二维数组排序
        array_multisort(array_column($data, 'rate'), SORT_DESC, $data);

        return $this->result(0, '添加成功', $data);
    }

    /**
     * 将客户标记为成交
     * @access public
     * @return json
     */
    public function doPageDeal()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $client_id = $_GPC['client_id'];
        $staff_id = $_GPC['staff_id'];
        if ($staff_id) {
            $uid = $staff_id;
        }
        $uniacid = $_W['uniacid'];

        if (!$uid || !$client_id) {
            return $this->result(-1, '请传入参数', []);
        }

        $info = pdo_get('longbing_card_user_mark', ['user_id' => $client_id, 'staff_id' => $uid]);

        if (empty($info)) {
            $result = pdo_insert('longbing_card_user_mark', [
                'user_id' => $client_id,
                'staff_id' => $uid,
                'mark' => 2,
                'uniacid' => $_W['uniacid'],
                'create_time' => time(),
                'update_time' => time(),
            ]);
            if ($result) {
                return $this->result(0, '请求成功', []);
            } else {
                return $this->result(-1, '请求失败', []);
            }
        } else {
            if ($info['mark'] == 2) {
                return $this->result(-1, '该客户已经标记为已成交了', []);
            }
            $result = pdo_update('longbing_card_user_mark', [
                'mark' => 2,
                'update_time' => time(),
            ], ['id' => $info['id']]);
            if ($result) {
                return $this->result(0, '请求成功', []);
            } else {
                return $this->result(-1, '请求失败', []);
            }
        }
    }

    /**
     * 取消客户已成交
     * @access public
     * @return json
     */
    public function doPageCancelDeal()
    {
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $client_id = $_GPC['client_id'];
        $staff_id = $_GPC['staff_id'];
        if ($staff_id) {
            $uid = $staff_id;
        }
        $uniacid = $_W['uniacid'];

        if (!$uid || !$client_id) {
            return $this->result(-1, '请传入参数', []);
        }
        $info = pdo_get('longbing_card_user_mark', ['user_id' => $client_id, 'staff_id' => $uid, 'mark' => 2]);

        if (empty($info)) {
            return $this->result(-1, '未找到成交记录', []);
        } else {
            $result = pdo_update('longbing_card_user_mark', [
                'mark' => 1,
                'update_time' => time(),
            ], ['id' => $info['id']]);
            if ($result) {
                return $this->result(0, '请求成功', []);
            } else {
                return $this->result(-1, '请求失败', []);
            }
        }
    }

    /**
     * 检查客户是否已将标记为已成交
     * @access public
     * @return json
     */
    public function doPageCheckDeal()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $client_id = $_GPC['client_id'];
        $staff_id = $_GPC['staff_id'];
        if ($staff_id) {
            $uid = $staff_id;
        }
        $uniacid = $_W['uniacid'];

        if (!$uid || !$client_id) {
            return $this->result(-1, '请传入参数', []);
        }

        $info = pdo_get('longbing_card_user_mark', ['user_id' => $client_id, 'staff_id' => $uid]);
        if (!empty($info) && $info['mark'] == 2) {
            return $this->result(0, '已成交', []);
        } else {
            return $this->result(0, '未成交', []);
        }
    }

    /**
     * 员工信息
     * @access public
     * @return json
     */
    public function doPageStaff()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $staff_id = $_GPC['staff_id'];
        if ($staff_id) {
            $uid = $staff_id;
        }
        $uniacid = $_W['uniacid'];

        if (!$uid) {
            return $this->result(-1, '请传入参数', []);
        }

        $info = pdo_get('longbing_card_user', ['id' => $uid], ['nickName', 'avatarUrl', 'is_staff']);

        if (empty($info)) {
            return $this->result(-1, '未找到该员工', []);
        }

        if ($info['is_staff'] != 1) {
            return $this->result(-1, '该用户不是员工', []);
        }
        $user_info = pdo_get('longbing_card_user_info', ['fans_id' => $uid], ['name', 'job_id']);

        if (!$user_info['job_id']) {
            $user_info['job_id'] = 1;
        }
        $job = pdo_get('longbing_card_job', ['id' => $user_info['job_id']]);
        $user_info['job'] = $job['name'];
        $info['info'] = $user_info;

        return $this->result(0, '请求成功', $info);
    }

    /**
     * 员工未读消息数量
     * @access public
     * @return json
     */
    public function doPageUnread()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];

        if (!$uid) {
            return $this->result(-1, '请传入参数', []);
        }

        $info = pdo_get('longbing_card_user', ['id' => $uid], ['nickName', 'avatarUrl', 'is_staff']);

        if (empty($info)) {
            return $this->result(-1, '未找到该员工', []);
        }

        if ($info['is_staff'] != 1) {
            return $this->result(-1, '该用户不是员工', []);
        }
        $list = pdo_getall('longbing_card_message', ['target_id' => $uid, 'status' => 1]);
        $count = count($list);
        return $this->result(0, '请求成功', ['count' => $count]);
    }

    /**
     * 客户未读消息数量
     * @access public
     * @return json
     */
    public function doPageClientUnread()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $to_uid = $_GPC['to_uid'];

        if (!$uid) {
            return $this->result(-1, '请传入参数', []);
        }

        $info = pdo_get('longbing_card_user', ['id' => $uid], ['nickName', 'avatarUrl', 'is_staff']);

        $data = array(
            'user_count' => 0,
            'staff_count' => 0,
        );

        if ($info) {
            if ($to_uid)
            {
                $list = pdo_getall('longbing_card_message', ['target_id' => $uid, 'user_id' => $to_uid, 'status' => 1]);
            }
            else
            {
                $list = pdo_getall('longbing_card_message', ['target_id' => $uid, 'status' => 1]);
            }

            $count = count($list);
            $data['user_count'] = $count;
        }

        if ($info && $info['is_staff'] == 1) {
            $list = pdo_getall('longbing_card_message', ['target_id' => $uid, 'status' => 1]);
            $count = count($list);
            $data['staff_count'] = $count;
        }

        return $this->result(0, '请求成功', ['count' => $data]);
    }

    /**
     * 获取员工名片信息
     * @access public
     * @return json
     */
    public function doPageStaffCard()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $staff_id = $_GPC['staff_id'];
        if ($staff_id) {
            $uid = $staff_id;
        }
        $uniacid = $_W['uniacid'];


        if (!$uid) {
            return $this->result(-1, '请传入参数', []);
        }

        $info = pdo_get('longbing_card_user', ['id' => $uid], ['nickName', 'avatarUrl', 'is_staff']);

        if (empty($info)) {
//            return $this->result(-1, '未找到该员工', []);
        }

        if ($info['is_staff'] != 1) {
            //return $this->result(-1, '该用户不是员工', []);
        }
        $user_info = pdo_get('longbing_card_user_info', ['fans_id' => $uid]);
        $user_info['avatar'] = tomedia($user_info['avatar']);
        $user_info['voice'] = tomedia($user_info['voice']);
        $user_info['desc2'] = str_replace('&nbsp;', ' ', $user_info['desc']);
        $arr = explode(',', $user_info['images']);
        foreach ($arr as $k => $v) {
            $arr[$k] = tomedia($v);
        }
        $user_info['images'] = $arr;

        //jiungshuixian  获取职位列表
        $job_list = pdo_getall('longbing_card_job', ['uniacid' => $_W['uniacid'], 'status' => 1]);
        if (!$job_list)
        {
            pdo_insert('longbing_card_job', ['uniacid' => $_W['uniacid'], 'name' => '首席服务官', 'create_time' => time(), 'update_time' => time()]);
            $job_list = pdo_getall('longbing_card_job', ['uniacid' => $_W['uniacid'], 'status' => 1]);
        }
        $job_index = 0;
        foreach ($job_list as $key => $item) {
            if ($item['id'] == $user_info['job_id']) {
                $job_index = $key;
            }
        }
        //jiungshuixian  获取职位列表//end

        return $this->result(0, '请求成功', ['count' => $user_info, 'job_list' => $job_list, 'job_index' => $job_index]);
    }

    /**
     * 编辑员工名片信息
     * @access public
     * @return json
     */
    public function doPageEditStaff()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $staff_id = $_GPC['staff_id'];
        if ($staff_id) {
            $uid = $staff_id;
        }

        $uniacid = $_W['uniacid'];

        if (!$uid || !$_GPC['job_id']) {
            return $this->result(-1, '请传入参数', []);
        }

        $info = pdo_get('longbing_card_user', ['id' => $uid], ['nickName', 'avatarUrl', 'is_staff', 'id']);

        if (empty($info)) {
            return $this->result(-1, '未找到该员工/用户', []);
        }

        if ($info['is_staff'] != 1) {
            //return $this->result(-1, '该用户不是员工', []);
        }
        $images = $this->transImageBack($_GPC['images']);
        $avatar = $this->transImageBack($_GPC['avatar']);
        $voice = $this->transImageBack($_GPC['voice']);

        $_GPC['desc'] = str_replace(' ', '&nbsp;', $_GPC['desc']);
        $data = [
            'uniacid' => $uniacid,
            'avatar' => $avatar,
            'name' => $_GPC['name'],
            'phone' => $_GPC['phone'],
            'wechat' => $_GPC['wechat'],
            'telephone' => $_GPC['telephone'],
            'job_id' => $_GPC['job_id'],
            'email' => $_GPC['email'],
            'desc' => $_GPC['desc'],
            'company_id' => $_GPC['company_id'],
            'voice' => $voice,
            'voice_time' => $_GPC['voice_time'],
            'card_type' => $_GPC['card_type'],
            'my_url' => $_GPC['my_url'],
            'images' => $images,
            'update_time' => time()
        ];
        if ($_GPC['my_video'])
        {
            $data['my_video'] = $_GPC['my_video'];
        }
        //判断用法是否有名片信息
        $user_info = pdo_get('longbing_card_user_info', ['fans_id' => $info['id'], 'uniacid' => $uniacid], ['name', 'phone', 'fans_id', 'id', 'create_time']);
        if (empty($user_info)) {
            $data['fans_id'] = $info['id'];
            $data['create_time'] = time();
            $result = pdo_insert('longbing_card_user_info', $data);
        } else {
            if (!$user_info['create_time']) {
                $data['create_time'] = time();
            }
            $result = pdo_update('longbing_card_user_info', $data, ['fans_id' => $info['id']]);
        }


        if ($result) {



            return $this->result(0, '请求成功', []);
        } else {
            return $this->result(-1, '请求失败' . $result, []);
        }
    }

    /**
     * 获取客户第一次使用的时间戳
     * @access public
     * @return json
     */
    public function doPageFirstTime()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];

        $client_id = $_GPC['client_id'];
        $uniacid = $_W['uniacid'];

        if (!$uid || !$client_id) {
            return $this->result(-1, '请传入参数', []);
        }
        $info = pdo_get('longbing_card_user', ['id' => $client_id]);
        if (!empty($info)) {
            return $this->result(0, '已成交', ['time' => $info['create_time']]);
        } else {
            return $this->result(0, '未成交', []);
        }
    }

    /**
     * 搜索
     * @access public
     * @return json
     */
    public function doPageSearch()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $type = $_GPC['type'];
        $keyword = $_GPC['keyword'];

        if (!$uid || !$keyword) {
            return $this->result(-1, '请传入参数', []);
        }
        $keyword = '%' . $keyword . '%';

        if (!$type) {
            $type = 1;
        }

        if ($type == 1) {
            $ids = [];
            $labels = pdo_fetchall("SELECT * FROM " . tablename('longbing_card_label') . " WHERE `name` like '{$keyword}'");
            foreach ($labels as $k => $v) {
                $info = pdo_getall('longbing_card_user_label', ['staff_id' => $uid, 'lable_id' => $v['id']]);
                foreach ($info as $k2 => $v2) {
                    array_push($ids, $v2['user_id']);
                }
            }
            $infos = pdo_fetchall("SELECT * FROM " . tablename('longbing_card_client_info') . " WHERE `name` like '{$keyword}' && staff_id = {$uid}");
            foreach ($infos as $k => $v) {
                array_push($ids, $v['user_id']);
            }
            $users2 = pdo_getall('longbing_card_collection', ['to_uid' => $uid]);
            if (!empty($users2)) {
                $uids = '';
                foreach ($users2 as $k => $v) {
                    $uids .= ',' . $v['uid'];
                }
                $uids = trim($uids, ',');
                if (count($users2) > 1) {
                    $uids = '(' . $uids . ')';
                    $sql = "SELECT * FROM " . tablename('longbing_card_user') . " WHERE id in {$uids} && nickName like '{$keyword}'";
                } else {
                }
                $users = pdo_fetchall($sql);
                foreach ($users as $k => $v) {
                    array_push($ids, $v['id']);
                }
            }

            $ids = array_unique($ids);
            $ids = implode(',', $ids);
            if ($ids) {
                if (strpos($ids, ',')) {
                    $ids = '(' . $ids . ')';
                    $sql = "SELECT id,nickName,avatarUrl FROM " . tablename('longbing_card_user') . " WHERE id in {$ids}";
                } else {
                    $sql = "SELECT id,nickName,avatarUrl FROM " . tablename('longbing_card_user') . " WHERE id = {$ids}";
                }
                $users = pdo_fetchall($sql);


                foreach ($users as $k => $v) {
                    $info = pdo_get('longbing_card_client_info', ['user_id' => $v['id'], 'staff_id' => $uid]);
                    $users[$k]['info'] = $info;
                    $praise = pdo_getall('longbing_card_praise', ['uid' => $v['id'], 'to_uid' => $uid], ['id', 'create_time'], '', ['create_time desc']);
                    $message1 = pdo_getall('longbing_card_message', ['user_id' => $v['id'], 'target_id' => $uid], ['id', 'create_time'], '', ['create_time desc']);
                    $message2 = pdo_getall('longbing_card_message', ['user_id' => $uid, 'target_id' => $v['id']], ['id', 'create_time'], '', ['create_time desc']);
                    $view = pdo_getall('longbing_card_view_count', ['user_id' => $uid, 'to_uid' => $v['id']], ['id', 'create_time'], '', ['create_time desc']);
                    $copy = pdo_getall('longbing_card_copy_count', ['user_id' => $uid, 'to_uid' => $v['id']], ['id', 'create_time'], '', ['create_time desc']);
                    $users[$k]['count'] = count($praise) + count($message1) + count($message2) + count($view) + count($copy);
                    $times[] = $praise[0]['create_time'];
                    $times[] = $message1[0]['create_time'];
                    $times[] = $message2[0]['create_time'];
                    $times[] = $view[0]['create_time'];
                    $times[] = $copy[0]['create_time'];
                    sort($times);
                    $users[$k]['last_time'] = $times[0] ? $times[0] : 0;
                    $users[$k]['name'] = $users[$k]['nickName'];
                    $client_info = pdo_get('longbing_card_client_info', ['user_id' => $v['id'], 'staff_id' => $uid]);
                    if ($client_info && $client_info['name']) {
                        $users[$k]['name'] = $client_info['name'];
                    }
                }
                $users = json_decode(json_encode($users), true);
                return $this->result(0, '请求成功', ['data' => $users]);


            } else {
                return $this->result(0, '请求成功', []);
            }
        }
    }

    /**
     * 给员工发送模板消息
     * @access public
     * @return json
     */
    public function doPageSendTemplate()
    {
        load()->func('communication');
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];

        $to_uid = $_GPC['to_uid'];

        $client_infoz = pdo_get('longbing_card_client_info', ['user_id' => $uid, 'staff_id' => $to_uid]);

        if ($client_infoz && $client_infoz['is_mask'])
        {
            return $this->result(-1, '发送失败', []);
        }

        $date = $_GPC['date'];

        if (!$uid || !$to_uid) {
            return $this->result(-1, '请传入参数', []);
        }

        $appid = $_W['account']['key'];
        $appsecret = $_W['account']['secret'];
        $user = pdo_get('longbing_card_user', ['id' => $to_uid]);
        $client = pdo_get('longbing_card_user', ['id' => $uid]);
        $client_info = pdo_get('longbing_card_client_info', ['user_id' => $uid, 'staff_id' => $to_uid]);
        if (!empty($client_info) && $client_info['name']) {
            $name = $client_info['name'];
        } else {
            $name = $client['nickName'];
        }
        if (empty($user)) {
            return $this->result(-1, '未找到用户', []);
        }
        if ($user['is_staff'] != 1) {
            return $this->result(-1, '该对象不是员工无法发送', []);
        }
        $openid = $user['openid'];
        if ($date) {
            $date = date('Y-m-d H:i', $date);
        } else {
            $date = date('Y-m-d H:i');
        }
        $config = pdo_get('longbing_card_config', ['uniacid' => $_W['uniacid']], ['mini_template_id', 'notice_switch', 'notice_i', 'min_tmppid']);

        if ($config['notice_switch'] == 1) {
            if (!$config['notice_i']) {
                return $this->result(-1, '发送失败, 未配置公众号模块id', []);
            }
            if (!$config['min_tmppid']) {
                return $this->result(-1, '发送失败, 未配置公众号模板id', []);
            }

            $url = 'https://' . $_SERVER['HTTP_HOST'] . '/app/index.php?i=' . $config['notice_i'] . '&c=entry&do=sendmsg&m=longbing_tmsg&min_uid=' . $to_uid . '&min_uniacid=' . $_W['uniacid'] . '&min_tmppid=' . $config['min_tmppid'];

            $data = array(
                'first' => array(
                    'value' => $name,
                    'color' => '#c27ba0',
                ),
                'keyword1' => array(
                    'value' => '你有未读消息',
                    'color' => '#93c47d',
                ),
                'keyword2' => array(
                    'value' => $date,
                    'color' => '#0000ff',
                ),
                'remark' => array(
                    'value' => '',
                    'color' => '#45818e',
                ),
            );
//            $data = ['data_content' => $data];
            $page = "longbing_card/staff/message/message";
//            $page = "longbing_card/chat/staffChat/staffChat?to_uid={$uid}";
            $page = "longbing_card/chat/staffChat/staffChat?is_tpl=1&to_uid={$uid}";
            $data = ['data_content' => $data, 'pagepath' => $page, 'appid' => $appid];
            $data = json_encode($data);

            $res = $this->curlPost($url, $data);
            return $this->result(0, '发送成功', []);
        } else {
            if (!$config['mini_template_id']) {
                return $this->result(-1, '发送失败, 未配置模板消息', []);
            } else {
                $form = $this->getFormId($to_uid);
                if (!$form) {
                    return $this->result(-1, '发送失败', []);
                }


                $access_token = $this->getAccessToken();

                if (!$access_token)
                {
                    return $this->result(-1, '发送失败', []);
                }

                $url = "https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token={$access_token}";
//                $page = 'longbing_card/staff/message/message?is_tpl=1&client_id='.$uid."&to_uid={$to_uid}";
                $page = "longbing_card/chat/staffChat/staffChat?is_tpl=1&to_uid={$uid}";
                $postData = [
                    'touser' => $openid,
                    'template_id' => $config['mini_template_id'],
                    'page' => $page,
                    'form_id' => $form,
                    'data' => [
                        'keyword1' => ['value' => $name],
                        'keyword2' => ['value' => '你有未读消息'],
                        'keyword3' => ['value' => $date],
                    ],
                ];
                $postData = json_encode($postData);

                $response = ihttp_post($url, $postData);
                return $this->result(0, '发送成功', []);
            }
        }


    }

    public function getAccessToken () {
        global $_GPC, $_W;

        $appid = $_W['account']['key'];
        $appsecret = $_W['account']['secret'];

        $appidMd5 = md5($appid);
        if (!is_file(IA_ROOT . '/data/tpl/web/' . $appidMd5 . '.txt'))
        {
//            file_put_contents(IA_ROOT . '/data/tpl/web/' . $appidMd5 . '.txt', 1);
            if ( is_dir(ATTACHMENT_ROOT . '/' . "images/longbing_card/{$_W['uniacid']}/") )
            {
                $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={$appid}&secret={$appsecret}";
                $data = ihttp_get($url);
                $data = json_decode($data['content'], true);
                if (!isset($data['access_token'])) {
                    return false;
                }
                $access_token = $data['access_token'];
                file_put_contents(IA_ROOT . '/data/tpl/web/' . $appidMd5 . '.txt', json_encode(['at' => $access_token, 'time' => time() + 6200]));
                return $access_token;
            }

        }
        if (is_file(IA_ROOT . '/data/tpl/web/' . $appidMd5 . '.txt')) {
            $fileInfo = file_get_contents(IA_ROOT . '/data/tpl/web/' . $appidMd5 . '.txt');
            if (!$fileInfo)
            {
                $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={$appid}&secret={$appsecret}";
                $data = ihttp_get($url);
                $data = json_decode($data['content'], true);
                if (!isset($data['access_token'])) {
                    return false;
                }
                $access_token = $data['access_token'];
                file_put_contents(IA_ROOT . '/data/tpl/web/' . $appidMd5 . '.txt', json_encode(['at' => $access_token, 'time' => time() + 6200]));
                return $access_token;
            }
            else
            {
                $fileInfo = json_decode($fileInfo, true);
                if ($fileInfo['time'] < time())
                {
                    $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={$appid}&secret={$appsecret}";
                    $data = ihttp_get($url);
                    $data = json_decode($data['content'], true);
                    if (!isset($data['access_token'])) {
                        return false;
                    }
                    $access_token = $data['access_token'];
                    file_put_contents(IA_ROOT . '/data/tpl/web/' . $appidMd5 . '.txt', json_encode(['at' => $access_token, 'time' => time() + 6200]));
                    return $access_token;
                }
                return $fileInfo['at'];
            }
        }

        return false;
    }

    /**
     * 给客户发送模板消息
     * @access public
     * @return json
     */
    public function doPageSendTemplateCilent()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $client_id = $_GPC['client_id'];
        $date = $_GPC['date'];

        if (!$uid || !$client_id || !$date) {
            return $this->result(-1, '请传入参数', []);
        }


        $appid = $_W['account']['key'];
        $appsecret = $_W['account']['secret'];
        $client = pdo_get('longbing_card_user', ['id' => $client_id]);
        $send_info = pdo_get('longbing_card_user_info', ['fans_id' => $uid]);

        if ($client['is_staff'] == 1) {

        }
        if (empty($client) || empty($send_info)) {
            return $this->result(-1, '未找到用户', []);
        }
        $name = $send_info['name'];
        $openid = $client['openid'];

        if ($date) {
            $date = date('Y-m-d H:i', $date);
        } else {
            $date = date('Y-m-d H:i');
        }
        $config = pdo_get('longbing_card_config', ['uniacid' => $_W['uniacid']], ['mini_template_id', 'notice_switch', 'notice_i', 'min_tmppid']);
        if ($config['notice_switch'] == 1 && false) {
            if (!$config['notice_i']) {
                return $this->result(-1, '发送失败, 未配置公众号模块id', []);
            }
            if (!$config['min_tmppid']) {
                return $this->result(-1, '发送失败, 未配置公众号模板id', []);
            }

            $url = 'https://' . $_SERVER['HTTP_HOST'] . '/app/index.php?i=' . $config['notice_i'] . '&c=entry&do=sendmsg&m=longbing_tmsg&min_uid=' . $client_id . '&min_uniacid=' . $_W['uniacid'] . '&min_tmppid=' . $config['min_tmppid'];

            $data = array(
                'first' => array(
                    'value' => $name,
                    'color' => '#c27ba0',
                ),
                'keyword1' => array(
                    'value' => '你有未读消息',
                    'color' => '#93c47d',
                ),
                'keyword2' => array(
                    'value' => $date,
                    'color' => '#0000ff',
                ),
                'remark' => array(
                    'value' => '',
                    'color' => '#45818e',
                ),
            );
//            $data = ['data_content' => $data];
            $page = "longbing_card/pages/index/index?to_uid={$uid}&currentTabBar=toCard";
            $data = ['data_content' => $data, 'pagepath' => $page, 'appid' => $appid];
            $data = json_encode($data);

            $res = $this->curlPost($url, $data);

            return $this->result(0, '发送成功', []);
        } else {
            if (!$config['mini_template_id']) {
                return $this->result(-1, '发送失败, 未配置模板消息', []);
            } else {
                $form = $this->getFormId($client_id);
                if (!$form) {
                    return $this->result(-1, '发送失败', []);
                }


                $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={$appid}&secret={$appsecret}";

                $data = ihttp_get($url);
                $data = json_decode($data['content'], true);
                if (!isset($data['access_token'])) {
                    return $this->result(-1, '获取失败', []);
                }
                $access_token = $data['access_token'];

                $url = "https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token={$access_token}";
//                $page = "longbing_card/pages/index/index?to_uid={$uid}&currentTabBar=toCard&is_tpl=1";
                $page = "longbing_card/chat/userChat/userChat?to_uid={$uid}&is_tpl=1";
                $postData = [
                    'touser' => $openid,
                    'template_id' => $config['mini_template_id'],
                    'page' => $page,
                    'form_id' => $form,
                    'data' => [
                        'keyword1' => ['value' => $name],
                        'keyword2' => ['value' => '你有未读消息'],
                        'keyword3' => ['value' => $date],
                    ],
                ];
                $postData = json_encode($postData);

                $response = ihttp_post($url, $postData);
                return $this->result(0, '发送成功', []);
            }
        }


    }

    /**
     * 员工职位列表
     * @access public
     * @return json
     */
    public function doPageJob()
    {
        $this->cross();
        global $_GPC, $_W;
        $list = pdo_getall('longbing_card_job', ['uniacid' => $_W['uniacid'], 'status' => 1]);
        if (empty($list)) {
            pdo_insert('longbing_card_job', ['uniacid' => $_W['uniacid'], 'status' => 1, 'name' => '首席服务官']);
            $list = pdo_getall('longbing_card_job', ['uniacid' => $_W['uniacid'], 'status' => 1]);
        }
        return $this->result(0, '', $list);
    }

    /**
     * 分享记录
     * @access public
     * @return json
     */
    public function doPageForward()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $to_uid = $_GPC['to_uid'];
        $type = $_GPC['type'];
        $target_id = $_GPC['target_id'];
        if (!$target_id) {
            $target_id = 0;
        }

        if (!$uid || !$to_uid || !$type)
            return $this->result(-1, '请传入参数', []);

        $result = pdo_insert('longbing_card_forward', [
            'user_id' => $uid,
            'staff_id' => $to_uid,
            'type' => $type,
            'target_id' => $target_id,
            'uniacid' => $_W['uniacid'],
            'create_time' => time(),
            'update_time' => time()
        ]);
        if ($result) {
            return $this->result(0, '添加成功', []);
        } else {
            return $this->result(-1, '添加失败', []);
        }
    }

    /**
     * 客户成交率 (每天更新一次)
     * @access public
     * @return json
     */
    public function doPageRate()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $client_id = $_GPC['client_id'];
        $staff_id = $_GPC['staff_id'];
        if ($staff_id) {
            $uid = $staff_id;
        }


        $check = pdo_get('longbing_card_rate', ['user_id' => $client_id, 'staff_id' => $uid, 'uniacid' => $_W['uniacid']]);
        $time = time();
        $rate = 0;
        // 今天开始的的时间戳
        $beginTime = mktime(0, 0, 0, date('m'), date('d'), date('Y'));
        if (!empty($check)) {
            if ($check['create_time'] - $beginTime > 86400) {
                $rate = $this->countRate($client_id, $uid, $_W['uniacid']);
            } else {
                $rate = $check['rate'];
            }
        } else {
            $rate = $this->countRate($client_id, $uid, $_W['uniacid']);
        }

        return $this->result(0, '', ['rate' => $rate]);
    }

    /**
     * 查询用户是否是员工
     * @access public
     * @return json
     */
    public function doPageIsStaff()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];

        $info = pdo_get('longbing_card_user', ['uniacid' => $_W['uniacid'], 'id' => $uid]);

        if (!empty($info) && $info['is_staff']) {
            return $this->result(0, '', ['is_staff' => 1, 'is_boss' => $info['is_boss']]);
        } else {
            return $this->result(0, '', ['is_staff' => 0]);
        }
    }

    /**
     * 剩余通知条数
     * @access public
     * @return json
     */
    public function doPageFormIds()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $beginTime = mktime(0, 0, 0, date('m'), date('d') - 7, date('Y'));

        $info = pdo_getall('longbing_card_formId', ['uniacid' => $_W['uniacid'], 'user_id' => $uid, 'create_time >' => $beginTime]);

        return $this->result(0, '', ['count' => count($info)]);
    }

    public function countRate($client_id, $uid, $uniacid)
    {
        $this->cross();
        $is_deal = pdo_get('longbing_card_user_mark', ['user_id' => $client_id, 'staff_id' => $uid, 'uniacid' => $uniacid]);

        $check = pdo_get('longbing_card_rate', ['user_id' => $client_id, 'staff_id' => $uid]);

        if (!empty($is_deal) && $is_deal['mark'] == 2) {
            if ($check)
            {
                pdo_update('longbing_card_rate', ['rate' => 100, 'update_time' => time()], ['id' => $check['id']]);
            }
            else
            {
                pdo_insert('longbing_card_rate', ['user_id' => $client_id, 'staff_id' => $uid, 'rate' => 100, 'create_time' => time(), 'update_time' => time(), 'uniacid' => $uniacid]);
            }
            return 100;
        }

        $staff_count = 0;
        $client_count = 0;

        if (!empty($is_deal)) {
            $staff_count += 5;
        }

        // 聊天
        $chat = pdo_fetch("SELECT id,user_id,target_id,create_time FROM " . tablename('longbing_card_chat') . " where (user_id = {$uid} && target_id = {$client_id}) OR (user_id = {$client_id} && target_id = {$uid})");

        if (!empty($chat)) {
            $mesage = pdo_getall('longbing_card_message', ['chat_id' => $chat['id']]);
            $count = count($mesage);
            if ($count) {
                $client_count += 4;
            }
            if ($count > 15) {
                $count = 15;
            }
            $staff_count += $count;
        }

        //  打标签
        $label = pdo_getall('longbing_card_user_label', ['user_id' => $client_id, 'staff_id' => $uid, 'uniacid' => $uniacid]);

        $count = count($label);
        if ($count > 10) {
            $count = 10;
        }
        $staff_count += $count * 2;

        //  用户留电话
        $info = pdo_get('longbing_card_user_phone', ['user_id' => $client_id, 'to_uid' => $uid, 'uniacid' => $uniacid]);
        if (!empty($info)) {
            $client_count += 6;
        }

        //  打电话
        $info = pdo_get('longbing_card_count', ['user_id' => $client_id, 'to_uid' => $uid, 'uniacid' => $uniacid, 'sign' => 'copy', 'type' => 2]);
        if (!empty($info)) {
            $client_count += 4;
        }

        //  存电话
        $info = pdo_get('longbing_card_count', ['user_id' => $client_id, 'to_uid' => $uid, 'uniacid' => $uniacid, 'sign' => 'copy', 'type' => 1]);
        if (!empty($info)) {
            $client_count += 4;
        }

        //  复制微信
        $info = pdo_get('longbing_card_count', ['user_id' => $client_id, 'to_uid' => $uid, 'uniacid' => $uniacid, 'sign' => 'copy', 'type' => 4]);
        if (!empty($info)) {
            $client_count += 4;
        }

        //  语音点赞
        $info = pdo_get('longbing_card_count', ['user_id' => $client_id, 'to_uid' => $uid, 'uniacid' => $uniacid, 'sign' => 'praise', 'type' => 1]);
        if (!empty($info)) {
            $client_count += 1;
        }

        //  靠谱
        $info = pdo_get('longbing_card_count', ['user_id' => $client_id, 'to_uid' => $uid, 'uniacid' => $uniacid, 'sign' => 'praise', 'type' => 3]);
        if (!empty($info)) {
            $client_count += 1;
        }

        //  浏览名片
        $client_count += 2;

        //  浏览商城列表
        $info = pdo_get('longbing_card_count', ['user_id' => $client_id, 'to_uid' => $uid, 'uniacid' => $uniacid, 'sign' => 'view', 'type' => 1]);
        if (!empty($info)) {
            $client_count += 2;
        }

        //  浏览商城详情
        $info = pdo_get('longbing_card_count', ['user_id' => $client_id, 'to_uid' => $uid, 'uniacid' => $uniacid, 'sign' => 'view', 'type' => 2]);
        if (!empty($info)) {
            $client_count += 2;
        }

        //  浏览动态
        $info = pdo_get('longbing_card_count', ['user_id' => $client_id, 'to_uid' => $uid, 'uniacid' => $uniacid, 'sign' => 'view', 'type' => 3]);
        if (!empty($info)) {
            $client_count += 2;
        }

        //  浏览官网
        $info = pdo_get('longbing_card_count', ['user_id' => $client_id, 'to_uid' => $uid, 'uniacid' => $uniacid, 'sign' => 'view', 'type' => 6]);
        if (!empty($info)) {
            $client_count += 2;
        }

        //  授权基本信息
        $info = pdo_get('longbing_card_user', ['id' => $client_id, 'uniacid' => $uniacid]);
        if (!empty($info) && $info['avatarUrl'])
            $client_count += 2;

        //  分享
        $info = pdo_get('longbing_card_forward', ['user_id' => $client_id, 'staff_id' => $uid, 'uniacid' => $uniacid, 'type' => 1]);
        if (!empty($info)) {
            $client_count += 4;
        }

        $count = $staff_count + $client_count;
        if ($count > 92) {
            $count = 92;
        }

        if ($check)
        {
            pdo_update('longbing_card_rate', ['rate' => $count, 'update_time' => time()], ['id' => $check['id']]);
        }
        else
        {
            pdo_insert('longbing_card_rate', ['user_id' => $client_id, 'staff_id' => $uid, 'rate' => $count, 'create_time' => time(), 'update_time' => time(), 'uniacid' => $uniacid]);
        }

        return $count;
    }

    /**
     * 设置/查询预计成交日期
     * @access public
     * @return json
     */
    public function doPageDealDate()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $client_id = $_GPC['client_id'];
        $staff_id = $_GPC['staff_id'];
        if ($staff_id) {
            $uid = $staff_id;
        }
        $date = $_GPC['date'];

        if (!$uid || !$client_id) {
            return $this->result(-1, '请传入参数', []);
        }

        $info = pdo_get('longbing_card_date', ['user_id' => $client_id, 'staff_id' => $uid, 'uniacid' => $_W['uniacid']]);

        if (!$date) {
            return $this->result(0, '成功', $info);
        }

        if (empty($info)) {
            $result = pdo_insert('longbing_card_date', [
                'user_id' => $client_id,
                'staff_id' => $uid,
                'date' => $date,
                'uniacid' => $_W['uniacid'],
                'create_time' => time(),
                'update_time' => time()
            ]);
        } else {
            $result = pdo_update('longbing_card_date', [
                'date' => $date,
                'update_time' => time()
            ], [
                'user_id' => $client_id,
                'staff_id' => $uid,
                'uniacid' => $_W['uniacid'],
            ]);
        }


        if ($result) {
            return $this->result(0, '成功', []);
        } else {
            return $this->result(-1, '失败', []);
        }
    }

    /**
     * 配置接口
     * @access public
     * @return json
     */
    public function doPageConfig()
    {
        $this->cross();
        global $_GPC, $_W;

        $info = pdo_get('longbing_card_config', ['uniacid' => $_W['uniacid']], ['show_card', 'copyright', 'mini_app_name', 'allow_create', 'create_text', 'logo_switch', 'logo_text', 'logo_phone', 'notice_switch', 'notice_i', 'min_tmppid', 'order_overtime', 'collage_overtime']);
        $info['copyright'] = tomedia($info['copyright']);


        //jingshuixian
        if (!LONGBING_AUTH_COPYRIGHT) {
            $info['copyright'] = "http://longbing-out.oss-cn-beijing.aliyuncs.com/card/1.png";
        }
        return $this->result(0, '请求成功', $info);
    }


    /**
     * 配置接口
     * @access public
     * @return json
     */
    public function doPageConfigV2()
    {
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];

        if ($this->redis_sup) {

            $redis_key = 'longbing_card_configv2_' . $uid . '_' . $_W['uniacid'];
            $data      = $this->redis_server->get($redis_key);

            if ($data) {
                $data               = json_decode($data, true);
                $data['from_redis'] = 1;
                return $this->result(0, '请求成功', $data);
            }
        }

        $info = pdo_get('longbing_card_config', ['uniacid' => $_W['uniacid']], ['show_card', 'copyright', 'mini_app_name', 'allow_create', 'create_text', 'logo_switch', 'logo_text', 'logo_phone', 'notice_switch', 'notice_i', 'min_tmppid', 'order_overtime', 'collage_overtime']);
        $info['copyright'] = tomedia($info['copyright']);

        if (!LONGBING_AUTH_COPYRIGHT) {
            $info['copyright'] = "http://longbing-out.oss-cn-beijing.aliyuncs.com/card/1.png";
        }



        $checkExists = pdo_tableexists('longbing_cardauth2_config');
        if ($checkExists)
        {
            $auth_info = pdo_get('longbing_cardauth2_config', ['modular_id' => $_W['uniacid']]);

            if ($auth_info && $auth_info['copyright_id'])
            {
                $copyright = pdo_get('longbing_cardauth2_copyright', ['id' => $auth_info['copyright_id']]);

                if ($copyright)
                {
                    $info['copyright'] = tomedia($copyright['image']);
                    $info['logo_text'] = $copyright['text'];
                    $info['logo_phone'] = $copyright['phone'];
                    $info['logo_switch'] = 2;
                }
            }
        }



        $data['config'] = $info;

        $company = pdo_getall('longbing_card_company', ['uniacid' => $_W['uniacid'], 'status' => 1]);

        foreach ($company as $k => $v) {
            $company[$k]['desc'] = tomedia($v['desc']);
            $company[$k]['logo'] = $this->transImage($v['logo']);

            $images = $v['culture'];
            $images = trim($images, ',');
            $images = explode(',', $images);
            $tmp = [];
            foreach ($images as $k2 => $v2) {
                $src = tomedia($v2);
                array_push($tmp, $src);
            }
            $company[$k]['culture'] = $tmp;
        }


        $data['company_list'] = $company;

        $user = pdo_get('longbing_card_user_info', ['fans_id' => $uid, 'is_staff' => 1, 'status' => 1]);
        if ($user) {
            if ($user['company_id']) {
                $company2 = pdo_get('longbing_card_company', ['uniacid' => $_W['uniacid'], 'id' => $user['company_id']]);
                if ($company2) {
                    $company2['logo'] = $this->transImage($company2['logo']);
                    $data['my_company'] = $company2;
                } else {
                    $data['my_company'] = $company[0];
                }
            } else {
                $data['my_company'] = $company[0];
            }
        }
        else
        {
            $data['my_company'] = $company[0];
        }


        $info = pdo_get('longbing_card_tabbar', ['uniacid' => $_W['uniacid']]);
        if (empty($info))
        {
            $time = time();
            $dataConfig = array(
                'uniacid' => $_W['uniacid'],
                'status' => 1,
                'create_time' => $time,
                'update_time' => $time,
            );
            $res = pdo_insert('longbing_card_tabbar', $dataConfig);

            if ($res)
            {
                $info = pdo_get('longbing_card_tabbar', ['uniacid' => $_W['uniacid']]);
            }
            else
            {
                $data['tabBar'] = [];
            }
        }
        if ($info) {

            $i = 0;
            foreach ($info as $k => $v) {
                if ($i < 5 && $i > 0) {
                    $data['tabBar']['menu_name'][] = $v;
                } else if ($i < 9 && $i > 0) {
                    $data['tabBar']['menu_is_hide'][] = $v;
                } else if ($i < 13 && $i > 0) {
                    $data['tabBar']['menu_url'][] = $v;
                } else if ($i < 17 && $i > 0) {
                    $data['tabBar']['menu_url_out'][] = $v;
                } else if ($i < 21 && $i > 0) {
                    $data['tabBar']['menu_url_jump_way'][] = $v;
                } else {
                    $data['tabBar'][$k] = $v;
                }
                $i++;
            }
        }

        if ($this->redis_sup) {
            $redis_key = 'longbing_card_configv2_' . $uid . '_' . $_W['uniacid'];
            $this->redis_server->set($redis_key, json_encode($data));
            $this->redis_server->EXPIRE($redis_key, 30 * 60);
        }

        return $this->result(0, '请求成功', $data);
    }

    //检查是否为初始数据
    public function checkEmpty()
    {
        $h = date("H");
        if ($h % 2 || true) {
            pdo_delete('longbing_card_collection', ['to_uid' => 0]);
            pdo_delete('longbing_card_user_info', ['fans_id' => 0]);

            pdo_query("UPDATE " . tablename('longbing_card_user_info') . " SET `card_type` = 'cardType1' WHERE card_type = 1;");
            pdo_query("UPDATE " . tablename('longbing_card_user_info') . " SET `card_type` = 'cardType1' WHERE card_type = '';");
        }


        $this->cross();
        global $_GPC, $_W;
        $time = time();
        $check = pdo_get('longbing_card_company', array('uniacid' => $_W['uniacid']));
        if (!empty($check)) {
            return false;
        }

        $dataCompany = array(
            'uniacid' => $_W['uniacid'],
            'name' => '某某科技有限责任公司公司',
            'addr' => '某某省某某市某某街100室',
            'logo' => 'http://pb14gmv45.bkt.clouddn.com/images/12/2018/08/W69dK0McNM0eMeeqF5EF1e6fEI7fMe.jpg',
            'phone' => '17361005975',
            'longitude' => '104.054880',
            'latitude' => '30.549300',
            'create_time' => $time,
            'update_time' => $time,
        );
        pdo_insert('longbing_card_company', $dataCompany);


        $check = pdo_get('longbing_card_job', array('uniacid' => $_W['uniacid']));

        if (empty($check)) {
            $dataJob = array(
                'uniacid' => $_W['uniacid'],
                'name' => '首席服务官',
                'status' => 1,
                'create_time' => $time,
                'update_time' => $time,
            );
            pdo_insert('longbing_card_job', $dataJob);
        }

        $check = pdo_get('longbing_card_config', array('uniacid' => $_W['uniacid']));

        if (empty($check)) {
            $dataConfig = array(
                'uniacid' => $_W['uniacid'],
                'status' => 1,
                'create_time' => $time,
                'update_time' => $time,
            );
            pdo_insert('longbing_card_config', $dataConfig);
        }

        $check = pdo_get('longbing_card_tabbar', array('uniacid' => $_W['uniacid']));

        if (empty($check)) {
            $dataConfig = array(
                'uniacid' => $_W['uniacid'],
                'status' => 1,
                'create_time' => $time,
                'update_time' => $time,
            );
            pdo_insert('longbing_card_tabbar', $dataConfig);
        }



        return true;
    }

    public function insertMessage($data)
    {

    }

    //  记录浏览内容
    protected function insertView($user_id, $to_uid, $type, $uniacid, $target = '')
    {
        global $_GPC, $_W;
        $appid = $_W['account']['key'];
        $appsecret = $_W['account']['secret'];

        $check = pdo_getall('longbing_card_count', [
            'user_id' => $user_id,
            'to_uid' => $to_uid,
            'type' => $type,
            'uniacid' => $uniacid,
            'target' => $target,
            'sign' => 'view']);
        if ($user_id == $to_uid) {
            return false;
        }
        $time = time();
        $count = 1;
        if (!empty($check)) {
            $ten = count($check) % 10;
            $count = count($check);
        }
        $client_infoz = pdo_get('longbing_card_client_info', ['user_id' => $user_id, 'staff_id' => $to_uid]);
        $send = true;
        if ($client_infoz && $client_infoz['is_mask'])
        {
            $send = false;
        }
//        if (empty($check) || $ten == 0) {
        $config = pdo_get('longbing_card_config', ['uniacid' => $uniacid], ['mini_template_id', 'notice_switch', 'notice_i', 'min_tmppid']);

        $client = pdo_get('longbing_card_user', ['id' => $user_id]);
        $client2 = pdo_get('longbing_card_user', ['id' => $to_uid]);
        $name = $client['nickName'];
        if ($send)
        {
            if ($config['notice_switch'] == 1)
            {
                if (!$config['notice_i']) {
                    return false;
//                    return $this->result(-1, '发送失败, 未配置公众号模块id', []);
                }
                if (!$config['min_tmppid']) {
                    return false;
//                    return $this->result(-1, '发送失败, 未配置公众号模板id', []);
                }


                $page = "longbing_card/pages/index/index?to_uid={$to_uid}&currentTabBar=toCard";
                switch ($type) {
                    case 1:
                        $witch = '浏览商城列表';
                        $page = "longbing_card/pages/index/index?to_uid={$to_uid}&currentTabBar=toShop";
                        break;
                    case 2:
                        $witch = '浏览商品详情';
                        if ($target) {
                            $info = pdo_get('longbing_card_goods', ['id' => $target]);
                            $witch .= ':' . $info['name'];
                        }
                        $page = "longbing_card/pages/shop/detail/detail?to_uid={$to_uid}&id={$info['id']}";
                        break;
                    case 3:
                        $witch = '浏览动态列表';
                        $page = "longbing_card/pages/index/index?to_uid={$to_uid}&currentTabBar=toNews";
                        break;
                    case 4:
                        $witch = '点赞动态';
                        $page = "longbing_card/pages/index/index?to_uid={$to_uid}&currentTabBar=toNews";
                        break;
                    case 5:
                        $witch = '动态留言';
                        $page = "longbing_card/pages/index/index?to_uid={$to_uid}&currentTabBar=toNews";
                        break;
                    case 6:
                        $witch = '浏览公司官网';
                        $page = "longbing_card/pages/index/index?to_uid={$to_uid}&currentTabBar=toCompany";
                        break;
                    case 7:
                        $witch = '浏览动态详情';
                        if ($target) {
                            $info = pdo_get('longbing_card_timeline', ['id' => $target]);
                            $witch .= ':' . $info['title'];
                        }
                        $page = "longbing_card/pages/news/detail/detail?to_uid={$to_uid}&id={$info['id']}";
                        break;
                }


                $url = 'http://' . $_SERVER['HTTP_HOST'] . '/app/index.php?i=' . $config['notice_i'] . '&c=entry&do=sendmsg&m=longbing_tmsg&min_uid=' . $to_uid . '&min_uniacid=' . $_W['uniacid'] . '&min_tmppid=' . $config['min_tmppid'];

                $date = date('Y-m-d H:i');
                $page = "longbing_card/staff/radar/radar";
                $data = array(
                    'first' => array(
                        'value' => $name,
                        'color' => '#c27ba0',
                    ),
                    'keyword1' => array(
                        'value' => $witch,
                        'color' => '#93c47d',
                    ),
                    'keyword2' => array(
                        'value' => $date,
                        'color' => '#0000ff',
                    ),
                    'remark' => array(
                        'value' => '备注',
                        'color' => '#45818e',
                    ),
                );
                $data = ['data_content' => $data, 'pagepath' => $page, 'appid' => $appid];

                $data = json_encode($data);

                $res = $this->curlPost($url, $data);

            }
            else
            {
                $openid = $client2['openid'];
                $date = date('Y-m-d H:i');
                if ($config['mini_template_id']) {

                    $form = $this->getFormId($to_uid);
                    if ($form) {

                        $access_token = $this->getAccessToken();
                        if (!$access_token)
                        {
                            return $this->result(-1, '获取失败', []);
                        }

                        $url = "https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token={$access_token}";
                        $page = "longbing_card/pages/index/index?to_uid={$to_uid}&currentTabBar=toCard";
                        switch ($type) {
                            case 1:
                                $witch = '浏览商城列表';
                                $page = "longbing_card/pages/index/index?to_uid={$to_uid}&currentTabBar=toShop";
                                break;
                            case 2:
                                $witch = '浏览商品详情';
                                if ($target) {
                                    $info = pdo_get('longbing_card_goods', ['id' => $target]);
                                    $witch .= ':' . $info['name'];
                                }
                                $page = "longbing_card/pages/shop/detail/detail?to_uid={$to_uid}&id={$info['id']}";
                                break;
                            case 3:
                                $witch = '浏览动态列表';
                                $page = "longbing_card/pages/index/index?to_uid={$to_uid}&currentTabBar=toNews";
                                break;
                            case 4:
                                $witch = '点赞动态';
                                $page = "longbing_card/pages/index/index?to_uid={$to_uid}&currentTabBar=toNews";
                                break;
                            case 5:
                                $witch = '动态留言';
                                $page = "longbing_card/pages/index/index?to_uid={$to_uid}&currentTabBar=toNews";
                                break;
                            case 6:
                                $witch = '浏览公司官网';
                                $page = "longbing_card/pages/index/index?to_uid={$to_uid}&currentTabBar=toCompany";
                                break;
                            case 7:
                                $witch = '浏览动态详情';
                                if ($target) {
                                    $info = pdo_get('longbing_card_timeline', ['id' => $target]);
                                    $witch .= ':' . $info['title'];
                                }
                                $page = "longbing_card/pages/news/detail/detail?to_uid={$to_uid}&id={$info['id']}";
                                break;
                        }
                        $page = "longbing_card/staff/radar/radar";
                        $postData = [
                            'touser' => $openid,
                            'template_id' => $config['mini_template_id'],
                            'page' => $page,
                            'form_id' => $form,
                            'data' => [
                                'keyword1' => ['value' => $name],
                                'keyword2' => ['value' => '第' . $count . '次' . $witch],
                                'keyword3' => ['value' => $date],
                            ],
                        ];
                        $postData = json_encode($postData);

                        $response = curlPost($url, $postData);

                        //                    file_put_contents('first.txt', json_encode($response) . PHP_EOL, FILE_APPEND);
                    }
                }
            }
        }

//        }

        $data = [
            'user_id' => $user_id,
            'to_uid' => $to_uid,
            'type' => $type,
            'uniacid' => $uniacid,
            'target' => $target,
            'sign' => 'view',
            'scene' => $_GPC['scene'],
            'create_time' => $time,
            'update_time' => $time,
        ];
        $res = pdo_insert('longbing_card_count', $data);
        pdo_fetch("DELETE FROM " . tablename('longbing_card_count') . " where user_id = to_uid");
        return $res;
    }

//$this->sendTplStaff($uid, $to_uid, 1, $_W['uniacid']);
    protected function sendTplStaff($user_id, $to_uid, $type, $uniacid, $target = '')
    {
        global $_GPC, $_W;
        $appid = $_W['account']['key'];
        $appsecret = $_W['account']['secret'];


        $config = pdo_get('longbing_card_config', ['uniacid' => $uniacid], ['mini_template_id', 'notice_switch', 'notice_i', 'min_tmppid']);

        $client = pdo_get('longbing_card_user', ['id' => $user_id]);
        $client2 = pdo_get('longbing_card_user', ['id' => $to_uid]);
        $name = $client['nickName'];

        $check = pdo_getall('longbing_card_count', [
            'user_id' => $user_id,
            'to_uid' => $to_uid,
            'type' => 2,
            'uniacid' => $uniacid,
            'sign' => 'praise']);
        if ($user_id == $to_uid) {
            return false;
        }
        $time = time();
        $count = 1;
        if (!empty($check)) {
            $ten = count($check) % 10;
            $count = count($check);
        }


        if ($config['notice_switch'] == 1) {

            if (!$config['notice_i']) {
                return false;
//                return $this->result(-1, '发送失败, 未配置公众号模块id', []);
            }
            if (!$config['min_tmppid']) {
                return false;
//                return $this->result(-1, '发送失败, 未配置公众号模板id', []);
            }


            $page = "longbing_card/pages/index/index?to_uid={$to_uid}&currentTabBar=toCard";
            $page = "longbing_card/staff/radar/radar";

            $url = 'http://' . $_SERVER['HTTP_HOST'] . '/app/index.php?i=' . $config['notice_i'] . '&c=entry&do=sendmsg&m=longbing_tmsg&min_uid=' . $to_uid . '&min_uniacid=' . $_W['uniacid'] . '&min_tmppid=' . $config['min_tmppid'];

            $date = date('Y-m-d H:i');
            $data = array(
                'first'    => array(
                    'value' => $name,
                    'color' => '#c27ba0',
                ),
                'keyword1' => array(
                    'value' => '第' . $count . '次进入你的名片',
                    'color' => '#93c47d',
                ),
                'keyword2' => array(
                    'value' => $date,
                    'color' => '#0000ff',
                ),
                'remark'   => array(
                    'value' => '备注',
                    'color' => '#45818e',
                ),
            );
//        echo '<pre>';
            $data = ['data_content' => $data, 'pagepath' => $page, 'appid' => $appid];

            $data = json_encode($data);

            @$res = $this->curlPost($url, $data);

        } else {

            $openid = $client2['openid'];
            $date   = date('Y-m-d H:i');
            if ($config['mini_template_id']) {

                $form = $this->getFormId($to_uid);
                if ($form) {

                    $access_token = $this->getAccessToken();
                    if (!$access_token) {
                        return false;
//                        return $this->result(-1, '请求失败', []);
                    }

                    $url  = "https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token={$access_token}";
                    $page = "longbing_card/pages/index/index?to_uid={$to_uid}&currentTabBar=toCard";
                    $page = "longbing_card/staff/radar/radar";

                    $postData = [
                        'touser'      => $openid,
                        'template_id' => $config['mini_template_id'],
                        'page'        => $page,
                        'form_id'     => $form,
                        'data'        => [
                            'keyword1' => ['value' => $name],
                            'keyword2' => ['value' => '第' . $count . '次进入你的名片'],
                            'keyword3' => ['value' => $date],
                        ],
                    ];
                    $postData = json_encode($postData);

                    @$response = curlPost($url, $postData);
                }
            }
        }


        pdo_fetch("DELETE FROM " . tablename('longbing_card_count') . " where user_id = to_uid");
        return true;
    }
    protected function sendTplStaff2($user_id, $to_uid, $type, $uniacid, $target = '')
    {
        global $_GPC, $_W;
        $appid = $_W['account']['key'];
        $appsecret = $_W['account']['secret'];


        $config = pdo_get('longbing_card_config', ['uniacid' => $uniacid], ['mini_template_id', 'notice_switch', 'notice_i', 'min_tmppid']);

        $client = pdo_get('longbing_card_user', ['id' => $user_id]);
        $client2 = pdo_get('longbing_card_user', ['id' => $to_uid]);
        $name = $client['nickName'];

        $check = pdo_getall('longbing_card_count', [
            'user_id' => $user_id,
            'to_uid' => $to_uid,
            'type' => 2,
            'uniacid' => $uniacid,
            'sign' => 'praise']);
        if ($user_id == $to_uid) {
            return false;
        }
        $time = time();
        $count = 1;
        if (!empty($check)) {
            $ten = count($check) % 10;
            $count = count($check);
        }


        if ($config['notice_switch'] == 1) {

            if (!$config['notice_i']) {
                return $this->result(-1, '发送失败, 未配置公众号模块id', []);
            }
            if (!$config['min_tmppid']) {
                return $this->result(-1, '发送失败, 未配置公众号模板id', []);
            }


            $page = "longbing_card/pages/index/index?to_uid={$to_uid}&currentTabBar=toCard";

            $url = 'http://' . $_SERVER['HTTP_HOST'] . '/app/index.php?i=' . $config['notice_i'] . '&c=entry&do=sendmsg&m=longbing_tmsg&min_uid=' . $to_uid . '&min_uniacid=' . $_W['uniacid'] . '&min_tmppid=' . $config['min_tmppid'];

            $date = date('Y-m-d H:i');
            $data = array(
                'first'    => array(
                    'value' => $name,
                    'color' => '#c27ba0',
                ),
                'keyword1' => array(
                    'value' => '第' . $count . '次进入你的名片',
                    'color' => '#93c47d',
                ),
                'keyword2' => array(
                    'value' => $date,
                    'color' => '#0000ff',
                ),
                'remark'   => array(
                    'value' => '备注',
                    'color' => '#45818e',
                ),
            );
        echo '<pre>';
            $data = ['data_content' => $data, 'pagepath' => $page, 'appid' => $appid];

            $data = json_encode($data);

            @$res = $this->curlPost($url, $data);
        } else {

            $openid = $client2['openid'];
            $date   = date('Y-m-d H:i');
            if ($config['mini_template_id']) {

                $form = $this->getFormId($to_uid);
                if ($form) {

                    $access_token = $this->getAccessToken();
                    if (!$access_token) {
                        return $this->result(-1, '请求失败', []);
                    }

                    $url  = "https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token={$access_token}";
                    $page = "longbing_card/pages/index/index?to_uid={$to_uid}&currentTabBar=toCard";

                    $postData = [
                        'touser'      => $openid,
                        'template_id' => $config['mini_template_id'],
                        'page'        => $page,
                        'form_id'     => $form,
                        'data'        => [
                            'keyword1' => ['value' => $name],
                            'keyword2' => ['value' => '第' . $count . '次进入你的名片'],
                            'keyword3' => ['value' => $date],
                        ],
                    ];
                    $postData = json_encode($postData);

                    @$response = ihttp_post($url, $postData);
                }
            }
        }


        pdo_fetch("DELETE FROM " . tablename('longbing_card_count') . " where user_id = to_uid");
        return true;
    }

    protected function pp($data)
    {
        $data = json_decode(json_encode($data), true);
        echo '<pre>';
        print_r($data);
        echo '</pre>';
        die;
    }

    public function doPageTest()
    {
        global $_GPC, $_W;
        echo 'test';
    }

    protected function getRandStr($len)
    {
        $len = intval($len);
        $a = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,S,Y,Z";
        $a = explode(',', $a);
        $tmp = '';
        for ($i = 0; $i < $len; $i++) {
            $rand = rand(0, count($a));
            $tmp .= $a[$rand];
        }
        return $tmp;
    }

    protected function getFormId($to_uid)
    {
        // 七天前开始的的时间戳
        $beginTime = mktime(0, 0, 0, date('m'), date('d') - 6, date('Y'));
        pdo_delete('longbing_card_formId', ['create_time <' => $beginTime]);
        $formId = pdo_getall('longbing_card_formId', ['user_id' => $to_uid], [], '', 'id asc', 1);

        if (empty($formId)) {
            return false;
        }
        if ($formId[0]['create_time'] < $beginTime) {
            pdo_delete('longbing_card_formId', ['id' => $formId[0]['id']]);
            $this->getFormId($to_uid);
        } else {
            pdo_delete('longbing_card_formId', ['id' => $formId[0]['id']]);
            return $formId[0]['formId'];
        }
    }

    protected function transImage($path)
    {
        $path = tomedia($path);

        global $_GPC, $_W;
        $arr = explode('/', $path);
        $fileName = "images/longbing_card/{$_W['uniacid']}/" . $arr[count($arr) - 1];
        if (!is_dir(ATTACHMENT_ROOT . '/' . "images"))
        {
            mkdir(ATTACHMENT_ROOT . '/' . "images");
        }
        if (!is_dir(ATTACHMENT_ROOT . '/' . "images/longbing_card"))
        {
            mkdir(ATTACHMENT_ROOT . '/' . "images/longbing_card");
        }
        if (!is_dir(ATTACHMENT_ROOT . '/' . "images/longbing_card/{$_W['uniacid']}/"))
        {
            mkdir(ATTACHMENT_ROOT . '/' . "images/longbing_card/{$_W['uniacid']}/");
        }

        if (file_exists(ATTACHMENT_ROOT . $fileName))
        {
            $path = $_W['siteroot'] . $_W['config']['upload']['attachdir'] . '/' . $fileName;
            return $path;
        }

        if (!strstr($path, $_SERVER['HTTP_HOST'])) {
            file_put_contents(ATTACHMENT_ROOT . '/' . $fileName, file_get_contents($path));
            $path = $_W['siteroot'] . $_W['config']['upload']['attachdir'] . '/' . $fileName;
        }
        else if (strstr($path, '.' . $_SERVER['HTTP_HOST']))
        {
            file_put_contents(ATTACHMENT_ROOT . '/' . $fileName, file_get_contents($path));
            $path = $_W['siteroot'] . $_W['config']['upload']['attachdir'] . '/' . $fileName;
        }
        else
        {
            $path = str_replace('ttp://', 'ttps://', $path);
            if (!strstr($path, 'ttps://')) {
                $path = 'https://' . $path;
            }
        }
        return $path;
    }

    protected function transImageBack($path)
    {
        $pathArr = explode(',', $path);
        $tmp = [];
        foreach ($pathArr as $k => $v) {
            if ((substr($v, 0, 7) == 'http://') || (substr($v, 0, 8) == 'https://') || (substr($v, 0, 2) == '//')) {
                $pos = strpos($v, '/images');
                if ($pos) {
                    $url = substr($v, $pos + 1);
                    array_push($tmp, $url);
                } else {
                    array_push($tmp, $v);
                }

            } else {
                array_push($tmp, $v);
            }
        }
        $tmp = implode(',', $tmp);
        return $tmp;
    }

    /**
     * 添加快捷回复
     * @access public
     * @return json
     */
    public function doPageAddReply()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $content = $_GPC['content'];
        $staff_id = $_GPC['staff_id'];
        if ($staff_id) {
            $uid = $staff_id;
        }

        if (!$uid || !$content) {
            return $this->result(-1, '请传入参数', []);
        }

        $info = pdo_get('longbing_card_quick_reply', ['user_id' => $uid, 'content' => $content, 'uniacid' => $_W['uniacid'], 'status' => 1]);
        if (!empty($info)) {
            return $this->result(-1, '已存在', []);
        }
        $time = time();
        $result = pdo_insert('longbing_card_quick_reply', [
            'user_id' => $uid,
            'content' => $content,
            'uniacid' => $_W['uniacid'],
            'status' => 1,
            'create_time' => $time,
            'update_time' => $time,
        ]);
        if ($result) {
            $insert_id = pdo_insertid();
            return $this->result(0, '添加成功', ['id' => $insert_id]);
        }
        return $this->result(-1, '添加失败', []);
    }

    /**
     * 修改快捷回复
     * @access public
     * @return json
     */
    public function doPageEditReply()
    {
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $id = $_GPC['id'];
        $content = $_GPC['content'];
        $staff_id = $_GPC['staff_id'];
        if ($staff_id) {
            $uid = $staff_id;
        }

        if (!$uid || !$content || !$id) {
            return $this->result(-1, '请传入参数', []);
        }

        $info = pdo_get('longbing_card_quick_reply', ['user_id' => $uid, 'id' => $id, 'uniacid' => $_W['uniacid'], 'status' => 1]);
        if (empty($info)) {
            return $this->result(-1, '未找到数据', []);
        }
        $time = time();
        $result = pdo_update('longbing_card_quick_reply', [
            'content' => $content,
            'update_time' => $time,
        ], ['id' => $id]);
        if ($result) {
            return $this->result(0, '修改成功', []);
        }
        return $this->result(-1, '修改失败', []);
    }

    /**
     * 删除快捷回复
     * @access public
     * @return json
     */
    public function doPageDelReply()
    {
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $id = $_GPC['id'];
        $staff_id = $_GPC['staff_id'];
        if ($staff_id) {
            $uid = $staff_id;
        }

        if (!$uid || !$id) {
            return $this->result(-1, '请传入参数', []);
        }

        $info = pdo_get('longbing_card_quick_reply', ['user_id' => $uid, 'id' => $id, 'uniacid' => $_W['uniacid'], 'status' => 1]);
        if (empty($info)) {
            return $this->result(-1, '未找到数据', []);
        }
        $time = time();
        $result = pdo_delete('longbing_card_quick_reply', ['id' => $id]);
        if ($result) {
            return $this->result(0, '删除成功', []);
        }
        return $this->result(-1, '删除失败', []);
    }

    /**
     * 快捷回复列表
     * @access public
     * @return json
     */
    public function doPageReplyList()
    {
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $staff_id = $_GPC['staff_id'];
        if ($staff_id) {
            $uid = $staff_id;
        }

        if (!$uid) {
            return $this->result(-1, '请传入参数', []);
        }
        $data = [];
        $info = pdo_getall('longbing_card_reply_type',
            ['uniacid' => $_W['uniacid'], 'status' => 1],
            [], '', ['top desc', 'id desc']);
        $my = pdo_getall('longbing_card_quick_reply',
            ['uniacid' => $_W['uniacid'], 'status' => 1, 'user_id' => $uid],
            [], '', ['top desc', 'id desc']);
        $my = ['title' => '自定义话术', 'list' => $my];
        $data[] = $my;
        foreach ($info as $k => $v)
        {
            $list = pdo_getall('longbing_card_quick_reply',
                ['uniacid' => $_W['uniacid'], 'status' => 1, 'type' => $v['id']],
                ['content'], '', ['top desc', 'id desc']);
            $v['list'] = $list;
            array_push($data, $v);
        }
        return $this->result(0, '请求成功', $data);
    }

    /**
     * 底部菜单
     * @access public
     * @return json
     */
    public function doPageTabBar()
    {
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $staff_id = $_GPC['staff_id'];
        if ($staff_id) {
            $uid = $staff_id;
        }

        $info = pdo_get('longbing_card_tabbar', ['uniacid' => $_W['uniacid']]);
        if (empty($info))
        {
            $time = time();
            $dataConfig = array(
                'uniacid' => $_W['uniacid'],
                'status' => 1,
                'create_time' => $time,
                'update_time' => $time,
            );
            $res = pdo_insert('longbing_card_tabbar', $dataConfig);

            if ($res)
            {
                $info = pdo_get('longbing_card_tabbar', ['uniacid' => $_W['uniacid']]);
            }
            else
            {
                return $this->result(0, '请求成功', []);
            }
        }
        if ($info) {
            $data = array();
            $i = 0;
            foreach ($info as $k => $v) {
                if ($i < 5 && $i > 0) {
                    $data['menu_name'][] = $v;
                } else if ($i < 9 && $i > 0) {
                    $data['menu_is_hide'][] = $v;
                } else if ($i < 13 && $i > 0) {
                    $data['menu_url'][] = $v;
                } else if ($i < 17 && $i > 0) {
                    $data['menu_url_out'][] = $v;
                } else if ($i < 21 && $i > 0) {
                    $data['menu_url_jump_way'][] = $v;
                } else {
                    $data[$k] = $v;
                }
                $i++;
            }
            return $this->result(0, '请求成功', $data);
        }
        return $this->result(0, '请求成功', []);
    }

    /**
     * 用户来源及电话号码
     * @access public
     * @return json
     */
    public function doPageSource()
    {
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];

        $client_id = $_GPC['client_id'];

        $staff_id = $_GPC['staff_id'];
        $uniacid = $_W['uniacid'];
        if ($staff_id) {
            $uid = $staff_id;
        }
        if (!$client_id) {
            return $this->result(-1, '请传入参数', []);
        }

        $user = pdo_get('longbing_card_user', ['id' => $client_id, 'uniacid' => $uniacid]);

        if (empty($user)) {
            return $this->result(-1, '未找到用户', []);
        }

        $data = array();

        $data['user'] = [
            'is_qr' => $user['is_qr'],
            'is_group' => $user['is_group'],
            'type' => $user['type'],
            'target_id' => $user['target_id'],
            'scene' => $user['scene'],
            'openGId' => $user['openGId'],
        ];

        if ($data['user']['is_group']) {
            $group = pdo_get('longbing_card_share_group', ['user_id' => $uid, 'client_id' => $client_id]);
            if ($group) {
                $data['user']['openGId'] = $group['openGId'];
            }
        }

//        $phone = pdo_get('longbing_card_user_phone', ['user_id' => $client_id, 'to_uid' => $uid, 'status' => 1, 'uniacid' => $uniacid]);
        $phone = pdo_get('longbing_card_user_phone', ['user_id' => $client_id, 'status' => 1, 'uniacid' => $uniacid]);

        //  查找手机号
        if (!$phone) {
            $phone = pdo_get('longbing_card_client_info', ['user_id' => $client_id, 'staff_id' => $uid, 'status' => 1, 'uniacid' => $uniacid]);
            if (!$phone) {
                $phone = pdo_get('longbing_card_client_info', ['user_id' => $client_id, 'status' => 1, 'uniacid' => $uniacid]);
                $phone = !$phone ? '' : $phone['phone'];
                $data['phone'] = $phone;
            } else {
                $data['phone'] = $phone['phone'];
            }
        } else {
            $data['phone'] = $phone['phone'];
        }
        return $this->result(0, '请求成功', $data);
    }






    //    BOSS端相关-----------------------------------------------------------------------------

    /**
     * 跨域函数
     * @access public
     * @return json
     */
    protected function cross()
    {
//        header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,OPTIONS');

// 指定允许其他域名访问
        header('Access-Control-Allow-Origin:*');
// 响应类型
        header('Access-Control-Allow-Methods:GET,POST');
// 响应头设置
        header('Access-Control-Allow-Headers:x-requested-with,content-type');
    }

    /**
     * boss总览
     * @access public
     * @param string $user_id 用户id
     * @param string $type 0=>汇总，1=>昨日，2=>近七日，3=>近30天
     * @return json
     */
    public function doPageBossOverview () {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $type = $_GPC['type'];
        $uniacid = $_W['uniacid'];
        $is_more = $_GPC['is_more'];

        if (!$type) {
            $type = 0;
        }

        $beginTime = 0;

        switch ($type) {
            case 1://   1=>昨日
                $beginTime = mktime(0, 0, 0, date('m'), date('d') - 1, date('Y'));
                break;
            case 2://   2=>近七日
                $beginTime = mktime(0, 0, 0, date('m'), date('d') - 7, date('Y'));
                break;
            case 3://   3=>近30天
                $beginTime = mktime(0, 0, 0, date('m'), date('d') - 30, date('Y'));
                break;
            default://   0=>汇总
                $beginTime = 0;
        }

        if ($beginTime == 0) {
            //  新增客户数
            $new_client = pdo_getall('longbing_card_user', ['uniacid' => $uniacid], ['id']);
            $new_client = count($new_client);
            //  浏览客户数
            $view_client = "SELECT COUNT(id) as `count` FROM " . tablename('longbing_card_count') . " WHERE uniacid = {$uniacid} && sign = 'praise' && `type` = 2 GROUP BY user_id";
            $view_client = pdo_fetchall($view_client);
//            $view_client = $view_client[0]['count'];
            $view_client = count($view_client);
            //  跟进客户数
            $mark_client = pdo_getall('longbing_card_user_mark', ['uniacid' => $uniacid], ['id']);
            $mark_client = count($mark_client);
            //  沟通客户数
            $chat_list = "SELECT chat_id, user_id, target_id FROM " . tablename('longbing_card_message') . " WHERE uniacid = {$uniacid} GROUP BY chat_id";
            $chat_list = pdo_fetchall($chat_list);
            if (!empty($chat_list)) {
                $tmp = [];
                foreach ($chat_list as $k => $v) {
                    array_push($tmp, $v['user_id'], $v['target_id']);
                }
                $tmp = array_unique($tmp, SORT_NUMERIC);
                $tmp = implode(',', $tmp);

                if (strpos($tmp, ',')) {
                    $tmp = '(' . $tmp . ')';
                    $chat_list = pdo_fetchall("SELECT COUNT(id) as `count`,id FROM " . tablename('longbing_card_user') . " WHERE id IN {$tmp} && uniacid = {$uniacid} && is_staff = 0");
                } else {
                    $chat_list = pdo_fetchall("SELECT COUNT(id) as `count`,id,create_time FROM " . tablename('longbing_card_user') . " WHERE id = {$tmp} && uniacid = {$uniacid} && is_staff = 0");
                }
                $chat_client = $chat_list[0]['count'];
            } else {
                $chat_client = 0;
            }
            //  商城销售金额
            $sale_money = 0;
            //  商城订单数
            $sale_order = 0;

            $orderList = pdo_getall('longbing_card_shop_order', ['uniacid' => $uniacid, 'pay_status' => 1]);
            foreach ($orderList as $index => $item)
            {
                $sale_money += $item['total_price'];
            }
            $sale_money = sprintf("%.2f", $sale_money);
            $sale_order = count($orderList);

            //  被转发次数
            $share_count = pdo_getall('longbing_card_forward', ['uniacid' => $uniacid, 'type' => 1], ['id']);
            $share_count = count($share_count);
            //  被保存次数
            $save_count = "SELECT COUNT(id) as `count` FROM " . tablename('longbing_card_count') . " WHERE (uniacid = {$uniacid} && sign = 'copy' && `type` = 2) OR (uniacid = {$uniacid} && sign = 'copy' && `type` = 1) GROUP BY user_id";
            $save_count = pdo_fetchall($save_count);
//            $save_count = $save_count[0]['count'];
            $save_count = count($save_count);
            //  被点赞次数
            $thumbs_count = "SELECT COUNT(id) as `count` FROM " . tablename('longbing_card_count') . " WHERE (uniacid = {$uniacid} && sign = 'praise' && `type` = 1) OR (uniacid = {$uniacid} && sign = 'praise' && `type` = 3) OR (uniacid = {$uniacid} && sign = 'view' && `type` = 4) GROUP BY user_id";
            $thumbs_count = pdo_fetchall($thumbs_count);
            $thumbs_count = $thumbs_count[0]['count'];
        }
        else
        {
            //  新增客户数
            $new_client = pdo_getall('longbing_card_user', ['uniacid' => $uniacid, 'create_time >' => $beginTime], ['id']);
            $new_client = count($new_client);
            //  浏览客户数
            $view_client = "SELECT COUNT(id) as `count` FROM " . tablename('longbing_card_count') . " WHERE uniacid = {$uniacid} && sign = 'praise' && `type` = 2 && create_time > {$beginTime} GROUP BY user_id";
            $view_client = pdo_fetchall($view_client);
//            $view_client = $view_client[0]['count'];
            $view_client = count($view_client);
            //  跟进客户数
            $mark_client = pdo_getall('longbing_card_user_mark', ['uniacid' => $uniacid, 'create_time >' => $beginTime], ['id']);
            $mark_client = count($mark_client);
            //  沟通客户数
            $chat_list = "SELECT chat_id, user_id, target_id FROM " . tablename('longbing_card_message') . " WHERE uniacid = {$uniacid} && create_time > {$beginTime} GROUP BY chat_id";
            $chat_list = pdo_fetchall($chat_list);
            if (!empty($chat_list)) {
                $tmp = [];
                foreach ($chat_list as $k => $v) {
                    array_push($tmp, $v['user_id'], $v['target_id']);
                }
                $tmp = array_unique($tmp, SORT_NUMERIC);
                $tmp = implode(',', $tmp);
                if (strpos($tmp, ',')) {
                    $tmp = '(' . $tmp . ')';
                    $chat_list = pdo_fetchall("SELECT COUNT(id) as `count`,nickName FROM " . tablename('longbing_card_user') . " WHERE id IN {$tmp} && uniacid = {$uniacid} && is_staff = 0");
                } else {
                    $chat_list = pdo_fetchall("SELECT COUNT(id) as `count`,avatarUrl FROM " . tablename('longbing_card_user') . " WHERE id = {$tmp} && uniacid = {$uniacid} && is_staff = 0");
                }
                $chat_client = $chat_list[0]['count'];
            } else {
                $chat_client = 0;
            }
            //  商城销售金额
            $sale_money = 0;
            //  商城订单数
            $sale_order = 0;
            $orderList = pdo_getall('longbing_card_shop_order', ['uniacid' => $uniacid, 'pay_status' => 1, 'create_time >' => $beginTime]);
            foreach ($orderList as $index => $item)
            {
                $sale_money += $item['total_price'];
            }
            $sale_money = sprintf("%.2f", $sale_money);
            $sale_order = count($orderList);
            //  被转发次数
            $share_count = pdo_getall('longbing_card_forward', ['uniacid' => $uniacid, 'type' => 1, 'create_time >' => $beginTime], ['id']);
            $share_count = count($share_count);
            //  被保存次数
            $save_count = "SELECT COUNT(id) as `count` FROM " . tablename('longbing_card_count') . " WHERE (uniacid = {$uniacid} && sign = 'copy' && `type` = 2 && create_time > {$beginTime}) OR (uniacid = {$uniacid} && sign = 'copy' && `type` = 1 && create_time > {$beginTime}) GROUP BY user_id";
            $save_count = pdo_fetchall($save_count);
//            $save_count = $save_count[0]['count'];
            $save_count = count($save_count);
            //  被点赞次数
            $thumbs_count = "SELECT COUNT(id) as `count` FROM " . tablename('longbing_card_count') . " WHERE (uniacid = {$uniacid} && sign = 'praise' && `type` = 1 && create_time > {$beginTime}) OR (uniacid = {$uniacid} && sign = 'praise' && `type` = 3 && create_time > {$beginTime}) OR (uniacid = {$uniacid} && sign = 'view' && `type` = 4 && create_time > {$beginTime}) GROUP BY user_id";
            $thumbs_count = pdo_fetchall($thumbs_count);
            $thumbs_count = $thumbs_count[0]['count'];
        }
        $data['nine'] = [
            'new_client' => $new_client,
            'view_client' => $view_client,
            'mark_client' => $mark_client,
            'chat_client' => $chat_client,
            'sale_money' => $sale_money,
            'sale_order' => $sale_order,
            'share_count' => $share_count,
            'save_count' => $save_count,
            'thumbs_count' => $thumbs_count,
        ];

        if ($is_more)
        {
            //boss成交率漏斗
            //  总用户数
            $client = pdo_getall('longbing_card_user', ['uniacid' => $uniacid], ['id']);
            $client = count($client);

            //  跟进客户数
            $mark_client = pdo_getall('longbing_card_user_mark', ['uniacid' => $uniacid], ['id']);
            $mark_client = count($mark_client);

            //  成交客户数
            $deal_client = pdo_getall('longbing_card_user_mark', ['uniacid' => $uniacid, 'mark' => 2], ['id']);
            $deal_client = count($deal_client);

            $data['dealRate'] = [
                'client' => $client,
                'mark_client' => $mark_client,
                'deal_client' => $deal_client,
            ];


            //  商城订单量&交易金额
            $last = 30;

            $dataOrderMoney = [];
            //  新增客户
            $dataNewClient = [];
            //  咨询客户数
            $dataAskClient = [];
            //  跟进客户数
            $dataMarkClient = [];
            //  客户兴趣占比
            $dataInterest = [];
            for ($i = 0; $i < $last; $i++) {
                $beginTime = mktime(0, 0, 0, date('m'), date('d') - $i, date('Y'));
                $endTime = mktime(0, 0, 0, date('m'), date('d') - $i + 1, date('Y')) - 1;

                $md = date('m/d', $beginTime);

                //  商城订单量&交易金额
//                $orderList = pdo_getall('longbing_card_shop_order', ['pay_status' => 1, 'create_time >' => $beginTime]);
                $sql = "SELECT id, total_price FROM " . tablename('longbing_card_shop_order') . " where uniacid = {$_W['uniacid']} && create_time BETWEEN {$beginTime} AND {$endTime} && pay_status = 1";

                $list = pdo_fetchall($sql);
                foreach ($list as $index => $item)
                {
                    $sale_money += $item['total_price'];
                }
                $sale_money = sprintf("%.2f", $sale_money);
                $sale_order = count($list);


                $tmp = [
                    'date' => $md,
                    'time' => $beginTime,
                    'order_number' => $sale_order,
                    'money_number' => $sale_money
                ];
                array_push($dataOrderMoney, $tmp);

                //  新增客户
                $sql = "SELECT id FROM " . tablename('longbing_card_user') . " where uniacid = {$_W['uniacid']} && create_time BETWEEN {$beginTime} AND {$endTime}";

                $info = pdo_fetchall($sql);

                $tmp = [
                    'date' => $md,
                    'time' => $beginTime,
                    'number' => count($info),
                ];
                array_push($dataNewClient, $tmp);

                //  咨询客户数
                $sql = "SELECT user_id FROM " . tablename('longbing_card_message') . " where uniacid = {$_W['uniacid']} && create_time BETWEEN {$beginTime} AND {$endTime} GROUP BY user_id";

                $info = pdo_fetchall($sql);

                $tmp = [
                    'date' => $md,
                    'time' => $beginTime,
                    'number' => count($info),
                ];
                array_push($dataAskClient, $tmp);


                //  跟进客户数
                $sql = "SELECT user_id FROM " . tablename('longbing_card_user_mark') . " where uniacid = {$_W['uniacid']} && create_time BETWEEN {$beginTime} AND {$endTime}";

                $info = pdo_fetchall($sql);

                $tmp = [
                    'date' => $md,
                    'time' => $beginTime,
                    'number' => count($info),
                ];
                array_push($dataMarkClient, $tmp);



                //  客户兴趣占比
                //  对公司感兴趣
                $sql = "SELECT id FROM " . tablename('longbing_card_count') . " WHERE sign = 'view' && type = 6 && uniacid = {$uniacid}";
                $compony = pdo_fetchall($sql);
                $compony = count($compony);

                //  对产品感兴趣
                $sql = "SELECT id FROM " . tablename('longbing_card_count') . " WHERE (sign = 'copy' && type = 2 && uniacid = {$uniacid}) OR (sign = 'copy' && type = 1 && uniacid = {$uniacid})";
                $goods = pdo_fetchall($sql);
                $goods = count($goods);

                //  对员工感兴趣
                $sql = "SELECT id FROM " . tablename('longbing_card_count') . " WHERE (sign = 'copy' && uniacid = {$uniacid}) OR (sign != 'praise' && uniacid = {$uniacid})";
                $staff = pdo_fetchall($sql);
                $staff = count($staff);

                $total = $compony + $goods + $staff;
                $dataInterest = [
                    'compony' => [
                        'number' => $compony,
                        'rate' => 0,
                    ],
                    'goods' => [
                        'number' => $goods,
                        'rate' => 0,
                    ],
                    'staff' => [
                        'number' => $staff,
                        'rate' => 0,
                    ],
                ];
                if ($total) {
                    foreach ($dataInterest as $k => $v) {
                        $dataInterest[$k]['rate'] = sprintf("%.2f", $v['number'] / $total) * 100;
                    }
                }
            }
            array_multisort(array_column($dataOrderMoney, 'time'), SORT_ASC, $dataOrderMoney);
            array_multisort(array_column($dataNewClient, 'time'), SORT_ASC, $dataNewClient);
            array_multisort(array_column($dataAskClient, 'time'), SORT_ASC, $dataAskClient);
            array_multisort(array_column($dataMarkClient, 'time'), SORT_ASC, $dataMarkClient);

            $data['orderMoney'] = $dataOrderMoney;
            $data['newClient'] = $dataNewClient;
            $data['askClient'] = $dataAskClient;
            $data['markClient'] = $dataMarkClient;
            $data['interest'] = $dataInterest;

            $last = 15;
            $dataActivity = [];

            for ($i = 0; $i < $last; $i++) {
                $beginTime = mktime(0, 0, 0, date('m'), date('d') - $i, date('Y'));
                $endTime = mktime(0, 0, 0, date('m'), date('d') - $i + 1, date('Y')) - 1;

                $md = date('m/d', $beginTime);

                $sql = "SELECT id FROM " . tablename('longbing_card_count') . " where uniacid = {$uniacid} && create_time BETWEEN {$beginTime} AND {$endTime}";
                $count = pdo_fetchall($sql);
                $count = count($count);
                $sql = "SELECT id FROM " . tablename('longbing_card_forward') . " where uniacid = {$uniacid} && create_time BETWEEN {$beginTime} AND {$endTime}";
                $forward = pdo_fetchall($sql);
                $forward = count($forward);
                $sql = "SELECT id FROM " . tablename('longbing_card_user_phone') . " where uniacid = {$uniacid} && create_time BETWEEN {$beginTime} AND {$endTime}";
                $phone = pdo_fetchall($sql);
                $phone = count($phone);
                $tmp = [
                    'date' => $md,
                    'time' => $beginTime,
                    'number' => $count + $forward + $phone,
                ];
                array_push($dataActivity, $tmp);
            }
            array_multisort(array_column($dataActivity, 'time'), SORT_ASC, $dataActivity);
            $data['activity'] = $dataActivity;




            $dataActivityBarGraph = [];
            $beginTime = mktime(0, 0, 0, date('m'), date('d') - $last, date('Y'));
            $thumbs = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_count') . " where (sign = 'view' && `type` = 4 && uniacid = {$uniacid} && create_time > $beginTime) OR (sign = 'praise' && `type` = 1 && uniacid = {$uniacid} && create_time > $beginTime) OR (sign = 'praise' && `type` = 3 && uniacid = {$uniacid} && create_time > $beginTime)");
            $thumbs = count($thumbs);
            $dataActivityBarGraph[] = [
                'title' => '点赞',
                'number' => $thumbs,
                'rate' => 0,
            ];

            $save_phone = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_count') . " where sign = 'copy' && `type` = 1 && uniacid = {$uniacid} && create_time > $beginTime");
            $save_phone = count($save_phone);
            $dataActivityBarGraph[] = [
                'title' => '保存手机',
                'number' => $save_phone,
                'rate' => 0,
            ];

            $comment = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_timeline_comment') . " where uniacid = {$uniacid} && create_time > $beginTime");
            $comment = count($comment);
            $dataActivityBarGraph[] = [
                'title' => '评论',
                'number' => $comment,
                'rate' => 0,
            ];

            $copy_wechat = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_count') . " where sign = 'copy' && `type` = 4 && uniacid = {$uniacid} && create_time > $beginTime");
            $copy_wechat = count($copy_wechat);
            $dataActivityBarGraph[] = [
                'title' => '复制微信',
                'number' => $copy_wechat,
                'rate' => 0,
            ];

            $total = $thumbs + $save_phone + $comment + $copy_wechat;
            if ($total) {
                foreach ($dataActivityBarGraph as $k => $v) {
                    $dataActivityBarGraph[$k]['rate'] = sprintf("%.2f", $v['number'] / $total) * 100;
                }
            }
            $data['activityBarGraph'] = $dataActivityBarGraph;

        }



        return $this->result(0, '请求成功', $data);
    }

    /**
     * boss雷达九宫格
     * @access public
     * @param string $user_id 用户id
     * @param string $type 0=>汇总，1=>昨日，2=>近七日，3=>近30天
     * @return json
     */
    public function doPageBossRadarNine()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $type = $_GPC['type'];
        $uniacid = $_W['uniacid'];
        if (!$type) {
            $type = 0;
        }
        $beginTime = 0;

        switch ($type) {
            case 1://   1=>昨日
                $beginTime = mktime(0, 0, 0, date('m'), date('d') - 1, date('Y'));
                break;
            case 2://   2=>近七日
                $beginTime = mktime(0, 0, 0, date('m'), date('d') - 7, date('Y'));
                break;
            case 3://   3=>近30天
                $beginTime = mktime(0, 0, 0, date('m'), date('d') - 30, date('Y'));
                break;
            default://   0=>汇总
                $beginTime = 0;
        }

        if ($beginTime == 0) {
            //  新增客户数
            $new_client = pdo_getall('longbing_card_user', ['uniacid' => $uniacid], ['id']);
            $new_client = count($new_client);
            //  浏览客户数
            $view_client = "SELECT COUNT(id) as `count` FROM " . tablename('longbing_card_count') . " WHERE uniacid = {$uniacid} && sign = 'praise' && `type` = 2 GROUP BY user_id";
            $view_client = pdo_fetchall($view_client);
//            $view_client = $view_client[0]['count'];
            $view_client = count($view_client);
            //  跟进客户数
            $mark_client = pdo_getall('longbing_card_user_mark', ['uniacid' => $uniacid], ['id']);
            $mark_client = count($mark_client);
            //  沟通客户数
            $chat_list = "SELECT chat_id, user_id, target_id FROM " . tablename('longbing_card_message') . " WHERE uniacid = {$uniacid} GROUP BY chat_id";
            $chat_list = pdo_fetchall($chat_list);
            if (!empty($chat_list)) {
                $tmp = [];
                foreach ($chat_list as $k => $v) {
                    array_push($tmp, $v['user_id'], $v['target_id']);
                }
                $tmp = array_unique($tmp, SORT_NUMERIC);
                $tmp = implode(',', $tmp);

                if (strpos($tmp, ',')) {
                    $tmp = '(' . $tmp . ')';
                    $chat_list = pdo_fetchall("SELECT COUNT(id) as `count`,id FROM " . tablename('longbing_card_user') . " WHERE id IN {$tmp} && uniacid = {$uniacid} && is_staff = 0");
                } else {
                    $chat_list = pdo_fetchall("SELECT COUNT(id) as `count`,id,create_time FROM " . tablename('longbing_card_user') . " WHERE id = {$tmp} && uniacid = {$uniacid} && is_staff = 0");
                }
                $chat_client = $chat_list[0]['count'];
            } else {
                $chat_client = 0;
            }
            //  商城销售金额
            $sale_money = 0;
            //  商城订单数
            $sale_order = 0;
            //  被转发次数
            $share_count = pdo_getall('longbing_card_forward', ['uniacid' => $uniacid, 'type' => 1], ['id']);
            $share_count = count($share_count);
            //  被保存次数
            $save_count = "SELECT COUNT(id) as `count` FROM " . tablename('longbing_card_count') . " WHERE (uniacid = {$uniacid} && sign = 'copy' && `type` = 2) OR (uniacid = {$uniacid} && sign = 'copy' && `type` = 1) GROUP BY user_id";
            $save_count = pdo_fetchall($save_count);
//            $save_count = $save_count[0]['count'];
            $save_count = count($save_count);
            //  被点赞次数
            $thumbs_count = "SELECT COUNT(id) as `count` FROM " . tablename('longbing_card_count') . " WHERE (uniacid = {$uniacid} && sign = 'praise' && `type` = 1) OR (uniacid = {$uniacid} && sign = 'praise' && `type` = 3) OR (uniacid = {$uniacid} && sign = 'view' && `type` = 4) GROUP BY user_id";
            $thumbs_count = pdo_fetchall($thumbs_count);
            $thumbs_count = $thumbs_count[0]['count'];
        } else {
            //  新增客户数
            $new_client = pdo_getall('longbing_card_user', ['uniacid' => $uniacid, 'create_time >' => $beginTime], ['id']);
            $new_client = count($new_client);
            //  浏览客户数
            $view_client = "SELECT COUNT(id) as `count` FROM " . tablename('longbing_card_count') . " WHERE uniacid = {$uniacid} && sign = 'praise' && `type` = 2 && create_time > {$beginTime} GROUP BY user_id";
            $view_client = pdo_fetchall($view_client);
//            $view_client = $view_client[0]['count'];
            $view_client = count($view_client);
            //  跟进客户数
            $mark_client = pdo_getall('longbing_card_user_mark', ['uniacid' => $uniacid, 'create_time >' => $beginTime], ['id']);
            $mark_client = count($mark_client);
            //  沟通客户数
            $chat_list = "SELECT chat_id, user_id, target_id FROM " . tablename('longbing_card_message') . " WHERE uniacid = {$uniacid} && create_time > {$beginTime} GROUP BY chat_id";
            $chat_list = pdo_fetchall($chat_list);
            if (!empty($chat_list)) {
                $tmp = [];
                foreach ($chat_list as $k => $v) {
                    array_push($tmp, $v['user_id'], $v['target_id']);
                }
                $tmp = array_unique($tmp, SORT_NUMERIC);
                $tmp = implode(',', $tmp);
                if (strpos($tmp, ',')) {
                    $tmp = '(' . $tmp . ')';
                    $chat_list = pdo_fetchall("SELECT COUNT(id) as `count`,nickName FROM " . tablename('longbing_card_user') . " WHERE id IN {$tmp} && uniacid = {$uniacid} && is_staff = 0");
                } else {
                    $chat_list = pdo_fetchall("SELECT COUNT(id) as `count`,avatarUrl FROM " . tablename('longbing_card_user') . " WHERE id = {$tmp} && uniacid = {$uniacid} && is_staff = 0");
                }
                $chat_client = $chat_list[0]['count'];
            } else {
                $chat_client = 0;
            }
            //  商城销售金额
            $sale_money = 0;
            //  商城订单数
            $sale_order = 0;
            //  被转发次数
            $share_count = pdo_getall('longbing_card_forward', ['uniacid' => $uniacid, 'type' => 1, 'create_time >' => $beginTime], ['id']);
            $share_count = count($share_count);
            //  被保存次数
            $save_count = "SELECT COUNT(id) as `count` FROM " . tablename('longbing_card_count') . " WHERE (uniacid = {$uniacid} && sign = 'copy' && `type` = 2 && create_time > {$beginTime}) OR (uniacid = {$uniacid} && sign = 'copy' && `type` = 1 && create_time > {$beginTime}) GROUP BY user_id";
            $save_count = pdo_fetchall($save_count);
//            $save_count = $save_count[0]['count'];
            $save_count = count($save_count);
            //  被点赞次数
            $thumbs_count = "SELECT COUNT(id) as `count` FROM " . tablename('longbing_card_count') . " WHERE (uniacid = {$uniacid} && sign = 'praise' && `type` = 1 && create_time > {$beginTime}) OR (uniacid = {$uniacid} && sign = 'praise' && `type` = 3 && create_time > {$beginTime}) OR (uniacid = {$uniacid} && sign = 'view' && `type` = 4 && create_time > {$beginTime}) GROUP BY user_id";
            $thumbs_count = pdo_fetchall($thumbs_count);
            $thumbs_count = $thumbs_count[0]['count'];
        }
        $data = [
            'new_client' => $new_client,
            'view_client' => $view_client,
            'mark_client' => $mark_client,
            'chat_client' => $chat_client,
            'sale_money' => $sale_money,
            'sale_order' => $sale_order,
            'share_count' => $share_count,
            'save_count' => $save_count,
            'thumbs_count' => $thumbs_count,
        ];
        return $this->result(0, '请求成功', $data);
    }

    /**
     * boss成交率漏斗
     * @access public
     * @param string $user_id 用户id
     * @param string $type 0=>汇总，1=>昨日，2=>近七日，3=>近30天
     * @return json
     */
    public function doPageBossDealRate()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $uniacid = $_W['uniacid'];

        //  总用户数
        $client = pdo_getall('longbing_card_user', ['uniacid' => $uniacid], ['id']);
        $client = count($client);

        //  跟进客户数
        $mark_client = pdo_getall('longbing_card_user_mark', ['uniacid' => $uniacid], ['id']);
        $mark_client = count($mark_client);

        //  成交客户数
        $deal_client = pdo_getall('longbing_card_user_mark', ['uniacid' => $uniacid, 'mark' => 2], ['id']);
        $deal_client = count($deal_client);

        $data = [
            'client' => $client,
            'mark_client' => $mark_client,
            'deal_client' => $deal_client,
        ];
        return $this->result(0, '请求成功', $data);
    }

    /**
     * 商城订单量&交易金额
     * @access public
     * @return json
     */
    public function doPageBossOrderMoney()
    {
        $this->cross();
        global $_GPC, $_W;
        $last = 30;

        $data = [];
        for ($i = 0; $i < $last; $i++) {
            $beginTime = mktime(0, 0, 0, date('m'), date('d') - $i, date('Y'));
            $endTime = mktime(0, 0, 0, date('m'), date('d') - $i + 1, date('Y')) - 1;

            $tmp = [
                'date' => date('Y-m-d', $beginTime),
                'time' => $beginTime,
                'order_number' => 0,
                'money_number' => 0
            ];
            array_push($data, $tmp);
        }
        array_multisort(array_column($data, 'time'), SORT_ASC, $data);
        return $this->result(0, '请求成功', $data);
    }

    /**
     * 新增客户
     * @access public
     * @return json
     */
    public function doPageBossNewClient()
    {
        $this->cross();
        global $_GPC, $_W;
        $last = 30;

        $data = [];
        for ($i = 0; $i < $last; $i++) {
            $beginTime = mktime(0, 0, 0, date('m'), date('d') - $i, date('Y'));
            $endTime = mktime(0, 0, 0, date('m'), date('d') - $i + 1, date('Y')) - 1;

            $sql = "SELECT id FROM " . tablename('longbing_card_user') . " where uniacid = {$_W['uniacid']} && create_time BETWEEN {$beginTime} AND {$endTime}";

            $info = pdo_fetchall($sql);

            $tmp = [
                'date' => date('Y-m-d', $beginTime),
                'time' => $beginTime,
                'number' => count($info),
            ];
            array_push($data, $tmp);
        }
        array_multisort(array_column($data, 'time'), SORT_ASC, $data);
        return $this->result(0, '请求成功', $data);
    }

    /**
     * 咨询客户数
     * @access public
     * @return json
     */
    public function doPageBossAskClient()
    {
        $this->cross();
        global $_GPC, $_W;
        $uniacid = $_W['uniacid'];

        $last = 30;

        $data = [];

        $list = pdo_getall('longbing_card_user', ['uniacid' => $uniacid, 'is_staff' => 1], ['id']);

        $ids = '';
        if (!empty($list)) {
            foreach ($list as $k => $v) {
                $ids .= ',' . $v['id'];
            }
            $ids = trim($ids, ',');
        }

        for ($i = 0; $i < $last; $i++) {
            $beginTime = mktime(0, 0, 0, date('m'), date('d') - $i, date('Y'));
            $endTime = mktime(0, 0, 0, date('m'), date('d') - $i + 1, date('Y')) - 1;

            if (!empty($list)) {
                $sql = "SELECT user_id FROM " . tablename('longbing_card_message') . " where uniacid = {$_W['uniacid']} && create_time BETWEEN {$beginTime} AND {$endTime} GROUP BY user_id";
            } else {
                if (count($list) > 1) {
                    $ids = '(' . $ids . ')';
                    $sql = "SELECT user_id FROM " . tablename('longbing_card_message') . " where uniacid = {$_W['uniacid']} && create_time BETWEEN {$beginTime} AND {$endTime} && user_id NOT IN $ids GROUP BY user_id";
                } else {
                    $sql = "SELECT user_id FROM " . tablename('longbing_card_message') . " where uniacid = {$_W['uniacid']} && create_time BETWEEN {$beginTime} AND {$endTime} && user_id != $ids GROUP BY user_id";
                }
            }

            $info = pdo_fetchall($sql);

            $tmp = [
                'date' => date('Y-m-d', $beginTime),
                'time' => $beginTime,
                'number' => count($info),
            ];
            array_push($data, $tmp);
        }
        array_multisort(array_column($data, 'time'), SORT_ASC, $data);

        return $this->result(0, '请求成功', $data);
    }

    /**
     * 跟进客户数
     * @access public
     * @return json
     */
    public function doPageBossMarkClient()
    {
        $this->cross();
        global $_GPC, $_W;
        $uniacid = $_W['uniacid'];

        $last = 30;

        $data = [];

//        $list = pdo_getall('longbing_card_user', ['uniacid' => $uniacid, 'is_staff' => 1], ['id']);
//
//        $ids = '';
//        if (!empty($list)) {
//            foreach ($list as $k => $v) {
//                $ids .= ',' . $v['id'];
//            }
//            $ids = trim($ids, ',');
//        }

        for ($i = 0; $i < $last; $i++) {
            $beginTime = mktime(0, 0, 0, date('m'), date('d') - $i, date('Y'));
            $endTime = mktime(0, 0, 0, date('m'), date('d') - $i + 1, date('Y')) - 1;

            $sql = "SELECT user_id FROM " . tablename('longbing_card_user_mark') . " where uniacid = {$_W['uniacid']} && create_time BETWEEN {$beginTime} AND {$endTime}";

            $info = pdo_fetchall($sql);

            $tmp = [
                'date' => date('Y-m-d', $beginTime),
                'time' => $beginTime,
                'number' => count($info),
            ];
            array_push($data, $tmp);
        }
        array_multisort(array_column($data, 'time'), SORT_ASC, $data);

        return $this->result(0, '请求成功', $data);
    }

    /**
     * 客户兴趣占比
     * @access public
     * @return json
     */
    public function doPageBossInterest()
    {
        $this->cross();
        global $_GPC, $_W;
        $uniacid = $_W['uniacid'];

        //  对公司感兴趣
        $sql = "SELECT id FROM " . tablename('longbing_card_count') . " WHERE sign = 'view' && type = 6 && uniacid = {$uniacid}";
        $compony = pdo_fetchall($sql);
        $compony = count($compony);

        //  对产品感兴趣
        $sql = "SELECT id FROM " . tablename('longbing_card_count') . " WHERE (sign = 'copy' && type = 2 && uniacid = {$uniacid}) OR (sign = 'copy' && type = 1 && uniacid = {$uniacid})";
        $goods = pdo_fetchall($sql);
        $goods = count($goods);

        //  对员工感兴趣
        $sql = "SELECT id FROM " . tablename('longbing_card_count') . " WHERE (sign = 'copy' && uniacid = {$uniacid}) OR (sign != 'praise' && uniacid = {$uniacid})";
        $staff = pdo_fetchall($sql);
        $staff = count($staff);

        $total = $compony + $goods + $staff;
        $data = [
            'compony' => [
                'number' => $compony,
                'rate' => 0,
            ],
            'goods' => [
                'number' => $goods,
                'rate' => 0,
            ],
            'staff' => [
                'number' => $staff,
                'rate' => 0,
            ],
        ];
        if ($total) {
            foreach ($data as $k => $v) {
                $data[$k]['rate'] = sprintf("%.2f", $v['number'] / $total) * 100;
            }
        }

        return $this->result(0, '请求成功', $data);
    }

    /**
     * 近15日客户活跃度
     * @access public
     * @return json
     */
    public function doPageBossActivity()
    {
        $this->cross();
        global $_GPC, $_W;
        $uniacid = $_W['uniacid'];

        $last = 15;

        $data = [];

        for ($i = 0; $i < $last; $i++) {
            $beginTime = mktime(0, 0, 0, date('m'), date('d') - $i, date('Y'));
            $endTime = mktime(0, 0, 0, date('m'), date('d') - $i + 1, date('Y')) - 1;

            $sql = "SELECT id FROM " . tablename('longbing_card_count') . " where uniacid = {$uniacid} && create_time BETWEEN {$beginTime} AND {$endTime}";
            $count = pdo_fetchall($sql);
            $count = count($count);
            $sql = "SELECT id FROM " . tablename('longbing_card_forward') . " where uniacid = {$uniacid} && create_time BETWEEN {$beginTime} AND {$endTime}";
            $forward = pdo_fetchall($sql);
            $forward = count($forward);
            $sql = "SELECT id FROM " . tablename('longbing_card_user_phone') . " where uniacid = {$uniacid} && create_time BETWEEN {$beginTime} AND {$endTime}";
            $phone = pdo_fetchall($sql);
            $phone = count($phone);
            $tmp = [
                'date' => date('Y-m-d', $beginTime),
                'time' => $beginTime,
                'number' => $count + $forward + $phone,
            ];
            array_push($data, $tmp);
        }
        array_multisort(array_column($data, 'time'), SORT_ASC, $data);

        return $this->result(0, '请求成功', $data);
    }

    /**
     * 近15日客户活跃度柱状图
     * @access public
     * @return json
     */
    public function doPageBossActivityBarGraph()
    {
        $this->cross();
        global $_GPC, $_W;
        $uniacid = $_W['uniacid'];

        $last = 15;

        $data = [];
        $beginTime = mktime(0, 0, 0, date('m'), date('d') - $last, date('Y'));
        $thumbs = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_count') . " where (sign = 'view' && `type` = 4 && uniacid = {$uniacid} && create_time > $beginTime) OR (sign = 'praise' && `type` = 1 && uniacid = {$uniacid} && create_time > $beginTime) OR (sign = 'praise' && `type` = 3 && uniacid = {$uniacid} && create_time > $beginTime)");
        $thumbs = count($thumbs);
        $data[] = [
            'title' => '点赞',
            'number' => $thumbs,
            'rate' => 0,
        ];

        $save_phone = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_count') . " where sign = 'copy' && `type` = 1 && uniacid = {$uniacid} && create_time > $beginTime");
        $save_phone = count($save_phone);
        $data[] = [
            'title' => '保存手机',
            'number' => $save_phone,
            'rate' => 0,
        ];

        $comment = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_timeline_comment') . " where uniacid = {$uniacid} && create_time > $beginTime");
        $comment = count($comment);
        $data[] = [
            'title' => '评论',
            'number' => $comment,
            'rate' => 0,
        ];

        $copy_wechat = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_count') . " where sign = 'copy' && `type` = 4 && uniacid = {$uniacid} && create_time > $beginTime");
        $copy_wechat = count($copy_wechat);
        $data[] = [
            'title' => '复制微信',
            'number' => $copy_wechat,
            'rate' => 0,
        ];

        $total = $thumbs + $save_phone + $comment + $copy_wechat;
        if ($total) {
            foreach ($data as $k => $v) {
                $data[$k]['rate'] = sprintf("%.2f", $v['number'] / $total) * 100;
            }
        }
        return $this->result(0, '请求成功', $data);
    }

    /**
     * 销售排行 按客户人数
     * @access public
     * @return json
     */
    public function doPageBossRankClients()
    {
        $this->cross();
        global $_GPC, $_W;
        $uniacid = $_W['uniacid'];
        $sign = $_GPC['sign']; //   1 => 客户总数; 2 => 新增客户
        $type = $_GPC['type']; //   1 => 昨日; 2 => 近7天; 3 => 近15天; 4 => 近30天; 仅当$sign = 2时有效

        if (!$sign) {
            $sign = 1;
        }
        if (!$type) {
            $type = 1;
        }

        $curr = 1;
        if (isset($_GPC['page'])) {
            $curr = $_GPC['page'];
        }
        $offset = ($curr - 1) * 10;

        if ($sign == 1) {
            $sql = "SELECT count(id) as total, to_uid FROM " . tablename('longbing_card_collection') . " WHERE uid != to_uid && uniacid = {$uniacid} GROUP BY to_uid";
            $list = pdo_fetchall($sql);

            $staffs = pdo_fetchall("SELECT a.id,a.name,a.avatar,a.create_time,a.fans_id,b.nickName,b.avatarUrl FROM " . tablename('longbing_card_user_info') . " a LEFT JOIN " . tablename('longbing_card_user') . " b ON a.fans_id = b.id where a.status = 1 && b.is_staff = 1 && a.uniacid = {$uniacid} && a.fans_id > 0");
            foreach ($staffs as $k => $v) {
                $staffs[$k]['count'] = 0;
                $staffs[$k]['avatar'] = tomedia($v['avatar']);
                foreach ($list as $k2 => $v2) {
                    if ($v2['to_uid'] == $v['fans_id']) {
                        $staffs[$k]['count'] = $v2['total'];
                    }
                }
            }
            array_multisort(array_column($staffs, 'count'), SORT_DESC, $staffs);
            foreach ($staffs as $k => $v) {
                $staffs[$k]['sort'] = $k + 1;
            }
            $array = array_slice($staffs, $offset, 10);
            $data = [
                'page' => $curr,
                'total_page' => ceil(count($staffs) / 10),
                'list' => $array,
                'total_count' => count($staffs)
            ];
            return $this->result(0, '请求成功', $data);
        }

        $beginTime = 0;
        switch ($type) {
            case 2://   2=>近七天数据
                // 七天前开始的的时间戳
                $beginTime = mktime(0, 0, 0, date('m'), date('d') - 7, date('Y'));
                break;
            case 3://   3=>近15天数据
                // 15天前开始的的时间戳
                $beginTime = mktime(0, 0, 0, date('m'), date('d') - 15, date('Y'));
                break;
            case 4://   3=>近30天数据
                $beginTime = mktime(0, 0, 0, date('m'), date('d') - 30, date('Y'));
                break;
            default://  1=>今日数据
                // 今天开始的的时间戳
                $beginTime = mktime(0, 0, 0, date('m'), date('d') - 1, date('Y'));
            // 今天结束的时间戳
            //                $endTime = mktime(0, 0, 0, date('m'), date('d') + 1, date('Y')) - 1;
        }

        $sql = "SELECT count(id) as total, to_uid FROM " . tablename('longbing_card_collection') . " WHERE uid != to_uid && uniacid = {$uniacid} && create_time > {$beginTime} GROUP BY to_uid";
        $list = pdo_fetchall($sql);


        $staffs = pdo_fetchall("SELECT a.id,a.name,a.avatar,a.create_time,a.fans_id,b.nickName,b.avatarUrl FROM " . tablename('longbing_card_user_info') . " a LEFT JOIN " . tablename('longbing_card_user') . " b ON a.fans_id = b.id where a.status = 1 && b.is_staff = 1 && a.uniacid = {$uniacid}");

        foreach ($staffs as $k => $v) {
            $staffs[$k]['count'] = 0;
            $staffs[$k]['avatar'] = tomedia($v['avatar']);
            foreach ($list as $k2 => $v2) {
                if ($v2['to_uid'] == $v['fans_id']) {
                    $staffs[$k]['count'] = $v2['total'];
                }
            }
        }
//        echo "<pre>";
//        var_dump($list);
//        var_dump($staffs);
//        die;
//        echo "</pre>";
        array_multisort(array_column($staffs, 'count'), SORT_DESC, $staffs);

        foreach ($staffs as $k => $v) {
            $staffs[$k]['sort'] = $k + 1;
        }

        $array = array_slice($staffs, $offset, 10);
        $data = [
            'page' => $curr,
            'total_page' => ceil(count($staffs) / 10),
            'list' => $array,
            'total_count' => count($staffs)
        ];

        return $this->result(0, '请求成功', $data);

    }

    /**
     * 销售排行 按订单量
     * @access public
     * @return json
     */
    public function doPageBossRankOrder()
    {
        $this->cross();
        global $_GPC, $_W;
        $uniacid = $_W['uniacid'];
        $type = $_GPC['type']; //   1 => 昨日; 2 => 近7天; 3 => 近15天; 4 => 近30天; 5 => 全部

        if (!$type) {
            $type = 1;
        }



        $beginTime = 0;
        switch ($type) {
            case 2://   2=>近七天数据
                // 七天前开始的的时间戳
                $beginTime = mktime(0, 0, 0, date('m'), date('d') - 7, date('Y'));
                break;
            case 3://   3=>近15天数据
                // 15天前开始的的时间戳
                $beginTime = mktime(0, 0, 0, date('m'), date('d') - 15, date('Y'));
                break;
            case 4://   3=>近30天数据
                $beginTime = mktime(0, 0, 0, date('m'), date('d') - 30, date('Y'));
                break;
            default://  1=>今日数据
                // 今天开始的的时间戳
                $beginTime = mktime(0, 0, 0, date('m'), date('d') - 1, date('Y'));
            // 今天结束的时间戳
            //                $endTime = mktime(0, 0, 0, date('m'), date('d') + 1, date('Y')) - 1;
        }



        $curr = 1;
        if (isset($_GPC['page'])) {
            $curr = $_GPC['page'];
        }
        $offset = ($curr - 1) * 10;

        $staffs = pdo_fetchall("SELECT a.id,a.name,a.avatar,a.create_time,a.fans_id,b.nickName,b.avatarUrl FROM " . tablename('longbing_card_user_info') . " a LEFT JOIN " . tablename('longbing_card_user') . " b ON a.fans_id = b.id where a.status = 1 && b.is_staff = 1 && a.uniacid = {$uniacid}");
        foreach ($staffs as $k => $v) {

            $staffs[$k]['count'] = 0;
            $staffs[$k]['money'] = 0;




            //  商城订单量&交易金额
            $orderList = pdo_getall('longbing_card_shop_order', ['pay_status' => 1, 'create_time >' => $beginTime]);
//            $sql = "SELECT id, total_price FROM " . tablename('longbing_card_shop_order') . " where uniacid = {$_W['uniacid']} && create_time BETWEEN {$beginTime} AND {$endTime} && pay_status = 1";

//            $list = pdo_fetchall($sql);
            foreach ($orderList as $index => $item)
            {
                $staffs[$k]['money'] += $item['total_price'];
            }
            $staffs[$k]['count'] = count($orderList);




            $staffs[$k]['avatar'] = tomedia($v['avatar']);
        }
        array_multisort(array_column($staffs, 'count'), SORT_DESC, $staffs);
        foreach ($staffs as $k => $v) {
            $staffs[$k]['sort'] = $k + 1;
        }

        $array = array_slice($staffs, $offset, 10);
        $data = [
            'page' => $curr,
            'total_page' => ceil(count($staffs) / 10),
            'list' => $array,
            'total_count' => count($staffs)
        ];

        return $this->result(0, '请求成功', $data);
    }

    /**
     * 销售排行 互动评率
     * @access public
     * @return json
     */
    public function doPageBossRankInteraction()
    {
        $this->cross();
        global $_GPC, $_W;
        $uniacid = $_W['uniacid'];
        $sign = $_GPC['sign']; //   1 => 总跟进数; 2 => 总成交数
        $type = $_GPC['type']; //   1 => 昨日; 2 => 近7天; 3 => 近15天; 4 => 近30天; 5 => 全部

        if (!$sign) {
            $sign = 1;
        }
        if (!$type) {
            $type = 1;
        }

        $beginTime = 0;
        switch ($type) {
            case 1://   1=>昨日
                // 1天前开始的的时间戳
                $beginTime = mktime(0, 0, 0, date('m'), date('d') - 1, date('Y'));
                break;
            case 2://   2=>近七天数据
                // 七天前开始的的时间戳
                $beginTime = mktime(0, 0, 0, date('m'), date('d') - 7, date('Y'));
                break;
            case 3://   3=>近15天数据
                // 15天前开始的的时间戳
                $beginTime = mktime(0, 0, 0, date('m'), date('d') - 15, date('Y'));
                break;
            case 4://   3=>近30天数据
                $beginTime = mktime(0, 0, 0, date('m'), date('d') - 30, date('Y'));
                break;
        }

        $curr = 1;
        if (isset($_GPC['page'])) {
            $curr = $_GPC['page'];
        }
        $offset = ($curr - 1) * 10;

        $staffs = pdo_fetchall("SELECT a.id,a.name,a.avatar,a.create_time,a.fans_id,b.nickName,b.avatarUrl FROM " . tablename('longbing_card_user_info') . " a LEFT JOIN " . tablename('longbing_card_user') . " b ON a.fans_id = b.id where a.status = 1 && b.is_staff = 1 && a.uniacid = {$uniacid}");
        foreach ($staffs as $k => $v) {
            $staffs[$k]['avatar'] = tomedia($v['avatar']);
            $list = pdo_getall('longbing_card_user_mark', ['mark >=' => $sign, 'staff_id' => $v['fans_id'], 'create_time' => $beginTime]);
            $staffs[$k]['count'] = count($list);
        }
        array_multisort(array_column($staffs, 'count'), SORT_DESC, $staffs);
        foreach ($staffs as $k => $v) {
            $staffs[$k]['sort'] = $k + 1;
        }

        $array = array_slice($staffs, $offset, 10);
        $data = [
            'page' => $curr,
            'total_page' => ceil(count($staffs) / 10),
            'list' => $array,
            'total_count' => count($staffs)
        ];

        return $this->result(0, '请求成功', $data);
    }

    /**
     * 销售排行 成交率区间
     * @access public
     * @return json
     */
    public function doPageBossRankRate()
    {
        $this->cross();
        global $_GPC, $_W;
        $uniacid = $_W['uniacid'];
        $type = $_GPC['type']; //   1 => 1%-50%; 2 => 50%-100%; 3 => 全部

        if (!$type) {
            $type = 1;
        }

        $curr = 1;
        if (isset($_GPC['page'])) {
            $curr = $_GPC['page'];
        }
        $offset = ($curr - 1) * 10;

        $staffs = pdo_fetchall("SELECT a.id,a.name,a.avatar,a.create_time,a.fans_id,b.nickName,b.avatarUrl FROM " . tablename('longbing_card_user_info') . " a LEFT JOIN " . tablename('longbing_card_user') . " b ON a.fans_id = b.id where a.status = 1 && b.is_staff = 1 && a.uniacid = {$uniacid}");
        foreach ($staffs as $k => $v) {
            $staffs[$k]['avatar'] = tomedia($v['avatar']);
            $sql = "SELECT id FROM " . tablename('longbing_card_rate') . " WHERE staff_id = {$v['fans_id']} && uniacid = {$uniacid}";
            if ($type == 1) {
                $sql .= " && rate < 50";
            } else if ($type == 2) {
                $sql .= " && rate >= 50";
            }
            $list = pdo_fetchall($sql);
            $staffs[$k]['count'] = count($list);
        }
        array_multisort(array_column($staffs, 'count'), SORT_DESC, $staffs);
        foreach ($staffs as $k => $v) {
            $staffs[$k]['sort'] = $k + 1;
        }
        $array = array_slice($staffs, $offset, 10);
        $data = [
            'page' => $curr,
            'total_page' => ceil(count($staffs) / 10),
            'list' => $array,
            'total_count' => count($staffs)
        ];

        return $this->result(0, '请求成功', $data);
    }

    /**
     * 客户列表
     * @access public
     * @return json
     */
    public function doPageBossClients()
    {
        $this->cross();
        global $_GPC, $_W;
        $uniacid = $_W['uniacid'];
        $staff_id = $_GPC['staff_id'];
        if (!$staff_id) {
            return $this->result(-1, '请求参数错误', []);
        }

        $where = [
            'uniacid' => $uniacid,
            'is_staff' => 0,
        ];

        $limit = array(1, $this->limit);

        $curr = 1;
        if (isset($_GPC['page'])) {
            $limit[0] = $_GPC['page'];
            $curr = $_GPC['page'];
        }

        $list = pdo_getslice('longbing_card_user', $where, $limit, $count, ['id', 'nickName', 'avatarUrl'], '', ['id desc']);

        $tmp = [];
        foreach ($list as $k => $v) {
            $data = $v;

            $coll = pdo_get('longbing_card_collection', ['to_uid' => $staff_id, 'uid' => $v['id']]);
            if (empty($coll)) {
                continue;
            }

            $client_info = pdo_get('longbing_card_client_info', ['user_id' => $v['id'], 'uniacid' => $uniacid]);
            $list[$k]['name'] = empty($client_info) ? '' : $client_info['name'];

            //  AI成交率
            $rate = pdo_getall('longbing_card_rate', ['user_id' => $v['id'], 'uniacid' => $uniacid], '', ['rate desc']);
            $list[$k]['rate'] = empty($rate) ? 0 : $client_info[0]['rate'];
            //  预计成交时间
            $date = pdo_getall('longbing_card_date', ['user_id' => $v['id'], 'uniacid' => $uniacid], '', ['date desc']);
            $list[$k]['date'] = empty($date) ? 0 : $date[0]['date'];
            //  跟进状态
            $mark = pdo_getall('longbing_card_user_mark', ['user_id' => $v['id'], 'uniacid' => $uniacid], '', ['status desc']);
            $list[$k]['mark'] = empty($mark) ? 0 : $date[0]['mark'];

            $client_orders = pdo_getall('longbing_card_shop_order', ['user_id' => $v['id'], 'pay_status' => 1, 'order_status !=' => 1]);

            $list[$k]['order'] = count($client_orders);
            $list[$k]['money'] = 0;

            foreach ($client_orders as $index => $item)
            {
                $list[$k]['money'] += $item['total_price'];
            }

        }
        $data = [
            'page' => $curr,
            'total_page' => ceil($count / $this->limit),
            'list' => $list,
            'count' => $count,
        ];
        return $this->result(0, '请求成功', $data);
    }

    /**
     * AI分析
     * @access public
     * @return json
     */
    public function doPageBossAi()
    {
        $this->cross();
        global $_GPC, $_W;
        $uniacid = $_W['uniacid'];

        $default = [
            'client' => 0,        //  获客能力值
            'charm' => 0,        //  个人魅力值
            'interaction' => 0,        //  客户互动值
            'product' => 0,        //  产品推广值
            'website' => 0,        //  官网推广度
            'active' => 0,        //  销售主动性值
        ];
        $max = [
            'client' => 0,        //  获客能力值
            'charm' => 0,        //  个人魅力值
            'interaction' => 0,        //  客户互动值
            'product' => 0,        //  产品推广值
            'website' => 0,        //  官网推广度
            'active' => 0,        //  销售主动性值
        ];
        $staff_list = pdo_getall('longbing_card_user', ['uniacid' => $uniacid, 'is_staff' => 1], ['id', 'nickName', 'avatarUrl',]);

        foreach ($staff_list as $k => $v) {
            $info = pdo_get('longbing_card_user_info', ['uniacid' => $uniacid, 'fans_id' => $v['id']], ['name', 'avatar', 'phone', 'job_id']);
            $job = pdo_get('longbing_card_job', ['id' => $info['job_id']]);
            $info['job_name'] = !empty($job) ? $job['name'] : '';
            $total = 0;

            $value = $this->bossGetAiValue($v['id']);

            foreach ($value as $k2 => $v2) {
                if ($v2['value'] > $max[$k2]) {
                    $max[$k2] = $v2['value'];
                }
                $total += $v2['value'];
            }

            $staff_list[$k]['value'] = $value;
            $staff_list[$k]['total'] = $total;
            $info['avatar'] = tomedia($info['avatar']);
            $staff_list[$k]['info'] = $info;
        }

        //  二维数组排序
        array_multisort(array_column($staff_list, 'total'), SORT_DESC, $staff_list);

        $limit = array(1, 10);

        $curr = 1;
        if (isset($_GPC['page'])) {
            $limit[0] = $_GPC['page'];
            $curr = $_GPC['page'];
        }
        $offset = ($curr - 1) * 10;
        $array = array_slice($staff_list, $offset, 10);

        $com = pdo_get('longbing_card_company', ['uniacid' => $uniacid]);
        $com['logo'] = $this->transImage($com['logo']);
        $data = [
            'list' => $array,
            'max' => $max,
            'com' => $com,
        ];

        return $this->result(0, '请求成功', $data);
    }

    /**
     * 员工数值
     * @access public
     * @return json
     */
    protected function bossGetAiValue($id)
    {
        $this->cross();
        global $_GPC, $_W;
        $uniacid = $_W['uniacid'];
        $value = [
            'client' => 0,        //  获客能力值
            'charm' => 0,        //  个人魅力值
            'interaction' => 0,        //  客户互动值
            'product' => 0,        //  产品推广值
            'website' => 0,        //  官网推广度
            'active' => 0,        //  销售主动性值
        ];
        $check = pdo_get('longbing_card_value', ['staff_id' => $id]);
        if ((empty($check)) || (!empty($check) && $check['update_time'] - time() > 24 * 60 * 60)) {
            //  获客能力值
            $client = pdo_getall('longbing_card_collection', [
                'status' => 1,
                'to_uid' => $id,
            ]);
            $client = count($client);
            $value['client'] = $client;

            //  个人魅力值
            $list1 = pdo_getall('longbing_card_count', ['type' => 'praise', 'type' => 1, 'to_uid' => $id]);
            $list2 = pdo_getall('longbing_card_count', ['type' => 'praise', 'type' => 3, 'to_uid' => $id]);
            $list3 = pdo_getall('longbing_card_count', ['type' => 'copy', 'to_uid' => $id]);

            $count = count($list1) + count($list2) + count($list3);
            $value['charm'] = $count;

            //  客户互动值
            $list1 = pdo_getall('longbing_card_message', ['user_id' => $id]);
            $list2 = pdo_getall('longbing_card_message', ['target_id' => $id]);
            $list3 = pdo_getall('longbing_card_count', ['type' => 'view', 'to_uid' => $id]);
            $count = count($list1) + count($list2) + count($list3);
            $value['interaction'] = $count;

            //  产品推广值
            $list1 = pdo_getall('longbing_card_extension', ['user_id' => $id, 'uniacid' => $uniacid]);
            $list2 = pdo_getall('longbing_card_user_mark', ['staff_id' => $id, 'uniacid' => $uniacid, 'mark' => 2]);
            $list3 = pdo_getall('longbing_card_forward', ['staff_id' => $id, 'uniacid' => $uniacid, 'type' => 2]);
            $list4 = pdo_getall('longbing_card_share_group', ['user_id' => $id, 'uniacid' => $uniacid, 'view_goods !=' => '']);
            $count = count($list1) + count($list2) + count($list3) + count($list4);
            $value['product'] = $count;

            //  官网推广度
            $list1 = pdo_getall('longbing_card_count', ['type' => 'view', 'type' => 6, 'to_uid' => $id]);
            $list2 = pdo_getall('longbing_card_forward', ['staff_id' => $id, 'uniacid' => $uniacid, 'type' => 4]);
            $count = count($list1) + count($list2);
            $value['website'] = $count;

            //  销售主动性值
            $list1 = pdo_getall('longbing_card_message', ['user_id' => $id]);
            $list2 = pdo_getall('longbing_card_message', ['target_id' => $id]);
            $list3 = pdo_getall('longbing_card_user_follow', ['staff_id' => $id]);
            $list4 = pdo_getall('longbing_card_user_mark', ['staff_id' => $id]);
            $count = count($list1) + count($list2) + count($list3) + count($list4);
            $value['active'] = $count;

            $insertData = $value;
            $insertData['staff_id'] = $id;
            $time = time();
            $insertData['create_time'] = $time;
            $insertData['update_time'] = $time;
            $insertData['uniacid'] = $uniacid;
            if (empty($check)) {
                pdo_insert('longbing_card_value', $insertData);
            } else {
                $updateData = $value;
                $insertData['update_time'] = $time;
                pdo_update('longbing_card_value', $insertData, ['id' => $check['id']]);
            }
        } else {
            $value = [
                'client' => $check['client'],        //  获客能力值
                'charm' => $check['charm'],        //  个人魅力值
                'interaction' => $check['interaction'],        //  客户互动值
                'product' => $check['product'],        //  产品推广值
                'website' => $check['website'],        //  官网推广度
                'active' => $check['active'],        //  销售主动性值
            ];
        }
        $data = [
            'client' => [
                'titlle' => '获客能力值',
                'value' => $value['client']
            ],
            'charm' => [
                'titlle' => '个人魅力值',
                'value' => $value['charm']
            ],
            'interaction' => [
                'titlle' => '客户互动值',
                'value' => $value['interaction']
            ],
            'product' => [
                'titlle' => '产品推广值',
                'value' => $value['product']
            ],
            'website' => [
                'titlle' => '官网推广度',
                'value' => $value['website']
            ],
            'active' => [
                'titlle' => '销售主动性值',
                'value' => $value['active']
            ],
        ];
        return $data;
    }

    /**
     * 员工总客户数, 总跟进数, 总咨询数
     * @access public
     * @return json
     */
    public function doPageBossStaffNumber()
    {
        $this->cross();
        global $_GPC, $_W;
        $uniacid = $_W['uniacid'];
        $staff_id = $_GPC['staff_id'];

        if (!$staff_id) {
            return $this->result(-1, '请求参数错误', []);
        }
        //  总客户数
        $client = pdo_getall('longbing_card_collection', [
            'status' => 1,
            'to_uid' => $staff_id,
            'uid !=' => $staff_id,
        ]);
        $client = count($client);
        $value['client'] = $client;
        //  总跟进数
        $mark = pdo_getall('longbing_card_user_mark', [
            'status' => 1,
            'staff_id' => $staff_id,
        ]);
        $mark = count($mark);
        $value['mark'] = $mark;
        //  总咨询数
        $chat1 = pdo_getall('longbing_card_chat', [
            'status' => 1,
            'user_id' => $staff_id,
        ]);
        $chat2 = pdo_getall('longbing_card_chat', [
            'status' => 1,
            'target_id' => $staff_id,
        ]);
        $chat = count($chat1) + count($chat2);
        $value['chat'] = $chat;
        return $this->result(0, '请求成功', $value);
    }

    /**
     * boss雷达员工九宫格
     * @access public
     * @param string $user_id 用户id
     * @param string $type 0=>汇总，1=>昨日，2=>近七日，3=>近30天
     * @return json
     */
    public function doPageBossStaffRadarNine()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $type = $_GPC['type'];
        $uniacid = $_W['uniacid'];
        if (!$type) {
            $type = 0;
        }
        $beginTime = 0;
        $staff_id = $_GPC['staff_id'];

        if (!$staff_id) {
            return $this->result(-1, '请求参数错误', []);
        }

        switch ($type) {
            case 1://   1=>昨日
                $beginTime = mktime(0, 0, 0, date('m'), date('d') - 1, date('Y'));
                break;
            case 2://   2=>近七日
                $beginTime = mktime(0, 0, 0, date('m'), date('d') - 7, date('Y'));
                break;
            case 3://   3=>近30天
                $beginTime = mktime(0, 0, 0, date('m'), date('d') - 30, date('Y'));
                break;
            default://   0=>汇总
                $beginTime = 0;
        }

        if ($beginTime == 0) {
            //  新增客户数
            $new_client = pdo_getall('longbing_card_collection', ['to_uid' => $staff_id], ['id']);
            $new_client = count($new_client);
            //  浏览客户数
            $view_client = "SELECT COUNT(id) as `count` FROM " . tablename('longbing_card_count') . " WHERE uniacid = {$uniacid} && sign = 'praise' && `type` = 2 && to_uid = {$staff_id} GROUP BY user_id";
            $view_client = pdo_fetchall($view_client);
            $view_client = $view_client[0]['count'];
            //  跟进客户数
            $mark_client = pdo_getall('longbing_card_user_mark', ['uniacid' => $uniacid, 'staff_id' => $staff_id], ['id']);
            $mark_client = count($mark_client);
            //  沟通客户数
            $chat_list = "SELECT chat_id, user_id, target_id FROM " . tablename('longbing_card_message') . " WHERE uniacid = {$uniacid} && target_id = {$staff_id} GROUP BY chat_id";
            $chat_list = pdo_fetchall($chat_list);
            if (!empty($chat_list)) {
                $tmp = [];
                foreach ($chat_list as $k => $v) {
                    array_push($tmp, $v['user_id'], $v['target_id']);
                }
                $tmp = array_unique($tmp, SORT_NUMERIC);
                $tmp = implode(',', $tmp);

                if (strpos($tmp, ',')) {
                    $tmp = '(' . $tmp . ')';
                    $chat_list = pdo_fetchall("SELECT COUNT(id) as `count`,id FROM " . tablename('longbing_card_user') . " WHERE id IN {$tmp} && uniacid = {$uniacid} && is_staff = 0");
                } else {
                    $chat_list = pdo_fetchall("SELECT COUNT(id) as `count`,id,create_time FROM " . tablename('longbing_card_user') . " WHERE id = {$tmp} && uniacid = {$uniacid} && is_staff = 0");
                }
                $chat_list = $chat_list[0]['count'];
            } else {
                $chat_list = 0;
            }
            //  商城销售金额
            $sale_money = 0;
            //  商城订单数
            $sale_order = 0;
            //  被转发次数
            $share_count = pdo_getall('longbing_card_forward', ['uniacid' => $uniacid, 'type' => 1, 'staff_id' => $staff_id], ['id']);
            $share_count = count($share_count);
            //  被保存次数
            $save_count = "SELECT COUNT(id) as `count` FROM " . tablename('longbing_card_count') . " WHERE (uniacid = {$uniacid} && sign = 'copy' && `type` = 2 && to_uid = {$staff_id}) OR (uniacid = {$uniacid} && sign = 'copy' && `type` = 1 && to_uid = {$staff_id}) GROUP BY user_id";
            $save_count = pdo_fetchall($save_count);
            $save_count = $save_count[0]['count'];
            //  被点赞次数
            $thumbs_count = "SELECT COUNT(id) as `count` FROM " . tablename('longbing_card_count') . " WHERE (uniacid = {$uniacid} && sign = 'praise' && `type` = 1 && to_uid = {$staff_id}) OR (uniacid = {$uniacid} && sign = 'praise' && `type` = 3 && to_uid = {$staff_id}) OR (uniacid = {$uniacid} && sign = 'view' && `type` = 4 && to_uid = {$staff_id}) GROUP BY user_id";
            $thumbs_count = pdo_fetchall($thumbs_count);
            $thumbs_count = $thumbs_count[0]['count'];
        } else {
            //  新增客户数
            $new_client = pdo_getall('longbing_card_collection', ['to_uid' => $staff_id, 'create_time >' => $beginTime], ['id']);
            $new_client = count($new_client);
            //  浏览客户数
            $view_client = "SELECT COUNT(id) as `count` FROM " . tablename('longbing_card_count') . " WHERE uniacid = {$uniacid} && sign = 'praise' && `type` = 2 && create_time > {$beginTime} && to_uid = {$staff_id} GROUP BY user_id";
            $view_client = pdo_fetchall($view_client);
            $view_client = $view_client[0]['count'];
            //  跟进客户数
            $mark_client = pdo_getall('longbing_card_user_mark', ['uniacid' => $uniacid, 'create_time >' => $beginTime, 'staff_id' => $staff_id], ['id']);
            $mark_client = count($mark_client);
            //  沟通客户数
            $chat_list = "SELECT chat_id, user_id, target_id FROM " . tablename('longbing_card_message') . " WHERE uniacid = {$uniacid} && create_time > {$beginTime} GROUP BY chat_id";
            $chat_list = pdo_fetchall($chat_list);
            if (!empty($chat_list)) {
                $tmp = [];
                foreach ($chat_list as $k => $v) {
                    array_push($tmp, $v['user_id'], $v['target_id']);
                }
                $tmp = array_unique($tmp, SORT_NUMERIC);
                $tmp = implode(',', $tmp);
                if (strpos($tmp, ',')) {
                    $tmp = '(' . $tmp . ')';
                    $chat_list = pdo_fetchall("SELECT COUNT(id) as `count`,nickName FROM " . tablename('longbing_card_user') . " WHERE id IN {$tmp} && uniacid = {$uniacid} && is_staff = 0");
                } else {
                    $chat_list = pdo_fetchall("SELECT COUNT(id) as `count`,avatarUrl FROM " . tablename('longbing_card_user') . " WHERE id = {$tmp} && uniacid = {$uniacid} && is_staff = 0");
                }
                $chat_client = $chat_list[0]['count'];
            } else {
                $chat_client = 0;
            }
            //  商城销售金额
            $sale_money = 0;
            //  商城订单数
            $sale_order = 0;
            //  被转发次数
            $share_count = pdo_getall('longbing_card_forward', ['uniacid' => $uniacid, 'type' => 1, 'create_time >' => $beginTime, 'staff_id' => $staff_id], ['id']);
            $share_count = count($share_count);
            //  被保存次数
            $save_count = "SELECT COUNT(id) as `count` FROM " . tablename('longbing_card_count') . " WHERE (uniacid = {$uniacid} && sign = 'copy' && `type` = 2 && create_time > {$beginTime} && to_uid = {$staff_id}) OR (uniacid = {$uniacid} && sign = 'copy' && `type` = 1 && create_time > {$beginTime} && to_uid = {$staff_id}) GROUP BY user_id";
            $save_count = pdo_fetchall($save_count);
            $save_count = $save_count[0]['count'];
            //  被点赞次数
            $thumbs_count = "SELECT COUNT(id) as `count` FROM " . tablename('longbing_card_count') . " WHERE (uniacid = {$uniacid} && sign = 'praise' && `type` = 1 && create_time > {$beginTime} && to_uid = {$staff_id}) OR (uniacid = {$uniacid} && sign = 'praise' && `type` = 3 && create_time > {$beginTime} && to_uid = {$staff_id}) OR (uniacid = {$uniacid} && sign = 'view' && `type` = 4 && create_time > {$beginTime} && to_uid = {$staff_id}) GROUP BY user_id";
            $thumbs_count = pdo_fetchall($thumbs_count);
            $thumbs_count = $thumbs_count[0]['count'];
        }
        $data = [
            'new_client' => $new_client,
            'view_client' => $view_client,
            'mark_client' => $mark_client,
            'chat_client' => $chat_client,
            'sale_money' => $sale_money,
            'sale_order' => $sale_order,
            'share_count' => $share_count,
            'save_count' => $save_count,
            'thumbs_count' => $thumbs_count,
        ];
        return $this->result(0, '请求成功', $data);
    }

    /**
     * boss雷达员工数据分析
     * @access public
     * @param string $user_id 用户id
     * @return json
     */
    pubLic function doPageBossStaffAnalysis()
    {
        $this->cross();
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $uniacid = $_W['uniacid'];
        $staff_id = $_GPC['staff_id'];
        $data = [];

        if (!$staff_id) {
            return $this->result(-1, '请求参数错误', []);
        }

        //  成交率漏斗
        //  总用户数
        $client = pdo_getall('longbing_card_collection', ['to_uid' => $staff_id], ['id']);
        $client = count($client);

        //  跟进客户数
        $mark_client = pdo_getall('longbing_card_user_mark', ['uniacid' => $uniacid, 'staff_id' => $staff_id], ['id']);
        $mark_client = count($mark_client);

        //  成交客户数
        $deal_client = pdo_getall('longbing_card_user_mark', ['uniacid' => $uniacid, 'mark' => 2, 'staff_id' => $staff_id], ['id']);
        $deal_client = count($deal_client);

        $data['dealRate'] = [
            'client' => $client,
            'mark_client' => $mark_client,
            'deal_client' => $deal_client,
        ];

        // ------


        //  客户兴趣占比
        //  对公司感兴趣
        $sql = "SELECT id FROM " . tablename('longbing_card_count') . " WHERE sign = 'view' && type = 6 && uniacid = {$uniacid}";
        $compony = pdo_fetchall($sql);
        $compony = count($compony);

        //  对产品感兴趣
        $sql = "SELECT id FROM " . tablename('longbing_card_count') . " WHERE (sign = 'copy' && type = 2 && uniacid = {$uniacid}) OR (sign = 'copy' && type = 1 && uniacid = {$uniacid})";
        $goods = pdo_fetchall($sql);
        $goods = count($goods);

        //  对员工感兴趣
        $sql = "SELECT id FROM " . tablename('longbing_card_count') . " WHERE (sign = 'copy' && uniacid = {$uniacid}) OR (sign != 'praise' && uniacid = {$uniacid})";
        $staff = pdo_fetchall($sql);
        $staff = count($staff);

        $total = $compony + $goods + $staff;
        $data2 = [
            'compony' => [
                'number' => $compony,
                'rate' => 0,
            ],
            'goods' => [
                'number' => $goods,
                'rate' => 0,
            ],
            'staff' => [
                'number' => $staff,
                'rate' => 0,
            ],
        ];
        if ($total) {
            foreach ($data2 as $k => $v) {
                $data2[$k]['rate'] = sprintf("%.2f", $v['number'] / $total) * 100;
            }
        }

        $data['interest'] = $data2;

        // ------
        //  近15日客户活跃度
        $last = 15;

        $data2 = [];

        for ($i = 0; $i < $last; $i++) {
            $beginTime = mktime(0, 0, 0, date('m'), date('d') - $i, date('Y'));
            $endTime = mktime(0, 0, 0, date('m'), date('d') - $i + 1, date('Y')) - 1;

            $sql = "SELECT id FROM " . tablename('longbing_card_count') . " where uniacid = {$uniacid} && create_time BETWEEN {$beginTime} AND {$endTime}";
            $count = pdo_fetchall($sql);
            $count = count($count);
            $sql = "SELECT id FROM " . tablename('longbing_card_forward') . " where uniacid = {$uniacid} && create_time BETWEEN {$beginTime} AND {$endTime}";
            $forward = pdo_fetchall($sql);
            $forward = count($forward);
            $sql = "SELECT id FROM " . tablename('longbing_card_user_phone') . " where uniacid = {$uniacid} && create_time BETWEEN {$beginTime} AND {$endTime}";
            $phone = pdo_fetchall($sql);
            $phone = count($phone);
            $tmp = [
                'date' => date('Y-m-d', $beginTime),
                'time' => $beginTime,
                'number' => $count + $forward + $phone,
            ];
            array_push($data2, $tmp);
        }
        array_multisort(array_column($data2, 'time'), SORT_ASC, $data2);
        $data['activity'] = $data2;

        //  近15日柱状图
        $data2 = [];
        $beginTime = mktime(0, 0, 0, date('m'), date('d') - $last, date('Y'));
        $thumbs = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_count') . " where (sign = 'view' && `type` = 4 && uniacid = {$uniacid} && create_time > $beginTime) OR (sign = 'praise' && `type` = 1 && uniacid = {$uniacid} && create_time > $beginTime) OR (sign = 'praise' && `type` = 3 && uniacid = {$uniacid} && create_time > $beginTime)");
        $thumbs = count($thumbs);
        $data2[] = [
            'title' => '点赞',
            'number' => $thumbs,
            'rate' => 0,
        ];

        $save_phone = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_count') . " where sign = 'copy' && `type` = 1 && uniacid = {$uniacid} && create_time > $beginTime");
        $save_phone = count($save_phone);
        $data2[] = [
            'title' => '保存手机',
            'number' => $save_phone,
            'rate' => 0,
        ];

        $comment = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_timeline_comment') . " where uniacid = {$uniacid} && create_time > $beginTime");
        $comment = count($comment);
        $data2[] = [
            'title' => '评论',
            'number' => $comment,
            'rate' => 0,
        ];

        $copy_wechat = pdo_fetchall("SELECT id FROM " . tablename('longbing_card_count') . " where sign = 'copy' && `type` = 4 && uniacid = {$uniacid} && create_time > $beginTime");
        $copy_wechat = count($copy_wechat);
        $data2[] = [
            'title' => '复制微信',
            'number' => $copy_wechat,
            'rate' => 0,
        ];

        $total = $thumbs + $save_phone + $comment + $copy_wechat;
        if ($total) {
            foreach ($data2 as $k => $v) {
                $data2[$k]['rate'] = sprintf("%.2f", $v['number'] / $total) * 100;
            }
        }

        $data['activityBarGraph'] = $data2;
        return $this->result(0, '请求成功', $data);
    }

    //    BOSS端相关-----------------------------------------------------------------------------



    public function doPagePay ()
    {
        global $_GPC, $_W;
        $uid = $_GPC['user_id'];
        $order_id = $_GPC['order_id'];
        $uniacid = $_W['uniacid'];

        if (!$uid || !$order_id) {
            return $this->result(-1, '请求参数错误', []);
        }

        $user = pdo_get('longbing_card_user', ['id' => $uid, 'uniacid' => $uniacid]);

        if (!$user)
        {
            return $this->result(-1, '未找到用户信息', []);
        }

        $order = pdo_get('longbing_card_shop_order', ['id' => $order_id, 'uniacid' => $uniacid]);

        if (!$order)
        {
            return $this->result(-1, '未找到订单信息', []);
        }

        if ($order['pay_status'] != 0)
        {
            return $this->result(-1, '该订单未处于待支付状态', []);
        }
        $out_trade_no = 'b-' . $order['id'] . '-' . date('Ymd') . uniqid();
        pdo_update('longbing_card_shop_order', ['out_trade_no' => $out_trade_no], ['id' => $order_id]);
        $_W['openid'] = $user['openid'];
        //获取订单号，保证在业务模块中唯一即可
        //        $orderid = intval($_GPC['orderid']);
        //构造支付参数
        $orderPay = array(
            'tid' => $out_trade_no,
            'user' => $user['openid'], //用户OPENID
            'fee' => floatval($order['total_price']), //金额
            'title' => '小程序支付示例',
        );
        //生成支付参数，返回给小程序端

        $pay_params = $this->pay($orderPay);
        if (is_error($pay_params)) {
            return $this->result(-1, '支付失败，请重试', $pay_params);
        }

        if ($order['type'] == 1)
        {
            $pay_params['collage_id'] = $order['collage_id'];
            return $this->result(0, '', $pay_params);
        }
        return $this->result(0, '', $pay_params);
    }

    public function doPageRefund ()
    {
        global $_GPC, $_W;
        $setting = $_W['account']['setting']['payment'];

        $refund_setting = $setting['wechat_refund'];

        $uid = $_GPC['user_id'];
        $order_id = $_GPC['order_id'];
        $uniacid = $_W['uniacid'];

        if (!$uid || !$order_id) {
            return $this->result(-1, '请求参数错误', []);
        }

        $user = pdo_get('longbing_card_user', ['id' => $uid, 'uniacid' => $uniacid]);

        if (!$user)
        {
            return $this->result(-1, '未找到用户信息', []);
        }

        $order = pdo_get('longbing_card_shop_order', ['id' => $order_id, 'uniacid' => $uniacid]);

        if (!$order)
        {
            return $this->result(-1, '未找到订单信息', []);
        }

        if ($order['pay_status'] != 1)
        {
            return $this->result(-1, '该订单未支付', []);
        }

        if ($order['order_status'] != 1)
        {
            return $this->result(-1, '该订单未取消', []);
        }

//        $out_refund_no = 't-' . $order['id'] . '-' . date('Ymd') . uniqid();

        load()->model('refund');
        $refund_id = refund_create_order($order['out_trade_no'], $_W['current_module']['name']);

        if (is_error($refund_id)) {
            return $refund_id;
        }
        $refundData = reufnd_wechat_build($refund_id);

        $url = "https://api.mch.weixin.qq.com/secapi/pay/refund";

        $cert = authcode($refund_setting['cert'], 'DECODE');
        $key = authcode($refund_setting['key'], 'DECODE');

        file_put_contents(ATTACHMENT_ROOT . $_W['uniacid'] . '_wechat_refund_all.pem', $cert . $key);
        load()->classs('pay');
        $wechat = Pay::create('wechat');

        $response = $wechat->refund($refundData);

        if (is_error($response)) {
            pdo_update('core_refundlog', array('status' => '-1'), array('id' => $refund_id));
            return $this->result(-1, '支付失败，请重试', []);
        }

        if (isset($response['return_code']) && isset($response['return_msg']) && $response['return_code'] == 'SUCCESS' && $response['return_msg'] == 'OK')
        {
            $out_refund_no = $response['out_refund_no'];
            pdo_update('longbing_card_shop_order', array('out_refund_no' => $out_refund_no, 'pay_status' => 2), array('id' => $order_id));
            return $this->result(0, '退款成功', []);
        }
        else
        {
            return $this->result(-1, '退款失败，请重试', []);
        }

        unlink(ATTACHMENT_ROOT . $_W['uniacid'] . '_wechat_refund_all.pem');
    }

    public function payResult($log) {
//        file_put_contents('payResult.txt', json_encode($log) . PHP_EOL, FILE_APPEND);
        if ($log['result'] == 'success' && $log['tid'])
        {
            $out_trade_no = $log['tid'];
            $uniacid = $log['uniacid'];
            $order = pdo_get('longbing_card_shop_order', ['out_trade_no' => $out_trade_no, 'uniacid' => $uniacid]);

            if (!$order || $order['pay_status'] != 0)
            {
                return false;
            }
            $result = pdo_update('longbing_card_shop_order', ['pay_status' => 1], ['id' => $order['id']]);

            if (!$result)
            {
                return false;
            }

            if ($order['type'] == 1)
            {
                $collage_info = pdo_get('longbing_card_shop_collage_list', ['id' => $order['collage_id']]);
                if ($collage_info['left_number'] == 0)
                {
                    pdo_update('longbing_card_shop_collage_list', ['collage_status' => 2], ['id' => $order['collage_id']]);
                    pdo_update('longbing_card_shop_user_collage', ['collage_status' => 2], ['collage_id' => $order['collage_id']]);
                }
                else
                {
                    pdo_update('longbing_card_shop_collage_list', ['collage_status' => 1], ['id' => $order['collage_id']]);
                    pdo_update('longbing_card_shop_user_collage', ['collage_status' => 1], ['collage_id' => $order['collage_id']]);
                }
            }


            $items = pdo_getall('longbing_card_shop_order_item', ['order_id' => $order['id']]);

            foreach ($items as $k => $v)
            {
                if ($v['number'])
                {
                    pdo_update('longbing_card_shop_spe_price', ['stock -=' => $v['number']], ['id' => $v['spe_price_id']]);
                    pdo_update('longbing_card_goods', ['stock -=' => $v['number']], ['id' => $v['goods_id']]);
                    pdo_update('longbing_card_goods', ['sale_count +=' => $v['number']], ['id' => $v['goods_id']]);
                }
                if ($order['type'] == 1)
                {
                    pdo_update('longbing_card_goods', ['collage_count +=' => $v['number']], ['id' => $v['goods_id']]);
                }
            }

            $this->payNoticeClient($order);

        }
        return false;
    }

    protected function payNoticeClient ($order)
    {
        global $_GPC, $_W;
        $uid = $order['user_id'];

        if (!$uid) {
            return $this->result(-1, '请传入参数', []);
        }

        $appid = $_W['account']['key'];
        $appsecret = $_W['account']['secret'];
        $client = pdo_get('longbing_card_user', ['id' => $uid]);

        if (!$client) {
            return $this->result(-1, '未找到用户', []);
        }
        $openid = $client['openid'];
        $name = $client['nickName'];

        $date = date('Y-m-d H:i');

        $config = pdo_get('longbing_card_config', ['uniacid' => $_W['uniacid']], ['mini_template_id', 'notice_switch', 'notice_i', 'min_tmppid']);
        if ($config['notice_switch'] == 1 && false) {

        }
        else
        {
            if (!$config['mini_template_id']) {
                return $this->result(-1, '发送失败, 未配置模板消息', []);
            }
            else
            {
                $form = $this->getFormId($uid);
                if (!$form) {
                    return $this->result(-1, '发送失败', []);
                }

//                $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={$appid}&secret={$appsecret}";
//
//                $data = ihttp_get($url);
//                $data = json_decode($data['content'], true);
//                if (!isset($data['access_token'])) {
//                    return $this->result(-1, '获取失败', []);
//                }
//                $access_token = $data['access_token'];

                $access_token = $this->getAccessToken();
                if (!$access_token)
                {
                    return $this->result(-1, '发送失败', []);
                }

                $url = "https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token={$access_token}";
                $page = "longbing_card/pages/uCenter/order/orderList/orderList?currentTab=2";
                if ($order['type'] === 1)
                {
                    $items = pdo_get('longbing_card_shop_order_item', ['order_id' => $order['id']]);
                    $page = 'longbing_card/pages/shop/releaseCollage/releaseCollage?id=' . $items['goods_id'] . '&status=toShare&to_uid=' . $order['to_uid'] . '&collage_id=';
                }
                $postData = [
                    'touser' => $openid,
                    'template_id' => $config['mini_template_id'],
                    'page' => $page,
                    'form_id' => $form,
                    'data' => [
                        'keyword1' => ['value' => $name],
                        'keyword2' => ['value' => '订单支付成功'],
                        'keyword3' => ['value' => $date],
                    ],
                ];
                $postData = json_encode($postData);

                $response = ihttp_post($url, $postData);
            }
        }
    }

    protected function arr2xml($data)
    {
        $result = '<xml>';
        if (is_object($data)) {
            $_data = ObjectToArray::parse($data);
        } else {
            $_data = &$data;
        }
        foreach ($_data as $key => $value) {
            if (!\is_scalar($value)) {
                if (\is_object($value) && \method_exists($value, 'toString')) {
                    $value = $value->toString();
                    if (null === $value) {
                        continue;
                    }
                } else if (null !== $value) {
                    $value = \json_encode($value);
                } else {
                    continue;
                }
            }
//            $result .= "<{$key}><![CDATA[{$value}]]></{$key}>";
            $result .= "<{$key}>{$value}</{$key}>";
        }
        return $result . '</xml>';
    }




    public function checkOrderTime ()
    {

//        $list = $db->query("SELECT * FROM " . $tablepre . "longbing_card_shop_order WHERE pay_status = 0 && order_status != 1");
        $list = pdo_getall('longbing_card_shop_order', ['pay_status' => 0, 'order_status !=' => 1]);
//        $config2 = $db->query("SELECT uniacid, order_overtime, collage_overtime FROM " . $tablepre . "longbing_card_config");
        $config2 = pdo_getall('longbing_card_config');

        foreach ($config2 as $k => $v)
        {
            $configs[$v['uniacid']] = $v;
        }

        $time = time();
        $order_overtime = 1800;
        $collage_overtime = 172800;
//  检查订单是否超时, 超时自动取消
        foreach ($list as $k => $v)
        {
            $order_overtime = $configs[$v['uniacid']]['order_overtime'];
            if (!$order_overtime)
            {
                $order_overtime = 1800;
            }
            if (!$collage_overtime)
            {
                $collage_overtime = 172800;
            }

            if ($time - $v['create_time'] > $order_overtime)
            {
//                $sql = "UPDATE " . $tablepre . "longbing_card_shop_order SET order_status = 1 WHERE id = " . $v['id'];
//                $db->query($sql);
                pdo_update('longbing_card_shop_order', ['order_status' => 1], ['id' => $v['id']]);
                if ($v['type'] == 1)
                {
                    $collage_id = $v['collage_id'];
//                    $collage = $db->query("SELECT * FROM " . $tablepre . "longbing_card_shop_collage_list WHERE id = {$collage_id}");
                    $collage = pdo_getall('longbing_card_shop_collage_list', ['id' => $collage_id]);
                    foreach ($collage as $k2 => $v2)
                    {
                        if ($v2['user_id'] == $v['user_id'])
                        {
//                            $sql = "UPDATE " . $tablepre . "longbing_card_shop_collage_list SET collage_status = 4 WHERE id = " . $v2['id'];
//                            $db->query($sql);
                            pdo_update('longbing_card_shop_collage_list', ['collage_status' => 4], ['id' => $v2['id']]);
                        }
                        else
                        {
//                            $sql = "UPDATE " . $tablepre . "longbing_card_shop_collage_list SET left_number = {$v2['left_number']} + 1 WHERE id = " . $v2['id'];
//                            $db->query($sql);
                            pdo_update('longbing_card_shop_collage_list', ['left_number +=' => 1], ['id' => $v2['id']]);
                        }
                    }
                }
            }


        }

//        $list_collage = $db->query("SELECT * FROM " . $tablepre . "longbing_card_shop_collage_list WHERE collage_status = 1");
        $list_collage = pdo_getall('longbing_card_shop_collage_list', ['collage_status' => 1]);

        foreach ($list_collage as $k => $v)
        {
            $collage_overtime = $configs[$v['uniacid']]['collage_overtime'];
            if (!$collage_overtime)
            {
                $collage_overtime = 172800;
            }
            if ($time - $v['create_time'] > $collage_overtime)
            {
//                $sql = "UPDATE " . $tablepre . "longbing_card_shop_collage_list SET collage_status = 4 WHERE id = " . $v['id'];
//                $db->query($sql);
                pdo_update('longbing_card_shop_collage_list', ['collage_status' => 4], ['id' => $v['id']]);

//                $orders = $db->query("SELECT * FROM " . $tablepre . "longbing_card_shop_order WHERE `type` = 1 && collage_id = {$v['id']}");
                $orders = pdo_getall('longbing_card_shop_order', ['type' => 1, 'collage_id' => $v['id']]);
                foreach ($orders as $k2 => $v2)
                {
//                    $sql = "UPDATE " . $tablepre . "longbing_card_shop_order SET order_status = 1 WHERE id = " . $v2['id'];
//                    $db->query($sql);
                    pdo_update('longbing_card_shop_order', ['order_status' => 1], ['id' => $v2['id']]);
                }
            }
        }
    }
}
