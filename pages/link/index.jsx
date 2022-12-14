import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState, useRef, useDeferredValue } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Icon from "@mdi/react";
import { mdiPlusCircle } from "@mdi/js";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import {
  FacebookShareButton,
  FacebookIcon,
  LineShareButton,
  LineIcon,
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
} from "next-share";
import QRCode from "qrcode";

import Header from "../../components/Header";

function Link({ session }) {
  const [urls, setUrls] = useState([]);
  const [filteredUrls, setFilteredUrls] = useState([]);
  const [limit, setLimit] = useState(false);
  const [show, setShow] = useState(false);
  const [img, setImg] = useState({});
  const [search, setSearch] = useState("");
  const nameRef = useRef(null);
  const urlRef = useRef("");
  const router = useRouter();
  const deferredSearch = useDeferredValue(search);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const generateQR = async (text, code) => {
    try {
      const qr = await QRCode.toDataURL(text);
      setImg((other) => ({ ...other, [code]: qr }));
    } catch (err) {
      console.error(err);
    }
  };

  const resetVisited = async (code) => {
    await axios.post("/api/resetVisited", { code });
    setUrls(
      urls.map((url) => (url.code === code ? { ...url, visited: 0 } : url))
    );
  };

  const deleteUrl = async (code) => {
    await axios.post("/api/deleteUrl", { code });
    setUrls(urls.filter((url) => url.code !== code));
  };

  const urlsMap = filteredUrls.map((url) => {
    return (
      <Accordion key={url.code}>
        <Accordion.Item eventKey={url.code}>
          <Accordion.Header>
            {url.name} | {url.code.match(/.{1,4}/g).join("-")} | Visited{" "}
            {url.visited} times
          </Accordion.Header>
          <Accordion.Body>
            <div>
              <Button
                variant="success"
                type="submit"
                size="sm"
                className="bg-green-200"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://shotly.fakepng.com/go/${url.code
                      .match(/.{1,4}/g)
                      .join("-")}`
                  );
                }}
              >
                COPY
              </Button>{" "}
              <FacebookShareButton
                url={`https://shotly.fakepng.com/go/${url.code
                  .match(/.{1,4}/g)
                  .join("-")}`}
                quote={"Check out this Link!"}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <LineShareButton
                url={`https://shotly.fakepng.com/go/${url.code
                  .match(/.{1,4}/g)
                  .join("-")}`}
                title={"Check out this Link!"}
              >
                <LineIcon size={32} round />
              </LineShareButton>
              <RedditShareButton
                url={`https://shotly.fakepng.com/go/${url.code
                  .match(/.{1,4}/g)
                  .join("-")}`}
                title={"Check out this Link!"}
              >
                <RedditIcon size={32} round />
              </RedditShareButton>
              <TwitterShareButton
                url={`https://shotly.fakepng.com/go/${url.code
                  .match(/.{1,4}/g)
                  .join("-")}`}
                title={"Check out this Link!"}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <FacebookMessengerShareButton
                url={`https://shotly.fakepng.com/go/${url.code
                  .match(/.{1,4}/g)
                  .join("-")}`}
                appId={process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID}
              >
                <FacebookMessengerIcon size={32} round />
              </FacebookMessengerShareButton>{" "}
              <Button
                variant="primary"
                type="submit"
                size="sm"
                className="bg-blue-300"
                onClick={() => {
                  generateQR(
                    `https://shotly.fakepng.com/go/${url.code
                      .match(/.{1,4}/g)
                      .join("-")}`,
                    url.code
                  );
                }}
              >
                QR
              </Button>{" "}
              <Button
                variant="warning"
                type="submit"
                size="sm"
                className="bg-yellow-100"
                onClick={() => resetVisited(url.code)}
              >
                RESET VISITED
              </Button>{" "}
              <Button
                variant="danger"
                type="submit"
                size="sm"
                className="bg-red-300"
                onClick={() => deleteUrl(url.code)}
              >
                DELETE
              </Button>
            </div>
            {img[url.code] && <img src={img[url.code]} />}
            <br />
            {url.url}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  });

  const submitUrl = (event) => {
    event.preventDefault();
    if (!nameRef.current.value || !urlRef.current.value) return;

    const name = nameRef.current.value;
    const url = urlRef.current.value;

    axios
      .post("/api/newUrl", { name, url, id: session.user.id })
      .then((res) => {
        if (res.data === "You have reached the limit of 10 urls") {
          setLimit(() => true);
        }
      })
      .catch((err) => console.log(err));

    nameRef.current.value = "";
    urlRef.current.value = "";
    handleClose();

    if (!limit) {
      router.reload();
    }
  };

  useEffect(() => {
    axios.post("/api/getUser", { id: session.user.id }).then((res) => {
      setUrls(res.data);
    });
  }, []);

  useEffect(() => {
    if (deferredSearch === "") {
      setFilteredUrls(urls);
    } else {
      const filtered = urls.filter((url) => {
        return (
          url.name.toLowerCase().includes(deferredSearch.toLowerCase()) ||
          url.code.toLowerCase().includes(deferredSearch.toLowerCase()) ||
          url.url.toLowerCase().includes(deferredSearch.toLowerCase()) ||
          url.code
            .match(/.{1,4}/g)
            .join("-")
            .toLowerCase()
            .includes(deferredSearch.toLowerCase())
        );
      });

      setFilteredUrls(filtered);
    }
  }, [urls, deferredSearch]);

  return (
    <div className="flex flex-col h-screen">
      <Head>
        <title>Link</title>
        <meta name="description" content="URL Shortener" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Header />
      </header>

      <main className="flex flex-col flex-grow bg-slate-900">
        {limit && (
          <Container>
            <Alert variant="danger">
              <Alert.Heading>
                You have reached the limit of 10 urls
              </Alert.Heading>
            </Alert>
          </Container>
        )}
        <div className="absolute top-4 right-16 mt-20 cursor-pointer md: bottom-0">
          <input
            className="flex ml-2 items-center bg-transparent outline-none text-gray-300 placeholder-gray-400 flex-shrink text-right"
            type="text"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search"
          />
        </div>
        <Icon
          path={mdiPlusCircle}
          size={2}
          color="white"
          className="absolute top-1 right-0 mt-20 cursor-pointer md:bottom-0"
          onClick={handleShow}
        />
        {urls?.length !== 0 ? (
          <Container>{urlsMap}</Container>
        ) : (
          <Container>
            <Alert
              variant="success"
              onClick={handleShow}
              className="cursor-pointer text-center"
            >
              <Alert.Heading>Create new link here. Click me</Alert.Heading>
            </Alert>
          </Container>
        )}
      </main>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New URL</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name:</Form.Label>
              <Form.Control type="text" placeholder="" ref={nameRef} />
              <Form.Text className="text-muted">
                Name the link as you want to call.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLink">
              <Form.Label>Url:</Form.Label>
              <Form.Control type="text" placeholder="https://" ref={urlRef} />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={submitUrl}
              className="bg-blue-300"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            className="bg-gray-300"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
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

export default Link;
