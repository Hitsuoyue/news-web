import React, {Component} from 'react';
import { service } from '../../service';
import Table from './Table';
import AddModal from "./AddModal";

export default class HomePage extends Component{

    constructor(props){
        super(props);
        this.state = {
            modalVisible: false
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
    }

    componentWillMount(){
        this.getDataList();
    }

    /**
     * 打开新闻编辑模态框
     */
    openAddModal = () => {
        this.setState({
            modalVisible: true
        })
    }

    /**
     * 关闭新闻编辑模态框
     */
    closeModal = () => {
        console.log('close');
        this.setState({
            modalVisible: false
        })
    }

    render(){
        const { modalVisible } = this.state;
        let display = modalVisible ? '' : 'none';

        return(
            <div>HomePage
                <Table data={this.state.data}/>
                <button onClick={this.openAddModal}>add</button>
                <AddModal getDataList={this.getDataList} display={display} closeModal={this.closeModal}/>
            </div>
        )
    }
}
