// ==============================
// BIBLIOTECA DE POESIAS
// Parte 1
// ==============================

// Banco de poesias
const poesias = [

{
    id:1,

    titulo:"Basorexia",

    categoria:"Romântica",

    data:"14/07/2026",

    dedicatoria:"Para aquela que despertou em mim um amor que eu desconhecia.",

    favorita:false,

    texto:`Alguns nem mesmo sonham
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

Mas sei que
o amor
jamais será pecado.`
},

{
    id:2,

    titulo:"Silêncio",

    categoria:"Melancólica",

    data:"01/06/2026",

    dedicatoria:"",

    favorita:false,

    texto:`O silêncio
também grita.

Ele fala
quando ninguém escuta.

Ele abraça
quem o mundo esqueceu.`
},

{
    id:3,

    titulo:"Esperança",

    categoria:"Esperança",

    data:"20/05/2026",

    dedicatoria:"Para todos que ainda acreditam.",

    favorita:false,

    texto:`Mesmo a noite
mais escura

não consegue impedir

o nascimento
de um novo amanhecer.`
}

];

// ==============================
// ELEMENTOS HTML
// ==============================

const biblioteca = document.getElementById("biblioteca");

const pesquisa = document.getElementById("pesquisa");

const categorias = document.getElementById("categorias");

const capa = document.getElementById("capaCategoria");


// ==============================
// CRIA UM CARD
// ==============================

function criarCard(poema){

return `

<div class="card categoria-${poema.categoria.toLowerCase()}">

<h2>${poema.titulo}</h2>

<div class="categoria">

📚 ${poema.categoria}

</div>

<div class="data">

📅 ${poema.data}

</div>

${
poema.dedicatoria != ""

?

`<div class="dedicatoria">

💌 ${poema.dedicatoria}

</div>`

:

""

}

<div class="texto">

${poema.texto}

</div>

</div>

`;

}


// ==============================
// MOSTRAR POESIAS
// ==============================

function mostrarPoesias(lista){

biblioteca.innerHTML="";

if(lista.length==0){

biblioteca.innerHTML=`

<h2>

Nenhuma poesia encontrada.

</h2>

`;

return;

}

lista.forEach(poema=>{

biblioteca.innerHTML+=criarCard(poema);

});

}


// ==============================
// MOSTRAR TODAS
// ==============================

mostrarPoesias(poesias);

// ==============================
// PARTE 2
// Pesquisa + Categorias + Tema
// ==============================

// Atualiza a capa da categoria
function atualizarCapa(categoria){

switch(categoria){

case "Romântica":

capa.style.background="linear-gradient(135deg,#6b0f1a,#b91372)";

capa.innerHTML=`
<h2>❤️ Poesias Românticas</h2>
<p>Versos escritos para quem faz o coração acelerar.</p>
`;
break;

case "Melancólica":

capa.style.background="linear-gradient(135deg,#16222A,#3A6073)";

capa.innerHTML=`
<h2>🌧️ Poesias Melancólicas</h2>
<p>Palavras que nasceram do silêncio e da saudade.</p>
`;
break;

case "Reflexiva":

capa.style.background="linear-gradient(135deg,#614385,#516395)";

capa.innerHTML=`
<h2>🍂 Poesias Reflexivas</h2>
<p>Textos para pensar, sentir e amadurecer.</p>
`;
break;

case "Esperança":

capa.style.background="linear-gradient(135deg,#56CCF2,#2F80ED)";

capa.innerHTML=`
<h2>🌅 Poesias de Esperança</h2>
<p>Mesmo depois da noite, sempre existe um amanhecer.</p>
`;
break;

case "Intensa":

capa.style.background="linear-gradient(135deg,#000000,#8E0E00)";

capa.innerHTML=`
<h2>🔥 Poesias Intensas</h2>
<p>Sentimentos fortes escritos sem medo.</p>
`;
break;

default:

capa.style.background="linear-gradient(135deg,#222,#444)";

capa.innerHTML=`
<h2>📚 Todas as Poesias</h2>
<p>Escolha uma categoria para começar.</p>
`;

}

}

// ==============================
// PESQUISA + FILTRO
// ==============================

