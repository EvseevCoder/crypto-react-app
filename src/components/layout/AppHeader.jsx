import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import CryptoContext from "../../context/crypto-context";
import { useContext, useEffect, useState } from "react";
import CoininfoModal from "../CoinInfoModal";
import AddAssetForm from "../AddAssetForm";

const headerStyle = {
  with: "100%",
  textAlign: "center",
  height: 60,
  lineHeight: "64px",
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  // background: "white",
};

export default function AppHeader() {
  const { crypto } = useCrypto();
  const [select, setSelect] = useState(false);
  const [coin, setCoin] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    document.addEventListener("keypress", keypress);
    return () => document.removeEventListener("keypress", keypress);
  }, []);

  function keypress(event) {
    if (event.key == "/") {
      setSelect((prev) => !prev);
    }
  }

  const handleSelect = (value) => {
    setCoin(crypto.find((c) => c.id == value));
    console.log(`selected ${value}`);
    setModal(true);
  };

  return (
    <Layout.Header style={headerStyle}>
      <Select
        open={select}
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        value={"press / to open"}
        style={{ width: "250px" }}
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
      <Button
        type="primary"
        onClick={() => {
          setDrawer(true);
        }}
      >
        Add Asset
      </Button>

      <Modal
        footer={null}
        open={modal}
        onOk={() => setModal(false)}
        onCancel={() => setModal(false)}
      >
        <CoininfoModal coin={coin} />
      </Modal>

      <Drawer
        destroyOnClose
        title="Add Asset"
        onClose={() => setDrawer(false)}
        open={drawer}
      >
        <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
  );
}

export function useCrypto() {
  return useContext(CryptoContext);
}
