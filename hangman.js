////////////Words for game///////////////
var wordLib = [
	['YACHT RACING','PATO','SLOOP SAILING','KABADDI','ARCHERY','CAPOEIRA','LACROSSE','CHILEAN RODEO','TABLE TENNIS','TEJO','BASEBALL','PESAPALLO','FOOTBALL','HOCKEY','WRESTLING','GAELIC GAMES','SUMO WRESTLING','ICE HOCKEY','BASKETBALL','DANDI BIYO','RUGBY','CROSS COUNTRY SKIING','PALETA FRONTON','ARNIS','OINA','GOLF','ALPINE SKIING','TAEKWONDO','VOLLEYBALL','CRICKET'],
	['AFGHANISTAN','ALBANIA','ALGERIA','ANDORRA','ANGOLA','ANTIGUA AND BARBUDA','ARGENTINA','ARMENIA','AUSTRALIA','AUSTRIA','AZERBAIJAN','BAHAMAS','BANGLADESH','BARBADOS','BELARUS','BELGIUM','BELIZE','BENIN','BHUTAN','BOLIVIA','BOSNIA AND HERZEGOVINA','BOTSWANA','BRAZIL','BRUNEI','BULGARIA','BURKINA FASO','BURUNDI','CAMBODIA','CAMEROON','CANADA','CENTRAL AFRICAN REPUBLIC','CHAD','CHILE','CHINA','COLOMBIA','CROATIA','CUBA','CYPRUS','DENMARK','DJIBOUTI','DOMINICA','DOMINICAN REPUBLIC','ECUADOR','EGYPT','EL SALVADOR','EQUATORIAL GUINEA','ERITREA','ESTONIA','ETHIOPIA','FIJI','FINLAND','FRANCE','GEORGIA','GERMANY','GHANA','GREECE','GRENADA','GUATEMALA','GUINEA','GUYANA','HAITI','HONDURAS','HUNGARY','ICELAND','INDIA','INDONESIA','IRAN','IRAQ','IRELAND','ISRAEL','ITALY','JAMAICA','JAPAN','JORDAN','KAZAKHSTAN','KENYA','KIRIBATI','KUWAIT','KYRGYZSTAN','LAOS','LATVIA','LEBANON','LESOTHO','LIBERIA','LIBYA','LIECHTENSTEIN','LITHUANIA','LUXEMBOURG','MACEDONIA','MADAGASCAR','MALAWI','MALAYSIA','MALDIVES','MALI','MALTA','MARSHALL ISLANDS','MAURITANIA','MAURITIUS','MEXICO','MICRONESIA','MOLDOVA','MONACO','MONGOLIA','MOROCCO','MOZAMBIQUE','NAMIBIA','NAURU','NEPAL','NETHERLANDS','NEW ZEALAND','NICARAGUA','NIGER','NIGERIA','NORTH KOREA','NORWAY','OMAN','PAKISTAN','PALAU','PALESTINIAN TERRITORIES','PANAMA','PAPUA NEW GUINEA','PARAGUAY','PERU','PHILIPPINES','POLAND','PORTUGAL','QATAR','ROMANIA','RUSSIA','RWANDA','SAMOA','SAN MARINO','SAO TOME AND PRINCIPE','SAUDI ARABIA','SENEGAL','SERBIA','SEYCHELLES','SIERRA LEONE','SINGAPORE','SLOVAKIA','SLOVENIA','SOLOMON ISLANDS','SOMALIA','SOUTH AFRICA','SOUTH KOREA','SOUTH SUDAN','SPAIN','SRI LANKA','SUDAN','SURINAME','SWAZILAND','SWEDEN','SWITZERLAND','SYRIA','TAIWAN','TAJIKISTAN','TANZANIA','THAILAND','TIMOR LESTE','TOGO','TONGA','TRINIDAD AND TOBAGO','TUNISIA','TURKEY','TURKMENISTAN','TUVALU','UGANDA','UKRAINE','UNITED ARAB EMIRATES','UNITED KINGDOM','URUGUAY','UZBEKISTAN','VANUATU','VENEZUELA','VIETNAM','YEMEN','ZAMBIA','ZIMBABWE']];
