const prefix = "http://localhost:2083"

export enum apis{
    /**
     * ollama
     */
    chat = `${prefix}/api/v1/Ollama/chat`,
    askWithDoc = `${prefix}/api/v1/Ollama/askWithDoc`,
    deleteDoc = `${prefix}/api/v1/Ollama/deleteDoc`,
    addDoc = `${prefix}/api/v1/Ollama/addDoc`,
    getLogBySid = `${prefix}/api/v1/Ollama/getLogBySid`,

    /**
     * user
     */
    findAll = `${prefix}/api/v1/user/findAll`,
    insertOne = `${prefix}/api/v1/user/insertOne`,
    findByIp = `${prefix}/api/v1/user/findByIp`,
    findById = `${prefix}/api/v1/user/findById`,
    setTitle = `${prefix}/api/v1/user/setTitle`,
}