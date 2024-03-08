function getAllUserJobs(id) {
    $.ajax({
        url: allUserJobs_route + id,
        method: 'GET',
        contentType: 'application/json',
        success: function(response) {
            console.table(response)
            
            let ul = document.querySelector('.user-jobs-list');
            ul.innerHTML = "";
            if(response != null){
                response.value.forEach(job =>{
                    loadPartialView('modules/sub_modules/config_job_option', document.querySelector('.user-jobs-list'), true, job, "getAllUserJobs");
                })
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });   
}

function getAllJobs() {
    $.ajax({
        url: allJobs_route,
        method: 'GET',
        contentType: 'application/json',
        success: function(response) {
            console.table(response)
            jobs = response;
            let ul = document.querySelector('.job-list');
            ul.innerHTML = "";
            response.forEach(job => {
                loadPartialView('modules/sub_modules/jobs_option_list', document.querySelector('.job-list'), true, job, "getAllJobs");
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });   
}

function setJobData(job, li) {
    li.id = "job-" + job.Id_Job;

    li.querySelector('.job-name').innerHTML = '<span class="fw-bold">Nombre</span>: <br/>' + job.Name;
    job.Status ? null : li.querySelector('.job-name').classList.add('opacity-50');
    li.querySelector('.job-item .job-name-edit').value = job.Name;
    li.querySelector('.job-item .job-name-edit').id = "job-name-edit-" + job.Id_Job;;
    
    li.querySelector('.job-position').innerHTML = '<span class="fw-bold">Posición</span>: <br/>' + job.Position;
    job.Status ? null : li.querySelector('.job-position').classList.add('opacity-50');
    li.querySelector('.job-item .job-position-edit').value = job.Position;
    li.querySelector('.job-item .job-position-edit').id = "job-position-edit-" + job.Id_Job;;
    
    li.querySelector('.job-description').innerHTML = '<span class="fw-bold">Descripción</span>: <br/>' + job.Description;
    job.Status ? null : li.querySelector('.job-description').classList.add('opacity-50');
    li.querySelector('.job-item .job-description-edit').value = job.Description;
    li.querySelector('.job-item .job-description-edit').id = "job-description-edit-" + job.Id_Job;;
    
    li.querySelector('.job-mode').innerHTML = '<span class="fw-bold">Modo</span>: <br/>' + job.Mode;
    job.Status ? null : li.querySelector('.job-mode').classList.add('opacity-50');
    li.querySelector('.job-item .job-mode-edit').value = job.Mode;
    li.querySelector('.job-item .job-mode-edit').id = "job-mode-edit-" + job.Id_Job;;
    
    li.querySelector('.job-location').innerHTML = '<span class="fw-bold">Ubicación</span>: <br/>' + job.Location;
    job.Status ? null : li.querySelector('.job-location').classList.add('opacity-50');
    li.querySelector('.job-item .job-location-edit').value = job.Location;
    li.querySelector('.job-item .job-location-edit').id = "job-location-edit-" + job.Id_Job;;
    
    li.querySelector('.job-startdate').innerHTML = '<span class="fw-bold">Fecha de inicio</span>: <br/>' + convertDateFromDB(job.Start_date);
    job.Status ? null : li.querySelector('.job-startdate').classList.add('opacity-50');
    li.querySelector('.job-item .job-startdate-edit').value = convertDateFromDB(job.Start_date);
    li.querySelector('.job-item .job-startdate-edit').id = "job-startdate-edit-" + job.Id_Job;;
    
    li.querySelector('.job-enddate').innerHTML = '<span class="fw-bold">Fecha fin</span>: <br/>' + convertDateFromDB(job.End_date);
    job.Status ? null : li.querySelector('.job-enddate').classList.add('opacity-50');
    li.querySelector('.job-item .job-enddate-edit').value = convertDateFromDB(job.End_date);
    li.querySelector('.job-item .job-enddate-edit').id = "job-enddate-edit-" + job.Id_Job;;
    
    li.querySelector('.job-item .job-status').id = "job-status-" + job.Id_Job;
    $(li.querySelector('.job-item .form-check-label')).attr('for', "job-status-" + job.Id_Job);
    li.querySelector('.job-item .form-check-label').innerText = (job.Status ? "On" : "Off");
    li.querySelector('.job-item .job-status').checked = job.Status;
    
    li.querySelector('.job-item .btn-job-edit').addEventListener('click', function () {
        let id = this.closest('li').id.split("-")[1]
        let formData = {
            Id_Job: id,
            Name: this.closest('li').querySelector(".job-name-edit").value,
            Position: this.closest('li').querySelector(".job-position-edit").value,
            Start_date: this.closest('li').querySelector(".job-startdate-edit").value,
            End_date: this.closest('li').querySelector(".job-enddate-edit").value,
            Location: this.closest('li').querySelector(".job-location-edit").value,
            Mode: this.closest('li').querySelector(".job-mode-edit").value,
            Description: this.closest('li').querySelector(".job-description-edit").value,
            Status: this.closest('li').querySelector('.job-status').checked,
            Id_User: getLocalStorageValue("id_user")
        }
        editJob(id, formData)
    })

    li.querySelector('.job-item .btn-job-delete').addEventListener('click', function () {
        let id = this.closest('li').id.split("-")[1]
        deleteJob(id)
    })
}

function convertDateFromDB(date) {
    // Convertir la fecha en un objeto Date
    let fecha = new Date(date);
    
    // Obtener los componentes de la fecha (día, mes, año)
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1; // Los meses en JavaScript son indexados desde 0
    let anio = fecha.getFullYear();

    // Formatear la fecha como "dd/mm/yyyy"
    return (dia < 10 ? '0' : '') + dia + '/' + (mes < 10 ? '0' : '') + mes + '/' + anio;
}

function convertDateFromInput(date) {
    // Suponiendo que 'date' es la fecha en el formato '01/01/2024'

    // Dividir la fecha en día, mes y año
    var partesFecha = date.split('/');

    // Crear un objeto Date con los componentes de la fecha
    var fecha = new Date(partesFecha[2], partesFecha[1] - 1, partesFecha[0]); // Restamos 1 al mes ya que los meses en JavaScript son indexados desde 0

    // Obtener los componentes de la fecha
    var dia = fecha.getDate();
    var mes = fecha.getMonth() + 1; // Sumamos 1 al mes para ajustar el índice a partir de 1
    var anio = fecha.getFullYear();

    // Formatear la fecha en el formato deseado ('YYYY-MM-DD')
    return anio + '-' + (mes < 10 ? '0' : '') + mes + '-' + (dia < 10 ? '0' : '') + dia;
}

function editJob(id, formData) {
    $.ajax({
        url: editJob_route + id,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
            console.table(response)
            getAllUserJobs(getLocalStorageValue("id_user"))
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });   
}

function deleteJob(id) {
    $.ajax({
        url: deleteJob_route + id,
        method: 'DELETE',
        contentType: 'application/json',
        success: function(response) {
            console.table(response)
            getAllUserJobs(getLocalStorageValue("id_user"))
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });   
}

function postJob(formData) {
    // Enviar la solicitud AJAX
    $.ajax({
        url: postJob_route,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
            console.table(response)
            
            let ul = document.querySelector('.user-jobs-list');
            ul.innerHTML = "";
            if(response.Success){
                response.forEach(job => {
                    loadPartialView('modules/sub_modules/config_job_option', document.querySelector('.user-jobs-list'), true, job, "getAllUserJobs");
                });
            }
            getAllUserJobs(getLocalStorageValue("id_user"))
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });   
}

function setJobList(li, job){
    console.log(li);
    li.id = ('job_id_' + job.Id_Job);
    li.querySelector('.job-position').innerText = job.Position;
    cleanPlaceholders('#' + li.id);
}

function getJobsData(id) {
    $.ajax({
        url: allUserJobs_route + id,
        method: 'GET',
        contentType: 'application/json',
        success: function(response) {
            console.table(response)
            /*
            */ 
            if(response.Success)
            {
                preloadModule("sub_modules/jobs_option")
                .done(function(data) {
                    printProfileUserJob(response.value, data)
                })
                .fail(function(xhr, status, error) {
                    console.error('Error al cargar módulo jobs_option: ', error);
                });
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });   
}

function printProfileUserJob(jobs, li) {
    console.table(jobs)
    let ul = document.querySelector('.job-list');
    ul.innerHTML = "";
    jobs.forEach(job => {
        ul.innerHTML += li;
        ul.lastChild.querySelector('.job-name').innerText = job.Name;
        ul.lastChild.querySelector('.job-position').innerText = job.Position;
        ul.lastChild.querySelector('.job-description').innerText = job.Description;
        ul.lastChild.querySelector('.job-start-date').innerText = convertDateFromDB(job.Start_date);
        ul.lastChild.querySelector('.job-end-date').innerText = convertDateFromDB(job.End_date);
        ul.lastChild.querySelector('.job-mode').innerText = job.Mode;
    });
    cleanPlaceholders('.jobs-data')
}

function getTotalJobs(id, element) {
    $.ajax({
        url: getJobsCount_route + id,
        method: 'GET',
        contentType: 'application/json',
        success: function(response) {
            console.table(response)
            if(element.querySelector('.total_jobs')){
                element.querySelector('.total_jobs').innerText = response; 
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Manejar cualquier error que ocurra durante la solicitud AJAX
            console.error('Error:', textStatus, errorThrown);
        }
    });   
}