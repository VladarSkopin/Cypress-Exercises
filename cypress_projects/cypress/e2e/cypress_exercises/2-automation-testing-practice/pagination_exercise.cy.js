/// <reference types="cypress" />


beforeEach(() => {
    //cy.wait(100)
    cy.visit('https://pagination.js.org/index.html')
    //cy.wait(100)
})


describe.skip('Check basic UI layout', () => {

    it('check the page header', () => {
        cy.get('ul.clearfix').should('be.visible').then(($element) => {
            const width = $element.width();
            const height = $element.height();

            console.log(`Page Header width = ${width}`)  // 1024
            console.log(`Page Header height = ${height}`)  // 48

            cy.wrap(width).should('be.gt', 800).and('be.lt', 1200)
            cy.wrap(height).should('be.gt', 30).and('be.lt', 60)
        })
        
        cy.get('ul.clearfix').within(() => {
            cy.get('li > a[href="#"]').should('be.visible').and('have.text', 'Home')
            cy.get('li > a[href="docs/index.html"]').should('be.visible').and('have.text', 'Docs')
            cy.get('li > a[href="https://github.com/superRaytin/paginationjs"]').should('be.visible').and('have.text', 'Fork on GitHub')
        })

        cy.get('div.title').should('be.visible').and('contain', 'Pagination.js').and('have.css', 'font-size', '60px')

        cy.get('div.desc').should('be.visible').and('contain', 'A jQuery plugin to provide simple yet fully customisable pagination').and('contain', 'Almost all the ways you can think of on pagination')
        cy.get('a.build-button-source').should('have.text', 'Pagination.js')
        cy.get('a.build-button-zipped').should('contain', 'Pagination.min.js')

        cy.get('div.header').should('be.visible').and('have.css', 'backgroundColor', 'rgb(97, 178, 168)') // #61b2a8 = rgb(97, 178, 168)
    })



    it('check other text elements', () => {
        cy.get('div.demo-section-title').eq(0).should('be.visible').and('have.text', 'Normal').and('have.css', 'font-size', '40px').and('have.css', 'text-align', 'center')
        cy.get('div.demo-section-title').eq(1).should('be.visible').and('have.text', 'Only page numbers').and('have.css', 'font-size', '40px').and('have.css', 'text-align', 'center')
        cy.get('div.demo-section-title').eq(2).should('be.visible').and('have.text', 'Show page size changer').and('have.css', 'font-size', '40px').and('have.css', 'text-align', 'center')
        cy.get('div.demo-section-title').eq(3).should('be.visible').and('have.text', 'Show "go" input & button').and('have.css', 'font-size', '40px').and('have.css', 'text-align', 'center')
        cy.get('div.demo-section-title').eq(4).should('be.visible').and('have.text', 'Auto hide previous & next button').and('have.css', 'font-size', '40px').and('have.css', 'text-align', 'center')
        cy.get('div.demo-section-title').eq(5).should('be.visible').and('have.text', 'Mini').and('have.css', 'font-size', '40px').and('have.css', 'text-align', 'center')
        cy.get('div.demo-section-title').eq(6).should('be.visible').and('have.text', 'Show all pages').and('have.css', 'font-size', '40px').and('have.css', 'text-align', 'center')
        cy.get('div.demo-section-title').eq(7).should('be.visible').and('have.text', 'Asynchronous or JSONP').and('have.css', 'font-size', '40px').and('have.css', 'text-align', 'center')
        cy.get('div.demo-section-title').eq(8).should('be.visible').and('have.text', 'Asynchronous & Dynamic total number').and('have.css', 'font-size', '40px').and('have.css', 'text-align', 'center')
        cy.get('div.demo-section-title').eq(9).should('be.visible').and('have.text', 'Specify default').and('have.css', 'font-size', '40px').and('have.css', 'text-align', 'center')
        cy.get('div.demo-section-title').eq(10).should('be.visible').and('have.text', 'Format result data').and('have.css', 'font-size', '40px').and('have.css', 'text-align', 'center')
        cy.get('div.demo-section-title').eq(11).should('be.visible').and('have.text', 'Another format result data').and('have.css', 'font-size', '40px').and('have.css', 'text-align', 'center')
        cy.get('div.demo-section-title').eq(12).should('be.visible').and('have.text', 'Format navigator').and('have.css', 'font-size', '40px').and('have.css', 'text-align', 'center')
        cy.get('div.demo-section-title').eq(13).should('be.visible').and('have.text', 'Format "go" input').and('have.css', 'font-size', '40px').and('have.css', 'text-align', 'center')
        cy.get('div.demo-section-title').eq(14).should('be.visible').and('have.text', 'Methods & Events').and('have.css', 'font-size', '40px').and('have.css', 'text-align', 'center')

        // check the page footer
        cy.get('div#gototop').should('be.visible').and('have.text', 'Top').click()
        cy.window().its('scrollY').should('equal', 0);
    })

})



