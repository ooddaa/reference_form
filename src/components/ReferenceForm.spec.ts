export {}
// import * as React from 'react'
// import { mount } from '@cypress/react'
// import ReferenceForm from './ReferenceForm'

// ReferenceForm 
// /* eslint-disable no-undef */
// /* eslint-disable no-unused-vars */
// /* eslint-disable testing-library/prefer-screen-queries */
// /* eslint-disable no-redeclare */
// /*global cy before*/
// describe('form renders correctly', () => {
//   beforeEach(() => {
//     mount(<ReferenceForm />)
// })
//   it('form should be visible', () => {
//     cy.getByTestId('__reference-form')
//       .should('be.visible')
//   })

// })

// describe('form behaves correctly', () => {
//   beforeEach(() => {
//     mount(<ReferenceForm />)
// })
//   it('form submits correct data', () => {
//     let [firstName,
//       lastName,
//       address,
//       employerName,
//       employmentStartDate,
//       employmentEndDate,
//       guarantorName,
//       guarantorAddress,
//       guarantorRelationship,] = ['test_first_name', 'test_last_name', "test_employer_name",'2022-06-11', '2022-06-13', 'test_guarantor_name', 'test_guarantor_address','test_guarantor_relationship']

//     cy.getByTestId('__reference-form--personal__first-name')
//       .type(firstName, { force: true })

//     cy.getByTestId('__reference-form--personal__last-name')
//       .type(lastName, { force: true })

//     cy.getByTestId('__reference-form--personal__address')
//       .type(address, { force: true })

//     // cy.getByTestId('__solaris-form--addr-postcode')
//     //   .find('input')
//     //   .type(postcode, { force: true })

//     // cy.getByTestId('__solaris-form--select')
//     //   .find('select')
//     //   .select(music, { force: true })

//     // cy.getByTestId('__solaris-form--submitBtn')
//     //   .click({ force: true })

//     cy.get('[test-id="__success"')
//       .should('be.visible')
//       .contains(`${name} ${dob} ${addr} ${postcode} ${music}`)
//   })

//   it('name must be at least 3 characters', () => {
//     let [name, dob, addr, postcode, music] = ['ab', '2022-06-11', 'test_addr-main', 'test-addr-postcode', 'Mastodon']
//     cy.getByTestId('__solaris-form--name')
//       .find('input')
//       .type(name, { force: true })

//     cy.getByTestId('__solaris-form--dob')
//       .find('input')
//       .type(dob, { force: true })

//     cy.getByTestId('__solaris-form--addr-main')
//       .find('input')
//       .type(addr, { force: true })

//     cy.getByTestId('__solaris-form--addr-postcode')
//       .find('input')
//       .type(postcode, { force: true })

//     cy.getByTestId('__solaris-form--select')
//       .find('select')
//       .select(music, { force: true })

//     cy.getByTestId('__solaris-form')
//       .find('form')
//       .submit()  

//     cy.getByTestId('__success')
//       .should('not.exist')
//   })

//   it('all fields are required', () => {

//     cy.getByTestId('__solaris-form')
//       .find('form')
//       .submit()  

//     cy.getByTestId('__success')
//       .should('not.exist')
//   })
// })