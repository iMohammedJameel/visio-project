import React from 'react'
import HeroSection from '../components/HeroSection.jsx'
import FeaturedSection from '../components/FeaturedSection.jsx'
import CategoriesSection from '../components/CategoriesSection.jsx'
import PromoBanner from '../components/PromoBanner.jsx'
import CollectionSection from '../components/CollectionSection.jsx'
import ArticlesSection from '../components/ArticlesSection.jsx'
import Newsletter from '../components/Newsletter.jsx'
import InstagramSection from '../components/InstagramSection.jsx'

function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedSection />
      <CategoriesSection />
      <PromoBanner />
      <CollectionSection />
      <ArticlesSection />
      <Newsletter />
      <InstagramSection />
    </>
  )
}

export default Home
