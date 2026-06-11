import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getDatabase,
ref,
set,
get
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {

apiKey: "AIzaSyDG7mx_59fts3MyaslzlubEVia7f-pmQYk",

authDomain:
"restaurant-atlas.firebaseapp.com",

databaseURL:
"https://restaurant-atlas-default-rtdb.europe-west1.firebasedatabase.app",

projectId:
"restaurant-atlas",

storageBucket:
"restaurant-atlas.firebasestorage.app",

messagingSenderId:
"287665557711",

appId:
"1:287665557711:web:6459ea0edf3d16577c27ba"

};

const app =
initializeApp(firebaseConfig);

const db =
getDatabase(app);

export {
db,
ref,
set,
get
};
