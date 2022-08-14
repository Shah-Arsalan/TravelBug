import { createSlice ,current } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { useLocation, useNavigate } from "react-router-dom";




const localStorageItems = JSON.parse(
    localStorage.getItem("LoginCredentials")
  );

const initialState = {
   token : localStorageItems?.userToken,
   user : localStorageItems?.activeUser
}

const loginHandler = createAsyncThunk("auth/login" , async ({email,password}) => {

    console.log("calling" , email,password)
    try {
        const response = await axios.post("/api/auth/login", {
          email,
          password,
        });
  
console.log("the resp is" , response)
       return {data :response.data}
      
        
      } catch (error) {
        console.log(error);
      }
})

const signupHandler = createAsyncThunk("auth/signup" , async ({email,password,firstname,lastname}) => {

  console.log("calling" , email,password)
  try {
      const response = await axios.post("/api/auth/signup", {
        email,
        password,
        firstname,
        lastname
      });

console.log("the resp of user is" , response.data.createdUser)
     return {data :response.data}
    
      
    } catch (error) {
      console.log(error);
    }
})


// const signupHandler = async (email, password, firstname, lastname) => {
//   try {
//     const response = await axios.post("/api/auth/signup", {
//       email,
//       password,
//       firstname,
//       lastname,
//     });

//     if (response.status === 200 || response.status === 201) {
//       localStorage.setItem(
//         "LoginCredentials",
//         JSON.stringify({
//           userToken: response.data.encodedToken,
//           activeUser: response.data.foundUser,
//         })
//       );

//       setUser(response.data.createdUser);

//       setToken(response.data.encodedToken);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };


const authenticationSlice = createSlice({
    name : "authentication",
    initialState, 
     reducers: {
      logout: (state, action) => {
        state.token = "";
        state.user ="";
        localStorage.removeItem("LoginCredentials");
      },
    }, 
    extraReducers : {
      [loginHandler.pending] : ( action )=> {
        console.log("the action is" , action)
    },
      [loginHandler.fulfilled] : (state,action) => {
      // const navigate = action.payload.navigate
      console.log("the action is " , action)
      // let from = location.state?.from?.pathname || "/";
      //  let from = action.payload.location?.state?.from?.pathname || "/"; // immer use makes it async
        
        localStorage.setItem(
            "LoginCredentials",
            JSON.stringify({
              userToken: action.payload.data.encodedToken,
              activeUser: action.payload.data.foundUser,
            })
          );
          state.user = action.payload.data.foundUser
          state.token = action.payload.data.encodedToken
        
          // action.payload.navigate(from, { replace: true });
          // action.payload.navigate("/")

      },
      
      [loginHandler.rejected]: (action) => {
        console.error(action.payload);
      },


      [signupHandler.pending] : (action )=> {
        console.log("the action is" , action)
    },
      [signupHandler.fulfilled] : (state,action) => {
      // const navigate = action.payload.navigate
      console.log("the action is " , action)
      console.log("the state is " , current(state))
      // let from = location.state?.from?.pathname || "/";
      //  let from = action.payload.location?.state?.from?.pathname || "/"; // immer use makes it async
       
        localStorage.setItem(
            "LoginCredentials",
            JSON.stringify({
              userToken: action.payload.data.encodedToken,
              activeUser: action.payload.data.createdUser,
            })
          );
          state.user = action.payload.data.createdUser
          state.token = action.payload.data.encodedToken
          // action.payload.navigate(from, { replace: true });
          // action.payload.navigate("/")
      },
      
      [signupHandler.rejected]: (action) => {
        console.error(action.payload);
      },
    }
})

export default authenticationSlice.reducer
export {loginHandler , signupHandler}
export const {logout} = authenticationSlice.actions
//   setUser(response.data.createdUser);
//   setToken(response.data.encodedToken);