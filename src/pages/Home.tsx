import FeaturedProducts from "../components/Products/FeaturedProducts"
import Hero from "../components/Hero"

function Home() {
  return (
    <section className="py-20">
      <Hero />
      <FeaturedProducts />
    </section>
  )
}

export default Home
