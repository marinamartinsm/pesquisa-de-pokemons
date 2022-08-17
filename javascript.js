const form = document.querySelector('form')

const mostrarImagens = (evento) => {
  evento.preventDefault() //Bloqueia o refresh da página
  let urlForm = "https://pokeapi.co/api/v2/pokemon/" //URL da pesquisa
  let name = document.getElementById("pokemon-name") //Valor no input name
  urlForm = urlForm + name.value //Concatena a URL com o nome informado
  urlForm = urlForm.toLowerCase() //Deixar tudo minúsculo para pesquisar corretamente na api
  console.log(urlForm)

  let infos = document.getElementById('info')
  let imagem = document.getElementById('pokemon-img')
  let html = ''

  fetch(urlForm).then(infos => infos.json()).then(function(data) {
    console.log(data)
    html = 'Name: '+ letraMauiscula(data.name) + '<br>'
    html = html + 'Type: '+ letraMauiscula(data.types[0].type.name)
    infos.innerHTML = html

    imagem.innerHTML = "<img src =' "+data.sprites.front_default +" '><img src =' "+data.sprites.back_default+" '>"
  }).catch(function (err) {
      if (err == `SyntaxError: Unexpected token 'N', "Not Found" is not valid JSON`) {
        html = 'Pokémon não encontrado! Tente novamente 😉'
        } else {
          html = 'Erro: ' + err
        }
      infos.innerHTML = html
  })

}

const letraMauiscula = (texto) => {
  return texto[0].toUpperCase() + texto.substr(1)
}

form.addEventListener('submit', mostrarImagens)