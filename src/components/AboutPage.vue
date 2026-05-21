<template>
  <v-app-bar density="comfortable" flat class="pa-2 border-b">
    <template v-slot:prepend>
      <div class="d-flex align-center">
        <!-- <v-img width="70" contain src="@/assets/newLogo.png"></v-img> -->
        <v-btn @click="$router.push({ name: 'Login' })" size="small" variant="tonal" min-width="100" color="primary"
          class="text-none box-shadow ml-4 text-body-2 mt-1"> Login </v-btn>
      </div>
    </template>
    <v-btn class="text-none rounded-lg font-weight-bold card-box-shadow" variant="tonal" color="primary" min-width="150"
      @click="$router.push('/signup')"> Sign Up For Free</v-btn>
  </v-app-bar>

  <section>
    <v-img cover height="600" src="@/assets/about_1.png">
      <v-container fluid class="px-10">
        <v-row>
          <v-col cols="12" md="6 d-flex flex-column justify-center align-left">
            <h4 class="section-title">
              Find Verified Properties<br> Faster with QRForInfo
            </h4>
            <p class="mt-4 section-desc" >Buy, Sell or Rent Properties with ease, Scan QR,<br>
              explore verified listings and connect directly<br>
              with owners or agents</p>
              <v-btn @click="router.push('/home')" size="large" height="60" width="200" color="primary" class="rounded-xl text-none elevation-0 font-weight-bold mt-4" rounded="lg">
              <img class="mr-2" width="30" src="@/assets/qrIcon.png" alt="">  Explore
              </v-btn>
          </v-col>
          <v-col cols="12" md="6 d-none d-md-flex justify-center align-center">
            <img src="@/assets/phone_qr.png" class="mt-15" alt="">
          </v-col>
        </v-row>
      </v-container>
    </v-img>
  </section>

  <section class="text-center py-6">
    <h3 class="section-title font-weight-bold mt-16">Why Traditional <span class="text-primary"> Real Estate is Broken</span></h3>
    <p class="section-desc mt-2">The old way of buying, selling or renting properties is full of challenges. QRForInfo is here to fix that.</p>
    <v-container >

    
    <v-row class="mt-10">
      <v-col cols="12" sm="6" md="6" lg="3">
         
        <v-card height="400" class="pa-14 rounded-xl elevation-0 card-hover"
          style="background: #F7FAFF">
         
          <h4 class="custom-card-title font-weight-bold mb-6">High Commission</h4>
          <p class="text-grey-darken-1">2-5% in fees eating into your profits</p>
          <div class="adjust-card-img">
            <img width="90" class="mt-10" src="@/assets/card_1.png" alt="">
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="3">
          <v-card height="400" class="pa-14 rounded-xl elevation-0 card-hover"
          style="background: #F7FAFF">
         
          <h4 class="custom-card-title font-weight-bold mb-6">Lengthy Process</h4>
          <p class="text-grey-darken-1">Weeks or months to close deals</p>
          <div class="adjust-card-img">
            <img width="90" class="mt-10" src="@/assets/card_2.png" alt="">
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="3">
        <v-card height="400" class="pa-14 rounded-xl elevation-0 card-hover"
        style="background: #F7FAFF">
        
        <h4 class="custom-card-title font-weight-bold mb-6">Too Many Intermediaries</h4>
        <p class="text-grey-darken-1">Multiple middlemen slowing everything down</p>
        <div class="" style="">
            <img width="90" class="mt-10" src="@/assets/card_3.png" alt="">
          </div>
      </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="3">
        <v-card height="400" class="pa-14 rounded-xl elevation-0 card-hover"
        style="background: #F7FAFF">
        
        <h4 class="custom-card-title font-weight-bold mb-6">Lack of Transparency</h4>
        <p class="text-grey-darken-1">Unverified listings and unclear property information</p>
        <div class="adjust-card-img">
            <img width="90" class="mt-10" src="@/assets/card_4.png" alt="">
          </div>
      </v-card>
      </v-col>
    </v-row>
  </v-container>
  </section>

  <section class="text-center d-flex justify-center align-center">
    <v-img class="d-flex align-center" cover src="@/assets/about_2.png">
      <v-row justify="center" align="center" class="">
        <v-col class="text-left my-10" style="max-width: 760px;" md="px-6" lg="px-16">
          <h3 class="section-title ">
            The <span class="text-primary"> QRForInfo Solution</span> </h3>
          <p class="font-italic text-h5 mb-10">Direct. Simple. Transparent.</p>
          <p class="section-desc mb-10">Connect buyers and sellers directly through smart QR codes. No agents, no commissions,
            no
            delays. Just instant property sharing and direct communication.</p>

            <div class="d-flex">
              <v-avatar size="large" v-for="value in avatarGroup">
                <v-img
                  alt="John"
                  :src="value.image"
                  contain
                ></v-img>
              </v-avatar>
              <div class="ml-4">
                <p>Trusted By</p>
                <p class="font-weight-bold">1000+ Users</p>
              </div>
              
            </div>
            
        </v-col>

        <v-col cols="auto" class="" md="px-6" lg="px-16">
          <img width="550" contain src="@/assets/qrCardImg.png" />
        </v-col>
      </v-row>
  </v-img>
  </section>

  <section id="howItWorks" class="text-center py-6 d-flex flex-column justify-center align-center">
    <h3 class="section-title font-weight-bold">How It <span class="text-primary">Works</span></h3>
    <p class="text-center section-desc">List,generate,and share your property in just a few simple steps.</p>
      <v-container>
        <v-row class="mt-4">
          <v-col cols="12" md="3" v-for="item in howItWorksCard" :key="item.id">
            <v-card height="400" class="py-6 px-4 rounded-xl elevation-0 card-hover"
              style="background: #F7FAFF">
              
              <h4 class="custom-card-title font-weight-bold mb-6 text-center">{{item.title}}</h4>
              <p class="text-grey-darken-1 text-center">{{item.subtitle}}</p>

              <div class="adjust-card-img">
                <img style="width: 130px;height: 140px;" class="mt-10" :src="item.img" alt="" />
              </div>
            </v-card>
          </v-col>
        </v-row>
    </v-container>
  </section>

  <section id="forBuyers" class="text-center py-6 d-flex flex-column justify-center align-center">
    <h3 class="section-title font-weight-bold">For <span class="text-primary">Buyers</span></h3>
    <v-container fluid class="py-8 px-10 fill-height mt-4" style="background-color: #F6F9FD;">
    <v-row>
      <v-col
        v-for="(item, i) in features"
        :key="i"
        cols="12"
        sm="6"
        md="3"
      >
        <v-card
          rounded="xl"
          elevation="0"
          class="feature-card overflow-hidden"
        >
          <!-- Image -->
          <div class="image-wrapper">
            <v-img
              :src="item.image"
              cover
              height="220"
            />
          </div>

          <!-- Content -->
          <v-card-text class="pa-5">
            <div style="font-size: 20px;text-align: left;" class="font-weight-bold text-grey-darken-4 mb-2">
              {{ item.title }}
            </div>

            <div class="text-body-1 text-grey-darken-1 text-left">
              {{ item.description }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  </section>

  <section class="text-center py-6 d-flex flex-column justify-center align-center">
    <h3 class="section-title font-weight-bold">Find the Right Space
     <br><span class="text-primary">For Every Need</span></h3>
     <p class="text-center section-desc">Whether you’re investing, renting, or building - We have
      the perfect solution for you</p>

      <v-container>
    <v-row>
      <v-col
        v-for="(plan, i) in serviceCards"
        :key="i"
        cols="12"
        md="4"
      >
        <v-card
        height="100%"
          rounded="xl"
          elevation="0"
          max-width="400"
          class="service-card pa-7 d-flex flex-column"
          :style="{
            border: `1px solid ${plan.borderColor}`
          }"
        >
          <!-- Top Circle -->
          <div
            class="top-circle mb-6"
            :style="{ backgroundColor: plan.lightColor }"
          />

          <!-- Heading -->
          <div
            class="text-h5 font-weight-bold mb-4"
            :style="{ color: plan.color }"
          >
            {{ plan.title }}
          </div>

          <!-- Description -->
          <div class="text-subtitle text-grey-darken-3 text-left mb-6">
            {{ plan.description }}
          </div>

          <!-- Features -->
          <div class="d-flex flex-column ga-5 mb-10">
            <div
              v-for="(item, idx) in plan.features"
              :key="idx"
              class="d-flex align-center"
            >
              <div
                class="check-icon d-flex align-center justify-center mr-4"
                :style="{ backgroundColor: plan.color }"
              >
                <v-icon color="white" size="18">
                  mdi-check
                </v-icon>
              </div>

              <span class="text-grey-darken-4">
                {{ item }}
              </span>
            </div>
          </div>

          <!-- Button -->
          <v-btn
            block
            size="large"
            rounded="lg"
            style="position: absolute;bottom: 0;left: 0;"
            elevation="0"
            @click="router.push('/propertyListing')"
            class="text-none mt-6"
            height="50"
            :color="plan.color"
          >
            {{ plan.buttonText }}
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  </section>

  <section id="pricing" class="text-center py-6 d-flex flex-column justify-center align-center">
    <h3 class="section-title font-weight-bold">QRForInfo vs Traditional Methods</h3>
    <p class="section-desc">Smarter, faster and better - see how QRForinfo makes real estate simpler for everyone</p>
    <v-container class="pa-1">
    <v-card
      rounded="xl"
      elevation="0"
      class="comparison-card overflow-hidden mt-6"
    >
      <!-- Header -->
      <div class="table-row table-header">
        <div class="col feature-col">
          FEATURE
        </div>

        <div class="col text-left">
          TRADITIONAL REAL ESTATE
        </div>

        <div class="col text-success text-left">
          QRFORINFO
        </div>
      </div>

      <!-- Rows -->
      <div
        v-for="(item, i) in comparisonData"
        :key="i"
        class="table-row"
      >
        <!-- Feature -->
        <div class="col feature-col body-text">
          {{ item.feature }}
        </div>

        <!-- Traditional -->
        <div class="col body-text">
          <div class="d-flex align-center">
            <div class="icon-circle icon-grey mr-5">
              <v-icon size="20">
                mdi-close
              </v-icon>
            </div>

            <span>
              {{ item.traditional }}
            </span>
          </div>
        </div>

        <!-- QRFORINFO -->
        <div class="col body-text text-success">
          <div class="d-flex align-center">
            <div class="icon-circle icon-success mr-5">
              <v-icon size="20" color="white">
                mdi-check
              </v-icon>
            </div>

            <span>
              {{ item.qrforinfo }}
            </span>
          </div>
        </div>
      </div>
    </v-card>
  </v-container>
  </section>
  
  <section>
    <section class="hero-section py-16">
        <v-container>
          <!-- Heading -->
          <div class="text-center mb-12">
            <h1 class="hero-title">
              Ready to Revolutionize
              <br />
              Your <span class="highlight">Property Transaction?</span>
            </h1>

            <p class="section-desc mt-4 text-white">
              Join thousands of smart property owners and buyers today
            </p>
          </div>

          <!-- Cards -->
          <v-row justify="center" class="ga-8">
            <!-- SELL CARD -->
            <v-col cols="12" md="5">
              <v-card class="pa-8 rounded-xl option-card" elevation="0">
                <div class="d-flex align-center">
                  <!-- Image -->
                  <div class="icon-wrapper mr-6">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/619/619153.png"
                      alt="sell"
                      class="option-image"
                    />
                  </div>

                  <!-- Content -->
                  <div class="flex-grow-1">
                    <h2 class="sell-title mb-2">I Want to Sell</h2>

                    <p class="option-text mb-6">
                      List your property in minutes
                    </p>

                    <v-btn
                      block
                      @click="router.push('/home')"
                      class="action-btn elevation-0"
                    >
                      Get Started
                    </v-btn>
                  </div>
                </div>
              </v-card>
            </v-col>

            <!-- BUY CARD -->
            <v-col cols="12" md="5">
              <v-card class="pa-8 rounded-xl option-card" elevation="0">
                <div class="d-flex align-center">
                  <!-- Image -->
                  <div class="icon-wrapper mr-6">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1040/1040230.png"
                      alt="buy"
                      class="option-image"
                    />
                  </div>

                  <!-- Content -->
                  <div class="flex-grow-1">
                    <h2 class="buy-title mb-2">I Want to Buy</h2>

                    <p class="option-text mb-6">
                      Explore Verified Listings
                    </p>

                    <v-btn
                      @click="router.push('/propertyListing')"
                      block
                      class="action-btn elevation-0"
                    >
                      Explore Listings
                    </v-btn>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- FOOTER -->
      <footer class="footer-section py-14">
        <v-container>
          <v-row>
            <!-- Brand -->
            <v-col cols="12" md="6">
              <h2 class="footer-logo mb-2">QRForInfo</h2>

              <p class="footer-description">
                Connecting Property Buyers and Sellers Directly
              </p>
            </v-col>

            <!-- Product -->
            <v-col cols="6" md="2">
              <h3 class="footer-heading mb-5">Product</h3>

              <ul class="footer-links">
                <li @click="redirect('howItWorks')">How it Works</li>
                <li @click="redirect('forSellers')">For Sellers</li>
                <li @click="redirect('forBuyers')">For Buyers</li>
                <li @click="redirect('pricing')">Pricing</li>
              </ul>
            </v-col>

            <!-- Use Cases -->
            <v-col cols="6" md="2">
              <h3 class="footer-heading mb-5">Use Cases</h3>

              <ul class="footer-links">
                <li @click="router.push('/home')">Buy Property</li>
                <li @click="router.push('/home')">Sell Property</li>
                <li @click="router.push('/home')">Rent/Lease</li>
                <li @click="router.push('/home')">Built to Suit</li>
              </ul>
            </v-col>

            <!-- Company -->
            <!-- <v-col cols="12" md="2">
              <h3 class="footer-heading mb-5">Company</h3>
            </v-col> -->
          </v-row>
        </v-container>
      </footer>
  </section>
