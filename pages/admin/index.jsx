import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Head from "next/head";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import axios from "axios";

import Header from "../../components/Header";

function Admin({ session }) {
  const [users, setUser] = useState([]);
  const [isRoleModelOpen, setRoleModelOpen] = useState(false);
  const [isDeleteModelOpen, setDeleteModelOpen] = useState(false);
  const [currUser, setCurrUser] = useState("");
  const [userObject, setUserObject] = useState({});

  const handelDeleteSubmit = () => {
    axios.post("/api/deleteUser", { id: currUser });
    setUser(users.filter((user) => user.id !== currUser));
    setDeleteModelOpen(false);
  };

  const handleDeleteModelOpen = (id) => {
    setCurrUser(id);
    setDeleteModelOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteModelOpen(false);
  };

  const handleRoleSubmit = () => {
    handleRoleClose();
    axios.post("/api/updateUser", userObject).finally(() => {
      axios.get("/api/getUsers").then((res) => {
        setUser(res.data);
      });
    });
  };

  const handleRoleChange = (event) => {
    event.persist;
    setUserObject((prevState) => ({
      ...prevState,
      role: event.target.value,
    }));
  };

  const handleRoleModelOpen = (id) => {
    setCurrUser(id);
    setRoleModelOpen(true);
  };

  const handleRoleClose = () => {
    setRoleModelOpen(false);
  };

  useEffect(() => {
    setUserObject(users.find((user) => user.id === currUser));
  }, [currUser]);

  const usersTable = users.map((user) => {
    return (
      <tbody key={user.id}>
        <tr>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td className="text-center">
            {user.role === "OWNER" && (
              <button className="row-span-2 text-yellow-400 self-center border-2 border-yellow-400 rounded-full w-max px-2">
                {user.role}
              </button>
            )}
            {user.role === "PRO" && (
              <button className="row-span-2 text-purple-500 self-center border-2 border-purple-500 rounded-full w-max px-2">
                {user.role}
              </button>
            )}
            {user.role === "FREE" && (
              <button className="row-span-2 text-gray-500 self-center border-2 border-gray-500 rounded-full w-max px-2">
                {user.role}
              </button>
            )}
          </td>
          <td className="text-center">
            {user.email === "krit0kasemtewin@gmail.com" ? (
              <Button
                variant="warning"
                type="button"
                size="sm"
                className="bg-yellow-100"
                disabled
              >
                Edit
              </Button>
            ) : (
              <Button
                variant="warning"
                type="button"
                size="sm"
                className="bg-yellow-100"
                onClick={() => {
                  handleRoleModelOpen(user.id);
                }}
              >
                Edit
              </Button>
            )}{" "}
            {user.email === "krit0kasemtewin@gmail.com" ? (
              <Button
                variant="danger"
                type="button"
                size="sm"
                className="bg-red-400"
                disabled
              >
                Delete
              </Button>
            ) : (
              <Button
                variant="danger"
                type="button"
                size="sm"
                className="bg-red-400"
                onClick={() => {
                  handleDeleteModelOpen(user.id);
                }}
              >
                Delete
              </Button>
            )}
          </td>
        </tr>
      </tbody>
    );
  });

  useEffect(() => {
    axios.get("/api/getUsers").then((res) => {
      setUser(res.data);
    });
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Head>
        <title>Admin</title>
        <meta name="description" content="URL Shortener" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Header />
      </header>

      <main className="flex flex-col flex-grow bg-slate-900">
        <Container>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Edit</th>
              </tr>
            </thead>
            {usersTable}
          </Table>
        </Container>
      </main>
      <Modal show={isRoleModelOpen} onHide={handleRoleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{userObject?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Email: {userObject?.email}
          <br />
          <Form.Check
            label="FREE"
            value="FREE"
            name="role"
            type="radio"
            id={`free`}
            onChange={handleRoleChange}
            checked={userObject?.role === "FREE"}
          />
          <Form.Check
            label="PRO"
            value="PRO"
            name="role"
            type="radio"
            id={`pro`}
            onChange={handleRoleChange}
            checked={userObject?.role === "PRO"}
          />
          <Form.Check
            label="OWNER"
            value="OWNER"
            name="role"
            type="radio"
            id={`owner`}
            onChange={handleRoleChange}
            checked={userObject?.role === "OWNER"}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleRoleClose}
            className="bg-gray-400"
          >
            Close
          </Button>
          <Button
            variant="warning"
            onClick={handleRoleSubmit}
            className="bg-yellow-200"
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={isDeleteModelOpen} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete? {userObject?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{userObject?.email}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleDeleteClose}
            className="bg-gray-400"
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handelDeleteSubmit}
            className="bg-red-400"
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session || session.user.role !== "OWNER") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default Admin;
