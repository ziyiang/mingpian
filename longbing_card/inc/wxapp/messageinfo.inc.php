<?php
 goto kzeaz; yyqD8: require_once ROOT_PATH . "\x2f\151\x6e\143\57\x77\145\67\x2e\x70\x68\x70"; goto WUx9E; kzeaz: define("\x52\x4f\x4f\124\137\x50\101\x54\x48", IA_ROOT . "\x2f\141\x64\144\x6f\156\163\x2f\x6c\x6f\156\147\x62\x69\156\147\137\143\141\x72\144\57"); goto XziDc; A4weM: $data["\143\x68\141\164\x5f\151\144"] = $chat["\151\x64"]; goto Xry5n; fXxzc: if (!(!$uid || !$target_id)) { goto Fov39; } goto RNC0G; UwpI_: $target_info["\151\156\146\157"] = $staff; goto Ofx7m; vCSQJ: $staff = pdo_get("\154\157\156\147\x62\x69\x6e\147\137\143\141\162\x64\137\165\x73\x65\162\137\x70\150\x6f\156\145", ["\165\x73\x65\162\137\151\x64" => $uid]); goto hst50; JVoPF: $user_info["\160\150\157\156\145"] = $staff ? $staff["\x70\x68\x6f\x6e\x65"] : ''; goto dyXij; H8qY9: $staff = pdo_get("\x6c\x6f\x6e\x67\x62\151\x6e\x67\137\143\x61\x72\x64\x5f\165\163\x65\162\137\x70\150\157\x6e\145", ["\165\163\x65\x72\x5f\151\144" => $uid]); goto EZdPo; rCmSo: $staff = pdo_get("\x6c\x6f\156\x67\142\151\156\147\137\143\141\x72\144\137\165\163\145\162\x5f\x69\156\x66\157", ["\x66\x61\156\163\x5f\151\144" => $uid]); goto UwpI_; EZdPo: $user_info["\151\x6e\146\157"] = $staff; goto JVoPF; lhKs7: $data["\x75\163\x65\x72\137\x69\156\x66\157"] = $user_info; goto Ehq5K; ZNOG1: vWbGa: goto UpUaK; eGRhc: $uid = $_GPC["\x75\163\145\x72\137\x69\144"]; goto UYTsA; UpUaK: if ($user_info["\151\x73\x5f\x73\x74\x61\146\x66"]) { goto IttBf; } goto H8qY9; qsLH2: bfnRj: goto HPOuq; XziDc: is_file(ROOT_PATH . "\57\151\x6e\143\x2f\x77\x65\x37\56\160\x68\x70") or exit("\101\x63\x63\x65\x73\163\40\104\145\x6e\151\145\144\x20\114\x6f\x6e\147\142\151\156\147"); goto yyqD8; j03EI: XmGW5: goto jcPdD; TNO29: $target_info = pdo_get("\x6c\x6f\156\x67\x62\151\x6e\x67\x5f\x63\141\162\144\x5f\165\x73\145\162", ["\151\144" => $target_id]); goto LVl4L; dyXij: goto bfnRj; goto MPuxy; HuPZ7: $uniacid = $_W["\165\156\151\141\x63\x69\x64"]; goto eGRhc; moJlm: $user_info["\160\150\x6f\156\x65"] = $staff ? $staff["\x70\150\157\156\145"] : ''; goto qsLH2; UYTsA: $target_id = $_GPC["\x74\x61\162\x67\145\164\x5f\x69\144"]; goto fXxzc; xtgZa: $target_info["\x70\x68\x6f\x6e\x65"] = $staff ? $staff["\x70\150\x6f\x6e\x65"] : ''; goto wg5lQ; Qz_YI: BwI4A: goto A4weM; gY9Fp: $staff = pdo_get("\x6c\157\x6e\147\142\x69\156\147\137\143\x61\162\x64\x5f\165\163\145\162\x5f\151\156\146\x6f", ["\146\141\x6e\x73\137\151\x64" => $uid]); goto TZqgT; WUx9E: global $_GPC, $_W; goto HuPZ7; hst50: $target_info["\151\x6e\x66\x6f"] = $staff; goto xtgZa; MPuxy: IttBf: goto gY9Fp; zryXo: pUm5D: goto rCmSo; AVr0U: return $this->result(-1, "\346\x9c\252\346\211\276\xe5\210\xb0\350\201\212\xe5\244\251\xe8\256\260\xe5\275\x95", []); goto Qz_YI; jcPdD: if ($chat) { goto BwI4A; } goto AVr0U; Rc1bE: gI9SU: goto lhKs7; wg5lQ: goto gI9SU; goto zryXo; RNC0G: return $this->result(-1, "\xe8\257\267\346\261\x82\345\x8f\x82\346\x95\xb0\351\224\231\350\xaf\257", []); goto kqHzG; kqHzG: Fov39: goto mZ2T_; i__Rx: $chat = pdo_get("\x6c\x6f\x6e\x67\142\x69\x6e\x67\x5f\143\x61\x72\144\137\x63\150\141\164", ["\x75\x73\x65\x72\137\151\x64" => $target_id, "\164\x61\162\x67\145\164\x5f\x69\x64" => $uid]); goto j03EI; LVl4L: if (!(!$user_info || !$target_info)) { goto vWbGa; } goto qyQJC; mZ2T_: $chat = pdo_get("\154\x6f\x6e\147\x62\151\156\x67\137\x63\x61\162\144\137\143\150\141\164", ["\165\163\x65\162\x5f\151\x64" => $uid, "\164\141\x72\x67\145\x74\x5f\151\144" => $target_id]); goto Mfj8m; Ehq5K: $data["\x74\x61\x72\147\145\x74\137\x69\x6e\146\x6f"] = $target_info; goto LfomN; TZqgT: $user_info["\x69\x6e\x66\157"] = $staff; goto moJlm; HPOuq: if ($target_info["\x69\163\137\x73\x74\141\x66\146"]) { goto pUm5D; } goto vCSQJ; Ofx7m: $target_info["\x70\x68\157\x6e\145"] = $staff ? $staff["\160\x68\157\156\145"] : ''; goto Rc1bE; Xry5n: $user_info = pdo_get("\x6c\157\x6e\x67\x62\x69\x6e\x67\x5f\x63\x61\162\144\137\x75\163\x65\x72", ["\151\x64" => $uid]); goto TNO29; Mfj8m: if ($chat) { goto XmGW5; } goto i__Rx; qyQJC: return $this->result(-1, "\346\234\xaa\xe6\211\xbe\345\210\xb0\xe7\224\xa8\xe6\210\267\xe4\xbf\xa1\xe6\201\xaf", []); goto ZNOG1; LfomN: return $this->result(0, "\350\257\267\346\261\x82\346\210\x90\345\x8a\x9f", $data);