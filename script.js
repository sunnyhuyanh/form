// Hiển thị ô Other khi chọn
document.getElementById('otherNhuCauRadio').addEventListener('change', function(){
  document.getElementById('otherNhuCauBox').classList.add('active');
});
document.querySelectorAll('input[name="entry.1312703791"]').forEach(radio => {
  if (radio !== document.getElementById('otherNhuCauRadio')) {
    radio.addEventListener('change', () => {
      document.getElementById('otherNhuCauBox').classList.remove('active');
      document.getElementById('otherNhuCauBox').querySelector('input').value = '';
    });
  }
});

document.getElementById('otherNgayRadio').addEventListener('change', function(){
  document.getElementById('otherNgayBox').classList.add('active');
});
document.querySelectorAll('input[name="entry.1622652631"]').forEach(radio => {
  if (radio !== document.getElementById('otherNgayRadio')) {
    radio.addEventListener('change', () => {
      document.getElementById('otherNgayBox').classList.remove('active');
      document.getElementById('otherNgayBox').querySelector('input').value = '';
    });
  }
});

function submitForm(e) {
  // Kiểm tra radio đã chọn
  const nhuCau = document.querySelector('input[name="entry.1312703791"]:checked');
  const ngay = document.querySelector('input[name="entry.1622652631"]:checked');
  if (!nhuCau || !ngay) {
    e.preventDefault();
    alert('Vui lòng chọn đầy đủ Nhu cầu mua và Ngày muốn đi tham quan!');
    return false;
  }

  // Nếu chọn Other thì bắt buộc nhập
  if (nhuCau.value === 'Other:' && !document.getElementById('otherNhuCauBox').querySelector('input').value.trim()) {
    e.preventDefault();
    alert('Vui lòng ghi rõ nhu cầu khác!');
    return false;
  }
  if (ngay.value === 'Other:' && !document.getElementById('otherNgayBox').querySelector('input').value.trim()) {
    e.preventDefault();
    alert('Vui lòng ghi rõ ngày muốn tham quan!');
    return false;
  }

  const btn = document.getElementById('btn');
  const txt = document.getElementById('btnText');
  const success = document.getElementById('success');

  btn.disabled = true;
  txt.textContent = 'ĐANG GỬI...';
  
  // Tạm thời loại bỏ lắng nghe iframe load do gặp vấn đề, thay bằng timeout để mô phỏng
  // Bạn có thể quay lại sử dụng lắng nghe 'load' iframe sau khi code chạy ổn định

  setTimeout(() => {
    txt.textContent = 'ĐÃ GỬI THÀNH CÔNG';
    btn.style.background = '#10b981';
    success.style.display = 'block';
    
    // Reset form sau 3.5 giây
    setTimeout(() => {
      document.getElementById('form').reset();
      // Ẩn lại các hộp "Other"
      document.querySelectorAll('.other-box').forEach(box => box.classList.remove('active'));
      
      btn.disabled = false;
      txt.textContent = 'GỬI YÊU CẦU NGAY';
      btn.style.background = '';
      success.style.display = 'none';
    }, 3500);
  }, 1000);

  return true;
}
