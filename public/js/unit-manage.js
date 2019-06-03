function Edit(e) {
    document.getElementById('edit-wrapper').style.display='block';
    let strID = e.id;
    let n = strID.indexOf("-");
    let unitID = strID.substring(n+1, strID.length);
    let name = document.getElementById("name-"+unitID).innerHTML;
    let addr = document.getElementById("addr-"+unitID).innerHTML;
    let phone = document.getElementById("phone-"+unitID).innerHTML;
    let link = document.getElementById("link-"+unitID).innerHTML;
    document.getElementById("edit-table").innerHTML='<label class="create-label" for="edit-name">Tên đơn vị: </label>'+
    '<input id="edit-name" class="input-box" name="unitName" value="'+name+'" required/><br>'+
    '<label class="create-label" for="edit-type">Loại đơn vị: </label>'+
    '<select class="input-box" id="edit-type" name="unitType">'+
    '<option value="Bộ môn">Bộ môn</option>'+
    '<option value="Phòng thí nghiệm">Phòng thí nghiệm</option>'+
    '</select><br>'+
    '<label class="create-label" for="edit-addr">Địa chỉ: </label>'+
    '<input id="edit-addr" class="input-box" value="'+addr+'" name="address"/><br>'+
    '<label class="create-label" for="edit-tel">Điện thoại: </label>'+
    '<input id="edit-tel" class="input-box" value="'+phone+'" name="phone"/><br>'+
    '<label class="create-label" for="edit-web">Website: </label>'+
    '<input id="edit-web" class="input-box" value="'+link+'" name="website"/><br><br>'+
    '<button onclick="Save(this)" id="save-'+unitID+'" class="btn btn-primary">Lưu</button>'; 
}

function Save(e) {
    let strID = e.id;
    let n = strID.indexOf("-");
    let unitID = strID.substring(n+1, strID.length);
    let newName = document.getElementById("edit-name").value;
    let newType = document.getElementById("edit-type").value;
    let newAddr = document.getElementById("edit-addr").value;
    let newPhone = document.getElementById("edit-tel").value;
    let newWeb = document.getElementById("edit-web").value;

    console.log(newName);
    console.log(newType);
    console.log(newAddr);
    console.log(newPhone);
    console.log(newWeb);

    $.ajax({
        method: "post",
        url: "/unit-manage",
        datatype: "json",
        data: {
            id: unitID,
            name: newName,
            type: newType,
            address: newAddr,
            phone: newPhone,
            website: newWeb
        },
        success: function(data) {
            console.log(data);
        }
    })

    document.getElementById('edit-wrapper').style.display='none';
    
    document.getElementById("name-"+unitID).innerHTML=newName;
    document.getElementById("type-"+unitID).innerHTML=newType;
    document.getElementById("addr-"+unitID).innerHTML=newAddr;
    document.getElementById("phone-"+unitID).innerHTML=newPhone;
    document.getElementById("link-"+unitID).innerHTML=newWeb;
}

function Delete(e) {
    let strID = e.id;
    let n = strID.indexOf("-");
    let unitID = strID.substring(n+1, strID.length);
    let id = "delete-"+unitID;
    $('#'+id).closest('tr').remove();
    closeModal()   
    $.ajax({
        method: "delete",
        datatype: "json",
        url: "/unit-manage",
        data: {
            id: unitID,
            type: "delete"
        },
        success: function(data) {
            console.log(data);
        }
    })
}

function closeModal() {
    document.getElementById("delete-wrapper").style.display="none"
}

function confirmDelete(e) {
    document.getElementById('delete-wrapper').innerHTML='<div class="modal-content animate">'+    
        '<div>'+
            '<span onclick="closeModal()" class="close" title="Close PopUp">&times;</span>'+
            '<br>'+
            '<h2 style="text-align:center">Bạn có chắc chắn xóa không?</h2>'+
            '<br>'+
        '</div>'+
        '<div class="sub-container">'+
            '<button onclick="Delete(this)" id="confirm'+e.id+'" class="btn btn-danger" style="margin-right: 10px;">Có</button>'+
            '<button onclick="closeModal()" class="btn btn-secondary">Không</button>'+
        '</div>'+
    '</div>'+
    '</div>'
    document.getElementById('delete-wrapper').style.display = 'block'
}