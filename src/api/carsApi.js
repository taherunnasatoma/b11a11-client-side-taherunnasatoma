export const carsCreatedByPromise = (email,accessToken) =>{
    return fetch(`https://car-rental-server-coral.vercel.app/cars?email=${email}`,{
        headers:{
            authorization: `Bearer ${accessToken} `
        }
    })
    .then(res=>res.json())
}