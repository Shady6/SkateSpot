$(document).ready(function(){
	if (document.getElementsByClassName('flowing-alert').length) {
		document.getElementById('alert').classList.remove('no-height');
		setTimeout(function(){
			document.getElementById('alert').classList.add('no-height');
		}, 4000)
	}
});