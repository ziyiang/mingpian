<?php
 goto ymwY2; ymwY2: global $_GPC, $_W; goto J26uL; Grbio: $info = []; goto V0CP2; FrW78: $data["\143\162\145\141\164\145\x5f\x74\x69\155\x65"] = time(); goto RZ4_C; dVql_: pdo_insert("\151\x6d\163\137\154\x6f\x6e\x67\x62\x69\156\x67\137\x63\x61\162\x64\x5f\163\x68\157\x70\x5f\x73\160\x65", ["\147\157\157\144\x73\137\x69\144" => $goodsId, "\x75\x6e\x69\141\x63\x69\x64" => $_W["\x75\x6e\x69\x61\143\x69\144"], "\x74\x69\x74\154\x65" => "\351\273\x98\350\xae\244", "\143\x72\x65\141\164\145\x5f\x74\x69\155\145" => time(), "\165\160\x64\x61\x74\145\137\164\151\x6d\145" => time(), "\160\x69\144" => $pid]); goto mIJD9; Ff3_O: message("\346\xb7\xbb\345\x8a\240\345\225\206\xe5\x93\201\xe8\276\276\345\x88\260\344\270\212\xe9\x99\x90\54\40\xe5\246\x82\xe9\234\200\345\xa2\236\xe5\x8a\xa0\xe8\257\xb7\xe8\264\255\xe4\271\xb0\351\253\230\xe7\xba\xa7\347\x89\210\xe6\234\xac", '', "\x65\x72\162\x6f\162"); goto YIkWW; y_GWG: is_file(ROOT_PATH . "\x2f\x69\x6e\143\x2f\x77\x65\x37\x2e\160\150\160") or exit("\x41\143\143\145\163\x73\x20\104\145\156\x69\x65\144\x20\x4c\x6f\x6e\x67\x62\151\156\x67"); goto hS3WE; zLsC7: cgV3W: goto Gz19e; M2Ggk: $data["\165\x70\x64\141\164\145\137\x74\151\155\145"] = time(); goto r3MMs; KGB8A: qrpyD: goto D3w4F; wj2hU: $goodsId = pdo_insertid(); goto xJ9Kz; E7Kw4: $count = count($list); goto CDWYK; hS3WE: require_once ROOT_PATH . "\57\151\156\x63\57\167\x65\x37\56\x70\x68\x70"; goto fZBwC; LtZJu: $result = pdo_update("\x6c\x6f\x6e\x67\x62\x69\156\147\x5f\x63\x61\162\144\x5f\x67\157\x6f\x64\x73", $data, ["\151\144" => $id]); goto UVnf6; Hq_s_: ZXQ6n: goto LtZJu; JvGiH: $pid = pdo_insertid(); goto dVql_; ZhI6O: if (!($result && !$id)) { goto qrpyD; } goto wj2hU; gkOAs: $list = pdo_getall("\x6c\x6f\156\x67\142\151\156\147\137\143\141\162\144\x5f\147\x6f\x6f\x64\x73", ["\x75\156\151\141\x63\x69\144" => $_W["\x75\x6e\x69\141\x63\x69\x64"], "\163\x74\141\164\x75\163\40\76" => -1]); goto E7Kw4; pYq59: $data["\151\x6d\x61\147\145\163"] = trim($data["\x69\x6d\141\x67\145\x73"], "\x2c"); goto M2Ggk; llVgy: $typeList = pdo_getall("\x6c\157\x6e\x67\x62\x69\x6e\x67\x5f\143\141\x72\144\137\x73\x68\x6f\x70\x5f\164\171\x70\x65", ["\163\x74\x61\x74\165\163" => 1, "\x75\156\151\x61\143\x69\144" => $_W["\x75\x6e\151\x61\x63\x69\x64"]]); goto jf3KI; NSeis: rqVFh: goto XqjQ1; cIeQ5: $module_name = $_W["\x63\165\162\x72\x65\156\x74\x5f\155\157\x64\x75\x6c\x65"]["\156\141\x6d\x65"]; goto Xdq17; XqjQ1: $where = ["\x75\156\151\141\143\151\x64" => $_W["\x75\x6e\151\x61\x63\x69\144"]]; goto Yg9lT; xJ9Kz: pdo_insert("\x69\x6d\163\137\x6c\157\156\147\x62\x69\x6e\147\137\x63\x61\x72\x64\x5f\163\150\x6f\160\x5f\163\x70\145", ["\x67\157\157\x64\x73\x5f\151\x64" => $goodsId, "\165\156\151\x61\143\151\144" => $_W["\x75\x6e\x69\141\143\151\144"], "\164\x69\x74\x6c\x65" => "\351\xbb\x98\350\256\xa4", "\143\x72\145\141\164\145\137\164\x69\x6d\x65" => time(), "\x75\x70\x64\141\164\145\137\164\151\x6d\x65" => time()]); goto JvGiH; Ga6vL: $result = false; goto Gm89_; V0CP2: if (!isset($_GPC["\151\x64"])) { goto L6Ibf; } goto dVIwb; rv6_M: $result = pdo_insert("\x6c\157\x6e\x67\142\x69\156\147\137\x63\141\x72\x64\137\x67\x6f\157\144\x73", $data); goto j_jUm; lJTgs: ydx9x: goto pYq59; QuB1l: KkDCD: goto XddLj; Xdq17: if (!($_GPC["\141\x63\x74\x69\x6f\x6e"] == "\x65\x64\151\x74")) { goto rqVFh; } goto AcGwv; XUv14: oCrAS: goto Y4ggS; MLvRw: if (!LONGBING_AUTH_GOODS) { goto rxUYJ; } goto gkOAs; pRcWI: qIPBw: goto irriK; AcGwv: foreach ($_GPC["\x66\157\162\155\x44\141\164\141"] as $k => $v) { goto Xqw5s; E56fc: qwC3B: goto O1cVH; npn99: $data["\x69\155\141\x67\145\163"][] = $v; goto hFqY6; hFqY6: Nllbs: goto E56fc; TX4cM: gpaBv: goto npn99; olFK5: $data[$k] = $v; goto LB1dU; Xqw5s: if (strpos($k, "\x6d\x61\147\145\163")) { goto gpaBv; } goto olFK5; LB1dU: goto Nllbs; goto TX4cM; O1cVH: } goto pRcWI; fZBwC: $uniacid = $_W["\x75\x6e\x69\x61\143\151\144"]; goto cIeQ5; BtOia: $info = pdo_get("\154\157\156\x67\x62\151\x6e\147\137\143\x61\x72\144\137\x67\157\157\x64\163", $where); goto jsvIu; Hb5VU: $id = $_GPC["\151\144"]; goto BtOia; YIkWW: gy_8f: goto AY0zH; CDWYK: if (!($count >= LONGBING_AUTH_GOODS)) { goto gy_8f; } goto Ff3_O; Yg9lT: $id = 0; goto Grbio; oKkNQ: $id = $_GPC["\151\x64"]; goto Ga6vL; UVnf6: YzNJV: goto ZhI6O; RZ4_C: $data["\x75\156\151\x61\x63\151\144"] = $_W["\165\156\x69\141\x63\x69\144"]; goto rv6_M; Ug5Gp: $data["\x69\x6d\141\147\145\163"] = ''; goto hAGjK; r3MMs: $type = pdo_get("\x6c\x6f\x6e\x67\x62\151\156\x67\x5f\x63\x61\x72\x64\x5f\x73\x68\157\x70\x5f\x74\x79\x70\x65", ["\x69\144" => $data["\x74\x79\160\145"]]); goto x1PCh; jsvIu: if (!$info["\151\x6d\x61\x67\x65\163"]) { goto DzADH; } goto nJ4t_; mIJD9: $spe_id = pdo_insertid(); goto kK7KF; OmuOn: EEF42: goto Asz6s; J26uL: define("\122\x4f\117\x54\x5f\x50\101\124\x48", IA_ROOT . "\57\x61\x64\144\157\x6e\163\x2f\154\x6f\156\147\x62\x69\x6e\147\137\143\141\162\x64\57"); goto y_GWG; Asz6s: $data["\151\155\141\147\x65\163"] = implode("\54", $data["\x69\x6d\x61\147\x65\x73"]); goto lJTgs; D3w4F: if (!$result) { goto KkDCD; } goto mKj9x; V70wP: L6Ibf: goto llVgy; XddLj: message("\346\223\x8d\xe4\275\234\345\244\261\350\xb4\245", '', "\x65\x72\162\x6f\x72"); goto NSeis; AY0zH: rxUYJ: goto FrW78; j_jUm: goto YzNJV; goto Hq_s_; jf3KI: foreach ($typeList as $k => $v) { goto EfYGW; EfYGW: if (!($v["\x70\151\144"] != 0)) { goto DB2BG; } goto hbEA2; SNHHE: IjdTo: goto UXsq9; hbEA2: foreach ($typeList as $k2 => $v2) { goto Qqeid; rck8V: zkQ6Z: goto geP1f; Qqeid: if (!($v2["\151\x64"] == $v["\x70\151\x64"])) { goto zkQ6Z; } goto T1Kfb; geP1f: bdnHC: goto OvYwv; T1Kfb: $typeList[$k]["\x74\x69\164\x6c\x65"] = $v["\x74\151\x74\154\x65"] . "\x20\55\x2d\x20" . $v2["\x74\151\x74\154\145"]; goto rck8V; OvYwv: } goto QX2Cg; CZpqV: DB2BG: goto SNHHE; QX2Cg: QGnqC: goto CZpqV; UXsq9: } goto XUv14; nJ4t_: $info["\151\x6d\x61\147\x65\163"] = explode("\54", $info["\151\x6d\141\147\x65\163"]); goto oo_cp; dVIwb: $where["\x69\x64"] = $_GPC["\151\144"]; goto Hb5VU; kK7KF: pdo_insert("\x6c\x6f\x6e\147\x62\x69\x6e\147\137\143\x61\x72\x64\137\163\x68\x6f\160\x5f\x73\160\x65\137\x70\162\x69\143\x65", ["\147\x6f\157\x64\x73\x5f\x69\144" => $goodsId, "\165\x6e\151\x61\143\x69\144" => $_W["\x75\x6e\151\141\143\151\144"], "\163\160\x65\x5f\151\144\x5f\x31" => $spe_id, "\143\x72\145\x61\x74\145\x5f\x74\151\x6d\145" => time(), "\165\160\144\x61\x74\145\137\164\151\155\145" => time(), "\x70\162\151\x63\145" => $data["\160\x72\x69\143\x65"], "\163\164\x6f\143\153" => $data["\x73\164\x6f\143\x6b"]]); goto KGB8A; x1PCh: $data["\164\171\160\x65\x5f\160"] = $type["\x70\x69\x64"] ? $type["\x70\x69\x64"] : $type["\151\144"]; goto oKkNQ; Gm89_: if ($id) { goto ZXQ6n; } goto MLvRw; Y4ggS: foreach ($typeList as $k => $v) { goto UX3ta; XB0JJ: TRq1x: goto N7OjS; UX3ta: if (!($v["\160\x69\144"] == 0)) { goto AxTUq; } goto BEyUi; ru3rT: AxTUq: goto XB0JJ; BEyUi: $typeList[$k]["\164\151\164\x6c\x65"] = $v["\164\151\x74\x6c\145"] . "\x20\x2d\55\x20" . "\xe9\xa1\266\347\xba\247\xe5\210\x86\xe7\261\xbb"; goto ru3rT; N7OjS: } goto zLsC7; mKj9x: message("\346\223\x8d\344\275\x9c\xe6\210\x90\345\x8a\x9f", $this->createWebUrl("\155\x61\x6e\141\147\145\x2f\147\157\x6f\x64\163"), "\x73\165\143\143\x65\x73\x73"); goto QuB1l; hAGjK: goto ydx9x; goto OmuOn; Gz19e: load()->func("\164\160\x6c"); goto LNbW2; irriK: if (isset($data["\x69\155\141\x67\145\163"])) { goto EEF42; } goto Ug5Gp; oo_cp: DzADH: goto V70wP; LNbW2: include $this->template("\155\x61\x6e\x61\x67\145\57\147\157\157\x64\x73\105\144\x69\164");