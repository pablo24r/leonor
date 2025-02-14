import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-color: #ffccd5;
  font-family: 'Arial', sans-serif;
  text-align: center;
`;

const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
  max-height: 800px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #ff4d88;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  background-color: #ff4d88;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 25px;
  font-size: 1.2rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s, transform 0.3s;
  &:hover {
    background-color: #ff1f5b;
  }
  transform: ${(props) => (props.scale ? `scale(${props.scale})` : 'none')};
`;

const Carousel = styled.div`
  display: flex;
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  overflow: hidden;
  margin-top: 2rem;
  width: 100%;
  max-width: 500px;
`;

const Image = styled.img`
  width: 100%;
  max-width: 100%; /* Asegura que la imagen no se estire más de su contenedor */
  height: 500px;
  border-radius: 10px;
  transition: transform 0.5s;
`;

// Estilo para el GIF que será responsivo
const Gif = styled.img`
  width: 100%;
  height: auto;
  max-width: 600px;  // Controlamos el tamaño máximo del GIF
  margin-bottom: 1rem;
`;

const ProgressBar = styled.progress`
  width: 100%;
  height: 10px;
  margin-top: 1rem;
  border-radius: 5px;
  appearance: none;
  ::-webkit-progress-bar {
    background-color: #f0f0f0;
    border-radius: 5px;
  }
  ::-webkit-progress-value {
    background-color: #ff4d88;
    border-radius: 5px;
  }
`;

function App() {
  const [showGif, setShowGif] = useState(true);
  const [showButtons, setShowButtons] = useState(true);
  const [question, setQuestion] = useState('Leito!! Me quieres????');
  const [carouselVisible, setCarouselVisible] = useState(false);
  const [buttonScale, setButtonScale] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const [isPressed, setIsPressed] = useState(false); // Para controlar si la imagen está siendo presionada
  const [timeLeft, setTimeLeft] = useState(100); // Estado para la duración de la barra de progreso
  const [gifLeo, setGifLeo] = useState(false);

  const images = [
    '/images/2.jpeg',
    '/images/1.jpeg',
    '/images/3.jpeg',
    '/images/4.jpeg',
    '/images/5.jpeg',
    '/images/6.jpeg',
    '/images/7.jpeg',
    '/images/8.jpeg',
    '/images/9.jpeg',
    '/images/10.jpeg',
    '/images/11.jpeg',
    '/images/12.jpeg',
    '/images/13.jpeg',
    '/images/14.jpeg',
    '/images/15.jpeg',
    '/images/16.jpeg',
    '/images/17.jpeg',
    '/images/18.jpeg',
    '/images/19.jpeg',
    '/images/20.jpeg',
    '/images/21.jpeg',
    '/images/22.jpeg',
    '/images/23.jpeg',
    '/images/24.jpeg',
    '/images/25.jpeg',
    '/images/26.jpeg',
    '/images/28.jpeg',
    '/images/29.jpeg',
  ];

  // Efecto para el cambio automático de imagen cada 2 segundos
  useEffect(() => {
    let interval;
    let timer;
    if (carouselVisible && !isPressed) {
      interval = setInterval(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
      }, 3000); // Cambia la imagen cada 3 segundos

      // Actualiza la barra de progreso
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            return 100; // Reinicia la barra
          }
          return prevTime - 1; // Reduce la barra progresivamente
        });
      }, 30); // Cada 30ms actualiza el valor de la barra
    }

    // Limpiar los intervalos al desmontar el componente o si se desactiva el carrusel
    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, [carouselVisible, images.length, isPressed]);

  const handleYesClick = () => {
    setShowGif(false);
    setShowButtons(false);
    setCarouselVisible(true);
  };

  const handleNoClick = () => {
    setQuestion((prevMessage) => {
      if (prevMessage === 'Estas segura??') {
        return 'Pero como que no???';
      }
      if (prevMessage === 'Pero como que no???') {
        return 'Que mala eres!! 😢';
      }
      if (prevMessage === 'Que mala eres!! 😢') {
        return 'Pero Leonor!!!!!!';
      }
      return 'Estas segura??';
    });
    setButtonScale((prevScale) => prevScale + 0.2); // Hace más grande el botón
  };

  const handleGif = () => {
    setShowGif(false);
    setShowButtons(false);
    setGifLeo(true);
  };

  const handleImageClick = () => {
    if (!isPressed) {
      setCurrentImage((prev) => (prev + 1) % images.length); // Cambia la imagen al hacer clic
      setTimeLeft(100)
    }
  };

  const handleMouseDown = () => {
    setIsPressed(true); // Activa el estado de presionado cuando el usuario mantiene presionada la imagen
  };

  const handleMouseUp = () => {
    setIsPressed(false); // Desactiva el estado de presionado cuando el usuario deja de presionar
  };

  return (
    <Container>
      <Card>
        {showGif && <Gif src="/images/gif.gif" alt="Gif de inicio" />}
        {showGif && showButtons && <Title>{question}</Title>}

        {showButtons && (
          <>
            <Button onClick={handleYesClick} scale={buttonScale}>CLARO!!!</Button>
            <Button onClick={handleNoClick}>NO, te odio</Button>
            <Button onClick={handleGif}>🤣🤣🤣🤣</Button>
          </>
        )}
        {carouselVisible && (
          <>
            {/* Barra de progreso */}
            <ProgressBar value={timeLeft} max="100" />
            <Carousel>
              <Image
                src={images[currentImage]}
                alt="Imagen de amor"
                onClick={handleImageClick} // Cambia la imagen al hacer clic
                onMouseDown={handleMouseDown} // Activa el estado de presionado
                onMouseUp={handleMouseUp} // Desactiva el estado de presionado
              />
            </Carousel>
            <h1>Y yo cariño!!! 😘</h1>
          </>
        )}
        {gifLeo &&
          (
            <div>
              <Gif src="/images/leo.gif" alt="Gif de Leo" />
              <Button onClick={() => window.location.reload()}>🎪</Button>
              </div>
          )
        }
      </Card>
    </Container>
  );
}

export default App;