//////////////////////////////////////////////////////////////////////
var wrd="",ansWord=[],length=0,points=0,lifes=9,wins=0,loss=0,ch,skips,img;
var ele = document.getElementById('wordGame');
var pele = document.getElementById('pts');
var wele = document.getElementById('wins');
var lele = document.getElementById('loss');
var lfele = document.getElementById('lfs');
var imag = document.getElementById('hmcan');
var himg = document.getElementById('hint');
var introbox = document.getElementById('introbox');
var gamebox = document.getElementById('gamebox');
var skele = document.getElementById('skip');
document.getElementById('heading').addEventListener('click',resetGame);
//////////////////////////////////////////////////////////////////////

////////////////////////////Reset The Game////////////////////////////
function resetGame(){
	'use strict';
	points = 0;
	ansWord = [];
	wrd = "";
	lifes = 9;
	length = 0;
	wins = 0;
	loss = 0;
	ch = -1;
	skips = 0;
	ele.innerHTML = 'SELECT TYPE TO START YOUR GAME';
	pele.innerHTML = 'Points: ' + points;
	himg.src = 'images\\lifes\\9.png';
	keyVisibility(0);
	resetStatus();
}

///////////////////////////Reset Image Box/////////////////////////////
function resetStatus(){
	imag.src = "images\\lifes\\" + lifes + '.png';
	wele.innerHTML = "Wins: " + wins;
	lele.innerHTML = "Loses: " + loss;
	lfele.innerHTML = "Lives: " + lifes;
	skele.innerHTML = "Skips: " + skips;
	if(ch == 0){
		himg.src = 'images\\sports\\' + img + '.jpg';
	}
	else if(ch == 1){
		himg.src = 'images\\countries\\' + img + '.png';
	}
}

/////////////////////Make the KeyBoard Visible/////////////////////////
function keyVisibility(visib){
	var p = document.getElementsByClassName('key');
	var pl = p.length;
	for(var i = 0; i < pl; i++){
		if(visib==1)
			p[i].style.visibility = 'visible';
		else
			p[i].style.visibility = 'hidden';
	}
}

//////////////////Start new Game With Previous Values//////////////////
function newGame(chc){
	'use strict';
	ch=chc;
	lifes = 9;
	wrd = wordLib[chc];
	wrd = wrd[img = Math.floor(Math.random()*wrd.length)];
	wrd = wrd.split("");
	keyVisibility(1);
	resetStatus(img);
	lifes = 9;
	length = wrd.length;
	ansWord = [];
	for(var i = 0; i < length; i++){
		if(wrd[i]==' ')
			ansWord.push(' ');
		else
			ansWord.push('_');
	}
	//ansWord = ansWord.split('');
	ele.innerHTML = ansWord.join('');
	pele.innerHTML = "Points: " + points;
}

////////////////Replace Dash with Word\Spell Checker///////////////////
function letCapt(letter,obj){
	'use strict';
	var change = false;
	obj.style.visibility = 'hidden';
	for(var i = 0; i < length; i++)
		if(wrd[i] == letter && ansWord[i] != letter){
			ansWord[i]=letter;
			points++;
			change = true;
	 	}
	if((change == false) && (wrd.indexOf(letter)<0)?true:false){
		lifes--;
		resetStatus();
	}
	ele.innerHTML = ansWord.join('');
	pele.innerHTML = "Points: " + points;
	resetStatus();
	if((ansWord.indexOf('_')<0)?true:false){
		console.log("this is it when wins");
		wins++;
		resetStatus();
		keyVisibility(0);
		setTimeout(function(){newGame(ch)},1000);
	}
	if(lifes == 0){
		loss++;
		resetStatus();
		ele.innerHTML = wrd.join("");
		setTimeout(function(){if(confirm("Game Over\nClick OK to Play Game again\nClick Cancel to Reset")){newGame(ch);}else{resetGame()}},10);
	}
	if(lifes < 0)
		newGame(ch);
}

///////////////try new///////////////
function tryNew(){
	skips++;
	resetStatus();
	newGame(ch);
}

///////////Intro////////////////////
function intro(){
	introbox.style.display = 'none';
	gamebox.style.display = 'block';
}