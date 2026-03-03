/// <reference types="cypress"/>

describe('Services', ()=>{
    it('Thyroid check-up', ()=>{
        cy.get(".im-accordion__toggle[data-accordion='service-0']").click();
        
        cy.window().then(({window}) => {
            window.beforeReload = true;
        });
        cy.get(".im-accordion__content.open").find(":nth-child(2) > .card-service > a").click();
        
        cy.window().should('have.prop', 'beforeReload', true);
        cy.get("div[id='service_modal_2'] div[class='service-modal__container']").should('be.visible');
    });

    it('Whatsapp appointment', ()=>{
        cy.get(".im-accordion__toggle[data-accordion='service-0']").click();
        cy.get(".im-accordion__content.open").find(":nth-child(2) > .card-service > a").click();

        cy.get("div[id='service_modal_2'] div[class='service-modal__content--bottom']>a").invoke('removeAttr', 'target').click();

        cy.url().should('eq', 'https://wa.me/+393884787453/?text=Salve%2C+vorrei+prenotare+il+servizio+Check+up+tiroide');
    });
    
    beforeEach(function () {
        cy.env(['apiUrl']).then(({apiUrl})=>{
            cy.request(apiUrl).then((response) =>{
                expect(response.status).to.be.eq(200);
                cy.visit(apiUrl);
                cy.get("body").then(($body) =>{
                    if($body.find("a[id='shop.services.index']").length === 0){
                        this.skip();
                    }
                    else{
                        cy.get("a[id='shop.services.index']").click();
                    }
                })
            })
        })
    });
})