function getAllUserSocials(id) {
    $.ajax({
        url: allUserSocials_route + id,
        method: 'GET',
        contentType: 'application/json',
        success: function(response) {
            console.table(response)
            
            let ul = document.querySelector('.user-socials-list');
            ul.innerHTML = "";
            if(response != null){
                response.value.forEach(social =>{
                    loadPartialView('modules/sub_modules/config_social_option', document.querySelector('.user-socials-list'), true, social, "getAllUserSocials");
                })
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });   
}

function setSocialData(social, li) {
    li.id = "social-" + social.Id_Social;

    li.querySelector('.social-name').innerHTML = '<span class="fw-bold">Nombre</span>: ' + social.Name;
    social.Status ? null : li.querySelector('.social-name').classList.add('opacity-50');
    li.querySelector('.social-item .social-name-edit').value = social.Name;
    li.querySelector('.social-item .social-name-edit').id = "social-name-edit-" + social.Id_Social;
    
    li.querySelector('.social-description').innerHTML = '<span class="fw-bold">Descripción</span>: ' + social.Description;
    social.Status ? null : li.querySelector('.social-description').classList.add('opacity-50');
    li.querySelector('.social-item .social-description-edit').value = social.Description;
    li.querySelector('.social-item .social-description-edit').id = "social-description-edit-" + social.Id_Social;
    
    li.querySelector('.social-item .social-is-portfolio').id = "social-is-portfolio-" + social.Id_Social;
    social.Status ? null : li.querySelector('.social-is-portfolio').classList.add('opacity-50');
    $(li.querySelector('.social-item .label-social-is-portfolio')).attr('for', "social-is-portfolio-" + social.Id_Social);
    li.querySelector('.social-item .label-social-is-portfolio').innerText = (social.Is_Portfolio ? "Portfolio" : "Personal");
    li.querySelector('.social-item .social-is-portfolio').checked = social.Is_Portfolio;
    
    li.querySelector('.social-link').innerHTML = '<span class="fw-bold">Link</span>: ' + social.Link;
    social.Status ? null : li.querySelector('.social-link').classList.add('opacity-50');
    li.querySelector('.social-item .social-link-edit').value = social.Link;
    li.querySelector('.social-item .social-link-edit').id = "social-link-edit-" + social.Id_Social;
    
    li.querySelector('.social-item .social-status').id = "social-status-" + social.Id_Social;
    $(li.querySelector('.social-item .label-social-status')).attr('for', "social-status-" + social.Id_Social);
    li.querySelector('.social-item .label-social-status').innerText = (social.Status ? "On" : "Off");
    li.querySelector('.social-item .social-status').checked = social.Status;

    li.querySelector('.social-item .btn-social-edit').addEventListener('click', function () {
        let id = this.closest('li').id.split("-")[1]
        let formData = {
            Id_Social: id,
            Name: this.closest('li').querySelector(".social-name-edit").value,
            Description: this.closest('li').querySelector(".social-description-edit").value,
            Is_Portfolio: this.closest('li').querySelector('.social-is-portfolio').checked,
            Link: this.closest('li').querySelector(".social-link-edit").value,
            Status: this.closest('li').querySelector('.social-status').checked,
            Id_User: getLocalStorageValue("id_user")
        }
        editSocial(id, formData)
    })

    li.querySelector('.social-item .btn-social-delete').addEventListener('click', function () {
        let id = this.closest('li').id.split("-")[1]
        deleteSocial(id)
    })
}

function editSocial(id, formData) {
    $.ajax({
        url: editSocial_route + id,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
            console.table(response)
            getAllUserSocials(getLocalStorageValue("id_user"))
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });   
}

function deleteSocial(id) {
    $.ajax({
        url: deleteSocial_route + id,
        method: 'DELETE',
        contentType: 'application/json',
        success: function(response) {
            console.table(response)
            getAllUserSocials(getLocalStorageValue("id_user"))
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });   
}

function postSocial(formData) {
    // Enviar la solicitud AJAX
    $.ajax({
        url: postSocial_route,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
            console.table(response)
            
            let ul = document.querySelector('.user-socials-list');
            ul.innerHTML = "";
            if(response.Success){
                response.forEach(social => {
                    loadPartialView('modules/sub_modules/config_social_option', document.querySelector('.user-socials-list'), true, social, "getAllUserSocials");
                });
            }
            getAllUserSocials(getLocalStorageValue("id_user"))
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });   
}
