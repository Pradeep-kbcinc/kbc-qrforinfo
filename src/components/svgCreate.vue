<template>
  <v-container fluid>
    <v-row>
      <!-- LEFT : PLOT DIAGRAM -->
      <v-col cols="12" md="8" class="d-flex flex-column align-center justify-center">
        <v-card width="100%" style="justify-content: center;" class="drop-shadow rounded-lg bg-grey-lighten-4 d-flex py-10">
          <div style="position: absolute;right: 10px;" class="d-flex justify-end">
            <img width="100" src="https://www.pikpng.com/pngl/b/333-3339164_compass-navigation-arrow-direction-gps-west-east-north.png" alt="">
          </div>
        
        <div class="plot-wrapper">

          <!-- North -->
          <div class="direction north">
            <div v-if="form.road.side === 'North'" class="road-north">
              {{ form.road.name }}
            </div>
            <span class="text-h6">North</span>
            <div class="dim">{{ form.dimensions.north }} ft</div>
            
          </div>

          <!-- West -->
          <div class="direction west">
            <div class="dim">{{ form.dimensions.west }} ft</div>
            <span class="text-h6">West</span>
            <div v-if="form.road.side === 'West'" class="road-west">
              {{ form.road.name }}
            </div>
          </div>

          <!-- Plot Box -->
          <div class="plot-box">
            <div class="area-text">
              <div class="font-weight-bold text-black">Total Area</div>
              <strong>{{ form.area }} Sq.ft</strong>
            </div>
          </div>

          <!-- East -->
          <div class="direction east">
            <div class="dim">{{ form.dimensions.east }} ft</div>
            <span class="text-h6">East</span>

            
            <div v-if="form.road.side === 'East'" class="road-east">
              {{ form.road.name }}
            </div>
          </div>

          <!-- Road -->
          <div v-if="form.road.side === 'South'" class="road-south">
            {{ form.road.name }}
          </div>

          <!-- South -->
          <div class="direction south">
            <span class="text-h6">South</span>
            <div class="dim">{{ form.dimensions.south }} ft</div>
          </div>

        </div>
      </v-card>
      </v-col>

      <!-- RIGHT : PLOT DETAILS -->
      <v-col cols="12" md="4">
        <v-card rounded="lg" class="drop-shadow">
          <v-card-title class="bg-grey-lighten-2 font-weight-bold">
            Plot Details
          </v-card-title>

          <v-card-text>
            <!-- <v-text-field label="Plot No" v-model="form.plotNo" /> -->
            <v-text-field variant="outlined" class="mt-4" label="Total Area (Sq.ft)" v-model="form.area" />
            <!-- <v-select label="Facing" :items="['North', 'South', 'East', 'West']" v-model="form.facing" /> -->

            <v-text-field variant="outlined" label="Road Name" v-model="form.road.name" />

            <p class="font-weight-bold text-subtitle-1 mb-2"><v-icon class="ml-2">mdi-road-variant</v-icon> Road Side Direction</p>
            <v-divider></v-divider>
            <v-row class="mt-4">
              <v-col v-for="(value,index) in ['North', 'South', 'East', 'West']" :key="index">
                  <v-btn @click="form.road.side = value" :variant="form.road.side == value ? 'flat' : 'outlined'" color="primary" size="large" class="rounded-lg text-none drop-shadow text-subtitle-1" min-width="140"> {{ value }} <v-icon class="ml-2">mdi-compass-outline</v-icon> </v-btn>
              </v-col>
            </v-row>
            <!-- <v-select label="Road Side" :items="['North', 'South', 'East', 'West']" v-model="form.road.side" /> -->

            <v-card-title  class="mb-4 font-weight-bold"> <v-icon>mdi-tape-measure</v-icon> Dimensions (ft)</v-card-title>
            <v-number-input variant="outlined" label="North" v-model="form.dimensions.north" />
            <v-number-input variant="outlined" label="South" v-model="form.dimensions.south" />
            <v-number-input variant="outlined" label="East" v-model="form.dimensions.east" />
            <v-number-input variant="outlined" label="West" v-model="form.dimensions.west" />
            <div>
              <v-btn color="primary" class="mt-4 text-none rounded-lg drop-shadow font-weight-bold" @click="savePlot" size="large"
                height="48" min-width="200">
                Save Plot
              </v-btn>
            </div>
          </v-card-text>

        </v-card>
      </v-col>
    </v-row>



  </v-container>
</template>
<script setup>
import { reactive } from 'vue'

const form = reactive({
  
  area: 2400,
  facing: 'North',
  road: {
    name: '30 Ft Main Road',
    side: 'South'
  },
  dimensions: {
    north: 40,
    south: 40,
    east: 60,
    west: 60
  }
})

const savePlot = () => {
  console.log('SAVE TO BACKEND 👉', form)
  // API call here
}
</script>

<style lang="scss" scoped>
.plot-wrapper {
  position: relative;
  width: 360px;
  height: 520px;
}

.plot-box {
  position: absolute;
  top: 120px;
  left: 60px;
  width: 240px;
  height: 280px;
  background: #eef6ff;
  border: 2px solid #90caf9;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.area-text {
  text-align: center;
  color: #1e40af;
}

.direction {
  position: absolute;
  text-align: center;
  font-size: 14px;
}

.dim {
  background: #f4a261;
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: bold;
  margin-top: 4px;
  
}

.north {
  top: 42px;
  left: 140px;
}

.south {
  bottom: 50px;
  left: 140px;
}

.west {
  top: 220px;
  left: -20px;
}

.east {
  top: 220px;
  right: -20px;
}

.road-south {
  position: absolute;
  bottom: 0px;
  left: 80px;
  width: 200px;
  background: #616161;
  color: white;
  text-align: center;
  padding: 10px;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500
}

.road-north {
  @extend .road-south;
  bottom: 70px !important;
  left: -60px !important;
}

.road-west {
  @extend .road-south;
  left: -130px;
  transform: rotate(90deg) !important;
  bottom: -2px !important;
}

.road-east {
  @extend .road-south;
  transform: rotate(90deg) !important;
  left: -12px;
  bottom: -2px !important;
}
</style>
