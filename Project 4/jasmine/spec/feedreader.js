/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through each feed in the allFeeds object and checks 
         * that it has a URL defined and that the URL is not empty.
         */
         it('has feeds with defined URLs that are not empty', function() {
            for(feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
         });


        /* Loops through each feed in the allFeeds object and checks
         * that it has a name defined and that the name is not empty.
         */
         it('has feeds with defined names that are not empty', function() {
            for(feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
         });
    });


    /* Test suite for testing the menu */
    describe('The menu', function() {

        /* Checks that the menu element is hidden by default. */
         it('is hidden by default', function() {
            const menu = document.querySelector('body');
            expect(menu).toHaveClass('menu-hidden');
         });

         /* Checks that the menu changes visibility when the menu icon is clicked. */
          it('changes visibility when menu icon is clicked', function() {
            const menuIcon = document.querySelector('.menu-icon-link');
            const menu = document.querySelector('body');

            menuIcon.click();
            expect(menu).not.toHaveClass('menu-hidden');
            menuIcon.click();
            expect(menu).toHaveClass('menu-hidden');
          });

    });

    /* Test suite for testing loadFeed functionality */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* Check that when the loadFeed function is executed, there is
         * at least a single .entry element within the .feed container.
         */
         it('has at least one .entry element within the .feed container', function() {
            const entriesOnPage = document.querySelectorAll('.feed .entry');
            expect(entriesOnPage.length).not.toBe(0);
         });

    });

    /* Test suite for testing loading new feeds */
    describe('New Feed Selection', function() {

        /* Check that when a new feed is loaded that the content actually changes. */
         it('has changed', function(done) {

            let entryFromFirstFeed;
            let entryFromSecondFeed;

            loadFeed(0, function() {
                entryFromFirstFeed = document.querySelector('.feed .entry').innerText;
                loadFeed(1, function() {
                    entryFromSecondFeed = document.querySelector('.feed .entry').innerText;
                    expect(entryFromFirstFeed).not.toEqual(entryFromSecondFeed);
                    done();
                });
            });
         });
    });
}());
