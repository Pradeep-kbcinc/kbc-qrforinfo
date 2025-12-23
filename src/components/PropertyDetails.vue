<template>
  <Header :genarelPurpose="true" v-if="route.name == 'BuyPropertyDetails'" />

  <div v-if="isLoading" class="pa-10" :class="{ 'mt-16': route.name == 'BuyPropertyDetails' }">
    <v-skeleton-loader class="mx-auto border" type="image, article"></v-skeleton-loader>
  </div>

  <div v-else :class="route.name == 'BuyPropertyDetails' ? 'mt-16' : ''">

    <div class="d-flex align-center justify-space-between pa-6 pb-0">
      <div class="">
        
        <v-btn @click="router.back()" v-if="route.query.qr !== '1'" size="small" color="primary" variant="tonal"
          class="text-none font-weight-bold">
          <v-icon class="mr-2">mdi-arrow-left</v-icon> Back</v-btn>

        <h3 class="text-h5 font-weight-bold font-weight-bold mt-4">{{ propertyObj.TITLE }}</h3>
        <p class="mt-1">
          <v-icon>mdi-map-marker-outline</v-icon><span v-if="propertyObj.ADDRESS_LINE1">{{
            propertyObj.IS_ADDRESS_PRIVATE_FLG == 1 ? propertyObj.ADDRESS_LINE1 : 'Hidden' }}</span>
        </p>
        <!-- <p v-if="propertyObj.COUNTRY && propertyObj.STATE && propertyObj.CITY"><v-icon>mdi-map-marker-outline</v-icon>
          {{ propertyObj.COUNTRY }}, {{ propertyObj.STATE }}, {{ propertyObj.CITY }}</p> -->
      </div>

      <div v-if="authStore.isAuthenticated" class="d-flex ga-4">

        <v-btn v-if="propertyObj?.SELLER_USER_ID == authStore?.userDetails?.USER_ID"
          @click="addImage(propertyObj)" variant="outlined" prependIcon="mdi-trash-can"
          class="text-none rounded-lg elevation-0 font-weight-bold" color="primary" height="42">Add Image</v-btn>
        <v-btn v-if="propertyObj?.SELLER_USER_ID == authStore?.userDetails?.USER_ID"
          @click="deleteProperty(propertyObj)" variant="outlined" prependIcon="mdi-trash-can"
          class="text-none rounded-lg elevation-0 font-weight-bold" color="red" height="42">Delete</v-btn>
        <v-btn v-if="propertyObj?.SELLER_USER_ID == authStore?.userDetails?.USER_ID"
          @click="$router.push(`/add-new-property/${propertyObj.PROPERTY_ID}`)" variant="outlined"
          prependIcon="mdi-square-edit-outline" class="text-none rounded-lg elevation-0 font-weight-bold"
          height="42">Edit</v-btn>

        <v-menu location="bottom end">
          <template #activator="{ props }">
            <v-btn v-bind="props" height="42" icon="mdi-dots-vertical" color="primary"
              class="text-none elevation-0 font-weight-bold rounded-lg" variant="outlined" />
          </template>

          <v-card>
            <v-list class="py-0">
              <v-list-item
                v-for="item in menuItems"
                :key="item.code"
                @click="onMenuSelect(item)"
                class="px-3"
              >
                <template #prepend>
                  <v-icon size="18">{{ item.prependIcon }}</v-icon>
                </template>

                <v-list-item-title class="">
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>


      </div>
    </div>

    <div class="pa-4">
      <v-row>
        <v-col cols="12" md="8" lg="8">
          <v-card class="card-box-shadow rounded-lg">
            <v-card elevation="0" rounded="0"
              class="bg-box-gradient d-flex justify-center align-center position-relative"
              style="font-size: 8.0rem;line-height: 1;">
              <v-carousel @click.stop v-if="propertyObj.IMAGES && propertyObj.IMAGES?.length > 0" hide-delimiters
                :show-arrows="propertyObj.IMAGES?.length > 1" height="250">

                <v-carousel-item class="pointer" @click="previewImages(propertyObj.IMAGES)" contain
                  v-for="(image, i) in propertyObj.IMAGES" :key="i">
                  <div v-if="image?.IMAGE_URL">
                    <v-hover v-slot="{ isHovering, props }">
                      <div class="position-relative rounded-lg overflow-hidden" style="height:250px">

                        <!-- VIDEO -->
                         
                        <video
                          v-if="isVideo(image?.IMAGE_URL)"
                         
                          :src="image.IMAGE_URL"
                          muted
                          loop
                          playsinline
                          autoplay
                          class="w-100 h-100 object-cover"
                          
                        ></video>

                        <!-- IMAGE -->
                        <v-img
                          v-else
                          
                          :src="image?.IMAGE_URL || '@/assets/property_placeholder.webp'"
                          lazy-src="@/assets/property_placeholder.webp"
                          contain
                          height="250"
                          class="rounded-lg"
                        >
                          <template #placeholder>
                            <div
                              class="d-flex fill-height align-center justify-center"
                              style="background-color:#f2f2f2"
                            >
                              <v-progress-circular indeterminate color="primary" />
                            </div>
                          </template>
                        </v-img>

                        <!-- LISTING TYPE BADGE -->
                        <v-btn
                          :color="propertyObj.LISTING_TYPE === 'FOR SALE' ? 'success' : 'primary'"
                          class="text-none rounded-pill elevation-0 font-weight-bold position-absolute top-0 left-0 mt-4 ms-4"
                          density="comfortable"
                        >
                          {{ propertyObj.LISTING_TYPE }}
                        </v-btn>

                        <!-- HOVER OVERLAY -->
                        <!-- <v-overlay
                          :model-value="isHovering"
                          contained
                          class="align-center justify-center"
                        >
                          <v-btn variant="flat" class="text-none font-weight-bold">
                            See Full {{ isVideo(image?.IMAGE_URL) ? 'Video' : 'Image' }}
                          </v-btn>
                        </v-overlay> -->

                      </div>
                    </v-hover>
                  </div>
                  <v-img v-else cover src="@/assets/property_placeholder.webp" alt="" />


                </v-carousel-item>
              </v-carousel>

              <v-carousel @click.stop="
                $router.push({
                  path: route.name !== 'BuyProperties'
                    ? `/property/${propertyObj.PROPERTY_ID}`
                    : `/buy/property/${propertyObj.PROPERTY_ID}`,
                  query: {
                    createdBy: propertyObj.SELLER_USER_ID === authStore.getUserDetails?.USER_ID
                  }
                })
                " v-else hide-delimiters :show-arrows="propertyObj.IMAGES?.length > 1" height="250">
                <v-carousel-item>
                  <v-img cover :src="findImageType(propertyObj.PROPERTY_KIND)" alt="">
                    <v-btn v-if="propertyObj.LISTING_TYPE"
                      :color="propertyObj.LISTING_TYPE == 'FOR SALE' ? 'success' : 'primary'"
                      class="text-none rounded-pill elevation-0 font-weight-bold position-absolute top-0 left-0 mt-4 ms-4"
                      height="" density="comfortable">{{ propertyObj.LISTING_TYPE }}</v-btn>
                  </v-img>
                </v-carousel-item>
              </v-carousel>


            </v-card>
            <div class="pa-4">
              <p class="text-h6">Details</p>
              <v-row>
                <v-col v-if="propertyObj.DIMENSIONS">
                  <div class="">
                    <p class="text-grey-darken-1">Property Dimensions</p>
                    <p class="text-h6">{{ propertyObj.DIMENSIONS }}
                    </p>
                  </div>
                </v-col>
                <v-col v-if="propertyObj.FURNISHING_TYPE && propertyObj.PROPERTY_KIND !== 'LAND'">
                  <div class="">
                    <p class="text-grey-darken-1">Furnishing Type</p>
                    <p class="text-h6">{{ formatKind(propertyObj.FURNISHING_TYPE) }}
                    </p>
                  </div>
                </v-col>
                <v-col v-if="propertyObj.PROPERTY_KIND">
                  <div class="">
                    <p class="text-grey-darken-1">Property Type</p>
                    <p class="text-h6">{{ formatKind(propertyObj.PROPERTY_KIND) }}
                    </p>
                  </div>
                </v-col>


              </v-row>
              <v-row>
                <v-col v-if="propertyObj.NO_BEDROOMS">
                  <div class="">
                    <p class="text-grey-darken-1">Bedrooms</p>
                    <p class="text-h6">{{ propertyObj.NO_BEDROOMS }}</p>
                  </div>
                </v-col>
                <v-col v-if="propertyObj.NO_BATHROOMS">
                  <div class="">
                    <p class="text-grey-darken-1">Bathrooms</p>
                    <p class="text-h6">{{ propertyObj.NO_BATHROOMS }}</p>
                  </div>
                </v-col>
                <v-col v-if="propertyObj.AREA_UNIT">
                  <div class="">
                    <p class="text-grey-darken-1">Area</p>
                    <p class="text-h6">{{ propertyObj.AREA }} {{ propertyObj.AREA_UNIT }}
                    </p>
                  </div>
                </v-col>
                <v-col
                  v-if="!$route.fullPath.includes('/buy/') && propertyObj?.SELLER_USER_ID == authStore?.userDetails?.USER_ID">
                  <div class="d-flex justify-end">
                    <v-btn @click="qrModal = true" rounded="lg" width="200" min-height="48"
                      class="text-none d-flex align-center" elevation="0" color="primary"> <v-icon
                        class="mr-2">mdi-eye</v-icon> QR Code</v-btn>
                  </div>
                </v-col>
              </v-row>


              <v-divider></v-divider>
              <p class="mt-6 ml-4" v-html="propertyObj.PROPERTY_DESC"></p>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="4" lg="4">
          <GoogleMap class="mb-2" v-if="propertyObj.LATITUDE && propertyObj.LONGITUDE" :lat="propertyObj.LATITUDE"
            :lng="propertyObj.LONGITUDE" />
          <v-card class="card-box-shadow rounded-lg pa-6">
            <p class="text-h4 font-weight-bold text-primary mb-6">
              {{ propertyObj?.PRICE_AMOUNT?.toLocaleString('en-IN', {
                style: 'currency',
                currency: propertyObj.CURRENCY_CODE,
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
                notation: 'compact',
                compactDisplay: 'long',
                // useGrouping: 'false'
              }) }}
            </p>
            <!-- {{ propertyObj.CURRENCY_CODE }} -->
            <v-btn @click="contactOwner" v-if="authStore.userDetails?.USER_ID !== propertyObj.SELLER_USER_ID"
              color="primary" class="text-none rounded-lg elevation-0 font-weight-bold w-100" height="50"
              prepend-icon="mdi-comment-outline">Contact Owner</v-btn>

            <v-btn @click="makeFev" :loading="makeFevLoader" color="red" variant="outlined"
              class="text-none rounded-lg elevation-0 font-weight-bold w-100 mt-3"
              :prepend-icon="propertyObj.IS_FAVOURITE == 1 ? 'mdi-heart' : 'mdi-heart-outline'" height="50">{{
                propertyObj.IS_FAV ?
                  'Saved to Favorites' : 'Save to Favorites' }}</v-btn>
            <v-btn @click="shareAction(propertyObj)" color="primary"
              class="text-none rounded-lg elevation-0 font-weight-bold w-100 mt-3"
              prepend-icon="mdi-share-variant-outline" height="50">Share Property</v-btn>
            <div v-if="authStore.isAuthenticated">


              <v-card
                v-if="!$route.fullPath.includes('/buy/') && propertyObj.SELLER_USER_ID == authStore.getUserDetails.USER_ID"
                class="card-box-shadow rounded-lg pa-4 mt-5">
                <h3 class="text-h6 font-weight-bold mb-2">Statistics</h3>
                <div class="border-b d-flex justify-space-between ga-4 py-4">
                  <p>Total QR Scans</p>
                  <p class="text-h5 text-primary font-weight-bold">{{ propertyObj?.QR_COUNT }}</p>
                </div>
                <!-- <div class="border-b d-flex justify-space-between ga-4 py-4">
                <p>Unique Visitors</p>
                <p class="text-h6">38</p>
              </div> -->
                <div class="d-flex justify-space-between ga-4 py-4">
                  <p>Conversation</p>
                  <p class="text-subtitle-1 font-weight-bold text-primary">{{ propertyObj?.MSG_COUNT }} messages</p>
                </div>
              </v-card>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>

  </div>

  <v-row no-gutter>
    <v-col cols="12" md="8">
      <v-card rounded="lg" elevation="2" class="pa-8 mx-6 card-box-shadow">
            <h2 class="text-h5 font-weight-bold font-weight-bold mb-2">Property Feedback</h2>
            <v-row>
              <v-col v-if="feedback && feedback.length > 0" v-for="fb in feedback" :key="fb.id" cols="12" md="6">
               
              <v-card class="pa-6 mb-6 rounded-xl" variant="outlined" elevation="0">
                <div class="d-flex justify-space-between">
                  <!-- Reviewer Info -->
                  <div class="d-flex">
                    <v-avatar size="46" class="mr-4" color="grey-lighten-3">
                      <!-- <span class="text-subtitle-2 font-weight-medium">{{ getInitials(fb.name) }}</span> -->
                       {{ fb.RATER_FNAME.slice(0,1) + fb.RATER_LNAME.slice(0,1) }}
                    </v-avatar>

                    <div>
                      <h4 class="font-weight-bold mb-1">{{ fb.RATER_FNAME + fb.RATER_LNAME || '-' }}</h4>
                      <span class="text-medium-emphasis text-body-2 font-weight-bold">{{ moment(fb.CREATED_ON).format('Do MMM, YYYY') }}</span>
                      
                      <!-- Tags -->
                      <div class="d-flex ga-2 mt-3">
                        <v-chip v-for="tag in fb.tags" :key="tag" size="small" variant="outlined"
                          color="grey-lighten-2">
                          {{ tag }}
                        </v-chip>
                      </div>
                    </div>
                  </div>

                  <!-- Star Rating -->
                   <div class="d-flex flex-column align-items-end">
                    <v-rating v-model="fb.OVERALL_RATING" readonly color="amber" size="22" />
                    <v-btn @click="openDispute(fb)" v-if="propertyObj.SELLER_USER_ID === authStore.userDetails.USER_ID" size="small" class="text-none mt-2 font-weight-bold rounded-lg" color="red" variant="tonal">Dispute Request <v-icon class="ml-2">mdi-alert</v-icon></v-btn>
                   </div>
                  
                </div>
                <!-- <v-divider></v-divider> -->
                <!-- Feedback Text -->
                <p class="mt-4 text-body-1 ml-15">
                  {{ fb.PUBLIC_COMMENT_TEXT }}
                </p>
              </v-card>
            
              </v-col>
              <v-col v-else cols="12 d-flex justify-center flex-column align-center">
                <v-img width="150" src="@/assets/noData.png"></v-img>
                <p>No Data Found</p>
              </v-col>
            </v-row>
            <div v-if="feedback && feedback.length > 0" class="d-flex justify-center">
              <v-btn @click="viewMoreFeedback" :loading="viewMoreFeedbackLoader" color="primary" class="text-none font-weight-bold" variant="text" size="large">View more</v-btn>
            </div>
  </v-card>
    </v-col>
    <v-col cols="12" md="4">
      <v-card rounded="lg" elevation="2" class="pa-8 card-box-shadow">
            <h2 class="text-h5 font-weight-bold font-weight-bold mb-2">Seller Feedback</h2>
            <v-row>
              <v-col v-if="feedback && feedback.length > 0" v-for="fb in feedback" :key="fb.id" cols="12">
               
              <v-card class="pa-6 mb-6 rounded-xl" variant="outlined" elevation="0">
                <div class="d-flex justify-space-between">
                  <!-- Reviewer Info -->
                  <div class="d-flex">
                    <v-avatar size="46" class="mr-4" color="grey-lighten-3">
                      <!-- <span class="text-subtitle-2 font-weight-medium">{{ getInitials(fb.name) }}</span> -->
                       {{ fb.RATER_FNAME.slice(0,1) + fb.RATER_LNAME.slice(0,1) }}
                    </v-avatar>

                    <div>
                      <h4 class="font-weight-bold mb-1">{{ fb.RATER_FNAME + fb.RATER_LNAME || '-' }}</h4>
                      <span class="text-medium-emphasis text-body-2 font-weight-bold">{{ moment(fb.CREATED_ON).format('Do MMM, YYYY') }}</span>
                      
                      <!-- Tags -->
                      <div class="d-flex ga-2 mt-3">
                        <v-chip v-for="tag in fb.tags" :key="tag" size="small" variant="outlined"
                          color="grey-lighten-2">
                          {{ tag }}
                        </v-chip>
                      </div>
                    </div>
                  </div>

                  <!-- Star Rating -->
                   <div class="d-flex flex-column align-items-end">
                    <v-rating v-model="fb.OVERALL_RATING" readonly color="amber" size="22" />
                    <v-btn @click="openDispute(fb)" v-if="propertyObj.SELLER_USER_ID === authStore.userDetails.USER_ID" size="small" class="text-none mt-2 font-weight-bold rounded-lg" color="red" variant="tonal">Dispute Request <v-icon class="ml-2">mdi-alert</v-icon></v-btn>
                   </div>
                  
                </div>
                <!-- <v-divider></v-divider> -->
                <!-- Feedback Text -->
                <p class="mt-4 text-body-1 ml-15">
                  {{ fb.PUBLIC_COMMENT_TEXT }}
                </p>
              </v-card>
            
              </v-col>
              <v-col v-else cols="12 d-flex justify-center flex-column align-center">
                <v-img width="150" src="@/assets/noData.png"></v-img>
                <p>No Data Found</p>
              </v-col>
            </v-row>
            <div v-if="feedback && feedback.length > 0" class="d-flex justify-center">
              <v-btn @click="viewMoreFeedback" :loading="viewMoreFeedbackLoader" color="primary" class="text-none font-weight-bold" variant="text" size="large">View more</v-btn>
            </div>
      </v-card>
    </v-col>
  </v-row>
  
  


  <v-dialog max-width="1000" v-model="imagePreviewModal">
    <!-- <v-toolbar class="rounded-t-xl " flat density="compact"></v-toolbar> -->
    <v-defaults-provider :defaults="{}">
      <v-sheet class="overflow-hidden" rounded="xl">
        <v-carousel v-model="currentIndex" direction="vertical" show-arrows progress="warning" vertical-arrows="left"
          vertical-delimiters="right">
          <v-carousel-item
    v-for="(item, i) in selectedImageArr"
    :key="i"
  >
    <!-- IMAGE -->
    <v-img
      v-if="!isVideo(item.IMAGE_URL)"
      :src="item.IMAGE_URL"
      cover
      height="100%"
    />

    <!-- VIDEO -->
    <video
      v-else
      :src="item.IMAGE_URL"
      controls
      autoplay
      muted
      loop
      playsinline
      style="width: 100%; height: 100%; object-fit: contain;"
    />

    <!-- DELETE BUTTON -->
    <div class="d-flex justify-end position-absolute top-0 end-0 pa-2">
      <v-btn
        v-if="propertyObj?.SELLER_USER_ID === authStore?.userDetails?.USER_ID"
        @click="deleteImage(item)"
        prepend-icon="mdi-trash-can"
        class="text-none rounded-lg elevation-0 font-weight-bold"
        color="red"
        height="42"
      >
        Delete Image
      </v-btn>
    </div>
  </v-carousel-item>
         

          
        
        </v-carousel>
      </v-sheet>
    </v-defaults-provider>
  </v-dialog>

  <v-dialog :max-width="qrViewSwitch == 'Portrait' ? 500 : 900" v-model="qrModal">
    <v-toolbar rounded="t-lg b-0" class="px-4">
      <h5>QR Code & Analytics</h5>
      <v-spacer></v-spacer>
      <v-switch size="large" inset v-model="qrViewSwitch" :label="`${qrViewSwitch} View`" false-value="Portrait"
        true-value="Landscape" hide-details class="ml-4" color="primary"></v-switch>
    </v-toolbar>
    <v-card rounded="b-lg t-0" elevation="0">
      <!-- Portrait  -->
      <div id="portraitContent" class="border-lg rounded-xl overflow-hidden" v-if="qrViewSwitch == 'Portrait'">
        <div>
          <div class="pa-4">

            <!-- <h3 class="text-h6 font-weight-bold mb-2">QR Code</h3> -->


            <div class="d-flex justify-center">
              <img width="100" src="@/assets/newLogo.png" alt="">
            </div>
            <h2 class="text-center text-h3 font-weight-black mt-2 " v-if="propertyObj.LISTING_TYPE">
              <!-- {{
              propertyObj.LISTING_TYPE.toUpperCase() }} -->
              FOR SALE
            </h2>

            <!-- <p class="text-primary mb-6 text-center">REALLY <span class="px-1"> GREAT</span> REALITY</p> -->

            <div class="d-flex justify-center flex-column align-center">
              <v-card class="pa-2 elevation-0">
                <qrcode-vue :value="`${baseUrl}/#/buy/property/${propertyObj.PROPERTY_ID}?qr=1`" :size="200" level="H"
                  background="white" foreground="black" />
              </v-card>
              <p class="text-center mt-2 text-white">Hold the camera to the image</p>
            </div>
          </div>
          <div style="background-color: #2663eb; min-height: 200px;position: relative;top: -80px;z-index: -1;"
            elevation="0" color="primary" class="mt-n16" min-height="200"></div>
        </div>
        <div
          style="background-color: #ee961d; min-height: 60px;position: relative;z-index: -1; height: 100%;margin-top: -80px;"
          elevation="0" color="primary" class="d-flex justify-center align-center" min-height="200">
          <h5 class="text-white">SCAN TO SEE INFORMATION ABOUT THIS LISTING</h5>
        </div>
      </div>

      <div id="landscapeContent" v-else class="d-flex flex-column border-lg rounded-xl overflow-hidden">
        <div class="d-flex">
          <!-- Left: QR Section -->
          <div class="pa-8 d-flex flex-column align-center justify-center" style="
        flex: 1;
        background-color: #2663eb;
        clip-path: polygon(0px 0px, 100% 0px, 78% 100%, 0px 100%);
      ">
            <v-card class="pa-2 elevation-0" color="white">
              <qrcode-vue :value="`${baseUrl}/#/buy/property/${propertyObj.PROPERTY_ID}?qr=1`" :size="200" level="H"
                background="white" foreground="black" />
            </v-card>
          </div>

          <!-- Right: Info Section -->
          <div class="pa-8 d-flex flex-column align-center justify-center" style="flex: 1;">
            <div class="d-flex justify-center mb-4">
              <img width="100" src="@/assets/newLogo.png" alt="logo" />
            </div>
            <h2 class="text-h3 font-weight-black text-center mb-2" v-if="propertyObj.LISTING_TYPE">
              <!-- {{ propertyObj.LISTING_TYPE.toUpperCase() }} -->
              FOR SALE
            </h2>
            <!-- <p class="text-primary text-center">REALLY <span class="px-1">GREAT</span> REALITY</p> -->
          </div>
        </div>

        <!-- Bottom Banner -->
        <div class="d-flex justify-center align-center" style="background-color: #ee961d; min-height: 60px;">
          <h5 class="text-white text-center">
            SCAN TO SEE INFORMATION ABOUT THIS LISTING
          </h5>
        </div>

      </div>
      <div class="pa-2">
        <div class="d-flex ga-4">
          <v-btn @click="downloadPDF(propertyObj)" :loading="isDownloading" color="primary" prependIcon="mdi-download"
            class="text-none rounded-lg elevation-0 font-weight-bold flex-1-1" height="42">Download</v-btn>
          <!-- <v-btn @click="shareAction(propertyObj)" variant="outlined" prependIcon="mdi-share-variant-outline"
            class="text-none rounded-lg elevation-0 font-weight-bold flex-1-1" height="42">Share</v-btn> -->
        </div>
      </div>

    </v-card>
  </v-dialog>

  <v-dialog max-width="430" persistent v-model="warningPopUp">
    <v-card min-height="400" class="rounded-xl pa-1">
      <div v-if="isLoading" class="d-flex justify-center mt-16">
        <v-progress-circular color="primary" indeterminate></v-progress-circular>
      </div>
      <div v-else>


        <v-carousel class="rounded-xl" @click.stop v-if="propertyObj.IMAGES && propertyObj.IMAGES?.length > 0"
          hide-delimiters :show-arrows="propertyObj.IMAGES?.length > 1" height="250">
          <v-carousel-item contain v-for="(image, i) in propertyObj.IMAGES" :key="i">

            <video
              v-if="isVideo(image.IMAGE_URL)"
              :src="image.IMAGE_URL"
              controls
              autoplay
              muted
              loop
              playsinline
              style="width: 100%; height: 100%; object-fit: contain;"
            />

            <v-img v-if="image?.IMAGE_URL"
              :src="image?.IMAGE_URL ? image.IMAGE_URL : `@/assets/property_placeholder.webp`"
              lazy-src="@/assets/property_placeholder.webp" contain height="250" class="rounded-lg">
              <v-btn :color="propertyObj.LISTING_TYPE == 'FOR SALE' ? 'success' : 'primary'"
                class="text-none rounded-pill elevation-0 font-weight-bold position-absolute top-0 left-0 mt-4 ms-4"
                height="" density="comfortable">{{ propertyObj.LISTING_TYPE }}</v-btn>
              <template #placeholder>
                <div class="d-flex fill-height align-center justify-center" style="background-color: #f2f2f2;">
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </div>
              </template>
            </v-img>
            <v-img v-else cover src="@/assets/property_placeholder.webp" alt="" />
          </v-carousel-item>
        </v-carousel>

        <v-carousel class="rounded-xl" @click.stop="
          $router.push({
            path: route.name !== 'BuyProperties'
              ? `/property/${propertyObj.PROPERTY_ID}`
              : `/buy/property/${propertyObj.PROPERTY_ID}`,
            query: {
              createdBy: propertyObj.SELLER_USER_ID === authStore.getUserDetails?.USER_ID
            }
          })
          " v-else hide-delimiters :show-arrows="propertyObj.IMAGES?.length > 1" height="250">
          <v-carousel-item>
            <v-img contain :src="findImageType(propertyObj.PROPERTY_KIND)" alt="">
              <v-btn v-if="propertyObj.LISTING_TYPE"
                :color="propertyObj.LISTING_TYPE == 'FOR SALE' ? 'success' : 'primary'"
                class="text-none rounded-pill elevation-0 font-weight-bold position-absolute top-0 left-0 mt-4 ms-4"
                height="" density="comfortable">{{ propertyObj.LISTING_TYPE }}</v-btn>
            </v-img>
          </v-carousel-item>
        </v-carousel>
        <div class="pa-2">
          <h6>{{ propertyObj.TITLE }}</h6>
          <div class="mt-2">
            <v-btn variant="outlined" rounded size="small" class="text-none text-subtitle-2">{{
              propertyObj.PROPERTY_KIND
            }}</v-btn>
            <v-btn variant="outlined" rounded size="small" class="text-none text-subtitle-2 ml-2">{{
              propertyObj.PRICE_AMOUNT }} {{ propertyObj.CURRENCY_CODE }}</v-btn>
            <v-btn variant="outlined" rounded size="small" class="text-none text-subtitle-2 ml-2"> <v-icon
                color="primary">mdi-map-marker</v-icon> {{ propertyObj.STATE }}</v-btn>
          </div>
          <v-divider class="my-4"></v-divider>
         
              <v-btn @click="warningPopUp = false" rounded="xl" height="48" color="secondary" width="100%"
                class="text-none elevation-0 font-weight-bold">
                <v-icon class="mr-1" color="">mdi-web</v-icon> View Details
              </v-btn>
              <v-btn variant="tonal" @click="openMobileApp('android')" rounded="xl" height="48" width="100%"
                class="text-none font-weight-bold my-2 drop-shadow">
                <v-icon class="mr-1" size="28" color="green">mdi-android</v-icon> Open For Android
              </v-btn>
              <v-btn variant="tonal" @click="openMobileApp" rounded="xl" height="48" color="primary" width="100%"
                class="text-none elevation-0 font-weight-bold">
                <v-icon class="mr-1"   size="28" color="black">mdi-apple</v-icon> Open in App
              </v-btn>
            
        </div>
      </div>
    </v-card>
  </v-dialog>

  <v-dialog v-model="msgDialog" max-width="650">
    <v-toolbar class="" color="white" density="compact" rounded="t-lg b-0">
      <v-spacer></v-spacer>
      <v-btn icon @click="msgDialog = false"><v-icon>mdi-close</v-icon></v-btn>
    </v-toolbar>
    <v-card class="d-flex flex-column" min-height="400" rounded="b-lg t-0">
      <!-- Messages Section -->
      <v-card-text class="overflow-y-auto px-4 py-2" :class="oldMsgLoader ? `d-flex align-center justify-center` : ''">
        <div v-if="oldMsgLoader" class="">
          <p class="text-center">Getting your messages</p>
          <v-progress-linear color="primary" height="6" indeterminate rounded></v-progress-linear>
        </div>
        <div v-else v-for="(msg, i) in messages" :key="i" class="mb-3 d-flex flex-column">
          <div :class="[
            'pa-3 rounded-lg d-inline-block',
            msg.sender === 'me'
              ? 'bg-primary text-white ml-auto'
              : 'bg-grey-lighten-3 text-black mr-auto'
          ]" style="max-width: 80%; white-space: pre-wrap;">
            {{ msg.text }}
            <p class="text-caption">{{ msg.SENT_ON }}</p>
          </div>

        </div>
      </v-card-text>

      <!-- Input Section -->
      <v-divider></v-divider>
      <v-card-actions v-if="!oldMsgLoader" class="px-4 py-3">
        <v-text-field v-model="newMessage" placeholder="Type your message..." variant="solo" flat density="comfortable"
          hide-details clearable @keyup.enter="sendMessage"></v-text-field>
        <v-btn icon variant="tonal" rounded="circle" color="primary" :loading="msgSentLoader" @click="sendMessage">
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog fullscreen v-model="feedbackModal">
    <div style="background-color: white;overflow-y: auto; background-color: #faf8f0;height: 150vh;">
      <div style="position: fixed;background-color: rgb(256, 256, 256, 0.9);width: 100%;height: 150px;z-index: 1;">
        <v-container fluid class="px-10">
          <div class="d-flex">
            <div>
              <div class="d-flex align-center">
                <v-icon size="x-large" color="primary" class="mr-2">mdi-shield-sync-outline</v-icon>
                <h2 class="font-weight-bold">QRFORINFO Trust System</h2>
              </div>
              <!-- <v-row no-gutters> -->
                <!-- <v-col> -->
                  <v-btn v-if="selectedType !== 'DisputeForm' && authStore.userDetails.USER_ID !== propertyObj.SELLER_USER_ID" @click="selectedType = 'RatingForm'"
                    :color="selectedType == 'RatingForm' ? 'primary' : '#f5f5f4'"
                    class="text-none text-black rounded-lg elevation-0" size="large"
                    :variant="selectedType == 'RatingForm' ? 'elevated' : 'tonal'">1. Rating Form </v-btn>
                <!-- </v-col> -->
                <!-- <v-col> -->
                  <v-btn v-if="selectedType !== 'DisputeForm'" @click="selectedType = 'RiskWarning'"
                    :color="selectedType == 'RiskWarning' ? 'primary' : '#f5f5f4'"
                    class="text-none text-black rounded-lg elevation-0 ml-2" size="large"
                    :variant="selectedType == 'RiskWarning' ? 'elevated' : 'tonal'">2. Risk Warning </v-btn>
                <!-- </v-col> -->
                <!-- <v-col>
                  <v-btn @click="selectedType = 'PublicProfile'"
                    :color="selectedType == 'PublicProfile' ? 'primary' : '#f5f5f4'"
                    class="text-none text-black rounded-lg elevation-0" size="large"
                    :variant="selectedType == 'PublicProfile' ? 'elevated' : 'tonal'">2. Public Profile </v-btn>
                </v-col>
                <v-col>
                  <v-btn @click="selectedType = 'MyReputation'"
                    :color="selectedType == 'MyReputation' ? 'primary' : '#f5f5f4'"
                    class="text-none text-black rounded-lg elevation-0" size="large"
                    :variant="selectedType == 'MyReputation' ? 'elevated' : 'tonal'">3. My Reputation </v-btn>
                </v-col>
                <v-col>
                  <v-btn @click="selectedType = 'RiskWarning'"
                    :color="selectedType == 'RiskWarning' ? 'primary' : '#f5f5f4'"
                    class="text-none text-black rounded-lg elevation-0" size="large"
                    :variant="selectedType == 'RiskWarning' ? 'elevated' : 'tonal'">4. Risk Warning </v-btn>
                </v-col> -->
                <!-- <v-col >
                  <v-btn @click="selectedType = 'DisputeForm'"
                    :color="selectedType == 'DisputeForm' ? 'primary' : '#f5f5f4'"
                    class="text-none text-black rounded-lg elevation-0" size="large"
                    :variant="selectedType == 'DisputeForm' ? 'elevated' : 'tonal'">2. Dispute Form </v-btn>

                </v-col> -->
                <!-- <v-col>
                  <v-btn @click="selectedType = 'AdminDashboard'"
                    :color="selectedType == 'AdminDashboard' ? 'primary' : '#f5f5f4'"
                    class="text-none text-black rounded-lg elevation-0" size="large"
                    :variant="selectedType == 'AdminDashboard' ? 'elevated' : 'tonal'">6. Admin Dashboard </v-btn>

                </v-col> -->
              <!-- </v-row> -->
            </div>
            <v-spacer></v-spacer>
            <v-btn size="small" @click="feedbackModal = false" variant="tonal" icon="mdi-close"></v-btn>
          </div>

        </v-container>
      </div>


      <div class="d-flex justify-center py-4 position-relative" style="top: 180px;">
        <v-card v-if="selectedType == 'RatingForm'" width="900" class="pa-8 card-box-shadow" rounded="xl">
          <!-- Status Badge -->
          <div class="text-center mb-6">
            <!-- <v-chip color="green-lighten-4" text-color="green-darken-2" variant="flat">
              Interaction Completed
            </v-chip> -->
          </div>

          <!-- Title -->
          <h2 class="text-center font-weight-bold">Rate Your Experience</h2>

          <p class="text-center mt-2 text-medium-emphasis">
            With <strong>{{propertyObj.SELLER_NAME}}</strong> 
            
            <!-- • Consultation on Dec 1, 2024 -->
          </p>

          <!-- Rating -->
          <div class="mt-8">
            <label class="font-weight-bold">Overall Rating *</label>

            <div class="d-flex justify-center mt-3">
              <v-rating v-model="ratingState.OVERALL_RATING" color="amber" size="x-large" hover />
            </div>

            <p class="text-center text-medium-emphasis mt-2">Select a rating</p>
          </div>

          <!-- Quick Tags -->
          <div class="mt-8">
            <p class="font-weight-bold mb-2">Quick Tags</p>

            <div class="d-flex flex-wrap ga-3">
              <v-chip elevation="0" v-for="tag in tags" size="small" :key="tag" rounded :variant="selectedTags.includes(tag.value) ? 'elevated' : 'outlined'"
                class="px-4 font-weight-bold" @click="toggleTag(tag)"
                :color="tag.type == 'positive' ? 'primary' : 'red'">
                {{ tag.label }}
              </v-chip>
            </div>

            <!-- <v-btn variant="tonal" color="red" class="mt-3 text-caption">
              Report Concerns (scam, abuse, payment issues)
            </v-btn> -->
          </div>

          <!-- Public Feedback -->
          <div class="mt-8">
            <label class="font-weight-bold">Public Feedback</label>

            <v-textarea v-model="ratingState.PUBLIC_COMMENT" rows="4" rounded="lg" variant="outlined"
              placeholder="Share your experience to help other users..." class="mt-1"></v-textarea>

            <!-- <div class="text-right text-caption text-medium-emphasis">
              {{ publicFeedback.length }}/1000
            </div> -->
          </div>

          <!-- Private Note -->
          <div>
            <label class="font-weight-bold">Private Note to QRFORINFO Team</label>
            <v-textarea class="mt-1" v-model="ratingState.PRIVATE_COMMENT" rows="3" rounded="lg" variant="outlined"
              placeholder="Additional concerns for our safety team..."></v-textarea>
          </div>

          <!-- Actions -->
          <div class="d-flex justify-end mt-10">
            <v-btn @click="giveRating" :disabled="!ratingState.PUBLIC_COMMENT || !ratingState.OVERALL_RATING || (selectedTags.length < 1)" :loading="giveRatingLoader" color="primary" size="large" min-width="400" height="48"
              class="elevation-0 text-none font-weight-bold" rounded="lg">
              Submit Rating
            </v-btn>
