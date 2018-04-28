import React, {Component} from 'react';
import { service } from '../../service';
import Table from './Table';
import AddModal from "./AddModal";

export default class HomePage extends Component{

    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
            currentIndex: undefined
        };
    }

    /**
     * 获取新闻列表
     */
    getDataList = () =>{
        service('http://localhost:3000', 'get').then(data => {
            this.setState({
                data: data
            })
        })
    };

    componentWillReceiveProps(nextProps){

    }

    componentWillMount(){
        this.getDataList();
    }

    modalChange = (e, id) => {
        console.log('e', e);
        const { modalVisible } = this.state;
        if(id){
            console.log('data', this.state.data);
            const { data } = this.state;
            const index = data.findIndex(item => item.id === id);
            console.log('index', index);
            this.setState({
                modalVisible: !modalVisible,
                currentIndex: index
            })
        }else{
            this.setState({
                modalVisible: !modalVisible,
                currentIndex: ''
            })
        }
    };

    render(){
        const { modalVisible } = this.state;
        let display = modalVisible ? '' : 'none';
        return(
            <div>HomePage
                <Table data={this.state.data} getDataList={this.getDataList} modalChange={this.modalChange}/>
                <button onClick={this.modalChange}>add</button>
                <AddModal  data={this.state.data} index={this.state.currentIndex} getDataList={this.getDataList} display={display} modalChange={this.modalChange}/>
            </div>
        )
    }
}
