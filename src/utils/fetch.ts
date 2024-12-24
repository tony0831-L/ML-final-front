export async function asyncGet(api: string) {
    try {
        const res: Response = await fetch(api)
        try {
            let data = res.json()
            return data
        } catch (error) {
            console.log(error)
            return error
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function asyncPost(api: string, body: {} | FormData,key?:string) {
    const res: Response = await fetch(api, {
        method: 'POST',
        headers:new Headers(key?
        {
            'authorization':key,
            'content-Type':"application/json"
        }:
        {
            'content-Type':"application/json"
        }),
        body: body instanceof FormData?body:JSON.stringify(body),
    })
    try {
        let data = res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function asyncPatch(api: string, body: {} | FormData) {
    const res: Response = await fetch(api, {
        method: 'PATCH',
        headers:new Headers({
            'Access-Control-Allow-Origin':"http://localhost:5173/",
            'content-Type':"application/json"
        }),
        body: body instanceof FormData?body:JSON.stringify(body),
        mode:"cors"
    })
    try {
        let data = res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function asyncPut(api: string, body: {} | FormData) {
    const res: Response = await fetch(api, {
        method: 'PUT',
        headers:new Headers({
            'Access-Control-Allow-Origin':"http://localhost:5173/",
            'content-Type':"application/json"
        }),
        body: body instanceof FormData?body:JSON.stringify(body),
        mode:"cors"
    })
    try {
        let data = res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}