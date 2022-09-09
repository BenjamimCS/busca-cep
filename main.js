const inputCep  	= document.querySelector("#cep-request");
const resultArea	= document.querySelector("#cep-result");
const log       	= console.log;

function drop(raw) {
	let json = JSON.parse(raw);

	loop1:
	for (let prop in json) {

		if(document.querySelector(`#${prop}`)) {
			if (!json[prop]) {
				document.querySelector(`#cep-result #${prop} > p`).textContent = "---";
				continue loop1;
			}
			document.querySelector(`#cep-result #${prop} > p`).textContent = json[prop];
		}
	}
}

inputCep.addEventListener("keydown", k => {
	if (k.which === 13) {
		const xhr = new XMLHttpRequest();
		let cep   = inputCep.value.replace("-","");

		if (!cep) return;

		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				drop(xhr.response);

				resultArea.style.display = "block";
				inputCep.blur();
			}
		}

		xhr.open("GET", `https://viacep.com.br/ws/${cep}/json`);
		xhr.send();
	}
});
