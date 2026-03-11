/// <reference types="cypress"/>
/// <reference types="cypress-real-events"/>

describe('Authentication', ()=>{
    it('Registration page', ()=>{
        cy.get('.account').realHover();
        cy.get('.dropdown-content').should('be.visible');

        cy.get('.dropdown-content>a:nth-child(2)').click();
        // cy.get('.dropdown-content>a:nth-child(2)').click({force:true});

        cy.url().should('contain', '/customer/register');
    });

    it('Username always present', async ()=>{
        cy.get('.account').realHover();
        cy.get('.dropdown-content').should('be.visible');
        cy.get('.dropdown-content>a:nth-child(1)').click();


        cy.env(['email']).then(({email}) =>{
            cy.get("input[name='email']").type(email);
        });
        cy.env(['password']).then(({password}) =>{
            cy.get("input[name='password']").type(password);
        });

        cy.get('input[type=submit]').click();

        cy.get(".dropdown-content>form>input[type='submit']").should('exist');
        cy.get('.account__title').invoke('text').then((text)=>{
            const accountTitle = text.trim();
            
            cy.get("img[class='logo']").click();
            cy.get('.account__title').should('contain', accountTitle);

            cy.get("body").then(($body) =>{
                // cy.get('.header__burger-lines').click(); For smaller screens
                if($body.find("a[id='shop.magazine.index']").length != 0){
                    cy.get("a[id='shop.magazine.index']").click();
                    cy.get('.account__title').should('contain', accountTitle);
                }
        
                if($body.find("a[id='shop.promos.index']").length != 0){
                    // cy.get('.header__burger-lines').click(); For smaller screens
                    cy.get("a[id='shop.promos.index']").click();
                    cy.get('.account__title').should('contain', accountTitle);
                }

            });
    
        });

    });

    beforeEach(()=>{
        cy.env(['apiUrl']).then(({apiUrl})=>{
            cy.request(apiUrl).then((response) =>{
                expect(response.status).to.be.eq(200);
                cy.visit(apiUrl);
            })
        })
    });
})