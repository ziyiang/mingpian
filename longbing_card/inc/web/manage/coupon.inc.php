<?php
 goto GoDUM; Gcfx9: $curr = 1; goto m9LP3; dJeqq: $module_name = $_W["\143\x75\x72\162\145\x6e\164\137\155\157\x64\165\x6c\x65"]["\156\x61\x6d\145"]; goto s3X3K; RHKQZ: if (!isset($_GPC["\153\145\171\167\157\x72\x64"])) { goto VkKal; } goto JC014; AWQqy: $limit[0] = $_GPC["\160\x61\147\145"]; goto HSbR_; PrlwI: $uniacid = $_W["\x75\x6e\151\141\143\151\144"]; goto dJeqq; oCEV5: is_file(ROOT_PATH . "\x2f\x69\156\143\x2f\x77\x65\x37\56\x70\x68\x70") or exit("\101\x63\x63\145\163\x73\x20\x44\145\x6e\x69\x65\144\x20\114\157\x6e\x67\142\151\x6e\x67"); goto hje5H; vIc2E: $keyword = ''; goto RHKQZ; s3X3K: $limit = array(1, 15); goto OMrxd; JC014: $keyword = $_GPC["\153\145\171\167\157\x72\x64"]; goto Gon94; dnnbc: define("\122\x4f\x4f\124\137\120\x41\x54\110", IA_ROOT . "\57\x61\144\x64\x6f\x6e\163\57\x6c\157\x6e\x67\x62\x69\156\x67\137\x63\141\162\x64\57"); goto oCEV5; rtIgt: load()->func("\x74\160\154"); goto jaASV; HSbR_: $curr = $_GPC["\x70\x61\x67\x65"]; goto HgQGa; hmxEv: $list = pdo_getslice("\x6c\157\156\x67\x62\151\x6e\x67\137\143\141\x72\x64\x5f\143\x6f\165\160\x6f\x6e", $where, $limit, $count, [], '', ["\164\x6f\160\x20\144\x65\x73\x63", "\143\x72\x65\x61\x74\x65\x5f\x74\151\x6d\x65\40\144\x65\163\143"]); goto iqag6; ODFYz: VkKal: goto Gcfx9; HgQGa: boYUl: goto hmxEv; Gon94: $where["\164\x69\164\154\x65\x20\x6c\151\153\145"] = "\x25" . $keyword . "\x25"; goto ODFYz; hje5H: require_once ROOT_PATH . "\57\151\156\143\x2f\167\x65\67\56\160\150\x70"; goto PrlwI; iqag6: $perPage = 15; goto rtIgt; m9LP3: if (!isset($_GPC["\x70\141\147\x65"])) { goto boYUl; } goto AWQqy; OMrxd: $where = ["\x75\x6e\151\x61\x63\x69\x64" => $_W["\165\156\x69\141\x63\x69\144"], "\163\164\141\164\165\163\40\76" => -1]; goto vIc2E; GoDUM: global $_GPC, $_W; goto dnnbc; jaASV: include $this->template("\155\141\x6e\141\x67\145\57\143\157\165\160\x6f\156");