describe.skip('#1 "Normal" pagination tests', () => {

    it('manual next page, previous page', () => {
        // before clicking "2"
        cy.get('div.data-container > ul').eq(0).find('li').should('be.visible').and('have.length', 10)
        cy.get('div.data-container > ul').eq(0).within(() => {
            cy.get('li').first().should('have.text', '1')
            cy.get('li').last().should('have.text', '10')
        })

        // click "2"
        cy.get('div.demo-section.clearfix').eq(0).find('li.paginationjs-page.J-paginationjs-page ').eq(1).should('be.visible').click()

        // after clicking "2"
        cy.get('div.data-container > ul').eq(0).find('li').should('be.visible').and('have.length', 10)
        cy.get('div.data-container > ul').eq(0).within(() => {
            cy.get('li').first().should('have.text', '11')
            cy.get('li').last().should('have.text', '20')
        })


        // click "1"
        cy.get('div.demo-section.clearfix').eq(0).find('li.paginationjs-page.J-paginationjs-page ').eq(0).should('be.visible').click()

        // after clicking "1"
        cy.get('div.data-container > ul').eq(0).find('li').should('be.visible').and('have.length', 10)
        cy.get('div.data-container > ul').eq(0).within(() => {
            cy.get('li').first().should('have.text', '1')
            cy.get('li').last().should('have.text', '10')
        })


    })



    it('button next page, previous page', () => {
        // before clicking "next"
        cy.get('div.data-container > ul').eq(0).find('li').should('be.visible').and('have.length', 10)
        cy.get('div.data-container > ul').eq(0).within(() => {
            cy.get('li').first().should('have.text', '1')
            cy.get('li').last().should('have.text', '10')
        })

        // click "next"
        cy.get('div.demo-section.clearfix').eq(0).find('li.paginationjs-next.J-paginationjs-next ').eq(0).should('be.visible').click()

        // after clicking "next"
        cy.get('div.data-container > ul').eq(0).find('li').should('be.visible').and('have.length', 10)
        cy.get('div.data-container > ul').eq(0).within(() => {
            cy.get('li').first().should('have.text', '11')
            cy.get('li').last().should('have.text', '20')
        })



        // click "previous"
        cy.get('div.demo-section.clearfix').eq(0).find('li.paginationjs-page.J-paginationjs-page ').eq(0).should('be.visible').click()

        // after clicking "previous"
        cy.get('div.data-container > ul').eq(0).find('li').should('be.visible').and('have.length', 10)
        cy.get('div.data-container > ul').eq(0).within(() => {
            cy.get('li').first().should('have.text', '1')
            cy.get('li').last().should('have.text', '10')
        })
    })


 
    it('manual last page', () => {
        // before clicking the last page
        cy.get('div.data-container > ul').eq(0).find('li').should('be.visible').and('have.length', 10)
        cy.get('div.data-container > ul').eq(0).within(() => {
            cy.get('li').first().should('have.text', '1')
            cy.get('li').last().should('have.text', '10')
        })

        // click the last page
        cy.get('div.demo-section.clearfix').eq(0).find('li.paginationjs-page.J-paginationjs-page ').last().should('be.visible').click()

        // after clicking the last page
        cy.get('div.data-container > ul').eq(0).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(0).within(() => {
            cy.get('li').first().should('have.text', '191')
            cy.get('li').last().should('have.text', '195')
        })
    })


})




