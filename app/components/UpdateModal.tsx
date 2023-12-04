import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../lib/redux/store'
import { useEffect, useMemo, useState } from 'react'
import { Modal, Form, InputNumber, Input, Button, Space, Select } from 'antd'
import { useValidation } from '../lib/hooks/useValidation'
import { TBookUpdateInput, bookUpdateSchema } from '../types/book'
import { defaultBookCategories } from '../lib/constants/defaultBookCategory'
import { compact } from 'lodash'
import { EditBookAction } from '../lib/redux/actions/bookActions'

export interface IUpdateBookModalProps extends React.HTMLProps<'div'> {
    id: string
    open: boolean
    onClose: () => void
}
export const UpdateBookModal = ({
    id,
    open,
    onClose,
}: IUpdateBookModalProps) => {
    const books = useSelector((state: RootState) => state.bookReducer.books)
    const book = useMemo(() => books.find((e) => e.id === id), [books, id])
    const [form, rule] = useValidation(bookUpdateSchema)
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
    useEffect(() => {
        if (book && open) {
            form.setFieldsValue(book)
        }
    }, [book, form, open])
    const onFinish = (values: TBookUpdateInput) => {
        console.log(values)
        dispatch(EditBookAction(values))
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
        <Modal
            open={open}
            footer={null}
            closeIcon={false}
            title={'Update Book'}
        >
            <Form form={form} onFinish={onFinish}>
                <Form.Item name="id"></Form.Item>
                <Form.Item label="name" name="name" rules={[rule]}>
                    <Input id="UpdateName" placeholder="book of today"></Input>
                </Form.Item>
                <Form.Item label="price" name="price" rules={[rule]}>
                    <InputNumber
                        id="UpdatePrice"
                        addonAfter="CAD"
                    ></InputNumber>
                </Form.Item>
                <Form.Item label="category" name="category" rules={[rule]}>
                    <Select
                        id="UpdateSelect"
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
                        id="UpdateDescription"
                        rows={4}
                        placeholder="haha this book is interesting"
                    ></Input.TextArea>
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button
                            id="UpdateSubmit"
                            type="primary"
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
