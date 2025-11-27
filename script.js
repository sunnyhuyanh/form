// Biến cờ kiểm tra submit xong
let submitted = false;
const f = document.getElementById('contactForm');
const hidden = document.getElementById('hiddenFields');
const m = {
  name:  document.getElementById('mapName').value,    // ví dụ: entry.1234567890
  phone: document.getElementById('mapPhone').value,  // ví dụ: entry.0987654321
  email: document.getElementById('mapEmail').value,
  msg:    document.getElementById('mapMessage').value
};

// Tạo input ẩn đúng tên entry.* trước khi gửi
f.addEventListener('submit', (e)=>{
  // Nếu thiếu mapping, cảnh báo
  if(Object.values(m).some(v=>!/^entry\.[0-9]+$/.test(v))){
    e.preventDefault();
    alert('Vui lòng điền đúng các ID entry.* của Google Form (nhấn 3 chấm > Lấy liên kết điền trước để xem mã entry).');
    return;
  }
  // Xoá cũ
  hidden.innerHTML = '';
  // Tạo các input name=entry.xxxx
  const pairs = [
    [m.name,  document.getElementById('name').value],
    [m.phone, document.getElementById('phone').value],
    [m.email, document.getElementById('email').value],
    [m.msg,    document.getElementById('message').value]
  ];
  for(const [n,v] of pairs){
    const inp = document.createElement('input');
    inp.type = 'hidden';
    inp.name = n;
    inp.value = v;
    hidden.appendChild(inp);
  }
  // Trạng thái nút
  const btn = document.getElementById('btnSubmit');
  btn.disabled = true; btn.textContent = 'ĐANG GỬI...';
  // Sau khi iframe load xong (Google Form redirect), reset
  const iframe = document.getElementById('hidden_iframe');
  iframe.addEventListener('load', ()=>{
    if(submitted){
      btn.textContent = 'ĐÃ GỬI ✔';
      setTimeout(()=>{ btn.disabled=false; btn.textContent='GỬI NGAY'; f.reset(); }, 1200);
      submitted=false;
    }
  }, { once:false });
});