describe.skip('#2 "Only page numbers" pagination tests', () => {

    it('manual next page, previous page', () => {
        // before clicking "2"
        cy.get('div.data-container > ul').eq(1).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(1).within(() => {
            cy.get('li').first().should('have.text', '1')
            cy.get('li').last().should('have.text', '5')
        })

        // click "2"
        cy.get('div.demo-section.clearfix').eq(1).find('li.paginationjs-page.J-paginationjs-page ').eq(1).should('be.visible').click()

        // after clicking "2"
        cy.get('div.data-container > ul').eq(1).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(1).within(() => {
            cy.get('li').first().should('have.text', '6')
            cy.get('li').last().should('have.text', '10')
        })


        // click "1"
        cy.get('div.demo-section.clearfix').eq(1).find('li.paginationjs-page.J-paginationjs-page ').eq(0).should('be.visible').click()

        // after clicking "1"
        cy.get('div.data-container > ul').eq(1).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(1).within(() => {
            cy.get('li').first().should('have.text', '1')
            cy.get('li').last().should('have.text', '5')
        })


    })

 
    it('manual last page', () => {
        // before clicking the last page
        cy.get('div.data-container > ul').eq(1).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(1).within(() => {
            cy.get('li').first().should('have.text', '1')
            cy.get('li').last().should('have.text', '5')
        })

        // click the last page
        cy.get('div.demo-section.clearfix').eq(1).find('li.paginationjs-page.J-paginationjs-page ').last().should('be.visible').click()

        // after clicking the last page
        cy.get('div.data-container > ul').eq(1).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(1).within(() => {
            cy.get('li').first().should('have.text', '96')
            cy.get('li').last().should('have.text', '100')
        })
    })

    
})



