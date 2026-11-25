#!/usr/bin/env python3
"""Khóa trang bằng mật khẩu (cô Thảo tiếng Trung, 25/11/2026).

Mã hóa toàn bộ file HTML bằng AES-256-GCM, khóa sinh từ mật khẩu (PBKDF2-SHA256, 250.000 vòng).
Trên GitHub chỉ còn bản đã mã hóa: không có mật khẩu thì không đọc được nội dung.
Người xem nhập mật khẩu một lần; trình duyệt nhớ mật khẩu cho mọi trang khóa khác của trang web.

Cách dùng (mật khẩu KHÔNG ghi vào repo, hỏi cô Thảo):
    KHOA_MK='mật khẩu' python3 tools/khoa-trang.py <file-goc.html> <file-dich.html>
File gốc (chưa khóa) giữ ngoài repo. Không bao giờ commit bản chưa khóa vào ppt/, on-thi-hsk6/, luyen-viet-hsk6/.
"""
import os, sys, base64, html
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes

ITER = 250000
TPL = r"""<!DOCTYPE html>
<html lang="vi"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>__TITLE__ · Cần mật khẩu</title>
<style>
body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#FBF7F1;font-family:"Be Vietnam Pro",system-ui,-apple-system,"Segoe UI",sans-serif;color:#2B1A1F}
.box{width:min(420px,92vw);background:#fff;border:1px solid #E6D8C8;border-radius:18px;padding:28px 26px;box-shadow:0 10px 30px rgba(122,31,61,.08);text-align:center}
.seal{width:64px;height:64px;margin:0 auto 10px;border-radius:14px;background:linear-gradient(160deg,#7A1F3D,#2a0a17);color:#E2B55A;display:grid;place-items:center;font-size:30px}
h1{font-size:20px;color:#7A1F3D;margin:6px 0 4px}
p{color:#76656A;font-size:14px;margin:4px 0 16px}
input{width:100%;box-sizing:border-box;font:inherit;font-size:17px;padding:11px 14px;border:1px solid #E6D8C8;border-radius:10px;text-align:center}
input:focus{outline:2px solid #7A1F3D;border-color:#7A1F3D}
button{margin-top:12px;width:100%;background:#7A1F3D;color:#fff;border:none;border-radius:10px;padding:11px;font:inherit;font-weight:700;font-size:16px;cursor:pointer}
button:disabled{opacity:.6}
.err{color:#b3261e;font-size:14px;min-height:20px;margin-top:10px}
.foot{margin-top:14px;font-size:13px}.foot a{color:#7A1F3D}
label{display:flex;gap:6px;align-items:center;justify-content:center;font-size:13px;color:#76656A;margin-top:10px}
</style></head><body>
<form class="box" id="f" autocomplete="off">
  <div class="seal">🔒</div>
  <h1>__TITLE__</h1>
  <p>Nội dung dành riêng cho học viên của cô Thảo. Nhập mật khẩu để mở.</p>
  <input type="password" id="pw" placeholder="Mật khẩu" autofocus>
  <label><input type="checkbox" id="nho" checked style="width:auto"> Nhớ mật khẩu trên máy này</label>
  <button id="b">Mở khóa</button>
  <div class="err" id="e"></div>
  <div class="foot"><a href="https://zalo.me/0366534081">Chưa có mật khẩu? Nhắn Zalo cô Thảo</a> · <a href="__HOME__">Trang chủ</a></div>
</form>
<script id="d" type="application/octet-stream">__DATA__</script>
<script>
(function(){
const K="ct_khoa_mk",IT=__ITER__;
const $=i=>document.getElementById(i);
async function open_(pw){
  const raw=Uint8Array.from(atob($("d").textContent.trim()),c=>c.charCodeAt(0));
  const salt=raw.slice(0,16),iv=raw.slice(16,28),ct=raw.slice(28);
  const base=await crypto.subtle.importKey("raw",new TextEncoder().encode(pw),"PBKDF2",false,["deriveKey"]);
  const key=await crypto.subtle.deriveKey({name:"PBKDF2",salt,iterations:IT,hash:"SHA-256"},base,{name:"AES-GCM",length:256},false,["decrypt"]);
  const pt=await crypto.subtle.decrypt({name:"AES-GCM",iv},key,ct);
  return new TextDecoder().decode(pt);
}
function show(h){document.open();document.write(h);document.close()}
async function tryPw(pw,remember){
  $("b").disabled=true;$("b").textContent="Đang mở…";$("e").textContent="";
  try{const h=await open_(pw);try{if(remember)localStorage.setItem(K,pw);sessionStorage.setItem(K,pw)}catch(e){}show(h);return true}
  catch(e){$("b").disabled=false;$("b").textContent="Mở khóa";return false}
}
$("f").onsubmit=async e=>{e.preventDefault();const pw=$("pw").value;if(!pw)return;if(!await tryPw(pw,$("nho").checked)){$("e").textContent="Mật khẩu chưa đúng. Em kiểm tra lại nhé.";$("pw").select()}};
let saved=null;try{saved=sessionStorage.getItem(K)||localStorage.getItem(K)}catch(e){}
if(!window.crypto||!crypto.subtle){$("e").textContent="Trình duyệt này không mở được trang khóa. Em dùng Chrome hoặc Safari bản mới nhé.";}
else if(saved){tryPw(saved,false).then(ok=>{if(!ok){try{localStorage.removeItem(K);sessionStorage.removeItem(K)}catch(e){}}})}
})();
</script>
</body></html>
"""

def khoa(src, dst, pw, title=None, home="/cothaotiengtrung/"):
    data = open(src, 'rb').read()
    if b'id="d" type="application/octet-stream"' in data:
        raise SystemExit(f"{src} đã là trang khóa, cần file gốc chưa khóa")
    if title is None:
        import re
        m = re.search(rb'<title>(.*?)</title>', data, re.S)
        title = m.group(1).decode('utf-8', 'ignore').strip() if m else 'Cô Thảo tiếng Trung'
    salt, iv = os.urandom(16), os.urandom(12)
    key = PBKDF2HMAC(algorithm=hashes.SHA256(), length=32, salt=salt, iterations=ITER).derive(pw.encode())
    ct = AESGCM(key).encrypt(iv, data, None)
    out = (TPL.replace('__TITLE__', html.escape(title)).replace('__HOME__', home)
              .replace('__ITER__', str(ITER)).replace('__DATA__', base64.b64encode(salt + iv + ct).decode()))
    open(dst, 'w', encoding='utf-8').write(out)

if __name__ == '__main__':
    pw = os.environ.get('KHOA_MK')
    if not pw or len(sys.argv) != 3:
        sys.exit(__doc__)
    khoa(sys.argv[1], sys.argv[2], pw)
    print('Đã khóa', sys.argv[2])
