import React,{Component} from 'react';
import Li from './li'

class Todos extends Component{
    render(){
        // console.log(this.props)
        let {data} = this.props
        
        return(
                <ul id="todo-list">
                    {
                        data.map((item,id)=>{
                            return(<Li 
                                {...this.props}
                                key={item.id} 
                                data={item}
                            />)
                        })
                    }
                </ul>
            
        )
    }
}

export default Todos;