function pegaCEP(cep) {
    return new Promise((resolve, reject) => {
        fetch('https://viacep.com.br/ws/' + cep + '/json/')
        .then(res => res.json()).then(data => {
          resolve(data)  
        }).catch(error => {
            reject(error);
        })
    })
}
function retornaEndereco() {
    let obj = document.getElementById('cep');
    pegaCEP(obj.value).then(dados => {
        console.dir(dados);
        console.log(cep)
        let objRua = document.getElementById('rua');  
        let objCidade = document.getElementById('cidade');
        let objBairro = document.getElementById('bairro');
        let objEstado = document.getElementById('estado');

        console.log(obj.value)
        objRua.value = dados.logradouro;
        objCidade.value = dados.localidade;
        objBairro.value = dados.bairro;
        objEstado.value = dados.uf;

    }).catch(erro => {
        
        console.log(erro);
    })
}

function validaForm() {
        let listaId = document.getElementsByTagName('input');

        for (let campo in listaId) {
            var objeto = listaId.item(campo);
            if (objeto.value == '' || objeto.value == null) {
                objeto.style.borderColor = 'red';
            } else if (objeto.value != '' || objeto.value != null) {
                objeto.style.borderColor = '';
            }
        }
    }

function excluirForm() {
    let listaId = document.getElementsByTagName('input');

    for (let campo in listaId) {
        var objeto = listaId.item(campo);
            if (objeto.value != '' || objeto.value != null) {
            objeto.value = null;
            objeto.style.borderColor = '';
        }
    }
}
