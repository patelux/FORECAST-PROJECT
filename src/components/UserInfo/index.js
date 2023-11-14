import UserForm from "./UserForm";

export default function UserInfo() {
    const userObj = {
        user_name: 'alex',
        user_phone: '123123',
        user_email: 'mail@mail',
        user_message: 'Oleg whre are u?',
        user_country: 'ukraine'
    }
    return (
        <div>
            <div className="container">
                    <div>
                        <UserForm {...{userObj}}/>
                    </div>
            </div>
        </div>
    )
}