import React, {Component} from 'react';
import { service } from '../../service';
import Table from './Table';
import Modal from "./Modal";

export default class HomePage extends Component{

    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
            currentIndex: undefined,
            type: 'add'
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

    /**
     * 模态框状态改变
     */
    modalChange = (e, type, id) => {
        const { modalVisible } = this.state;
        if(id){
            const { data } = this.state;
            const index = data.findIndex(item => item.id === id);
            console.log('index', index);
            this.setState({
                modalVisible: !modalVisible,
                currentIndex: index,
                type: type
            })
        }else{
            this.setState({
                modalVisible: !modalVisible,
                currentIndex: '',
                type: type
            })
        }
    };

    render(){
        const { modalVisible, type } = this.state;
        console.log('type------------', type);
        let display = modalVisible ? '' : 'none';
        return(
            <div>HomePage
                <Table data={this.state.data} getDataList={this.getDataList} modalChange={this.modalChange}/>
                <button onClick={e=>this.modalChange(e, 'add')}>add</button>
                <Modal type={type} data={this.state.data} index={this.state.currentIndex} getDataList={this.getDataList} display={display} modalChange={this.modalChange}/>
            </div>
        )
    }
}
