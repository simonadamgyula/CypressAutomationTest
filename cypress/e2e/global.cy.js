/// <reference types="cypress"/>

describe('Global and Contact info', ()=>{
    it('Search suggestions', ()=>{
        const searchTerm = "spo";
        cy.get("input#search").first().type(searchTerm);
        cy.get("#search-suggestions").first().should('be.visible');
        //Check the all results page

        cy.get("#search-suggestions[class='search-suggestions show'] a.button-primary").click();
        cy.url().should('contain', `search?term=${searchTerm}`);
        cy.get(".card-product").should("exist");
    });

    it('Changing language', ()=>{
        cy.get("select#locale-switcher").select('English');
        cy.url().should('contain', '?locale=en');
    });

    it('Checking mailto and tel protocol', ()=>{
        cy.get(".footer__infos>p>a").first().should('contain.attr', 'href').and('include', 'tel:');
        cy.get(".footer__infos>p>a").eq(1).should('contain.attr', 'href').and('include', 'mailto:');
    });

    beforeEach(()=>{
        cy.env(['apiUrl']).then(({apiUrl})=>{
            cy.request(apiUrl).then((response) =>{
                expect(response.status).to.be.eq(200);
                cy.visit(apiUrl);
            })
        })
    });
});