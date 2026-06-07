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

afficherMenu();

});

function afficherMenu(){

let html="";

let boutons="";
  
data.categories.forEach(cat=>{

boutons += `
<button onclick="document.getElementById('${cat.nom}').scrollIntoView()">
${cat.emoji} ${cat.nom}
</button>
`;

html += `
<h2 id="${cat.nom}" style="padding:15px">
${cat.emoji} ${cat.nom}
</h2>
`;

cat.produits.forEach(p=>{

  if(!p.disponible){
return;
}

let prixAffiche = p.prix + " DH";

if(p.promo){

prixAffiche = `
<s>${p.prix} DH</s>
<span style="color:red;font-weight:bold;">
 ${p.promo} DH
</span>
`;

}

html+=`

<div class="produit">

<img src="${p.image}">

<div class="info">

<h3>${p.nom}</h3>

<p>${p.description}</p>

<div class="prix">
${prixAffiche}
</div>

<div class="prix">
${prixAffiche}
</div>

<div class="actions">

<button
class="plus"
onclick="ajouter(
'${p.nom}',
${p.prix}
)">
+
</button>

<button
class="moins"
onclick="retirer(
'${p.nom}'
)">
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

let total=0;

let msg=
"Bonjour,%0A%0ACommande :%0A";

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
