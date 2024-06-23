const botao = document.querySelector('.form-btn');
const formulario = document.querySelector('.form');
const mensagensErro = document.querySelectorAll('.msg-error');
const camposFormulario = document.querySelectorAll('.form-input');

function exibirImc(imc, classificacao){
    const areaResultado = document.querySelector('.imc-result');
    const imcResultado = document.getElementById('imc');
    const classificacaoResultado = document.getElementById('classification');

    areaResultado.classList.add('active');
    
    imcResultado.innerHTML = `${imc.toFixed(1)}`;
    classificacaoResultado.innerHTML = `${classificacao}`;

    camposFormulario.forEach((campo)=>{
        campo.value = '';
        campo.classList.remove('checked');
    })
}

function calcularImc(){
    const peso = document.getElementById('peso').value;
    const altura = document.getElementById('altura').value;
    let classificacao;

    const alturaMetros = Number(altura / 100);
    const imc = Number(peso / (alturaMetros ** 2));

    if(imc < 17){
        classificacao = 'Muito Abaixo do Peso';
    }else if(imc < 18.5){
        classificacao = 'Abaixo do Peso';
    }else if(imc < 25){
        classificacao = 'Peso Normal';
    }else if(imc < 30){
        classificacao = 'Sobrepeso';
    }else if(imc < 35){
        classificacao = 'Obesidade Grau l';
    }else if(imc < 40){
        classificacao = 'Obesidade Grau ll';
    }else{
        classificacao = 'Obesidade Grau lll';
    }

    return exibirImc(imc, classificacao);
}

function verificarDados(event){
    event.preventDefault();
    
    let camposValidados = 0;

    camposFormulario.forEach((campo, index)=>{
        if(campo.value === '' || campo.value <= 0){
            campo.classList.add('error');
            mensagensErro[index].classList.add('active-error');
        }else if(campo.classList.contains('error')){
            campo.classList.remove('error');
            mensagensErro[index].classList.remove('active-error');
            campo.classList.add('checked');
        }else{
            campo.classList.add('checked');
        }
    });

    camposFormulario.forEach((campo)=>{
        if(campo.classList.contains('checked')){
            camposValidados += 1;
        }
    });

    if(camposValidados === 2){
        calcularImc();
    }
}

botao.addEventListener('click', verificarDados);