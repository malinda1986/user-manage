// @ts-nocheck
import React, { useState, useEffect, createRef } from "react";
import { Table, notification, Space, Modal } from "antd";

// import Filter from "./Filter";
import { EditModal } from "./EditModal";

import UserService from "../../../services/user";
import "./list.scss";
const user = new UserService();

const TableView: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isFetching, seIsFetching] = useState<boolean>(true);
  const [params, setParams] = useState({});
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 100,
    //showSizeChanger: true,
    total: 0,
    pageSizeOptions: ["100", "200", "500"],
    size: "small",
  });

  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  const [editModalVisible, setEditModalVisible] = React.useState(false);

  const [selectedRecord, setSelectedRecord] = React.useState({});
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const formRef = createRef<any>();

  useEffect(() => {
    user
      .list(params)
      .then((response) => {
        const { data } = response;
        const { total, page, per_page } = data.pagination;
        setData(data.users);
        const pagObj = Object.assign(
          {},
          { ...pagination },
          { total, current: page, pageSize: per_page }
        );
        setPagination(pagObj);
        setLoading(false);
        seIsFetching(false);
      })
      .catch((error) => {
        notification.error({
          message: "Unknown error",
          description: "Please refresh the page",
        });
      });
  }, [isFetching]);

  const handleSubmit = (
    pagination: any | null,
    sorter: any | null,
    filter: any | null
  ) => {
    setLoading(true);
    if (pagination && pagination.type) {
      delete pagination.type;
    }
    if(formRef.current){
      let fields = formRef.current.getFieldsValue();
      fields = Object.assign({}, { ...fields }, { ...filter });
      fields = Object.assign({}, { ...fields }, { ...pagination });
  
      fields = Object.assign({}, { ...fields }, { ...sorter });
      setParams(fields);
    }
    
    setTimeout(() => {
      seIsFetching(true);
    }, 1000);
  };

  const handleReset = () => {
    const fields = formRef.current.getFieldsValue();
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = [];
        } else {
          fields[item] = undefined;
        }
      }
    }
    formRef.current.setFieldsValue(fields);
    handleSubmit(null, null, null);
  };

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    const sortField = sorter.field;
    const sortOrder = sorter.order;
    handleSubmit(pagination, { sortField, sortOrder }, filters);
  };

  const handleDeleteOk = (id) => {
    setConfirmLoading(true);

    user
      .delete(selectedRecord.id)
      .then((response) => {
        setDeleteModalVisible(false);
        setConfirmLoading(false);
        handleReset();
      })
      .catch((e) => {
        notification.error({
          message: "Unknown error",
          description: "Please refresh the page",
        });
      });
  };

  const handleDeleteModalCancel = () => {
    setDeleteModalVisible(false);
  };

  const handleSave = () => {};

  const editModal = (record) => {
    setSelectedRecord(record);
    setEditModalVisible(true)
  }

  const deleteModal = (record) => {
    setSelectedRecord(record);
    setDeleteModalVisible(true);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      sorter: (a: any, b: any) => a.id - b.id,
      width: "20%",
    },
    {
      title: "First Name",
      dataIndex: "first_name",

      width: "20%",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",

      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",

      width: "20%",
    },
    {
      title: "Age",
      dataIndex: "age",
      sorter: (a: any, b: any) => a.age > b.age,
      width: "20%",
    },

    {
      title: "Created",
      dataIndex: "createdAt",
      sorter: (a: any, b: any) => a.created_at > b.created_at,
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space size="middle">
          <a
            onClick={() => {
              editModal(record);
            }}
          >
            Edit
          </a>
          |
          <a
            onClick={() => {
              deleteModal(record);
            }}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];
  return (
    <div className="list">
      {/* <Filter
        formRef={formRef}
        handleSubmit={handleSubmit}
        handleReset={handleReset}
      /> */}
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
      <Modal
        title="Confirmation"
        visible={deleteModalVisible}
        onOk={handleDeleteOk}
        confirmLoading={confirmLoading}
        onCancel={handleDeleteModalCancel}
      >
        <p>{"Are you sure you want to delete this record?"}</p>
      </Modal>
      <EditModal
        loading={loading}
        editModalVisible={editModalVisible}
        setEditModalVisible={setEditModalVisible}
        handleSave ={handleSave}
        user={selectedRecord}
        handleReset={handleReset}
      />
    </div>
  );
};

export default TableView;
