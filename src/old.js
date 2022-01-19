import { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import QuotationTable from "./QuotationTable";

import { Container, Row, Col, Form, Button } from "react-bootstrap";
import useLocalStorage from "react-localstorage-hook";
const dummyProductList = [
  { id: "p001", name: "Burger", price: 259 },
  { id: "p002", name: "French Fries", price: 80 },
  { id: "p003", name: "Ice Cream", price: 20 },
  { id: "p004", name: "Coca Cola", price: 35 },
];
function App() {
  // const itemRef = useRef();
  // const ppuRef = useRef();
  // const qtyRef = useRef();
  // const dstRef = useRef();

  const [item, setItem] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [discount, setDiscount] = useState("");

  //const [dataItems, setDataItems] = useState([]);
  const [dataItems, setDataItems] = useLocalStorage("dataItems", []);

  const handleAddProduct = () => {
    // check if discount is greater than price
    if (discount >= price) {
      alert("Discount is more than price!");
      return;
    }

    //check is product is reducdant
    // const checkRedundant = () => {
    //   if (dataItems.some(x => x.item === itemRef.current.value && x.ppu === ppuRef.current.value)) {
    //     alert("Already there!");
    //     return;
    //   }
    // }

    const duplicate = dataItems.find((x) => {
      console.log(x);
    });

    if (duplicate) {
      const updatedDataItems = dataItems.map((x) => {
        if (x === duplicate) {
          // Merge the duplicate item -- I'm not sure exactly what merging logic is required
          // here (e.g. do you want to sum the quantities or discounts?)
          return {
            ...x,
            qty: qtyRef.current.value + x.qty,
            dst: dstRef.current.value,
          };
        } else {
          // Leave everything else as is
          return x;
        }
      });
      setDataItems(updatedDataItems);
    } else {
      // your existing logic for adding the new item
    }

    const pid = itemRef.current.value;
    const product = dummyProductList.find((e) => e.id === pid);

    var itemObj = {
      pid: pid,
      item: product.name,
      ppu: ppuRef.current.value,
      qty: qtyRef.current.value,
      dst: dstRef.current.value,
    };

    dataItems.push(itemObj);
    setDataItems([...dataItems]);
  };

  const productChangeHandler = (e) => {
    setName(e.target.value);
    const product = dummyProductList.find(
      (item) => item.name === e.target.value
    );
    setPrice(product.price);
  };

  return (
    <Container>
      <Row>
        <Col xs={5} style={{ backgroundColor: "#eaeaea" }}>
          <Form>
            <Form.Group className="mb-3" controlId="formItem">
              <Form.Label>Item</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={name}
                onChange={productChangeHandler}
              >
                {dummyProductList.map((option, index) => (
                  <option value={option.name} key={index}>
                    {option.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price Per Unit"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDiscount">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Discount"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formQauntity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>

            <Button variant="outline-dark" onClick={handleAddProduct}>
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
