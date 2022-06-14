/// <reference types="Cypress" />



describe('Make an API call to the create customer endpoint', () =>{
    const TEST_API_URL = Cypress.env("TEST_API_URL");
    it('should return the correct response', () =>{
        cy.request("POST", `${TEST_API_URL}/testapi/customer/create`).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('email');
            expect(response.body).to.have.property('customer_id');
            expect(response.body.email).is.not.empty;
            expect(response.body.customer_id).is.not.empty;
            expect(response.body.email.length).lessThan(321);
            expect(response.body.email.length).greaterThan(3);
            expect(response.body.customer_id.length).equal(19);
        });
    });
})