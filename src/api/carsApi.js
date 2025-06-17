export const carsCreatedByPromise = (email,accessToken) =>{
    return fetch(`http://localhost:3000/cars?email=${email}`,{
        headers:{
            authorization: `Bearer ${accessToken} `
        }
    })
    .then(res=>res.json())
}