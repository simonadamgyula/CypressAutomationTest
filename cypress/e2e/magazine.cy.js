/// <reference types="cypress"/>

describe('Magazine and articles', ()=>{
    it('Article breadcrumbs', ()=>{
        cy.url().as('initialUrl');
        cy.get('.card-magazine').eq(1).click();

        cy.get("li[class='breadcrumb-item']:nth-of-type(2)>a").click();
        cy.get('@initialUrl').then((initialUrl) =>{
            cy.url().should('eq', initialUrl);
        });
    });

    it('Article to service navigation', ()=>{
        cy.get('.card-magazine').eq(0).click();

        cy.get('.card-alias__cta>a').click();
        cy.url().should('contain', '/servizi');
    });

    beforeEach(function () {
        cy.env(['apiUrl']).then(({apiUrl})=>{
            cy.request(apiUrl).then((response) =>{
                expect(response.status).to.be.eq(200);
                cy.visit(apiUrl);
                cy.get("body").then(($body) =>{
                    if($body.find("a[id='shop.magazine.index']").length === 0){
                        this.skip();
                    }
                    else{
                        cy.get("a[id='shop.magazine.index']").click();
                    }
                })
            })
        })
    });
});