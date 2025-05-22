/// <reference types="cypress" />

describe('About Me Page Functionality', () => {
  beforeEach(() => {
    // Visit the about page before each test
    cy.visit('/about');
    // Wait for GSAP animations to complete to avoid flaky tests
    // Specifically, the entrance animations for the page and history items
    cy.wait(1000); // Adjust if needed, or use more specific waits for elements
  });

  it('should display main section headings correctly', () => {
    // Main "About Me" heading within the content area
    cy.get('section#fifth > div > h1')
      .should('be.visible')
      .and('contain.text', 'About Me');

    // "History & Experience" section heading
    cy.get('section#history-experience > h2')
      .should('be.visible')
      .and('contain.text', 'History & Experience');

    // "Skills" section heading
    cy.get('section#skills > h2')
      .should('be.visible')
      .and('contain.text', 'Skills');

    // "Interests" section heading
    cy.get('section#interests > h2')
      .should('be.visible')
      .and('contain.text', 'Interests');
  });

  it('should show and hide detailed description on mouseover/mouseout for the first history item', () => {
    const firstHistoryItemSelector = 'section#history-experience > div:first-child';
    const detailedDescriptionSelector = `${firstHistoryItemSelector} .history-detailed`;

    // Assert initial state: detailed description should be hidden
    // GSAP sets opacity to 0 and display to none.
    // Checking 'display: none' is more robust for initial state.
    cy.get(detailedDescriptionSelector)
      .should('have.css', 'display', 'none')
      .and('have.css', 'opacity', '0');

    // Trigger mouseover on the first history item
    cy.get(firstHistoryItemSelector).trigger('mouseover');

    // Assert that the detailed description becomes visible
    // GSAP sets display: 'block' and animates opacity to 1
    cy.get(detailedDescriptionSelector)
      .should('be.visible')
      .and('have.css', 'opacity', '1'); // Check opacity after animation

    // Trigger mouseout from the first history item
    cy.get(firstHistoryItemSelector).trigger('mouseout');

    // Assert that the detailed description is hidden again
    // GSAP animates opacity to 0 and then sets display: 'none' onComplete
    // Waiting for the animation to complete before checking display: none
    cy.get(detailedDescriptionSelector)
      .should('not.be.visible') // Checks for display:none ultimately
      .and('have.css', 'opacity', '0'); 
      // Ensure display is 'none' after animation
    cy.get(detailedDescriptionSelector).should('have.css', 'display', 'none');
  });

  it('should show and hide detailed description for a specific "job" type history item', () => {
    // Target the first 'job' item, which is the second item overall in the current data
    // "Programmer Analyst II - CCFCD"
    const jobItemSelector = 'section#history-experience > div:nth-child(2)'; 
    const detailedDescriptionSelector = `${jobItemSelector} .history-detailed`;

    cy.get(detailedDescriptionSelector)
      .should('have.css', 'display', 'none')
      .and('have.css', 'opacity', '0');

    cy.get(jobItemSelector).trigger('mouseover');
    cy.get(detailedDescriptionSelector)
      .should('be.visible')
      .and('have.css', 'opacity', '1');

    cy.get(jobItemSelector).trigger('mouseout');
    cy.get(detailedDescriptionSelector)
      .should('not.be.visible')
      .and('have.css', 'opacity', '0');
    cy.get(detailedDescriptionSelector).should('have.css', 'display', 'none');
  });
});
