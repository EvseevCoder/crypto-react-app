import { useState, useRef } from "react";
import {
  Select,
  Space,
  Typography,
  Flex,
  Divider,
  Form,
  Input,
  Button,
  Checkbox,
  InputNumber,
  DatePicker,
  Result,
} from "antd";
import { useCrypto } from "./layout/AppHeader";

export default function AddAssetForm({ onClose }) {
  const [form] = Form.useForm();
  const { crypto, addAsset } = useCrypto();
  const [coin, setCoin] = useState(null);
  const [submited, setSubmited] = useState(false);
  const assetRef = useRef();

  if (submited) {
    return (
      <Result
        status="success"
        title="New Asset"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    );
  }

  const validateMessages = {
    required: "`${label}` is required!",
    types: {
      number: "`${label}` is not valid number",
    },
    number: {
      range: "`${label}` must be between ${min} and ${max}",
    },
  };

  if (!coin) {
    return (
      <Select
        style={{ width: "100%" }}
        onSelect={(v) => setCoin(crypto.find((c) => c.id == v))}
        placeholder="Select Coin"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: "20px" }}
              src={option.data.icon}
              alt={option.data.label}
            />{" "}
            {option.data.label}
          </Space>
        )}
      />
    );
  }

  const onFinish = (values) => {
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
    };

    assetRef.current = newAsset;
    setSubmited(true);
    addAsset(newAsset);
  };
  function handleAmountChange(v) {
    const price = form.getFieldValue("price");
    form.setFieldsValue({
      total: +(v * price).toFixed(3),
    });
  }
  function handlePriceChange(v) {
    const amount = form.getFieldValue("amount");
    form.setFieldsValue({
      total: +(v * amount).toFixed(3),
    });
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 7,
      }}
      wrapperCol={{
        span: 10,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        price: coin.price.toFixed(2),
      }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Flex align="center">
        <img
          src={coin.icon}
          alt={coin.name}
          style={{ width: 40, marginRight: 10 }}
        />

        <Typography.Title level={2} style={{ margin: 0 }}>
          {coin.name}
        </Typography.Title>
      </Flex>
      <Divider />

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
          },
        ]}
      >
        <InputNumber
          placeholder="Enter coin amount"
          onChange={handleAmountChange}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber onChange={handlePriceChange} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Date & Time" name="date">
        <DatePicker showTime />
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber disabled style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  );
}
