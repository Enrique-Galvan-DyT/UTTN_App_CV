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
                    loadPartialView('modules/sub_modules/config_option', document.querySelector('.user-skills-list'), true, skill, "getAllUserSkills");
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
    skill.Status ? null : li.classList.add('opacity-50');
    li.querySelector('.skill-name').innerText = skill.Name;
    li.querySelector('.skill-item small').innerText = skill.Description;
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
                    loadPartialView('modules/sub_modules/config_option', document.querySelector('.user-skills-list'), true, skill, "getAllUserSkills");
                });
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });   
}