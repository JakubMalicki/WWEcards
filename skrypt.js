const obrazki = ['cena.jpg','finn balor.jpg','triple h.jpg','aj styles.jpg','edge.jpg','ronda rousey.jpg','becky lynch.jpg','charlotte flair.jpg','roman reigns.jpg','randy orton.jpg','kevin owens.jpg','seth rollins.jpg','bayley.jpg','sasha banks.jpg','sami zayn.jpg','baron corbin.jpg','rey mysterio.jpg','drew mcintyre.jpg','sheamus.jpg','bobby lashley.jpg'];

if(document.title == "WWE cards")
		sessionStorage.clear();

var wybor = sessionStorage.getItem('property');
var selekcja = [];
var isCardInGame = [];

for(i = 1; i <= 40; i++)
{
	isCardInGame[i] = true;
}

var LICZNIK = 0;
var BLOKADA = false;

let czyjaKolej = "Niczyja";
if(wybor == 2)
{
	document.getElementById('x').innerHTML = 'Teraz kolej gracza nr 1.';
	document.getElementById("odkrycia").innerHTML = "odkrycia: 0<br>wynik Gracza1: 0<br>Wynik Gracza2: 0";
	czyjaKolej = "Gracz1";
}
if(wybor == 3)
{
	czyjaKolej = "Człowiek";
	document.getElementById('x').innerHTML = 'Teraz twoja kolej.';
	document.getElementById("odkrycia").innerHTML = "odkrycia: 0<br>Twój wynik: 0<br>Wynik komputera: 0";
}

let wynikGracz1 = 0;
let wynikGracz2 = 0;
let wynikCzłowiek = 0;
let wynikKomputer = 0;

var kol, wier, wymiar;

//kol = 8; wier = 5; wymiar ="96px";
kol = 4; wier = 4; wymiar ="124px";

let ilosc_kart = kol * wier;
const startowa_ilosc_kart = ilosc_kart;
for(i=0;i<ilosc_kart ;i++){
	dodaj();
}



window.addEventListener('load',function(){ wygeneruj();});



try{
	document.getElementById('nr1').addEventListener('click',function(){sessionStorage.setItem('property', 1);});
	document.getElementById('nr2').addEventListener('click',function(){sessionStorage.setItem('property', 2);});
	document.getElementById('nr3').addEventListener('click',function(){sessionStorage.setItem('property', 3);});
	
}catch(error){}

function wygeneruj(){
	LICZNIK = 1;

	if(document.title == "WWE cards")
		wybor = 0;

	if (wybor==1 || wybor==2 || wybor==3)
	{
		let html ='';
		for(i=1;i<=wier;i++){
			for(j=1;j<=kol;j++){
				html += '<div class = "karta" id ="nr'+LICZNIK +'"></div>';
				LICZNIK++;
			}
			html += '<div style = "clear:both"></div>'; 
		}
		
		document.getElementById("kontener").innerHTML += html;
		
		karty = document.getElementsByClassName("karta");	
		
		for(LICZNIK = 1;LICZNIK <= kol*wier;LICZNIK++){
			let a = LICZNIK;
			document.getElementById('nr'+LICZNIK).addEventListener("click",function(){ odkryj(a);});
			karty[LICZNIK-1].style.height = wymiar;
			karty[LICZNIK-1].style.width = wymiar;
		}
	}
}
function dodaj(){
	
	let ilosc = 0;
	let czy = true;
	let x;
	
	while(czy == true || LICZNIK == ilosc_kart -1){
		ilosc = 0;
		x = Math.floor((Math.random() * ilosc_kart/2)+1);

		for(i=0;i<LICZNIK;i++){
			if(selekcja[i] == x)ilosc++;
		}
		if(ilosc<2 || LICZNIK==0){
			selekcja.push(x);
			LICZNIK++;
			czy = false;
		}
	}
}

var podejscie = 0;
var indeks_pierwszej = -1;
var id_pierwszej = -1;
var indeks_drugiej = -1;
var id_drugiej = -1;

function odkryj(podana){
	
	if(!BLOKADA){
		podejscie++;
		document.getElementById('nr'+podana).style.backgroundImage = 'url("img/'+obrazki[selekcja[podana-1]-1]+'")';
		if(podejscie == 1){
			
			indeks_pierwszej = selekcja[podana-1]-1;
			id_pierwszej = podana;
		}
		else if(id_pierwszej != podana){
			
			indeks_drugiej = selekcja[podana-1]-1;
			id_drugiej = podana;
			BLOKADA = true;
			setTimeout('schowaj2karty()',1000);
			podejscie = 0;
			}
		}
	}
