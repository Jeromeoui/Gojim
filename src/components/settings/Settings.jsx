import React from 'react'
import "./settings.css"
import Switch from "react-switch";
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Button from 'react-bootstrap/Button';

const Settings = () => {
  
  //Used for toggling public/private workout
  const ref = useRef();
  const [on, toggleOn] = useState(false);
  // let data
  // const fetchUserSettings = (data) => {
  //   const username=localStorage.getItem("username")
  //   const info = {
  //     username,
  //   };
  //   try {
  //     const response =  fetch('http://127.0.0.1:5000/getprivacy', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(info)
  //     });
  //     data =  response.json();
  //   } catch (error) {
  //     console.error('Error fetching user settings:', error);
  //   }
  // };
  // fetchUserSettings(data);
  // useEffect(() => {
  //   toggleOn(true);
  //   // fetchUserSettings(data);
  // }, [data]);

  // fetchUserSettings(data);
  // console.log(data.privacy)
  // const [on, toggleOn] = useState(data.privacy);
  // if (on === null) {
  //   return <div>Loading...</div>;
  // }
  //Handles toggling workouts as private or public
  const handleToggle = async (e) => {
    toggleOn(!on);
    //handle backend logic here
    const username=localStorage.getItem("username")
    const data = {
      username,
      on,
    };

    try{
      const response = await fetch ('http://127.0.0.1:5000/privacy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      console.log(JSON.stringify(data))


      if(response.ok){
        const jsonData = await response.json();
        console.log(jsonData)
      }
      else{
        toggleOn(!on);
      }
    } catch(error){
      console.error('Error', error);
    }
  }

 //USERNAME
  //Contains newly typed username
  const [newusername, setUsername] = useState("");
  const handleNameChange = box => {
    setUsername(box.target.value);
  }

   //Handles changing username
  const handleUsername = async (e) => {
    //handle backend logic here
    const username=localStorage.getItem("username")
    const data = {
      username,
      newusername,
    };

    try{
      const response = await fetch ('http://127.0.0.1:5000/change-username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      console.log(JSON.stringify(data))

      if (response.ok){
        const jsonData = await response.json();
        console.log(jsonData)
        localStorage.clear();
        localStorage.setItem("username", JSON.stringify(newusername))
        setUsername("Username changed!");

        window.location.href = '/settings'
      } else {
        setUsername("Invalid Username/Already taken.");
        console.error('Error');
      }
    } catch(error){
      console.error('Error', error);
    }
  }
//EMAIL
    //Contains newly typed email
    const [email, setEmail] = useState("");
    const handleEmailChange = box => {
      setEmail(box.target.value);
    }

  //Handles changing email
  const handleEmail = async (e) => {
    ref.current.close();
    //handle backend logic here
    const username=localStorage.getItem("username")
    const data = {
      username,
      email,
    };

    try{
      const response = await fetch ('http://127.0.0.1:5000/change-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      console.log(JSON.stringify(data))

      if (response.ok){
        const jsonData = await response.json();
        console.log(jsonData)
        setEmail("Email changed!");
        window.location.href = '/settings'
      } else {
        setEmail("Invalid email.");
        console.error('Error');
      }
    } catch (error){
      console.error('Error:', error);
    }
  }

//PASSWORD
  //Contains string for old password
  const [oldpassword, setOldPassword] = useState("");
  const handleOldPassword = box => {
    setOldPassword(box.target.value);
  }
  //Contains string for new password
  const [newpassword, setPassword] = useState("");
  const handlePasswordChange = box => {
    setPassword(box.target.value);
  }
  //Handles changing password
  const handlePassword = async (e) => {
    ref.current.close();
    //handle backend logic here
    const username=localStorage.getItem("username")
    const data = {
      username,
      oldpassword,
      newpassword,
    };

    try{
      const response = await fetch ('http://127.0.0.1:5000/change-pwd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      console.log(JSON.stringify(data))

      if (response.ok){
        const jsonData = await response.json();
        console.log(jsonData)
        setPassword("Password changed!");
        window.location.href = '/settings'
      } else {
        setPassword("Invalid password.");
        console.error('Error');
      }
    } catch (error){
      console.error('Error:', error);
    }
  }

  //Handles deleting account
  const [deleteaccount, setdeleteaccount] = useState(false);
  const handleDelete = async (e) => {
    //handle backend logic here
    const username=localStorage.getItem("username")
    setdeleteaccount(true);
    const data = {
      deleteaccount,
      username,
    };
    try{
      const response = await fetch ('http://127.0.0.1:5000/delete-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      console.log(JSON.stringify(data))

      if (response.ok){
        const jsonData = await response.json();
        console.log(jsonData)
        localStorage.clear();
        window.location.href = "/login"
      } else {
        console.error('Error');
      }
    } catch (error){
      console.error('Error:', error);
    }
  }

  return (
    <div>
      <div className="settingTitle">
        Settings
      </div>

      {/*Toggle private/public workouts*/}
      <div className="options">
        <p>
          Workouts Public?
          <Switch onChange={handleToggle} checked={on} className="toggle"/>
        </p>

        {/*Change Name*/}
        <p>
          <Popup ref={ref} position="right center" trigger={<Button variant="link" className="button">Change Username</Button>}>
            {close =>(
              <div>
                <p className="settingsPopupTitle">New Username</p>
                <p><input type="text" className="input" onChange={handleNameChange}/></p>
                <p>
                  <Button variant="link" onClick = {() => {close(); handleUsername()}} className="button">Confirm</Button>
                  <Button variant="link" onClick = {close} className="button">Cancel</Button>
                </p>
              </div>
            )}
          </Popup>
        </p>

        {/*Change email*/}
        <p>
          <Popup ref={ref} position="right center" trigger={<Button variant="link" className="button">Change Email</Button>}>
            {close =>(
              <div>
                <p className="settingsPopupTitle">New Email</p>
                <p><input type="text" className="input" onChange={handleEmailChange}/></p>
                <p>
                  <Button variant="link" onClick = {() => {close(); handleEmail()}} className="button">Confirm</Button>
                  <Button variant="link" onClick = {close} className="button">Cancel</Button>
                </p>
              </div>
            )}
          </Popup>
        </p>

        {/*Change password; asks for both old password and new pasword*/}
        <p>
          <Popup ref={ref} position="right center" trigger={<Button variant="link" className="button">Change Password</Button>}>
            {close =>(
              <div>
                <p className="settingsPopupTitle">Old Password</p>
                <p><input type="text" className="input" onChange={handleOldPassword}/></p>
                <p className="settingsPopupTitle">New Password</p>
                <p><input type="text" className="input" onChange={handlePasswordChange}/></p>
                <p>
                  <Button variant="link" onClick = {() => {close(); handlePassword()}} className="button">Confirm</Button>
                  <Button variant="link" onClick = {close} className="button">Cancel</Button>
                </p>
              </div>
            )}
          </Popup>
        </p>

        {/*Delete Account*/}
        <p><Button variant="link" onClick = {() => {handleDelete()}} className="button">Delete Account</Button></p>
      
      </div>
    </div>
  )
}

export default Settings