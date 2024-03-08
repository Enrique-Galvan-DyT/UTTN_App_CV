
function login(formData) {
    // Enviar la solicitud AJAX
    $.ajax({
        url: loginUser_route,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
            console.table(response)
            // Obtener el valor de la cookie
            saveLocalStorageValue("id_user", response.value.Id_User);

            console.log('ID de usuario:', getLocalStorageValue("id_user"));
            loadPartialView('user/user_profile', appRender)

            getUserData(parseInt(response.value.Id_User));
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });        
}

function signup(formData) {
    // Enviar la solicitud AJAX
    $.ajax({
        url: signupUser_route,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
            console.table(response)
            
            if (response.Success) {
                // Obtener el valor de la cookie
                saveLocalStorageValue("id_user", response.value.Id_User);
                
                console.log('ID de usuario:', getLocalStorageValue("id_user"));
                loadPartialView('user/user_profile', appRender)
                
                getUserData(parseInt(response.value.Id_User));
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });        
}

function getUserData(id, func = null) {
    $.ajax({
        url: dataUser_route + id,
        method: 'GET',
        contentType: 'application/json',
        success: function(response) {
            var user = response
            if (func == "edit") {
                printEditUserData(user)
            }else if(func == "navbar"){
                printPictureNavbar(user)
            } else{
                printProfileUserData(user)
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });   
}

function printProfileUserData(user) {
    console.table(user)
    document.querySelector('.user-profile-picture').src = user.Document_Route == null || user.Document_Route == "" ? "public/img/logo.png" : (env.split('api')[0] + "Content/ProfilePictures/" + user.Document_Route.split('\\')[user.Document_Route.split('\\').length-1]);
    document.querySelector('.user-name').innerHTML = user.Name + ' ' + user.Lastname;
    document.querySelector('.user-title').innerHTML = user.Title;
    document.querySelector('.user-description').innerHTML = user.Description;
    document.querySelector('.user-background').classList.add(user.Background);
    cleanPlaceholders('.profile-data')
}

function printPictureNavbar(user) {
    console.table(user)
    document.querySelector('.nav-user-profile').src = user.Document_Route == null || user.Document_Route == "" ? "public/img/logo.png" : (env.split('api')[0] + "Content/ProfilePictures/" + user.Document_Route.split('\\')[user.Document_Route.split('\\').length-1]);
}

function editUser(formData) {
    // Enviar la solicitud AJAX
    $.ajax({
        url: postUser_route + getLocalStorageValue("id_user"),
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
            console.table(response)

            getUserData(getLocalStorageValue("id_user"), "edit");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });        
}

function printEditUserData(user) {
    console.table(user)
    document.querySelector('#user-document-route-edit').value = user.Document_Route == null || user.Document_Route == "" ? "public/img/logo.png" : (env.split('api')[0] + "Content/ProfilePictures/" + user.Document_Route.split('\\')[user.Document_Route.split('\\').length-1]);
    document.querySelector('#previewProfileContainer img').src = user.Document_Route == null || user.Document_Route == "" ? "public/img/logo.png" : (env.split('api')[0] + "Content/ProfilePictures/" + user.Document_Route.split('\\')[user.Document_Route.split('\\').length-1]);
    document.querySelector('#user-email-edit').value = user.Email;
    document.querySelector('#user-password-edit').value = user.Password;
    document.querySelector('#user-title-edit').value = user.Title;
    document.querySelector('#user-name-edit').value = user.Name;
    document.querySelector('#user-lastname-edit').value = user.Lastname;
    document.querySelector('#user-age-edit').value = user.Age;
    document.querySelector('#user-location-edit').value = user.Location;
    document.querySelector('#user-description-edit').value = user.Description;
    document.querySelector('#user-status-edit').checked = user.Status;
    document.querySelector('#user-type-edit').value = user.Type;
    document.querySelector('#user-background-edit').value = user.Background;
}

function changePictureFile(element){
    // Capturar los valores del formulario
    let user_file = element.files[0];

    // Construir el objeto con los datos del formulario
    var formData = new FormData()
    formData.append("file", user_file);
    formData.append("Id_User", parseInt(getLocalStorageValue("id_user")));
    editUserFile(parseInt(getLocalStorageValue("id_user")), formData)
}

function editUserFile(id, formData) {
    $.ajax({
        url: editProfileFile_route + id,
        method: 'PUT',
        data: formData, // Aquí se incluye el objeto FormData
        processData: false,
        contentType: false,
        success: function(response) {
            console.table(response)
            getUserData(getLocalStorageValue("id_user"), "edit");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });   
}

function getAllUsers() {
    $.ajax({
        url: allUsers_route,
        method: 'GET',
        contentType: 'application/json',
        success: function(response) {
            console.table(response)
            users = response;
            let ul = document.querySelector('.user-list');
            ul.innerHTML = "";
            response.forEach(user => {
                loadPartialView('modules/sub_modules/users_option_list', document.querySelector('.user-list'), true, user, "getAllUsers");
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });   
}

function setUserList(li, user){
    console.log(li);
    li.id = ('user_id_' + user.Id_User);
    li.querySelector('.user-name').innerHTML = user.Name + ' ' + user.Lastname;
    li.querySelector('.user-title').innerHTML = user.Title;
    li.querySelector('.total_jobs').innerHTML = 0;
    li.querySelector('.total_educations').innerHTML = 0;
    li.querySelector('.total_skills').innerHTML = 0;
    li.querySelector('.user-background').classList.add(user.Background);
    cleanPlaceholders('#' + li.id);
    document.querySelector('#' + li.id).addEventListener('click', function () {
        loadPartialView('user/user_profile', appRender);
        getUserData(parseInt(this.id.split('_')[2]));
    });

    getTotalEducations(user.Id_User, li)
    getTotalJobs(user.Id_User, li)
    getTotalSkills(user.Id_User, li)
}

function getTotalUsers() {
    $.ajax({
        url: totalUser_route,
        method: 'GET',
        contentType: 'application/json',
        success: function(response) {
            console.table(response)
            document.querySelector('.total_users').innerText = response; 
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });   
}

function loadUserData() {
    user_profile = document.querySelector('.user-profile');
    loadModules(moduleProfileData, user_profile, true);
    loadModules(moduleJobsData, user_profile, true);
    loadModules(moduleEducationalsData, user_profile, true);
    loadModules(moduleSkillsData, user_profile, true);
}