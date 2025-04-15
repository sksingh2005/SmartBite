import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
/**
 * Home Component
 * 
 * @component
 * @description Main landing page for the food delivery application
 * 
 * @state
 * - {Array} foodCat - Stores list of food categories
 * - {Array} foodItems - Stores available food items
 * - {string} search - Manages search input for filtering food items
 * 
 * @functions
 * - loadFoodItems(): Fetches food data from backend API
 *   - Sends POST request to http://localhost:5000/api/auth/foodData
 *   - Populates foodItems and foodCat state
 * 
 * @returns {JSX.Element} Rendered home page with:
 * - Navbar
 * - Food image carousel
 * - Search functionality
 * - Food categories and items display
 * 
 * @dependencies
 * - React hooks: useState, useEffect
 * - Components: Navbar, Card, Footer
 * 
 * @error-handling
 * - Displays "No Such Data" if no food items found
 * - Filters items based on search input
 *//**
 * Home Component
 * 
 * @component
 * @description Main landing page for the food delivery application
 * 
 * @state
 * - {Array} foodCat - Stores list of food categories
 * - {Array} foodItems - Stores available food items
 * - {string} search - Manages search input for filtering food items
 * 
 * @functions
 * - loadFoodItems(): Fetches food data from backend API
 *   - Sends POST request to http://localhost:5000/api/auth/foodData
 *   - Populates foodItems and foodCat state
 * 
 * @returns {JSX.Element} Rendered home page with:
 * - Navbar
 * - Food image carousel
 * - Search functionality
 * - Food categories and items display
 * 
 * @dependencies
 * - React hooks: useState, useEffect
 * - Components: Navbar, Card, Footer
 * 
 * @error-handling
 * - Displays "No Such Data" if no food items found
 * - Filters items based on search input
 */
export default function Home() {
  const [foodCat, setFoodCat] = useState([])
  const [foodItems, setFoodItems] = useState([])
  const [search, setSearch] = useState('')
  /**
   * Fetches food data from the backend API
   * 
   * @async
   * @function loadFoodItems
   * @description Retrieves food items and categories from the server
   * 
   * @troubleshooting
   * - Ensure backend server is running at http://localhost:5000
   * - Verify API endpoint "/api/auth/foodData" is correctly configured
   * - Check network tab for potential CORS or connection issues
   * 
   * @potential-fixes
   * - Uncomment 'credentials' and 'Origin' headers if cross-origin issues exist
   * - Validate server-side API response structure
   * - Add error handling for failed fetch requests
   * 
   * @returns {void} Updates foodItems and foodCat state with fetched data
   */
  const loadFoodItems = async () => {
    let response = await fetch("http://localhost:5000/api/auth/foodData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }

    });
    response = await response.json()
    console.log(response[1][0].CategoryName)
    setFoodItems(response[0])
    setFoodCat(response[1])
    console.log(response[0]);
  }

  useEffect(() => {
    loadFoodItems()
  }, [])

  return (
    <div >
      <div>
        <Navbar />
      </div>
      {/* <Carousel /> */}
      <div className='container'> {/* boootstrap is mobile first */}
        {
          foodCat.length > 0
            ? foodCat.map((data) => {
              return (
                // justify-content-center
                <div className='row mb-3'>
                  <div key={data.id} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
                  {foodItems.length > 0 ? foodItems.filter(
                    (items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase())))
                    .map(filterItems => {
                      return (
                        <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>
                          {console.log(filterItems.url)}
                          <Card foodName={filterItems.name} item={filterItems} options={filterItems.options[0]} ImgSrc={filterItems.img} ></Card>
                        </div>
                      )
                    }) : <div> No Such Data </div>}
                </div>
              )
            })
            : ""}
      </div>
      <Footer />
    </div>









  )
}
