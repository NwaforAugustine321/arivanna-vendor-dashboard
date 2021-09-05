import React, { Component } from 'react';
import { Table, Divider, Tag, Spin, Space } from 'antd';


//__Delete Component__
const DeleteActionComponent = ({ DelRowCommand, RowId, DeleteReq }) => {

    const [deleteCommand, setdeleteCommand] = React.useState(false);

    const iconToggle = (deleteCommand) => {

        if (!deleteCommand)
            return <i className="fa fa-trash-o fa-3" style={{ color: "red" }} aria-hidden="true"></i>;
        else
            return (
                <Space size="middle">
                    <Spin size="small" />
                </Space>
            );
    }

    const Del = () => {

        setdeleteCommand(!deleteCommand);
        //__DeleteReq must come here__
        //__Delete notification here because if fail icon will change__ 
        setTimeout(() => {
            DelRowCommand(RowId);
        }, 1000);
    }

    return (
        <span onClick={() => Del()} style={{ position: "absolute" }}>
            <a>{iconToggle(deleteCommand)}{' '}Delete</a>
        </span>
    );
}



class TableNotifications extends Component {

    //__Make tableData a state variable__
    state = {
        tableData: [
            {
                key: '1',
                title:
                    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor',
                dateCreate: '20-1-2020',
                tags: ['sale'],
            },
            {
                key: '2',
                title:
                    'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur',
                dateCreate: '21-1-2020',
                tags: ['new'],
            },
            {
                key: '3',
                title: ' Et harum quidem rerum',
                dateCreate: '21-1-2020',
                tags: ['new'],
            },
            {
                key: '4',
                title:
                    'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet',
                dateCreate: '21-1-2020',
                tags: ['sale'],
            },

        ]
    };

    _delRow = (key) => {

        //__Clone the array__
        let newDableData = this.state.tableData.slice();

        //__find index of Row__
        let indexOfRow = 0;

        newDableData.forEach((element, index) => {
            if(element.key == key){
                indexOfRow = index;
            }
        });
        
        //__splice to remove the row__
        newDableData.splice(indexOfRow, 1);
        //__Update State__
        this.setState({ tableData: newDableData});
    }

    render() {
        /* 
            You can change data by API
            example: https://ant.design/components/table/
        */
        let tableColumn = [
            {
                title: 'Date Create',
                dataIndex: 'dateCreate',
                key: 'dateCreate',
                render: text => <a>{text}</a>,
                width: '100px',
            },
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: 'Category',
                key: 'tags',
                dataIndex: 'tags',
                render: tags => (
                    <span>
                        {tags.map(tag => {
                            let color = tag.length > 5 ? 'geekblue' : 'green';
                            if (tag === 'sale') {
                                color = 'volcano';
                            }
                            return (
                                <Tag color={color} key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>
                            );
                        })}
                    </span>
                ),
            },
            {
                title: 'Action',
                key: 'action',
                width: '200px',
                render: (text, record) => (
                    <span>
                        <a>Mark as read</a>
                        <Divider type="vertical" />
                        <DeleteActionComponent DelRowCommand={this._delRow} RowId={record.key} DeleteReq={{/* Del api req here */ }} />

                    </span>
                ),
            },
        ];
        return <Table columns={tableColumn} dataSource={this.state.tableData} />;
    }
}

export default TableNotifications;
