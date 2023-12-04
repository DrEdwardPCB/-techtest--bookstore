'use client'

import { Table, Button, Tag, Space, Popover } from 'antd'
import { CreateBookModal } from './components/CreateModal'
import { UpdateBookModal } from './components/UpdateModal'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from './lib/redux/store'
import { useState } from 'react'
import { TBook } from './types/book'
import { DeleteBookAction } from './lib/redux/actions/bookActions'

export default function Home() {
    const [selectedBookId, setSelectedBookId] = useState<string>('')
    const [openCreate, setOpenCreate] = useState<boolean>(false)
    const [openUpdate, setOpenUpdate] = useState<boolean>(false)
    const books = useSelector((state: RootState) => state.bookReducer.books)
    const dispatch = useDispatch<AppDispatch>()
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Category',
            key: 'category',
            dataIndex: 'category',
            render: (tags: string[]) => (
                <span data-cy="tableRow">
                    {tags.map((tag) => {
                        return (
                            <Tag color="geekblue" key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        )
                    })}
                </span>
            ),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (content: string = '') => {
                if (content.length > 20) {
                    return (
                        <Popover placement="topLeft" content={content}>
                            <span>{content.slice(0, 20)}...</span>
                        </Popover>
                    )
                } else {
                    return <span>{content}</span>
                }
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: TBook) => (
                <Space size="middle">
                    <Button
                        data-cy="DeleteButton"
                        onClick={(event) => {
                            event.stopPropagation()
                            dispatch(DeleteBookAction(record.id))
                        }}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ]
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-10 gap-4">
            <div className="w-full">
                <h1 className="text-2xl text-gray-900">Bookstore</h1>
                <h3 className="text-lg text-gray-700">
                    a store that cannot buy book
                </h3>
                <hr></hr>
            </div>
            <div className="flex items-center justify-end w-full">
                <Button
                    id="CreateButton"
                    type="primary"
                    onClick={() => {
                        setOpenCreate(true)
                    }}
                >
                    add book
                </Button>
            </div>
            <div className="flex-1 w-full">
                <Table
                    rowKey={'id'}
                    className="h-full"
                    columns={columns}
                    dataSource={books}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => {
                                setSelectedBookId(record.id)
                                setOpenUpdate(true)
                            },
                        }
                    }}
                ></Table>
            </div>
            <CreateBookModal
                open={openCreate}
                onClose={() => setOpenCreate(false)}
            ></CreateBookModal>
            <UpdateBookModal
                id={selectedBookId}
                open={openUpdate && selectedBookId !== ''}
                onClose={() => setOpenUpdate(false)}
            ></UpdateBookModal>
        </main>
    )
}
