(function(){
    var formulario = document.formulario_registro,
        elementos = formulario.elements;

    //Functions
    var validarInputs = function(){
        for( var i = 0; i < elementos.length; i++){
            if(elementos[i].type == "text" || elementos[i].type == "password"){
                if(elementos[i].value == 0){
                    elementos[i].className = elementos[i].className + " error"
                    return false;
                } else{
                    elementos[i].className = elementos[i].className.replace(" error", "")
                }
            }
        }

        return true;
    };

    var show = function(e){
        var opciones = document.getElementsByName('ver');

        for(var i = 0; i < elementos.length; i++){
            if(elementos[i].type == "checkbox"){
                for(var j = 0; j < opciones.length; j++){
                    if(opciones[j].checked){
                        if(elementos[i].type == "password"){
                        }
                    }
                }
            }
        }
    }

    var enviar = function(e){
        if(!validarInputs()){
            console.log('Falto validar los Input');
            e.preventDefault();
        } else{
            console.log('Envia correctamente');
            //e.preventDefault();
        }
    };

    //Functions Blur y Focus
    var focusInput = function(){
        this.parentElement.children[1].className = "label active";
        this.parentElement.children[0].className = this.parentElement.children[0].className.replace(" error", "");
    };

    var blurInput = function(){
        if(this.value <= 0){
            this.parentElement.children[1].className = "label";
            this.parentElement.children[0].className = this.parentElement.children[0].className + " error";
        }
    };

    //Events
    formulario.addEventListener("submit", enviar);

    for( var i = 0; i < elementos.length; i++ ){
        if(elementos[i].type == "text" || elementos[i].type == "email" || elementos[i].type == "password"){
            elementos[i].addEventListener("focus", focusInput);
            elementos[i].addEventListener("blur", blurInput);
        }
    }
    
    formulario.addEventListener("click", show);

}())