describe.skip('#3 "Show page size changer" pagination tests', () => {

    it('manual next page, previous page', () => {
        // before clicking "2"
        cy.get('div.data-container > ul').eq(2).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(2).within(() => {
            cy.get('li').first().should('have.text', '1')
            cy.get('li').last().should('have.text', '5')
        })

        // click "2"
        cy.get('div.demo-section.clearfix').eq(2).find('li.paginationjs-page.J-paginationjs-page ').eq(1).should('be.visible').click()

        // after clicking "2"
        cy.get('div.data-container > ul').eq(2).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(2).within(() => {
            cy.get('li').first().should('have.text', '6')
            cy.get('li').last().should('have.text', '10')
        })


        // click "1"
        cy.get('div.demo-section.clearfix').eq(2).find('li.paginationjs-page.J-paginationjs-page ').eq(0).should('be.visible').click()

        // after clicking "1"
        cy.get('div.data-container > ul').eq(2).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(2).within(() => {
            cy.get('li').first().should('have.text', '1')
            cy.get('li').last().should('have.text', '5')
        })


    })



    it('button next page, previous page', () => {
        // before clicking "next"
        cy.get('div.data-container > ul').eq(2).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(2).within(() => {
            cy.get('li').first().should('have.text', '1')
            cy.get('li').last().should('have.text', '5')
        })

        // click "next"
        cy.get('div.demo-section.clearfix').eq(2).find('li.paginationjs-next.J-paginationjs-next ').eq(0).should('be.visible').click()

        // after clicking "next"
        cy.get('div.data-container > ul').eq(2).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(2).within(() => {
            cy.get('li').first().should('have.text', '6')
            cy.get('li').last().should('have.text', '10')
        })



        // click "previous"
        cy.get('div.demo-section.clearfix').eq(2).find('li.paginationjs-page.J-paginationjs-page ').eq(0).should('be.visible').click()

        // after clicking "previous"
        cy.get('div.data-container > ul').eq(2).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(2).within(() => {
            cy.get('li').first().should('have.text', '1')
            cy.get('li').last().should('have.text', '5')
        })
    })


 
    it('manual last page', () => {
        // before clicking the last page
        cy.get('div.data-container > ul').eq(2).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(2).within(() => {
            cy.get('li').first().should('have.text', '1')
            cy.get('li').last().should('have.text', '5')
        })

        // click the last page
        cy.get('div.demo-section.clearfix').eq(2).find('li.paginationjs-page.J-paginationjs-page ').last().should('be.visible').click()

        // after clicking the last page
        cy.get('div.data-container > ul').eq(2).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(2).within(() => {
            cy.get('li').first().should('have.text', '191')
            cy.get('li').last().should('have.text', '195')
        })
    })


    it('check the pagination size changer button', () => {

        // check options in the "select"
        cy.get('select.J-paginationjs-size-select').find('option').then(options => {
            options.each((index, option) => {
               // option is a DOM element, you can access its value or text
               const value = option.value;
               const text = option.textContent;

               switch(index) {
                case 0:
                    cy.wrap(value).should('eq', '5')
                    cy.wrap(text).should('eq', '5 / page')
                    break;
                case 1:
                    cy.wrap(value).should('eq', '10')
                    cy.wrap(text).should('eq', '10 / page')
                    break;
                case 2:
                    cy.wrap(value).should('eq', '20')
                    cy.wrap(text).should('eq', '20 / page')
                    break;
                case 3:
                    cy.wrap(value).should('eq', '50')
                    cy.wrap(text).should('eq', '50 / page')
                    break;
                case 4:
                    cy.wrap(value).should('eq', '100')
                    cy.wrap(text).should('eq', '100 / page')
               }
            });
           });



        // size "20 / page"
        cy.get('select.J-paginationjs-size-select').select(2).wait(500)
        cy.get('div.data-container > ul').eq(2).find('li').should('be.visible').and('have.length', 20)

        // size "100 / page"
        cy.get('select.J-paginationjs-size-select').select(4).wait(500)
        cy.get('div.data-container > ul').eq(2).find('li').should('be.visible').and('have.length', 100)

        // size "5 / page"
        cy.get('select.J-paginationjs-size-select').select(0).wait(500)
        cy.get('div.data-container > ul').eq(2).find('li').should('be.visible').and('have.length', 5)
    })

})


