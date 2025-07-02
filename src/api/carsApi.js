export const carsCreatedByPromise = (email,accessToken) =>{
    return fetch(`https://carrental-pi.vercel.app/cars?email=${email}`,{
        headers:{
            authorization: `Bearer ${accessToken} `
        }
    })
    .then(res=>res.json())
}