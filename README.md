Pre-requisites: Node,NPM,A terminal software.

Open the terminal in the directory where the parent folder of this document is located or cd into the directory.
Run "npm i" in the terminal app.
After the installation ends.
Run "npm run server"
Open another instance of the terminal app
Run "npm run client"

Access the client [here](http://localhost:3000)
Access the server [here](http://localhost:4000)

UserIds :
Username : admin,
Role : admin,
Password : 123456

Username : author1,
Role : author,
Password : 123456

Username : author2,
Role : author,
Password : 123456

Please note the Reader role works without login.

**Project Description**
The project achieves all the goals set in the assignment.

**Pages :**

_1. Homepage:_

- Homepage's first page is Server-Side Rendered as can be verified by turning off javascript for the site.On turning it off we can see all of the html but no styling since chakra-ui was used to style homepage components.Pagination is implemented on the client-side with JS thus pagination does not work without JS.
- Without logging in a user is able to access all posts and comment on them and see comments by others.

_2. Post page:_

The post page has three parts:

- _The Post_ itself on the left with _Edit_ and _Delete_ buttons that will be conditionally rendered when the user is logged in as an _Admin_ or _Author_ of the post in the database. The HTML for the post rich text will be parsed by using UseLayoutEffect hook to prevent the user from seeing html as text.
- _Add Comment Form_ for posting comments.The Add comment form uses React-Hook-Form for client side validation.When validations are satisfied and Submit button is pressed the _app_ makes a post request with axios to the database.
- _Comments_ receives the post's comments in the database adds each one to the div to be displayed.

_3. Create Page:_

- On the Home Page when the user is logged in as an _Author_ or an _Admin_ a Create button is conditionally rendered to provide them access to the Page for creating a post.Even if we try to access the create route by editing the url we will only get the message "Not Authorized".

- _Add Post Form_
  On this page there are two input fields one for _Title_ and one for _Body_.
  - The Body Input field is built with React Draft Wysiwyg a library built with DraftJS and ReactJS.
  - There are 5 options to make the text rich. Make it Bold,Italic or underline or make an ordered or unordered list.
  - On Submitting :
    1.The form does client side validation with React-Hook-Form such that none of the fields can be empty.
    2.Then an axios post request is made with the username stored in redux store and the title & body in the form.

_4. Edit Page:_
On clicking the Edit button on any post page we will take to the Edit page for that post.The edit page is exactly the same as _Create Page_. The only two differences being :

- With a getServerSideProps function identical to the function for the _Post Page_ we get the data first.
- The data received with getServerSideProps is provided as default values to the input fields.
- On Submitting a Patch request is made instead of a Post request.

_5. Delete Button:_
If the user is either logged in as admin or the author of the post they see delete button on the post page and on clicking it they can delete the post from the database.
