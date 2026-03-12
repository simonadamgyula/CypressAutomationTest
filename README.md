# E-Pharma - Cypress Automation Test

This repository contains the automated tests of the E-Pharma website. The tests use Cypress and checks the authentication, webshop and other elements of the website.

## Setup

1. Install [Node.js](https://nodejs.org/en/download/current) (and with it npm)
2. Clone the repository
3. Install the dependencies <br>
    CMD: ```npm install```

## Run the tests

After the setup the automation test is runnable.
> npx cypress run --env apiUrl=*website url*, email=*user-email*, password=*user-password*

The code uses **enviroment variables**, which need to be declared before running.<br>

### Examples for the variables:

- apiUrl: ```https://google.com```
- email: ```test@example.com```
- password: ```password456```

## Setup GitLab CI

1. Add ```apiUrl```, ```email``` and ```password``` to your GitLab CI variables.
2. Setup your ```.gitlab-ci.yml``` file:
```
stages:
   - test

variables:
   URL: $URL

cypress_tests:
   stage: test
   # Uses the official Cypress base image containing Node.js and necessary OS dependencies
   image: cypress/base:20 

   script:
      - npm ci
      # Runs Cypress tests headlessly in the terminal
      - npx cypress run

   allow_failure: true

   artifacts:
      when: always
      paths:
         # Standard Cypress output directories for artifacts
         - cypress/videos/
         - cypress/screenshots/
      expire_in: 30 days
```

## Test structure

#### ```authentication.cy.js```

In this file we check the websites authentication with being able to navigate to the register page from the header and after a user logs in we check if their name is present on every page.

#### ```cart-e_commerce.cy.js```

Here we check the website's cart function. We make sure the cart number changes with products being added to the cart and that the cart summary shows up.

#### ```contacts.cy.js```

In these tests we make sure that the website's contact form is working as intended. We check that the form makes sure the email and name field is filled out and that the file upload system uses multipart/form-data request.

#### ```e_commerce.cy.js```

We check the functions of the product page, like changing the density of the items and navigating the different pages.

#### ```global.cy.js```

This test file checks the global functions of the webpage like the search suggestion showing up, changing the site's language and the quick link functionality in the footer.

#### ```magazine.cy.js```

We check the magazine navigation and cross-linking. We make sure the article breadcrumbs lead us back to the magazine page and that from an article it is possible to navigate to the services webpage.

#### ```services.cy.js```

Here we verify the funtionality of the services modal and the booking flow via WhatsApp.
