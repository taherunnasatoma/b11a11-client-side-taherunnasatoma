export const myBookingsPromise =(email,accessToken)=>{
    return fetch(`https://car-rental-server-coral.vercel.app/bookings?email=${email}`,{
        headers:{
            authorization:`Bearer ${accessToken}`
        }
    })
    .then(res=>res.json())
}