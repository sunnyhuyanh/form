function submitForm(e) {
  // Kiểm tra radio buttons đã chọn chưa
  const nhuCau = document.querySelector('input[name="entry.1312703791"]:checked');
  const thoiGian = document.querySelector('input[name="entry.1622652631"]:checked');
  if (!nhuCau || !thoiGian) {
    e.preventDefault();
    alert('Vui lòng chọn Nhu cầu quan tâm và Thời gian tham quan!');
    return false;
  }

  const btn = document.getElementById('btn');
  const txt = document.getElementById('btnText');
  const success = document.getElementById('success');

  btn.disabled = true;
  txt.textContent = 'ĐANG GỬI...';

  // Khi Google Form trả về (iframe load)
  // Lưu ý: window.addEventListener('message') không hoạt động trong ngữ cảnh của form POST đến Google Forms,
  // chúng ta cần lắng nghe sự kiện 'load' của iframe ẩn
  
  const iframe = document.getElementsByName('hidden_iframe')[0];
  
  const handler = function() {
    setTimeout(() => {
      txt.textContent = 'ĐÃ GỬI THÀNH CÔNG';
      btn.style.background = '#10b981'; // Màu xanh lá cây
      success.style.display = 'block';
      
      // Reset form sau 4 giây
      setTimeout(() => {
        document.getElementById('form').reset();
        btn.disabled = false;
        txt.textContent = 'GỬI YÊU CẦU NGAY';
        btn.style.background = ''; // Trở lại màu mặc định (từ CSS)
        success.style.display = 'none';
      }, 4000);
      
      iframe.removeEventListener('load', handler); // Xóa handler sau khi hoàn thành
    }, 800);
  };
  
  iframe.addEventListener('load', handler);
  
  return true;
}