describe.skip('#4 "Show \"go\" input & button" pagination tests', () => {

    it('manual next page, previous page', () => {
        // before clicking "2"
        cy.get('div.data-container > ul').eq(3).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(3).within(() => {
            cy.get('li').first().should('have.text', '1')
            cy.get('li').last().should('have.text', '5')
        })

        // click "2"
        cy.get('div.demo-section.clearfix').eq(3).find('li.paginationjs-page.J-paginationjs-page ').eq(1).should('be.visible').click()

        // after clicking "2"
        cy.get('div.data-container > ul').eq(3).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(3).within(() => {
            cy.get('li').first().should('have.text', '6')
            cy.get('li').last().should('have.text', '10')
        })


        // click "1"
        cy.get('div.demo-section.clearfix').eq(3).find('li.paginationjs-page.J-paginationjs-page ').eq(0).should('be.visible').click()

        // after clicking "1"
        cy.get('div.data-container > ul').eq(3).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(3).within(() => {
            cy.get('li').first().should('have.text', '1')
            cy.get('li').last().should('have.text', '5')
        })


    })



    it('button next page, previous page', () => {
        // before clicking "next"
        cy.get('div.data-container > ul').eq(3).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(3).within(() => {
            cy.get('li').first().should('have.text', '1')
            cy.get('li').last().should('have.text', '5')
        })

        // click "next"
        cy.get('div.demo-section.clearfix').eq(3).find('li.paginationjs-next.J-paginationjs-next ').eq(0).should('be.visible').click()

        // after clicking "next"
        cy.get('div.data-container > ul').eq(3).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(3).within(() => {
            cy.get('li').first().should('have.text', '6')
            cy.get('li').last().should('have.text', '10')
        })



        // click "previous"
        cy.get('div.demo-section.clearfix').eq(3).find('li.paginationjs-page.J-paginationjs-page ').eq(0).should('be.visible').click()

        // after clicking "previous"
        cy.get('div.data-container > ul').eq(3).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(3).within(() => {
            cy.get('li').first().should('have.text', '1')
            cy.get('li').last().should('have.text', '5')
        })
    })


 
    it('manual last page', () => {
        // before clicking the last page
        cy.get('div.data-container > ul').eq(3).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(3).within(() => {
            cy.get('li').first().should('have.text', '1')
            cy.get('li').last().should('have.text', '5')
        })

        // click the last page
        cy.get('div.demo-section.clearfix').eq(3).find('li.paginationjs-page.J-paginationjs-page ').last().should('be.visible').click()

        // after clicking the last page
        cy.get('div.data-container > ul').eq(3).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(3).within(() => {
            cy.get('li').first().should('have.text', '36')
            cy.get('li').last().should('have.text', '40')
        })
    })


    it('checking the "go" button',   {
        browser: "chrome",
        viewportWidth: 614,
        viewportHeight: 614,
      }, () => {

        // type "2" -> click "Go"
        cy.get('div.demo-section.clearfix').eq(3).find('input.J-paginationjs-go-pagenumber').should('be.visible').and('have.attr', 'type', 'text').type('2')
        cy.get('div.demo-section.clearfix').eq(3).find('input.J-paginationjs-go-button').should('be.visible').and('have.value', 'Go').click()

        cy.get('div.data-container > ul').eq(3).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(3).within(() => {
            cy.get('li').first().should('have.text', '6')
            cy.get('li').last().should('have.text', '10')
        })

        // type "1" -> click "Go"
        cy.get('div.demo-section.clearfix').eq(3).find('input.J-paginationjs-go-pagenumber').should('be.visible').and('have.attr', 'type', 'text').type('1')
        cy.get('div.demo-section.clearfix').eq(3).find('input.J-paginationjs-go-button').should('be.visible').and('have.value', 'Go').click()
        
        cy.get('div.data-container > ul').eq(3).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(3).within(() => {
            cy.get('li').first().should('have.text', '1')
            cy.get('li').last().should('have.text', '5')
        })

        // last -> Go
        cy.get('div.demo-section.clearfix').eq(3).find('li.paginationjs-page.J-paginationjs-page ').last().invoke('text').then(lastPageButtonText => {
            cy.get('div.demo-section.clearfix').eq(3).find('input.J-paginationjs-go-pagenumber').should('be.visible').and('have.attr', 'type', 'text').type(`${lastPageButtonText}`)
        }) // extract page number
        cy.get('div.demo-section.clearfix').eq(3).find('input.J-paginationjs-go-button').should('be.visible').and('have.value', 'Go').click()

        cy.get('div.data-container > ul').eq(3).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(3).within(() => {
            cy.get('li').first().should('have.text', '36')
            cy.get('li').last().should('have.text', '40')
        })

    })
    
})


