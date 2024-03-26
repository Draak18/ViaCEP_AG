document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("buscarButton")
    .addEventListener("click", function () {
      var cepValue = document.getElementById("cep").value;
      pesquisacep(cepValue);
    });

  document.getElementById("cep").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      var cepValue = document.getElementById("cep").value;
      pesquisacep(cepValue);
    }
  });
});

function limpa_formulário_cep() {
  document.getElementById("rua").innerText = "";
  document.getElementById("numero").innerText = "";
  document.getElementById("bairro").innerText = "";
  document.getElementById("cidade").innerText = "";
  document.getElementById("uf").innerText = "";
}

function meu_callback(conteudo) {
  if (!("erro" in conteudo)) {
    document.getElementById("lugarUf").innerText = conteudo.uf;
    document.getElementById("lugarCidade").innerText = conteudo.localidade;
    document.getElementById("lugarBairro").innerText = conteudo.bairro;
    document.getElementById("lugarRua").innerText = conteudo.logradouro;
    document.getElementById("lugarNumero").innerText = conteudo.numero;
  } else {
    limpa_formulário_cep();
    alert("CEP não encontrado.");
  }
}

function pesquisacep(valor) {
  var cep = valor.replace(/\D/g, "");

  if (cep != "") {
    var validacep = /^[0-9]{8}$/;

    if (validacep.test(cep)) {
      limpa_formulário_cep();

      var script = document.createElement("script");
      script.src =
        "https://viacep.com.br/ws/" + cep + "/json/?callback=meu_callback";
      document.body.appendChild(script);
    } else {
      limpa_formulário_cep();
      alert("Formato de CEP inválido.");
    }
  } else {
    limpa_formulário_cep();
  }
}
