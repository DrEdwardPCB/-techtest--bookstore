import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../lib/redux/store'
import { useEffect, useMemo, useState } from 'react'
import { Modal, Form, InputNumber, Input, Button, Space, Select } from 'antd'
import { useValidation } from '../lib/hooks/useValidation'
import { TBookCreateInput, bookCreateSchema } from '../types/book'
import { defaultBookCategories } from '../lib/constants/defaultBookCategory'
import { compact } from 'lodash'
import { AddBookAction } from '../lib/redux/actions/bookActions'

export interface ICreateBookModalProps extends React.HTMLProps<'div'> {
    open: boolean
    onClose: () => void
}
export const CreateBookModal = ({ open, onClose }: ICreateBookModalProps) => {
    const books = useSelector((state: RootState) => state.bookReducer.books)
    const [form, rule] = useValidation(bookCreateSchema)
    const [bookCategories, setBookCategories] = useState<{ value: string }[]>(
        []
    )
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        setBookCategories(
            compact(
                [
                    ...defaultBookCategories,
                    ...books.flatMap((e) => e.category),
                ].map((e) => ({ value: e }))
            )
        )
    }, [books])

    const onFinish = (values: TBookCreateInput) => {
        dispatch(AddBookAction(values))
        form.resetFields()
        onClose()
    }
    const onReset = () => {
        form.resetFields()
    }
    const onCancel = () => {
        form.resetFields()
        onClose()
    }

    return (
        <Modal open={open} footer={null} closeIcon={false} title="Create Book">
            <Form id="CreateForm" form={form} onFinish={onFinish}>
                <Form.Item label="name" name="name" rules={[rule]}>
                    <Input id="CreateName" placeholder="book of today"></Input>
                </Form.Item>
                <Form.Item label="price" name="price" rules={[rule]}>
                    <InputNumber
                        id="CreatePrice"
                        addonAfter="CAD"
                    ></InputNumber>
                </Form.Item>
                <Form.Item label="category" name="category" rules={[rule]}>
                    <Select
                        id="CreateSelect"
                        mode="multiple"
                        allowClear
                        placeholder="category it belongs to"
                        options={bookCategories}
                        onSearch={(text) => {
                            setBookCategories(
                                compact(
                                    [
                                        text,
                                        ...defaultBookCategories,
                                        ...books.flatMap((e) => e.category),
                                    ].map((e) => ({ value: e }))
                                )
                            )
                        }}
                    ></Select>
                </Form.Item>
                <Form.Item
                    label="description"
                    name="description"
                    rules={[rule]}
                >
                    <Input.TextArea
                        id="CreateDescription"
                        rows={4}
                        placeholder="haha this book is interesting"
                    ></Input.TextArea>
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button
                            type="primary"
                            id="CreateSubmit"
                            htmlType="submit"
                        >
                            Submit
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                            Reset
                        </Button>
                        <Button htmlType="button" onClick={onCancel}>
                            Cancel
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    )
}