<!-- 
            <v-btn variant="text" class="text-medium-emphasis text-none font-weight-bold">
              Skip for now
            </v-btn> -->
          </div>

        </v-card>
        <v-card v-if="selectedType == 'RiskWarning'" width="900" class="pa-8 card-box-shadow warning-border"
          rounded="xl">

          <div class="text-center">
            <div class="warning-icon mx-auto mb-4 d-flex align-center justify-center">
              <v-icon size="42" color="#D14B4B">mdi-alert-outline</v-icon>
            </div>

            <h2 class="text-h4 font-weight-bold mb-2">Trust Warning</h2>
            <p class="text-body-1 text-medium-emphasis">
              Please review this information before proceeding
            </p>
          </div>

          <!-- USER RISK BOX -->
          <v-card rounded="xl" class="pa-6 mt-8 risk-box" elevation="0">
            <div class="d-flex align-start">
              <div class="avatar-box mr-4">
                <span class="avatar-text">JS</span>
              </div>

              <div>
                <div class="">
                  <h3 class="text-h6 font-weight-bold mr-3">John Suspicious</h3>
                  <p>
                    <v-btn size="small" color="#D14B4B" elevation="0" rounded="lg" text-color="white"
                      class="mr-3 text-none font-weight-bold">
                      HIGH_RISK
                    </v-btn>

                    <span class="text-body-1 text-medium-emphasis">
                      Trust Score: 32/100
                    </span>
                  </p>
                </div>

                <!-- Bullet Danger List -->
                <ul class="mt-4 reports-list">
                  <li>
                    <v-icon size="18" color="#D14B4B" class="mr-2">mdi-close-circle</v-icon>
                    <strong>3 scam-related reports</strong> in the last 30 days
                  </li>
                  <li>
                    <v-icon size="18" color="#D14B4B" class="mr-2">mdi-close-circle</v-icon>
                    Only <strong>8 completed interactions</strong>
                  </li>
                  <li>
                    <v-icon size="18" color="#D14B4B" class="mr-2">mdi-close-circle</v-icon>
                    Phone and payment <strong>not verified</strong>
                  </li>
                </ul>
              </div>
            </div>
          </v-card>

          <!-- RECENT USER REPORTS -->
          <h3 class="text-h6 font-weight-bold mt-10 mb-4">Recent User Reports:</h3>

          <!-- REPORT ITEM -->
          <v-card v-for="item in reports" :key="item.id" rounded="xl" variant="outlined" color="red"
            class="rounded-lg pa-4 mt-2">
            <div class="d-flex justify-space-between text-black">
              <strong class="text-black">{{ item.name }}</strong>
              <span class="text-body-2 text-black">{{ item.time }}</span>
            </div>

            <p class="text-body-2 mt-2">
              {{ item.text }}
            </p>
          </v-card>



        </v-card>

        <v-card v-if="selectedType == 'DisputeForm'" width="900" class="pa-8 card-box-shadow" rounded="xl">


          <!-- ICON -->
          <div class="d-flex justify-center mb-6">
            <v-avatar class="" size="86" color="#fef3c7">
              <v-icon size="36" color="#E2B747">mdi-flag-outline</v-icon>
            </v-avatar>
          </div>

          <!-- TITLE -->
          <h2 class="text-h4 text-center font-weight-bold mb-2">Dispute Rating</h2>
          <p class="text-center text-body-1 text-medium-emphasis mb-10">
            Report feedback that violates our policies
          </p>

          <!-- ORIGINAL FEEDBACK CARD -->
          <!-- <v-card rounded="xl" elevation="0" class="pa-6 mb-8" style="background:#fafafa; border:1px solid #eee;">
            <div class="mb-2 text-body-1 text-medium-emphasis">
              Original feedback you're disputing:
            </div>

            
            <div class="d-flex align-center mb-2">
              <v-rating model-value="4" color="#E2B747" readonly density="compact" size="20"></v-rating>

              <span class="ml-3 text-body-2 text-medium-emphasis">
                • Nov 25, 2024
              </span>
            </div>

            
            <p class="text-body-1 mb-3">
              "Good service overall. Minor delay but handled professionally."
            </p>

           
            <v-chip color="#e8e4d8" text-color="black" size="small" class="text-caption">
              Accurate info
            </v-chip>
          </v-card> -->

          
          <div class="text-body-1 font-weight-medium mb-2">Reason for Dispute *</div>
          <v-select placeholder="Select a reason..." :items="['ABUSIVE','FALSE','PRIVACY']" v-model="reasonForDispute" variant="outlined" rounded="lg"
            class="mb-6"></v-select>

          <div class="text-body-1 font-weight-medium mb-2">Explanation *</div>
          <v-textarea v-model="explanationForDispute" variant="outlined" rounded="lg"
            placeholder="Please explain why this feedback should be removed. Include any relevant details or evidence..."
            class="mb-2" rows="5"></v-textarea>

          <p class="text-caption text-medium-emphasis mb-8">
            Our team will review your dispute within 3–5 business days
          </p>

          
          <v-card rounded="lg" class="pa-4 mb-10" elevation="0" style="background:#fff7df; border:1px solid #f3e1b7;">
            <strong class="text-body-1 d-block mb-1">Note:</strong>
            <p class="text-body-2 text-medium-emphasis">
              False or abusive dispute reports may result in action against your account.
              Only dispute feedback that genuinely violates our policies.
            </p>
          </v-card>

          <!-- BUTTONS -->
          <div class="d-flex align-center justify-center mt-8">
            <v-btn @click="submitDispute" :loading="submitDisputeLoader" :disabled="!reasonForDispute || !explanationForDispute" height="48" class="submit-btn text-none" rounded="lg">
              Submit Dispute
            </v-btn>

            <!-- <v-btn variant="plain" class="ml-6 text-medium-emphasis">
              Cancel
            </v-btn> -->
          </div>


        </v-card>

      
      </div>



    </div>
  </v-dialog>

  <v-dialog fullscreen v-model="profileDetailsModal">
    <v-toolbar class="px-4">
      <h5>Seller Details</h5>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-close" @click="profileDetailsModal = false"></v-btn>
    </v-toolbar>
    <v-card class="">
      <v-card-text>
          <ProfileDetails otherProfile @triggerMSG="messageSeller" :user="{USER_ID : propertyObj.SELLER_USER_ID, SELLER_NAME : propertyObj.SELLER_NAME}" />
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-dialog max-width="800" v-model="uploadImageModal">
    <v-toolbar density="compact" color="" rounded="t-lg" class="px-4">
      <h6>Upload Images</h6>
      <v-spacer></v-spacer>
      <v-btn @click="uploadImageModal = false" icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>

    </v-toolbar>
    <v-card rounded="t-0 b-lg">
      <v-card-text>
        <h6 class="">Available Images : </h6>
        <div class="">
          <div>
            <v-row v-if="selectedData.IMAGES && selectedData.IMAGES.length > 0">
              <v-col cols="3" v-for="(item,ind) in selectedData.IMAGES" :key="ind">

                <div v-if="isVideo(item.IMAGE_URL)">
                  <v-btn icon size="x-small" :loading="deleteImageLoader[ind]" @click="deleteNewImage(item, ind)">
                    <v-icon color="red">mdi-delete</v-icon>
                  </v-btn> 
                  <video
                          
                          
                          :src="item.IMAGE_URL"
                          muted
                          loop
                          playsinline
                          autoplay
                          class="w-100 h-100 object-cover"
                          
                        ></video>
                </div>
                

                <v-img v-else height="200" lazy-src="@/assets/property_placeholder.webp" contain class="rounded-lg" :src="item.IMAGE_URL">
                  <v-btn icon size="x-small" :loading="deleteImageLoader[ind]" @click="deleteNewImage(item, ind)">
                    <v-icon color="red">mdi-delete</v-icon>
                  </v-btn> 
                </v-img>
              </v-col>
            </v-row>
            <p v-else class="text-center mb-4">No images added yet</p>
          </div>
        </div>
        <v-divider class="mb-4"></v-divider>
        <v-file-upload density="compact" v-model="addedImagesArr" title="Browse Or Drag and Drop Here" clearable multiple></v-file-upload>
        <div class="d-flex justify-end mt-4">
          <v-btn size="large" class="text-none rounded-lg" @click="uploadImages" :loading="uploadImagesLoader" elevation="0" min-width="200" color="primary">Save</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import PropertyCard from './PropertyCard.vue';
