import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Products from "./components/product";
import ReactDOM from "react-dom";
import { Gallery, GalleryImage } from "react-gesture-gallery";
import Home from "./components/home";

const images = [
  "https://images.unsplash.com/photo-1559666126-84f389727b9a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1356&q=80",
  "https://images.unsplash.com/photo-1557389352-e721da78ad9f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  "https://images.unsplash.com/photo-1553969420-fb915228af51?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80",
  "https://images.unsplash.com/photo-1550596334-7bb40a71b6bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  "https://images.unsplash.com/photo-1550640964-4775934de4af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
];

function App(data) {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (index === data.ds.length - 1) {
        setIndex(0);
      } else {
        setIndex(prev => prev + 1);
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [index]);
  return (
    <Gallery
      id="gal"
      style={{
        margin: "0px",
        background: "white",
        height: "550px",
        width: "1575px"
      }}
      index={index}
      onRequestChange={i => {
        setIndex(i);
      }}
    >
      {data.ds.map(image => (
        <GalleryImage
          id="imggal"
          key={image.ID}
          src={"data:image/png;base64," + image.Img}
        />
      ))}
    </Gallery>
  );
}

export default App;
