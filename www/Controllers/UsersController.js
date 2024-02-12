
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

function getUserData(id) {
    $.ajax({
        url: dataUser_route + id,
        method: 'GET',
        contentType: 'application/json',
        success: function(response) {
            var user = response
            setUserData(user)
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });   
}

function setUserData(user) {
    console.table(user)
    document.querySelector('.user-name').innerHTML = user.Name + ' ' + user.Lastname;
    document.querySelector('.user-title').innerHTML = user.Title;
    document.querySelector('.user-description').innerHTML = user.Description;
    document.querySelector('.user-background').classList.add(user.Background);
    cleanPlaceholders('.profile-data')
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
                loadPartialView('modules/sub_modules/users_option', document.querySelector('.user-list'), true, user, "getAllUsers");
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
    li.classList.remove('user_id_');
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