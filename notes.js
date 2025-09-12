

//? ⏲ 42:54 --> 53:55

//* we dont need the horizantal scroll
//* we need one image to be slightly to the top under the pizza image
//* we need a grid of 3 columns for our menu
//? we can use a div for example and see how it works
//?and then decide if we want it to be a component

//? ⏲ 1:06:43 -->1:22:14

//* Authentication using credentials and google account front end 
//* Authentication: we need yo create api/auth/[...nextauth]/routes.
//* ts file and import the provider
//* In api/register/route.ts we need to create a POST function 
//* that receives the req from the front end
//* (test using the network in inspect) and we need to create a user in the database


//* When we use the internal api we need to check the terminal, the status 
//* coede won't appear in the network tab
//* To be able to check the status in the network tab we need to use the external 
//* api aka the full url : http://localhost:3000/api/signin
//* in my case, they both work, I just had to unable the 3rd pardy requests in the netrwork tab


//? ⏲ 1:40:57 --> 2:10:09

//* 😢 Issue : the validate function is not working on the password field

//* 🔻 adding return false to the validate function
//* 🔻 restarting the server
//* 🔻 changing the models folder to putside the app folder
//* 🔻 assigning the user and then exporting it, then importing is as User and not {User}
//* 🔻 in the import use ./../../models/user.model.js (with the .js)
//* 🔻 adidng specific paths to the jsconfig.json file, like "@/app/*": ["./src/app/*"] 
//* 🔻 add "baseUrl": "." to the tsconfig.json file
//* 🔻 add include ["."] to the tsconfig.json file
//* 🔻 add module :"ES2022" to the tsconfig.json file

// ⬇️  ⬇️  ⬇️  ⬇️  ⬇️  ⬇️  ⬇️  ⬇️  ⬇️  ⬇️  ⬇️  ⬇️  ⬇️

//* 💚 just use "../../models/user.model" instead of @/app/models/user.model


//? before hashing, we tried doing a console log of everrything
//? so we used a User.pre('save',  function (next) { console.log(this) })
//? it gaves us nothing since we don't have any data yet
//? so we tried the User.post('validate.....) and it gave us the email and password document
//? starting simple, we don't need th ehashing fucntion to be fancy from the get go
//? we satrted by simply trying to switch the password with another string


//TODO hash the password
//TODO add states when the password is being created and when the password is created
//TODO block the input fields and the register button when the password is being created
//TODO add a message when the password is created successfully
//TODO add styling for the disabled input fields and the disabled register button

//* If we're having trouble with the import of paths starting with @,and you have a tsconfig.json as well
//* as a jsconfig.json file, try adding the path to the CompilerPaths in the tsconfig.json

//* Unique: True for email not working !! --> the unique: true option—it doesn’t 
//* actually validate uniqueness in the way you'd expect during .save() operations. 
//* It only creates a unique index in the database if it doesn't already exist. 


//? ⏲ 2:10:09 --> 2:23:50

//* created new directory for the Login page
//* modified the logic in the api/auth
//* we need the SECRET_KEY and the NEXTAUTH_URL in the .env file, we use the SECRET_KEY in the NextAuth function
//* we used the signIn from next/auth and we paseed the credentials to it.
//* for now we just have our passed credentials console loged !!


//? ⏲ 2:24:00 --> 2:54:00

//* checking the credentrials in the route.ts file, then we tried to console log them, but the login page was redirected to 
//* this page: http://localhost:3000/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Flogin
//* so nothing wasin the conosle log until we reentered the credentials in the last page!!
//* the problem turned out to be that I was using  "await signIn('Credentials',{email, password, callbackUrl:'/profile'})"
//* with a capital C instead of a lowercase c in credentials !!!

//* Then we faced a "Loading" status when I successfully logged in, so we made a hook for the SessionProvider and made as a cilent
//* use, and wrapped tht layout in it. And we added a mongodbAdapter.ts file as well, why ? we want our logged in users, accounts,
//* and sessions to be stored in the database, by default next-auth stores then in JWT (Json Web Token) format in the cookies,
//* which is temporary and not persistent, so we need to use the adapter to store them in the database.


//* before we made a lib directory with a auth.js file to get the session, we used the getServerSession function from next-auth
//* and we passed the NextAuth function to it, and then we used it in the header page to get the session and control the login/
//* logout button.

//? ⏲ 2:54:00 --> 3:28:00

//TODO add profile editting page
//! if we're using Images from another hostnames we need to add them to the next.config.js file
//* we imported AuthOptions from the auth.js file and we used it in the getServerSession function
//* when we got our seesion we used the emmail to get the user from the database and then update its name

