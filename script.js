// ===================================
// BIBLIOTECA DE POESIAS
// Parte 1
// ===================================

// Banco de dados
const poesias = [

{
    id: 1,

    titulo: "Basorexia",

    categoria: "Romântica",

    data: "14/07/2026",

    dedicatoria: "Para aquela que mudou meu coração.",

    texto: `Alguns nem mesmo sonham
com o significado dessa palavra.

Alguns nunca experimentaram.

Eu era um deles.

Tudo mudou
quando encontrei
seus olhos,
seus cabelos,
seus lábios.

Deus...

Sinto como se fosse um pecador
por desejar tanto.

Mas sei
que o amor
jamais será pecado.`

},

{
    id: 2,

    titulo: "Silêncio",

    categoria: "Melancólica",

    data: "10/07/2026",

    dedicatoria: "",

    texto: `O silêncio
também fala.

Ele abraça
quem ninguém abraçou.

Ele permanece
quando todos vão embora.`

},

{
    id: 3,

    titulo: "Esperança",

    categoria: "Esperança",

    data: "05/07/2026",

    dedicatoria: "Para quem ainda acredita.",

    texto: `Mesmo na noite
mais escura,

sempre existe
um novo amanhecer.`

}

];

// ==========================
// Elementos da página
// ==========================

const biblioteca = document.getElementById("biblioteca");

// ==========================
// Criar Card
// ==========================

function criarCard(poesia){

const dedicatoria = poesia.dedicatoria
? `<div class="dedicatoria">💌 ${poesia.dedicatoria}</div>`
: "";

return `

<div class="card">

<h2>${poesia.titulo}</h2>

<div class="categoria">
📚 ${poesia.categoria}
</div>

<div class="data">
📅 ${poesia.data}
</div>

${dedicatoria}

<div class="texto">
${poesia.texto}
</div>

</div>

`;

}

// ==========================
// Mostrar poesias
// ==========================

function mostrarPoesias(lista){

biblioteca.innerHTML = "";

if(lista.length === 0){

biblioteca.innerHTML = `
<h2>Nenhuma poesia encontrada.</h2>
`;

return;

}

lista.forEach(poesia=>{

biblioteca.innerHTML += criarCard(poesia);

});

}

// ==========================
// Inicialização
// ==========================

mostrarPoesias(poesias);

// ===================================
// PARTE 2
// Pesquisa + Categorias + Capas
// ===================================

// Elementos
const pesquisa = document.getElementById("pesquisa");
const seletorCategoria = document.getElementById("categorias");
const capaCategoria = document.getElementById("capaCategoria");

// Atualiza a capa da categoria
function atualizarCapa(categoria){

    let titulo = "📚 Todas as Poesias";
    let descricao = "Escolha uma categoria para começar.";
    let fundo = "linear-gradient(135deg,#222,#444)";

    switch(categoria){

        case "Romântica":

            titulo = "❤️ Poesias Românticas";
            descricao = "Versos escritos pelo coração.";
            fundo = "linear-gradient(135deg,#5f0a87,#a4508b)";
            break;

        case "Melancólica":

            titulo = "🌧️ Poesias Melancólicas";
            descricao = "Palavras nascidas da saudade.";
            fundo = "linear-gradient(135deg,#16222A,#3A6073)";
            break;

        case "Reflexiva":

            titulo = "🍂 Poesias Reflexivas";
            descricao = "Pensamentos transformados em versos.";
            fundo = "linear-gradient(135deg,#614385,#516395)";
            break;

        case "Esperança":

            titulo = "🌅 Poesias de Esperança";
            descricao = "Onde existe fé, existe um novo amanhecer.";
            fundo = "linear-gradient(135deg,#56CCF2,#2F80ED)";
            break;

        case "Intensa":

            titulo = "🔥 Poesias Intensas";
            descricao = "Sentimentos escritos sem medo.";
            fundo = "linear-gradient(135deg,#000000,#8E0E00)";
            break;

    }

    capaCategoria.style.background = fundo;

    capaCategoria.innerHTML = `
        <h2>${titulo}</h2>
        <p>${descricao}</p>
    `;

}