import QrcodeVue from 'qrcode.vue';
import Header from '@/layouts/header.vue'
import propertyService from '@/services/propertyService';
import { useAuthStore } from '@/stores/app';
import { toast } from 'vue3-toastify';
import DummyHouse from '@/assets/dummy_house.webp'
import DummyApartment from '@/assets/dummy_apartment.webp'
import DummyLand from '@/assets/dummy_land.webp'
import moment from 'moment';
import GoogleMap from '@/components/GoogleMap.vue'
import ProfileDetails from '@/components/Profile.vue'
//..............................................................................
const authStore = useAuthStore()
const route = useRoute()
const propertyObj = ref({});
const qrCodeValue = ref({});
const warningPopUp = ref(false)
const isLoading = ref(false)
const isDownloading = ref(false)
const baseUrl = ref('')
const qrModal = ref(false)
const qrViewSwitch = ref('Portrait')
const showMenu = ref(false)
const menuTarget = ref(null)
const menuItems = [
  { title: 'Feedback', prependIcon: 'mdi-plus-circle', code: 'feedback' },
  // { title: 'Report an issue',prependIcon: 'mdi-plus-circle', code: 'report' },
  { title: 'Risk Warnings',prependIcon: 'mdi-plus-circle', code: 'RiskWarning' },
]
const onMenuSelect = (item)=>{
  if(item.code == 'feedback'){
    selectedType.value = 'RatingForm'
    feedbackModal.value = true
  }else if(item.code == 'report'){
    // selectedType.value = 'DisputeForm'
    feedbackModal.value = true
  }
  else if(item.code == 'RiskWarning'){
    selectedType.value = 'RiskWarning'
    feedbackModal.value = true
  }
}
//..............................................................................
const router = useRouter()
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
const selectedType = ref('RatingForm')

