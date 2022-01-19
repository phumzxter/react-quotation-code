import { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import QuotationTable from "./QuotationTable";

import { Container, Row, Col, Form, Button } from "react-bootstrap";
import useLocalStorage from "react-localstorage-hook";

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const dstRef = useRef();

  //const [dataItems, setDataItems] = useState([]);
  const [dataItems, setDataItems] = useLocalStorage("dataItems", []);

  const dummyProductList = [
    { id: "p001", name: "Burger", price: 259 },
    { id: "p002", name: "French Fries", price: 80 },
    { id: "p003", name: "Ice Cream", price: 20 },
    { id: "p004", name: "Coca Cola", price: 35 },
  ];

  const checkPrice = () => {
    if (dstRef.current.value >= (ppuRef.current.value*qtyRef.current.value)) {
      alert("Discount is more than price!");
      return;
    }

    //check if item is reducdant
    const pName = dummyProductList.find(
      (item) => item.id === itemRef.current.value
    ).name;
    const isReducdant =
      dataItems.filter((single) => {
        return (
          single.item === pName &&
          single.ppu === ppuRef.current.value &&
          single.dst === dstRef.current.value
        );
      }).length > 0;

    if (!!isReducdant) {
      const mergedDatalist = dataItems.map((item) => {
        console.log(item);
        if (
          item.item === pName &&
          item.ppu === ppuRef.current.value &&
          item.dst === dstRef.current.value
        ) {
          return {
            ...item,
            qty: parseInt(item.qty) + parseInt(qtyRef.current.value),
          };
        } else {
          return item;
        }
      });

      setDataItems(mergedDatalist);
      return;
    }

    const pid = itemRef.current.value;
    const product = dummyProductList.find((e) => e.id === pid);

    let itemObj = {
      pid: pid,
      item: product.name,
      ppu: ppuRef.current.value,
      qty: qtyRef.current.value,
      dst: dstRef.current.value,
    };

    dataItems.push(itemObj);
    setDataItems([...dataItems]);
  };

  const productChange = (e) => {
    const pid = itemRef.current.value;
    const product = dummyProductList.find((e) => e.id === pid);
    ppuRef.current.value = product.price;
  };

  const options = dummyProductList.map((v, index) => {
    return (
      <option value={v.id} key={index}>
        {v.name}
      </option>
    );
  });
  // console.log(dataItems);
  return (
    <Container>
      <Row>
        <Col xs={5} style={{ backgroundColor: "#eaeaea" }}>
          <Form>
            <Form.Group className="mb-3" controlId="formItem">
              <Form.Label>Item</Form.Label>
              <Form.Select
                aria-label="Default select example"
                ref={itemRef}
                onChange={productChange}
              >
                {options}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price Per Unit"
                ref={ppuRef}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDiscount">
              <Form.Label>Discount</Form.Label>
              <Form.Control type="number" placeholder="Discount" ref={dstRef} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formQauntity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" placeholder="Quantity" ref={qtyRef} />
            </Form.Group>

            <Button variant="outline-dark" onClick={checkPrice}>
              Add
            </Button>
          </Form>
        </Col>
        <Col>
          <QuotationTable data={dataItems} setDataItems={setDataItems} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
