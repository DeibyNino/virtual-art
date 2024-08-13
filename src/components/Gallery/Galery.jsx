import { useEffect, useState } from "react";

const Galery = ({ galeryData }) => {
  const [showModalGallery, setShowModalGallery] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const handleShowModalGallery = (item) => {
    setShowModalGallery(true);
    setSelectedItem(item);
  };

  const handleBack = () => {
    const index = galeryData.findIndex((item) => item.id === selectedItem.id);
    if (index === 0) {
      setSelectedItem(galeryData[galeryData.length - 1]);
    } else {
      setSelectedItem(galeryData[index - 1]);
    }
  };

  const handleNext = () => {
    const index = galeryData.findIndex((item) => item.id === selectedItem.id);
    if (index === galeryData.length - 1) {
      setSelectedItem(galeryData[0]);
    } else {
      setSelectedItem(galeryData[index + 1]);
    }
  };
  useEffect(() => {
    if (selectedItem) {
      // Construir la URL completa de la imagen solo cuando selectedItem esté definido
      setImageUrl(window.location.origin + selectedItem.image);
    }
  }, [selectedItem]);

  return (
    <div className="w-full  bg-white  rounded-lg shadow-md text-blue-950 p-4 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4  ">
        {galeryData.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center justify-center border border-blue-100 rounded-lg shadow-md p-2 cursor-zoom-in"
            onClick={() => handleShowModalGallery(item)}
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-64  object-cover"
            />
            <div className="p-4 w-full ">
              <h2 className="text-lg font-bold">
                <b>Titulo:</b> {item.title}
              </h2>
              <p>
                <b>Descripcion:</b> {item.description}
              </p>
              <p>
                <b>Tecnica:</b> {item.tecnica}
              </p>
              <p>
                <b>Tamaño:</b> {item.size}
              </p>
              <p>
                <b>Año:</b> {item.year}
              </p>
            </div>
            <a
              href={`https://wa.me/573103821457?text=Hola%20quiero%20cotizar%20la%20obra%20${encodeURIComponent(
                item.title
              )}.%20Aquí%20está%20la%20imagen:%20${encodeURIComponent(
                item.image
              )}`}
              className="bg-blue-950 text-white p-2 rounded-lg w-1/2 text-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cotizar
            </a>
          </div>
        ))}
      </div>
      {showModalGallery && selectedItem ? (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-lg">
            <button
              className="absolute -top-1 right-1 text-2xl z-50 "
              onClick={() => setShowModalGallery(false)}
            >
              ⨯
            </button>
            <button
              onClick={handleBack}
              className="absolute top-0 bottom-0 my-auto text-4xl hover:text-sky-500 left-1"
            >
              ❮
            </button>
            <button
              onClick={handleNext}
              className="absolute top-0 bottom-0 my-auto text-4xl hover:text-sky-500 right-1"
            >
              ❯
            </button>
            <img
              src={selectedItem.image}
              alt={selectedItem.title}
              className="w-full  h-[50vh] md:h-[80vh] object-cover rounded-tl-lg rounded-tr-lg"
            />
            <div className="p-4 w-full ">
              <h2 className="text-lg font-bold">
                <b>Titulo:</b> {selectedItem.title}
              </h2>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModalGallery(false)}
                className="bg-red-500 text-white p-2 rounded-lg w-1/2"
              >
                Cerrar
              </button>
              <a
                href={`https://wa.me/573103821457?text=Hola%20quiero%20cotizar%20la%20obra%20${encodeURIComponent(
                  selectedItem.title
                )}.%20Aquí%20está%20la%20imagen:%20${encodeURIComponent(
                  imageUrl
                )}`}
                className="bg-blue-950 text-white p-2 rounded-lg w-1/2 text-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cotizar
              </a>
              <br />
              <br />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Galery;
