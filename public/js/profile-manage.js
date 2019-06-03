function Edit(e) {
    document.getElementById('edit-wrapper').style.display='block';
    let strId = e.id;
    let n = strId.indexOf("-");
    let userId = strId.substring(n+1, strId.length);
    let type = document.getElementById("type-"+userId).innerHTML;
    let company = document.getElementById("company-"+userId).innerHTML;
    let deg = document.getElementById("deg-"+userId).innerHTML;
    let mail = document.getElementById("mail-"+userId).innerHTML;
    let web = document.getElementById("web-"+userId).innerHTML;
    console.log()

    document.getElementById("edit-table").innerHTML='<label class="create-label" for="edit-type">Loại CB: </label>'+
    '<input id="edit-type" class="input-box" name="edit-employeeType" value="'+type+'" required/><br>'+
    '<label class="create-label" for="edit-company">Nơi công tác: </label>'+
    '<input id="edit-company" class="input-box" name="edit-company" value="'+company+'" required/><br>'+
    '<label class="create-label" for="edit-deg">Học vị: </label>'+
    '<input id="edit-deg" class="input-box" name="edit-degree" value="'+deg+'" required/><br>'+
    '<label class="create-label" for="edit-mail">VNU Email: </label>'+
    '<input id="edit-mail" class="input-box" name="edit-email" value="'+mail+'" required/><br>'+
    '<label class="create-label" for="edit-web">Website: </label>'+
    '<input id="edit-web" class="input-box" name="edit-web" value="'+web+'" required/><br><br>'+
    '<button onclick="Save(this)" id="save-'+userId+'" class="btn btn-success">Lưu</button>'
}

function Save(e) {
    let strID = e.id;
    let n = strID.indexOf("-");
    let userID = strID.substring(n+1, strID.length);
    let newType = document.getElementById("edit-type").value;
    let newCompany = document.getElementById("edit-company").value;
    let newDeg = document.getElementById("edit-deg").value;
    let newMail = document.getElementById("edit-mail").value;
    let newWeb = document.getElementById("edit-web").value;

    console.log(newType)
    console.log(newCompany)
    console.log(newDeg)
    console.log(newMail)
    console.log(newWeb)

    $.ajax({
        method: "post",
        url: "/profile-manage",
        datatype: "json",
        data: {
            id: userID,
            type: newType,
            company: newCompany,
            degree: newDeg,
            mail: newMail,
            website: newWeb
        },
        success: function(data) {
            console.log(data);
        }
    })

    document.getElementById('edit-wrapper').style.display='none';
    
    document.getElementById("type-"+userID).innerHTML=newType;
    document.getElementById("company-"+userID).innerHTML=newCompany;
    document.getElementById("deg-"+userID).innerHTML=newDeg;
    document.getElementById("mail-"+userID).innerHTML=newMail;
    document.getElementById("web-"+userID).innerHTML=newWeb;
} 