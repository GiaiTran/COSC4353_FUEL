import {React,useState} from 'react'
import axios from 'axios'
function CheckProfile()
{
    const [getUser,setUser]=useState([])
    axios.get("http://127.0.0.1:8000/api/profile/getall").
            then(res=>{
                setUser(res.data)
                const k=localStorage.getItem("id")
                const temp = res.data.data
                console.log(getUser)
                const array=[]
                temp.map((i)=>{
                    array.push(i.user)
                })
                if(array.includes(parseInt(k)))
                {
                    console.log("nav show true")
                    return true
                }
                else{
                    console.log("nav show false")
                    return false
                }
            }
            )
                   
}
function checkAuth()
{
    const token=localStorage.getItem('token')
    if(token)
    {
        return true
    }
    else return false
}
export {CheckProfile,checkAuth}