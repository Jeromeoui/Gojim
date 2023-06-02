import React, {useState, useEffect} from 'react'
import "./signup.css"

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the form from submitting normally
    
        // Create a data object with the user's input
        const data = {
          email,
          username,
          password1,
          password2,
        };
    
        try {
          // Send a POST request to the backend endpoint '/sign-up'
          const response = await fetch('/sign-up', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
          console.log("HERE")
          if (response.ok) {
            // Success response from the backend
            const jsonData = await response.json();
            console.log("Sucess!!!!!")
            // Do something with the response data if needed
          } else {
            // Error response from the backend
            // Handle the error case accordingly
          }
        } catch (error) {
          console.error('Error:', error);
          // Handle any network or other errors
        }
      };

    // useEffect(() => {
    //     // Function to fetch data from the backend API
    //     const fetchData = async () => {
    //     try {
    //         const response = await fetch('/sign-up'); // Replace with your API endpoint URL
    //         const jsonData = await response.json();
    //         setData(jsonData); // Update state with the fetched data
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    //     };

    //     fetchData(); // Call the fetch data function
    // }, []);
    return (
        <div>
            <div className = "signUpTitle">
                Begin your workout by signing up today!
            </div>

            /*Sign-in Credentials*/
            <div className = "signUpCreds">
                    <p>
                    <label for = "signUpUsername">
                        Choose a Username (8-16 characters long):
                    </label>
                    <input 
                      type = "text" 
                      id = "signUpUsername" 
                      name = "signUpUsername" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    </p>

                    <p>
                    <label for = "signUpEmail">
                        Enter your email:
                    </label>
                    <input 
                      type = "text" 
                      id = "signUpEmail" 
                      name = "signUpEmail" 
                      value = {email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    </p>
                
                    <p>
                    <label for = "signUpPassword">
                        Choose a Password (8-16 characters long):
                    </label>
                    <input 
                    type = "text" 
                    id = "signUpPassword" 
                    name = "signUpPassword" 
                    value = {password1}
                    onChange={(e) => setPassword1(e.target.value)}
                    />
                    </p>

                    <p>
                    <label for = "signUpPassword2">
                        Confirm Password:
                    </label>
                    <input 
                    type = "text" 
                    id = "signUpPassword2" 
                    name = "signUpPassword2" 
                    value = {password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    />
                    </p>
              </div>

                {/*Submit Button*/}
                <div className = "submitSignUp" onClick={handleSubmit}>
                    <input type="submit" value="Sign Up Now!" />
                </div>
        </div>
    )
}

export default SignUp