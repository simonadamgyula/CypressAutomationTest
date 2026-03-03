/// <reference types="cypress"/>

describe('Contacts', ()=>{
    it('Check email and name', ()=>{
        cy.get(".form-actions>input[type='submit']").click();

        // cy.get('form>.alert.error').should('contain', 'errore');
        cy.get(".alert.error.alert-dismissible").should("exist");

        cy.get(".form-group>.error").should("exist");
    });

    it('File upload', ()=>{
        cy.get('input#fl-name').type('Jakab Gipsz');
        cy.get('input#email').type('gipszjakab@example.hu');
        cy.get('input#subject').type('File Upload Automatic Test');
        cy.get("textarea[name='message_body']").type('File Upload Test');

        cy.get('input#file').selectFile({
            contents: Cypress.Buffer.from("Testing upload"),
            fileName: 'test.txt',
            lastModified: Date.now()
        });
        cy.env(['apiUrl']).then(({apiUrl}) => {
            cy.intercept('POST', `${apiUrl}/contact`).as('formSubmission');
            cy.get(".form-actions>input[type='submit']").click();
            cy.wait('@formSubmission').then((intercept) =>{
                const header = intercept.request.headers;
    
                expect(header["content-type"]).to.include("multipart/form-data");
            })
        })

    });

    it('GDPR constrain', ()=>{
        cy.get('input#fl-name').type('Jakab Gipsz');
        cy.get('input#email').type('gipszjakab@example.hu');
        cy.get('input#subject').type('GDPR Test');
        cy.get("textarea[name='message_body']").type('GDPR Test');

        cy.get(".form-actions>input[type='submit']").click();
        cy.get(".alert.error.alert-dismissible").should("exist");
        cy.get('.form-group.form-group.radios--wrapper>.error').should("exist");
    });

    beforeEach(function () {
        cy.env(['apiUrl']).then(({apiUrl})=>{
            cy.request(apiUrl).then((response) =>{
                expect(response.status).to.be.eq(200);
                cy.visit(apiUrl);
                cy.get("body").then(($body) =>{
                    if($body.find("a[id='shop.contact.index']").length === 0){
                        this.skip();
                    }
                    else{
                        cy.get("a[id='shop.contact.index']").click();
                    }
                })
            })
        })
    });
});