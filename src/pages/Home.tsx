import FeaturedProducts from "../components/Products/FeaturedProducts"
import Hero from "../components/Hero"

function HomePage() {
  return (
    <section className="py-10 sm:py-20">
      <Hero />
      <FeaturedProducts />
    </section>
  )
}

export default HomePage
