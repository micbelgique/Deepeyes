import React, { useRef, useEffect, useState } from 'react';
import BoxCaption from '../models/BoxCaption';


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

        context.strokeStyle = highlightedIndex === index ? '#ff0000' : '#000000'; // Changez la couleur ici
        context.lineWidth = 2;
        context.strokeRect(x, y, width, height);

        context.font = '12px Arial';
        context.fillStyle = '#000000'; // Changez la couleur ici
        context?.fillText(detection.content, x, y + height + 12);
         // Ajouter le gestionnaire d'événements de survol
         canvas.addEventListener('mouseover', () => {
            setHighlightedIndex(index);
            canvas.style.cursor = 'pointer';
          });
  
          canvas.addEventListener('mouseout', () => {
            setHighlightedIndex(null);
            canvas.style.cursor = 'default';
          });
      });
    };
  }, [imageUrl, detections, highlightedIndex]);

  const handleMouseOver = (index: number) => {
    setHighlightedIndex(index);
  };

  const handleMouseOut = () => {
    setHighlightedIndex(null);
  };

  return (
    <canvas ref={canvasRef}/>
  );
};

export default ImageWithRectangles;
