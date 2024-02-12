/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
    * "License"); you may not use this file except in compliance
    * with the License.  You may obtain a copy of the License at
    *
    * http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing,
    * software distributed under the License is distributed on an
    * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    * KIND, either express or implied.  See the License for the
    * specific language governing permissions and limitations
    * under the License.
    */
  
   let body, appRender, navRender;
   let user_profile, users

            
// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

// Función para cargar una vista parcial
function loadPartialView(viewName, divClass = null, isAppend = false, item = null, functionName = null) {
    $.ajax({
        url: local_sources + 'Views/' + viewName + '.html',
        method: 'GET',
        success: function(data) {
            divClass === null ? console.error('Elemento contenedor (divClass) no definido') : (isAppend ? $(divClass).append(data) : $(divClass).html(data));
            
            if (item != null) {
                if(functionName=="getAllUsers"){
                    setUserList(divClass.lastChild, item)
                }
                if (functionName=="getUserData") {
                    setUserData(item)
                }
                if(functionName=="getAllUserSkills"){
                    setSkillData(item, divClass.lastChild)
                }    
            }
            return true;
            //When all modules load, remove all placeholders
            /*
            document.querySelectorAll('.placeholder').forEach(function(item){
                item.classList.remove('placeholder')
            })
            */
        },
        error: function(xhr, status, error) {
            console.error('Error al cargar la vista parcial: ', error);
        }
    });
}

let moduleProfileData = "", 
    moduleJobsData = "", 
    moduleSkillsData = "", 
    moduleEducationalsData = "";

function preloadModule(viewName) {
    return $.get(local_sources + 'Views/modules/' + viewName + '.html');
}

preloadModule("skills_data")
    .done(function(data) {
        moduleSkillsData = data;
    })
    .fail(function(xhr, status, error) {
        console.error('Error al cargar módulo skills_data: ', error);
    });

preloadModule("profile_data")
    .done(function(data) {
        moduleProfileData = data;
    })
    .fail(function(xhr, status, error) {
        console.error('Error al cargar módulo profile_data: ', error);
    });

preloadModule("jobs_data")
    .done(function(data) {
        moduleJobsData = data;
    })
    .fail(function(xhr, status, error) {
        console.error('Error al cargar módulo jobs_data: ', error);
    });

preloadModule("educationals_data")
    .done(function(data) {
        moduleEducationalsData = data;
    })
    .fail(function(xhr, status, error) {
        console.error('Error al cargar módulo educationals_data: ', error);
    });


function loadModules(module, divClass, isAppend) {
    isAppend ? $(divClass).append(module) : $(divClass).html(module)
}    

function saveLocalStorageValue(name, value) {
    // Para almacenar utilizaremos el método "setItem"
    // pasándole como parámetros la clave y el valor a almacenar:
    window.localStorage.setItem(name, value);
    return console.log(name + " guardado exitosamente.")
}

function getLocalStorageValue(name) {
    //Para recuperar un valor utilizamos el método "getItem"
    //pasándole como parámetro la clave del valor deseado:
    return window.localStorage.getItem(name);
}

function removeLocalStorageValue(name) {
    // Y para borrar el método removeItem y la clave:
    window.localStorage.removeItem(name);
    return console.log(name + " eliminado exitosamente.")
}

function cleanPlaceholders(divClass) {
    let div = document.querySelector(divClass);
    div.querySelectorAll('.placeholder').forEach(element => {
        element.classList.remove('placeholder');
    });
}

function updateNavBar() {
    if (getLocalStorageValue("id_user") == null) {
        document.querySelector('.btn-login').classList.remove('d-none');
        document.querySelector('.btn-signup').classList.remove('d-none');
        document.querySelector('.btn-config').classList.add('d-none');
        document.querySelector('.btn-signout').classList.add('d-none');
    }else{
        document.querySelector('.btn-login').classList.add('d-none');
        document.querySelector('.btn-signup').classList.add('d-none');
        document.querySelector('.btn-config').classList.remove('d-none');
        document.querySelector('.btn-signout').classList.remove('d-none');
    }
}

setInterval(() => {
    updateNavBar()
}, 1000);

setInterval(() => {
    getTotalUsers()
}, 1000);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    //document.getElementById('deviceready').classList.add('ready');
    
    //Write your code here
    //...
}
