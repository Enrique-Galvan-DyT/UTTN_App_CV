function getAllUserSkills(id) {
    $.ajax({
        url: allUserSkills_route + id,
        method: 'GET',
        contentType: 'application/json',
        success: function(response) {
            console.table(response)
            
            let ul = document.querySelector('.user-skills-list');
            ul.innerHTML = "";
            if(response != null){
                response.value.forEach(skill =>{
                    loadPartialView('modules/sub_modules/config_skill_option', document.querySelector('.user-skills-list'), true, skill, "getAllUserSkills");
                })
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });   
}

function setSkillData(skill, li) {
    li.id = "skill-" + skill.Id_Skill;

    li.querySelector('.skill-name').innerText = skill.Name;
    skill.Status ? null : li.querySelector('.skill-name ').classList.add('opacity-50');
    li.querySelector('.skill-item .skill-name-edit').value = skill.Name;
    li.querySelector('.skill-item .skill-name-edit').id = "skill-name-edit-" + skill.Id_Skill;;
    
    li.querySelector('.skill-item .skill-status').id = "skill-status-" + skill.Id_Skill;
    $(li.querySelector('.skill-item .form-check-label')).attr('for', "skill-status-" + skill.Id_Skill);
    li.querySelector('.skill-item .form-check-label').innerText = (skill.Status ? "On" : "Off");
    li.querySelector('.skill-item .skill-status').checked = skill.Status;
    
    li.querySelector('.skill-item .btn-skill-edit').addEventListener('click', function () {
        let id = this.closest('li').id.split("-")[1]
        let formData = {
            Id_Skill: id,
            Name: this.closest('li').querySelector(".skill-name-edit").value,
            Status: this.closest('li').querySelector('.skill-status').checked,
            Id_User: getLocalStorageValue("id_user")
        }
        editSkill(id, formData)
    })
    li.querySelector('.skill-item .btn-skill-delete').addEventListener('click', function () {
        let id = this.closest('li').id.split("-")[1]
        deleteSkill(id)
    })
}

function postSkill(formData) {
    // Enviar la solicitud AJAX
    $.ajax({
        url: postSkill_route,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
            console.table(response)
            
            let ul = document.querySelector('.user-skills-list');
            ul.innerHTML = "";
            if(response.Success){
                response.forEach(skill => {
                    loadPartialView('modules/sub_modules/config_skill_option', document.querySelector('.user-skills-list'), true, skill, "getAllUserSkills");
                });
            }
            getAllUserSkills(getLocalStorageValue("id_user"))
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });   
}

function editSkill(id, formData) {
    $.ajax({
        url: editSkill_route + id,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
            console.table(response)
            getAllUserSkills(getLocalStorageValue("id_user"))
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });   
}

function deleteSkill(id) {
    $.ajax({
        url: deleteSkill_route + id,
        method: 'DELETE',
        contentType: 'application/json',
        success: function(response) {
            console.table(response)
            getAllUserSkills(getLocalStorageValue("id_user"))
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });   
}