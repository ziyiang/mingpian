<?php
 goto mV6T0; bUL9x: message("\xe8\256\276\347\xbd\256\xe5\xa4\261\350\264\245", '', "\145\x72\x72\157\x72"); goto nGcCn; yo0i0: if (!$result) { goto E1nN6; } goto EVf55; S7_Jf: E1nN6: goto hirsH; KO3Aj: $result = pdo_insert("\154\157\156\147\x62\x69\156\x67\137\143\x61\x72\x64\137\x75\163\x65\x72\137\151\x6e\x66\x6f", ["\146\x61\156\x73\x5f\x69\144" => $_GPC["\151\144"], "\143\162\145\x61\x74\145\x5f\164\x69\x6d\145" => $time, "\x75\x70\144\x61\164\x65\137\x74\151\x6d\x65" => $time, "\151\163\137\163\x74\141\146\x66" => 1, "\x73\x74\x61\164\165\x73" => 1, "\165\x6e\151\x61\143\151\144" => $_W["\165\x6e\x69\141\143\x69\x64"], "\x69\x73\137\144\x65\146\x61\x75\x6c\164" => 1]); goto ZNTAR; hirsH: message("\350\256\276\xe7\xbd\256\xe5\244\261\xe8\xb4\245", '', "\145\162\x72\157\x72"); goto mv0wb; AEjSM: $curr = $_GPC["\x70\141\147\145"]; goto j6_Ii; AkH7e: MC_Xq: goto yM7Wj; nGcCn: g1ptN: goto VOqJJ; EVf55: message("\350\xae\276\347\xbd\xae\346\210\x90\345\212\x9f", $this->createWebUrl("\x75\x73\x65\162"), "\x73\165\143\x63\x65\x73\x73"); goto S7_Jf; tPbue: message("\xe8\257\245\xe7\x94\250\xe6\x88\267\xe8\xbf\230\xe4\xb8\x8d\xe6\x98\xaf\xe5\x91\230\xe5\xb7\245", '', "\x65\162\162\x6f\162"); goto r_Cv0; hicxb: baR31: goto cNQlt; TWe7z: $result = pdo_update("\154\157\156\x67\x62\x69\156\147\x5f\x63\141\x72\x64\x5f\x75\163\145\x72\x5f\x69\x6e\146\157", ["\151\x73\137\144\145\146\141\165\x6c\164" => 0, "\165\160\144\x61\164\x65\x5f\164\x69\155\145" => time()], ["\x66\x61\x6e\x73\x5f\x69\x64" => $_GPC["\151\x64"]]); goto Q7q35; Ardui: function checkStaffLimit($uniacid) { goto Yif2D; Yif2D: if (!(LONGBING_AUTH_CARD == 0)) { goto JxhNZ; } goto UtHIb; qtZX5: if (!($count >= LONGBING_AUTH_CARD)) { goto SYfly; } goto JmGeD; qB0c0: JxhNZ: goto vFEM9; vFEM9: $list = pdo_getall("\x6c\x6f\x6e\147\x62\151\x6e\147\137\x63\x61\x72\144\x5f\165\163\145\x72", ["\x69\163\x5f\163\x74\141\x66\x66" => 1, "\x75\156\x69\141\x63\x69\x64" => $uniacid]); goto AGEvC; UtHIb: return false; goto qB0c0; AGEvC: $count = count($list); goto qtZX5; aVKBW: return false; goto jpca7; JmGeD: return true; goto G0UVk; G0UVk: SYfly: goto aVKBW; jpca7: } goto pnMZI; Ao2k2: if (!($user["\151\163\x5f\x73\164\141\x66\146"] == 0)) { goto REzeg; } goto reSgF; BslJ6: if ($info) { goto xlRpL; } goto srJDr; EGZ0m: if ($user) { goto bCFxZ; } goto r2Sy5; cNQlt: if (!($user["\x69\163\x5f\x73\164\x61\x66\x66"] != 1)) { goto yxS1o; } goto rf_UL; Zc3L_: message("\xe5\210\233\xe5\273\xba\345\220\215\xe7\x89\x87\344\270\212\xe9\x99\x90\xe4\xb8\272\72\40" . $auth_info["\x6e\165\155\142\x65\162"] . "\54\40\xe5\xa6\202\xe9\234\200\345\242\236\xe5\x8a\xa0\xe8\xaf\267\xe8\201\x94\xe7\263\273\xe7\xae\xa1\347\x90\206\345\221\230", '', "\x65\162\x72\157\162"); goto Bifmg; rf_UL: message("\350\257\xa5\347\224\xa8\xe6\x88\267\xe8\277\230\344\xb8\215\346\x98\257\345\221\x98\345\267\xa5", '', "\x65\x72\x72\157\x72"); goto l35Zb; j6_Ii: Xse3R: goto kXWg2; dJNn4: message("\xe8\xae\276\xe7\xbd\256\xe6\x88\x90\345\x8a\237", $this->createWebUrl("\x75\x73\145\162"), "\x73\165\143\x63\x65\163\x73"); goto tgRQZ; W0ij1: if (!isset($_GPC["\x70\141\x67\145"])) { goto Xse3R; } goto P3Vle; fj1UE: changeCollction($_GPC["\151\x64"], 1); goto pvxmC; Q7q35: if (!$result) { goto pxAFr; } goto dJNn4; kXWg2: $users = pdo_getslice("\154\157\x6e\147\x62\x69\156\x67\x5f\x63\141\x72\x64\x5f\x75\x73\x65\x72", $where, $limit, $count, [], '', ["\x69\163\137\142\x6f\x73\x73\40\144\145\163\x63", "\x69\x73\x5f\163\164\x61\146\x66\40\144\145\163\x63", "\165\160\x64\141\164\x65\137\x74\151\155\x65\x20\144\x65\163\143"]); goto ya4RU; reSgF: message("\xe8\xaf\xa5\xe7\224\250\xe6\210\267\xe4\xb8\x8d\346\230\257\xe5\221\230\345\267\245\344\xba\x86", '', "\145\x72\162\157\x72"); goto JdtAW; YWLuU: changeCollction($_GPC["\151\144"], 1); goto ZAGdZ; xS3sF: $keyword = $_GPC["\x6b\145\x79\167\157\x72\x64"]; goto AsZFl; AsZFl: $where["\156\x69\x63\x6b\116\x61\x6d\x65\40\x6c\x69\x6b\145"] = "\45" . $_GPC["\153\x65\171\167\157\x72\x64"] . "\45"; goto BGLUz; khDeW: $result = pdo_update("\x6c\x6f\x6e\147\142\151\x6e\147\x5f\143\x61\162\x64\x5f\165\163\x65\162", ["\163\164\141\164\x75\x73" => 1, "\x69\163\137\x62\x6f\x73\x73" => 0, "\x75\160\144\x61\x74\145\137\164\x69\x6d\145" => time()], ["\151\144" => $_GPC["\x69\144"]]); goto yo0i0; dDoPr: XGy3Z: goto lYGYK; XAqA6: zehju: goto Y5BkM; IgVYy: if ($user) { goto baR31; } goto UCD7o; JxWRp: if (!$checkExists) { goto esudW; } goto iIiB6; kLL5v: is_file(ROOT_PATH . "\57\151\156\x63\57\x77\145\67\56\x70\150\160") or exit("\101\x63\x63\x65\163\x73\x20\104\145\x6e\x69\x65\x64\40\114\157\156\x67\x62\151\x6e\147"); goto CEd4J; oPW9g: esudW: goto lY7D6; J6kSW: qwsd5: goto HRN14; KFIan: $user = pdo_get("\x6c\x6f\156\147\142\151\156\147\137\143\141\162\144\x5f\165\x73\x65\x72", ["\151\x64" => $_GPC["\x69\144"]]); goto EGZ0m; OdJBB: leOdc: goto oPW9g; iIiB6: $auth_info = pdo_get("\154\157\156\x67\x62\x69\156\147\137\x63\141\162\x64\x61\x75\x74\x68\62\137\x63\157\x6e\146\x69\147", ["\155\x6f\x64\165\x6c\141\162\137\x69\x64" => $_W["\x75\156\151\x61\143\151\x64"]]); goto ZLrBy; Qri61: pdo_update("\x6c\x6f\x6e\x67\x62\151\x6e\x67\137\x63\x61\x72\144\137\x75\x73\x65\162", ["\165\160\x64\x61\x74\145\x5f\x74\x69\155\x65" => $time, "\151\163\137\x73\164\x61\146\146" => 0, "\x69\163\x5f\142\157\163\163" => 0], ["\x69\144" => $_GPC["\x69\144"]]); goto dvPlO; qzA2l: if ($user["\x69\163\137\x73\164\141\146\146"]) { goto xfOZq; } goto X5w3_; TfdVK: lx4cS: goto VwQkI; Bifmg: p2G83: goto OdJBB; wiBTh: message("\xe7\247\xbb\xe9\x99\244\xe6\x88\x90\345\212\x9f", $this->createWebUrl("\165\163\x65\162"), "\x73\x75\x63\x63\145\x73\163"); goto EmYpR; yM7Wj: $limit = array(1, 10); goto LG9pJ; Cht_9: if ($user) { goto x3AFp; } goto colAv; l_msP: if (!$result) { goto XGy3Z; } goto YWLuU; aWgc_: $perPage = 10; goto pBDgN; AVvYm: $info = pdo_get("\154\x6f\156\x67\142\x69\x6e\147\137\143\141\x72\144\137\x75\163\x65\x72\137\x69\x6e\146\x6f", ["\146\141\156\163\x5f\x69\x64" => $_GPC["\151\144"]]); goto BslJ6; eQJYg: $user = pdo_get("\154\x6f\x6e\x67\142\x69\156\147\137\x63\x61\x72\144\137\x75\163\145\162", ["\x69\144" => $_GPC["\151\x64"]]); goto bTXyS; X5w3_: message("\xe8\257\xb7\xe5\210\xb0\347\x94\250\xe6\x88\xb7\xe7\xae\xa1\347\x90\x86\351\207\x8c\xe6\x8a\x8a\xe8\xaf\245\347\x94\250\346\x88\xb7\350\256\276\347\xbd\xae\xe4\xb8\272\345\221\230\345\xb7\xa5", '', "\145\162\162\x6f\x72"); goto X6Cgb; iAJ1Y: message("\347\xa7\273\xe9\231\244\xe5\xa4\261\xe8\xb4\xa5", '', "\145\x72\x72\157\162"); goto YZbLn; ouOka: if (!($_GPC["\141\x63\x74\x69\x6f\156"] == "\144\145\x6c\123\164\x61\x66\146")) { goto XFucE; } goto eQJYg; ZNTAR: if (!$result) { goto y_mpO; } goto fj1UE; tgRQZ: pxAFr: goto ixzet; DGzd7: message("\345\210\233\xe5\273\xba\xe5\220\215\xe7\211\x87\xe4\xb8\212\xe9\x99\220\xe4\xb8\272\x3a\x20" . LONGBING_AUTH_CARD . "\54\40\xe5\xa6\202\xe9\234\x80\345\xa2\x9e\345\x8a\240\xe8\xaf\267\350\xb4\255\344\xb9\260\351\xab\230\xe7\xba\xa7\xe7\x89\x88\xe6\234\254", '', "\145\x72\x72\157\162"); goto uCp1R; l35Zb: yxS1o: goto khDeW; Wz1v1: message("\346\216\x88\346\235\x83\345\267\xb2\345\x88\xb0\xe6\234\237\x2c\40\xe8\257\xb7\350\x81\x94\xe7\263\273\xe7\xae\xa1\xe7\x90\206\xe5\x91\x98", '', "\145\x72\x72\x6f\162"); goto B7YWN; pnMZI: function changeCollction($id, $type) { goto y5Z6S; es2Xc: goto utenP; goto qnbPq; MzO6D: sYc6O: goto oGfBf; bXhsp: Bout4: goto K6noG; GRhl4: $info = pdo_get("\x6c\157\x6e\x67\142\x69\x6e\x67\x5f\143\141\162\144\x5f\143\157\154\154\x65\x63\164\x69\x6f\x6e", ["\x75\151\144" => $id, "\x74\x6f\x5f\x75\x69\144" => $id, "\x75\x6e\151\x61\x63\x69\x64" => $_W["\x75\156\151\x61\143\x69\144"]]); goto BAbBH; fEBAQ: pdo_update("\154\x6f\156\x67\x62\151\x6e\x67\137\143\x61\162\144\137\x63\x6f\x6c\154\145\143\164\151\157\156", ["\x73\x74\141\x74\x75\x73" => 1, "\165\x70\x64\141\x74\145\x5f\164\151\x6d\145" => time()], ["\x74\x6f\x5f\165\151\x64" => $id]); goto wEYMb; qnbPq: QcRSq: goto Ib03h; bl5z3: f8mPT: goto aie3U; yayHR: pdo_update("\154\157\x6e\x67\142\151\x6e\147\x5f\x63\141\162\144\137\143\157\154\x6c\x65\143\164\151\x6f\156", ["\163\x74\x61\164\x75\x73" => 0, "\x75\x70\x64\141\164\145\x5f\164\151\155\x65" => time()], ["\x74\157\137\x75\x69\144" => $id]); goto es2Xc; Ib03h: utenP: goto oZuSY; K6noG: pdo_insert("\x6c\157\156\147\142\151\156\147\x5f\143\141\x72\144\x5f\143\157\x6c\154\145\143\164\x69\x6f\x6e", ["\165\156\151\141\x63\x69\144" => $_W["\165\x6e\x69\141\143\151\144"], "\165\x69\x64" => $id, "\164\157\x5f\x75\151\x64" => $id, "\143\x72\145\141\x74\x65\x5f\x74\151\155\x65" => time(), "\165\x70\144\141\164\x65\x5f\164\151\x6d\x65" => time()]); goto WEw6z; wEYMb: goto fxLX9; goto bXhsp; y5Z6S: global $_GPC, $_W; goto GRhl4; oGfBf: if (empty($info)) { goto Bout4; } goto fEBAQ; YQUWV: if (empty($info)) { goto QcRSq; } goto yayHR; oZuSY: goto f8mPT; goto MzO6D; BAbBH: if ($type == 1) { goto sYc6O; } goto YQUWV; WEw6z: fxLX9: goto bl5z3; aie3U: } goto Bp6QF; VOqJJ: if (!($_GPC["\141\143\x74\151\157\x6e"] == "\144\145\154\x42\157\x73\163")) { goto Z2R7I; } goto y6fvQ; mv0wb: Z2R7I: goto ouOka; ir0Cp: $count = count($list); goto SVykM; s14b0: $result = pdo_update("\x6c\157\x6e\147\x62\151\156\147\x5f\143\141\x72\144\x5f\165\x73\x65\162", ["\x73\x74\141\164\165\x73" => 1, "\151\x73\x5f\163\x74\x61\146\146" => 1, "\x75\160\x64\141\164\145\x5f\x74\x69\x6d\x65" => time(), "\x69\x73\x5f\142\157\x73\163" => 1], ["\151\144" => $_GPC["\x69\144"]]); goto ZDJ1r; PrOa2: message("\350\xae\xbe\xe7\xbd\256\345\xa4\xb1\xe8\xb4\245", '', "\x65\162\x72\157\162"); goto J6kSW; JdtAW: REzeg: goto syOHv; VwQkI: $user = pdo_get("\154\157\156\x67\x62\151\x6e\x67\x5f\143\141\162\x64\x5f\165\163\145\x72\137\x69\156\x66\x6f", ["\x66\x61\156\x73\x5f\151\144" => $_GPC["\151\144"]]); goto UI8Ng; d0F6Q: if (!($_GPC["\141\143\x74\x69\157\x6e"] == "\141\144\x64\x44\145\x66\141\x75\154\164")) { goto qwsd5; } goto AVvYm; dvPlO: $result = pdo_update("\x6c\x6f\156\147\x62\x69\156\147\x5f\x63\x61\162\144\x5f\x75\x73\x65\x72\x5f\x69\156\x66\x6f", ["\163\164\x61\x74\165\x73" => -1, "\151\163\137\x73\164\x61\146\x66" => 0, "\165\160\144\141\164\145\137\164\x69\x6d\145" => time()], ["\146\x61\156\163\x5f\151\144" => $_GPC["\x69\144"]]); goto lL1fr; q_cwq: TitZ6: goto m_RpY; BF6lk: ZZjs6: goto aWgc_; jt_92: if (!($_GPC["\141\143\164\x69\x6f\x6e"] == "\141\144\144\123\164\x61\146\x66")) { goto zehju; } goto ftRMR; shw0_: LIdmu: goto Ao2k2; pvxmC: message("\346\267\273\345\x8a\240\xe6\210\x90\xe5\212\x9f", $this->createWebUrl("\165\163\x65\x72"), "\163\165\143\143\145\163\x73"); goto s9JQ2; r_Cv0: FfEXw: goto s14b0; D34sE: if (!$check_res) { goto o6x8N; } goto DGzd7; HRN14: if (!($_GPC["\x61\143\164\x69\x6f\156"] == "\x64\x65\154\104\x65\146\141\x75\x6c\x74")) { goto MC_Xq; } goto TWe7z; EmYpR: lobqO: goto iAJ1Y; YUsc8: message("\346\x9c\xaa\xe6\211\xbe\345\210\260\347\x94\xa8\xe6\x88\xb7", '', "\145\x72\x72\157\x72"); goto shw0_; Y5BkM: if (!($_GPC["\x61\143\164\151\157\x6e"] == "\x61\144\x64\102\x6f\163\x73")) { goto g1ptN; } goto KFIan; stJkp: if (!(!$user || empty($user))) { goto R52yb; } goto KO3Aj; SVykM: if (!($auth_info["\145\x6e\144\137\164\151\155\x65"] < $time)) { goto GuN10; } goto Wz1v1; BGLUz: kOuzI: goto W0ij1; ftU7P: $curr = 1; goto FjAfG; m_RpY: if (!($user["\151\163\x5f\x73\x74\141\146\146"] == 1)) { goto lx4cS; } goto SUTIr; YZbLn: XFucE: goto d0F6Q; wmKPl: $result = pdo_update("\154\x6f\x6e\147\x62\x69\x6e\x67\137\143\x61\x72\x64\137\x75\163\x65\x72\137\x69\x6e\x66\157", ["\163\164\141\164\x75\x73" => 1, "\151\163\x5f\x73\164\141\146\146" => 1, "\151\x73\137\x64\x65\146\141\x75\x6c\164" => 1, "\165\x70\x64\141\x74\x65\x5f\164\151\155\145" => time()], ["\146\x61\156\x73\137\x69\144" => $_GPC["\151\144"]]); goto l_msP; i12L_: $list = pdo_getall("\x6c\157\x6e\147\142\151\156\147\x5f\143\x61\x72\144\137\165\163\145\162", ["\x69\163\x5f\x73\164\141\x66\x66" => 1, "\165\x6e\x69\x61\143\x69\144" => $_W["\x75\156\151\x61\143\151\x64"]]); goto ir0Cp; syOHv: $user = pdo_get("\x6c\157\x6e\147\x62\151\156\147\x5f\x63\141\x72\144\137\165\x73\x65\162\x5f\151\x6e\146\x6f", ["\146\x61\x6e\x73\x5f\x69\144" => $_GPC["\x69\144"]]); goto Qri61; FjAfG: if (!isset($_GPC["\153\x65\x79\x77\x6f\162\x64"])) { goto kOuzI; } goto xS3sF; ZDJ1r: if (!$result) { goto rsAqe; } goto TLiv0; UI8Ng: pdo_update("\x6c\x6f\156\147\x62\x69\x6e\x67\137\143\x61\162\144\x5f\x75\163\x65\x72", ["\165\160\144\x61\164\x65\137\164\x69\155\145" => $time, "\x69\163\x5f\163\164\141\146\146" => 1], ["\151\144" => $_GPC["\151\144"]]); goto stJkp; wsegw: changeCollction($_GPC["\151\144"], 2); goto wiBTh; ZUtAD: rsAqe: goto bUL9x; X6Cgb: xfOZq: goto w2TZv; uCp1R: o6x8N: goto V3Mfb; lY7D6: $user = pdo_get("\154\157\x6e\147\142\x69\156\x67\137\x63\141\162\x64\137\165\x73\x65\162", ["\151\144" => $_GPC["\x69\x64"]]); goto hVpdC; w2TZv: $result = pdo_update("\154\x6f\156\x67\x62\151\x6e\147\137\143\x61\x72\144\x5f\x75\163\145\x72\x5f\x69\156\146\x6f", ["\x69\x73\137\144\145\146\x61\165\154\164" => 1, "\165\160\x64\x61\164\x65\x5f\x74\x69\155\x65" => time()], ["\146\141\x6e\x73\137\x69\144" => $_GPC["\151\144"]]); goto OTXUu; ZAGdZ: message("\xe6\267\273\xe5\212\240\xe6\x88\x90\xe5\212\x9f", $this->createWebUrl("\165\x73\145\162"), "\163\165\143\143\x65\163\x73"); goto dDoPr; lYGYK: message("\xe6\267\273\345\x8a\xa0\xe5\xa4\261\350\xb4\245", '', "\x65\x72\162\x6f\x72"); goto XAqA6; mV6T0: global $_GPC, $_W; goto H7ayM; V3Mfb: $checkExists = pdo_tableexists("\154\157\x6e\x67\142\x69\x6e\147\137\143\141\162\144\x61\x75\164\x68\62\x5f\x63\157\x6e\146\x69\x67"); goto JxWRp; xWWkl: xlRpL: goto HlGJ4; CEd4J: require_once ROOT_PATH . "\57\x69\x6e\x63\x2f\167\145\x37\56\x70\x68\160"; goto Ardui; lL1fr: if (!$result) { goto lobqO; } goto wsegw; srJDr: message("\xe6\234\252\346\x89\xbe\345\210\260\345\x90\215\xe7\211\x87\xe4\xbf\241\xe6\x81\xaf", '', "\145\162\162\x6f\x72"); goto xWWkl; s9JQ2: y_mpO: goto IgVYJ; P3Vle: $limit[0] = $_GPC["\160\x61\x67\145"]; goto AEjSM; IgVYJ: R52yb: goto wmKPl; H7ayM: define("\x52\x4f\117\x54\137\x50\101\x54\110", IA_ROOT . "\57\141\x64\144\x6f\156\x73\x2f\x6c\x6f\156\147\142\x69\156\x67\x5f\x63\x61\x72\x64\x2f"); goto kLL5v; colAv: message("\346\234\252\346\211\276\xe5\x88\260\xe7\x94\xa8\346\x88\267\344\xbf\241\346\x81\xaf", '', "\145\162\162\x6f\162"); goto EDHlM; SUTIr: message("\350\xaf\245\347\224\250\346\210\xb7\345\xb7\262\347\xbb\217\xe6\230\xaf\345\x91\x98\xe5\xb7\xa5\344\xba\x86", '', "\x65\x72\162\x6f\162"); goto TfdVK; vSJBu: message("\xe6\234\xaa\xe6\x89\276\xe5\210\xb0\347\x94\xa8\xe6\x88\xb7", '', "\145\162\162\x6f\162"); goto q_cwq; ya4RU: foreach ($users as $k => $v) { goto LPptu; LPptu: $phone = pdo_get("\x6c\x6f\156\x67\x62\151\x6e\x67\137\143\141\162\x64\x5f\x75\163\145\x72\137\x70\150\157\156\145", ["\x75\163\145\x72\137\151\144" => $v["\151\144"]]); goto U1X70; OAbIT: $users[$k]["\x69\x73\x5f\144\145\146\x61\x75\x6c\x74"] = $info ? $info["\x69\163\x5f\x64\145\146\141\165\x6c\x74"] : 0; goto pwFtg; zM3iZ: if (!($v["\151\163\x5f\x73\x74\141\146\x66"] == 1)) { goto ncr2J; } goto pZ5pR; U1X70: $users[$k]["\x70\x68\157\156\145"] = $phone["\x70\x68\x6f\x6e\x65"]; goto zM3iZ; pZ5pR: $info = pdo_get("\154\157\156\147\x62\x69\156\147\x5f\143\x61\162\x64\x5f\x75\x73\145\x72\137\151\x6e\146\157", ["\x66\141\156\x73\137\x69\144" => $v["\x69\x64"]]); goto OAbIT; QWKal: x0_mm: goto J2d9j; pwFtg: ncr2J: goto QWKal; J2d9j: } goto BF6lk; Bp6QF: $time = time(); goto jt_92; TLiv0: message("\xe8\256\xbe\xe7\275\xae\346\x88\220\xe5\212\237", $this->createWebUrl("\x75\163\x65\162"), "\163\165\143\x63\145\163\x73"); goto ZUtAD; UCD7o: message("\346\x9c\xaa\xe6\211\xbe\345\x88\260\xe7\x94\xa8\346\210\267", '', "\145\162\x72\157\x72"); goto hicxb; HlGJ4: $user = pdo_get("\x6c\x6f\156\x67\142\151\156\147\137\x63\141\162\x64\x5f\x75\x73\145\x72", ["\151\x64" => $_GPC["\151\144"]]); goto Cht_9; pBDgN: load()->func("\164\160\154"); goto IYvH2; aP00R: bCFxZ: goto ssc4q; ftRMR: $check_res = checkStaffLimit($_W["\x75\x6e\151\141\x63\x69\144"]); goto D34sE; hVpdC: if ($user) { goto TitZ6; } goto vSJBu; ixzet: message("\xe8\256\xbe\xe7\xbd\xae\xe5\244\261\350\264\245", '', "\145\x72\162\x6f\x72"); goto AkH7e; jD336: JkZMw: goto PrOa2; LG9pJ: $where = ["\165\x6e\151\x61\143\151\144" => $_W["\165\156\151\141\x63\x69\x64"]]; goto ftU7P; bTXyS: if ($user) { goto LIdmu; } goto YUsc8; ssc4q: if (!($user["\151\x73\137\x73\164\x61\x66\146"] != 1)) { goto FfEXw; } goto tPbue; y6fvQ: $user = pdo_get("\x6c\x6f\x6e\x67\x62\151\156\147\137\143\141\162\x64\137\x75\x73\x65\x72", ["\151\x64" => $_GPC["\151\144"]]); goto IgVYy; cPAoK: message("\xe8\256\xbe\347\xbd\xae\346\210\x90\xe5\x8a\x9f", $this->createWebUrl("\x75\x73\x65\162"), "\163\x75\x63\143\145\x73\163"); goto jD336; ZLrBy: if (!$auth_info) { goto leOdc; } goto i12L_; r2Sy5: message("\346\x9c\xaa\xe6\x89\xbe\345\x88\260\xe7\224\xa8\346\210\267", '', "\x65\x72\x72\157\x72"); goto aP00R; OTXUu: if (!$result) { goto JkZMw; } goto cPAoK; EDHlM: x3AFp: goto qzA2l; B7YWN: GuN10: goto Rpps8; Rpps8: if (!($count >= $auth_info["\156\165\155\x62\145\162"])) { goto p2G83; } goto Zc3L_; IYvH2: include $this->template("\x75\163\145\162\163");