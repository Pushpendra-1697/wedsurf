import React from 'react';
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import { Box } from '@chakra-ui/react';
import Im1 from './slideshowImages/m1.png';
import Im2 from './slideshowImages/m2.png';
import Im3 from './slideshowImages/m3.png';

const slideImages = [
    { url: Im1 },
    { url: Im2 },
    { url: Im3 }
];

const properties = {
    duration: 3000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: false,
    pauseOnHover: true
};

const SlideShow = () => {
    return (
        <Box maxW="100%" overflow="hidden" position="relative">
            <Slide {...properties}>
                {slideImages.map((slideImage, index) => (
                    <Box
                        key={index}
                        width="100%"
                        height={{ base: "200px", sm: "300px", md: "400px", lg: "500px" }}
                        backgroundSize="cover"
                        backgroundRepeat="no-repeat"
                        backgroundPosition="center"
                        backgroundImage={`url(${slideImage.url})`}
                    ></Box>
                ))}
            </Slide>
        </Box>
    );
}

export default SlideShow;