</template>

<script setup>
import People1 from '@/assets/people1.png'
import People2 from '@/assets/people2.jpg'
import People3 from '@/assets/people3.jpg'
import Card_11 from '@/assets/card_11.png'
import Card_22 from '@/assets/card_22.png'
import Card_33 from '@/assets/card_33.png'
import Card_44 from '@/assets/card_44.png'
import featureCard_1 from '@/assets/featureCard_1.png'
import featureCard_2 from '@/assets/featureCard_2.png'
import featureCard_4 from '@/assets/featureCard_4.png'

const router = useRouter()
const avatarGroup = ref([
    { image: People1 },
    { image: People2 },
    { image: People3 }
])

const comparisonData = [
  {
    feature: 'Commission',
    traditional: '2-5% Fees',
    qrforinfo: '2-5% Fees'
  },
  {
    feature: 'Time to List',
    traditional: 'Days / Weeks',
    qrforinfo: 'Days / Weeks'
  },
  {
    feature: 'Communication',
    traditional: 'Via Agents',
    qrforinfo: 'Via Agents'
  },
  {
    feature: 'Property Info',
    traditional: 'Limited Access',
    qrforinfo: 'Limited Access'
  },
  {
    feature: 'Control',
    traditional: 'Agent Managed',
    qrforinfo: 'Agent Managed'
  }
]
const serviceCards = [
  {
    title: 'BUY/SELL',
    description:
      'Explore verified properties and find the perfect match to buy or sell',
    color: '#0B22B5',
    lightColor: '#D8DCF7',
    borderColor: '#A7B3FF',
    buttonText: 'Explore Listings',
    features: [
      'Residential Homes',
      'Apartments',
      'Villas',
      'Plots / Land',
      'Commercial Properties'
    ]
  },
  {
    title: 'RENT/LEASE',
    description:
      'Flexible renting options for homes, offices and commercial spaces',
    color: '#0F9250',
    lightColor: '#D7ECE3',
    borderColor: '#9ED3B9',
    buttonText: 'Explore Listings',
    features: [
      'Apartments',
      'Villas',
      'Commercial Space',
      'Co-Working Spaces',
      'Shops'
    ]
  },
  {
    title: 'BUILD TO SUIT',
    description:
      'Custom-built solutions tailored to your business needs',
    color: '#E46C00',
    lightColor: '#F5D7BB',
    borderColor: '#F0B47A',
    buttonText: 'Get Started',
    features: [
      'Custom Builds',
      'Commercial Projects',
      'Industrial Spaces',
      'Warehouses'
    ]
  }
]
const features = [
  {
    title: 'Scan QR Code',
    description: 'Use your phone to scan the property’s QR Code',
    image:
    featureCard_1,
  },
  {
    title: 'View Details',
    description: 'Access complete property information instantly',
    image:
    featureCard_2,
  },
  {
    title: 'Save Favorites',
    description: 'Use your phone to scan the property’s QR Code',
    image:
    featureCard_1,
  },
  {
    title: 'Contact Seller',
    description: 'Connect directly with the seller via call or chat',
    image:
    featureCard_4,
  },
]
const howItWorksCard = ref([
  {
    id:1,
    title:'List your Property',
    subtitle:'Create your property listing in minutes with all the essential details.',
    img: Card_11
  },
  {
    id:2,
    title:'Generate QR Code',
    subtitle:'Get a unique QR code for your property instantly.',
    img: Card_22
  },
  {
    id:3,
    title:'Print & Share',
    subtitle:'Display on property, share digitally, or print to reach more buyers',
    img: Card_33
  },
  {
    id:4,
    title:'Get More Leads',
    subtitle:'Buyers scan the QR code to view your property and  contact you directly.',
    img: Card_44
  }
])

