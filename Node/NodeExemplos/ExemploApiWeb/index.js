let codigoCliente = 0;
let ultimocCliente = 0;
let primeiroCliente = 0;
let codigoAnterior = 0;
let codigoPosterior = 0;
let clienteAtual = null;
let novoCliente = false;

function primeiro() {
  buscaPrimeiroCliente();
  codigoCliente = primeiroCliente;
  carregaCliente();
}

function ultimo() {
  buscaUltimoCodigoCliente();
  codigoCliente = ultimocCliente;
  carregaCliente();
}

function salvar() {
  clienteAtual.nome = document.getElementById("nome").value;
  clienteAtual.endereco = document.getElementById("endereco").value;
  clienteAtual.sexo = document.getElementById("sexo").value;
  clienteAtual.telefone = document.getElementById("telefone").value;

  let method = "put";
  let endereco = "/api/v1/clientes/" + codigoCliente;

  if (novoCliente) {
    method = "post";
    endereco = "/api/v1/clientes/";
  }

  fetch(endereco, {
    method: method,
    body: JSON.stringify(clienteAtual),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((res) => res.json())
    .then((data) => {
      if (novoCliente) {
        codigoCliente = data.id;
      }

      carregaCliente();
      let navegacao = document.getElementById("navegacao");
      let edicao = document.getElementById("edicao");
      navegacao.style.visibility = "visible";
      edicao.style.visibility = "hidden";
    })
    .catch((err) => {
      alert(err);
      console.log(err);
    });
}

function eliminaCliente() {
  var confirma = confirm("Você realmente deseja excluir esse registro ?");
  if (confirma) {
    console.log("vai deletar o: " + codigoCliente);
    fetch("/api/v1/clientes/" + codigoCliente, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Registro Eliminado!");
        buscaUltimoCodigoCliente();
        buscaPrimeiroCliente();
        codigoCliente = data;
        carregaCliente();
      })
      .catch((err) => console.log(err));
  }
}

function buscaUltimoCodigoCliente() {
  fetch("/api/v1/clientes/ultimo", {
    method: "get",
  })
    .then((res) => res.json())
    .then((data) => {
      ultimocCliente = data;
    })
    .catch((err) => console.log(err));
}
buscaUltimoCodigoCliente();

function buscaPrimeiroCliente() {
  fetch("/api/v1/clientes/primeiro/", {
    method: "get",
  })
    .then((res) => res.json())
    .then((data) => {
      primeiroCliente = data;
    })
    .catch((err) => console.log(err));
}
buscaPrimeiroCliente();

function proximo() {
  if (codigoPosterior != null) {
    codigoCliente = codigoPosterior;
    carregaCliente();
  }
}

function anterior() {
  if (codigoAnterior != null) {
    codigoCliente = codigoAnterior;
    carregaCliente();
  }
}

function buscaCliente() {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:5001/api/v1/clientes/" + codigoCliente)
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
function carregaCliente() {
  console.log("carregaCliente codigoCliente " + codigoCliente);
  if (codigoCliente == 0) {
    buscaPrimeiroCliente();
    codigoCliente = primeiroCliente;
  }

  console.log("carregaCliente depois codigoCliente " + codigoCliente);

  buscaCliente()
    .then((cliente) => {
      clienteAtual = cliente;

      let campoNome = document.getElementById("nome");
      campoNome.value = cliente.nome;
      campoNome.disabled = true;

      let campoTelefone = document.getElementById("telefone");
      campoTelefone.value = cliente.telefone;
      campoTelefone.disabled = true;

      let campoSexo = document.getElementById("sexo");
      campoSexo.value = cliente.sexo;
      campoSexo.disabled = true;

      let campoEndereco = document.getElementById("endereco");
      campoEndereco.value = cliente.endereco;
      campoEndereco.disabled = true;

      if (cliente.prev != null) {
        codigoAnterior = cliente.prev;
      } else {
        codigoAnterior = null;
      }

      if (cliente.next != null) {
        codigoPosterior = cliente.next;
      } else {
        codigoPosterior = null;
      }
      novoCliente = false;
    })
    .catch((error) => {
      throw "Cliente inexistente com este código " + codigoCliente;
    });
}

function modificar() {
  let campoNome = document.getElementById("nome");
  campoNome.disabled = false;

  let campoTelefone = document.getElementById("telefone");
  campoTelefone.disabled = false;

  let campoSexo = document.getElementById("sexo");
  campoSexo.disabled = false;

  let campoEndereco = document.getElementById("endereco");
  campoEndereco.disabled = false;

  let navegacao = document.getElementById("navegacao");
  let edicao = document.getElementById("edicao");

  navegacao.style.visibility = "hidden";
  edicao.style.visibility = "visible";
}

function adicionar() {
  let campoNome = document.getElementById("nome");
  campoNome.value = "";
  campoNome.disabled = false;

  let campoTelefone = document.getElementById("telefone");
  campoTelefone.value = "";
  campoTelefone.disabled = false;

  let campoSexo = document.getElementById("sexo");
  campoSexo.value = "";
  campoSexo.disabled = false;

  let campoEndereco = document.getElementById("endereco");
  campoEndereco.value = "";
  campoEndereco.disabled = false;

  let navegacao = document.getElementById("navegacao");
  let edicao = document.getElementById("edicao");

  navegacao.style.visibility = "hidden";
  edicao.style.visibility = "visible";
  novoCliente = true;
}

function cancelar() {
  carregaCliente();
  let navegacao = document.getElementById("navegacao");
  let edicao = document.getElementById("edicao");

  navegacao.style.visibility = "visible";
  edicao.style.visibility = "hidden";
}
