  var aff =""; 
  var reste;
  var jeu = 0 ;
  var totalSup = 0;
	var joueur;
	var entree;
	var nbj = 4;
	var col = 0;
	var totalBas, totalSup;
	var saveLine;
	

			$(document).ready(function(){
				var date = new Date();
				mois = date.getMonth()+1;
				saveLine = date.getDate()+"/"+mois+"/"+date.getFullYear();
				

				$('#titre th').change(function(){	

					nbj = $(this).find('input').val();
					console.log(nbj," joueurs(change)");
				while(nbj<2 || nbj>6) {
					nbj = prompt("nombre de joueurs (de 2 à 6) ?"); 
					
				}
				Opacity();
					});
				
				addHili(1);
				
				Opacity();
				$('#haut th').change(function(){
					valeur = $(this).find('input').val();
				//	$(this).html(valeur);
					});
					
				$('#chance td').change(function(){
					$(this).removeClass('rouge');

					valeur = $(this).find('input').val();
					entree = parseInt(valeur);
					if(entree > -1 && entree < 31) { 
						
						$(this).html(valeur);
						var col = $(this).closest("td").index() ;
						totalise(col);
					}
					else {
						$(this).addClass('rouge');
						aff = "Erreur: le chance doit être un nombre entre 0 et 30";
							alert(aff);
					}
				});
				$('#haut td').change(function(){
					$(this).removeClass('rouge');
					valeur = $(this).find('input').val();
					jeu = $(this).parent().find(".droite").html();
					jeu = jeu.substring(1,2);
					var col = $(this).closest("td").index() ;
					var row = $(this).closest("tr").index() ;

/* ================================================================================= */
					entree = parseInt(valeur);
					
					cntl = /\d/.test(valeur);
					
					if(entree>0) {
						reste = entree % jeu;}
					if(entree > jeu * 5 || reste != 0 || !cntl) {
							$(this).addClass('rouge');
							aff = "Erreur: entrer un nombre multiple de " + jeu + " inférieur à " + (jeu*5 + 1);
							alert(aff);
							}
						else {

							$(this).html(valeur);
							var col = $(this).closest("td").index() ;
							totalise(col);
							}
						

				 });
/* ================================================================================= */
				$('#haut td').click(function(){
					longueur = $(this).html().length;
					var jeu = $(this).parent().find(".droite").html();

					if(longueur<3) {
						jeu = jeu.substring(1,1);

						aff = "Voulez-vous vraiment annuler ce coup : " + jeu;

						if(confirm(aff)) {
							$(this).html('<input type="text" length="2">');
						}
						
					}
				 });
/*================================================================================= */
				$('#chance td').click(function(){
					longueur = $(this).html().length;

					if(longueur<3) {
						var jeu = $(this).parent().find(".droite").html();
						aff = "Voulez-vous vraiment annuler ce coup : " + jeu;
						if(confirm(aff)) {
							$(this).html('<input type="text" length="2">');
						}
					}
				 });
/*================================================================================= */
				$('#bas td').click(function(){
					var cell = $(this).html();
					
					var lib = $(this).parent().find(".gauche").html();
					var points = lib.substring(lib.length-3,lib.length-1);

					var coup = lib.substring(0,lib.length-4);
					aff = "cell : " + cell + " - points : " + points + " - Longueur pts : " + points.length;

					if(cell == "0" || cell == points) {
							
						aff = ("Vous avez déjà joué " + coup+ "\n voulez le supprimer ?");
						
						rep = confirm(aff)
						if(rep) {
							$(this).html("");
						}
					
					}
				
					else {	
					var col = $(this).closest("td").index() ;
					
						ff = document.getElementsByTagName('table')[0].getElementsByTagName('tr')[1].cells[col];
						nomJoueur = $(ff).find('input').val();
						invite = nomJoueur + " : " + coup;
						rep = prompt(invite, points);
						if(rep!=null) { 
							$(this).html(points);
							}
						else $(this).html(0);	
						}
						
						
					var col = $(this).closest("td").index() ;
					totalise(col);
				});




				});
				function Opacity() {

					for(ncol=1; ncol<=6;ncol++) { 
						console.log("clear-tu ? ", ncol);
						for(jeu=1;jeu<18;jeu++) {
							console.log("Jeu : ",jeu);
							nomJ = document.getElementsByTagName('table')[0].getElementsByTagName('tr')[jeu].cells[ncol];
							nomJ.classList.remove('opa');
							nomJ.classList.add('opa1');
						}
					}
					nj=nbj
					nj++;
					console.log(nbj," Opacity - ",nj);

					for(nj; nj<7;nj++) { 
						console.log("Opaci-tu ? ", nj);
						for(jeu=1;jeu<18;jeu++) {
							nomJ = document.getElementsByTagName('table')[0].getElementsByTagName('tr')[jeu].cells[nj];
							nomJ.classList.remove('opa1');
							nomJ.classList.add('opa');

						}
					}
				}
				function remHili() {
					for(ncol=1; ncol<=nbj;ncol++) { 
						for(jeu=1;jeu<18;jeu++) {
							nomJ = document.getElementsByTagName('table')[0].getElementsByTagName('tr')[jeu].cells[ncol];
							nomJ.classList.remove('hili');
//							if(jeu=1) {nomJ.classList.remove('clign');}
						}
					}
				}
				function addHili(col) {
						image = document.getElementsByTagName('table')[0].getElementsByTagName('tr')[0].cells[0].innerHTML;
						
						ff = document.getElementsByTagName('table')[0].getElementsByTagName('tr')[1].cells[col];
						nomJoueur = $(ff).find('input').val();
						img="<img src='" + nomJoueur + ".jpg' width='90px;'>";
						document.getElementsByTagName('table')[0].getElementsByTagName('tr')[0].cells[0].innerHTML=img;
						for(jeu=1;jeu<18;jeu++) {
							nomJ = document.getElementsByTagName('table')[0].getElementsByTagName('tr')[jeu].cells[col];
							nomJ.classList.add('hili');
//							if(jeu=1) {nomJ.classList.add('clign');} 
						}
					}


					
				function classement() {
						var final = [
						//{nom:"Personne", score:0}				
						
						];
						mes = "<tr onClick='tok()'><th  colspan='3' style='height:130px;'><img src='yams.png' width='400px'/></th></tr>";
						for(col=1; col<=nbj;col++) {
							ff = document.getElementsByTagName('table')[0].getElementsByTagName('tr')[1].cells[col];
							const person = new Object;
							
							person.nom=$(ff).find('input').val();
							person.score=document.getElementsByTagName('table')[0].getElementsByTagName('tr')[20].cells[col].innerHTML*-1;
							final.push(person);
							saveLine+="," + person.score;
							
						}
						
						final.sort(function(a,b){return a.score - b.score});
						for(col=0; col<nbj;col++) {
							mes += "<tr><td><img src='" + final[col].nom + ".jpg' width='90px;'></td>"
							var str= final[col].score;
							nonSigne = Math.abs(str);
							mes += "<td>"+final[col].nom + " </td><td>" + nonSigne+"</td></tr>";
						}
						$("#tableau").removeClass("voir");
						$("#tableau").addClass("cache");
						$("#tableScore").removeClass("cache");
						$("#tableScore").addClass("voir");
						document.getElementById('tableScore').innerHTML = mes;

					
				}
				function tok() {
						$("#tableau").removeClass("cache");
						$("#tableau").addClass("voir");
						$("#tableScore").addClass("cache");
						$("#tableScore").removeClass("voir");
				}
				function totalise(col) {
					totalSup = 0;
					remHili();
					nomJ = document.getElementsByTagName('table')[0].getElementsByTagName('tr')[1].cells[col];
//					nomJ.classList.remove('bleu');
					ncol = col + 1;
					if(ncol > nbj) {
						ncol = 1;}
					addHili(ncol);
					nomJ = document.getElementsByTagName('table')[0].getElementsByTagName('tr')[1].cells[ncol];

//					nomJ.classList.add('bleu');
					for(jeu=2;jeu<8;jeu++) {

						valeur = document.getElementsByTagName('table')[0].getElementsByTagName('tr')[jeu].cells[col].innerHTML;

						if(valeur.length < 3) {
							totalSup += parseInt(valeur);
							}
						if(totalSup>62){
							totalSup+=35;
							document.getElementsByTagName('table')[0].getElementsByTagName('tr')[8].cells[col].innerHTML=35;
							}
						document.getElementsByTagName('table')[0].getElementsByTagName('tr')[9].cells[col].innerHTML=totalSup;
								}
					totalBas = 0;
					for(jeu=10;jeu<18;jeu++) {
						
						valeur = document.getElementsByTagName('table')[0].getElementsByTagName('tr')[jeu].cells[col].innerHTML;

						if(valeur.length>0 && valeur.length < 3  ) {

							totalBas += parseInt(valeur);
							}
						}

					document.getElementsByTagName('table')[0].getElementsByTagName('tr')[18].cells[col].innerHTML=totalBas;
						
								
					document.getElementsByTagName('table')[0].getElementsByTagName('tr')[20].cells[col].innerHTML=totalBas + totalSup;
					}
			