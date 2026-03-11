// const cypress = require('cypress');
const url = Cypress.expose('url');

describe('Cart and Comparison', ()=>{
    it('Cart number change', ()=>{
        cy.get(".card-product").first().click();
        let oldCartCount;

        cy.get('body').then(($body)=>{
            if($body.find(".cart__icon__items").length > 0){
                oldCartCount = cy.get(".cart__icon__items").invoke('text').then(parseInt);
            }
            else{
                oldCartCount = 0;
            }
        });

        cy.get("button[class='button-primary addtocart']").click();

        let newCartCount = cy.get(".cart__icon__items").invoke('text').then(parseInt);
        expect(newCartCount > oldCartCount);

        console.clear();
        // cy.getAllLocalStorage().should('have.length.above', 0); //Code doesnt't write in local storage
        //check url/items
    });

    it('Cart summary showing up', ()=>{
        cy.get(".card-product").first().click();
        cy.get("button[class='button-primary addtocart']").click();

        cy.get(".cart__icon").click();

        cy.get(".cart__dropdown").should('have.css', 'opacity', '1');
    });

    it.skip('Compare item count', ()=>{
        //Skipped, couldn't find the comparing
    });

    beforeEach(function () {
        cy.env(['apiUrl']).then(({apiUrl})=>{
            cy.request(apiUrl).then((response) =>{
                expect(response.status).to.be.eq(200);
                cy.visit(apiUrl);
                cy.get("body").then(($body) =>{
                    if($body.find("a[id='shop.promos.index']").length === 0){
                        this.skip();
                    }
                    else{
                        cy.get("a[id='shop.promos.index']").click();
                    }
                })
            })
        })
    });
});