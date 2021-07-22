const refreshLink = _ => [...document.querySelectorAll('a.follow')].forEach(af=>af.addEventListener('click',follow));

async function follow(event) {
	// Ne pas rediriger
	event.preventDefault();
	
	// Pré-traitement
	let cible = [...event.target.classList].find( k => k.match(/^_([a-z0-9]+_?)+$/i) );
	if(cible=== '_') {
		document.querySelector('div#filler').innerHTML = '';
		document.querySelector('main.index').style.display = '';
		return;
	}
	document.querySelector('main.index').style.display = 'none';
	let lien = `/data${cible.replace(/_/g,'/')}.json`;
	
	// Changement curseur
	document.body.style.cursor = 'wait';
	
	// Récupération du contenu
	try {
		const data = await fetch(lien).then( reponse => reponse.json() );
		console.log(data);
		
		let filler = document.querySelector('div#filler');
		filler.innerHTML = '';
		
		const TitreMajeur = document.createElement('h2');
		TitreMajeur.innerText = data.titre;
		filler.appendChild(TitreMajeur);
		
		for(let chapitre of data.contenu) {
			const Partie = document.createElement('article');
			
			const Titre = document.createElement('h4');
			Titre.innerText = chapitre.titre;
			Partie.appendChild(Titre);
			
			const Description = document.createElement('p');
			Description.innerText = chapitre.description;
			Partie.appendChild(Description);
			
			filler.appendChild(Partie);
		}
		
		refreshLink();
	} catch (e) {
		console.error(e);
	}
	
	// Retour du curseur normal
	document.body.style.cursor = '';
	
	return false;
}

refreshLink();