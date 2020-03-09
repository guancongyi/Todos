import React,{Component} from 'react';
class Add extends Component{
    state={
        val:""
    }
    render(){
        let {add} = this.props;
        let {val} = this.state;
        return <div id="create-todo">
            <input 
                id="new-todo"
                placeholder="What needs to be done?"
                type="text"
                autoComplete="off"
                value={val}
                onChange={({target})=>{
                    this.setState({
                        val:target.value
                    })
                }}
                onKeyDown={({keyCode, target})=>{
                    if(keyCode==13){
                        if(!val.trim()){
                            alert("Enter Something")
                            target.focus()
                        }else{
                            add(val)
                            this.setState({
                                val:""
                            })
                        }
                    }
                }}
            />
        </div>
    }
}

export default Add;