describe.skip('#5 "Auto hide previous & next button" pagination tests', () => {

    it('manual next page, previous page', () => {
        // before clicking "2"
        cy.get('div.data-container > ul').eq(4).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(4).within(() => {
            cy.get('li').first().should('have.text', '1')
            cy.get('li').last().should('have.text', '5')
        })

        // click "2"
        cy.get('div.demo-section.clearfix').eq(4).find('li.paginationjs-page.J-paginationjs-page ').eq(1).should('be.visible').click()

        // after clicking "2"
        cy.get('div.data-container > ul').eq(4).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(4).within(() => {
            cy.get('li').first().should('have.text', '6')
            cy.get('li').last().should('have.text', '10')
        })


        // click "1"
        cy.get('div.demo-section.clearfix').eq(4).find('li.paginationjs-page.J-paginationjs-page ').eq(0).should('be.visible').click()

        // after clicking "1"
        cy.get('div.data-container > ul').eq(4).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(4).within(() => {
            cy.get('li').first().should('have.text', '1')
            cy.get('li').last().should('have.text', '5')
        })


    })



    it('button next page, previous page', () => {
        // before clicking "next"
        cy.get('div.data-container > ul').eq(4).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(4).within(() => {
            cy.get('li').first().should('have.text', '1')
            cy.get('li').last().should('have.text', '5')
        })

        // click "next"
        cy.get('div.demo-section.clearfix').eq(4).find('li.paginationjs-prev.J-paginationjs-previous ').should('not.exist')  // "<" button is not shown yet
        cy.get('div.demo-section.clearfix').eq(4).find('li.paginationjs-next.J-paginationjs-next ').should('be.visible').click()

        // after clicking "next"
        cy.get('div.data-container > ul').eq(4).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(4).within(() => {
            cy.get('li').first().should('have.text', '6')
            cy.get('li').last().should('have.text', '10')
        })



        // click "previous"
        cy.get('div.demo-section.clearfix').eq(4).find('li.paginationjs-prev.J-paginationjs-previous ').should('be.visible').click()

        // after clicking "previous"
        cy.get('div.data-container > ul').eq(4).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(4).within(() => {
            cy.get('li').first().should('have.text', '1')
            cy.get('li').last().should('have.text', '5')
        })
    })


 
    it('manual last page', () => {
        // before clicking the last page
        cy.get('div.data-container > ul').eq(4).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(4).within(() => {
            cy.get('li').first().should('have.text', '1')
            cy.get('li').last().should('have.text', '5')
        })

        // click the last page
        cy.get('div.demo-section.clearfix').eq(4).find('li.paginationjs-page.J-paginationjs-page ').last().should('be.visible').click()
        cy.get('div.demo-section.clearfix').eq(4).find('li.paginationjs-next.J-paginationjs-next ').should('not.exist')  // ">" button disappeared

        // after clicking the last page
        cy.get('div.data-container > ul').eq(4).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(4).within(() => {
            cy.get('li').first().should('have.text', '31')
            cy.get('li').last().should('have.text', '35')
        })
    })

    
})



describe.skip('#6 "Mini" pagination tests', () => {


    it('button next page, previous page', () => {
        // before clicking "next"
        cy.get('div.data-container > ul').eq(5).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(5).within(() => {
            cy.get('li').first().should('have.text', '1')
            cy.get('li').last().should('have.text', '5')
        })

        // click "next"
        cy.get('div.demo-section.clearfix').eq(5).find('li.paginationjs-next.J-paginationjs-next ').should('be.visible').click()

        // after clicking "next"
        cy.get('div.data-container > ul').eq(5).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(5).within(() => {
            cy.get('li').first().should('have.text', '6')
            cy.get('li').last().should('have.text', '10')
        })



        // click "previous"
        cy.get('div.demo-section.clearfix').eq(5).find('li.paginationjs-prev.J-paginationjs-previous ').should('be.visible').click()

        // after clicking "previous"
        cy.get('div.data-container > ul').eq(5).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(5).within(() => {
            cy.get('li').first().should('have.text', '1')
            cy.get('li').last().should('have.text', '5')
        })
    })


    it('button next until the end of the list', () => {

        function clickUntilDisabled(selector, attempt = 0) {
            if (attempt === 100) { // Limit the number of attempts to prevent infinite loops
                throw new Error('Button did not become disabled');
            }

            cy.get(selector).then($button => {
                if (!$button.hasClass('disabled')) {
                cy.wrap($button).click().then(() => {
                    // Recursively call the function to check the button's state again
                    clickUntilDisabled(selector, attempt + 1);
                });
                }
            });
        }

        // paginationjs-next disabled 
        //nextButtonSelector = cy.get('div.demo-section.clearfix').eq(5).find('li.paginationjs-next')
        cy.get('div.demo-section.clearfix').eq(5).within(() => {
            clickUntilDisabled('li.paginationjs-next')
        })
        

        // after reaching the last page
        cy.get('div.data-container > ul').eq(5).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(5).within(() => {
            cy.get('li').first().should('have.text', '46')
            cy.get('li').last().should('have.text', '50')
        })

    })

})



