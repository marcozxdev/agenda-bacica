

/*
*cosas que faltan*

1 implemntar los botones y inputs y la logica para añadir tareas
2 implementar el boton que muestre las  tareas y un input o algo para borrar o marcar las tareas
ya echas
3 ps si mas adelante se le ocurre otra idea ps mira si ponerla 

*/ 

let btnIngresar = document.getElementById("ingresar")
let btnRegistrar = document.getElementById("registrar")

let modalIngresar = document.getElementById("modal-ingresar")
let modalRegistrar = document.getElementById("modal-registrar")
let modalInicio = document.getElementById('inicio')
let modalMenu = document.getElementById('menu-user')


/*docs la r || 0= registra y la i || 1 = ingresar*/ 
let id = 1

let userList = [{
    id: id++,
    name: "Marco",
    email: "saelmarco2@gmail.com",
    password: "123456789"
}]

function addUser(name, email, password) {
    let object = {
        id: id++,
        name: name,
        email: email,
        password: password
    }
    userList.push(object)
}

function innsertHtml(id, tagAndContent) {
    document.getElementById(id).innerHTML = tagAndContent
}

function userMenu(email, password) {
    let user = validation(email, 1,  password)

    if (user ==  'faliedVerification' || user == 'user no existe' ) {
        console.log('no paso las dos verificaciones')
        return 
        
    }
    if (!user) {
        console.log('no esta devolviendo el objeto')
        return
    }

    modalIngresar.style.display = 'none'
    modalRegistrar.style.display = 'none'
    modalInicio.style.display = 'none'
    modalMenu.style.display = 'flex'

    innsertHtml('m-saludo', `${user.name}`)

}


function validation(email, where, password) {

    let isUsuer = userList.find(u => u.email == email) 
    // if (id) {
    //     let idUser = userList.find(u => u.id == id)
    //     return idUser
    // }
    if (where === 1) { // 1 es para ingresar
        if (isUsuer) {
            if (isUsuer.email == email && isUsuer.password == password) {
                return  isUsuer
            } else {
                return 'faliedVerification'
            }
        } else {
            return 'user no existe'
        }
    } else if (where === 0) { // 0 es para rgistrar
        if (!isUsuer) {
            return 'espacio disponible'
        } else {
            return 'espacio ocupado'
        }
    } else {
        alert('alo pasa en la funcion validation')
    }


}



btnIngresar.addEventListener('click', () => {
    modalIngresar.style.display = "flex"
})

btnRegistrar.addEventListener('click', () => {
    modalRegistrar.style.display = "flex"
})




let formIngresar = document.getElementById("form-ingresar")
let formRegistrar = document.getElementById("form-registrar")

formIngresar.addEventListener('submit', (e) => {
    
    e.preventDefault()

    iemail = document.getElementById('i-email').value
    ipassword = document.getElementById('i-password').value

    if(!iemail || !ipassword) {
        innsertHtml('i-mensage', '<h3 style="color: red;"> asegurese de llenar todos los campos</h3>')
        return
    }

    let user = validation(iemail, 1, ipassword)

    if (user == 'faliedVerification' || user == 'user no existe') {
        innsertHtml('i-mensage', '<h3 style="color: red;"> email o contraseña incorrectos</h3>')
        return
    }

    userMenu(iemail,ipassword)



})



formRegistrar.addEventListener('submit', (e) => {

    e.preventDefault()

    let rname = document.getElementById('r-name').value
    let remail = document.getElementById('r-email').value
    let r1password = document.getElementById('r-1password').value
    let r2password = document.getElementById('r-2password').value
    
    
    if(!r1password || !r2password || !rname || !remail) {
        innsertHtml('r-mensage', '<h3 style="color: red;">Asegurese De llenar todos los campos</h3>')
        return
    } 
    if(r2password.length < 8) {
        innsertHtml('r-mensage', '<h3 style="color: red;">La contraseña debde tener como minimo 8 caracteres</h3>')
        return
    }
    if(r1password != r2password) {
        innsertHtml('r-mensage', '<h3 style="color: red;">Las Contraseñas no conciden</h3>')
        return
    }

    if (r1password == r2password) {
        let isUsuer = validation(remail, 0, r2password)

        if (isUsuer == 'espacio ocupado') {
        innsertHtml('r-mensage', '<h3 style="color: red;">Esta cuenta ya existe</h3>')
        return
        } else if (isUsuer == 'espacio disponible') {
            addUser(rname, remail, r2password)
            innsertHtml('r-mensage', '<h3 style="color: green;">Registrando cuenta....</h3>')
            userMenu(remail, r2password)
        } else {
            alert('algo inesperado paso ')
        }
    }
    else {
        alert('algo ta pasando')
    }


})



window.addEventListener("click", function (e) {
    if (e.target === modalIngresar) modalIngresar.style.display = "none";
    if (e.target === modalRegistrar) modalRegistrar.style.display = "none";
});