const feedbackLimit = ref(10)
const viewMoreFeedbackLoader = ref(false)
const fetchSellerFeedback = async(id)=>{
  viewMoreFeedbackLoader.value = true
  
  try {
    let data = {
      "RATED_USER_ID": id,
      "OFFSET": 0,
      "LIMIT": feedbackLimit.value
    }
    let res = await propertyService.getRatingsReceivedList(data)
    if(res.data.ERR_CODE == 0){
      let response = res.data.FetchData
      feedback.value = response
      viewMoreFeedbackLoader.value = false
    }
  } catch (error) {
    viewMoreFeedbackLoader.value = false
    console.log(error)
  }
}


const reportedFeedbackList = ref([])
const fetchReportedFeedbacks = async()=>{
  try {
    let data = {
        "RATED_USER_ID": propertyObj.value.SELLER_USER_ID,
        "RATER_USER_ID": 0,
        "HAS_SCAM_TAG": 1,
        "FROM_DATE": moment().startOf('year').format('YYYY-MM-DD'),
        "TO_DATE": moment().format('YYYY-MM-DD'),
        "OFFSET": 0,
        "LIMIT": 20
    }
    let res = await propertyService.getReportedFeedback(data)
    if(res.data.ERR_CODE == 0){
      let response = res.data
      reportedFeedbackList.value = response.FetchData
    }
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  // if (authStore.isAuthenticated) {
  //   fetchStatistics()
  // }

  baseUrl.value = window.location.origin

  if (route.query.qr) {
    updateQrStatistics()
    warningPopUp.value = true
  }

  fetchPropertyDetail()
 
})
//------------------------------------------------------------------------------
const updateStatistics = async () => {
  try {
    let data = {
      "PROPERTY_ID": Number(propertyObj.value?.PROPERTY_ID || route?.params?.id || 0),
      "USER_ID": authStore.isAuthenticated ? authStore.userDetails.USER_ID : 0
    }
    let res = await propertyService.addView(data)
  } catch (error) {
    console.log(error)
  }
}
//------------------------------------------------------------------------------
const updateQrStatistics = async () => {
  try {
    if (authStore?.isAuthenticated && authStore?.userDetails?.USER_ID) {
      let data = {
        "PROPERTY_ID": Number(propertyObj.value?.PROPERTY_ID || route?.params?.id || 0),
        "USER_ID": authStore.isAuthenticated ? authStore.userDetails.USER_ID : 0
      }
      let res = await propertyService.AddPropertyQrViewDetail(data)
    } else {
      const propertyArr = JSON.parse(localStorage.getItem('scannedPropertyArr') || '[]')
      console.log('--->localStorage.getItem()', localStorage.getItem('scannedPropertyArr'));
      console.log('--->propertyArr', propertyArr);
      if (!propertyArr.includes(Number(propertyObj.value?.PROPERTY_ID || route?.params?.id || 0))) {
        console.log('--->propertyArr', propertyArr);
        propertyArr?.push(Number(propertyObj.value?.PROPERTY_ID || route?.params?.id || 0))
        localStorage.setItem('scannedPropertyArr', JSON.stringify(propertyArr))
        console.log('--->propertyArr', propertyArr);
      }
    }
  } catch (error) {
    console.log(error)
  }
}
//------------------------------------------------------------------------------
const statisticsData = ref({})
// const fetchStatistics = async () => {
//   try {
//     let res = await propertyService.getDashboardStatistics()
//     if (res.data.ERR_CODE == 0) {
//       let response = res.data.FetchData
//       statisticsData.value = response.PROPERTY_MESSAGE_DETAILS
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }
//------------------------------------------------------------------------------
const fetchPropertyDetail = async () => {
  try {
    if (!route?.params?.id) return;

    isLoading.value = true;
    const data = {
      PROPERTY_ID: route.params.id,
      CITY: "",
      STATE: "",
      POSTAL_CODE: "",
      COUNTRY: "",
      SEARCH: "",
      PAGE_NO: 1,
      PAGE_SIZE: 10,
    }
    let res;

    if (route.query.createdBy === 'false') {

      res = await propertyService.GetPropertyDetailPublic(data);
    } else if (route.name == 'BuyPropertyDetails') {

      res = await propertyService.GetPropertyDetailPublic(data);
    } else if (route.query.createdBy) {
      res = await propertyService.GetPropertyDetail(data);
    }
    propertyObj.value = res.data?.FetchData?.PROPERTY_DETAILS?.[0] || {}
    qrCodeValue.value = res.data?.FetchData?.PROPERTY_DETAILS?.[0] || {}
    if(authStore.isAuthenticated){
      fetchSellerFeedback(propertyObj.value?.SELLER_USER_ID)
      fetchReportedFeedbacks(propertyObj.value?.SELLER_USER_ID)
    }
   
    updateStatistics()
  } catch (error) {

  } finally {
    isLoading.value = false;
  }
}
//------------------------------------------------------------------------------
const downloadPDF = async (propertyObj) => {
  try {
    isDownloading.value = true;
    let prtHtml
    if (qrViewSwitch.value == 'Portrait') {
      prtHtml = document.getElementById('portraitContent')
    } else {
      prtHtml = document.getElementById('landscapeContent')
    }
    // Reference to form container

    const html2pdf = (await import('html2pdf.js')).default;


    let fileName = `${propertyObj.TITLE}`
    const options = {
      margin: 0.5,
      filename: fileName + '.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }
    await html2pdf().from(prtHtml).set(options).save()

  } catch (error) {

  } finally {
    isDownloading.value = false;
  }
}
//------------------------------------------------------------------------------
const shareAction = async (propertyObj) => {
  const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    propertyObj.TITLE + '\n' +
    `https://qrforinfo.com/#/buy/property/${propertyObj.PROPERTY_ID}`
  )}`;

  const shareData = {
    title: propertyObj.TITLE,
    text: propertyObj.TITLE,
    url: `/#/buy/property/${propertyObj.PROPERTY_ID}`,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch (err) {
      console.log('--->err', err);
    }
  }

  window.open(shareUrl, '_blank');
}
//------------------------------------------------------------------------------
const openMobileApp = (type) => {
  if(type == 'android'){
    window.open('https://play.google.com/store/apps/details?id=com.qrinfo.app')
  }
  // else if(){

  // }
  else{
    window.open('https://apps.apple.com/in/app/school/id1528665599')
  }
  
}
//------------------------------------------------------------------------------
const panel = ref([0])