//? ⏲ 3:28:00 --> 4:28:00

//* In case of uploading images, we need to use the FormData API to send the image to the server
//* the content type should be multipart/form-data not application/json
//* we might not need the headers to begin with

//* const data = await req.json(); // ❌ Wrong for file uploads
//* Instead, use:const data = await req.formData();
//* to get our file we use : const file = formadata.get('file'), then we config our Cloudinary,
//* then we convert it to buffer ? what is buffer ? 
//* then we uplaod it to Cloudinary using the upload_stream method, then we connect to the DB,
//* then we get the user from the session, then we update the user with the new image
//* and then we return the response with the new image url


//* Next.js run the code in two diffrent environments : Edge runtime and Node.js runtime, the first one is faster
//* but it has some limitaitions, like fs and buffer and stream, but the second one is slower but it has more features

//* buffer is a global object in Node.js that allows you to work with binary data directly,and we need to convert the 
//* image file to buffer because Cloudinary needs it in that format to upload it to the server

//* stream simply means that we can read the data in chunks instead of loading it all into memory at once, which is more efficient
//* we can use the arrayBuffer method to convert the file to an ArrayBuffer, and then we can use the Buffer.from method to convert it to a Buffer
//* we can use the upload_stream method to upload the image to Cloudinary, and we can use the end method to finish the upload
//* we can use the new Promise method to wrap the upload_stream method in a promise, so we can use async/await to wait for the upload to finish

//* we used React Hot Toast to show the loading and success messages, we can use the toast.promise method to show the loading message
//* and then we can use the await keyword to wait for the promise to resolve, and then we can use the toast.success method to show the success message
//* we can use the toast.error method to show the error message if something goes wrong
//* so we no longer needed the setSaving and setSaved states, we can just use the toast.promise method to show the loading and success messages
//* When we're using a promise we dont need the async/await keyword, we can just use the .then method to handle the response



//? ⏲  4:28:00--> 5:00:00

//* We're addin multiple inputs under th email adress and we're sending them via api/profile along with the image and the name
//* we don't have the other infos (phone, country, city etc) ion the session response, so we use a GET endpoint to get these
//* infos in use them in the initial page load

//* Wer added multiple tabs for the Admin, profile, Menu Itmes, Categories, and USers. Before that we added a single field to 
//* the user collection to store the role of the user, and we used it to show/hide the admin tabs

//? ⏲  5:00:00--> 6:00:00

//* We created the category page, and added it to the databse, it's simple, we just needed the name of the new category in case 
//* of POST requests, and the name plus the _id in case of the PUT request
//* also, I added minLength to the name field in case the user clicked "create" before typing anything


//? ⏲  6:00:00--> 6:30:00

//* We started making the menu-items page, we need:image, name, price, properties, category
//* don't think too much at first, the extra properties will be added later, now we can add what's needed and basic
//* like the image, name, price, category

//? ⏲  6:30:00--> 7:00:00

//* we made the items page, in it we have a link leading to create item page, and the edit page apears when we click on the item
//* we notices that the profile, edit item, and add item use the UplaodImage function so we made a seperate file for it and passed the
//* link and setLink props to it, the link works as the initial value and the setlink works as the setter function fot the updated link 

//? ⏲  7:00:00--> 7:30:00

//* We added input fíelds for Sizes and Ingredients, and I struggled a bit with the state management,
//* 🔴 sizes.map((item, index) => (
//*        <input onChange={e => item.size = e.target.value} />
//*      ))
//*              ➡️ doesn’t update state properly.

//* 🔴 setSizes(oldSizes => {
//* return [...oldSizes[index].size = e.target.value]
//* })
//*              ➡️ dCore issue: React state must be treated as immutable.
//*                  Mutating objects directly (like item.size = value) won’t trigger re-renders. 
//*                  You need to create a copy of the whole array and the item you’re updating.

//* ✅ Correct Approach:

//*  setSizes(prev => {
//*  const updated = [...prev];
//*  updated[index] = { ...updated[index], size: e.target.value };
//*  return updated;
//*  });
//? ⏲  7:30:00--> 8:00:00

//* We added the ability to to delete a menuItem, and prop from a menuItem, 
//* We added the ability to delete a category
//* We added a toggle to show and hide the props of a menuItem

//? ⏲  8:00:00--> 8:30:00

//* We added a confiramtion modal to delete a menuItem, prop, or category
//* We added a users page, and adjusted the width of the forms and sections
//* I gathered all of the pages in a single directory called pages

//? ⏲  8:30:00--> 9:00:00

//* We made one component for the user edit, we imported in the the profile page and the users page
//* we passes the user info and the setUserInfo function to it, and we used it to edit the user info

