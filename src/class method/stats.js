import React,{Component} from 'react';
class Stats extends Component{
    render(){
        let {data,clearSelected} = this.props;
        let count = 0
        let total = data.length;
        let selected_data = []
        data.forEach((item)=>{
            if(!item.done){
                count++;
            }else{
                selected_data.push(item.id)
            }

        });
        let selected = total-count
        return (
            <span id="todo-stats">
                <span className="todo-count">
                    <span className="number">{count}</span>
                    <span className="word"> Tasks Remaining</span> 
                </span>
                
                <span className="todo-clear">
                    {selected>0?<a 
                    onClick={()=>{
                        clearSelected()
                    }}
                    >Clear {selected} tasks</a>:""}
                </span>
                
                
                
            </span>
        )
    }
}

export default Stats;