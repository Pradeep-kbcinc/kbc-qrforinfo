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
              <v-btn size="large" height="60" width="200" color="primary" class="rounded-xl text-none elevation-0 font-weight-bold mt-4" rounded="lg">
                Scan QR Code
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

          <div class="d-flex justify-center">
            <img width="90" class="mt-10" src="@/assets/card_1.png" alt="">
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="3">
          <v-card height="400" class="pa-14 rounded-xl elevation-0 card-hover"
          style="background: #F7FAFF">
         
          <h4 class="custom-card-title font-weight-bold mb-6">Lengthy Process</h4>
          <p class="text-grey-darken-1">Weeks or months to close deals</p>
          <div class="d-flex justify-center">
            <img width="90" class="mt-10" src="@/assets/card_2.png" alt="">
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="3">
        <v-card height="400" class="pa-14 rounded-xl elevation-0 card-hover"
        style="background: #F7FAFF">
        
        <h4 class="custom-card-title font-weight-bold mb-6">Too Many Intermediaries</h4>
        <p class="text-grey-darken-1">Multiple middlemen slowing everything down</p>
        <div class="d-flex justify-center">
            <img width="90" class="mt-10" src="@/assets/card_3.png" alt="">
          </div>
      </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="3">
        <v-card height="400" class="pa-14 rounded-xl elevation-0 card-hover"
        style="background: #F7FAFF">
        
        <h4 class="custom-card-title font-weight-bold mb-6">Lack of Transparency</h4>
        <p class="text-grey-darken-1">Unverified listings and unclear property information</p>
        <div class="d-flex justify-center">
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
          <v-card v-if="false" class="bg-white pa-10 card-box-shadow rounded-xl text-center" width="520">
            <v-img class="w-100 h-100" src="@/assets/qr-banner.jpeg"></v-img>
          </v-card>
          <v-card class="bg-white pa-10 card-box-shadow rounded-xl text-center" width="520" style="max-width: 70vw;">
            <v-card class="pa-10 mb-6 rounded-xl d-flex justify-center align-center" height="200"
              style="background: linear-gradient(135deg, #2563eb, #1e40af);">
              <v-card class="pa-4 rounded-lg bg-white" width="100" height="100">
                <!-- <v-icon size="x-large">mdi-qrcode-scan</v-icon> -->
                <v-img class="w-100 h-100" src="@/assets/QR.svg"></v-img>
              </v-card>
            </v-card>
            <p class="text-h6">Scan • View • Connect</p>
            <p class="text-h6">It's that simple</p>
          </v-card>

        </v-col>
      </v-row>
  </v-img>
  </section>

  <section class="text-center py-6 d-flex flex-column justify-center align-center">
    <h3 class="section-title font-weight-bold">How It <span class="text-primary">Works</span></h3>
    <p class="text-center section-desc">List,generate,and share your property in just a few simple steps.</p>
    
  </section>

  <section class="text-center pa-10 py-16 d-flex justify-center flex-column align-center"
    style="background-color: #F9FAFB;">
    <h3 class="text-h2 font-weight-bold mb-16 mt-16">Perfect For Every Scenario</h3>
    <div class="d-flex ga-10 mb-16 flex-wrap justify-center text-left">
      <v-card class="pa-10 card-hover rounded-xl elevation-0 bg-white card-box-shadow" width="400"
        style="border: 2.5px solid #3B82F6;">
        <h3 class="text-h1 mb-10">🏠</h3>
        <h4 class="text-h4 font-weight-bold mb-10">BUY / SELL</h4>
        <p class="text-h6 font-weight-regular mb-4"><v-icon color="primary">mdi-arrow-right-thin</v-icon> Residential
          homes</p>
        <p class="text-h6 font-weight-regular mb-4"><v-icon color="primary">mdi-arrow-right-thin</v-icon> Apartments</p>
        <p class="text-h6 font-weight-regular mb-4"><v-icon color="primary">mdi-arrow-right-thin</v-icon> Villas</p>
        <p class="text-h6 font-weight-regular mb-4"><v-icon color="primary">mdi-arrow-right-thin</v-icon> Plots/Land</p>
        <p class="text-h6 font-weight-regular mb-4"><v-icon color="primary">mdi-arrow-right-thin</v-icon> Commercial
          properties</p>
        <v-btn @click="$router.push({ name: 'BuyerLanding' })"
          class="btn-hover w-100 text-none font-weight-bold rounded-lg card-box-shadow mt-10"
          append-icon="mdi-arrow-right-thin" size="x-large" color="#F97316">
          Explore Listing
        </v-btn>
      </v-card>
      <v-card class="pa-10 card-hover rounded-xl elevation-0 bg-white card-box-shadow" width="400"
        style="border: 2.5px solid #10B981;">
        <h3 class="text-h1 mb-10">🔑</h3>
        <h4 class="text-h4 font-weight-bold mb-10">RENT / LEASE</h4>
        <p class="text-h6 font-weight-regular mb-4"><v-icon color="primary">mdi-arrow-right-thin</v-icon> Apartments</p>
        <p class="text-h6 font-weight-regular mb-4"><v-icon color="primary">mdi-arrow-right-thin</v-icon> Villas</p>
        <p class="text-h6 font-weight-regular mb-4"><v-icon color="primary">mdi-arrow-right-thin</v-icon> Commercial
          spaces</p>
        <p class="text-h6 font-weight-regular mb-4"><v-icon color="primary">mdi-arrow-right-thin</v-icon> Co-working
          spaces</p>
        <p class="text-h6 font-weight-regular mb-4"><v-icon color="primary">mdi-arrow-right-thin</v-icon> Shops</p>
        <v-btn @click="$router.push({ name: 'BuyerLanding' })"
          class="btn-hover w-100 text-none font-weight-bold rounded-lg card-box-shadow mt-10"
          append-icon="mdi-arrow-right-thin" size="x-large" color="#F97316">
          Explore Listing
        </v-btn>
      </v-card>
      <v-card class="pa-10 card-hover rounded-xl elevation-0 bg-white card-box-shadow" width="400"
        style="border: 2.5px solid #F59E0B;">
        <h3 class="text-h1 mb-10">🏗️</h3>
        <h4 class="text-h4 font-weight-bold mb-10">BUILD TO SUIT</h4>
        <p class="text-h6 font-weight-regular mb-4"><v-icon color="primary">mdi-arrow-right-thin</v-icon> Custom builds
        </p>
        <p class="text-h6 font-weight-regular mb-4"><v-icon color="primary">mdi-arrow-right-thin</v-icon> Commercial
          projects</p>
        <p class="text-h6 font-weight-regular mb-4"><v-icon color="primary">mdi-arrow-right-thin</v-icon> Industrial
          spaces</p>
        <p class="text-h6 font-weight-regular mb-4"><v-icon color="primary">mdi-arrow-right-thin</v-icon> Warehouses</p>
        <p class="text-h6 font-weight-regular mb-4" style="visibility: hidden;"><v-icon
            color="primary">mdi-arrow-right-thin</v-icon> Warehouses</p>
        <v-btn @click="$router.push({ name: 'Login' })"
          class="btn-hover w-100 text-none font-weight-bold rounded-lg card-box-shadow mt-10"
          append-icon="mdi-arrow-right-thin" size="x-large" color="#F97316">
          Get Started
        </v-btn>
      </v-card>
    </div>
  </section>

  <section class="text-center pa-10 py-16 d-flex justify-center flex-column align-center text-white"
    style="background-color: #1F2937;">
    <h3 class="text-h2 font-weight-bold mb-16 mt-16">QRForInfo vs Traditional Methods</h3>
    <v-table class="rounded-xl bg-transparent font-weight-bold text-h6 mb-16">
      <thead>
        <tr style="background-color: rgba(255, 255, 255, 0.1) !important;">
          <th class="pa-6" width="350">Feature</th>
          <th class="text-center pa-6" width="350">Traditional Real Estate</th>
          <th class="text-center pa-6" width="350" style="background: linear-gradient(135deg, #2563eb, #10b98f);">
            QRForInfo</th>
        </tr>
      </thead>
      <tbody>
        <tr style="background-color: rgba(255, 255, 255, 0.05) !important;">
          <td class="text-left pa-6">Commission</td>
          <td class="pa-6">2-5% fees</td>
          <td class="pa-6" style="background: linear-gradient(135deg, #2563eb, #10b98f);">✓ Zero commission</td>
        </tr>
        <tr style="background-color: rgba(255, 255, 255, 0.05) !important;">
          <td class="text-left pa-6">Time to List</td>
          <td class="pa-6">Days/Weeks</td>
          <td class="pa-6" style="background: linear-gradient(135deg, #2563eb, #10b98f);">✓ Minutes</td>
        </tr>
        <tr style="background-color: rgba(255, 255, 255, 0.05) !important;">
          <td class="text-left pa-6">Communication</td>
          <td class="pa-6">Via agents</td>
          <td class="pa-6" style="background: linear-gradient(135deg, #2563eb, #10b98f);">✓ Direct with seller</td>
        </tr>
        <tr style="background-color: rgba(255, 255, 255, 0.05) !important;">
          <td class="text-left pa-6">Property Info</td>
          <td class="pa-6">Limited access</td>
          <td class="pa-6" style="background: linear-gradient(135deg, #2563eb, #10b98f);">✓ Complete details instantly
          </td>
        </tr>
        <tr style="background-color: rgba(255, 255, 255, 0.05) !important;">
          <td class="text-left pa-6" style="border-bottom: none !important">Control</td>
          <td class="pa-6" style="border-bottom: none !important">Agent managed</td>
          <td class="pa-6"
            style="background: linear-gradient(135deg, #2563eb, #10b98f); border-bottom: none !important">✓
            You control everything</td>
        </tr>
      </tbody>
    </v-table>
  </section>

  <section class="text-center pa-10 py-16 d-flex justify-center flex-column align-center text-white"
    style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%)">
    <h3 class="text-h2 font-weight-bold mb-10 mt-16">Ready to Revolutionize Your Property Transaction?</h3>
    <p class="text-h5 mb-16">Join Thousands of Smart Property Owners and Buyers Today</p>
    <div class="d-flex ga-10 mb-16 flex-wrap justify-center text-left">
      <v-card class="card-bottom-hover pa-10 rounded-xl elevation-0 bg-white card-box-shadow text-center" width="400"
        style="max-width: 70vw;">
        <h4 class="text-h4 font-weight-bold mb-10 text-primary">I Want to Sell</h4>
        <v-btn @click="$router.push({ name: 'Login' })"
          class="btn-hover text-none font-weight-bold rounded-lg card-box-shadow" append-icon="mdi-arrow-right-thin"
          size="x-large" color="#F97316">
          Get Started
        </v-btn>
      </v-card>
      <v-card class="card-bottom-hover pa-10 rounded-xl elevation-0 bg-white card-box-shadow text-center" width="400"
        style="max-width: 70vw;">
        <h4 class="text-h4 font-weight-bold mb-10 text-primary">I Want to Buy</h4>
        <v-btn @click="$router.push({ name: 'BuyerLanding' })"
          class="btn-hover text-none font-weight-bold rounded-lg card-box-shadow" append-icon="mdi-arrow-right-thin"
          size="x-large" color="#F97316">
          Browse Listing
        </v-btn>
      </v-card>
    </div>
    <p class="text-h6 font-weight-regular mb-16 d-flex flex-wrap justify-center text-center ga-6">✓ Free to get started
      <span class="">✓ No credit card required</span>
    </p>
  </section>

  <section class="text-center pa-10 py-16" style="background-color: #1F2937;">
    <div class="d-flex justify-center align-start text-white flex-wrap pb-10" style="gap: 100px 100px;">
      <div class="text-left">
        <h3 class="text-h3 font-weight-bold mb-10 text-white">QRForInfo</h3>
        <p class="text-h6">Connecting Property Buyers and Sellers Directly</p>
      </div>
      <div class="">
        <h5 class="text-h5 font-weight-bold mb-6 text-left">PRODUCT</h5>
        <div class="d-flex flex-column justify-start align-start text-start ga-6">
          <v-btn variant="text" class="link-hover text-none text-h6 font-weight-regular text-grey-lighten-1" size="">How
            It Works</v-btn>
          <v-btn variant="text" class="link-hover text-none text-h6 font-weight-regular text-grey-lighten-1" size="">For
            Sellers</v-btn>
          <v-btn variant="text" class="link-hover text-none text-h6 font-weight-regular text-grey-lighten-1" size="">For
            Buyers</v-btn>
          <v-btn variant="text" class="link-hover text-none text-h6 font-weight-regular text-grey-lighten-1"
            size="">Pricing</v-btn>
        </div>
      </div>
      <div class="">
        <h5 class="text-h5 font-weight-bold mb-6 text-left">USE CASES</h5>
        <div class="d-flex flex-column justify-start align-start text-start ga-6">
          <v-btn variant="text" class="link-hover text-none text-h6 font-weight-regular text-grey-lighten-1" size="">Buy
            Property</v-btn>
          <v-btn variant="text" class="link-hover text-none text-h6 font-weight-regular text-grey-lighten-1"
            size="">Sell
            Property</v-btn>
          <v-btn variant="text" class="link-hover text-none text-h6 font-weight-regular text-grey-lighten-1"
            size="">Rent/Lease</v-btn>
          <v-btn variant="text" class="link-hover text-none text-h6 font-weight-regular text-grey-lighten-1"
            size="">Build
            to Suit</v-btn>
        </div>
      </div>
      <div class="">
        <h5 class="text-h5 font-weight-bold mb-6 text-left">COMPANY</h5>
        <div class="d-flex flex-column justify-start align-start text-start ga-6">
          <v-btn variant="text" class="link-hover text-none text-h6 font-weight-regular text-grey-lighten-1"
            size="">About
            Us</v-btn>
          <v-btn variant="text" class="link-hover text-none text-h6 font-weight-regular text-grey-lighten-1"
            size="">Contact</v-btn>
          <v-btn variant="text" class="link-hover text-none text-h6 font-weight-regular text-grey-lighten-1"
            size="">Career</v-btn>
          <v-btn variant="text" class="link-hover text-none text-h6 font-weight-regular text-grey-lighten-1"
            size="">Press</v-btn>
        </div>
      </div>
      <div class="">
        <h5 class="text-h5 font-weight-bold mb-6 text-left">SUPPORT</h5>
        <div class="d-flex flex-column justify-start align-start text-start ga-6">
          <v-btn variant="text" class="link-hover text-none text-h6 font-weight-regular text-grey-lighten-1"
            size="">Help
            Center</v-btn>
          <v-btn variant="text" class="link-hover text-none text-h6 font-weight-regular text-grey-lighten-1"
            size="">FAQs</v-btn>
          <v-btn variant="text" class="link-hover text-none text-h6 font-weight-regular text-grey-lighten-1"
            size="">Terms
            of Use</v-btn>
          <v-btn variant="text" class="link-hover text-none text-h6 font-weight-regular text-grey-lighten-1"
            size="">Privacy Policy</v-btn>
        </div>
      </div>
    </div>
    <v-divider class="text-white mt-16"></v-divider>
    <p class="text-white pt-10 text-h6 text-grey-lighten-1">© {{ new Date().getFullYear() }} QRForInfo. All rights
      reserved.</p>
  </section>
</template>

<script setup>
import People1 from '@/assets/people1.png'
import People2 from '@/assets/people2.jpg'
import People3 from '@/assets/people3.jpg'
const avatarGroup = ref([
    { image: People1 },
    { image: People2 },
    { image: People3 }
])
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
  font-family: Inter;
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
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 0%;
                
}

.custom-card-title{
  font-family: Inter;
  font-weight: 600;
  font-style: Semi Bold;
  font-size: 24px;
  line-height: 30px;
  letter-spacing: 0%;
}

</style>