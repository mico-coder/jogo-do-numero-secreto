let listaSorteados = [];
let numerosDisponiveis = 10;
let numSecret = gerarNumeroAleatorio();
console.log(`O numero secreto é: ${numSecret}`);

responsiveVoice.enableWindowClickHook();
responsiveVoice.clickEvent();

let tentativas = 0;

alert('ALERTA: Essa página emite som!');

function exibirTextoHTML(tag, texto) {
    document.querySelector(tag).innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {    
    exibirTextoHTML('h1', 'Jogo do número secreto!');
    exibirTextoHTML('p', `Tente adivinhar o número secreto de 1 a ${numerosDisponiveis}`);
}
exibirMensagemInicial();

function verificarChute() {
    tentativas++;
    console.log(`Numero de tentativas é ${tentativas}`);

    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';

    let chute = parseInt(document.querySelector('input').value);
    if (chute == numSecret) {
        tentativas = tentativas > 1 ? tentativas : 'uma';
        exibirTextoHTML('h1', 'Acertou miseravi!');
        exibirTextoHTML('p', `Você advinhou o número secreto com ${tentativas} ${palavraTentativa}!`);

        document.querySelector('button').setAttribute('disabled', true);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else if(chute > numSecret) {
        exibirTextoHTML('p', 'O número secreto é menor que o chute!');
    } else {
        exibirTextoHTML('p', 'O número secreto é maior que o chute!');
    }
    limparCampo();
}

function gerarNumeroAleatorio() {
    let numeroSorteado = parseInt(Math.random() * numerosDisponiveis + 1);

    if(listaSorteados.length == numerosDisponiveis) {
        listaSorteados = [];
    }

    if(listaSorteados.includes(numeroSorteado)) {
        return gerarNumeroAleatorio();
    } else {
        listaSorteados.push(numeroSorteado);
        console.log(listaSorteados);
        return numeroSorteado;
    }
}

function limparCampo() {
    document.querySelector('input').value = '';
}

function reiniciarJogo() {
    exibirMensagemInicial();
    tentativas = 0;
    limparCampo();

    document.querySelector('button').removeAttribute('disabled');
    document.getElementById('reiniciar').setAttribute('disabled', true);

    numSecret = gerarNumeroAleatorio();
    console.log(`O numero secreto é: ${numSecret}`);
}