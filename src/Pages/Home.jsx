import '../assets/css/Home.css'
import Header from '../components/header'
import Navbar from '../components/Navbar'
import Product from '../components/Product'
import Footer from '../components/Footer'
import ImageSlider from '../components/ImageSlider'
import images from '../assets/images/images.json'
  


const Home = () => {
    const slides = images.slides;

    return (
        <>
            <Header>
            </Header>

            <Navbar>
            </Navbar>

            <ImageSlider slides={slides} />

            <Product>
            </Product>

            <Footer>
            </Footer>
             

        </>
    )
}

export default Home
