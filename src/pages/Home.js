import '../style/global.scss'
import '../style/home.scss'


export function HomePage(){
    return(
        <div id='home-page'>
            <header>
                <div>Logo</div>
                <div>Tasks</div>
            </header>
            <div className='content'>
                <div className='pomodoro-content'>
                    <div className='timer'>
                        <div className='counter'>
                            timer
                        </div>
                        <div>
                            <button>START</button>
                        </div>              
                    </div>
                    <div className='task-list'>
                        <div className='input-task'>
                            <span>Task list</span>
                            <input placeholder="what's your task?"></input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}