function filtrar(){

const texto = pesquisa.value.toLowerCase();

const categoria = categorias.value;

let resultado = poesias.filter(poema=>{

const encontrouTexto=

poema.titulo.toLowerCase().includes(texto)

||

poema.texto.toLowerCase().includes(texto)

||

poema.categoria.toLowerCase().includes(texto)

||

poema.dedicatoria.toLowerCase().includes(texto);

const encontrouCategoria=

categoria==="Todas"

||

poema.categoria===categoria;

return encontrouTexto && encontrouCategoria;

});

mostrarPoesias(resultado);

atualizarCapa(categoria);

}

// ==============================
// EVENTOS
// ==============================

pesquisa.addEventListener("keyup",filtrar);

categorias.addEventListener("change",filtrar);


// ==============================
// TEMA CLARO E ESCURO
// ==============================

const botaoTema=document.getElementById("tema");

let temaSalvo=localStorage.getItem("tema");

if(temaSalvo){

document.body.className=temaSalvo;

botaoTema.textContent=

temaSalvo==="dark"

?

"🌙"

:

"☀️";

}

botaoTema.addEventListener("click",()=>{

if(document.body.classList.contains("dark")){

document.body.classList.remove("dark");

document.body.classList.add("light");

botaoTema.textContent="☀️";

localStorage.setItem("tema","light");

}else{

document.body.classList.remove("light");

document.body.classList.add("dark");

botaoTema.textContent="🌙";

localStorage.setItem("tema","dark");

}

});


// ==============================
// INICIAR CAPA
// ==============================

atualizarCapa("Todas");

// ==============================
// PARTE 3
// Favoritos + LocalStorage
// ==============================

// Carregar favoritos salvos
const favoritosSalvos = JSON.parse(localStorage.getItem("favoritos")) || [];

// Atualiza o array de poesias
poesias.forEach(poema => {
    poema.favorita = favoritosSalvos.includes(poema.id);
});

// Sobrescreve a função criarCard para incluir o botão de favorito
function criarCard(poema){

return `

<div class="card categoria-${poema.categoria.toLowerCase()}">

<div class="topo-card">

<h2>${poema.titulo}</h2>

<button
class="favorito"
onclick="alternarFavorito(${poema.id})">

${poema.favorita ? "❤️" : "🤍"}

</button>

</div>

<div class="categoria">

📚 ${poema.categoria}

</div>

<div class="data">

📅 ${poema.data}

</div>

${poema.dedicatoria != ""

?

`<div class="dedicatoria">

💌 ${poema.dedicatoria}

</div>`

:

""}

<div class="texto">

${poema.texto}

</div>

</div>

`;

}

// Alterna favorito
function alternarFavorito(id){

const poema = poesias.find(p => p.id == id);

poema.favorita = !poema.favorita;

const favoritos = poesias
.filter(p => p.favorita)
.map(p => p.id);

localStorage.setItem(
"favoritos",
JSON.stringify(favoritos)
);

filtrar();

}

// ==============================
// BOTÃO FAVORITAS
// ==============================

const botaoFavoritos =
document.getElementById("favoritos");

let mostrandoFavoritos = false;

botaoFavoritos.addEventListener("click",()=>{

mostrandoFavoritos = !mostrandoFavoritos;

if(mostrandoFavoritos){

const lista = poesias.filter(p=>p.favorita);

mostrarPoesias(lista);

botaoFavoritos.textContent="📚 Todas";

}else{

filtrar();

botaoFavoritos.textContent="❤️ Favoritas";

}

});

// ==============================
// CONTADOR
// ==============================

const contador=document.createElement("p");

contador.style.marginTop="20px";

contador.style.fontWeight="bold";

document.querySelector("header")
.appendChild(contador);

// Sobrescreve mostrarPoesias
function mostrarPoesias(lista){

biblioteca.innerHTML="";

contador.innerHTML=

`📖 ${lista.length} poesia(s) encontrada(s)`;

if(lista.length==0){

biblioteca.innerHTML=`

<h2>

Nenhuma poesia encontrada.

</h2>

`;

return;

}

lista.forEach(poema=>{

biblioteca.innerHTML+=criarCard(poema);

});

}
