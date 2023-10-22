import {Api} from '@/services/Api'

export default{
    methods: {
    register (userdata: object)
    {
        return Api().post('register',userdata);
    },
    login (userdata: object)
    {
        return Api().post('login',userdata);
    },   
    }
}