//* I tried registering and login in with credentials instead of google account and it didnt work 
//* even though I had the same code in the register and login pages
//* turned out to be that I : 
//*  1️⃣ dont have to explicitly add the session: "databsase" to the NextAuth function
//*  2️⃣ I only had to use this line:adapter: MongoDBAdapter(clientPromise), in both providers
//*  3instead of making a part of the NextAuth object.



//? ⏲  9:00:00--> 9:30:00

//* We need to display the admin toggle for the admin users only
//* On the homepage we displayed three main items on the menu, for the we used the following function: 

                        // const getAllItems = async () => {
                        //         await fetch('/api/menuItems').then(res => {
                        //                 if (res.ok) {
                        //                         return res.json().then(data => {
                        //                                 setAllItems(data.slice(0, 3))
                        //                         })
                        //                 }

                        //         })
                        // }

//* I faced a problem with the item image not taking the same space, so I added the follwing className to the Image :div className="w-[200px] h-[200px] relative mt-4 mx-auto">
                        //      <div>
                        //        <Image
                        //          src={item.itemImage}
                        //          alt="userImage"
                        //          fill
                        //          className="object-cover rounded-lg"
                        //        />
                        //      </div>
//* we just have to put it in a div with the fixed width and height, and then we use the fill property to make it take the whole space  

//* to make any text, no matter how long it is to take a specific number of lines, we can use the following className:

                        // className="text-gray-700 text-sm mb-3 text-center mx-14 line-clamp-3 "



//? ⏲  9:30:00--> 10:20:00

//* Why You DO Need a Separate Cart Context ?? 🔹 Because the cart is application  state, not authentication state
//*Cart data is:
        //!Mutable (you can add/remove items)
        //!Temporary or persistent (you may sync it to a DB, or not)
        //!Specific to user interaction — not login
//* So, it should be managed separately from authentication state.

//*Best Practice = Separation of Concerns
//*You want:

//!SessionContext: manages auth
//!CartContext: manages shopping cart
//!ThemeContext (maybe): manages dark/light mode

//!❌ Bug:

        //*useEffect(() => {
        //*const savedCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
        //*setCartItems(savedCart);
        //*}, [cartItems]); // 🚨 loop!

//? Fix:
        //*useEffect(() => {
        //*(const savedCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
        //*setCartItems(savedCart);
        //*}, []);
        
// Then sync changes afterwards:

        //* useEffect(() => {
        //*localStorage.setItem('cartItems', JSON.stringify(cartItems));
        //* }, [cartItems]);

2. onClick Triggered Automatically on Render
❌ Bug:


onClick={addToCart(item)} // runs immediately
✅ Fix:
Wrap in function:

onClick={() => addToCart(item)}

setSelectedExtras(prev => {
  [...prev, newItem] // nothing returned
});
-------> Fix🧮 setSelectedExtras(prev => [...prev, newItem]);

4. Adding Strings Instead of Numbers in Price Calc
❌ Bug:

"11" + 2 = "112" // string concatenation
✅ Fix:

Number("11") + Number(2) = 13

//! After editing user information (e.g., name or email) and saving it to the database, the session data (used by useSession()) didn’t reflect the changes immediately. The updated info only showed after logging out and logging in again.
//?🔍 What was happening:
next-auth stores session data using JWT (token).

Updating the database does not automatically update the session data.

Calling useSession() still returned the old token values, because the session callback hadn’t been triggered to refresh the token.

Using getSession() and useSession() together created confusion.

Updating data in the UI didn’t persist to session state unless manually refreshed.

1: Added update() from useSession() in the client component:

const { update } = useSession();

await update({
  name: userName,
  email: userEmail,
});

2:Configured the authOptions in pages/api/auth/[...nextauth].js with proper callbacks:

callbacks: {
    async jwt({ token, user, trigger, session }) {
    
        if (trigger === "update") {
             console.log('shibal session', session)
            token.name = session?.user?.name;
            token.email = session?.user?.email;
        }

        return token;
    },
    async session({ session, token }) {
        return {
            user:{                name: token.name,
                email: token.email,
            }
        }
    }
}

🧠 Lessons Learned:
update() in next-auth only works if the JWT callback handles the "update" trigger properly.

Don't expect session to magically reflect database changes — it needs a push.

Keep useSession() and getSession() clear in your logic — avoid mixing unless necessary.

Watch for shape mismatches. The session shape must match what your callbacks return.

Most bugs aren’t about skill — they’re about persistence, precision, and asking the right questions. 😉

//* PART 2

//? 00:00:00 ⏲ 01:00:00

  //* add the delivery fees to the total price in the cart page

