
let activeStepIndex = 0;


//load external html files
var xhr = new XMLHttpRequest()

//load login modal
xhr.open('GET', "http://localhost:3000/singup/modal")
var modal_content = singup_form.firstElementChild.firstElementChild
xhr.send()
xhr.onload = function() {
	if (xhr.status != 200)
		alert(xhr.status + ": " + xhr.statusText)
	else {		
		modal_content.innerHTML = xhr.responseText
	}
}

//load bubbles background	
var xhr2 = new XMLHttpRequest()
xhr2.open('GET', "http://localhost:3000/widgets/backgrounds/bubbles")
xhr2.send()
xhr2.onload = function() {
	if (xhr2.status != 200)
		alert(xhr2.status + ": " + xhr2.statusText)
	else {		
		background.innerHTML = xhr2.responseText
	}
}

var parentForm
var subFormsWrapper
var subForms
var stepsIndicators

addEventListener("load", (event) => {	
	parentForm = document.querySelector(".myform");
	subFormsWrapper = parentForm.querySelector(".carousel .sub-forms");
	subForms = subFormsWrapper.querySelectorAll(".sub-form");
	stepsIndicators = Array.from(document.querySelectorAll(".form-step-indicators button.step-indicator"));

	stepsIndicators.forEach(e => {
		e.addEventListener("click", e => { e.preventDefault() })
	})

	next.addEventListener("click", e => {
		e.preventDefault();
		if(checkEmptysubForm())
			next.innerText.toLowerCase() == "next" ? nextStep() : goToRoot();
	});

	prev.addEventListener("click", e => {
		e.preventDefault();
		prevStep()
	});

});

function clickSingUp() {
	console.log("Page path is " + window.location.pathname)
}

function openSingupModal() {
	singup_dialog.showModal()
}

function nextStep(){
	prev.classList.remove("d-none");
	let transBy = subForms[activeStepIndex].clientWidth * ++activeStepIndex * -1;
	//Check if we reached the last step
	if(activeStepIndex >= subForms.length - 1)
	next.innerText = "Finish";
	slide(transBy);
}


function prevStep(){
	next.innerText = "Next";
	let transBy = subForms[activeStepIndex].clientWidth * --activeStepIndex * -1;
	//Check if we are at the first step
	if(activeStepIndex < 1)
	prev.classList.add("d-none");
	slide(transBy);
}

function slide(slideBy){
    subFormsWrapper.style.setProperty("--transX", `${slideBy}px`);
    updateIndicators();
 }

function updateIndicators(){
	stepsIndicators.forEach(indic => {
		indic.classList.remove("active");
	});
	stepsIndicators[activeStepIndex].classList.add("active")
}

function checkEmptysubForm(){
	const subFormIndex = activeStepIndex;
	const subFormInputs = Array.from(subForms[subFormIndex].querySelectorAll("input"));
	let validsubForm = true;
	subFormInputs.forEach(inpt => {
		if(!inpt.value)
		 {
		   inpt.classList.add("is-invalid");
		   validsubForm = false;
		 } else{
		   inpt.classList.remove("is-invalid");
		 }   
	});
	return validsubForm;
}

function goToRoot() {
	document.location.assign('/home')
 }