const makeFevLoader = ref(false)
const makeFev = async () => {
  if (authStore.isAuthenticated) {
    makeFevLoader.value = true
    try {
      let data

      if (propertyObj.value.IS_FAVOURITE == 0) {
        data = {
          "ACTION_TYPE": "CREATE",
          "FAV_ID": 0,
          "USER_ID": authStore.getUserDetails.USER_ID,
          "PROPERTY_ID": route.params.id
        }
      } else {
        data = {
          "ACTION_TYPE": "DELETE",
          "FAV_ID": 0,
          "USER_ID": authStore.getUserDetails.USER_ID,
          "PROPERTY_ID": route.params.id
        }
      }
      let res = await propertyService.PropertyFavoriteTxnCrud(data)
      if (res.data.ERR_CODE == 0) {
        fetchPropertyDetail()
        if (propertyObj.value.IS_FAVOURITE == 0) {
          toast.success('Property added to saved list', {
            autoClose: 4000,
          });
        } else {
          toast.success('Property removed from saved list', {
            autoClose: 4000,
          });

        }
        // toast.success('Property added to your saved list', {
        //   autoClose: 4000,
        // });
        makeFevLoader.value = false
      }
    } catch (error) {
      makeFevLoader.value = false
      console.log(error)
    }
  } else {
    // router.push({ name: 'Login' })
    gotoLogin()
  }
}

