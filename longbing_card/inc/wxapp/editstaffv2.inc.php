<?php
 goto KJV4A; vUP8f: if (empty($user_info)) { goto qKPjn; } goto QZvKW; ncVH5: $staff_id = $_GPC["\163\x74\x61\x66\x66\x5f\x69\144"]; goto TvO04; Sy4a6: return $this->result(-1, "\xe8\257\267\346\261\202\345\xa4\261\350\xb4\245" . $result, []); goto ba2dT; LhbMB: kvm5k: goto Eku72; oTnGk: NpNhq: goto J1xfu; A4UQD: qKPjn: goto cKAgt; Eku72: $images = $this->transImageBack($_GPC["\151\x6d\x61\147\x65\163"]); goto Tk_yK; E3hsw: RZLp_: goto T2ZZ0; ba2dT: goto bWN54; goto HVfj1; USTZu: $user_info = pdo_get("\x6c\157\156\x67\x62\x69\156\147\x5f\143\141\162\x64\137\165\163\x65\x72\137\151\156\x66\x6f", ["\146\141\156\163\137\x69\144" => $info["\x69\x64"], "\x75\x6e\151\141\x63\151\x64" => $uniacid], ["\x6e\141\155\x65", "\160\x68\x6f\156\x65", "\x66\x61\x6e\x73\x5f\151\144", "\151\144", "\143\x72\x65\141\164\145\x5f\x74\x69\155\x65"]); goto vUP8f; wO3K5: j2NJZ: goto USTZu; cKAgt: $data["\146\x61\156\163\x5f\151\x64"] = $info["\x69\x64"]; goto jiOuq; L6_qJ: return $this->result(-1, "\346\x9c\252\346\211\xbe\345\210\260\xe8\257\xa5\xe5\221\230\xe5\267\xa5\x2f\347\224\250\xe6\x88\267", []); goto qtYYw; uinN2: $_GPC["\x64\x65\163\x63"] = str_replace("\40", "\x26\156\142\163\x70\x3b", $_GPC["\144\145\163\143"]); goto xAv56; T2ZZ0: $result = pdo_update("\154\157\x6e\147\x62\x69\x6e\x67\x5f\143\141\162\144\x5f\x75\163\x65\x72\x5f\151\156\146\157", $data, ["\x66\141\156\163\137\151\144" => $info["\x69\x64"]]); goto JSkc8; xAv56: $data = ["\165\x6e\x69\141\x63\151\x64" => $uniacid, "\141\x76\x61\x74\141\x72" => $avatar, "\x6e\x61\x6d\145" => $_GPC["\156\141\x6d\145"], "\x70\x68\x6f\156\145" => $_GPC["\160\150\157\156\x65"], "\167\145\x63\150\141\x74" => $_GPC["\167\145\143\150\141\x74"], "\x74\145\154\x65\x70\x68\157\x6e\x65" => $_GPC["\x74\145\x6c\145\160\150\157\156\145"], "\152\157\142\137\151\144" => $_GPC["\x6a\x6f\142\x5f\151\x64"], "\x65\x6d\141\x69\154" => $_GPC["\145\x6d\x61\x69\x6c"], "\144\x65\163\143" => $_GPC["\144\x65\163\143"], "\x63\x6f\x6d\160\x61\156\x79\137\x69\x64" => $_GPC["\143\x6f\x6d\x70\x61\x6e\x79\137\151\144"], "\166\x6f\x69\x63\145" => $voice, "\x76\157\x69\x63\x65\137\164\151\155\x65" => $_GPC["\166\157\x69\143\x65\x5f\164\x69\x6d\145"], "\143\x61\162\x64\x5f\164\171\160\x65" => $_GPC["\x63\x61\162\144\137\164\x79\160\x65"], "\x6d\171\137\x75\x72\154" => $_GPC["\155\x79\x5f\x75\162\154"], "\151\155\141\147\x65\163" => $images, "\x75\x70\144\x61\164\145\x5f\x74\x69\155\x65" => time()]; goto GkeKl; Z4us1: $redis_key = "\154\157\156\x67\142\151\156\x67\x5f\143\x61\x72\144\x73\x76\64\137" . $uid . "\x5f" . $uniacid; goto xhxv0; lxkKj: VZz4t: goto gnDZ9; tqR7f: if (!empty($info)) { goto R5mkF; } goto L6_qJ; QZvKW: if ($user_info["\143\162\x65\x61\164\145\137\164\151\x6d\x65"]) { goto RZLp_; } goto HCf5z; TvO04: if (!$staff_id) { goto rZjVk; } goto KNoll; GkeKl: if (!$_GPC["\x6d\x79\x5f\x76\x69\144\x65\157"]) { goto j2NJZ; } goto dZnjy; R2BO_: $voice = $this->transImageBack($_GPC["\166\157\151\143\x65"]); goto uinN2; gnDZ9: if ($result) { goto fmj56; } goto Sy4a6; KNoll: $uid = $staff_id; goto Hebuk; NRXIH: $result = pdo_insert("\154\x6f\x6e\147\x62\151\156\147\x5f\143\x61\162\x64\x5f\165\163\145\162\137\151\156\x66\157", $data); goto lxkKj; HVfj1: fmj56: goto zaIQt; u7bPn: return $this->result(-1, "\xe8\257\267\xe4\xbc\240\xe5\x85\xa5\xe5\x8f\x82\xe6\225\xb0", []); goto oTnGk; jiOuq: $data["\143\x72\145\141\x74\145\x5f\164\151\x6d\x65"] = time(); goto NRXIH; Hebuk: rZjVk: goto HQLjw; xhxv0: $this->redis_server_v2->set($redis_key, ''); goto W3Qpk; FfZ0i: if (!($info["\151\163\137\x73\164\x61\146\146"] != 1)) { goto kvm5k; } goto LhbMB; qtYYw: R5mkF: goto FfZ0i; Djj8z: if (!(!$uid || !$_GPC["\x6a\x6f\x62\137\x69\144"])) { goto NpNhq; } goto u7bPn; J1xfu: $info = pdo_get("\154\157\156\147\142\151\x6e\x67\137\143\x61\162\144\137\x75\x73\x65\162", ["\x69\144" => $uid], ["\x6e\151\143\153\x4e\x61\x6d\x65", "\x61\x76\x61\x74\x61\x72\x55\x72\x6c", "\x69\x73\137\x73\164\141\x66\x66", "\151\x64"]); goto tqR7f; KJV4A: global $_GPC, $_W; goto vW8h3; zaIQt: if (!$this->redis_sup_v2) { goto OPB7p; } goto Z4us1; W3Qpk: OPB7p: goto u7Ba9; HQLjw: $uniacid = $_W["\165\x6e\x69\141\143\x69\144"]; goto Djj8z; JSkc8: goto VZz4t; goto A4UQD; vW8h3: $uid = $_GPC["\165\x73\145\x72\x5f\x69\x64"]; goto ncVH5; u7Ba9: return $this->result(0, "\xe8\xaf\267\xe6\xb1\x82\346\210\220\xe5\212\x9f", []); goto Hq7vz; HCf5z: $data["\x63\x72\x65\x61\x74\x65\x5f\164\151\x6d\x65"] = time(); goto E3hsw; dZnjy: $data["\155\x79\137\x76\151\144\145\x6f"] = $_GPC["\x6d\171\x5f\x76\151\144\x65\x6f"]; goto wO3K5; Tk_yK: $avatar = $this->transImageBack($_GPC["\141\166\141\x74\141\x72"]); goto R2BO_; Hq7vz: bWN54: