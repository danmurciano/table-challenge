import React, { useState, useEffect, useRef } from "react";
import { Container, Table, Group, Stack, Button, Modal } from '@mantine/core';


const elements = [
  { key:0, firstName: "Robert", lastName: "Steves", salary: 120000, documents: ["Offer.pdf", "Employment.pdf", "Assignment1.pdf"] },
  { key:1, firstName: "Judy", lastName: "Friedman", salary: 95000, documents: ["Offer.pdf", "Employment.pdf", "Assignment1.pdf", "Assignment2.pdf"] },
  { key:2, firstName: "Dave", lastName: "Gallagher", salary: 87500,
    documents: ["Offer.pdf", "Employment.pdf", "Assignment1.pdf", "Assignment2.pdf", "Assignment3.pdf", "Assignment4.pdf",
                "Assignment5.pdf", "Assignment6.pdf", "Assignment7.pdf", "Assignment8.pdf", "Assignment9.pdf", "Assignment10.pdf"] }
];


export default function UsersTable() {
  const [opened, setOpened] = useState(false);

  let docGroups = [];

  function createId(id) {
    const docGroup = {id: id, overflown: false};
    docGroups.push(docGroup);
    return id;
  }


  useEffect(() => {
    const tbl = document.getElementById("table");

    docGroups.forEach(el => {
      let docGroup = document.getElementById(el.id);
      let button = document.getElementById(`btn-${el.id}`);

      function handleChange() {
        button.style.visibility = "hidden";
        docGroup.style.visibility = "hidden";
        docGroup.style.display = "inline-block";

        if (docGroup.clientWidth > tbl.clientWidth - 540) {
          docGroup.style.display = "none";
          button.style.display = "inline-block";
          button.style.visibility = "visible";
        } else {
          button.style.display = "none";
          docGroup.style.display = "inline-block";
          docGroup.style.visibility = "visible";
        }
      }

      window.addEventListener("resize", handleChange);
      handleChange();
    });
  }, []);


  function mapDocuments(docs) {
    return docs.map(doc => (
      <div className="file-div"> {doc} </div>
    ));
  }

  const rows = elements.map((element, index) => (
    <tr key={element.key}>
      <td> {element.firstName} </td>
      <td> {element.lastName} </td>
      <td> {`$${element.salary.toLocaleString('en-US')}`} </td>
      <td className="docs-col">
        <Group noWrap id={createId(`doc-group-${element.key}`)} className="docs-group">
          {mapDocuments(element.documents)}
        </Group>
        <Button
          id={`btn-doc-group-${element.key}`}
          className="collapsed"
          size="sm"
          onClick={() => setOpened(element.key)}>
          Documents &#8250;
        </Button>
      </td>

      <Modal
        opened={opened === element.key}
        onClose={() => setOpened(false)}
        overlayOpacity={0.25}
        overlayBlur={4}
      >
        <Stack align="flex-start" className="docs-stack">
          {mapDocuments(element.documents)}
        </Stack>
      </Modal>
    </tr>
  ));

  return (
    <Container fluid>
      <Table striped highlightOnHover horizontalSpacing="xl" className="table" id="table">
        <thead>
          <tr>
            <th className="table-col">First Name</th>
            <th className="table-col">Last Name</th>
            <th className="table-col">Salary</th>
            <th className="docs-col">Documents</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Container>
  );
}
