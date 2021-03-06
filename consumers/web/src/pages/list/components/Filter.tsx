// @ts-nocheck
import React from "react";
import { Button, Row, Col, Form, Input} from 'antd';

const Filter: React.FC = ({formRef, handleSubmit, handleReset}) => {
  return (
    <div>
        <Form ref={formRef}>
        <Row gutter={24}>
          <Col  xl={{ span: 4 }} md={{ span: 6}}>
            <Form.Item name="search">
              <Input
                placeholder={`Search`}
              />
            </Form.Item>
          </Col>
          <Col
            xl={{ span: 6 }}
            md={{ span: 6 }}
            sm={{ span: 8 }}
          >
            <Row type="flex" gutter={3} align="middle" justify="space-between">
              <div>
                <Button
                  type="primary" htmlType="submit"
                  className="margin-right"
                  id="search"
                  onClick={handleSubmit}
                >
                <span>Search</span>
                </Button>&nbsp;
                <Button 
                onClick={handleReset}
                >
                <span>Reset</span>
                </Button>
              </div>
            </Row>
          </Col>
        </Row>
        </Form>
    </div>
  );
};

export default Filter;
