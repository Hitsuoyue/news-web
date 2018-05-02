import React, {Component} from 'react';
import { service } from '../../service';
import '../style/index.scss';

export default class Modal extends Component{

    constructor(props){
        super(props);
        const data = props.index !== undefined && props.data && props.data[props.index];
        this.state = {
            value: {
                id: data && data.id || '',
                type: data && data.type || 'yule',
                title: data && data.title || '',
                image: data && data.image || '',
                time: data && this.toDateInputValue(data.time) || this.toDateInputValue(),
                src: data && data.src || ''
            },
            type: props.type || 'add'
        }
    }

    componentWillReceiveProps(nextprops){
        //todo 对比
        const data = nextprops.index  !== undefined && nextprops.data && nextprops.data[nextprops.index];
        this.setState({
            value: {
                id: data && data.id || '',
                type: data && data.type || 'yule',
                title: data && data.title || '',
                image: data && data.image || '',
                time: data && this.toDateInputValue(data.time) || this.toDateInputValue(),
                src: data && data.src || ''
            },
            type: nextprops.type || 'add'
        })
    }

    /**
     * 添加新闻
     */
    addNews = () => {
        service('http://localhost:3000/insert', 'post', this.state.value).then(response => {
            this.props.getDataList();
        })
    }

    /**
     * 重置模态框数据
     */
    resetModal = () =>{
        this.setState({
            value: {
                id: 0,
                type: 'yule',
                title: '',
                image: '',
                time: this.toDateInputValue(),
                src: ''
            }
        })
    }

    /**
     * 模态框数据修改
     */
    onChange = (e, key) => {
        let value = Object.assign({}, this.state.value);
        value[key] = e.target.value;
        this.setState({
            value: value
        })
    }

    /**
     * 获取当前时间并转换为 input 对应格式
     * @returns {string}
     */
    toDateInputValue = (date) => {
        if(date){
            return date.slice(0,10);
        }else{
            let local = new Date();
            local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
            return local.toJSON().slice(0,10);
        }
    };

    /**
     * 编辑新闻
     * @returns {*}
     */
    editNews = () => {
        service('http://localhost:3000/edit', 'post', this.state.value).then(response => {
            this.props.getDataList();
        })
    }

    render(){
        const { value, type } = this.state;
        console.log('type', type);
        const { display } = this.props;

        return(
            <div className='add-modal' style={{display: display || ''}} >
                <div className='row'>
                    <label className='left' htmlFor="id">id：</label>
                    <input className='right' type="text" name='id' id='id' onChange={e=>this.onChange(e, 'id')} value={value.id}/>
                </div>
                <div className='row'>
                    <label className='left' htmlFor='type'>type：</label>
                    <select className='right' name='type' id='type' onChange={e=>this.onChange(e, 'type')} value={value.type}>
                        <option value="yule">娱乐</option>
                        <option value="bendi">本地</option>
                        <option value="junshi">军事</option>
                        <option value="nongye">农业</option>
                        <option value="dushu">读书</option>
                    </select>
                </div>
                <div className='row'>
                    <label className='left' htmlFor="title">title：</label>
                    <input className='right' type="text" name='title' id='title' onChange={e=>this.onChange(e, 'title')} value={value.title}/>
                </div>
                <div className='row'>
                    <label className='left' htmlFor="image">image：</label>
                    <input className='right' type="text" name='image' id='image' onChange={e=>this.onChange(e, 'image')} value={value.image}/>
                </div>
                <div className='row'>
                    <label className='left' htmlFor="time">time：</label>
                    <input className='right' type="date" name='time' id='time' onChange={e=>this.onChange(e, 'time')} value={value.time}/>
                </div>
                <div className='row'>
                    <label className='left' htmlFor="src">src：</label>
                    <input className='right' type="text" name='src' id='src' onChange={e=>this.onChange(e, 'src')} value={value.src}/>
                </div>
                {
                    type === 'add' ? <button onClick={this.addNews}>添加</button> : <button onClick={this.editNews}>更新</button>
                }
                <input type='reset' onClick={this.resetModal}/>
                <button onClick={this.props.modalChange}>close</button>
            </div>
        )
    }
}
