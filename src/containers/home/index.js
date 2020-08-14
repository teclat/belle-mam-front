import React, { Component } from 'react'
import Footer from '../../components/footer'
import Header from '../../components/header'
import Hero from '../../components/home/hero'
import Benefits from '../../components/home/benefits'
import HowItWorks from '../../components/home/how-it-works'
import Testimonial from '../../components/home/testimonial'
import Services from '../../components/home/services'

export default class Home extends Component {

    componentDidMount = () => this.handleScroll();

    componentDidUpdate = prevProps => {
        const { location: { pathname, hash } } = this.props;
        if (
            pathname !== prevProps.location.pathname ||
            hash !== prevProps.location.hash
        ) {
            this.handleScroll();
        }
    };

    handleScroll = () => {
        const { location: { hash } } = this.props;
        const element = document.getElementById(hash.replace("#", ""));

        setTimeout(() => {
            window.scrollTo({
                behavior: element ? "smooth" : "auto",
                top: element ? element.offsetTop : 0
            });
        }, 100);
    };

    state = {
        service: 2
    }

    render() {
        return (
            <div>
                <Header />
                <Hero service={this.state.service} />
                <Services setService={(e) => this.setState({ service: e })} />
                <Benefits />
                <HowItWorks />
                <Testimonial />
                <Footer />
            </div>
        )
    }
}
