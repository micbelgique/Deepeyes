import React, { useRef, useEffect, useState } from 'react';
import BoxCaption from '../models/BoxCaption';
import "./ImageWithRectangle.css"


interface ImageWithRectanglesProps {
  imageUrl: string;
  detections: BoxCaption[];
}

const ImageWithRectangles: React.FC<ImageWithRectanglesProps> = ({
  imageUrl,
  detections,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if(context == null) return;

    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;

      context?.drawImage(image, 0, 0);

      detections.forEach((detection, index) => {
        const [x, y, width, height] = detection.boundingBox
          .split(',')
          .map(Number);

        // Appliquer une opacité plus basse si le rectangle n'est pas survolé
        context.globalAlpha = highlightedIndex === index ? 1 : 0.1;
        context.strokeStyle = highlightedIndex === index ? '#ff0000' : '#000000'; // Changez la couleur ici
        context.lineWidth = 2;
        context.strokeRect(x, y, width, height);

        context.globalAlpha = highlightedIndex === index ? 1 : 0.1;
        context.font = '28px Arial';
        context.fillStyle = highlightedIndex === index ? '#ff0000' : '#000000';
        context?.fillText(detection.content, x, y + height + 20);

        canvas.addEventListener('mousemove', (event) => {
          const rect = canvas.getBoundingClientRect();
          const mouseX = (event.clientX - rect.left) * (canvas.width / rect.width);
          const mouseY = (event.clientY - rect.top) * (canvas.height / rect.height);

          if (
            mouseX >= x && mouseX <= x + width &&
            mouseY >= y && mouseY <= y + height
          ) {
            if (highlightedIndex === null || width * height < detections[highlightedIndex].boundingBox.split(',').map(Number)[2] * detections[highlightedIndex].boundingBox.split(',').map(Number)[3]) {
              setHighlightedIndex(index);
            }
           
          } 
        });

        canvas.addEventListener('mouseout', () => {
          setHighlightedIndex(null);
          
        });
      });
    };
  }, [imageUrl, detections, highlightedIndex]);

 

  return (
    <canvas ref={canvasRef}/>
  );
};

export default ImageWithRectangles;
