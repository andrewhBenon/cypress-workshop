// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('fillAndSubmitRegistrationForm', userDetails => {
    cy.get('input[id=signup_form_email]').type(userDetails.email);
    //Enter password
    cy.get('input[id=signup_form_password').type(userDetails.password);
    //Enter first name
    cy.get('input[id=signup_form_firstname]').type(userDetails.firstName);
    //Enter last name
    cy.get('input[id=signup_form_lastname]').type(userDetails.lastName);
    //Enter DOB
    cy.get('div[data-id=signup_form_dob]').click();
    cy.get('select[id=day]').select('21');
    cy.get('select[id=month').select('December');
    cy.get('select[id=year]').select('1980');
    //Enter address and auto complete
    cy.get('input[id=autocomplete').type('1 corde');
    //Confirm auto compelete is visible 
    cy.get('div[data-id=addressAutoComplete_suggestions]',{timeout:10000}).should('be.visible');
    //Select 1st auto complete value
    cy.get('div[data-id=addressAutoComplete_suggestions]').find('div').first().click();
    //Enter phone number
    cy.get('input[id=signup_form_phone]').type('0411111111');
    //Accept terms and conditions
    cy.get('input[id=signup_form_agree][type=checkbox]').check({force:true});
    //Submit form
    cy.get('button[data-id=signup_form_submitButton').click();
});

import sha1 from "sha1";
const TEST_API_URL = Cypress.env("TEST_API_URL");

Cypress.Commands.add('createCustomerWithAPI', () =>{
    cy.request("POST", `${TEST_API_URL}/testapi/customer/create`).then((response) => {
        return {
            customerId: response.body.customer_id,
			email: response.body.email,
			password: "4Me2Testit"
        }
    });
});

Cypress.Commands.add('loginWithAPI', { prevSubject: "optional" }, (subject, email, password) =>{
    const apiURL = Cypress.config('baseUrl').replace('www','api')
    const appKey = 'ozlotteries_ios_1';
	const appSecret = 'cho4Maec2Shoom3Aigie';
	const time = Date.now();
	const skey = sha1(`${appKey}${time}${appSecret}`);
    const domain = Cypress.config('baseUrl').replace(/https?:\/\/www/, '');
    cy.request({
        method: "POST",
        headers: {
            "X-Jumbo-Version": "2.9",
			"X-Jumbo-AppKey": appKey,
			"X-Jumbo-SKEY": skey,
			"X-Jumbo-Timestamp": time,
			"content-type": "application/json"
        },
        url: `${apiURL}/v2/login`,
        body: {
                email: subject.email,
			    password: subject.password
            }
    }).then((response) => {
        const{
            access_token: accessToken,
			customer_token: customerToken,
			customer: { id: customerID }
        } = response.body.result;
        cy.setCookie("web_access_token",accessToken, {domain});
        cy.setCookie("customer_id", customerID, {domain});
        cy.setCookie("customer_token", customerToken, {domain})
    });
});