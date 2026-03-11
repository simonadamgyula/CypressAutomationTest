/// <reference types="cypress"/>

describe('E-commerce', ()=>{
    it.skip('Product sorting', ()=>{
        cy.get('select#sort-by-toolbar').select(4).invoke('val').should('contain', 'sort=price&order=asc');
        cy.url().should('contain', '?sort=price&order=asc');
        
        let previousPrice = 0;
        cy.get('span.regular-price').each(($price, index, $list)=>{
            let text = $price.text();
            let currentPrice = Number(((text.split('€')[0]).trim()).replace(',', '.'));
            console.log(currentPrice);
            expect(currentPrice, 'Product sorting').to.be.greaterThan(previousPrice);
            previousPrice = currentPrice;
        });
    });

    it('Density change', ()=>{
        cy.get('select#show-toolbar').select('21');
        
        cy.url().should('contain', 'limit=21');
        cy.get(".card-product").should("have.length", 21);
    });

    it('Page navigation', ()=>{
        cy.get("a#next").click();
        cy.url().should('contain', 'page=2');

        cy.get("a.previous").click();
        cy.url().should('contain', 'page=1');
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