let menu = {
  restaurant: {
    nom: "Restaurant Atlas"
  },
  categories: []
};

function rafraichirInterface(){

  let select =
  document.getElementById("categorieSelect");

  select.innerHTML = "";

  menu.categories.forEach((cat,index)=>{

    select.innerHTML += `
      <option value="${index}">
        ${cat.nom}
      </option>
    `;

  });

  afficherProduits();
}

function ajouterCategorie(){

  let nom =
  document.getElementById(
  "categorieNom"
  ).value;

  if(!nom) return;

  menu.categories.push({
    nom: nom,
    emoji:"🍽️",
    produits:[]
  });

  document.getElementById(
  "categorieNom"
  ).value="";

  rafraichirInterface();
}

function ajouterProduit(){

  let index =
  document.getElementById(
  "categorieSelect"
  ).value;

  let nom =
  document.getElementById(
  "nomProduit"
  ).value;

  let prix =
  Number(
  document.getElementById(
  "prixProduit"
  ).value
  );

  let promo =
  Number(
  document.getElementById(
  "promoProduit"
  ).value
  );

  let image =
  document.getElementById(
  "imageProduit"
  ).value;

  if(!nom || !prix){
    return;
  }

  menu.categories[index]
  .produits
  .push({

    id:Date.now(),

    nom:{
      fr:nom,
      ar:nom,
      en:nom
    },

    prix:prix,

    promo:promo || null,

    description:{
      fr:"",
      ar:"",
      en:""
    },

    image:image,

    disponible:true,

    populaire:false

  });

  document.getElementById(
  "nomProduit"
  ).value="";

  document.getElementById(
  "prixProduit"
  ).value="";

  document.getElementById(
  "promoProduit"
  ).value="";

  document.getElementById(
  "imageProduit"
  ).value="";

  afficherProduits();
}

function afficherProduits(){

  let html="";

  menu.categories.forEach((cat,c)=>{

    html += `
      <h3>${cat.nom}</h3>
    `;

    cat.produits.forEach((p,pindex)=>{

      html += `

      <div class="produit">

      ${p.nom.fr}
      -
      ${p.prix} DH

      <button
      onclick="toggleProduit(${c},${pindex})">

      ${
      p.disponible
      ?
      'Masquer'
      :
      'Afficher'
      }

      </button>

      </div>

      `;

    });

  });

  html += `

  <hr>

  <h2>JSON généré</h2>

  <textarea
  style="width:100%;height:300px;">

${JSON.stringify(menu,null,2)}

  </textarea>

  `;

  document.getElementById(
  "listeProduits"
  ).innerHTML = html;

}

function toggleProduit(c,p){

  menu.categories[c]
  .produits[p]
  .disponible =

  !menu.categories[c]
  .produits[p]
  .disponible;

  afficherProduits();
}

rafraichirInterface();
