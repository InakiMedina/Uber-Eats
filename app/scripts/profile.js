function toogleToAccount() {
	slide(0)
}

function toogleToAddress() {
	slide(1)
}

function toogleToBankInfo() {
	slide(2)
}


function slide(index){
	var child = car_in.firstElementChild
	for (var e = 0; e < 3; ++e) {
		child.classList.remove('active')
		if (index == e)
			child.classList.add('active')	

		child = child.nextElementSibling
	}

}

function updateIndicators(){
	stepsIndicators.forEach(indic => {
		indic.classList.remove("active");
	});
	stepsIndicators[activeStepIndex].classList.add("active")
}