describe.skip('#7 "Show all pages" pagination tests', () => {

    it('button next page, previous page', () => {

        // before clicking "2"
        cy.get('div.data-container > ul').eq(6).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(6).within(() => {
            cy.get('li').first().should('have.text', '1')
            cy.get('li').last().should('have.text', '5')
        })

        // click "2"
        cy.get('div.demo-section.clearfix').eq(6).find('li.paginationjs-page.J-paginationjs-page ').eq(1).should('be.visible').click()

        // after clicking "2"
        cy.get('div.data-container > ul').eq(6).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(6).within(() => {
            cy.get('li').first().should('have.text', '6')
            cy.get('li').last().should('have.text', '10')
        })


        // click "1"
        cy.get('div.demo-section.clearfix').eq(6).find('li.paginationjs-page.J-paginationjs-page ').eq(0).should('be.visible').click()

        // after clicking "1"
        cy.get('div.data-container > ul').eq(6).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(6).within(() => {
            cy.get('li').first().should('have.text', '1')
            cy.get('li').last().should('have.text', '5')
        })


    })



    it('button next page, previous page', () => {
        // before clicking "next"
        cy.get('div.data-container > ul').eq(6).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(6).within(() => {
            cy.get('li').first().should('have.text', '1')
            cy.get('li').last().should('have.text', '5')
        })

        // click "next"
        cy.get('div.demo-section.clearfix').eq(6).find('li.paginationjs-next.J-paginationjs-next ').eq(0).should('be.visible').click()

        // after clicking "next"
        cy.get('div.data-container > ul').eq(6).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(6).within(() => {
            cy.get('li').first().should('have.text', '6')
            cy.get('li').last().should('have.text', '10')
        })



        // click "previous"
        cy.get('div.demo-section.clearfix').eq(6).find('li.paginationjs-page.J-paginationjs-page ').eq(0).should('be.visible').click()

        // after clicking "previous"
        cy.get('div.data-container > ul').eq(6).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(6).within(() => {
            cy.get('li').first().should('have.text', '1')
            cy.get('li').last().should('have.text', '5')
        })
    })


 
    it('manual last page', () => {
        // before clicking the last page
        cy.get('div.data-container > ul').eq(6).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(6).within(() => {
            cy.get('li').first().should('have.text', '1')
            cy.get('li').last().should('have.text', '5')
        })

        // click the last page
        cy.get('div.demo-section.clearfix').eq(6).find('li.paginationjs-page.J-paginationjs-page ').last().should('be.visible').click()

        // after clicking the last page
        cy.get('div.data-container > ul').eq(6).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(6).within(() => {
            cy.get('li').first().should('have.text', '46')
            cy.get('li').last().should('have.text', '50')
        })
    })


    
})


/*

describe('#8 "Asynchronous or JSONP" pagination tests', () => {

    it('manual next page', () => {

    })

    it('manual previous page', () => {
        
    })

    it('button next page', () => {
        
    })

    it('button previous page', () => {
        
    })

    it('manual last page', () => {
        
    })
    
})



describe('#9 "Asynchronous & Dynamic total number" pagination tests', () => {

    it('manual next page', () => {

    })

    it('manual previous page', () => {
        
    })

    it('button next page', () => {
        
    })

    it('button previous page', () => {
        
    })

    it('manual last page', () => {
        
    })
    
})


*/


