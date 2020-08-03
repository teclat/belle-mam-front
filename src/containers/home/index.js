import React, { Component } from 'react'
import Footer from '../../components/footer'
import Header from '../../components/header'
import Hero from '../../components/home/hero'
import Benefits from '../../components/home/benefits'
import HowItWorks from '../../components/home/how-it-works'
import Testimonial from '../../components/home/testimonial'
import Services from '../../components/home/services'

export default class Home extends Component {
    render() {
        return (
            <div>
                <Header />
                <Hero />
                <Services />
                <Benefits />
                <HowItWorks />
                <Testimonial />
                <Footer />
            </div>
        )
    }
}