const msgDialog = ref(false)
const sender_id = ref()
const receiver_id = ref()
const property_id = ref()
const msgSentLoader = ref(false)
const formatKind = (text) => {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}
const sendMessage = async () => {
  if (newMessage.value && newMessage.value.length) {
    msgSentLoader.value = true
    try {
      let data = {
        "ACTION_TYPE": "CREATE",
        "MESSAGE_ID": 0,
        "SENDER_USER_ID": sender_id.value,
        "RECEIVER_USER_ID": receiver_id.value,
        "MESSAGE_BODY": newMessage.value,
        "READ_ON": "2025-10-29",
        "PROPERTY_ID": property_id.value,
        "LAST_MESSAGE_ON": new Date()
      }
      let res = await propertyService.message(data)
      if (res.data.ERR_CODE == 0) {
        msgSentLoader.value = false
        messages.value.push({ sender: 'me', text: newMessage.value.trim(), SENT_ON: moment().format("Do MMM, YYYY hh:mm A") })
        newMessage.value = ''
      }
    } catch (error) {
      console.log(error)
    }
  }

}
const newMessage = ref('')
const messages = ref([
  // { sender: 'other', text: 'Hey there! How can I help you today?' },
  // { sender: 'me', text: 'Hi! I wanted to ask about the new property listings.' },
  // { sender: 'other', text: 'Hey there! How can I help you today?' },
  // { sender: 'me', text: 'Hi! I wanted to ask about the new property listings.' },
  // { sender: 'other', text: 'Hey there! How can I help you today?' },
  // { sender: 'me', text: 'Hi! I wanted to ask about the new property listings.' },
  // { sender: 'other', text: 'Hey there! How can I help you today?' },
  // { sender: 'me', text: 'Hi! I wanted to ask about the new property listings.' },

])

