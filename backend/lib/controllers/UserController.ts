import User from "../models/User";

export default class UserController {
    private user: User;

    constructor() {
        this.user = new User();
    }

    async validate_and_register_user(userData: { username: string; password: string; repassword: string }): Promise<string> {
       
        // Validate user data
        if (!userData.username || !userData.password || !userData.repassword) {
            return 'Invalid user data';
        }

        this.user.username = userData.username;
        this.user.password = userData.password;
        

        try {
            const result = await this.user.create();
            return result;
        } catch (error) {
            return 'Error occurred during user registration';
        }
    }
}


