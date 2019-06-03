function Edit(e) {
    document.getElementById('edit-wrapper').style.display='block';
    let strId = e.id;
    let n = strId.indexOf("-");
    let userId = strId.substring(n+1, strId.length);
    let name = document.getElementById("name-"+userId).innerHTML;
    let username = document.getElementById("username-"+userId).innerHTML;
    let mail = document.getElementById("mail-"+userId).innerHTML;
    let type = document.getElementById("type-"+userId).innerHTML;
    let deg = document.getElementById("deg-"+userId).innerHTML;
    let company = document.getElementById("company-"+userId).innerHTML;

    document.getElementById("edit-table").innerHTML='<label class="create-label" for="edit-name">Họ và tên: </label>'+
    '<input id="edit-name" class="input-box" name="edit-name" value="'+name+'" required/><br>'+
    '<label class="create-label" for="edit-username">Tài khoản: </label>'+
    '<input id="edit-username" class="input-box" name="edit-username" value="'+username+'" required/><br>'+
    '<label class="create-label" for="edit-mail">VNU Email: </label>'+
    '<input id="edit-mail" class="input-box" name="edit-email" value="'+mail+'" required/><br>'+
    ' <label class="create-label" for="edit-pwd">Mật khẩu: </label>'+
    '<input id="edit-pwd" class="input-box" name="edit-password" type="password" required/><br>'+
    '<label class="create-label" for="edit-type">Loại CB: </label>'+
    '<input id="edit-type" class="input-box" name="edit-employeeType" value="'+type+'" required/><br>'+
    '<label class="create-label" for="edit-deg">Học vị: </label>'+
    '<input id="edit-deg" class="input-box" name="edit-degree" value="'+deg+'" required/><br>'+
    '<label class="create-label" for="edit-company">Nơi công tác: </label>'+
    '<input id="edit-company" class="input-box" name="edit-company" value="'+company+'" required/><br><br>'+
    '<button onclick="Save(this)" id="save-'+userId+'" class="btn btn-success">Lưu</button>'
}

function Save(e) {
    let strID = e.id;
    let n = strID.indexOf("-");
    let userID = strID.substring(n+1, strID.length);
    let newName = document.getElementById("edit-name").value;
    let newUsername = document.getElementById("edit-username").value;
    let newMail = document.getElementById("edit-mail").value;
    let newPassword = document.getElementById("edit-pwd").value;
    let newType = document.getElementById("edit-type").value;
    let newDegree = document.getElementById("edit-deg").value;
    let newCompany = document.getElementById("edit-company").value;

    $.ajax({
        method: "post",
        url: "/employee-manage",
        datatype: "json",
        data: {
            id: userID,
            name: newName,
            username: newUsername,
            mail: newMail,
            password: newPassword,
            type: newType,
            degree: newDegree,
            company: newCompany
        },
        success: function(data) {
            console.log(data);
        }
    })

    document.getElementById('edit-wrapper').style.display='none';
    
    document.getElementById("name-"+userID).innerHTML=newName;
    document.getElementById("username-"+userID).innerHTML=newUsername;
    document.getElementById("mail-"+userID).innerHTML=newMail;
    document.getElementById("type-"+userID).innerHTML=newType;
    document.getElementById("deg-"+userID).innerHTML=newDegree;
    document.getElementById("company-"+userID).innerHTML=newCompany;
} 

function Delete(e) {
    let strName = e.id;
    let n = strName.indexOf("-");
    let username = strName.substring(n+1, strName.length);
    let id = "delete-"+username;
    closeModal()
    $('#'+id).closest('tr').remove();
    $.ajax({
        method: "delete",
        datatype: "json",
        url: "/employee-manage",
        data: {
            username: username,
            type: "delete"
        },
        success: function(data) {
            console.log(data);
            success = 1;
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