// Pesquisa e filtro
function filtrarPoesias(){

    const textoPesquisa = pesquisa.value.toLowerCase().trim();

    const categoriaSelecionada = seletorCategoria.value;

    const resultado = poesias.filter(poesia => {

        const correspondeTexto =

            poesia.titulo.toLowerCase().includes(textoPesquisa) ||

            poesia.texto.toLowerCase().includes(textoPesquisa) ||

            poesia.dedicatoria.toLowerCase().includes(textoPesquisa) ||

            poesia.categoria.toLowerCase().includes(textoPesquisa);

        const correspondeCategoria =

            categoriaSelecionada === "Todas" ||

            poesia.categoria === categoriaSelecionada;

        return correspondeTexto && correspondeCategoria;

    });

    mostrarPoesias(resultado);

    atualizarCapa(categoriaSelecionada);

}

// Eventos
pesquisa.addEventListener("input", filtrarPoesias);

seletorCategoria.addEventListener("change", filtrarPoesias);

// Inicializa a capa
atualizarCapa("Todas");

//===================================
// PARTE 3
// Tema + Favoritos
//===================================


// ---------- TEMA ----------

const botaoTema = document.getElementById("tema");

const temaSalvo = localStorage.getItem("tema");

if(temaSalvo){

document.body.className = temaSalvo;

botaoTema.textContent =

temaSalvo=="dark"

?

"🌙"

:

"☀️";

}


botaoTema.onclick=()=>{

if(document.body.classList.contains("dark")){

document.body.classList.remove("dark");

document.body.classList.add("light");

localStorage.setItem("tema","light");

botaoTema.textContent="☀️";

}else{

document.body.classList.remove("light");

document.body.classList.add("dark");

localStorage.setItem("tema","dark");

botaoTema.textContent="🌙";

}

}



// ---------- FAVORITOS ----------

let favoritos=

JSON.parse(localStorage.getItem("favoritos"))||[];



function favorito(id){

if(favoritos.includes(id)){

favoritos=favoritos.filter(x=>x!=id);

}else{

favoritos.push(id);

}

localStorage.setItem(

"favoritos",

JSON.stringify(favoritos)

);

filtrarPoesias();

}



// ---------- NOVA VERSÃO DOS CARDS ----------

function criarCard(poesia){

const cor={

"Romântica":"romantica",

"Melancólica":"melancolica",

"Esperança":"esperanca",

"Reflexiva":"reflexiva",

"Intensa":"intensa"

}[poesia.categoria]||"";



const icone=

favoritos.includes(poesia.id)

?

"❤️"

:

"🤍";



const dedicatoria=

poesia.dedicatoria!==""

?

`<div class="dedicatoria">

💌 ${poesia.dedicatoria}

</div>`

:

"";



return`

<div class="card ${cor}">

<div class="topo-card">

<h2>${poesia.titulo}</h2>

<button

class="btnFavorito"

onclick="favorito(${poesia.id})">

${icone}

</button>

</div>

<div class="categoria">

📚 ${poesia.categoria}

</div>

<div class="data">

📅 ${poesia.data}

</div>

${dedicatoria}

<div class="texto">

${poesia.texto}

</div>

</div>

`;

}



// ---------- CONTADOR ----------

const contador=document.createElement("p");

contador.id="contador";

document.querySelector("header")

.appendChild(contador);



// ---------- ATUALIZA A TELA ----------

const mostrarOriginal=mostrarPoesias;



mostrarPoesias=function(lista){

contador.innerHTML=

`📖 ${lista.length} poesia(s)`;

mostrarOriginal(lista);

}



// ---------- BOTÃO FAVORITAS ----------

const botaoFavoritos=

document.getElementById("favoritos");



let apenasFavoritas=false;



botaoFavoritos.onclick=()=>{

apenasFavoritas=!apenasFavoritas;



if(apenasFavoritas){

botaoFavoritos.innerHTML="📚 Todas";

mostrarPoesias(

poesias.filter(p=>

favoritos.includes(p.id)

)

);

}else{

botaoFavoritos.innerHTML="❤️ Favoritas";

filtrarPoesias();

}

}



filtrarPoesias();
