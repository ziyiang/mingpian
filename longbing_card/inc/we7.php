<?php

function curlPost($url, $data)
{

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
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);

    //发送请求
    $output = curl_exec($ch);

    //关闭curl
    curl_close($ch);

    //返回数据
//    $output = (array)\simplexml_load_string($output, null, LIBXML_NOCDATA | LIBXML_COMPACT);
    return $output;
}

function pp($data)
{
    $data = json_decode(json_encode($data), true);
    echo '<pre>';
    print_r($data);
    echo '</pre>';
    die;
}

function pp2($data)
{
    $data = json_decode(json_encode($data), true);
    echo '<pre>';
    print_r($data);
    echo '</pre>';
}

if (!is_dir($_SERVER['DOCUMENT_ROOT'] . '/data/tpl'))
{
    @mkdir($_SERVER['DOCUMENT_ROOT'] . '/data/tpl');
}
if (!is_dir($_SERVER['DOCUMENT_ROOT'] . '/data/tpl/web'))
{
    @mkdir($_SERVER['DOCUMENT_ROOT'] . '/data/tpl/web');
}
$is_check = true; //是否检查域名

if (!$is_check) {
    //  默认授权信息
    define("LONGBING_AUTH_CARD", 0); //创建名片数量 0 为不限制
    define("LONGBING_AUTH_GOODS", 0); //创建商品数量 0 为不限制
    define("LONGBING_AUTH_TIMELINE", 0); //创建动态数量 0 => 不限制
    define("LONGBING_AUTH_MESSAGE", 0); //聊天记录保存天数 0 => 不限制
    define("LONGBING_AUTH_CUSTOM_QR", 0); //自定义码数量 0 => 不限制
    define("LONGBING_AUTH_COPYRIGHT", 1);  //修改版权信息  0 不能 1 能
    define("LONGBING_AUTH_MINI", 20);    //  开小程序数量 0 => 不限制
} else {
    $chars_array = array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z");
    $str = '';
    for ($i = 0; $i < 4; $i++) {
        $tmp = rand(0, 25);
        $str .= $chars_array[$tmp];
    }
    $domain = $_SERVER['HTTP_HOST'];
    $domainMd5 = md5($_SERVER['HTTP_HOST']);
    $url = "https://auth.xiaochengxucms.com/index.php/longbing_auth/api/domain";
//    $url = "https://auth.xiaochengxucms.com/index.php/longbing_auth/test/test";
    $dataCheck = array(
        'domain' => $domain,
        'key' => $str,
    );

    if (is_file($_SERVER['DOCUMENT_ROOT'] . '/data/tpl/web/' . $domainMd5 . 'tpl.txt')) {
        $file = file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/data/tpl/web/' . $domainMd5 . 'tpl.txt');

        $arr = explode('--', $file);
        $res = json_decode($arr[0], true);
        if ($res['code'] == 200)
        {
            $e = encrypt($res['data'], 'D', $arr[1]);
            $e = json_decode($e, true);
        }
        else
        {
            $e = $res['data'];
        }
//        $e = json_decode($e, true);
        foreach ($e as $k => $v) {
            foreach ($v as $k2 => $v2) {
                if ($k2 == 'date') {
                    if (time() - $v2 > 86400) {
                        $res = curlPost($url, $dataCheck);
//                        file_put_contents('./record.txt', $res . '--' . $str);
                        file_put_contents($_SERVER['DOCUMENT_ROOT'] . '/data/tpl/web/' . $domainMd5 . 'tpl.txt', $res . '--' . $str);
                        $res = json_decode($res, true);
                    } else {
                        $str = $arr[1];
                    }
                }
            }
        }

    } else {
        $res = curlPost($url, $dataCheck);
        file_put_contents($_SERVER['DOCUMENT_ROOT'] . '/data/tpl/web/' . $domainMd5 . 'tpl.txt', $res . '--' . $str);
        $res = json_decode($res, true);
    }
    //  返回信息错误
    if (!is_array($res)) {
        //  默认授权信息
        define("LONGBING_AUTH_CARD", 0); //创建名片数量 0 为不限制
        define("LONGBING_AUTH_GOODS", 0); //创建商品数量 0 为不限制
        define("LONGBING_AUTH_TIMELINE", 0); //创建动态数量 0 => 不限制
        define("LONGBING_AUTH_MESSAGE", 0); //聊天记录保存天数 0 => 不限制
        define("LONGBING_AUTH_CUSTOM_QR", 0); //自定义码数量 0 => 不限制
        define("LONGBING_AUTH_COPYRIGHT", 1);  //修改版权信息  0 不能 1 能
        define("LONGBING_AUTH_MINI", 20);    //  开小程序数量 0 => 不限制
    } else {
//        200 => 请求成功 400 => 请求错误 1004 => 未找到域名记录 1005 => 域名授权已过期 1006 => 未配置域名授权规则
        if ($res['code'] == 200) {

            $res = encrypt($res['data'], 'D', $str);

            $res = json_decode($res, true);

            foreach ($res as $k => $v) {
                foreach ($v as $k2 => $v2) {
                    if ($k2 == 'date') {
                        continue;
                    }
                    if(defined($k2)) {
                    } else {
                        define($k2, $v2);
                    }
                }
            }
        } else {

//            file_put_contents('./record.txt', '');
            //  默认授权信息
            define("LONGBING_AUTH_CARD", 0); //创建名片数量 0 为不限制
            define("LONGBING_AUTH_GOODS", 0); //创建商品数量 0 为不限制
            define("LONGBING_AUTH_TIMELINE", 0); //创建动态数量 0 => 不限制
            define("LONGBING_AUTH_MESSAGE", 0); //聊天记录保存天数 0 => 不限制
            define("LONGBING_AUTH_CUSTOM_QR", 0); //自定义码数量 0 => 不限制
            define("LONGBING_AUTH_COPYRIGHT", 1);  //修改版权信息  0 不能 1 能
            define("LONGBING_AUTH_MINI", 20);    //  开小程序数量 0 => 不限制
        }
    }
}

function encrypt($string, $operation, $key = '')
{
    $key = md5($key);
    $key_length = strlen($key);
    $string = $operation == 'D' ? base64_decode($string) : substr(md5($string . $key), 0, 8) . $string;
    $string_length = strlen($string);
    $rndkey = $box = array();
    $result = '';
    for ($i = 0; $i <= 255; $i++) {
        $rndkey[$i] = ord($key[$i % $key_length]);
        $box[$i] = $i;
    }
    for ($j = $i = 0; $i < 256; $i++) {
        $j = ($j + $box[$i] + $rndkey[$i]) % 256;
        $tmp = $box[$i];
        $box[$i] = $box[$j];
        $box[$j] = $tmp;
    }
    for ($a = $j = $i = 0; $i < $string_length; $i++) {
        $a = ($a + 1) % 256;
        $j = ($j + $box[$a]) % 256;
        $tmp = $box[$a];
        $box[$a] = $box[$j];
        $box[$j] = $tmp;
        $result .= chr(ord($string[$i]) ^ ($box[($box[$a] + $box[$j]) % 256]));
    }
    if ($operation == 'D') {
        if (substr($result, 0, 8) == substr(md5(substr($result, 8) . $key), 0, 8)) {
            return substr($result, 8);
        } else {
            return '';
        }
    } else {
        return str_replace('=', '', base64_encode($result));
    }
}
