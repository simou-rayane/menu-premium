let langue = "fr";
let data;
let panier={};

fetch("menu.json")
.then(r=>r.json())
.then(json=>{

data=json;

document.getElementById(
"restaurant-name"
).innerText=
data.restaurant.nom;

  document.getElementById(
"restaurant-address"
).innerText =
data.restaurant.adresse;

  document.getElementById(
"restaurant-phone"
).innerText =
"📞 " + data.restaurant.telephone;

afficherMenu();

});

function afficherMenu(){

let html="";

let boutons="";
  
data.categories.forEach(cat=>{

boutons += `
<button onclick="document.getElementById('${cat.nom[langue]}').scrollIntoView()">
${cat.emoji} ${cat.nom[langue]}
</button>
`;

html += `
<h2 id="id="cat-${cat.emoji}" style="padding:15px">
${cat.emoji} ${cat.nom[langue]}
</h2>
`;

cat.produits.forEach(p=>{

// Masquer les produits indisponibles
if(p.disponible === false){
return;
}

// Badge populaire
let badge = "";

if(p.populaire){
badge = "<span class='badge'>🔥 Populaire</span>";
}

// Prix normal ou promo
let prixAffiche = p.prix + " DH";

if(p.promo){
prixAffiche = `
<s>${p.prix} DH</s>
<span style="color:red;font-weight:bold;">
${p.promo} DH
</span>
`;
}

html += `

<div class="produit">

<img src="${p.image}">

<div class="info">

<h3>
${badge}
${p.nom[langue]}
</h3>

<p>${p.description[langue]}</p>

<div class="prix">
${prixAffiche}
</div>

<div class="actions">

<button
class="plus"
onclick="ajouter('${p.nom}',${p.promo || p.prix})">
+
</button>

<button
class="moins"
onclick="retirer('${p.nom}')">
-
</button>

</div>

</div>

</div>

`;

});
});

document.getElementById("categories").innerHTML = boutons;
  
document
.getElementById("menu")
.innerHTML=html;

}

function ajouter(nom,prix){

if(!panier[nom]){

panier[nom]={
qte:0,
prix:prix
};

}

panier[nom].qte++;

refresh();

}

function retirer(nom){

if(!panier[nom]) return;

panier[nom].qte--;

if(
panier[nom].qte<=0
){
delete panier[nom];
}

refresh();

}

function refresh(){

let compteur = 0;

for(let nom in panier){
compteur += panier[nom].qte;
}

document.getElementById("cart-count").innerText = compteur;
  
let html="";


  
let total=0;

for(let nom in panier){

let q=
panier[nom].qte;

let p=
panier[nom].prix;

total+=q*p;

html+=`
<div>
${nom}
x${q}
=
${q*p} DH
</div>
`;

}

if(html===""){
html="Panier vide";
}

document
.getElementById(
"panier-contenu"
)
.innerHTML=html;

document
.getElementById(
"total"
)
.innerText=total;

}

function commander(){

const params =
new URLSearchParams(
window.location.search
);

const table =
params.get("table") || "Non spécifiée";
  
let total=0;

let msg=
"Bonjour,%0A%0ACommande :%0A";

msg +=
"🪑 Table : " +
table +
"%0A%0A";
  
for(let nom in panier){

let q=
panier[nom].qte;

let p=
panier[nom].prix;

total+=q*p;

msg+=
"- "+nom+
" x"+q+
"%0A";

}

msg+=
"%0ATotal : "+
total+
" DH";

window.open(
"https://wa.me/"
+
data.restaurant.telephone
+
"?text="
+
msg
);

}

document
.getElementById("search")
.addEventListener("keyup", function(){

let texte = this.value.toLowerCase();

document
.querySelectorAll(".produit")
.forEach(carte=>{

if(
carte.innerText.toLowerCase().includes(texte)
){
carte.style.display = "block";
}
else{
carte.style.display = "none";
}

});

});

function toggleDarkMode(){

document.body.classList.toggle("dark");

}
