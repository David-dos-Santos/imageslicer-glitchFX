/*

• La fonction de base :
    Permet de créer une tranche de l'image (elem),
    commençant à slice_top pixels du haut de l'image
    et mesurant slice_height pixels.
    
    Elle sera utilisée dans les fonctions suivantes.
    
    Note : cette fonction ne fait rien d'autre que générer une tranche. Le résultat est invisible tant que l'on n'a pas modifié l'aspect de cette tranche : décalage, redimensionnement, filtre, etc.
*/

function clone_slice(elem, slice_top, slice_height) {
    
    if (elem.tagName != "IMG") {return false;}
    
    var img_src = elem.getAttribute("src");
    
    var slice = document.createElement("div");
    
    elem.parentNode.appendChild(slice); // La tranche est ajoutée par-dessus l'image dans son conteneur
    
    slice.style.position = "absolute";
    
    slice.style.top = slice_top + "px";
    slice.style.height = slice_height + "px";
    
    slice.style.left = "0px";
    slice.style.width = "100%";
    
    // On lui donne en image de fond la même source que l'image à traiter
    slice.style.backgroundImage = "url(" + img_src + ")";
    
    // On décale la position de son image de fond pour correspondre à ce qui est affiché normalement à cet endroit
    slice.style.backgroundPosition = "0 -" + slice_top + "px";
    
    return slice; // On doit pouvoir manipuler la tranche en sortie de la fonction
    
}


/* Fonction intermédiaire :
    Utilise la première fonction de manière aléatoire.
    On a le contrôle sur la hauteur minimale et maximale de la tranche,
    le positionnement se fait au hasard (mais en contrôlant qu'on ne sort pas verticalement de l'image)
*/

function random_clone_slice(elem, min_slice_height, max_slice_height) {
    
    var slice_height = Math.round(min_slice_height + Math.random() * (max_slice_height - min_slice_height));
    
    var max_slice_top = elem.offsetHeight - slice_height; // Anti-débordement vertical
    
    var slice_top = Math.round(Math.random() * max_slice_top);
    
    return clone_slice(elem, slice_top, slice_height);
    
}


/* La fonction finale :
    Utilise la fonction précédente de manière récurrente.
    On a le contrôle, en plus, sur le nombre minimal et maximal de tranches à créer.
*/

function slice_image(elem, min_slice_height, max_slice_height, min_slice_count, max_slice_count) {
    
    var slice_count = Math.round(min_slice_count + (Math.random() * (max_slice_count - min_slice_count)));
    
    var slices_array = new Array();
    
    for (var i = 0; i < slice_count; i++) {
        
        var slice = random_clone_slice(elem, min_slice_height, max_slice_height);
        
        slices_array.push(slice);
        
    }
    
    return slices_array; // On retourne un tableau contenant toutes les tranches générées
    
}


/* Il nous faut aussi une fonction pour éventuellement détruire des tranches.
    Elle accepte un tableau comme argument (par exemple celui retourné préalablement par slice_image)
*/

function destroy_slices(slices_array) {
    
    slices_array.forEach(function(slice){
        
        slice.parentNode.removeChild(slice);
        
    });
    
}