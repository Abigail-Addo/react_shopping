import PropTypes from 'prop-types';
import { useState, useEffect } from 'react'


const ImageSlider = ({ slides }) => {
    const [index, setIndex] = useState(0)

    const goPrevious = () => {
        const isFirstSlide = index === 0
        if (isFirstSlide) {
            setIndex(2)
        }
        else {
            setIndex(index - 1)
        }
    }
    const goNext = () => {
        const isLastSlide = index === 2
        if (isLastSlide) {
            setIndex(0)
        }
        else {
            setIndex(index + 1)
        }
    }

    const autoSlide = () => {
        goNext();
    };

    useEffect(() => {
        const interval = setInterval(autoSlide, 5000);

        return () => {
            clearInterval(interval);
        };
    })

    return (
        <>
            <div className="imageSlider container">
                <i className="bi bi-arrow-left" onClick={goPrevious}></i>
                <img src={`${slides[index].url}`} alt={`${slides[index].title}`} />
                <i className="bi bi-arrow-right" onClick={goNext}></i>
            </div>
        </>
    )
};

ImageSlider.propTypes = {
    slides: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default ImageSlider
