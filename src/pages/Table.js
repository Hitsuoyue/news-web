import React, {Component} from 'react';
import { service } from '../../service';
import '../style/index.scss';

export default class Table extends Component{

    constructor(props){
        super(props);
        this.state = {
            data: this.props.data || []
        }
    }

    componentWillReceiveProps(nextprops){
        this.setState({
            data: nextprops.data || []
        })
    }

    /**
     * 删除新闻
     */
    deleteNews = (e, id) => {
        console.log(id);
        service('http://localhost:3000/delete', 'post', {id:id}).then(response => {
            console.log('response', response);
            this.props.getDataList();
        })
    }

    /**
     * 渲染表格主体
     */
    renderTd = () => {
        let elems = [];
        const { data } = this.state;
        if(data && Array.isArray(data)){
            data.forEach((item, index)=>{
                elems.push(
                    <tr key={index}>
                        <td>{item.id || 0}</td>
                        <td>{item.type || ''}</td>
                        <td>{item.title || ''}</td>
                        <td>{item.image || ''}</td>
                        <td>{item.time || ''}</td>
                        <td>{item.src || ''}</td>
                        <td>
                            <button onClick={e => this.props.modalChange(e, item.id)}>edit</button>
                            <button onClick={e => this.deleteNews(e, item.id)}>delete</button>
                        </td>
                    </tr>
                )
            })
        }
        return elems;
    }

    render(){
        return(
            <table border="1">
                <thead className='table-head' >
                    <tr>
                        <td>id</td>
                        <td>type</td>
                        <td>title</td>
                        <td>image</td>
                        <td>time</td>
                        <td>src</td>
                        <td>operation</td>
                    </tr>
                </thead>
                <tbody>
                {this.renderTd()}
                </tbody>
            </table>
        )
    }
}
