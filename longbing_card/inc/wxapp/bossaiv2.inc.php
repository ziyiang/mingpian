<?php
 goto bPFrU; hqXvW: $offset = ($curr - 1) * 10; goto ZAmbh; qFsI7: $limit[0] = $_GPC["\x70\x61\x67\x65"]; goto VA1JY; VnMdz: $max = ["\x63\x6c\151\x65\156\x74" => 0, "\143\x68\141\x72\x6d" => 0, "\x69\x6e\x74\145\x72\141\x63\x74\x69\x6f\156" => 0, "\x70\162\x6f\x64\165\143\164" => 0, "\x77\145\x62\x73\x69\164\x65" => 0, "\x61\x63\164\151\x76\x65" => 0]; goto m8DAk; ZAmbh: $array = array_slice($staff_list, $offset, 10); goto tH3Il; njUs9: v1fff: goto wKEaW; oI6G6: $com["\x6c\x6f\147\157"] = $this->transImage($com["\x6c\157\x67\x6f"]); goto StBbB; KNKYK: $limit = array(1, 10); goto Cy46U; c5oVq: foreach ($staff_list as $k => $v) { goto WWy2v; gcQl3: $staff_list[$k]["\x74\157\164\x61\x6c"] = $total; goto Mq3Ky; rs7RV: EMc5l: goto cFioy; iZHxi: $staff_list[$k]["\x69\156\146\x6f"] = $info; goto xJbLS; VH6xu: $staff_list[$k]["\166\x61\154\165\145\137\x32"] = $tmpValue; goto gcQl3; cFioy: $staff_list[$k]["\166\141\x6c\x75\145"] = $value; goto VH6xu; iZ0Ng: foreach ($value as $k2 => $v2) { goto MlTeE; MlTeE: if (!($v2["\x76\141\x6c\165\x65"] > $max[$k2])) { goto mLS5x; } goto EnQu5; EnQu5: $max[$k2] = $v2["\166\x61\154\165\145"]; goto rxCw8; rxCw8: mLS5x: goto DVLJO; p1G12: QoWcB: goto UKG4j; WDRvT: $v2["\x74\x69\164\154\x65\x5f\x65\156"] = $k2; goto nf38m; DVLJO: $total += $v2["\x76\141\154\x75\x65"]; goto WDRvT; nf38m: array_push($tmpValue, $v2); goto p1G12; UKG4j: } goto rs7RV; xJbLS: jAMIL: goto DESt2; JwM4A: $value = $this->bossGetAiValue($v["\x69\144"]); goto KFy74; SdT45: $total = 0; goto JwM4A; Mq3Ky: $info["\141\166\x61\164\x61\162"] = tomedia($info["\141\166\x61\x74\x61\x72"]); goto iZHxi; KFy74: $tmpValue = array(); goto iZ0Ng; B1ONQ: $info["\152\x6f\142\x5f\156\x61\x6d\x65"] = !empty($job) ? $job["\x6e\x61\x6d\145"] : ''; goto SdT45; WWy2v: $info = pdo_get("\x6c\157\x6e\x67\x62\151\x6e\147\137\143\x61\x72\144\x5f\165\163\145\162\x5f\x69\x6e\146\157", ["\x75\156\x69\141\143\x69\144" => $uniacid, "\x66\141\x6e\x73\137\151\x64" => $v["\151\x64"]], ["\156\141\155\x65", "\x61\x76\x61\x74\141\x72", "\x70\x68\157\x6e\x65", "\x6a\x6f\x62\x5f\151\x64"]); goto flwxi; flwxi: $job = pdo_get("\154\157\x6e\147\x62\x69\x6e\x67\137\x63\141\162\144\137\152\157\x62", ["\x69\144" => $info["\x6a\157\x62\x5f\x69\144"]]); goto B1ONQ; DESt2: } goto njUs9; KbCpF: if (!isset($_GPC["\160\x61\147\145"])) { goto p6fVP; } goto qFsI7; OWNPf: p6fVP: goto hqXvW; Jpghf: $default = ["\x63\154\x69\145\156\164" => 0, "\x63\x68\x61\x72\155" => 0, "\x69\156\x74\145\x72\x61\143\x74\151\x6f\156" => 0, "\x70\162\157\144\x75\x63\x74" => 0, "\167\x65\x62\x73\x69\164\x65" => 0, "\141\143\x74\151\166\x65" => 0]; goto VnMdz; bPFrU: global $_GPC, $_W; goto v57GR; v57GR: $uniacid = $_W["\165\x6e\x69\141\x63\x69\144"]; goto Jpghf; m8DAk: $staff_list = pdo_getall("\x6c\x6f\156\x67\142\151\156\x67\x5f\143\141\162\x64\137\165\163\145\x72", ["\165\x6e\151\x61\143\151\144" => $uniacid, "\x69\x73\137\163\x74\141\146\146" => 1], ["\x69\144", "\x6e\151\143\x6b\x4e\x61\x6d\x65", "\141\166\x61\x74\141\162\125\162\x6c"]); goto c5oVq; VA1JY: $curr = $_GPC["\160\x61\x67\x65"]; goto OWNPf; Cy46U: $curr = 1; goto KbCpF; wKEaW: array_multisort(array_column($staff_list, "\164\157\x74\x61\154"), SORT_DESC, $staff_list); goto KNKYK; StBbB: $data = ["\154\151\163\164" => $array, "\x6d\141\170" => $max, "\143\x6f\155" => $com]; goto rg4cu; tH3Il: $com = pdo_get("\154\157\156\x67\142\x69\156\147\x5f\143\x61\162\144\x5f\x63\157\155\160\141\156\x79", ["\x75\156\x69\141\x63\151\144" => $uniacid]); goto oI6G6; rg4cu: return $this->result(0, "\350\257\267\xe6\xb1\202\346\210\220\345\x8a\237", $data);