<?php
 goto fgcsy; fgcsy: define("\x52\x4f\117\124\137\x50\101\124\x48", IA_ROOT . "\x2f\141\x64\144\157\x6e\x73\x2f\x6c\x6f\x6e\x67\142\151\x6e\x67\x5f\143\141\x72\x64\x2f"); goto gVYeH; FnmaJ: ZOztY: goto clwlE; hNL2a: HonOr: goto X06zD; uKgyQ: $id = $_GPC["\151\x64"]; goto wsJHg; x_3GY: global $_GPC, $_W; goto hsvJw; obmM6: if ($result) { goto cn0lD; } goto G978o; C7n36: return $this->result(-1, "\xe6\234\xaa\xe6\211\xbe\345\x88\xb0\xe8\256\242\xe5\x8d\225\344\277\241\xe6\x81\xaf", []); goto FnmaJ; wiJWy: if ($info) { goto ZOztY; } goto C7n36; iK4qx: cn0lD: goto DBMic; hsvJw: $uniacid = $_W["\x75\x6e\x69\x61\143\151\x64"]; goto NF20T; NF20T: $uid = $_GPC["\x75\163\145\162\137\x69\x64"]; goto uKgyQ; G978o: return $this->result(-1, "\345\210\240\xe9\x99\244\350\xae\242\xe5\215\x95\345\xa4\xb1\350\264\xa5", []); goto iK4qx; X06zD: $where = array("\x75\x6e\151\141\143\x69\144" => $uniacid, "\x75\x73\x65\162\x5f\151\144" => $uid, "\151\144" => $id); goto esG0G; A2j51: return $this->result(-1, "\350\xaf\xb7\xe6\261\202\345\x8f\x82\xe6\x95\xb0\351\224\x99\350\257\257", []); goto hNL2a; clwlE: $result = pdo_update("\154\x6f\x6e\147\x62\x69\156\x67\137\x63\141\162\144\x5f\x73\150\x6f\x70\137\x6f\162\x64\145\x72", ["\x73\164\141\164\x75\163" => -1], $where); goto obmM6; gVYeH: is_file(ROOT_PATH . "\x2f\151\156\x63\57\x77\145\x37\56\x70\x68\x70") or exit("\x41\x63\x63\x65\x73\x73\40\104\x65\156\x69\x65\x64\x20\x4c\x6f\x6e\147\142\151\156\x67"); goto yOcuM; esG0G: $info = pdo_get("\x6c\x6f\x6e\147\142\x69\156\147\x5f\x63\x61\x72\x64\137\163\150\157\160\x5f\157\x72\144\145\x72", $where); goto wiJWy; yOcuM: require_once ROOT_PATH . "\57\x69\156\x63\57\167\145\x37\56\x70\x68\160"; goto x_3GY; wsJHg: if (!(!$uid || !$id)) { goto HonOr; } goto A2j51; DBMic: return $this->result(0, "\xe5\x88\240\xe9\231\xa4\xe6\x88\220\xe5\212\237", []);