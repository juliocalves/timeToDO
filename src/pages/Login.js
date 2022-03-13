import '../style/loginpage.scss'
import '../style/global.scss'
import { Clock } from '../components/Clock'

export function LoginPage(){
    return(
        <div id='login-page'>
            <aside>
                <Clock/>
                <div>
                    <p>Organize your routine,</p>
                    <p>and have more time <strong>for you!</strong></p>
                </div>
            </aside>
            <div className='container-login'>
                <button>Login Whith Google</button>
                <div className='separator'>
                    <p>Or</p>
                </div>
                <div className='input-login'>
                    <span>User or Email</span>
                    <input></input>
                </div>
                <div className='input-login'>
                    <span>Password</span>
                    <input></input>
                </div>
                <div className='input-login'>
                    <button>Login</button>
                </div>
                <span>Don't have accout? <strong>Create now</strong></span>
            </div>
        </div>
    )
}