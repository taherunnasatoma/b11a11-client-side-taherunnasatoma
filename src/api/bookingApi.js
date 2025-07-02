export const myBookingsPromise =(email,accessToken)=>{
    return fetch(`https://carrental-pi.vercel.app/bookings?email=${email}`,{
        headers:{
            authorization:`Bearer ${accessToken}`
        }
    })
    .then(res=>res.json())
}