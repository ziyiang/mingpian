<?php
 goto N15LF; MJoyA: if (isset($_GPC["\151\x64"])) { goto YtD5T; } goto FCpT3; cluX1: message("\xe5\267\xb2\347\273\x8f\345\xad\230\345\x9c\xa8\350\257\245\xe6\x8b\274\xe5\x9b\242\350\xa7\204\345\210\x99\xe4\xba\x86", '', "\145\162\x72\157\x72"); goto mVPAT; e8fxr: $uniacid = $_W["\165\x6e\x69\141\143\151\x64"]; goto akor2; JiHWS: yCPlh: goto K1ju8; cGG5Y: $result = pdo_insert("\x6c\157\x6e\x67\x62\x69\x6e\147\137\x63\x61\162\x64\137\x73\x68\x6f\x70\x5f\143\x6f\x6c\154\141\147\145", $data); goto RyfCf; JW4Ht: rSFVA: goto ij9j1; f4jP0: $where = ["\165\x6e\x69\x61\x63\x69\144" => $_W["\165\156\x69\x61\x63\151\x64"], "\x73\x74\141\164\165\x73" => 1, "\147\157\x6f\144\x73\137\x69\144" => $goodsId, "\x73\160\x65\x5f\160\x72\151\143\145\x5f\x69\x64" => $collageSpe, "\x6e\x75\x6d\142\x65\x72" => $collageNumber, "\160\x65\x6f\x70\154\x65" => $collagePeople, "\x70\162\x69\x63\145" => $collagePrice]; goto QU9g4; zakDd: $collagePeople = $_GPC["\x63\157\154\x6c\141\147\x65\x50\145\157\x70\154\x65"]; goto wOpDW; WNPpp: $result = pdo_update("\154\157\x6e\x67\x62\151\x6e\x67\x5f\x63\141\162\144\137\163\x68\157\160\137\x63\157\x6c\154\141\147\x65", ["\163\x74\141\164\x75\x73" => 1, "\x75\x70\x64\x61\x74\x65\x5f\164\151\155\x65" => time(), "\x6e\x75\x6d\x62\145\x72" => $collageNumber, "\x70\162\x69\143\145" => $collagePrice, "\x70\145\x6f\160\154\x65" => $collagePeople], ["\x69\x64" => $itemId]); goto iaTZj; K1nta: foreach ($collage as $k => $v) { goto xdLBa; xdLBa: foreach ($data as $k2 => $v2) { goto Vip6P; Vip6P: if (!($v["\x73\160\x65\137\x70\x72\x69\x63\145\137\x69\144"] == $v2["\151\x64"])) { goto sVVll; } goto EG3wk; n1mDa: sVVll: goto zCdeN; zCdeN: LJOJd: goto C_WNB; EG3wk: $collage[$k]["\x69\x6e\146\157"] = $v2; goto n1mDa; C_WNB: } goto o1BLe; NmuCF: p6qno: goto pXmHm; o1BLe: GQLWh: goto NmuCF; pXmHm: } goto JW4Ht; p452U: $time = time(); goto frOT1; vFL5M: $check = pdo_get("\x6c\157\156\x67\142\151\x6e\147\137\143\x61\x72\144\x5f\x73\x68\157\x70\137\x63\157\154\154\141\x67\145", ["\x73\164\x61\x74\x75\x73" => 1, "\147\x6f\x6f\x64\163\137\x69\x64" => $_GPC["\147\x6f\157\x64\x73\111\144"]]); goto CwwBa; i2vDO: if (!($_GPC["\141\x63\164\151\157\156"] == "\141\144\x64\x43\157\x6c\154\141\147\145")) { goto sCzYQ; } goto hNYx_; HaX0j: $goods = pdo_get("\154\157\x6e\147\142\151\x6e\147\x5f\143\141\162\x64\x5f\x67\x6f\157\144\163", ["\151\144" => $id]); goto EIy8F; gXGjE: hgXh3: goto IAF1g; nil7a: message("\345\x88\xa0\xe9\x99\244\xe5\xa4\xb1\350\xb4\245", '', "\145\162\x72\157\162"); goto z9wQS; R2p9a: $collageNumber = $_GPC["\x63\157\154\154\141\x67\145\116\165\x6d\x62\145\162"]; goto uYJpy; lhJww: GYju3: goto UC0v6; UEi4E: if (!($_GPC["\x61\x63\164\151\x6f\156"] == "\145\x64\x69\x74\103\x6f\154\154\141\x67\145")) { goto Ll2TT; } goto R2p9a; frOT1: $data = array("\x75\156\151\x61\x63\x69\144" => $_W["\x75\x6e\151\141\x63\x69\x64"], "\x73\164\x61\x74\165\x73" => 1, "\147\x6f\157\144\163\137\151\x64" => $goodsId, "\x73\x70\145\137\160\x72\x69\143\145\x5f\x69\x64" => $collageSpe, "\x6e\165\155\x62\145\162" => $collageNumber, "\160\x72\x69\143\x65" => $collagePrice, "\160\x65\157\160\x6c\x65" => $collagePeople, "\x63\162\x65\x61\164\x65\137\164\x69\x6d\x65" => $time, "\165\x70\144\x61\x74\145\x5f\164\151\x6d\x65" => $time); goto cGG5Y; EIy8F: if (!(empty($goods) || !$goods)) { goto FThuf; } goto S0ORS; CwwBa: if (!empty($check)) { goto qkP6l; } goto A6PlL; pijlN: if (!$result) { goto n5faJ; } goto uqsf5; S0ORS: message("\xe6\x9c\xaa\346\211\xbe\xe5\x88\260\xe5\225\206\xe5\x93\201", $this->createWebUrl("\147\157\x6f\144\x73"), "\145\x72\162\157\162"); goto kGFj_; UC0v6: $collage = pdo_getall("\154\x6f\156\x67\142\x69\x6e\147\137\x63\x61\x72\144\x5f\x73\150\157\x70\137\x63\x6f\x6c\x6c\141\x67\x65", ["\x67\x6f\157\x64\163\x5f\151\x64" => $id, "\163\x74\141\164\165\163" => 1]); goto K1nta; Mmb1z: require_once ROOT_PATH . "\x2f\x69\156\143\x2f\167\x65\x37\x2e\160\x68\x70"; goto e8fxr; pbdV5: YF4IL: goto f4jP0; FCpT3: return false; goto e4ezA; K1ju8: message("\xe6\267\xbb\xe5\x8a\xa0\xe5\xa4\261\350\xb4\xa5", '', "\x65\162\162\157\162"); goto OPKW0; DgVHz: foreach ($list as $k => $v) { goto Uuuq_; U2sXY: gsozV: goto tfgbD; OqWUU: $tmp = ["\x69\x64" => $v["\x69\x64"], "\164\151\x74\154\x65" => $titles . "\72\x20\357\277\xa5" . $v["\160\x72\x69\143\145"]]; goto CLICr; WwFLB: foreach ($speList as $k2 => $v2) { $titles .= "\55" . $v2["\x74\x69\164\x6c\145"]; NtM_b: } goto Z6cBm; hlYT5: $titles = trim($titles, "\55"); goto OqWUU; qSP6l: $arr = explode("\55", $spe_id_1); goto BFgva; Z6cBm: ynbkT: goto hlYT5; ywZFy: $sql = "\123\x45\114\105\x43\x54\40\x2a\40\106\x52\117\115\40" . tablename("\x6c\x6f\x6e\x67\x62\x69\x6e\x67\x5f\x63\141\x72\x64\x5f\x73\150\x6f\160\x5f\163\160\x65") . "\x20\127\110\105\x52\x45\40\151\x64\x20\x49\116\x20{$str}"; goto i6fn8; S3tQ5: $speList = pdo_fetchall($sql); goto Drno2; BFgva: $str = implode("\x2c", $arr); goto nirkh; Uuuq_: $spe_id_1 = $v["\x73\160\145\137\151\144\x5f\x31"]; goto qSP6l; CLICr: array_push($data, $tmp); goto U2sXY; Drno2: $titles = ''; goto WwFLB; Rl1oY: goto zkGD9; goto krUWf; q5Ukq: $sql = "\123\105\x4c\x45\x43\x54\x20\52\40\106\x52\x4f\x4d\x20" . tablename("\154\157\156\x67\142\x69\156\x67\137\143\x61\162\144\x5f\163\150\157\160\x5f\163\x70\145") . "\x20\x57\110\105\x52\105\40\151\144\x20\75\40{$str}"; goto Rl1oY; nirkh: if (strpos($str, "\x2c")) { goto uv_Ch; } goto q5Ukq; krUWf: uv_Ch: goto SlRPV; SlRPV: $str = "\50" . $str . "\x29"; goto ywZFy; i6fn8: zkGD9: goto S3tQ5; tfgbD: } goto lhJww; OPKW0: sCzYQ: goto uM32G; uYJpy: $collagePrice = $_GPC["\x63\157\x6c\154\x61\x67\145\x50\162\x69\x63\145"]; goto zakDd; eC5r1: $collageNumber = $_GPC["\143\157\154\154\141\147\x65\116\x75\155\x62\145\x72"]; goto wOyGo; RaYtb: message("\346\xb7\xbb\xe5\x8a\240\xe6\x88\220\345\x8a\x9f", '', "\x73\165\143\143\145\x73\163"); goto JiHWS; c1Yar: if (!$collage) { goto SYXNG; } goto cluX1; ij9j1: load()->func("\x74\160\154"); goto b0j7k; rIBr1: $collagePeople = $_GPC["\x63\157\x6c\154\141\147\145\120\145\x6f\160\154\x65"]; goto p5mVC; b6zvv: message("\347\274\x96\xe8\xbe\x91\346\210\x90\xe5\x8a\237", '', "\x73\x75\143\143\145\x73\x73"); goto gXGjE; I4HxS: n5faJ: goto nil7a; Dipfk: $id = $_GPC["\151\144"]; goto HaX0j; uqsf5: message("\345\210\240\351\231\xa4\xe6\210\220\345\x8a\237", '', "\163\x75\x63\143\145\163\163"); goto I4HxS; N15LF: global $_GPC, $_W; goto DL_7o; aygFB: qkP6l: goto pijlN; akor2: $module_name = $_W["\143\165\162\x72\x65\156\x74\137\155\x6f\x64\165\154\x65"]["\156\141\x6d\x65"]; goto i2vDO; RyfCf: pdo_update("\154\157\x6e\147\x62\x69\156\147\137\x63\141\x72\x64\137\x67\157\157\144\x73", ["\151\163\x5f\x63\157\x6c\x6c\141\147\x65" => 1, "\165\x70\144\x61\x74\145\x5f\164\151\x6d\145" => time()], ["\x69\x64" => $goodsId]); goto jrq1U; c88JV: message("\346\xb7\xbb\345\212\xa0\xe5\xa4\261\xe8\xb4\245", '', "\145\x72\x72\157\x72"); goto pbdV5; e4ezA: YtD5T: goto Dipfk; QU9g4: $collage = pdo_getall("\x6c\x6f\156\x67\142\x69\156\147\x5f\143\x61\x72\144\137\163\x68\157\160\137\x63\x6f\154\154\x61\x67\x65", $where); goto c1Yar; jrq1U: if (!$result) { goto yCPlh; } goto RaYtb; z9wQS: WIaN1: goto UEi4E; p5mVC: $goodsId = $_GPC["\147\x6f\157\144\x73\111\x64"]; goto YkHXi; A6PlL: pdo_update("\154\x6f\x6e\147\x62\151\x6e\x67\x5f\143\x61\x72\144\x5f\x67\x6f\x6f\144\x73", ["\x69\x73\137\x63\x6f\154\154\x61\x67\145" => 0, "\165\x70\x64\141\164\x65\x5f\164\x69\x6d\x65" => time()], ["\151\144" => $_GPC["\x67\x6f\x6f\144\x73\111\144"]]); goto aygFB; DL_7o: define("\122\x4f\117\124\137\120\101\124\110", IA_ROOT . "\57\141\x64\144\x6f\x6e\163\57\154\x6f\x6e\x67\142\x69\x6e\147\137\x63\x61\x72\x64\57"); goto HMk4P; L8qmn: $list = pdo_getall("\154\x6f\x6e\147\x62\x69\156\x67\x5f\x63\141\x72\144\x5f\x73\150\x6f\x70\x5f\163\x70\145\x5f\x70\x72\x69\143\145", ["\x67\x6f\157\144\x73\137\151\x64" => $id, "\x75\x6e\x69\141\x63\151\x64" => $_W["\x75\x6e\x69\141\143\x69\x64"], "\163\164\141\x74\x75\x73" => 1]); goto DgVHz; IAF1g: message("\347\274\x96\xe8\276\221\xe5\xa4\261\350\264\245", '', "\x65\x72\x72\157\162"); goto kGZwC; wOyGo: $collagePrice = $_GPC["\143\x6f\x6c\154\141\147\145\x50\x72\x69\143\x65"]; goto rIBr1; wOpDW: $itemId = $_GPC["\x69\x74\x65\155\x49\144"]; goto WNPpp; uM32G: if (!($_GPC["\x61\143\164\151\157\x6e"] == "\144\x65\154\x65\164\x65\103\x6f\154\x6c\x61\x67\145")) { goto WIaN1; } goto viLTd; kGFj_: FThuf: goto TbJbJ; kGZwC: Ll2TT: goto MJoyA; TbJbJ: $goods["\143\157\x76\145\x72"] = tomedia($goods["\x63\157\x76\145\x72"]); goto uDws5; HMk4P: is_file(ROOT_PATH . "\57\x69\x6e\143\x2f\167\145\x37\56\160\x68\x70") or exit("\101\143\x63\x65\x73\x73\40\104\x65\x6e\x69\x65\x64\40\x4c\x6f\156\147\x62\x69\156\147"); goto Mmb1z; viLTd: $result = pdo_update("\154\157\156\x67\x62\151\156\x67\x5f\143\141\x72\x64\x5f\163\x68\x6f\x70\137\143\x6f\x6c\154\141\x67\x65", ["\x73\x74\x61\164\x75\x73" => -1, "\165\160\144\x61\x74\x65\137\x74\x69\155\145" => time()], ["\x69\x64" => $_GPC["\151\144"]]); goto vFL5M; mVPAT: SYXNG: goto p452U; uDws5: $data = []; goto L8qmn; hNYx_: $collageSpe = $_GPC["\143\157\x6c\x6c\x61\x67\145\123\160\x65"]; goto eC5r1; YkHXi: if (!(!$goodsId || !$collageNumber || !$collagePrice || !$collagePeople)) { goto YF4IL; } goto c88JV; iaTZj: if (!$result) { goto hgXh3; } goto b6zvv; b0j7k: include $this->template("\155\x61\x6e\x61\147\x65\57\x63\x6f\x6c\154\141\x67\x65");