const oldMsgLoader = ref(true)
const oldMsges = async () => {
  oldMsgLoader.value = true
  try {
    let data = {
      OWNER_ID: propertyObj?.value.SELLER_USER_ID,
      PROPERTY_ID: propertyObj?.value.PROPERTY_ID
    }
    let res = await propertyService.fetchDashboardStatistics(data)
    if (res.data.ERR_CODE == 0) {
      let response = res.data.FetchData
      if (response.PROPERTY_MESSAGE_DETAILS && response.PROPERTY_MESSAGE_DETAILS.length > 0) {
        messages.value = response.PROPERTY_MESSAGE_DETAILS.map((item) => {
          return {
            sender: item.SENDER_USER_ID == authStore.getUserDetails.USER_ID ? 'me' : 'other',
            text: item.MESSAGE_BODY,
            SENT_ON: moment(item.SENT_ON).format('Do MMM, YYYY hh:mm A')
          }
        })

      }
      oldMsgLoader.value = false
    }
    if (res.data.ERR_CODE == 0) {
      let response = res.data
    }
  } catch (error) {
    console.log(error)
  }
}


const gotoLogin = ()=>{
  if(route.query.qr && route.query.qr == '1'){
    router.push({ name: 'Login', query:{
      qr: route.params.id
    } })
  }else{
    router.push({ name: 'Login' })
  }
  }


const profileDetailsModal = ref(false)
const contactOwner = () => {
  profileDetailsModal.value = true
  // if (authStore.isAuthenticated) {
  //   oldMsges()
  //   sender_id.value = authStore.getUserDetails.USER_ID
  //   receiver_id.value = propertyObj.value.SELLER_USER_ID
  //   property_id.value = propertyObj.value.PROPERTY_ID
  //   msgDialog.value = true
  // } else {
  //   gotoLogin()
  // }
}

const messageSeller = ()=>{
   if (authStore.isAuthenticated) {
    oldMsges()
    sender_id.value = authStore.getUserDetails.USER_ID
    receiver_id.value = propertyObj.value.SELLER_USER_ID
    property_id.value = propertyObj.value.PROPERTY_ID
    msgDialog.value = true
  } else {
    gotoLogin()
  }
}



const findImageType = (type) => {
  if (type == 'APARTMENT') {
    return DummyApartment
  } else if (type == 'LAND') {
    return DummyLand
  } else {
    return DummyHouse
  }
}

const imagePreviewModal = ref(false)
const selectedImageArr = ref([])
const currentIndex = ref(0)
const previewImages = (data) => {
  selectedImageArr.value = data

  imagePreviewModal.value = true
}
//------------------------------------------------------------------------------
const deleteProperty = async (item) => {
  if (confirm('Are you sure you want to delete this property ?')) {
    try {
      // const data = {
      //   ACTION_TYPE: "DELETE",
      //   PROPERTY_ID: item.PROPERTY_ID,
      // }
      const res = await propertyService.DeletePropertyMst(item.PROPERTY_ID)
      router.go(-1)
    } catch (error) {

    }

  }
}
//------------------------------------------------------------------------------
const deleteImage = async (item) => {
  if (confirm(`Are you sure you want to delete this image ?`)) {
    try {
      // formData.append('ACTION_TYPE', 'CREATE')
      // formData.append('IMAGE_ID', 0),
      // formData.append('PROPERTY_ID', selectedPropertyId.value);
      console.log('--->', item);
      const data = {
        IMAGE_ID: item?.IMAGE_ID || 0,
        PROPERTY_ID: item?.PROPERTY_ID || 0,
      }
      const res = await propertyService.DeletePropertyImage(data);
      router.go(0)
      console.log('--->res', res);
    } catch (error) {
      console.log('--->err', error);
    }
  }
}
//------------------------------------------------------------------------------
const feedbackModal = ref(false)
const openFeedback = () => {
  feedbackModal.value = true
}
const rating = ref(0);

