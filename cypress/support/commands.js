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