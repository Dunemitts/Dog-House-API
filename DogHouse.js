// Declare global variables
let SelectBreed;
let SelectResults;
let SubmitButton;
let ListDog;
let Breeds = [];

// Initialize
function init() {
	// Assign jQuery objects
	SelectBreed = $('#selectBreed');
	ListDog = $('#selectionList');
	SelectResults = $('#selectResults');
	SubmitButton = $('#submission');
	SubmitButton.hide();
	// Clear breed select options
	SelectBreed.empty();
	// Get the list of breeds
	$.ajax({url: 'https://cit-doghouse-api.uc.r.appspot.com/api/v1/breeds', type: 'GET',
	success: function(data) {
		// Add breeds to the global array
		Breeds.push(...data);
		// Shows available breeds on selection menu
		let breedOptions = '';
		for (let breed of data) {
			breedOptions += `<option value="${breed}">${breed}</option>`;
		}
		// Add the options to the select element
		SelectBreed.append(breedOptions);

		SubmitButton.show();
		},
		error: function(err) {
			SubmitButton.hide();
		}
	});
	SelectResults.hide();
}
// Handle the form submission
function formSubmission() {
	// Get the selected breed
	let breed = SelectBreed.val();
	// Get the list of dogs from the API
	$.ajax({
		url: `https://cit-doghouse-api.uc.r.appspot.com/api/v1/dogs/breed/${encodeURIComponent(breed)}`,
		type: 'GET',
		success: function(data) {
			// Clear list
			ListDog.empty();
			for (let dog of data) {
				// Assign traits to variables
				const name = dog.name.charAt(0).toUpperCase() + dog.name.slice(1).toLowerCase();
				const gender = dog.gender === "M" ? "male" : "female";
				const age = dog.age;
				const dogBreed = dog.breed;
				const treat = dog.treat.toLowerCase();

				// Add dog's information
				ListDog.append(`
					<li>${name} is a ${gender} dog that is ${age} years old and is a "${dogBreed}" breed. 
					<br>Their favorite treat is "${treat}".</li>
				`);
			}
			// Show the results section
			SelectResults.show();
		},
		error: function(err) {
			// Clear the list of dogs
			ListDog.empty();
			SelectResults.show();
		}
	});
	return false;
}
$(document).ready(init);