const redirect = (id)=>{
  const element = document.getElementById(id)

  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}
</script>
<style lang="scss" scoped>

td,
th {
  /* border-bottom: 1px solid rgba(255, 255, 255, 0.1); */
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
}

.card-hover,
.btn-hover,
.card-blue-hover,
.link-hover,
.card-bottom-hover {
  /* transition: transform 0.3s; */
  transition: all 0.3s;
}

.card-hover:hover {
  transform: translateY(-10px);
}

.card-blue-hover:hover {
  background: #2563EB !important;
  color: white !important;
}

.btn-hover:hover {
  transform: translateY(-3px);
}

.card-bottom-hover:hover {
  transform: scale(1.05);
}

.link-hover:hover {
  color: #2563EB !important;
  background-color: transparent !important;
}

.section-title{
  
  font-weight: 600;
  font-style: Semi Bold;
  font-size: 45px!important;
  line-height: 59px;
  letter-spacing: 0%;        
}

.section-desc{
  font-family: Inter;
  font-weight: 400;
  font-style: Regular;
  font-size: 24px;
  line-height: 30px;
  letter-spacing: 0%;
                
}

.custom-card-title{
  font-family: Inter;
  font-weight: 600;
  font-style: Semi Bold;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 0%;
}
.comparison-card {
  background: #f6f6f6;
  border-radius: 32px!important;
  box-shadow: 0 8px 24px #64646F33!important;
}

