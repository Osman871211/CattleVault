/* ==========================================================================
   Cow Business E-commerce - Products Dataset (products.js)
   Sample Data for Cattle Marketplace (Dairy, Beef, Bulls, Calves, Organic)
   ========================================================================== */

const products = [
    {
        id: "cow-001",
        name: "Prime Holstein Friesian Dairy Cow",
        breed: "Holstein Friesian",
        category: "dairy",
        age: "2.5 Years",
        weight: "520 kg",
        milkYield: "28 Liters / Day",
        healthStatus: "Certified Healthy",
        price: 1850,
        sellerName: "Green Valley Cattle Farm",
        location: "Rajshahi, Bangladesh",
        rating: 4.9,
        reviewsCount: 24,
        featured: true,
        image: "images/dairy_cow_friesian_1785518053046.png",
        gallery: [
            "images/dairy_cow_friesian_1785518053046.png",
            "images/hero_cow_banner_1785518020739.png"
        ],
        description: "High milk producing Holstein Friesian cow in prime lactating age. Fully vaccinated with DNA pedigree certificate, regular veterinary health checkups, and gentle temperament."
    },
    {
        id: "cow-002",
        name: "Black Angus Breeding Bull",
        breed: "Black Angus",
        category: "bulls",
        age: "3.0 Years",
        weight: "780 kg",
        milkYield: "N/A",
        healthStatus: "Vet Inspected",
        price: 2400,
        sellerName: "Highland Stock Breeders",
        location: "Pabna, Bangladesh",
        rating: 4.8,
        reviewsCount: 18,
        featured: true,
        image: "images/angus_beef_bull_1785518094754.png",
        gallery: [
            "images/angus_beef_bull_1785518094754.png"
        ],
        description: "Robust Black Angus bull, ideal for cattle breeding programs and high quality beef production. Disease tested and certified by Department of Livestock Services."
    },
    {
        id: "cow-003",
        name: "Pure Jersey Dairy Cow",
        breed: "Jersey",
        category: "dairy",
        age: "2.0 Years",
        weight: "430 kg",
        milkYield: "22 Liters / Day (High Fat)",
        healthStatus: "Certified Healthy",
        price: 1650,
        sellerName: "Sunshine Agro Farm",
        location: "Bogra, Bangladesh",
        rating: 4.7,
        reviewsCount: 15,
        featured: true,
        image: "images/hero_cow_banner_1785518020739.png",
        gallery: [
            "images/hero_cow_banner_1785518020739.png"
        ],
        description: "Purebred Jersey cow known for rich cream-density milk (butterfat > 4.8%). High feed efficiency and extremely docile nature."
    },
    {
        id: "cow-004",
        name: "Healthy Sahiwal Beef Steer",
        breed: "Sahiwal",
        category: "beef",
        age: "2.2 Years",
        weight: "460 kg",
        milkYield: "N/A",
        healthStatus: "Fully Vaccinated",
        price: 1450,
        sellerName: "Bengal Organic Livestock",
        location: "Dhaka, Bangladesh",
        rating: 4.9,
        reviewsCount: 31,
        featured: true,
        image: "images/angus_beef_bull_1785518094754.png",
        gallery: [
            "images/angus_beef_bull_1785518094754.png"
        ],
        description: "Indigenous Sahiwal cattle suited for heat tolerance and organic grass-fed beef farming. Fully vaccinated against FMD and anthrax."
    },
    {
        id: "cow-005",
        name: "Gir Crossbred Dairy Cow",
        breed: "Gir Cross",
        category: "dairy",
        age: "3.2 Years",
        weight: "490 kg",
        milkYield: "20 Liters / Day",
        healthStatus: "Certified Healthy",
        price: 1500,
        sellerName: "Modhumoti Agro",
        location: "Jessore, Bangladesh",
        rating: 4.6,
        reviewsCount: 12,
        featured: false,
        image: "images/dairy_cow_friesian_1785518053046.png",
        gallery: [
            "images/dairy_cow_friesian_1785518053046.png"
        ],
        description: "High disease resistance Gir crossbred dairy cow, produces A2 type milk. Extremely hardy and easy to maintain."
    },
    {
        id: "cow-006",
        name: "Young Brown Swiss Calf",
        breed: "Brown Swiss",
        category: "calves",
        age: "6 Months",
        weight: "160 kg",
        milkYield: "N/A",
        healthStatus: "Vaccinated",
        price: 750,
        sellerName: "Green Valley Cattle Farm",
        location: "Rajshahi, Bangladesh",
        rating: 5.0,
        reviewsCount: 8,
        featured: true,
        image: "images/hero_cow_banner_1785518020739.png",
        gallery: [
            "images/hero_cow_banner_1785518020739.png"
        ],
        description: "Healthy 6-month-old female Brown Swiss calf with fast growth genetics. Dehorned, ear-tagged, and raised on high-protein starter feed."
    },
    {
        id: "cow-007",
        name: "Brahman Beef Bull (Qurbani Special)",
        breed: "Brahman",
        category: "bulls",
        age: "2.8 Years",
        weight: "720 kg",
        milkYield: "N/A",
        healthStatus: "Certified Healthy",
        price: 2800,
        sellerName: "Premier Cattle Ranch",
        location: "Chittagong, Bangladesh",
        rating: 4.9,
        reviewsCount: 42,
        featured: true,
        image: "images/angus_beef_bull_1785518094754.png",
        gallery: [
            "images/angus_beef_bull_1785518094754.png"
        ],
        description: "Giant muscular Brahman bull raised on 100% natural grain feed. Perfect for festive sacrificial purchase or commercial beef farming."
    },
    {
        id: "prod-008",
        name: "Pure Organic Farm Fresh Cow Milk (10L)",
        breed: "Pure Raw Milk",
        category: "organic",
        age: "Fresh Daily",
        weight: "10 Liters",
        milkYield: "A2 Certified",
        healthStatus: "Pasteurized & Sealed",
        price: 25,
        sellerName: "Green Valley Dairy",
        location: "Dhaka, Bangladesh",
        rating: 4.9,
        reviewsCount: 110,
        featured: false,
        image: "images/dairy_cow_friesian_1785518053046.png",
        gallery: [
            "images/dairy_cow_friesian_1785518053046.png"
        ],
        description: "Freshly chilled pure organic cow milk delivered straight from farm cows within 4 hours of milking. Free from antibiotics and preservatives."
    }
];

// Helper functions for filtering and querying
function getAllProducts() {
    return products;
}

function getProductById(id) {
    return products.find(p => p.id === id);
}

function getFeaturedProducts() {
    return products.filter(p => p.featured);
}
