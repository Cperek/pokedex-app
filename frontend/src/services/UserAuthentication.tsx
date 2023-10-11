import Api from '@/services/Api'

export default{
    methods: {
    async register (userdata: object)
    {
        return await Api().post('register',userdata);
    },
    login (userdata: object)
    {
        return Api().post('login',userdata);
    },
    }
}

// UserAuthentication.register({
//     email: 'test@example.com',
//     password '1234'
// })