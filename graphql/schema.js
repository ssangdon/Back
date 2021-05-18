const schema = `
    scalar Upload

    type Query{
        engineControl(token:String,status:String):String
        getToken(password:String,fcmToken:String):String
    }
    type Mutation{
        logout(token:String):String
    }
`
export default schema;