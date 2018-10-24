$(document).ready(function(){
	document.getElementById('add-photo').onclick = addPhoto;
	document.getElementById('remove-photo').onclick = removePhoto;
	document.getElementById('link-btn').onclick = changeTo.bind(this, 'text', 'link-btn');
	// document.getElementById('fromComputer-btn').onclick = changeTo.bind(this, 'file', 'fromComputer-btn');
	document.getElementById('none-btn').onclick = noUpload;

	var i = 0;
	var original = document.getElementById('single-link0');
	var parentDiv = document.getElementById('links');

	function addPhoto(){
		if(parentDiv.childNodes.length <= 6){	
			var clone = original.cloneNode(true);
			clone.childNodes[1].value = "";
			clone.id = 'single-link' + ++i;
			parentDiv.appendChild(clone);
			original = document.getElementById('single-link0');
		}
		showMinus();
	}

	function showMinus(){
		$('#remove-photo').fadeIn('slow');
	}

	function removePhoto(){
		hideMinus();
		parentDiv.childNodes[parentDiv.childNodes.length-1].remove();

	}

	function hideMinus(){
		if(parentDiv.childNodes.length <= 4){
			$('#remove-photo').css('display', 'none');
		}
	}

	function hidePlus(){
		$('#add-photo').css('display', 'none');
	}

	function showPlus(){
		$('#add-photo').fadeIn('slow');
	}

	function activate(){
		if(parentDiv.childNodes.length === 2){
			addPhoto();
			hideMinus();
		}
		showPlus();
		document.getElementById('link-btn').classList.remove('active');
		// document.getElementById('fromComputer-btn').classList.remove('active');
		document.getElementById('none-btn').classList.remove('active');
		this.classList.toggle('active');
	}

	function noUpload(){
		activate.apply(document.getElementById('none-btn'));
		hidePlus();
		i = -1;
		while(parentDiv.childNodes.length > 2){
			if(parentDiv.childNodes.length === 3){
				document.getElementById('single-link0').remove();
				hideMinus();
			}
			else{
				parentDiv.childNodes[parentDiv.childNodes.length-1].remove();
			}
		}
	}

	function changeTo(type, btn){
		activate.apply(document.getElementById(btn));
		if(parentDiv.childNodes.length === 3){
			document.getElementById('single-link0').childNodes[1].type = type;
			if(type = 'file'){
				document.getElementById('single-link0').childNodes[1].accept = '.jpg, .jpeg';
			}
		}
		else{
			parentDiv.childNodes.forEach(function(e){
				if(e.childNodes[1]){
					e.childNodes[1].type = type;
				}
			});
		}
	}

	document.getElementById('surfaceInput').oninput = function(){
		 document.getElementById('surfaceOutput').value = document.getElementById('surfaceInput').value;
	}

	
	var obstacles = document.getElementsByClassName('obstacle');
	for(var i=0; i<obstacles.length; i++){
		obstacles[i].onclick = function(){
			this.classList.toggle('active');
			document.getElementById(this.id + '0').click();
		}
	}

	document.getElementById('spot-add-btn').addEventListener('click', function(){
		if (!document.getElementById('latLng').value){
			document.getElementById('note-latlng').classList.remove('no-width');
			setTimeout(function(){
				document.getElementById('note-latlng').classList.add('no-width');
			},2000)
		}
	});

	$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

	
	
});