.table-row {
  display: grid;
  grid-template-columns: 1.1fr 1.4fr 1fr;
  align-items: center;
  min-height: 120px;
  border-bottom: 1px solid #dddddd;
  padding: 0 56px;
}

.table-row:last-child {
  border-bottom: none;
}

.table-header {
  min-height: 100px;
}

.col {
  font-size: 22px;
  font-weight: 500;
  color: #475569;
}

.feature-col {
  padding-left: 28px;
}

.table-header .col {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.3px;
  color: #51627d;
}

.body-text {
  font-size: 20px;
  font-weight: 500;
}

.text-success {
  color: #0ea44b !important;
}

.icon-circle {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-grey {
  background: #e6e7eb;
  color: #64748b;
}

.icon-success {
  background: #0b9444;
}

.hero-section {
  background: #0019b8;
  border: 4px solid #1db4ff;
}

.hero-title {
  color: white;
  font-size: 48px;
  font-weight: 700;
  line-height: 1.3;
}

.highlight {
  color: #f2c230;
}

.hero-subtitle {
  color: white;
  font-size: 20px;
  font-weight: 400;
}

.option-card {
  background: #ececec;
}

.icon-wrapper {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: #dfe5ef;
  display: flex;
  align-items: center;
  justify-content: center;
}

.option-image {
  width: 90px;
  height: 90px;
  object-fit: contain;
}

.sell-title {
  color: #24109a;
  font-size: 42px;
  font-weight: 700;
}

.buy-title {
  color: #15762e;
  font-size: 42px;
  font-weight: 700;
}

.option-text {
  color: #444;
  font-size: 24px;
}

.action-btn {
  background: #e67a10 !important;
  color: white !important;
  font-size: 20px;
  font-weight: 700;
  text-transform: none;
  height: 58px !important;
  border-radius: 10px;
}

.footer-section {
  background: #ececec;
}

.footer-logo {
  font-size: 54px;
  font-weight: 700;
  color: #24109a;
}

.footer-description {
  font-size: 22px;
  color: #4a5a74;
}

.footer-heading {
  font-size: 32px;
  font-weight: 700;
  color: #24109a;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 18px;
  font-size: 20px;
  color: #4a5a74;
  cursor: pointer;
}

/* RESPONSIVE */
@media (max-width: 960px) {
  .hero-title {
    font-size: 34px;
  }

  .sell-title,
  .buy-title {
    font-size: 28px;
  }

  .option-text {
    font-size: 18px;
  }

  .footer-logo {
    font-size: 38px;
  }

  .footer-heading {
    font-size: 24px;
  }
}

@media (max-width: 600px) {
  .hero-title {
    font-size: 28px;
  }

  .hero-subtitle {
    font-size: 16px;
  }

  .icon-wrapper {
    width: 100px;
    height: 100px;
  }

  .option-image {
    width: 60px;
    height: 60px;
  }

  .sell-title,
  .buy-title {
    font-size: 22px;
  }

  .option-text {
    font-size: 15px;
  }
}

.adjust-card-img{
  position: absolute; bottom: 40px; left: 0px;right: 0px;
}
</style>