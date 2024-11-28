
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
	subFormsWrapper = document.querySelector(".myform .carousel .sub-forms");
	subForms = document.querySelectorAll(".myform .carousel .sub-forms .sub-form");
	stepsIndicators = Array.from(document.querySelectorAll(".form-step-indicators button.step-indicator"));

	stepsIndicators.forEach(e => {
		e.addEventListener("click", e => { e.preventDefault() })
	})

	next.addEventListener("click", e => {
		e.preventDefault();
		if(checkEmptysubForm())
			next.innerText.toLowerCase() == "next" ? nextStep() : clickSingUp();
	});

	prev.addEventListener("click", e => {
		e.preventDefault();
		prevStep()
	});

});

function getSignupData() {
	return {
		username: usernameForm.value,
		email: emailForm.value,
		password: passwordForm.value,
		address: inputAddress.value
	}
}

function clickSingUp() {
	console.log("try to sign up")
	var xhr3 = new XMLHttpRequest()
	xhr3.open('POST', "http://localhost:3000/api/signup")
	xhr3.setRequestHeader('content-type', 'json/aplication')

	const json = getSignupData()
	console.log(json)

	xhr3.send(json)
	xhr3.onload = function() {
		if (xhr3.status == 400) {
			alert("singup form data is wrong")
			err_msg.innerText = ""
		}
		else if (xhr3.status == 406) {
			err_msg.innerText = "Email already exists"
		} else {
			err_msg.innerText = ""
			goToRoot()
		}
	}
}

function openSingupModal() {
	singup_dialog.showModal()
}

function nextStep(){
	prev.classList.remove("d-none");
	let transBy = subForms[activeStepIndex].clientWidth * ++activeStepIndex * -1;
	//Check if we reached the last step
	if(activeStepIndex >= subForms.length - 1) {
		next.innerText = "Finish"
	}
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
