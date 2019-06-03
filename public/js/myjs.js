var modal = document.getElementById('modal-wrapper');
var excel = document.getElementById('excel-wrapper');
var deleteWrap = document.getElementById('delete-wrapper');
var editWrap = document.getElementById('edit-wrapper');
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  } else if (event.target == excel) {
    excel.style.display = "none";
  } else if (event.target == deleteWrap) {
    deleteWrap.style.display = "none";
  } else if (event.target == editWrap) {
    editWrap.style.display = "none";
  }
}

$(document).ready(function () {
  $("#myInput").change(function () {
    var value = $(this).val();
    $("#myTable tr").each(function () {
      if ($(this).text().includes(value)) {
        $(this).show();
      } else $(this).hide();
    });
  });

  $("#deg-select").change(function () {
    var value = $(this).val();
    $("#myTable tr").each(function () {
      if ($(this).text().includes(value)) {
        $(this).show();
      } else $(this).hide();
    });
  });

  // $("#type-select").change(function() {
  //   var value = $(this).val();
  //   $("#myTable tr").each(function() {
  //       if ($(this).text().includes(value)) {
  //         $(this).show();
  //       } else $(this).hide();
  //   });
  // });
  // Hàm active tab nào đó
  function activeTab(obj)
  {
      // Xóa class active tất cả các tab
      $('.tab-wrapper ul li').removeClass('active');

      // Thêm class active vòa tab đang click
      $(obj).addClass('active');
      // Lấy href của tab để show content tương ứng
      var id = $(obj).find('a').attr('href');
      // Ẩn hết nội dung các tab đang hiển thị
      $('.tab-item').hide();
      // Hiển thị nội dung của tab hiện tại
      $(id) .show();
  }
  // Sự kiện click đổi tab
  $('.tab li').click(function(){
      activeTab(this);
      return false;
  });

  // Active tab đầu tiên khi trang web được chạy
  activeTab($('.tab li:first-child'));
  $(".viewSection a").click(function () {
    var $table = $(this).parent().preAll("div").find('table')
    $table.find("tr:gt(3)").toggle();
    $(this).html($(this).html() == 'view more' ? 'view less' : 'view more');
  });

  $(".123").click(function () {
    const t = $(this).attr('id');
    const requestURL = 'search-unit/' + t;
    console.log("making ajax request to: ", requestURL);

    $.ajax({
      url: requestURL,
      type: 'GET',
      datatype: 'json',
      success: (data) => {
        console.log('You received some data!', data[0].name);
        if (data[0].employeeId) {
          //console.log(data[0].name);
          $('#unitEmployeeID').html('Id : ' + data[0].employeeId);
          $('#unitName').html('Họ và Tên : ' + data[0].name);
          $('#unitDegree').html('Học vị : ' + data[0].degree);
          $('#unitCompany').html('Đơn vị : ' + data[0].company)

        } else {
          console.log("can't find");
        }
      }
    })
  })

  var uniqueItems = [];
  $(".someId").each(function(i,e){
      var item = $.trim($(e).text());
      if(uniqueItems.indexOf(item) == -1)
          uniqueItems.push(item);
      else
          $(e).remove();
  });
  
  $('.allId').click(function(){
    $("#myTable tr").each(function() {
          $(this).show("slow");
    });
  });
  
  $('.someId').click(function(){
    var t = $(this).attr('id');
    $("#myTable tr").each(function() {
  
        if ($(this).text().includes(t)) {
          //console.log($(this).text());
          $(this).show("slow");
        } else {
          u = $(this).hide();
        }
    });
  });
});