describe.skip('#10 "Specify default" pagination tests', () => {


    it('manual next page, previous page', () => {

        // before clicking "1"
        cy.get('div.data-container > ul').eq(9).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(9).within(() => {
            cy.get('li').first().should('have.text', '11')
            cy.get('li').last().should('have.text', '15')
        })

        // click "1"
        cy.get('div.demo-section.clearfix').eq(9).find('li.paginationjs-page.J-paginationjs-page ').eq(0).should('be.visible').click()

        // after clicking "1"
        cy.get('div.data-container > ul').eq(9).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(9).within(() => {
            cy.get('li').first().should('have.text', '1')
            cy.get('li').last().should('have.text', '5')
        })


        // click "2"
        cy.get('div.demo-section.clearfix').eq(9).find('li.paginationjs-page.J-paginationjs-page ').eq(1).should('be.visible').click()

        // after clicking "2"
        cy.get('div.data-container > ul').eq(9).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(9).within(() => {
            cy.get('li').first().should('have.text', '6')
            cy.get('li').last().should('have.text', '10')
        })


    })



    it('button next page, previous page', () => {
        // before clicking "next"
        cy.get('div.data-container > ul').eq(9).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(9).within(() => {
            cy.get('li').first().should('have.text', '11')
            cy.get('li').last().should('have.text', '15')
        })

        // click "next"
        cy.get('div.demo-section.clearfix').eq(9).find('li.paginationjs-next.J-paginationjs-next ').should('be.visible').click()

        // after clicking "next"
        cy.get('div.data-container > ul').eq(9).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(9).within(() => {
            cy.get('li').first().should('have.text', '16')
            cy.get('li').last().should('have.text', '20')
        })



        // click "previous"
        cy.get('div.demo-section.clearfix').eq(9).find('.paginationjs-prev.J-paginationjs-previous ').should('be.visible').click()

        // after clicking "previous"
        cy.get('div.data-container > ul').eq(9).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(9).within(() => {
            cy.get('li').first().should('have.text', '11')
            cy.get('li').last().should('have.text', '15')
        })
    })


 
    it('manual last page', () => {
        // before clicking the last page
        cy.get('div.data-container > ul').eq(9).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(9).within(() => {
            cy.get('li').first().should('have.text', '11')
            cy.get('li').last().should('have.text', '15')
        })

        // click the last page
        cy.get('div.demo-section.clearfix').eq(9).find('li.paginationjs-page.J-paginationjs-page ').last().should('be.visible').click()

        // after clicking the last page
        cy.get('div.data-container > ul').eq(9).find('li').should('be.visible').and('have.length', 5)
        cy.get('div.data-container > ul').eq(9).within(() => {
            cy.get('li').first().should('have.text', '31')
            cy.get('li').last().should('have.text', '35')
        })
    })


    
})


/*
describe('#11 "Format result data" pagination tests', () => {

    it('manual next page', () => {

    })

    it('manual previous page', () => {
        
    })

    it('button next page', () => {
        
    })

    it('button previous page', () => {
        
    })

    it('manual last page', () => {
        
    })
    
})


describe('#12 "Another format result data" pagination tests', () => {

    it('manual next page', () => {

    })

    it('manual previous page', () => {
        
    })

    it('button next page', () => {
        
    })

    it('button previous page', () => {
        
    })

    it('manual last page', () => {
        
    })
    
})


describe('#13 "Format navigator" pagination tests', () => {

    it('manual next page', () => {

    })

    it('manual previous page', () => {
        
    })

    it('button next page', () => {
        
    })

    it('button previous page', () => {
        
    })

    it('manual last page', () => {
        
    })
    
})


describe('#14 "Format \"go\" input" pagination tests', () => {

    it('manual next page', () => {

    })

    it('manual previous page', () => {
        
    })

    it('button next page', () => {
        
    })

    it('button previous page', () => {
        
    })

    it('manual last page', () => {
        
    })
    
})


describe('#15 "Methods & Events" pagination tests', () => {

    it('manual next page', () => {

    })

    it('manual previous page', () => {
        
    })

    it('button next page', () => {
        
    })

    it('button previous page', () => {
        
    })

    it('manual last page', () => {
        
    })
    
})

*/