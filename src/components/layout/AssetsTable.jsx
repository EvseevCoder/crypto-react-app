import { Table } from "antd";
import { useCrypto } from "./AppHeader";
const columns = [
  {
    title: "Name",
    dataIndex: "name",

    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Price $",
    dataIndex: "price",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    sorter: (a, b) => a.amount - b.amount,
  },
];

export default function AssetsTable() {
  const { assets } = useCrypto();

  const data = assets.map((a) => {
    return {
      key: a.id,
      name: a.name,
      price: a.price,
      amount: a.amount,
    };
  });

  return (
    <div className="">
      <Table pagination={false} columns={columns} dataSource={data} />
    </div>
  );
}