function schowaj2karty(){
	
		if(indeks_pierwszej == indeks_drugiej && id_pierwszej != id_drugiej){
			document.getElementById('nr'+id_drugiej).style.opacity = 0;

			isCardInGame[id_pierwszej] = false;
			isCardInGame[indeks_drugiej] = false;

			var stary_element2 = document.getElementById('nr'+id_drugiej);
			var nowy_element2 = stary_element2.cloneNode(true);
			stary_element2.parentNode.replaceChild(nowy_element2, stary_element2);
			document.getElementById('nr'+id_pierwszej).style.opacity = 0;
			var stary_element1 = document.getElementById('nr'+id_pierwszej);
			var nowy_element1 = stary_element1.cloneNode(true);
			stary_element1.parentNode.replaceChild(nowy_element1, stary_element1);
			
			ilosc_kart -= 2;

			switch(czyjaKolej)
			{
				case "Gracz1":
					wynikGracz1++;
					break;
				case "Gracz2":
					wynikGracz2++;
					break;
				case "Człowiek":
					wynikCzłowiek++;
					break;
				case "Komputer":
					wynikKomputer++;
					break;
			}
		}
		else{
			document.getElementById('nr'+id_drugiej).style.backgroundImage = 'url("img/karta tyl.png")';
			document.getElementById('nr'+id_pierwszej).style.backgroundImage = 'url("img/karta tyl.png")';
		}
		LICZNIK++;

		if(wybor == 1)
			document.getElementById("odkrycia").innerText =`odkrycia: ${LICZNIK - startowa_ilosc_kart - 1}`;
		else if(wybor == 2)
			document.getElementById("odkrycia").innerHTML = `odkrycia: ${LICZNIK - startowa_ilosc_kart - 1}<br>wynik Gracza1: ${wynikGracz1}<br>wynik Gracza2: ${wynikGracz2}`;
		else if(wybor == 3)
			document.getElementById("odkrycia").innerHTML = `odkrycia: ${LICZNIK - startowa_ilosc_kart - 1}<br>Twój wynik: ${wynikCzłowiek}<br>Wynik komputera: ${wynikKomputer}`;

		BLOKADA = false;

		switch(czyjaKolej)
		{
		case "Gracz1":
			czyjaKolej = "Gracz2";
			document.getElementById('x').innerHTML = 'Teraz kolej gracza nr 2.';
			if(ilosc_kart == 0)napis_koncowy();
			break;
		case "Gracz2":
			czyjaKolej = "Gracz1";
			document.getElementById('x').innerHTML = 'Teraz kolej gracza nr 1.';
			if(ilosc_kart == 0)napis_koncowy();
			break;
		case "Człowiek":
			czyjaKolej = "Komputer";
			document.getElementById('x').innerHTML = 'Teraz kolej komputera.';
			firstId = 0;
			secondId = 0;

			do
			{
				firstId = Math.floor(Math.random() * 39) + 1;
			}while(!isCardInGame[firstId]);

			do
			{
				secondId = Math.floor(Math.random() * 39) + 1;
			}while(!isCardInGame[secondId] || secondId == firstId);

			odkryj(firstId);
			odkryj(secondId);

			if(ilosc_kart == 0)napis_koncowy();
			break;
		case "Komputer":
			document.getElementById('x').innerHTML = 'Teraz twoja kolej.';
			czyjaKolej = "Człowiek";

			// firstId = 0;
			// secondId = 0;

			// do
			// {
			// 	firstId = Math.floor(Math.random() * 39) + 1;
			// }while(!isCardInGame[firstId]);

			// do
			// {
			// 	secondId = Math.floor(Math.random() * 39) + 1;
			// }while(!isCardInGame[secondId] || secondId == firstId);

			// odkryj(firstId);
			// odkryj(secondId);

			if(ilosc_kart == 0)napis_koncowy();
			break;
		}

		if(ilosc_kart == 0)napis_koncowy();
}
function napis_koncowy(){
	let komunikat='</br></br></br>';
	komunikat += 'Dobra robota. Zasłużyłeś sobie na kubek kawki <i class="icon-emo-coffee"></i>';
	
	
	komunikat += '</br></br>Statystyki:<br> '+document.getElementById("odkrycia").innerHTML+ '</br>Jeszcze raz?</br><a href="index.html"></br>Zagraj jeszcze raz</a>';

	document.getElementById("kontener").innerHTML = komunikat;
}