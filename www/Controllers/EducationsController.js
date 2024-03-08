function getAllUserEducations(id) {
    $.ajax({
        url: allUserEducations_route + id,
        method: 'GET',
        contentType: 'application/json',
        success: function(response) {
            console.table(response)
            
            let ul = document.querySelector('.user-educations-list');
            ul.innerHTML = "";
            if(response.Success){
                response.value.forEach(education =>{
                    loadPartialView('modules/sub_modules/config_education_option', document.querySelector('.user-educations-list'), true, education, "getAllUserEducations");
                })
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });   
}

function getAllEducations() {
    $.ajax({
        url: allEducations_route,
        method: 'GET',
        contentType: 'application/json',
        success: function(response) {
            console.table(response)
            educations = response;
            let ul = document.querySelector('.education-list');
            ul.innerHTML = "";
            response.forEach(education => {
                loadPartialView('modules/sub_modules/educations_option_list', document.querySelector('.education-list'), true, education, "getAllEducations");
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });   
}

function setEducationList(li, education){
    console.log(li);
    li.id = ('education_id_' + education.Id_Education);
    li.querySelector('.education-name').innerText = education.Name;
    cleanPlaceholders('#' + li.id);
}

function postEducation(formData) {
    // Enviar la solicitud AJAX
    $.ajax({
        url: postEducation_route,
        method: 'POST',
        data: formData, // Aquí se incluye el objeto FormData
        processData: false,
        contentType: false,
        success: function(response) {
            console.table(response)
            
            let ul = document.querySelector('.user-educations-list');
            ul.innerHTML = "";
            if(response.Success){
                response.forEach(education => {
                    loadPartialView('modules/sub_modules/config_educations_option', document.querySelector('.user-educations-list'), true, education, "getAllUserEducations");
                });
            }
            getAllUserEducations(getLocalStorageValue("id_user"))
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });   
}

function setEducationData(education, li) {
    li.id = "education-" + education.Id_Education;

    li.querySelector('.education-name').innerHTML = '<span class="fw-bold">Nombre</span>: <br/>' + education.Name;
    education.Status ? null : li.querySelector('.education-name').classList.add('opacity-50');
    li.querySelector('.education-item .education-name-edit').value = education.Name;
    li.querySelector('.education-item .education-name-edit').id = "education-name-edit-" + education.Id_Education;
    
    li.querySelector('.education-description').innerHTML = '<span class="fw-bold">Descripción</span>: <br/>' + education.Description;
    education.Status ? null : li.querySelector('.education-description').classList.add('opacity-50');
    li.querySelector('.education-item .education-description-edit').value = education.Description;
    li.querySelector('.education-item .education-description-edit').id = "education-description-edit-" + education.Id_Education;
    
    li.querySelector('.education-location').innerHTML = '<span class="fw-bold">Ubicación</span>: <br/>' + education.Location;
    education.Status ? null : li.querySelector('.education-location').classList.add('opacity-50');
    li.querySelector('.education-item .education-location-edit').value = education.Location;
    li.querySelector('.education-item .education-location-edit').id = "education-location-edit-" + education.Id_Education;
    
    li.querySelector('.education-document-display-option').innerHTML = '<span class="fw-bold">Display option</span>: <br/>' + education.Document_Display_Option;
    education.Status ? null : li.querySelector('.education-document-display-option').classList.add('opacity-50');
    li.querySelector('.education-item .education-document-display-option-edit').value = parseInt(education.Document_Display_Option);
    li.querySelector('.education-item .education-document-display-option-edit').id = "education-document-display-option-edit-" + education.Id_Education;
    
    li.querySelector('.education-content').innerHTML = '<span class="fw-bold">Content</span>: <br/>' + (education.Document_Route != null ? education.Document_Route.split('\\')[education.Document_Route.split('\\').length-1].split('=')[1] : "Empty");
    education.Status ? null : li.querySelector('.education-content').classList.add('opacity-50');
    
    // Obtener el elemento donde deseas mostrar el archivo
    var contentRouteElement = li.querySelector('.education-item .education-content-preview');
    
    // Verificar si la ruta del documento está definida
    if (education.Document_Route) {
        // Obtener la extensión del archivo
        let fileExtension = education.Document_Route.split('.').pop().toLowerCase();

        // Crear dinámicamente la etiqueta correspondiente
        let fileElement;
        if (fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png') {
            // Si es una imagen, crear una etiqueta img
            fileElement = document.createElement('img');
            fileElement.src = env.split('api')[0] + "Content/Educations/" + education.Document_Route.split('\\')[education.Document_Route.split('\\').length-1];
        } else if (fileExtension === 'pdf') {
            // Si es un PDF, crear una etiqueta embed
            fileElement = document.createElement('embed');
            fileElement.src = env.split('api')[0] + "Content/Educations/" + education.Document_Route.split('\\')[education.Document_Route.split('\\').length-1];
            fileElement.type = 'application/pdf';
            fileElement.width = '100%';
            fileElement.height = '400';
        } else {
            // Si es otro tipo de archivo no compatible, mostrar un mensaje de error
            contentRouteElement.textContent = 'Archivo no compatible';
            return; // Salir de la función
        }

        // Agregar la etiqueta al elemento deseado en el DOM
        contentRouteElement.appendChild(fileElement);
    } else {
        // Si la ruta del documento no está definida, mostrar un mensaje de error o vacío
        contentRouteElement.textContent = 'No hay archivo';
    }

    li.querySelector('.education-item .education-status').id = "education-status-" + education.Id_Education;
    $(li.querySelector('.education-item .form-check-label')).attr('for', "education-status-" + education.Id_Education);
    li.querySelector('.education-item .form-check-label').innerText = (education.Status ? "On" : "Off");
    li.querySelector('.education-item .education-status').checked = education.Status;
    
    li.querySelector('.education-item .btn-education-edit').addEventListener('click', function () {
        let id = this.closest('li').id.split("-")[1]
        
        // Capturar los valores del formulario
        let education = this.closest('li').querySelector(".education-name-edit").value;
        let educationdescription  = this.closest('li').querySelector(".education-description-edit").value;
        let educationlocation = this.closest('li').querySelector(".education-location-edit").value;
        let educationdocument_display_option = this.closest('li').querySelector(".education-document-display-option-edit").value;
        let education_status = this.closest('li').querySelector('.education-status').checked;

        // Construir el objeto con los datos del formulario
        var formData = new FormData()
        formData.append("Id_Education", id);
        formData.append("Name", education);
        formData.append("Description", educationdescription);
        formData.append("Location", educationlocation);
        formData.append("Document_Display_Option", educationdocument_display_option);
        formData.append("Status", education_status);
        formData.append("Id_User", parseInt(getLocalStorageValue("id_user")));
        editEducation(id, formData)
    })

    li.querySelector('.education-item .education_file_edit').addEventListener('change', function(){
        let id = this.closest('li').id.split("-")[1]
        
        // Capturar los valores del formulario
        let education_file = this.files[0];

        // Construir el objeto con los datos del formulario
        var formData = new FormData()
        formData.append("Id_Education", id);
        formData.append("file", education_file);
        formData.append("Id_User", parseInt(getLocalStorageValue("id_user")));
        editEducationFile(id, formData)
    })

    li.querySelector('.education-item .btn-education-delete').addEventListener('click', function () {
        let id = this.closest('li').id.split("-")[1]
        deleteEducation(id)
    })
    
    li.querySelector('.education-item .btn-education-delete-file').addEventListener('click', function () {
        let id = this.closest('li').id.split("-")[1]
        deleteEducationFile(id)
    })

}


function editEducation(id, formData) {
    $.ajax({
        url: editEducation_route + id,
        method: 'PUT',
        data: formData, // Aquí se incluye el objeto FormData
        processData: false,
        contentType: false,
        success: function(response) {
            console.table(response)
            getAllUserEducations(getLocalStorageValue("id_user"))
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });   
}

function editEducationFile(id, formData) {
    $.ajax({
        url: editEducationFile_route + id,
        method: 'PUT',
        data: formData, // Aquí se incluye el objeto FormData
        processData: false,
        contentType: false,
        success: function(response) {
            console.table(response)
            getAllUserEducations(getLocalStorageValue("id_user"))
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });   
}


function deleteEducation(id) {
    $.ajax({
        url: deleteEducation_route + id,
        method: 'DELETE',
        contentType: 'application/json',
        success: function(response) {
            console.table(response)
            getAllUserEducations(getLocalStorageValue("id_user"))
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });   
}
function deleteEducationFile(id) {
    $.ajax({
        url: deleteEducationFile_route + id,
        method: 'DELETE',
        contentType: 'application/json',
        success: function(response) {
            console.table(response)
            getAllUserEducations(getLocalStorageValue("id_user"))
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });   
}

function getEducationsData(id) {
    $.ajax({
        url: allUserEducations_route + id,
        method: 'GET',
        contentType: 'application/json',
        success: function(response) {
            console.table(response)

            if(response.Success)
            {
                preloadModule("sub_modules/educations_option")
                .done(function(data) {
                    printProfileUserEducation(response.value, data)
                })
                .fail(function(xhr, status, error) {
                    console.error('Error al cargar módulo educations_option: ', error);
                });
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });   
}

function printProfileUserEducation(educations, li) {
    console.table(educations)
    let ul = document.querySelector('.education-list');
    ul.innerHTML = "";
    educations.forEach(education => {
        ul.innerHTML += li;
        ul.lastChild.querySelector('.education-name').innerText = education.Name;
        ul.lastChild.querySelector('.education-description').innerText = education.Description;
        
        // Verificar si la ruta del documento está definida
        if (education.Has_Document) {
            // Obtener la extensión del archivo
            let fileExtension = education.Document_Route.split('.').pop().toLowerCase();

            // Crear dinámicamente la etiqueta correspondiente
            if (fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png') {
                // Si es una imagen, crear una etiqueta img
                if(education.Document_Display_Option == 1){
                    ul.lastChild.querySelector('div:first-child').innerHTML = '<div>'
                    + '<img src="' + env.split('api')[0] + "Content/Educations/" + education.Document_Route.split('\\')[education.Document_Route.split('\\').length-1] + '" alt="'+ education.Document_Route.split('\\')[education.Document_Route.split('\\').length-1] + '" class="h-auto education-route placeholder" style="width: 4rem;">'
                    + '</div>';
                }else if(education.Document_Display_Option == 2){
                    ul.lastChild.querySelector('div:first-child').innerHTML = '<div>'
                    +'<a href="#" onclick="descargarArchivo(' + education.Id_Education + ')" class="text-decoration-none" style="font-size: 3rem;"><i class="bi bi-cloud-download"></i></a>'
                    +'</div>';
                }else{
                    ul.lastChild.querySelector('div:first-child').innerHTML = '<div>'
                    + '<i class="bi bi-image text-white education-route" style="font-size: 3rem;"></i>'
                    + '</div>';
                }

            } else if (fileExtension === 'pdf') {
                // Si es un PDF, crear una etiqueta embed
                if(education.Document_Display_Option == 2){
                    ul.lastChild.querySelector('div:first-child').innerHTML = '<div>'
                    +'<a href="#" onclick="descargarArchivo(' + education.Id_Education + ')" class="text-decoration-none" style="font-size: 3rem;"><i class="bi bi-cloud-download"></i></a>'
                    +'</div>';
                }else{
                    ul.lastChild.querySelector('div:first-child').innerHTML = '<div>'
                    + '<i class="bi bi-filetype-pdf text-white education-route" style="font-size: 3rem;"></i>'
                    + '</div>';
                }
            } else {
                // Si es otro tipo de archivo no compatible, mostrar un mensaje de error
                ul.lastChild.querySelector('div:first-child').innerHTML = '<div>'
                + '<i class="bi bi-question-square text-white education-route" style="font-size: 3rem;"></i>'
                + '</div>';
                return; // Salir de la función
            }
            
            // Agregar la etiqueta al elemento deseado en el DOM
        } else {
            // Si la ruta del documento no está definida, mostrar un mensaje de error o vacío
            ul.lastChild.querySelector('div:first-child').innerHTML = '<div>'
            + '<i class="bi bi-mortarboard text-white education-route" style="font-size: 3rem;"></i>'
            + '</div>';
        }
    });
    cleanPlaceholders('.educations-data')
}

function descargarArchivo(id) {
    fetch(downloadEducationFile_route + id)
    .then(response => {
        // Verificar si la solicitud fue exitosa
        if (!response.ok) {
            throw new Error('Error al descargar el archivo');
        }
        console.log('Archivo descargado correctamente');
    })
    .catch(error => console.error('Error al descargar el archivo:', error));
}

function getTotalEducations(id, element) {
    $.ajax({
        url: getEducationsCount_route + id,
        method: 'GET',
        contentType: 'application/json',
        success: function(response) {
            console.table(response)
            if(element.querySelector('.total_educations')){
                element.querySelector('.total_educations').innerText = response; 
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });   
}