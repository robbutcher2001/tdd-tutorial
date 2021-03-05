# tdd-tutorial

Tutorial for approaching TDD in the front-end

## High-Level Project Requirements: A Contrived Example

A Product Owner has come to us with a set of requirements for a basic text transformation app they need for one of their clients. These are the requirements our PO initially asks for:

- Build a simple UI with an input field, action buttons and an area for 'output cards'.
- An 'output card' should contain the original text from the input field, the transformed output text and the action that was performed on the original text.
- The actions that should be possible are:
  - Convert to 'lowercase'
  - Convert to 'UPPERCASE'
  - Convert to 'camelCaseTextWithoutSpaces'
  - Convert to 'Capitalise Case Text With Spaces'
- The UI design and UX is down to the discretion of the developer – there are no requirements for these.

Okay, now we have our requirements. Let's think about them from a developers' point-of-view. By this, I do not mean low-level code implementation, but more what should the finished product look like from a UI perspective. The requirements outlined above scream some initial obvious points:

- There should be a single input field. We can get this element by its accessible role i.e. 'textbox'. We will expect only one of these to be returned by the test query as the requirements state only an 'input field' should exist.
- There will be several buttons to perform actions on the input text. We can get all of these buttons using a role query then find the one we want to click on in the test by inspecting its 'label'.
- Assert there is an unordered list (ul) present on the page. You'd expect this 'ul' to be the output area containing the 'output cards'. The requirements do not state whether the 'output cards' should be unordered or ordered. Let's assume unordered for now but let's go back to the PO for some clarity on the requirements on this.
- An 'output card' should then be represented by a List Item (li). Once you've queried the markup in your test to return all list items, you'll then be able to assert an 'output cards' content.

One of my little tricks is to write tests asserting for accessible roles like 'textbox', 'button', 'list', 'link' and 'checkbox'. This will force us to write an implementation later on that is accessible. Two birds, one stone and all that!

Accessible role testing is best placed on the actual component view. React-testing-library is focused on this, so we'll leave this kind of testing until then. Our first focus to start with should be app testing as a whole and to do this, we'll use Cypress. Puppeteer is another possibility here, but I've chosen Cypress for this example simply because their API is very good. It's just a personal preference thing.

To write the feature-file test in Cypress, we can assert for the same things we listed above (textboxes, buttons and a list) but instead of using CSS selectors, classes or element IDs, it's recommended we use 'data-' attributes on the elements. This separates the tests from the implementation, making the tests less brittle and isolating them from CSS and JS changes.

Right, let's write a feature file to interact with UI asserting for the elements and interactions we are expecting to see as outlined above.

An approach I like to take is to write all the 'shoulds' first. This really makes you think about the final solution and forces you to think about how interactions will tie together. So, our simple text translation app (I typed this out exactly as I thought about it, in this order):

- Should let you type text into an input field.
- Should have four action buttons available: 'Lowercase', 'Uppercase', 'Camel case' and 'Capitalise case'.
  - _Thoughts: here, we were forced to think about the text we want displayed in the buttons._
- Should show the transformation text result in an 'output card' once a button is clicked.
  - _Thoughts: okay, so this is once a button is clicked but what should the state be before a button is clicked? Let's write a 'should' to cover this._
- Should load with an initially empty list before any button is clicked.
  - _Thoughts: so, the initial state of the list is empty but what about the initial state of the input box and buttons? Let's add a 'should'._
- Should load with an initially empty input box.
- Should load with disabled action buttons.
- Should only enable action buttons once there is one or more characters typed into the input field.
  - _Thoughts: okay, so that's everything around user interactions. Now let's refer back to the requirements and see what we've missed. Output card contents is missing!_
- Should contain an output card with the contents of 'original text', 'transformed text' and the 'action taken' by the user.
  - _Thoughts: we now need to think about the card history._
- Should contain a list of two cards once two action buttons have been clicked.
- Should contain a list of three cards once three action buttons have been clicked.
  - _Thoughts: okay, this is where we need to go back to our PO as ask for clarity, do we want the card history to be unordered or ordered?_

...we speak to the PO and they comes back to us with a list of clarifications:

- The 'output cards' should always remain visible once they appear, providing a history of all of the text transformations the user has performed.
- The transformation history should be presented as a list with the most recent at the top.
- The transformation history does not need to persist between page (app) refreshes.

...okay, this is brilliant. Our PO has clarified that we need the 'output card' history to exist as a list (we made an assumption previously here as the original requirements were a little ambiguous and only said 'an area for output cards'.) We also have some additional clarification that the list should be ordered and also the direction of ordering. The final clarification they provided is that the app does not need to save any state to a backend or local storage. It is fine for the app state to disappear when the app is unmounted.

Okay, let's carry on defining all of our 'shoulds':

- ~~Should contain a list of three cards once three action buttons have been clicked.~~
- Should contain a list of three cards once three action buttons have been clicked, with the most recent translation at the top.
- Should not maintain state between page (app) refreshes.

That's about it for all of our end-to-end UI test definitions. Let's now create a new project and add Cypress as a dep. Here's my [first boilerplate commit](https://github.com/robbutcher2001/tdd-tutorial/commit/30a4d75968d579f833d7ac16a31bd0b953505dbd).

We can now add these to a Cypress feature file (still without their implementation):

![Int test defs](resources/int_test_defs.png)

Commit: [3d3e0db](https://github.com/robbutcher2001/tdd-tutorial/commit/3d3e0db72115210aa2746ee41797b7c22635eb82).
