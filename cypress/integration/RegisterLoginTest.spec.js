/// <reference types="Cypress" />
import faker from "faker"; 

//Create user details 
function createUserDetails(){
	const firstName = faker.name.firstName();
	const lastName = faker.name.lastName();
	return{
		password: 'cypressTest1',
		phoneNumber: faker.phone.phoneNumber(),
		email: `test_${firstName}_${lastName}@benon.com`,
		firstName,
		lastName
	}
}
const userDetails = createUserDetails();
//Test to ensure the user is able to successfully register an account
//then log into the account
describe("Register then login test", () => {
	it("should create an account", () => {
		//visit the home page
		cy.visit("/");
		//navigate to login page
		cy.get('span').contains('Login').click();
		//navigate to create account
		cy.get('button[class$=-CreateAccountButton]').click();
		cy.title().should("contain", "My Account");
		//Fill in signup form
		//Enter email address
		// cy.get('input[id=signup_form_email]').type(userDetails.email);
		// //Enter password
		// cy.get('input[id=signup_form_password').type(userDetails.password);
		// //Enter first name 
		// cy.get('input[id=signup_form_firstname]').type(userDetails.firstName);
		// //Enter last name
		// cy.get('input[id=signup_form_lastname]').type(userDetails.lastName);
		// //Enter DOB
		// cy.get('div[data-id=signup_form_dob]').click();
		// cy.get('select[id=day]').select('21');
		// cy.get('select[id=month').select('December');
		// cy.get('select[id=year]').select('1980');
		// //Enter address and auto complete
		// cy.get('input[id=autocomplete').type('1 corde');
		// //Confirm auto compelete is visible 
		// cy.get('div[data-id=addressAutoComplete_suggestions]',{timeout:10000}).should('be.visible');
		// //Select 1st auto complete value
		// cy.get('div[data-id=addressAutoComplete_suggestions]').find('div').first().click();
		// //Enter phone number
		// cy.get('input[id=signup_form_phone]').type('0411111111');
		// //Accept terms and conditions
		// cy.get('input[id=signup_form_agree][type=checkbox]').check({force:true});
		// //Submit form
		// cy.get('button[data-id=signup_form_submitButton').click();
		cy.fillAndSubmitRegistrationForm(userDetails);
		//Confirm account creation
		cy.get('h2[data-id=myAccountPage_pageHeader]',{timeout:10000}).should('be.visible');
	});

	it("should login", () =>{
		//Visit home page
		cy.visit('/');
		//Navigate to login page
		cy.get('span').contains('Login').click();
		cy.title().should("contain", "My Account");
		//Enter email
		cy.get('input[id=loginRegisterEmail_email]').type(userDetails.email);
		//Click contiune
		cy.get('button[data-id=loginRegisterEmail_submit]').click();
		//Enter password
		cy.get('input[id=LoginRegister_Login_password]').type(userDetails.password);
		//Click login
		cy.get('button[data-id=LoginRegister_Login_submitButton]').click();
	});
});