const tags = [
  {
    label: 'Suspected Scam',
    value: 'SUSPECTED_SCAM',
    type: 'negative'
  },
  {
    label: 'Off-platform Payment',
    value: 'OFF_PLATFORM_PAYMENT',
    type: 'negative'
  },
  {
    label: 'Payment Issue',
    value: 'PAYMENT_ISSUE',
    type: 'negative'
  },
  {
    label: 'Fake Information',
    value: 'FAKE_INFO',
    type: 'negative'
  },

  // ✅ Positive feedback tags
  {
    label: 'On Time',
    value: 'ON_TIME',
    type: 'positive'
  },
  {
    label: 'Responsive',
    value: 'RESPONSIVE',
    type: 'positive'
  },
  {
    label: 'Polite',
    value: 'POLITE',
    type: 'positive'
  },
  {
    label: 'Accurate Info',
    value: 'ACCURATE_INFO',
    type: 'positive'
  },
  {
    label: 'Helpful',
    value: 'HELPFUL',
    type: 'positive'
  },
  {
    label: 'Professional',
    value: 'PROFESSIONAL',
    type: 'positive'
  }

];

const selectedTags = ref([]);

const toggleTag = (tag) => {
  if (selectedTags.value.includes(tag.value)) {
    selectedTags.value = selectedTags.value.filter((t) => t !== tag.value);
  } else {
    selectedTags.value.push(tag.value);
  }
};

const publicFeedback = ref("");
const privateNote = ref("");

const submit = () => {
  console.log({
    rating: rating.value,
    selectedTags: selectedTags.value,
    publicFeedback: publicFeedback.value,
    privateNote: privateNote.value
  });
};

const profile = ref({
  name: "Sarah Chen",
  memberSince: "2023",
  trustScore: 86,
  completedInteractions: 127,
  usersRatedBy: 45,
});

const verified = ["Email", "Phone", "Payment"];

const feedback = ref([
  
]);
const getInitials = (n) => n.split(" ").map((v) => v[0]).join("");


const reports = [
  { id: 1, name: "Emma Wilson", text: "Suspected scam – requested off-platform payment", time: "3 days ago" },
  { id: 2, name: "Robert Chen", text: "Did not deliver as promised", time: "8 days ago" },
];
const activeTab = ref("active");

const stats = [
  { label: "Open Disputes", value: 12, color: "#d9534f" },
  { label: "Pending Reviews", value: 34, color: "#d48d27" },
  { label: "High-Risk Users", value: 8, color: "#d04d4d" },
  { label: "Resolved Today", value: 156, color: "#3d8b37" },
  { label: "Total This Month", value: "2,341", color: "#2c60d3" }
];

const disputes = [
  {
    id: "D-2847",
    from: "Sarah Chen",
    to: "Mike Johnson",
    tag: "HIGH",
    reason: "Contains false information",
    time: "2 hours ago",
    feedback: "This person was completely unreliable and wasted my time. Would not recommend."
  },
  {
    id: "D-2846",
    from: "Robert Taylor",
    to: "Emma Davis",
    tag: "URGENT",
    reason: "Abusive language",
    time: "5 hours ago",
    feedback: "This person was completely unreliable and wasted my time. Would not recommend."
  }
];

// RATING MODULE 



const ratingState = ref({
  OVERALL_RATING: null,
  // PUBLIC_TAGS_JSON: selectedTags.value || [],
  PUBLIC_COMMENT:'',
  PRIVATE_COMMENT: ''
})

watch(feedbackModal,(val)=>{
  if(!val){
    ratingState.value = {
      OVERALL_RATING: null,
      // PUBLIC_TAGS_JSON: selectedTags.value || [],
      PUBLIC_COMMENT:'',
      PRIVATE_COMMENT: ''
    }
  }
})

const giveRatingLoader = ref(false)
const giveRating = async()=>{
  giveRatingLoader.value = true
  try {
    let data = {
      "INTERACTION_ID": propertyObj.value.PROPERTY_ID,
      "RATER_USER_ID": authStore.userDetails.USER_ID,
      "RATED_USER_ID": propertyObj.value.SELLER_USER_ID,
      "OVERALL_RATING": ratingState.value.OVERALL_RATING,
      "PUBLIC_TAGS_JSON": selectedTags.value && selectedTags.value.length > 1 ? JSON.stringify(selectedTags.value) : '',
      "PUBLIC_COMMENT": ratingState.value.PUBLIC_COMMENT,
      "PRIVATE_COMMENT": ratingState.value.PRIVATE_COMMENT
    }
    let res = await propertyService.createRating(data)
    
    if(res.data.ERR_CODE == 0){
      toast.success('Feedback Submitted', {
            autoClose: 4000,
          });
      feedbackModal.value = false
      if(authStore.isAuthenticated){
      fetchSellerFeedback(propertyObj.value?.SELLER_USER_ID)
      }
      giveRatingLoader.value = false
    }else{
      toast.info(res.data.MESSAGE, {
            autoClose: 4000,
          });
          giveRatingLoader.value = false
    }
  } catch (error) {
    console.log(error)
    giveRatingLoader.value = false
  }
}


const viewMoreFeedback = ()=>{

  feedbackLimit.value += 10
  fetchSellerFeedback(propertyObj.value?.SELLER_USER_ID)
}

const selectedRating = ref()
const openDispute = (data)=>{
  selectedRating.value = data
  selectedType.value = 'DisputeForm'
  feedbackModal.value = true
}


const reasonForDispute = ref()
const explanationForDispute = ref()
const submitDisputeLoader = ref(false)
const submitDispute = async()=>{
  submitDisputeLoader.value = true
  try {
    let data = {
        "RATING_ID": selectedRating.value?.RATING_ID,
        "DISPUTING_USER_ID": selectedRating.value?.RATED_USER_ID,
        "REASON_CODE": reasonForDispute.value,
        "DETAILS": explanationForDispute.value
    }
    let res = await propertyService.createRatingDispute(data)
    if(res.data.ERR_CODE == 0){
      let response = res.data
      submitDisputeLoader.value = false
      reasonForDispute.value = ''
      explanationForDispute.value = ''
      toast.success('Dispute Submitted', {
            autoClose: 4000,
          });
      feedbackModal.value = false
    }
  } catch (error) {
    submitDisputeLoader.value = false
    console.log(error)
  }
}

const isVideo = (url = '') => {
  return /\.(mp4|webm|ogg|mov)$/i.test(url)
}


const selectedPropertyId = ref()
const selectedData = ref()
const uploadImageModal = ref(false)
const addImage = (data)=>{
  console.log(data, 'data')
  selectedPropertyId.value = data.PROPERTY_ID
  selectedData.value = data
  uploadImageModal.value = true
}

const deleteImageLoader = ref([false])
const deleteNewImage = async (item,index) => {
  if (confirm(`Are you sure you want to delete this image ?`)) {
    try {
      deleteImageLoader.value[index] = true
      const data = {
        IMAGE_ID: item?.IMAGE_ID || 0,
        PROPERTY_ID: item?.PROPERTY_ID || 0,
      }
      const res = await propertyService.DeletePropertyImage(data);
      if(res.data.ERR_CODE == 0){
        
        uploadImageModal.value = false
        deleteImageLoader.value[index] = false
      }else{
        deleteImageLoader.value[index] = false
      }
      console.log('--->res', res);
    } catch (error) {
      deleteImageLoader.value[index] = false
    }
  }
}

const addedImagesArr = ref([])
const uploadImagesLoader = ref(false)
const uploadImages = async () => {
  uploadImagesLoader.value = true
  try {
    for (let i = 0; i < addedImagesArr.value.length; i++) {
      const file = addedImagesArr.value[i]
      const formData = new FormData()
      formData.append('ACTION_TYPE', 'CREATE')
      formData.append('IMAGE_ID', 0),
        formData.append('PROPERTY_ID', selectedPropertyId.value),
        formData.append('IMAGE_URL', file)
      formData.append('IS_PRIMARY', 0)
      formData.append('SEQ_NO', i + 1)
      formData.append('ALT_TEXT', `Image ${i + 1}`)
      formData.append('IS_ACTIVE_FLG', 1)
      await propertyService.uploadPropertyImage(formData)
    }
    uploadImagesLoader.value = false
    addedImagesArr.value = [] // clear array
    uploadImageModal.value = false
    toast.success('All images uploaded successfully', {
      autoClose: 4000,
    });
    // getProperties()
  } catch (error) {
    console.log(error)
  }
}

</script>

<style scoped lang="scss">
.bg-box-gradient {
  background-image: linear-gradient(to bottom right, #e9d5ff, #bfdbfe);
  color: white;
}


.v-overlay {
  // backdrop-filter: blur(6px) !important;
  background-color: rgba(0, 0, 0, 0.3) !important;
}

.warning-border {
  border: 2px solid #D14B4B;
  background: #fffdfa;
}

.warning-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #fdecec;
}

.risk-box {
  background: #fdecec;
  border: 1px solid #f3c7c7;
}

.avatar-box {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  background: #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-text {
  font-weight: bold;
  font-size: 20px;
}

.reports-list li {
  list-style: none;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.report-card {
  background: white;
  border: 1px solid #eee;
}

.object-cover {
  object-fit: contain!important;

}
</style>