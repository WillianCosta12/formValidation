const fields = document.querySelectorAll("[required]")

function ValidateField(field){

    function verifyErrors(){
        let foundError = false;

        for(let error in field.validity){

            if(!field.validity.valid && field.validity[error]){
                foundError = error;
            }

        }

        return foundError;
    }
    
    function customMessage(typeError){
        const messages = {
            text: {
                valueMissing: "Preencha esse Campo"
            },
            email:{
                valueMissing: "Email Obrigatório",
                typeMismatch: "Preencha um email válido"
            }
        }

        return messages[field.type][typeError]
    }

    function setMessage(message){
        
        const spanError = field.parentNode.querySelector("span.error")
        
        if(message){
            spanError.classList.add("active")
            spanError.innerHTML = message
        }else{
            spanError.classList.remove("active")
            spanError.innerHTML = ""
        }
    }

    return function(){

        const error = verifyErrors()

        if(error){
            const message = customMessage(error)

            field.style.borderColor = "red"
            setMessage(message)
        }else{
            field.style.borderColor = "green"
            setMessage()
        }
    }
}


function customValidation(event){

    const field = event.target;
    const validation = ValidateField(field);

    validation()

}

for(let field of fields ){
    field.addEventListener("invalid", event =>{
        
        event.preventDefault()

        customValidation(event)
    })
    field.addEventListener("blur", customValidation)

}


document.querySelector("form").addEventListener("submit", event => {
    console.log("enviar o formulário")
    event.preventDefault()
})