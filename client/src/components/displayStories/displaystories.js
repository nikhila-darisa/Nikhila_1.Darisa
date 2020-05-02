import React, { Fragment } from 'react'
import axios from '../config/axios'
class DisplayStories extends React.Component {
    constructor() {
        super()
        this.state = {
            stories: ''
        }
    }
    componentDidMount() {
        axios.get('/getStories').then((result) => {
            this.setState({
                stories: result.data
            })
        }).catch((err) => { console.log("err") })
    }
    componentDidUpdate() {
        axios.get('/getStories').then((result) => {
            this.setState({
                stories: result.data
            })
        }).catch((err) => { console.log("err") })
    }
    render() {
        return (
            <Fragment>
                {this.state.stories ? <div>
                    {this.state.stories.map((data, index) => {
                        return <div key={index} className="card mt-5">
                            <img className="postprofile" src="https://www.w3schools.com/howto/img_avatar2.png" alt="profile" />
                            <span style={{ margin: "10px 0px 0px 60px" }}><b>{data.title}</b></span>
                            <div className="card-body">
                               <span className='card-text mt-2'>
                               <b>Title: </b> {data.title}
                               </span>
                               <br/>
                                <span className="card-text profileBody text-center mt-2 ">
                                    <b>Description: </b> {data.description}
                                </span>
                            </div>
                        </div>
                    })}
                </div> : null}
            </Fragment>
        )
    }
}

export default DisplayStories