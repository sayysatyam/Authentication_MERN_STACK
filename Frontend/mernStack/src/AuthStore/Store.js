import {create} from "zustand";
import axios from "axios";
const API_URL  = "http://localhost:3000/api/auth";
axios.defaults.withCredentials=true;
export const useAuthStore = create((set)=>({
    user:null,
    isAuthenticated :false,
    error:null,
    isLoading:false,
    isCheckingAuth : true,
    successmsg:null,
    success:false,
    verifyLoading:false,
    isSingup:false,
    signup : async(name,email,password)=>{
            set({isLoading:true,signupError:null,isSingup:false});
            try{
                const response =  await axios.post(`${API_URL}/signup`,{email,password,name});
                    set({user:response.data.user,isAuthenticated:true,isLoading:false,successmsg:response.data.message,success:true,isSingup:true});
                    return true;
            }
            catch(error){
                set({signupError:error.response.data.msg|| "User Signing Up", isLoading:false,success:false,isSingup:false});
                throw error;
            }
    },
    verifyEmail : async(code)=>{
        set({isLoading:true,error:null});
        try {
            const response = await axios.post(`${API_URL}/verify-email`,{code});
            set({user:response.data.user,isAuthenticated:true,isLoading:false,successmsg:response.data.message});
            return true;
        } catch (error) {
            set({error:error.response.data.message, isLoading:false});
                throw error;
        }
    },
    login : async(email,password)=>{
        set({isLoading:true,Logingerror:null});
        try {
            const response = await axios.post(`${API_URL}/login`,{email,password});
            set({user:response.data.user,isAuthenticated:true,isLoading:false});
            return true;
        } catch (error) {
            set({Logingerror:error.response?.data?.msg|| "Invalid Credentials", isLoading:false});
        }
    },
checkAuth: async () => {
  set({ isCheckingAuth: true, error: null });

  try {
    const response = await axios.get(`${API_URL}/check-auth`,{
        withCredentials: true,
    });

    set({
      user: response.data.user,
      isAuthenticated: true,
      isCheckingAuth: false,
    });
  } catch (error) {
    set({
      isAuthenticated: false,
      isCheckingAuth: false,
      error: error.response?.data?.message || "Authentication failed",
    });
  }
},


logOut : async()=>{
    set({isLoading:true, error:null});
    try {
         await axios.post(`${API_URL}/logout`);
        set({
            user:null,
            isAuthenticated:false,
            isLoading:false,
        });
        return true;
    } catch (error) {
        set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: error.response?.data?.msg
    });
    }
},
clearError: () =>
  set({
    error: null,
    Logingerror: null,
    signupError: null,
    forgotPasserror: null,
  }),
       
forgetPassword : async(email)=>{
            set({isLoading:true, forgotPasserror:null});
            try {
              const response =  await axios.post(`${API_URL}/forgot-password`,{email});
              set({user:response.data.user,isLoading:false});
              return true;
            } catch (error) {
                set({forgotPasserror:error.response?.data?.message|| "Invalid Credentials", isLoading:false});
            }
        },
verifyresettoken :  async (token)=>{
                set({verifyLoading:true,error:null});
                try {
                 await axios.get(`${API_URL}/reset-password/${token}`);
                 set({verifyLoading:false})
                } catch (error) {
                    set({error:error.response?.data?.message|| "Invalid Credentials", verifyLoading:false});
                }
        },
    resetpassword :async(token,password)=>{
        set({isLoading:true,error:null});
        try {
            const response = await axios.post(`${API_URL}/reset-password/${token}`,{password});
            set({user:response.data.user,isLoading:false})
            return true;
        } catch (error) {
            set({error:error.response?.data?.message|| "Error", isLoading:false,});
        }
}

}));